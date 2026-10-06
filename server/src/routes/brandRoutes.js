import express from 'express';
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  reorderBrands
} from '../controllers/brandController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getBrands)
  .post(protect, upload.single('logoFile'), createBrand);

router.put('/reorder', protect, reorderBrands);

router.route('/:id')
  .get(getBrandById)
  .put(protect, upload.single('logoFile'), updateBrand)
  .delete(protect, deleteBrand);

export default router;
