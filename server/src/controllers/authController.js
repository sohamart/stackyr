import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { isFallbackActive, getFallbackDb, saveFallbackDb } from '../config/db.js';

const getAdminEmail = () => (process.env.ADMIN_EMAIL || 'admin@stackyr.io').toLowerCase().trim();
const getAdminPassword = () => process.env.ADMIN_PASSWORD || 'stackyr2026!';

// In-memory brute force protection tracking
const attemptTracker = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(key) {
  const now = Date.now();
  const record = attemptTracker.get(key);

  if (!record) return { allowed: true };

  if (record.lockedUntil && record.lockedUntil > now) {
    const minutesRemaining = Math.ceil((record.lockedUntil - now) / 60000);
    return {
      allowed: false,
      message: `Security Lockout: Too many failed login attempts. Please wait ${minutesRemaining} minute(s) before trying again.`
    };
  }

  // Reset if lock has expired
  if (record.lockedUntil && record.lockedUntil <= now) {
    attemptTracker.delete(key);
    return { allowed: true };
  }

  return { allowed: true };
}

function registerFailedAttempt(key) {
  const now = Date.now();
  const record = attemptTracker.get(key) || { count: 0, firstAttempt: now };

  // Reset window if older than 15 minutes
  if (now - record.firstAttempt > 15 * 60 * 1000) {
    record.count = 1;
    record.firstAttempt = now;
  } else {
    record.count += 1;
  }

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    attemptTracker.set(key, record);
    return {
      locked: true,
      message: `Account temporarily locked due to 5 failed attempts. Please retry in 10 minutes.`
    };
  }

  attemptTracker.set(key, record);
  const remaining = MAX_ATTEMPTS - record.count;
  return {
    locked: false,
    message: `Invalid credentials. ${remaining} attempt(s) remaining before security lockout.`
  };
}

function resetAttempts(key) {
  attemptTracker.delete(key);
}

export async function ensureDefaultAdmin() {
  const targetEmail = getAdminEmail();
  const targetPass = getAdminPassword();

  // 1. Sync Fallback DB
  const db = getFallbackDb();
  if (!db.users) db.users = [];

  let fallbackAdmin = db.users.find(u => u.email === targetEmail || u.role === 'admin');

  if (!fallbackAdmin) {
    const salt = bcrypt.genSaltSync(10);
    fallbackAdmin = {
      _id: 'user_admin_1',
      name: 'Stackyr Super Admin',
      email: targetEmail,
      password: bcrypt.hashSync(targetPass, salt),
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    db.users.push(fallbackAdmin);
    saveFallbackDb();
    console.log(`[Stackyr Auth] Seeded primary administrator: ${targetEmail}`);
  } else {
    const matches = bcrypt.compareSync(targetPass, fallbackAdmin.password);
    if (!matches || fallbackAdmin.email !== targetEmail) {
      const salt = bcrypt.genSaltSync(10);
      fallbackAdmin.password = bcrypt.hashSync(targetPass, salt);
      fallbackAdmin.email = targetEmail;
      saveFallbackDb();
      console.log(`[Stackyr Auth] Synchronized administrator credentials with environment.`);
    }
  }

  // 2. Sync MongoDB Atlas if connected
  if (!isFallbackActive()) {
    try {
      let mongoAdmin = await User.findOne({ email: targetEmail });
      if (!mongoAdmin) {
        mongoAdmin = await User.findOne({ role: 'admin' });
      }

      if (!mongoAdmin) {
        await User.create({
          name: 'Stackyr Super Admin',
          email: targetEmail,
          password: targetPass,
          role: 'admin'
        });
        console.log(`[Stackyr Auth] Seeded primary administrator in MongoDB Atlas: ${targetEmail}`);
      } else {
        const matches = await mongoAdmin.matchPassword(targetPass);
        if (!matches || mongoAdmin.email !== targetEmail) {
          mongoAdmin.email = targetEmail;
          mongoAdmin.password = targetPass; // pre-save will re-hash
          await mongoAdmin.save();
          console.log(`[Stackyr Auth] Synchronized administrator in MongoDB Atlas.`);
        }
      }
    } catch (err) {
      console.warn('[Stackyr Auth] MongoDB Atlas admin sync note:', err.message);
    }
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-client';
    const rateLimitKey = `${clientIp}_${email || ''}`.toLowerCase();

    // Check brute-force lockout
    const rateStatus = checkRateLimit(rateLimitKey);
    if (!rateStatus.allowed) {
      return res.status(429).json({
        success: false,
        message: rateStatus.message
      });
    }

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Administrator email and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const targetAdminEmail = getAdminEmail();
    const targetAdminPass = getAdminPassword();

    // --- Embedded JSON / Fallback Mode ---
    if (isFallbackActive()) {
      ensureDefaultAdmin();
      const db = getFallbackDb();
      const user = db.users.find(u => u.email === cleanEmail);

      let isMatch = false;
      if (user) {
        isMatch = bcrypt.compareSync(password, user.password);
      }

      // Direct match with environment credentials as fail-safe
      if (!isMatch && cleanEmail === targetAdminEmail && password === targetAdminPass) {
        isMatch = true;
      }

      if (!isMatch) {
        const failInfo = registerFailedAttempt(rateLimitKey);
        return res.status(401).json({
          success: false,
          message: failInfo.message
        });
      }

      resetAttempts(rateLimitKey);
      const activeUser = user || {
        _id: 'user_admin_1',
        name: 'Stackyr Super Admin',
        email: cleanEmail,
        role: 'admin'
      };

      const token = generateToken(activeUser);
      return res.json({
        success: true,
        data: {
          token,
          user: {
            id: activeUser._id,
            name: activeUser.name,
            email: activeUser.email,
            role: activeUser.role
          }
        }
      });
    }

    // --- MongoDB Mode ---
    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      // If admin from environment logs in and doesn't exist in MongoDB yet
      if (cleanEmail === targetAdminEmail && password === targetAdminPass) {
        user = await User.create({
          name: 'Stackyr Super Admin',
          email: targetAdminEmail,
          password: targetAdminPass,
          role: 'admin'
        });
      } else {
        const failInfo = registerFailedAttempt(rateLimitKey);
        return res.status(401).json({
          success: false,
          message: failInfo.message
        });
      }
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const failInfo = registerFailedAttempt(rateLimitKey);
      return res.status(401).json({
        success: false,
        message: failInfo.message
      });
    }

    resetAttempts(rateLimitKey);
    const token = generateToken(user);
    return res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('[Stackyr Auth Error]:', error);
    res.status(500).json({ success: false, message: 'Internal server error during authentication.', error: error.message });
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    if (isFallbackActive()) {
      await ensureDefaultAdmin();
      const user = getFallbackDb().users.find(u => u._id === userId || u.email === userEmail);
      if (!user) {
        return res.status(404).json({ success: false, message: 'Administrator account not found.' });
      }
      return res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    let user = null;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      user = await User.findById(userId).select('-password');
    }
    if (!user && userEmail) {
      user = await User.findOne({ email: userEmail }).select('-password');
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'Administrator account not found.' });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
