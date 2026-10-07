import React, { useState, useEffect } from 'react';
import {
  FileText, Check, Save, Sparkles, Layers, Globe, Shield, RefreshCw,
  Home, BookOpen, Cpu, Mail, Zap, Eye, ChevronDown, ChevronRight,
  Plus, Trash2, ArrowRight, Star, Sliders, MessageSquare, ExternalLink,
  CheckCircle2, Info, Terminal, Users, Code2
} from 'lucide-react';
import { updateContent } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { resolveMediaSource } from '../../utils/mediaUtils';

export default function ContentManager({ content, onRefresh }) {
  const { success, error } = useToast();
  const [activePage, setActivePage] = useState('home'); // 'home' | 'about' | 'capabilities' | 'contact' | 'webind' | 'sections'
  const [activeHomeSubSection, setActiveHomeSubSection] = useState('hero'); // 'hero' | 'featured' | 'capabilities' | 'ethos' | 'reviews' | 'contactCard' | 'marquee'
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // 1. SECTION TOGGLES
  const [sectionsConfig, setSectionsConfig] = useState({
    heroEnabled: true,
    featuredEnabled: true,
    ecosystemEnabled: true,
    webindEnabled: true,
    capabilitiesEnabled: true,
    storyEnabled: true,
    comingSoonEnabled: true,
    ctaEnabled: true
  });

  // 2. HOME HERO FORM
  const [heroForm, setHeroForm] = useState({
    badgeText: 'Autonomous Venture Ecosystem • V2.6',
    title: 'STACKING',
    titleAccent: 'INTELLIGENCE.',
    tagline: 'Stackyr orchestrates a hyper-synergistic ecosystem of breakthrough AI ventures, high-velocity web infrastructure, and sovereign computing architectures.',
    ctaText: 'Explore Ventures & Brands',
    ctaLink: '#brands',
    secondaryCtaText: 'Our Ethos & Story',
    secondaryCtaLink: '#about',
    videoUrl: '/videos/stackyr-showcase.mp4',
    stats: [
      { label: 'Ecosystem Ventures', value: '8+', detail: 'Synergistic deep-tech entities' },
      { label: 'Distributed Nodes', value: '14,280', detail: 'Global Tier-1 mesh routing' },
      { label: 'Inferences / sec', value: '850K+', detail: 'Autonomous neural throughput' },
      { label: 'SLA Fault Tolerance', value: '99.999%', detail: 'Zero-downtime architecture' }
    ]
  });

  // 3. HOME FEATURED SPOTLIGHT FORM
  const [featuredForm, setFeaturedForm] = useState({
    badge: 'FEATURED VENTURE SPOTLIGHT',
    title: 'Pillars of',
    titleAccent: 'Compounding Scale',
    viewAllText: 'Explore All 8+ Stackyr Ventures & Stealth Pipeline'
  });

  // 4. HOME & GLOBAL CAPABILITIES FORM
  const [capabilitiesForm, setCapabilitiesForm] = useState({
    badge: 'FOUNDATIONAL PILLARS',
    title: 'How We Stack Intelligence',
    subtitle: 'Modular, composable, and relentlessly optimized foundations powering each entity in our venture stack.',
    items: [
      {
        id: 'cap-1',
        title: 'Autonomous Multi-Agent Orchestration',
        description: 'Coordinated swarms of specialized cognitive agents that plan, verify, and execute multi-modal workflows across distributed telemetry.',
        metrics: 'Sub-15ms coordination latency',
        tags: ['Cognitive Mesh', 'Agent Swarms', 'Self-Healing']
      },
      {
        id: 'cap-2',
        title: 'Distributed Edge & Sovereign Infrastructure',
        description: 'Bare-metal high-density compute fabrics interconnected with zero-trust post-quantum security and low-power silicon optimization.',
        metrics: '14.2K globally distributed nodes',
        tags: ['Low-Power Silicon', 'Confidential Compute', 'Global Mesh']
      },
      {
        id: 'cap-3',
        title: 'Hyper-Velocity Web & Digital Acceleration',
        description: 'Powering platforms like WEBIND with instant compilation, zero-latency streaming pipelines, and micro-frontend federation.',
        metrics: '8.2ms worldwide average p99',
        tags: ['Edge CDN', 'WASM Runtime', 'Dynamic Bundling']
      },
      {
        id: 'cap-4',
        title: 'Exabyte-Scale Topological Vector Fabrics',
        description: 'High-density neural vector storage with mathematical similarity search designed for trillion-token context retrieval.',
        metrics: '10B+ vectors indexed concurrently',
        tags: ['Graph Search', 'HNSW Indices', 'Quantized Memory']
      },
      {
        id: 'cap-5',
        title: 'Zero-Knowledge Sovereign Defense',
        description: 'Hardware-level enclaves and verifiable zk-SNARK cryptographic guarantees for enterprise data confidentiality and compliance.',
        metrics: 'Zero-Trust hardware roots',
        tags: ['zk-ML Proofs', 'Quantum Defense', 'Audit Trails']
      },
      {
        id: 'cap-6',
        title: 'Neural Real-Time Procedural Synthesis',
        description: 'Spatial generative engines generating dynamic user interfaces, 3D assets, and procedural environments with instant tactile response.',
        metrics: '60 FPS real-time neural feed',
        tags: ['Generative UI', 'Procedural 3D', 'USDZ Pipeline']
      }
    ]
  });

  // 5. HOME ETHOS BANNER FORM
  const [ethosForm, setEthosForm] = useState({
    badge: 'WHY WE STACK INTELLIGENCE',
    title: 'Intelligence compounds when',
    titleAccent: 'layered synergistically.',
    paragraph: 'Stackyr eliminates bureaucratic drag and venture silos. Every stacked entity feeds telemetry, cryptographic security, and computational edge into every other.',
    primaryBtnText: 'Read Full Story & Vision',
    secondaryBtnText: 'Initiate Dialogue'
  });

  // 6. HOME REVIEWS & SOCIAL PROOF FORM
  const [reviewsForm, setReviewsForm] = useState({
    badge: 'ENTERPRISE & DEVELOPER FEEDBACK',
    title: 'Validated by Systems Architects &',
    titleAccent: 'Founders.',
    subtitle: 'Real-world telemetry and verified architectural feedback across 14,000+ deployments.',
    ratingScore: '4.98 / 5.0',
    ratingSubtext: 'Across 14,000+ Global Nodes'
  });

  // 7. HOME CONTACT CARD FORM
  const [homeContactForm, setHomeContactForm] = useState({
    badge: 'DIRECT PROTOCOL COLLABORATION',
    title: 'Ready to Compound',
    titleAccent: 'Intelligence?',
    description: "Whether you're deploying bare-metal AI clusters, pitching a venture to the Stackyr ecosystem, or integrating Webind edge compute, our leadership collective is ready.",
    primaryBtnText: 'Open Contact Portal',
    copyBtnText: 'Copy Sovereign Email',
    email: 'ventures@stackyr.io',
    responseNotice: 'P99 First Response: < 4 Hours'
  });

  // 8. TRUST MARQUEE FORM
  const [marqueeForm, setMarqueeForm] = useState({
    badge: 'TRUSTED BY GLOBAL ARCHITECTS & SYSTEM ENGINEERS'
  });

  // 9. ABOUT PAGE STORY FORM
  const [storyForm, setStoryForm] = useState({
    badge: 'The Stackyr Ethos & Genesis',
    title: 'Why We Stack Intelligence',
    mission: 'To orchestrate, incubate, and scale synergistic deep-tech brands that collectively solve humanity’s high-computation frontiers.',
    vision: 'An interconnected hyper-intelligence fabric where every stacked node amplifies all others.',
    paragraph1: 'In an era where isolated technology silos create computational friction, Stackyr was forged with a unified premise: intelligence compounds exponentially when layered synergistically.',
    paragraph2: 'Rather than operating disconnected startups, we build and orchestrate an interconnected constellation of specialized ventures — each mastering an essential technological layer.',
    paragraph3: 'Every brand in the Stackyr ecosystem feeds telemetry, algorithmic breakthroughs, and infrastructure into every other. When one venture scales, the entire collective intelligence ascends.',
    pillars: [
      { title: 'Synergistic Compounding', desc: 'Each venture enhances the capabilities, throughput, and technological edge of every other entity.', icon: 'Layers' },
      { title: 'Uncompromising Velocity', desc: 'We eliminate bureaucratic drag, building production-grade deep-tech at an unprecedented speed of iteration.', icon: 'Zap' },
      { title: 'Sovereign Engineering', desc: 'Foundational control over compute, cryptographic layers, and algorithmic architectures.', icon: 'Shield' }
    ]
  });

  // 10. CONTACT PAGE CTA FORM
  const [ctaForm, setCtaForm] = useState({
    badge: 'Join the Orbit',
    title: 'Ready to Stack Intelligence With Us?',
    description: 'Whether you are building the next breakthrough technology brand, seeking venture synergy, or scaling enterprise infrastructure with WEBIND, our architecture is ready.',
    buttonText: 'Initiate Venture Dialogue',
    email: 'contact@stackyr.io'
  });

  // 11. WEBIND PLATFORM FORM
  const [webindForm, setWebindForm] = useState({
    badge: 'Flagship Infrastructure Platform',
    title: 'WEBIND by Stackyr',
    tagline: 'Next-Generation Autonomous Web Infrastructure & Digital Acceleration',
    description: 'WEBIND unifies hyper-scalable cloud edge computing, multi-agent AI web orchestration, and sub-millisecond dynamic asset compilation into a single, bulletproof developer stack.',
    liveUrl: 'https://webind.stackyr.io'
  });

  // 12. STACKYR COMMUNITY PAGE FORM
  const [communityForm, setCommunityForm] = useState({
    badge: 'DEVELOPER & HACKER COLLECTIVE • 14,200+ SYSTEMS ARCHITECTS',
    title: 'Stackyr Community:',
    titleAccent: 'The Engineering Crucible.',
    description: 'An open technical collective within the Stackyr ecosystem. Where systems architects, kernel hackers, and AI researchers gather to stress-test zero-trust enclaves, optimize edge WASM runtimes, and build sovereign computing architectures.',
    discordLink: 'https://discord.gg/stackyr',
    discordButtonText: 'Enter Stackyr Community Discord',
    discordComingSoon: false,
    discordComingSoonBadge: 'COMING SOON',
    githubLink: 'https://github.com/stackyr',
    githubButtonText: 'Explore GitHub Repos',
    githubComingSoon: false,
    githubComingSoonBadge: 'COMING SOON',
    stats: [
      { label: 'Active Engineers', value: '14,200+' },
      { label: 'Micro-Grants Disbursed', value: '$250,000+' },
      { label: 'Specialized Guilds', value: '18 Units' },
      { label: 'Open-Source Repos', value: '94 Codebases' }
    ]
  });

  // 13. GLOBAL FOOTER FORM
  const [footerForm, setFooterForm] = useState({
    brandName: 'STACKYR',
    brandTagline: 'STACKING INTELLIGENCE',
    description: 'The unified compound architecture orchestrating breakthrough AI ventures, high-velocity edge networks like WEBIND, and sovereign computing fabrics.',
    statusText: 'GLOBAL MESH OPERATIONAL • 99.999%',
    col2Title: 'ARCHITECTURE NAV',
    col3Title: 'VENTURE CONSTELLATION',
    col4Title: 'CONNECT & BUILD',
    col4Description: 'Join the engineering collective, submit venture pitches, or access bare-metal testnets.',
    discordText: 'Discord Collective',
    discordUrl: 'https://discord.gg/stackyr',
    githubText: 'GitHub Repositories',
    githubUrl: 'https://github.com/stackyr',
    email: 'ventures@stackyr.io',
    ctaButtonText: 'Initiate Dialogue',
    copyrightText: '© 2026 STACKYR Ecosystem Inc. “Stacking Intelligence”. All Rights Reserved.',
    privacyPolicyText: 'Privacy Policy',
    termsOfServiceText: 'Terms of Service',
    constellationList: [
      { name: 'WEBIND (Edge Compute)', tag: 'Flagship', link: 'webind' },
      { name: 'Kronix AI (Cognitive Swarms)', tag: '', link: 'brands' },
      { name: 'Cybermesh (zk-Cryptography)', tag: '', link: 'brands' },
      { name: 'Synapth (Vector Fabrics)', tag: '', link: 'brands' },
      { name: 'NeuroGrid (Silicon Edge)', tag: '', link: 'brands' }
    ]
  });

  // Populate state on load
  useEffect(() => {
    if (content) {
      if (content.sectionsConfig) setSectionsConfig(prev => ({ ...prev, ...content.sectionsConfig }));
      if (content.hero) {
        setHeroForm({
          badgeText: content.hero.badgeText || 'Autonomous Venture Ecosystem • V2.6',
          title: content.hero.title || 'STACKING',
          titleAccent: content.hero.titleAccent || 'INTELLIGENCE.',
          tagline: content.hero.tagline || '',
          ctaText: content.hero.ctaText || 'Explore Ventures & Brands',
          ctaLink: content.hero.ctaLink || '#brands',
          secondaryCtaText: content.hero.secondaryCtaText || 'Our Ethos & Story',
          secondaryCtaLink: content.hero.secondaryCtaLink || '#about',
          videoUrl: content.hero.videoUrl || '/videos/stackyr-showcase.mp4',
          stats: content.hero.stats && content.hero.stats.length === 4
            ? content.hero.stats
            : [
                { label: 'Ecosystem Ventures', value: '8+', detail: 'Synergistic deep-tech entities' },
                { label: 'Distributed Nodes', value: '14,280', detail: 'Global Tier-1 mesh routing' },
                { label: 'Inferences / sec', value: '850K+', detail: 'Autonomous neural throughput' },
                { label: 'SLA Fault Tolerance', value: '99.999%', detail: 'Zero-downtime architecture' }
              ]
        });
      }
      if (content.homeFeatured) setFeaturedForm(prev => ({ ...prev, ...content.homeFeatured }));
      if (content.capabilities) setCapabilitiesForm(prev => ({ ...prev, ...content.capabilities }));
      if (content.homeEthosBanner) setEthosForm(prev => ({ ...prev, ...content.homeEthosBanner }));
      if (content.homeReviews) setReviewsForm(prev => ({ ...prev, ...content.homeReviews }));
      if (content.homeContactCard) setHomeContactForm(prev => ({ ...prev, ...content.homeContactCard }));
      if (content.trustMarquee) setMarqueeForm(prev => ({ ...prev, ...content.trustMarquee }));
      if (content.story) {
        setStoryForm({
          badge: content.story.badge || 'The Stackyr Ethos & Genesis',
          title: content.story.title || 'Why We Stack Intelligence',
          mission: content.story.mission || '',
          vision: content.story.vision || '',
          paragraph1: content.story.paragraphs?.[0] || '',
          paragraph2: content.story.paragraphs?.[1] || '',
          paragraph3: content.story.paragraphs?.[2] || '',
          pillars: content.story.pillars && content.story.pillars.length === 3 ? content.story.pillars : [
            { title: 'Synergistic Compounding', desc: 'Each venture enhances the capabilities, throughput, and technological edge of every other entity.', icon: 'Layers' },
            { title: 'Uncompromising Velocity', desc: 'We eliminate bureaucratic drag, building production-grade deep-tech at an unprecedented speed of iteration.', icon: 'Zap' },
            { title: 'Sovereign Engineering', desc: 'Foundational control over compute, cryptographic layers, and algorithmic architectures.', icon: 'Shield' }
          ]
        });
      }
      if (content.cta) setCtaForm(prev => ({ ...prev, ...content.cta }));
      if (content.webind) setWebindForm(prev => ({ ...prev, ...content.webind }));
      if (content.community) {
        setCommunityForm({
          badge: content.community.badge || 'DEVELOPER & HACKER COLLECTIVE • 14,200+ SYSTEMS ARCHITECTS',
          title: content.community.title || 'Stackyr Community:',
          titleAccent: content.community.titleAccent || 'The Engineering Crucible.',
          description: content.community.description !== undefined ? content.community.description : 'An open technical collective within the Stackyr ecosystem. Where systems architects, kernel hackers, and AI researchers gather to stress-test zero-trust enclaves, optimize edge WASM runtimes, and build sovereign computing architectures.',
          discordLink: content.community.discordLink || 'https://discord.gg/stackyr',
          discordButtonText: content.community.discordButtonText || 'Enter Stackyr Community Discord',
          discordComingSoon: Boolean(content.community.discordComingSoon),
          discordComingSoonBadge: content.community.discordComingSoonBadge || 'COMING SOON',
          githubLink: content.community.githubLink || 'https://github.com/stackyr',
          githubButtonText: content.community.githubButtonText || 'Explore GitHub Repos',
          githubComingSoon: Boolean(content.community.githubComingSoon),
          githubComingSoonBadge: content.community.githubComingSoonBadge || 'COMING SOON',
          stats: (content.community.stats && content.community.stats.length === 4)
            ? content.community.stats
            : [
                { label: 'Active Engineers', value: '14,200+' },
                { label: 'Micro-Grants Disbursed', value: '$250,000+' },
                { label: 'Specialized Guilds', value: '18 Units' },
                { label: 'Open-Source Repos', value: '94 Codebases' }
              ]
        });
      }
      if (content.footer) {
        setFooterForm(prev => ({
          ...prev,
          ...content.footer,
          constellationList: content.footer.constellationList && content.footer.constellationList.length > 0
            ? content.footer.constellationList
            : prev.constellationList
        }));
      }
    }
  }, [content]);

  const handleConstellationChange = (idx, field, value) => {
    const updated = [...footerForm.constellationList];
    updated[idx] = { ...updated[idx], [field]: value };
    setFooterForm({ ...footerForm, constellationList: updated });
    markDirty();
  };

  const handleAddConstellation = () => {
    setFooterForm({
      ...footerForm,
      constellationList: [
        ...footerForm.constellationList,
        { name: 'New Venture Entity', tag: '', link: 'brands' }
      ]
    });
    markDirty();
  };

  const handleRemoveConstellation = (idx) => {
    setFooterForm({
      ...footerForm,
      constellationList: footerForm.constellationList.filter((_, i) => i !== idx)
    });
    markDirty();
  };

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  const toggleSection = (key) => {
    setSectionsConfig(prev => ({ ...prev, [key]: !prev[key] }));
    markDirty();
  };

  const handleStatChange = (idx, field, value) => {
    const updated = [...heroForm.stats];
    updated[idx] = { ...updated[idx], [field]: value };
    setHeroForm({ ...heroForm, stats: updated });
    markDirty();
  };

  const handleCommunityStatChange = (idx, field, value) => {
    const updated = [...communityForm.stats];
    updated[idx] = { ...updated[idx], [field]: value };
    setCommunityForm({ ...communityForm, stats: updated });
    markDirty();
  };

  const handleCapabilityChange = (idx, field, value) => {
    const updated = [...capabilitiesForm.items];
    if (field === 'tags') {
      updated[idx] = { ...updated[idx], tags: value.split(',').map(s => s.trim()).filter(Boolean) };
    } else {
      updated[idx] = { ...updated[idx], [field]: value };
    }
    setCapabilitiesForm({ ...capabilitiesForm, items: updated });
    markDirty();
  };

  const handlePillarChange = (idx, field, value) => {
    const updated = [...storyForm.pillars];
    updated[idx] = { ...updated[idx], [field]: value };
    setStoryForm({ ...storyForm, pillars: updated });
    markDirty();
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      const payload = {
        sectionsConfig,
        hero: heroForm,
        homeFeatured: featuredForm,
        capabilities: capabilitiesForm,
        homeEthosBanner: ethosForm,
        homeReviews: reviewsForm,
        homeContactCard: homeContactForm,
        trustMarquee: marqueeForm,
        story: {
          badge: storyForm.badge,
          title: storyForm.title,
          mission: storyForm.mission,
          vision: storyForm.vision,
          paragraphs: [storyForm.paragraph1, storyForm.paragraph2, storyForm.paragraph3].filter(Boolean),
          pillars: storyForm.pillars
        },
        cta: ctaForm,
        webind: webindForm,
        community: communityForm,
        footer: footerForm
      };

      await updateContent(payload);
      success('Website content and text published successfully to live environment.');
      setIsDirty(false);
      onRefresh();
    } catch (err) {
      error(err.message || 'Failed to update site content');
    } finally {
      setLoading(false);
    }
  };

  // Section Toggles Definition
  const sectionTogglesList = [
    { key: 'heroEnabled', label: '1. Animated Ecosystem Hero', desc: 'Main headline, accent typography, interactive stats & video showcase' },
    { key: 'featuredEnabled', label: '2. Featured Venture Spotlight', desc: 'Curated high-priority venture spotlight tabs' },
    { key: 'ecosystemEnabled', label: '3. Interactive Brand Ecosystem', desc: 'Searchable multi-venture directory with category filters' },
    { key: 'capabilitiesEnabled', label: '4. Capabilities Bento Grid', desc: '6 core foundational pillars of Stacking Intelligence' },
    { key: 'storyEnabled', label: '5. Story & Ethos Callout Banner', desc: 'Collective compounding narrative & values' },
    { key: 'comingSoonEnabled', label: '6. Stealth Incubation Pipeline', desc: 'Private repositories & waitlist ventures' },
    { key: 'ctaEnabled', label: '7. Partner Contact Portal Card', desc: 'Direct protocol collaboration & intake card' }
  ];

  // Pages definition
  const pagesList = [
    { id: 'home', label: 'Home Page CMS', icon: Home, count: 'All Sections' },
    { id: 'footer', label: 'Global Footer CMS', icon: Layers, count: 'All 4 Columns' },
    { id: 'community', label: 'Stackyr Community', icon: Terminal, count: 'Dev Collective' },
    { id: 'about', label: 'About & Ethos', icon: BookOpen, count: 'Story / Vision' },
    { id: 'capabilities', label: 'Capabilities Grid', icon: Cpu, count: '6 Pillars' },
    { id: 'contact', label: 'Contact & Dialogue', icon: Mail, count: 'Intake / CTA' },
    { id: 'webind', label: 'WEBIND Flagship', icon: Zap, count: 'Infrastructure' },
    { id: 'sections', label: 'Section Toggles', icon: Sliders, count: 'Visibility' }
  ];

  // Home Page Sub-Sections definition
  const homeSubSections = [
    { id: 'hero', label: 'Hero & Stats', icon: Sparkles },
    { id: 'featured', label: 'Featured Spotlight', icon: Layers },
    { id: 'capabilities', label: 'Capabilities Bento', icon: Cpu },
    { id: 'ethos', label: 'Ethos Callout Banner', icon: BookOpen },
    { id: 'reviews', label: 'Social Proof & Rating', icon: Star },
    { id: 'contactCard', label: 'Direct Contact Card', icon: Mail },
    { id: 'marquee', label: 'Trust Partners Marquee', icon: Globe }
  ];

  const previewMedia = resolveMediaSource(heroForm.videoUrl);

  return (
    <div style={{ position: 'relative', paddingBottom: '80px' }}>
      {/* CMS Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-orange)',
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontWeight: 700
              }}
            >
              DYNAMIC CONTENT CONTROL CENTER
            </span>
            {isDirty && (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#F59E0B',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  fontWeight: 600
                }}
              >
                ● Unsaved Changes
              </span>
            )}
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            Site Content & Copy CMS
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Modify every title, accent word, description, metric card, and button label with zero code modification.
          </p>
        </div>

        {/* Desktop Save Button */}
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="btn-primary"
          style={{
            padding: '12px 24px',
            fontSize: '0.9rem',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(255, 107, 0, 0.35)',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          <Save size={16} />
          <span>{loading ? 'Publishing Changes...' : 'Publish Content Live'}</span>
        </button>
      </div>

      {/* LEVEL 1: PAGE SELECTOR BAR (Horizontal Scrollable on Mobile) */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '6px',
          borderRadius: '16px',
          background: 'rgba(12, 14, 22, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          marginBottom: '22px'
        }}
      >
        {pagesList.map((page) => {
          const Icon = page.icon;
          const active = activePage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                background: active ? 'var(--accent-orange)' : 'transparent',
                color: active ? '#000000' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <Icon size={16} color={active ? '#000000' : 'var(--text-muted)'} />
              <span>{page.label}</span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  background: active ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  color: active ? '#000000' : 'var(--text-muted)',
                  fontWeight: 600
                }}
              >
                {page.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          PAGE 1: HOME PAGE CMS (ALL TEXT CUSTOMIZATION)
      ======================================================== */}
      {activePage === 'home' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* LEVEL 2: HOME SUB-SECTION TABS */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              padding: '4px',
              borderRadius: '12px',
              background: 'rgba(6, 8, 12, 0.7)',
              border: '1px solid rgba(255, 107, 0, 0.2)',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none'
            }}
          >
            {homeSubSections.map((sec) => {
              const Icon = sec.icon;
              const active = activeHomeSubSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveHomeSubSection(sec.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: active ? 'rgba(255, 107, 0, 0.2)' : 'transparent',
                    border: `1px solid ${active ? 'var(--accent-orange)' : 'transparent'}`,
                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <Icon size={14} color={active ? 'var(--accent-orange)' : 'var(--text-muted)'} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* SUB-SECTION 1: HERO SHOWCASE & STATS */}
          {activeHomeSubSection === 'hero' && (
            <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Hero Section Typography & Call To Action
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  The very first visual node visitors experience upon landing.
                </p>
              </div>

              {/* Badge Text */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  TOP PILL BADGE TEXT
                </label>
                <input
                  type="text"
                  value={heroForm.badgeText}
                  onChange={(e) => { setHeroForm({ ...heroForm, badgeText: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '0.92rem' }}
                />
              </div>

              {/* Headlines */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    PRIMARY HEADLINE TITLE (FIRST HALF)
                  </label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => { setHeroForm({ ...heroForm, title: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '0.92rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    GRADIENT ACCENT HEADLINE (SECOND HALF)
                  </label>
                  <input
                    type="text"
                    value={heroForm.titleAccent}
                    onChange={(e) => { setHeroForm({ ...heroForm, titleAccent: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  HERO MAIN TAGLINE / MISSION STATEMENT
                </label>
                <textarea
                  rows={3}
                  value={heroForm.tagline}
                  onChange={(e) => { setHeroForm({ ...heroForm, tagline: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '0.9rem', lineHeight: 1.5 }}
                />
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    PRIMARY BUTTON TEXT
                  </label>
                  <input
                    type="text"
                    value={heroForm.ctaText}
                    onChange={(e) => { setHeroForm({ ...heroForm, ctaText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    SECONDARY BUTTON TEXT
                  </label>
                  <input
                    type="text"
                    value={heroForm.secondaryCtaText}
                    onChange={(e) => { setHeroForm({ ...heroForm, secondaryCtaText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              {/* HERO SHOWCASE MEDIA */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 107, 0, 0.05)',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      HERO SHOWCASE MEDIA URL (CLOUDINARY / IMAGEKIT / DIRECT MP4)
                    </label>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Detected Engine: <strong style={{ color: '#FFFFFF' }}>{previewMedia.provider.toUpperCase()} ({previewMedia.type})</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setHeroForm({ ...heroForm, videoUrl: '/videos/stackyr-showcase.mp4' }); markDirty(); }}
                    className="btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                  >
                    Reset Video
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="https://res.cloudinary.com/... or https://ik.imagekit.io/... or /videos/stackyr-showcase.mp4"
                  value={heroForm.videoUrl || ''}
                  onChange={(e) => { setHeroForm({ ...heroForm, videoUrl: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}
                />
              </div>

              {/* 4 HERO METRIC STAT CARDS */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                      4 Architectural Metric Stat Cards
                    </h4>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Displayed in the dynamic holographic stats ribbon below the hero headline.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '14px' }}>
                  {heroForm.stats?.map((stat, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                        STAT #{idx + 1}
                      </div>
                      <div>
                        <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>VALUE (e.g. 8+, 14,280)</label>
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontWeight: 700 }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>LABEL TITLE</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>DETAIL / CAPTION</label>
                        <input
                          type="text"
                          value={stat.detail || ''}
                          onChange={(e) => handleStatChange(idx, 'detail', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '0.78rem' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-SECTION 2: FEATURED SPOTLIGHT */}
          {activeHomeSubSection === 'featured' && (
            <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Featured Venture Spotlight Section
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Controls the header and direct CTA of the homepage featured showcase.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  FEATURED PILL BADGE TEXT
                </label>
                <input
                  type="text"
                  value={featuredForm.badge}
                  onChange={(e) => { setFeaturedForm({ ...featuredForm, badge: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    TITLE PREFIX (e.g. Pillars of)
                  </label>
                  <input
                    type="text"
                    value={featuredForm.title}
                    onChange={(e) => { setFeaturedForm({ ...featuredForm, title: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    TITLE ACCENT (e.g. Compounding Scale)
                  </label>
                  <input
                    type="text"
                    value={featuredForm.titleAccent}
                    onChange={(e) => { setFeaturedForm({ ...featuredForm, titleAccent: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  BOTTOM LINK BUTTON TEXT (e.g. Explore All 8+ Stackyr Ventures)
                </label>
                <input
                  type="text"
                  value={featuredForm.viewAllText}
                  onChange={(e) => { setFeaturedForm({ ...featuredForm, viewAllText: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>
            </div>
          )}

          {/* SUB-SECTION 3: CAPABILITIES BENTO GRID */}
          {activeHomeSubSection === 'capabilities' && (
            <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Capabilities Bento Grid & Pillars
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  The 6 core engineering pillars powering the Stackyr multi-venture ecosystem.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                    CAPABILITIES BADGE
                  </label>
                  <input
                    type="text"
                    value={capabilitiesForm.badge}
                    onChange={(e) => { setCapabilitiesForm({ ...capabilitiesForm, badge: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    SECTION MAIN TITLE
                  </label>
                  <input
                    type="text"
                    value={capabilitiesForm.title}
                    onChange={(e) => { setCapabilitiesForm({ ...capabilitiesForm, title: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  SECTION SUBTITLE / DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={capabilitiesForm.subtitle}
                  onChange={(e) => { setCapabilitiesForm({ ...capabilitiesForm, subtitle: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              {/* 6 Capabilities Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                  INDIVIDUAL CAPABILITY CARDS (1 - 6):
                </div>

                {capabilitiesForm.items?.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    style={{
                      padding: '18px',
                      borderRadius: '14px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                        PILLAR #{idx + 1}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                        {item.id}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CARD TITLE</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleCapabilityChange(idx, 'title', e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontWeight: 700 }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>METRIC HIGHLIGHT PILL</label>
                        <input
                          type="text"
                          value={item.metrics || ''}
                          onChange={(e) => handleCapabilityChange(idx, 'metrics', e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FED7AA' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>EXPLANATION DESCRIPTION</label>
                      <textarea
                        rows={2}
                        value={item.description || ''}
                        onChange={(e) => handleCapabilityChange(idx, 'description', e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '0.84rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>TAGS (COMMA-SEPARATED)</label>
                      <input
                        type="text"
                        value={Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '')}
                        onChange={(e) => handleCapabilityChange(idx, 'tags', e.target.value)}
                        placeholder="Tag 1, Tag 2, Tag 3"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-SECTION 4: ETHOS CALLOUT BANNER */}
          {activeHomeSubSection === 'ethos' && (
            <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Ethos & "Why We Stack Intelligence" Banner
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Callout banner positioned directly below capabilities on the homepage.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  CALLOUT BADGE TEXT
                </label>
                <input
                  type="text"
                  value={ethosForm.badge}
                  onChange={(e) => { setEthosForm({ ...ethosForm, badge: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    HEADLINE (FIRST HALF)
                  </label>
                  <input
                    type="text"
                    value={ethosForm.title}
                    onChange={(e) => { setEthosForm({ ...ethosForm, title: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    HEADLINE ACCENT (GRADIENT)
                  </label>
                  <input
                    type="text"
                    value={ethosForm.titleAccent}
                    onChange={(e) => { setEthosForm({ ...ethosForm, titleAccent: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  CALLOUT PARAGRAPH
                </label>
                <textarea
                  rows={3}
                  value={ethosForm.paragraph}
                  onChange={(e) => { setEthosForm({ ...ethosForm, paragraph: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    PRIMARY BUTTON LABEL
                  </label>
                  <input
                    type="text"
                    value={ethosForm.primaryBtnText}
                    onChange={(e) => { setEthosForm({ ...ethosForm, primaryBtnText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    SECONDARY BUTTON LABEL
                  </label>
                  <input
                    type="text"
                    value={ethosForm.secondaryBtnText}
                    onChange={(e) => { setEthosForm({ ...ethosForm, secondaryBtnText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-SECTION 5: SOCIAL PROOF & REVIEWS */}
          {activeHomeSubSection === 'reviews' && (
            <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Reviews & Social Proof Section Header
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Curated architectural and founder telemetry headlines.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  REVIEWS BADGE PILL
                </label>
                <input
                  type="text"
                  value={reviewsForm.badge}
                  onChange={(e) => { setReviewsForm({ ...reviewsForm, badge: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    HEADLINE PREFIX
                  </label>
                  <input
                    type="text"
                    value={reviewsForm.title}
                    onChange={(e) => { setReviewsForm({ ...reviewsForm, title: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    HEADLINE ACCENT
                  </label>
                  <input
                    type="text"
                    value={reviewsForm.titleAccent}
                    onChange={(e) => { setReviewsForm({ ...reviewsForm, titleAccent: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  SUBTITLE CAPTION
                </label>
                <input
                  type="text"
                  value={reviewsForm.subtitle}
                  onChange={(e) => { setReviewsForm({ ...reviewsForm, subtitle: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    RATING PILL SCORE (e.g. 4.98 / 5.0)
                  </label>
                  <input
                    type="text"
                    value={reviewsForm.ratingScore}
                    onChange={(e) => { setReviewsForm({ ...reviewsForm, ratingScore: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    RATING SUBTEXT (e.g. Across 14,000+ Global Nodes)
                  </label>
                  <input
                    type="text"
                    value={reviewsForm.ratingSubtext}
                    onChange={(e) => { setReviewsForm({ ...reviewsForm, ratingSubtext: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-SECTION 6: HOME CONTACT CARD */}
          {activeHomeSubSection === 'contactCard' && (
            <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Direct Protocol Collaboration Card (Homepage Footer)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  The large interactive engagement card at the base of the homepage.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  CONTACT CARD BADGE
                </label>
                <input
                  type="text"
                  value={homeContactForm.badge}
                  onChange={(e) => { setHomeContactForm({ ...homeContactForm, badge: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    HEADLINE (e.g. Ready to Compound)
                  </label>
                  <input
                    type="text"
                    value={homeContactForm.title}
                    onChange={(e) => { setHomeContactForm({ ...homeContactForm, title: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    HEADLINE ACCENT (e.g. Intelligence?)
                  </label>
                  <input
                    type="text"
                    value={homeContactForm.titleAccent}
                    onChange={(e) => { setHomeContactForm({ ...homeContactForm, titleAccent: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={homeContactForm.description}
                  onChange={(e) => { setHomeContactForm({ ...homeContactForm, description: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    PRIMARY BUTTON TEXT (e.g. Open Contact Portal)
                  </label>
                  <input
                    type="text"
                    value={homeContactForm.primaryBtnText}
                    onChange={(e) => { setHomeContactForm({ ...homeContactForm, primaryBtnText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    SECONDARY BUTTON TEXT (e.g. Copy Sovereign Email)
                  </label>
                  <input
                    type="text"
                    value={homeContactForm.copyBtnText}
                    onChange={(e) => { setHomeContactForm({ ...homeContactForm, copyBtnText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    DIRECT TRANSMISSION EMAIL
                  </label>
                  <input
                    type="email"
                    value={homeContactForm.email}
                    onChange={(e) => { setHomeContactForm({ ...homeContactForm, email: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                    SLA RESPONSE TIME NOTICE
                  </label>
                  <input
                    type="text"
                    value={homeContactForm.responseNotice}
                    onChange={(e) => { setHomeContactForm({ ...homeContactForm, responseNotice: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-SECTION 7: TRUST MARQUEE */}
          {activeHomeSubSection === 'marquee' && (
            <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Trust & Verified Partners Marquee
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Infinite animated marquee showcasing NVIDIA, AWS, GCP, OpenAI, Cloudflare, etc.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  MARQUEE HEADER TEXT
                </label>
                <input
                  type="text"
                  value={marqueeForm.badge}
                  onChange={(e) => { setMarqueeForm({ ...marqueeForm, badge: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          PAGE 2: STACKYR COMMUNITY PAGE (#community)
      ======================================================== */}
      {activePage === 'community' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section Overview Box */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '14px',
              background: 'rgba(255, 107, 0, 0.05)',
              border: '1px solid rgba(255, 107, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 107, 0, 0.15)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-orange)'
                }}
              >
                <Terminal size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.98rem' }}>
                  Stackyr Community & Developer Collective CMS
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Controls all live copy, invite URLs, and telemetry statistics on the <span style={{ color: 'var(--accent-orange)' }}>#community</span> page.
                </div>
              </div>
            </div>

            <a
              href="#community"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none'
              }}
            >
              <span>Preview Live Page</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Card 1: Main Hero & Brand Narrative */}
          <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                1. Hero Headline & Mission Narrative
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                The core headline and engineering manifesto displayed at the top of the community page.
              </p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                COMMUNITY BADGE / PILL TEXT
              </label>
              <input
                type="text"
                value={communityForm.badge}
                onChange={(e) => { setCommunityForm({ ...communityForm, badge: e.target.value }); markDirty(); }}
                placeholder="e.g. DEVELOPER & HACKER COLLECTIVE • 14,200+ SYSTEMS ARCHITECTS"
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  MAIN HEADLINE (PRIMARY)
                </label>
                <input
                  type="text"
                  value={communityForm.title}
                  onChange={(e) => { setCommunityForm({ ...communityForm, title: e.target.value }); markDirty(); }}
                  placeholder="e.g. Stackyr Community:"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  HEADLINE ACCENT (GRADIENT)
                </label>
                <input
                  type="text"
                  value={communityForm.titleAccent}
                  onChange={(e) => { setCommunityForm({ ...communityForm, titleAccent: e.target.value }); markDirty(); }}
                  placeholder="e.g. The Engineering Crucible."
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                COMMUNITY MISSION DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={communityForm.description}
                onChange={(e) => { setCommunityForm({ ...communityForm, description: e.target.value }); markDirty(); }}
                placeholder="An open technical collective within the Stackyr ecosystem..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', lineHeight: 1.5 }}
              />
            </div>
          </div>

          {/* Card 2: Gateway CTAs (Discord & GitHub) */}
          <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                2. Collective Gateway Channels & Buttons
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Configure the Discord invite portal and GitHub open-source repositories destination buttons.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
              {/* Discord Box */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: communityForm.discordComingSoon ? 'rgba(255, 107, 0, 0.05)' : 'rgba(88, 101, 242, 0.05)',
                  border: `1px solid ${communityForm.discordComingSoon ? 'rgba(255, 107, 0, 0.35)' : 'rgba(88, 101, 242, 0.2)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare size={16} color={communityForm.discordComingSoon ? 'var(--accent-orange)' : '#5865F2'} />
                    <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.88rem' }}>Discord Community Gateway</span>
                  </div>

                  {/* Status Switcher: Live Link vs Coming Soon */}
                  <div style={{ display: 'inline-flex', background: 'rgba(0, 0, 0, 0.45)', padding: '2px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <button
                      type="button"
                      onClick={() => { setCommunityForm({ ...communityForm, discordComingSoon: false }); markDirty(); }}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: !communityForm.discordComingSoon ? '#22C55E' : 'transparent',
                        color: !communityForm.discordComingSoon ? '#000000' : 'var(--text-muted)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      ● Live Link
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCommunityForm({ ...communityForm, discordComingSoon: true }); markDirty(); }}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: communityForm.discordComingSoon ? 'var(--accent-orange)' : 'transparent',
                        color: communityForm.discordComingSoon ? '#000000' : 'var(--text-muted)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      ⏱ Coming Soon
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '5px' }}>
                    BUTTON TEXT
                  </label>
                  <input
                    type="text"
                    value={communityForm.discordButtonText}
                    onChange={(e) => { setCommunityForm({ ...communityForm, discordButtonText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>

                {communityForm.discordComingSoon ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '5px' }}>
                      COMING SOON BADGE TEXT
                    </label>
                    <input
                      type="text"
                      value={communityForm.discordComingSoonBadge}
                      onChange={(e) => { setCommunityForm({ ...communityForm, discordComingSoonBadge: e.target.value }); markDirty(); }}
                      placeholder="e.g. COMING SOON / GENESIS LAUNCH"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.3)', color: '#FFFFFF', fontWeight: 700 }}
                    />
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-orange)', marginTop: '4px' }}>
                      ✓ Button on live page will display this Coming Soon badge and show a launch status notice on click.
                    </div>
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '5px' }}>
                      DISCORD INVITE URL
                    </label>
                    <input
                      type="url"
                      value={communityForm.discordLink}
                      onChange={(e) => { setCommunityForm({ ...communityForm, discordLink: e.target.value }); markDirty(); }}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                    />
                  </div>
                )}
              </div>

              {/* GitHub Box */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: communityForm.githubComingSoon ? 'rgba(255, 107, 0, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${communityForm.githubComingSoon ? 'rgba(255, 107, 0, 0.35)' : 'rgba(255, 255, 255, 0.1)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code2 size={16} color="var(--accent-orange)" />
                    <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.88rem' }}>GitHub Codebases Gateway</span>
                  </div>

                  {/* Status Switcher: Live Link vs Coming Soon */}
                  <div style={{ display: 'inline-flex', background: 'rgba(0, 0, 0, 0.45)', padding: '2px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <button
                      type="button"
                      onClick={() => { setCommunityForm({ ...communityForm, githubComingSoon: false }); markDirty(); }}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: !communityForm.githubComingSoon ? '#22C55E' : 'transparent',
                        color: !communityForm.githubComingSoon ? '#000000' : 'var(--text-muted)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      ● Live Link
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCommunityForm({ ...communityForm, githubComingSoon: true }); markDirty(); }}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: communityForm.githubComingSoon ? 'var(--accent-orange)' : 'transparent',
                        color: communityForm.githubComingSoon ? '#000000' : 'var(--text-muted)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      ⏱ Coming Soon
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '5px' }}>
                    BUTTON TEXT
                  </label>
                  <input
                    type="text"
                    value={communityForm.githubButtonText}
                    onChange={(e) => { setCommunityForm({ ...communityForm, githubButtonText: e.target.value }); markDirty(); }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                  />
                </div>

                {communityForm.githubComingSoon ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '5px' }}>
                      COMING SOON BADGE TEXT
                    </label>
                    <input
                      type="text"
                      value={communityForm.githubComingSoonBadge}
                      onChange={(e) => { setCommunityForm({ ...communityForm, githubComingSoonBadge: e.target.value }); markDirty(); }}
                      placeholder="e.g. COMING SOON / AUDIT IN PROGRESS"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.3)', color: '#FFFFFF', fontWeight: 700 }}
                    />
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-orange)', marginTop: '4px' }}>
                      ✓ Button on live page will display this Coming Soon badge and show a launch status notice on click.
                    </div>
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '5px' }}>
                      GITHUB REPOSITORIES URL
                    </label>
                    <input
                      type="url"
                      value={communityForm.githubLink}
                      onChange={(e) => { setCommunityForm({ ...communityForm, githubLink: e.target.value }); markDirty(); }}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: 4 Real-time Telemetry Stats */}
          <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                3. Collective Telemetry Statistics (4 Cards)
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                The high-impact proof metrics displayed directly under the community headline hero.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '16px'
              }}
            >
              {communityForm.stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                      METRIC #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      METRIC VALUE
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleCommunityStatChange(idx, 'value', e.target.value)}
                      placeholder="e.g. 14,200+"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      METRIC LABEL
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleCommunityStatChange(idx, 'label', e.target.value)}
                      placeholder="e.g. Active Engineers"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 3: ABOUT PAGE & ETHOS
      ======================================================== */}
      {activePage === 'about' && (
        <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              About Page: Genesis, Mission, Vision & Pillars
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Controls copy rendered on the dedicated <span style={{ color: 'var(--accent-orange)' }}>/about</span> page.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                ABOUT BADGE
              </label>
              <input
                type="text"
                value={storyForm.badge}
                onChange={(e) => { setStoryForm({ ...storyForm, badge: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                MAIN STORY HEADLINE
              </label>
              <input
                type="text"
                value={storyForm.title}
                onChange={(e) => { setStoryForm({ ...storyForm, title: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              CORE VENTURE MISSION
            </label>
            <textarea
              rows={2}
              value={storyForm.mission}
              onChange={(e) => { setStoryForm({ ...storyForm, mission: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              LONG-RANGE VISION
            </label>
            <textarea
              rows={2}
              value={storyForm.vision}
              onChange={(e) => { setStoryForm({ ...storyForm, vision: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              ETHOS PARAGRAPH 1
            </label>
            <textarea
              rows={2}
              value={storyForm.paragraph1}
              onChange={(e) => { setStoryForm({ ...storyForm, paragraph1: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              ETHOS PARAGRAPH 2
            </label>
            <textarea
              rows={2}
              value={storyForm.paragraph2}
              onChange={(e) => { setStoryForm({ ...storyForm, paragraph2: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              ETHOS PARAGRAPH 3
            </label>
            <textarea
              rows={2}
              value={storyForm.paragraph3}
              onChange={(e) => { setStoryForm({ ...storyForm, paragraph3: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          {/* 3 Core Pillars */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '12px' }}>
              3 FOUNDATIONAL ETHOS PILLARS:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '14px' }}>
              {storyForm.pillars?.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    PILLAR #{idx + 1}
                  </span>
                  <div>
                    <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>TITLE</label>
                    <input
                      type="text"
                      value={pillar.title || ''}
                      onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontWeight: 700 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>DESCRIPTION</label>
                    <textarea
                      rows={2}
                      value={pillar.desc || ''}
                      onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 3: CAPABILITIES PAGE
      ======================================================== */}
      {activePage === 'capabilities' && (
        <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              Dedicated Capabilities Architecture Page
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Controls the pillars rendered on the standalone <span style={{ color: 'var(--accent-orange)' }}>/capabilities</span> view.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                PILLARS BADGE
              </label>
              <input
                type="text"
                value={capabilitiesForm.badge}
                onChange={(e) => { setCapabilitiesForm({ ...capabilitiesForm, badge: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                ARCHITECTURE MAIN TITLE
              </label>
              <input
                type="text"
                value={capabilitiesForm.title}
                onChange={(e) => { setCapabilitiesForm({ ...capabilitiesForm, title: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              ARCHITECTURE SUBTITLE
            </label>
            <textarea
              rows={2}
              value={capabilitiesForm.subtitle}
              onChange={(e) => { setCapabilitiesForm({ ...capabilitiesForm, subtitle: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Note: The 6 architectural pillar cards are synchronized automatically with the Home Page Bento definitions above.
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 4: CONTACT PAGE & DIALOGUE
      ======================================================== */}
      {activePage === 'contact' && (
        <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              Standalone Contact & Dialogue Page
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Controls headlines and inquiry settings on <span style={{ color: 'var(--accent-orange)' }}>/contact</span>.
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
              CONTACT BADGE
            </label>
            <input
              type="text"
              value={ctaForm.badge}
              onChange={(e) => { setCtaForm({ ...ctaForm, badge: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              PORTAL MAIN HEADLINE
            </label>
            <input
              type="text"
              value={ctaForm.title}
              onChange={(e) => { setCtaForm({ ...ctaForm, title: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={ctaForm.description}
              onChange={(e) => { setCtaForm({ ...ctaForm, description: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', lineHeight: 1.5 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                SUBMIT BUTTON TEXT
              </label>
              <input
                type="text"
                value={ctaForm.buttonText}
                onChange={(e) => { setCtaForm({ ...ctaForm, buttonText: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                DIRECT TRANSMISSION EMAIL
              </label>
              <input
                type="email"
                value={ctaForm.email}
                onChange={(e) => { setCtaForm({ ...ctaForm, email: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 5: WEBIND PLATFORM
      ======================================================== */}
      {activePage === 'webind' && (
        <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              WEBIND Flagship Platform Showcase
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Dedicated autonomous edge & WASM infrastructure venture data.
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
              WEBIND BADGE
            </label>
            <input
              type="text"
              value={webindForm.badge}
              onChange={(e) => { setWebindForm({ ...webindForm, badge: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              WEBIND TAGLINE
            </label>
            <input
              type="text"
              value={webindForm.tagline}
              onChange={(e) => { setWebindForm({ ...webindForm, tagline: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              DEEP DESCRIPTION
            </label>
            <textarea
              rows={4}
              value={webindForm.description}
              onChange={(e) => { setWebindForm({ ...webindForm, description: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', lineHeight: 1.5 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
              OFFICIAL LAUNCH URL
            </label>
            <input
              type="text"
              value={webindForm.liveUrl}
              onChange={(e) => { setWebindForm({ ...webindForm, liveUrl: e.target.value }); markDirty(); }}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
            />
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE: GLOBAL FOOTER CMS (All 4 Columns & Legal Bar)
      ======================================================== */}
      {activePage === 'footer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Header Banner */}
          <div style={{ marginBottom: '4px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-orange)',
                  background: 'rgba(255, 107, 0, 0.1)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontWeight: 700
                }}
              >
                GLOBAL FOOTER ARCHITECTURE
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Site Footer, Columns & Navigation CMS
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Complete control over all 4 footer columns, network operational telemetry badge, venture constellation links, social channels, and bottom legal copy.
            </p>
          </div>

          {/* CARD 1: COLUMN 1 - BRAND IDENTITY & NETWORK STATUS */}
          <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', background: 'rgba(255, 107, 0, 0.12)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                COLUMN 1
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                Brand Identity & Operational Mesh Telemetry
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  BRAND NAME
                </label>
                <input
                  type="text"
                  value={footerForm.brandName}
                  onChange={(e) => { setFooterForm({ ...footerForm, brandName: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  BRAND SUBTITLE / MONOSPACE TAGLINE
                </label>
                <input
                  type="text"
                  value={footerForm.brandTagline}
                  onChange={(e) => { setFooterForm({ ...footerForm, brandTagline: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                ARCHITECTURAL DESCRIPTION PARAGRAPH
              </label>
              <textarea
                rows={3}
                value={footerForm.description}
                onChange={(e) => { setFooterForm({ ...footerForm, description: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', lineHeight: 1.5 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#4ADE80', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                LIVE MESH STATUS PILL TEXT (WITH GREEN PULSING BEACON)
              </label>
              <input
                type="text"
                value={footerForm.statusText}
                onChange={(e) => { setFooterForm({ ...footerForm, statusText: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ADE80', fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>

          {/* CARD 2: COLUMN 2 - ARCHITECTURE NAVIGATION */}
          <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', background: 'rgba(255, 107, 0, 0.12)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                COLUMN 2
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                Ecosystem Architecture Navigation
              </h4>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                COLUMN 2 HEADER TITLE
              </label>
              <input
                type="text"
                value={footerForm.col2Title}
                onChange={(e) => { setFooterForm({ ...footerForm, col2Title: e.target.value }); markDirty(); }}
                style={{ width: '100%', maxWidth: '420px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '8px' }}>
                CANONICAL SYSTEM ROUTES AUTOMATICALLY WIRED:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Home Ecosystem', 'Ventures & Brands', 'Stackyr Community', 'Deep-Tech Capabilities', 'About Us & Ethos', 'Contact & Partner'].map((nav, i) => (
                  <span key={i} style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '9999px', background: 'rgba(255, 107, 0, 0.1)', border: '1px solid rgba(255, 107, 0, 0.25)', color: '#FED7AA' }}>
                    {nav}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 3: COLUMN 3 - VENTURE CONSTELLATION */}
          <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', background: 'rgba(255, 107, 0, 0.12)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  COLUMN 3
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                  Venture Constellation Links & Badges
                </h4>
              </div>
              <button
                onClick={handleAddConstellation}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: '9999px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={14} />
                <span>Add Venture Link</span>
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                COLUMN 3 HEADER TITLE
              </label>
              <input
                type="text"
                value={footerForm.col3Title}
                onChange={(e) => { setFooterForm({ ...footerForm, col3Title: e.target.value }); markDirty(); }}
                style={{ width: '100%', maxWidth: '420px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerForm.constellationList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr)) 44px',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      ENTITY NAME
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleConstellationChange(idx, 'name', e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontSize: '0.84rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      OPTIONAL PILL TAG (e.g. Flagship)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flagship"
                      value={item.tag || ''}
                      onChange={(e) => handleConstellationChange(idx, 'tag', e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontSize: '0.84rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      TARGET DESTINATION PAGE
                    </label>
                    <select
                      value={item.link || 'brands'}
                      onChange={(e) => handleConstellationChange(idx, 'link', e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(14, 16, 24, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontSize: '0.84rem' }}
                    >
                      <option value="webind">WEBIND Page</option>
                      <option value="brands">Ventures & Brands Page</option>
                      <option value="community">Stackyr Community Page</option>
                      <option value="capabilities">Capabilities Page</option>
                      <option value="about">About Page</option>
                      <option value="contact">Contact Page</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleRemoveConstellation(idx)}
                    title="Delete item"
                    style={{
                      height: '38px',
                      width: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      color: '#F87171',
                      cursor: 'pointer',
                      marginTop: '18px'
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 4: COLUMN 4 - CONNECT & BUILD (DISCORD, GITHUB, EMAIL, CTA) */}
          <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', background: 'rgba(255, 107, 0, 0.12)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                COLUMN 4
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                Connect Channels, Community & Direct Dialogue
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  COLUMN 4 HEADER TITLE
                </label>
                <input
                  type="text"
                  value={footerForm.col4Title}
                  onChange={(e) => { setFooterForm({ ...footerForm, col4Title: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  PRIMARY CTA BUTTON TEXT
                </label>
                <input
                  type="text"
                  value={footerForm.ctaButtonText}
                  onChange={(e) => { setFooterForm({ ...footerForm, ctaButtonText: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                SUB-DESCRIPTION PARAGRAPH
              </label>
              <textarea
                rows={2}
                value={footerForm.col4Description}
                onChange={(e) => { setFooterForm({ ...footerForm, col4Description: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', lineHeight: 1.5 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#5865F2', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  DISCORD BUTTON LABEL
                </label>
                <input
                  type="text"
                  value={footerForm.discordText}
                  onChange={(e) => { setFooterForm({ ...footerForm, discordText: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(88, 101, 242, 0.3)', color: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#5865F2', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  DISCORD INVITE URL
                </label>
                <input
                  type="text"
                  value={footerForm.discordUrl}
                  onChange={(e) => { setFooterForm({ ...footerForm, discordUrl: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(88, 101, 242, 0.3)', color: '#FFFFFF' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  GITHUB BUTTON LABEL
                </label>
                <input
                  type="text"
                  value={footerForm.githubText}
                  onChange={(e) => { setFooterForm({ ...footerForm, githubText: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255, 107, 0, 0.3)', color: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                  GITHUB REPOSITORIES URL
                </label>
                <input
                  type="text"
                  value={footerForm.githubUrl}
                  onChange={(e) => { setFooterForm({ ...footerForm, githubUrl: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255, 107, 0, 0.3)', color: '#FFFFFF' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#F59E0B', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                SOVEREIGN PROTOCOL CONTACT EMAIL
              </label>
              <input
                type="email"
                value={footerForm.email}
                onChange={(e) => { setFooterForm({ ...footerForm, email: e.target.value }); markDirty(); }}
                style={{ width: '100%', maxWidth: '420px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#FFFFFF' }}
              />
            </div>
          </div>

          {/* CARD 5: BOTTOM BAR & LEGAL TEXTS */}
          <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                Bottom Bar Copyright & Legal Governance
              </h4>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                COPYRIGHT NOTICE STRING
              </label>
              <input
                type="text"
                value={footerForm.copyrightText}
                onChange={(e) => { setFooterForm({ ...footerForm, copyrightText: e.target.value }); markDirty(); }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  PRIVACY POLICY LINK TEXT
                </label>
                <input
                  type="text"
                  value={footerForm.privacyPolicyText}
                  onChange={(e) => { setFooterForm({ ...footerForm, privacyPolicyText: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                  TERMS OF SERVICE LINK TEXT
                </label>
                <input
                  type="text"
                  value={footerForm.termsOfServiceText}
                  onChange={(e) => { setFooterForm({ ...footerForm, termsOfServiceText: e.target.value }); markDirty(); }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 6: SECTION VISIBILITY TOGGLES
      ======================================================== */}
      {activePage === 'sections' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              Dynamic Section Visibility Toggles
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Enable or disable any section from appearing on the public website with a single tap.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '16px'
            }}
          >
            {sectionTogglesList.map((item) => {
              const isEnabled = sectionsConfig[item.key] !== false;
              return (
                <div
                  key={item.key}
                  onClick={() => toggleSection(item.key)}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: isEnabled ? 'rgba(255, 107, 0, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${isEnabled ? 'rgba(255, 107, 0, 0.35)' : 'rgba(255, 255, 255, 0.06)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.96rem', marginBottom: '4px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {item.desc}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      background: isEnabled ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)',
                      color: isEnabled ? '#000000' : 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  >
                    {isEnabled ? 'ENABLED' : 'HIDDEN'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MOBILE STICKY SAVE BAR (Never requires scrolling up to save) */}
      <div
        className="admin-mobile-save-bar"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 900
        }}
      >
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="btn-primary"
          style={{
            padding: '14px 26px',
            fontSize: '0.94rem',
            fontWeight: 800,
            borderRadius: '9999px',
            boxShadow: '0 8px 30px rgba(255, 107, 0, 0.5), 0 0 15px rgba(255, 107, 0, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          <Save size={18} />
          <span>{loading ? 'Publishing...' : 'Save & Publish Live'}</span>
        </button>
      </div>
    </div>
  );
}
