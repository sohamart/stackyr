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
    },
    trustMarquee: {
      badge: { type: String, default: 'TRUSTED BY GLOBAL ARCHITECTS & SYSTEM ENGINEERS' }
    },
    homeFeatured: {
      badge: { type: String, default: 'FEATURED VENTURE SPOTLIGHT' },
      title: { type: String, default: 'Pillars of' },
      titleAccent: { type: String, default: 'Compounding Scale' },
      viewAllText: { type: String, default: 'Explore All 8+ Stackyr Ventures & Stealth Pipeline' }
    },
    homeEthosBanner: {
      badge: { type: String, default: 'WHY WE STACK INTELLIGENCE' },
      title: { type: String, default: 'Intelligence compounds when' },
      titleAccent: { type: String, default: 'layered synergistically.' },
      paragraph: { type: String, default: 'Stackyr eliminates bureaucratic drag and venture silos. Every stacked entity feeds telemetry, cryptographic security, and computational edge into every other.' },
      primaryBtnText: { type: String, default: 'Read Full Story & Vision' },
      secondaryBtnText: { type: String, default: 'Initiate Dialogue' }
    },
    homeReviews: {
      badge: { type: String, default: 'VERIFIED ARCHITECTURAL REVIEWS' },
      title: { type: String, default: 'Validated by Systems Architects &' },
      titleAccent: { type: String, default: 'Founders.' },
      subtitle: { type: String, default: 'Real-world telemetry and verified architectural feedback across 14,000+ deployments.' },
      ratingScore: { type: String, default: '4.98 / 5.0' },
      ratingSubtext: { type: String, default: 'Across 14,000+ Global Nodes' }
    },
    homeContactCard: {
      badge: { type: String, default: 'DIRECT PROTOCOL COLLABORATION' },
      title: { type: String, default: 'Ready to Compound' },
      titleAccent: { type: String, default: 'Intelligence?' },
      description: { type: String, default: "Whether you're deploying bare-metal AI clusters, pitching a venture to the Stackyr ecosystem, or integrating Webind edge compute, our leadership collective is ready." },
      primaryBtnText: { type: String, default: 'Open Contact Portal' },
      copyBtnText: { type: String, default: 'Copy Sovereign Email' },
      email: { type: String, default: 'ventures@stackyr.io' },
      responseNotice: { type: String, default: 'Average cryptographic SLA handshake: < 4 hours' }
    },
    community: {
      badge: { type: String, default: 'DEVELOPER & HACKER COLLECTIVE • 14,200+ SYSTEMS ARCHITECTS' },
      title: { type: String, default: 'Stackyr Community:' },
      titleAccent: { type: String, default: 'The Engineering Crucible.' },
      description: { type: String, default: 'An open technical collective within the Stackyr ecosystem. Where systems architects, kernel hackers, and AI researchers gather to stress-test zero-trust enclaves, optimize edge WASM runtimes, and build sovereign computing architectures.' },
      discordLink: { type: String, default: 'https://discord.gg/stackyr' },
      discordButtonText: { type: String, default: 'Enter Stackyr Community Discord' },
      discordComingSoon: { type: Boolean, default: false },
      discordComingSoonBadge: { type: String, default: 'COMING SOON' },
      githubLink: { type: String, default: 'https://github.com/stackyr' },
      githubButtonText: { type: String, default: 'Explore GitHub Repos' },
      githubComingSoon: { type: Boolean, default: false },
      githubComingSoonBadge: { type: String, default: 'COMING SOON' },
      stats: [
        { label: { type: String }, value: { type: String } }
      ],
      pillars: [
        { title: { type: String }, desc: { type: String }, badge: { type: String } }
      ],
      workingGroups: [
        { name: { type: String }, lead: { type: String }, count: { type: String }, status: { type: String } }
      ]
    },
    footer: {
      brandName: { type: String, default: 'STACKYR' },
      brandTagline: { type: String, default: 'STACKING INTELLIGENCE' },
      description: { type: String, default: 'The unified compound architecture orchestrating breakthrough AI ventures, high-velocity edge networks like WEBIND, and sovereign computing fabrics.' },
      statusText: { type: String, default: 'GLOBAL MESH OPERATIONAL • 99.999%' },
      col2Title: { type: String, default: 'ARCHITECTURE NAV' },
      col3Title: { type: String, default: 'VENTURE CONSTELLATION' },
      col4Title: { type: String, default: 'CONNECT & BUILD' },
      col4Description: { type: String, default: 'Join the engineering collective, submit venture pitches, or access bare-metal testnets.' },
      discordText: { type: String, default: 'Discord Collective' },
      discordUrl: { type: String, default: 'https://discord.gg/stackyr' },
      githubText: { type: String, default: 'GitHub Repositories' },
      githubUrl: { type: String, default: 'https://github.com/stackyr' },
      email: { type: String, default: 'ventures@stackyr.io' },
      ctaButtonText: { type: String, default: 'Initiate Dialogue' },
      copyrightText: { type: String, default: '© 2026 STACKYR Ecosystem Inc. “Stacking Intelligence”. All Rights Reserved.' },
      privacyPolicyText: { type: String, default: 'Privacy Policy' },
      termsOfServiceText: { type: String, default: 'Terms of Service' },
      constellationList: {
        type: [
          { name: { type: String }, tag: { type: String }, link: { type: String } }
        ],
        default: () => [
          { name: 'WEBIND (Edge Compute)', tag: 'Flagship', link: 'webind' },
          { name: 'Kronix AI (Cognitive Swarms)', tag: '', link: 'brands' },
          { name: 'Cybermesh (zk-Cryptography)', tag: '', link: 'brands' },
          { name: 'Synapth (Vector Fabrics)', tag: '', link: 'brands' },
          { name: 'NeuroGrid (Silicon Edge)', tag: '', link: 'brands' }
        ]
      }
    }
  },
  {
    timestamps: true,
    strict: false
  }
);

export const SiteContent = mongoose.model('SiteContent', contentSchema);
