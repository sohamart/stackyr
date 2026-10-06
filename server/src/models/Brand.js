import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      trim: true
    },
    tagline: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: true,
      default: 'AI & Intelligence'
    },
    logo: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: ''
    },
    accentColor: {
      type: String,
      default: '#FF6B00'
    },
    websiteUrl: {
      type: String,
      default: ''
    },
    socialLinks: {
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      discord: { type: String, default: '' }
    },
    services: [
      {
        type: String
      }
    ],
    metrics: [
      {
        label: { type: String },
        value: { type: String }
      }
    ],
    featured: {
      type: Boolean,
      default: false
    },
    isComingSoon: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// Slug generator helper
brandSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export const Brand = mongoose.model('Brand', brandSchema);
