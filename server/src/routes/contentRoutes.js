import express from 'express';
import { getContent, updateContent, submitInquiry, getInquiries } from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getContent)
  .put(protect, updateContent);

router.post('/inquiries', submitInquiry);
router.get('/inquiries', protect, getInquiries);

export default router;
