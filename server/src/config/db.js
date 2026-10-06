import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import net from 'net';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let isUsingFallback = true;
let memoryDb = {
  brands: [],
  content: null,
  users: [],
  inquiries: [],
  analytics: {
    views: 14280,
    uniqueVisitors: 6940,
    interactions: 28400,
    lastUpdated: new Date().toISOString()
  }
};

// Load saved data if available
if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    memoryDb = { ...memoryDb, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to parse local db.json, initializing fresh store:', err.message);
  }
}

export function saveFallbackDb() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local db.json:', err.message);
  }
}

export function getFallbackDb() {
  return memoryDb;
}

export function isFallbackActive() {
  return isUsingFallback;
}

// Quick check if mongo port is open
function isMongoPortOpen(host = '127.0.0.1', port = 27017, timeout = 600) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let isConnected = false;

    socket.setTimeout(timeout);
    socket.once('connect', () => {
      isConnected = true;
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

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
      console.log(`[Stackyr DB] Connected to MongoDB URI: ${uri}`);
      isUsingFallback = false;
      return;
    } catch (err) {
      console.warn(`[Stackyr DB] Failed to connect to MONGODB_URI: ${err.message}. Using fallback engine.`);
    }
  }

  // Check if local mongo is open
  const localMongoAvailable = await isMongoPortOpen('127.0.0.1', 27017, 500);
  if (localMongoAvailable) {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect('mongodb://127.0.0.1:27017/stackyr', { serverSelectionTimeoutMS: 1500 });
      console.log(`[Stackyr DB] Connected to local MongoDB instance on port 27017.`);
      isUsingFallback = false;
      return;
    } catch (err) {
      console.warn(`[Stackyr DB] Local Mongo connect error: ${err.message}. Using fallback engine.`);
    }
  }

  console.log(`[Stackyr DB] Operating in high-performance Embedded Engine with JSON persistence.`);
  isUsingFallback = true;
}
