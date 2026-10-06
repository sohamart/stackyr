import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    hero: {
      badgeText: { type: String, default: 'Autonomous Ecosystem • Next Gen' },
      title: { type: String, default: 'Stacking Intelligence.' },
      titleAccent: { type: String, default: 'Powering Tomorrow.' },
      tagline: { type: String, default: 'The unified ecosystem of breakthrough AI ventures, high-velocity infrastructure, and intelligent autonomy.' },
      ctaText: { type: String, default: 'Explore Ecosystem' },
      ctaLink: { type: String, default: '#ecosystem' },
      secondaryCtaText: { type: String, default: 'Discover WEBIND' },
      secondaryCtaLink: { type: String, default: '#webind' },
      videoUrl: { type: String, default: '/videos/stackyr-showcase.mp4' },
      stats: [
        { label: { type: String }, value: { type: String }, detail: { type: String } }
      ]
    },
    webind: {
      badge: { type: String, default: 'Flagship Platform' },
      title: { type: String, default: 'WEBIND by Stackyr' },
      tagline: { type: String, default: 'Next-Generation Autonomous Web Infrastructure & Digital Acceleration' },
      description: { type: String, default: 'WEBIND unifies hyper-scalable cloud edge computing, multi-agent AI web orchestration, and sub-millisecond dynamic asset compilation into a single, bulletproof developer stack.' },
      liveUrl: { type: String, default: 'https://webind.stackyr.io' },
      previewImage: { type: String, default: '/uploads/originals/stackyr-brand-dark.jpeg' },
      highlights: [
        { title: { type: String }, desc: { type: String }, metric: { type: String } }
      ],
      techStack: [{ type: String }]
    },
    story: {
      badge: { type: String, default: 'The Stackyr Ethos' },
      title: { type: String, default: 'Architecture of Collective Intelligence' },
      paragraphs: [{ type: String }],
      mission: { type: String, default: 'To orchestrate, incubate, and scale synergistic deep-tech brands that collectively solve humanity’s high-computation frontiers.' },
      vision: { type: String, default: 'An interconnected hyper-intelligence fabric where every stacked node amplifies all others.' },
      pillars: [
        { title: { type: String }, desc: { type: String }, icon: { type: String } }
      ]
    },
    capabilities: {
      badge: { type: String, default: 'Core Capabilities' },
      title: { type: String, default: 'How We Stack Intelligence' },
      subtitle: { type: String, default: 'Modular, composable, and relentlessly optimized foundations powering each entity in our venture stack.' },
      items: [
        {
          id: { type: String },
          title: { type: String },
          description: { type: String },
          metrics: { type: String },
          tags: [{ type: String }]
        }
      ]
    },
    cta: {
      badge: { type: String, default: 'Partner & Build' },
      title: { type: String, default: 'Ready to Stack Intelligence With Us?' },
      description: { type: String, default: 'Whether you are scaling an intelligent venture or seeking synergistic enterprise integration, let’s shape what’s next.' },
      buttonText: { type: String, default: 'Initiate Dialogue' },
      email: { type: String, default: 'ventures@stackyr.io' }
    },
    sectionsConfig: {
      heroEnabled: { type: Boolean, default: true },
      featuredEnabled: { type: Boolean, default: true },
      ecosystemEnabled: { type: Boolean, default: true },
      webindEnabled: { type: Boolean, default: true },
      capabilitiesEnabled: { type: Boolean, default: true },
      storyEnabled: { type: Boolean, default: true },
      comingSoonEnabled: { type: Boolean, default: true },
      ctaEnabled: { type: Boolean, default: true }
    },
    visualAssets: {
      mainLogoDark: { type: String, default: '/stackyr-full-dark.png' },
      mainLogoLight: { type: String, default: '/stackyr-full-light.png' },
      iconLogoDark: { type: String, default: '/stackyr-icon-dark.png' },
      iconLogoLight: { type: String, default: '/stackyr-icon-light.png' },
      heroBgStyle: { type: String, default: 'mesh-particle' }
    }
  },
  {
    timestamps: true
  }
);

export const SiteContent = mongoose.model('SiteContent', contentSchema);
