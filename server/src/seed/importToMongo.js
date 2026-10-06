import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { Brand } from '../models/Brand.js';
import { SiteContent } from '../models/Content.js';
import { User } from '../models/User.js';
import { initialBrands, initialSiteContent } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runImport() {
  console.log('====================================================');
  console.log('  🚀 STACKYR MONGODB ATLAS DIRECT DATA IMPORTER');
  console.log('====================================================');

  const rawUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!rawUri) {
    console.error('❌ ERROR: Neither MONGO_URI nor MONGODB_URI found in environment!');
    process.exit(1);
  }

  let uri = rawUri.trim();
  if (uri.endsWith('/')) {
    uri += 'stackyr';
  }

  console.log(`📡 Connecting to MongoDB Atlas: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}...`);
  
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    });
    console.log('✅ Connected to MongoDB Atlas successfully!\n');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }

  // 1. Load data from db.json if available, otherwise seedData.js
  let brandsToImport = [...initialBrands];
  let contentToImport = { ...initialSiteContent };

  const dbJsonPath = path.resolve(__dirname, '../../data/db.json');
  if (fs.existsSync(dbJsonPath)) {
    try {
      const rawData = fs.readFileSync(dbJsonPath, 'utf-8');
      const parsed = JSON.parse(rawData);
      if (parsed.brands && parsed.brands.length > 0) {
        brandsToImport = parsed.brands;
        console.log(`📦 Loaded ${brandsToImport.length} brands from data/db.json`);
      }
      if (parsed.content) {
        contentToImport = parsed.content;
        console.log(`📦 Loaded site content configuration from data/db.json`);
      }
    } catch (e) {
      console.warn('⚠️ Could not parse data/db.json, using seedData.js fallback.');
    }
  }

  // 2. Import Brands
  console.log('\n--- [1/3] Importing Brands Portfolio ---');
  let importedBrandsCount = 0;
  for (const b of brandsToImport) {
    const brandData = { ...b };
    // Remove custom string _id if present so Mongoose can assign clean ObjectId or keep standard
    delete brandData._id;
    delete brandData.__v;

    const slug = brandData.slug || brandData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await Brand.findOneAndUpdate(
      { slug },
      { $set: { ...brandData, slug } },
      { upsert: true, new: true, runValidators: false }
    );
    console.log(`  ✓ Synced Brand: "${brandData.name}" (${slug})`);
    importedBrandsCount++;
  }
  const totalBrandsInDb = await Brand.countDocuments();
  console.log(`✨ Brands Sync Complete: ${totalBrandsInDb} brands currently in MongoDB Atlas.`);

  // 3. Import Site Content
  console.log('\n--- [2/3] Importing Site Content (CMS) ---');
  await SiteContent.deleteMany({});
  const createdContent = await SiteContent.create(contentToImport);
  console.log(`  ✓ Created SiteContent Document ID: ${createdContent._id}`);
  console.log(`✨ Site Content Sync Complete: Hero, WEBIND, Story, Capabilities, CTA all configured.`);

  // 4. Import / Update Sovereign Admin User
  console.log('\n--- [3/3] Importing Administrator Account ---');
  const adminEmail = (process.env.ADMIN_EMAIL || 'sohamduttabwn@gmail.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Rohit@1905';

  let adminUser = await User.findOne({ email: adminEmail });
  if (!adminUser) {
    // Check if any admin exists
    adminUser = await User.findOne({ role: 'admin' });
  }

  if (adminUser) {
    adminUser.name = 'Soham Dutta';
    adminUser.email = adminEmail;
    adminUser.password = adminPassword; // pre('save') hook will hash with bcrypt
    adminUser.role = 'admin';
    await adminUser.save();
    console.log(`  ✓ Updated existing Admin User to email: ${adminEmail}`);
  } else {
    adminUser = await User.create({
      name: 'Soham Dutta',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });
    console.log(`  ✓ Created new Sovereign Admin User: ${adminEmail}`);
  }

  // Remove old dummy admin if it exists under different email
  await User.deleteMany({ email: { $ne: adminEmail } });

  console.log(`✨ Admin Credentials Verified in MongoDB Atlas:`);
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Role: ${adminUser.role}`);

  console.log('\n====================================================');
  console.log('🎉 ALL DATA SUCCESSFULLY IMPORTED TO MONGODB ATLAS!');
  console.log('====================================================\n');

  await mongoose.disconnect();
  process.exit(0);
}

runImport().catch((err) => {
  console.error('Fatal import error:', err);
  process.exit(1);
});
