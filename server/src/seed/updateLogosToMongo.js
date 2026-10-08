import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateLogos() {
  const rawUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!rawUri) {
    console.error('No MONGO_URI provided');
    process.exit(1);
  }

  let uri = rawUri.trim();
  if (uri.endsWith('/')) {
    uri += 'stackyr';
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('Connected!');

  const uploadsDir = path.resolve(__dirname, '../../uploads');
  const webletsLogoPath = path.join(uploadsDir, 'icon-512-1791390875154-91393297.png');
  const stackAddaLogoPath = path.join(uploadsDir, 'favicon-1791391104247-208903301.png');

  let webletsBase64 = '';
  if (fs.existsSync(webletsLogoPath)) {
    const buf = fs.readFileSync(webletsLogoPath);
    webletsBase64 = `data:image/png;base64,${buf.toString('base64')}`;
    console.log(`Loaded WEBLETS logo (${buf.length} bytes -> Base64 data URL)`);
  }

  let stackAddaBase64 = '';
  if (fs.existsSync(stackAddaLogoPath)) {
    const buf = fs.readFileSync(stackAddaLogoPath);
    stackAddaBase64 = `data:image/png;base64,${buf.toString('base64')}`;
    console.log(`Loaded Stack Adda logo (${buf.length} bytes -> Base64 data URL)`);
  }

  const brandsCol = mongoose.connection.db.collection('brands');

  if (webletsBase64) {
    const r1 = await brandsCol.updateOne(
      { $or: [{ name: 'WEBLETS' }, { slug: 'webind' }] },
      { $set: { logo: webletsBase64 } }
    );
    console.log(`Updated WEBLETS in MongoDB Atlas: matched ${r1.matchedCount}, modified ${r1.modifiedCount}`);
  }

  if (stackAddaBase64) {
    const r2 = await brandsCol.updateOne(
      { $or: [{ name: 'Stack Adda' }, { slug: 'stack-adda' }] },
      { $set: { logo: stackAddaBase64 } }
    );
    console.log(`Updated Stack Adda in MongoDB Atlas: matched ${r2.matchedCount}, modified ${r2.modifiedCount}`);
  }

  // Also update data/db.json fallback
  const dbJsonPath = path.resolve(__dirname, '../../data/db.json');
  if (fs.existsSync(dbJsonPath)) {
    try {
      const dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
      if (dbData.brands && Array.isArray(dbData.brands)) {
        dbData.brands.forEach(b => {
          if ((b.name === 'WEBLETS' || b.slug === 'webind') && webletsBase64) {
            b.logo = webletsBase64;
          }
          if ((b.name === 'Stack Adda' || b.slug === 'stack-adda') && stackAddaBase64) {
            b.logo = stackAddaBase64;
          }
        });
        fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf8');
        console.log('Updated data/db.json with base64 logos as well!');
      }
    } catch (e) {
      console.warn('Could not update db.json:', e.message);
    }
  }

  const allBrands = await brandsCol.find({}).toArray();
  console.log('\n--- Current Brands in MongoDB Atlas ---');
  allBrands.forEach(b => {
    console.log(`- ${b.name} (${b.slug}) | Logo length: ${b.logo?.length || 0} | Starts with: ${b.logo?.substring(0, 30)}`);
  });

  await mongoose.disconnect();
  console.log('\nDone! MongoDB Atlas logos successfully updated.');
  process.exit(0);
}

updateLogos().catch(err => {
  console.error('Update error:', err);
  process.exit(1);
});
