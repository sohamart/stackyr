import { SiteContent } from '../models/Content.js';
import { isFallbackActive, getFallbackDb, saveFallbackDb } from '../config/db.js';
import { initialSiteContent } from '../seed/seedData.js';

function ensureMemoryContent() {
  const db = getFallbackDb();
  if (!db.content) {
    db.content = { ...initialSiteContent };
    saveFallbackDb();
  }
}

// GET /api/content
export async function getContent(req, res) {
  try {
    if (isFallbackActive()) {
      ensureMemoryContent();
      return res.json({ success: true, data: getFallbackDb().content || initialSiteContent });
    }

    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create(initialSiteContent);
    }
    res.json({ success: true, data: content });
  } catch (error) {
    console.warn('[Stackyr Content] Serving resilient fallback due to DB note:', error.message);
    ensureMemoryContent();
    return res.json({ success: true, data: getFallbackDb().content || initialSiteContent });
  }
}

// PUT /api/content
export async function updateContent(req, res) {
  try {
    const updateData = req.body;

    if (isFallbackActive()) {
      ensureMemoryContent();
      const db = getFallbackDb();
      const current = db.content || { ...initialSiteContent };

      // Deeply merge all incoming sections
      const merged = { ...current };
      for (const [key, val] of Object.entries(updateData)) {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          merged[key] = { ...(current[key] || {}), ...val };
        } else {
          merged[key] = val;
        }
      }
      merged.updatedAt = new Date().toISOString();
      db.content = merged;
      saveFallbackDb();
      return res.json({ success: true, message: 'Site content updated successfully', data: db.content });
    }

    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create({ ...initialSiteContent, ...updateData });
    } else {
      for (const [key, val] of Object.entries(updateData)) {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          content[key] = { ...(content[key] || {}), ...val };
        } else {
          content[key] = val;
        }
      }
      content.markModified?.('hero');
      content.markModified?.('capabilities');
      content.markModified?.('homeFeatured');
      content.markModified?.('homeEthosBanner');
      content.markModified?.('homeReviews');
      content.markModified?.('homeContactCard');
      content.markModified?.('trustMarquee');
      content.markModified?.('sectionsConfig');
      content.markModified?.('community');
      content.markModified?.('footer');
      await content.save();
    }

    res.json({ success: true, message: 'Site content updated successfully', data: content });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(400).json({ success: false, message: error.message });
  }
}

// POST /api/content/inquiries
export async function submitInquiry(req, res) {
  try {
    const { name, email, brandInterest, message, company } = req.body;
    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required' });
    }

    const inquiry = {
      id: 'inq_' + Date.now(),
      name: name || 'Anonymous',
      email,
      brandInterest: brandInterest || 'General Stackyr Ecosystem',
      company: company || 'Individual',
      message,
      createdAt: new Date().toISOString()
    };

    const db = getFallbackDb();
    if (!db.inquiries) db.inquiries = [];
    db.inquiries.unshift(inquiry);
    saveFallbackDb();

    res.status(201).json({ success: true, message: 'Inquiry received. The Stackyr team will reach out shortly.', data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET /api/content/inquiries (admin)
export async function getInquiries(req, res) {
  try {
    const db = getFallbackDb();
    const inquiries = db.inquiries || [];
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
