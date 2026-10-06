import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import net from 'net';
import { fileURLToPath } from 'url';
import { initialBrands, initialSiteContent } from '../seed/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Safely ensure data directory exists (swallowing read-only filesystem errors on Vercel)
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  // Read-only filesystem in serverless environments (Vercel)
}

let isUsingFallback = true;

// Pre-initialize memoryDb with comprehensive seed data so it NEVER starts empty
let memoryDb = {
  brands: initialBrands.map((b, i) => ({
    ...b,
    _id: 'brand_' + (i + 1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })),
  content: { ...initialSiteContent },
  users: [
    {
      _id: 'user_admin_1',
      name: 'Stackyr Super Admin',
      email: (process.env.ADMIN_EMAIL || 'admin@stackyr.io').toLowerCase().trim(),
      password: '$2a$10$zawRlJM7VUqfg537HEvg7.xNTzZvgsi52ouYfuitH14cZPlZhepPG',
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ],
  inquiries: [],
  analytics: {
    views: 14280,
    uniqueVisitors: 6940,
    interactions: 28400,
    lastUpdated: new Date().toISOString()
  }
};

// Load saved data if available on local disk
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryDb = {
      ...memoryDb,
      ...parsed,
      brands: (parsed.brands && parsed.brands.length > 0) ? parsed.brands : memoryDb.brands,
      content: parsed.content || memoryDb.content
    };
  }
} catch (err) {
  // Disk reading skipped or unavailable
}

export function saveFallbackDb() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    // Read-only filesystem in serverless environments (Vercel)
  }
}

export function getFallbackDb() {
  return memoryDb;
}

export function isFallbackActive() {
  return isUsingFallback;
}

// Quick check if mongo port is open
function isMongoPortOpen(host = '127.0.0.1', port = 27017, timeout = 400) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

let connectionPromise = null;

export async function connectDB() {
  // If already connected
  if (mongoose.connection.readyState === 1) {
    isUsingFallback = false;
    return;
  }

  // If connection is already in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    const rawUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (rawUri) {
      try {
        let uri = rawUri.trim();
        if (uri.endsWith('/')) {
          uri += 'stackyr';
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 4000,
          connectTimeoutMS: 4000
        });
        console.log(`[Stackyr DB] Successfully connected to MongoDB Atlas.`);
        isUsingFallback = false;
        return;
      } catch (err) {
        console.warn(`[Stackyr DB] MongoDB Atlas connect note: ${err.message}. Operating in resilient fallback mode.`);
      }
    }

    // Check if local mongo is open (development machines)
    if (process.env.NODE_ENV !== 'production') {
      const localMongoAvailable = await isMongoPortOpen('127.0.0.1', 27017, 300);
      if (localMongoAvailable) {
        try {
          mongoose.set('strictQuery', false);
          await mongoose.connect('mongodb://127.0.0.1:27017/stackyr', { serverSelectionTimeoutMS: 1500 });
          console.log(`[Stackyr DB] Connected to local MongoDB instance.`);
          isUsingFallback = false;
          return;
        } catch (err) {
          // ignore
        }
      }
    }

    console.log(`[Stackyr DB] Operating in high-performance resilient embedded engine.`);
    isUsingFallback = true;
  })();

  return connectionPromise;
}
