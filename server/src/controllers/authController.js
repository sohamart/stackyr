import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { isFallbackActive, getFallbackDb, saveFallbackDb } from '../config/db.js';

const DEFAULT_ADMIN_EMAIL = 'admin@stackyr.io';
const DEFAULT_ADMIN_PASS = 'stackyr2026!';

function ensureDefaultAdmin() {
  const db = getFallbackDb();
  if (!db.users || db.users.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(DEFAULT_ADMIN_PASS, salt);
    db.users = [
      {
        _id: 'user_admin_1',
        name: 'Stackyr Super Admin',
        email: DEFAULT_ADMIN_EMAIL,
        password: hash,
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    saveFallbackDb();
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isFallbackActive()) {
      ensureDefaultAdmin();
      const db = getFallbackDb();
      const user = db.users.find(u => u.email === cleanEmail);

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

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
    }

    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      // If no admin user exists in DB yet, auto-create default
      if (cleanEmail === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASS) {
        user = await User.create({
          name: 'Stackyr Super Admin',
          email: DEFAULT_ADMIN_EMAIL,
          password: DEFAULT_ADMIN_PASS,
          role: 'admin'
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
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
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    const userId = req.user.id;

    if (isFallbackActive()) {
      ensureDefaultAdmin();
      const user = getFallbackDb().users.find(u => u._id === userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
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

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
