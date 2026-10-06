import { Brand } from '../models/Brand.js';
import { isFallbackActive, getFallbackDb, saveFallbackDb } from '../config/db.js';
import { initialBrands } from '../seed/seedData.js';

function ensureMemoryBrands() {
  const db = getFallbackDb();
  if (!db.brands || db.brands.length === 0) {
    db.brands = initialBrands.map((b, i) => ({
      ...b,
      _id: 'brand_' + (i + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    saveFallbackDb();
  }
}

// GET /api/brands
export async function getBrands(req, res) {
  try {
    const { category, status, featured, comingSoon } = req.query;

    if (isFallbackActive()) {
      ensureMemoryBrands();
      let list = [...getFallbackDb().brands];

      if (category && category !== 'All') {
        list = list.filter(b => b.category === category);
      }
      if (status) {
        list = list.filter(b => b.status === status);
      }
      if (featured !== undefined) {
        list = list.filter(b => String(b.featured) === String(featured));
      }
      if (comingSoon !== undefined) {
        list = list.filter(b => String(b.isComingSoon) === String(comingSoon));
      }

      list.sort((a, b) => (a.order || 0) - (b.order || 0));
      return res.json({ success: true, count: list.length, data: list });
    }

    const query = {};
    if (category && category !== 'All') query.category = category;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === 'true';
    if (comingSoon !== undefined) query.isComingSoon = comingSoon === 'true';

    let brands = await Brand.find(query).sort({ order: 1, createdAt: -1 });

    // If MongoDB Atlas has 0 brands, auto-seed initial brands
    if (brands.length === 0 && (!category || category === 'All') && !status) {
      try {
        const count = await Brand.countDocuments();
        if (count === 0) {
          console.log('[Stackyr DB] Populating empty Atlas cluster with initial brands...');
          await Brand.insertMany(initialBrands);
          brands = await Brand.find(query).sort({ order: 1, createdAt: -1 });
        }
      } catch (seedErr) {
        // continue
      }
    }

    res.json({ success: true, count: brands.length, data: brands });
  } catch (error) {
    console.warn('[Stackyr Brands] Serving resilient fallback due to DB note:', error.message);
    ensureMemoryBrands();
    let list = [...getFallbackDb().brands];
    return res.json({ success: true, count: list.length, data: list });
  }
}

// GET /api/brands/:id
export async function getBrandById(req, res) {
  try {
    const { id } = req.params;

    if (isFallbackActive()) {
      ensureMemoryBrands();
      const brand = getFallbackDb().brands.find(b => b._id === id || b.slug === id);
      if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
      return res.json({ success: true, data: brand });
    }

    let brand = null;
    try {
      brand = await Brand.findOne({ $or: [{ _id: id }, { slug: id }] });
    } catch (e) {
      // id might not be ObjectId, check by slug
      brand = await Brand.findOne({ slug: id });
    }

    if (!brand) {
      ensureMemoryBrands();
      const fallbackBrand = getFallbackDb().brands.find(b => b._id === id || b.slug === id);
      if (fallbackBrand) return res.json({ success: true, data: fallbackBrand });
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    res.json({ success: true, data: brand });
  } catch (error) {
    ensureMemoryBrands();
    const fallbackBrand = getFallbackDb().brands.find(b => b._id === req.params.id || b.slug === req.params.id);
    if (fallbackBrand) return res.json({ success: true, data: fallbackBrand });
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

// POST /api/brands
export async function createBrand(req, res) {
  try {
    const brandData = req.body;

    if (typeof brandData.services === 'string') {
      try {
        brandData.services = JSON.parse(brandData.services);
      } catch {
        brandData.services = brandData.services.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    if (typeof brandData.socialLinks === 'string') {
      try {
        brandData.socialLinks = JSON.parse(brandData.socialLinks);
      } catch {
        brandData.socialLinks = {};
      }
    }

    if (typeof brandData.metrics === 'string') {
      try {
        brandData.metrics = JSON.parse(brandData.metrics);
      } catch {
        brandData.metrics = [];
      }
    }

    if (req.file) {
      brandData.logo = `/uploads/${req.file.filename}`;
    }

    if (!brandData.slug && brandData.name) {
      brandData.slug = brandData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    if (isFallbackActive()) {
      ensureMemoryBrands();
      const db = getFallbackDb();
      const newBrand = {
        ...brandData,
        _id: 'brand_' + Date.now(),
        order: brandData.order !== undefined ? Number(brandData.order) : db.brands.length + 1,
        featured: brandData.featured === true || brandData.featured === 'true',
        isComingSoon: brandData.isComingSoon === true || brandData.isComingSoon === 'true',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.brands.push(newBrand);
      saveFallbackDb();
      return res.status(201).json({ success: true, data: newBrand });
    }

    if (brandData.order === undefined) {
      const count = await Brand.countDocuments();
      brandData.order = count + 1;
    }

    const brand = await Brand.create(brandData);
    res.status(201).json({ success: true, data: brand });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(400).json({ success: false, message: error.message });
  }
}

// PUT /api/brands/:id
export async function updateBrand(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (typeof updateData.services === 'string') {
      try {
        updateData.services = JSON.parse(updateData.services);
      } catch {
        updateData.services = updateData.services.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    if (typeof updateData.socialLinks === 'string') {
      try {
        updateData.socialLinks = JSON.parse(updateData.socialLinks);
      } catch {
        // keep as is
      }
    }

    if (typeof updateData.metrics === 'string') {
      try {
        updateData.metrics = JSON.parse(updateData.metrics);
      } catch {
        // keep as is
      }
    }

    if (req.file) {
      updateData.logo = `/uploads/${req.file.filename}`;
    }

    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === true || updateData.featured === 'true';
    }
    if (updateData.isComingSoon !== undefined) {
      updateData.isComingSoon = updateData.isComingSoon === true || updateData.isComingSoon === 'true';
    }
    if (updateData.order !== undefined) {
      updateData.order = Number(updateData.order);
    }

    if (isFallbackActive()) {
      ensureMemoryBrands();
      const db = getFallbackDb();
      const index = db.brands.findIndex(b => b._id === id || b.slug === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Brand not found' });
      }

      db.brands[index] = {
        ...db.brands[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      saveFallbackDb();
      return res.json({ success: true, data: db.brands[index] });
    }

    const brand = await Brand.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, data: brand });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(400).json({ success: false, message: error.message });
  }
}

// DELETE /api/brands/:id
export async function deleteBrand(req, res) {
  try {
    const { id } = req.params;

    if (isFallbackActive()) {
      ensureMemoryBrands();
      const db = getFallbackDb();
      const index = db.brands.findIndex(b => b._id === id || b.slug === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Brand not found' });
      }
      const removed = db.brands.splice(index, 1);
      saveFallbackDb();
      return res.json({ success: true, message: 'Brand removed', data: removed[0] });
    }

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, message: 'Brand removed', data: brand });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// PUT /api/brands/reorder
export async function reorderBrands(req, res) {
  try {
    const { orderList } = req.body; // Array of { id, order }

    if (!Array.isArray(orderList)) {
      return res.status(400).json({ success: false, message: 'orderList must be an array' });
    }

    if (isFallbackActive()) {
      ensureMemoryBrands();
      const db = getFallbackDb();
      orderList.forEach(item => {
        const brand = db.brands.find(b => b._id === item.id || b.slug === item.id);
        if (brand) brand.order = item.order;
      });
      db.brands.sort((a, b) => a.order - b.order);
      saveFallbackDb();
      return res.json({ success: true, message: 'Brand order updated', data: db.brands });
    }

    const operations = orderList.map(item => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } }
      }
    }));

    await Brand.bulkWrite(operations);
    const updatedBrands = await Brand.find().sort({ order: 1 });
    res.json({ success: true, message: 'Brand order updated', data: updatedBrands });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
