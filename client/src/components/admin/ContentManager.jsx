import React, { useState, useEffect } from 'react';
import {
  FileText, Check, Save, ToggleLeft, ToggleRight, Sparkles,
  Layers, Globe, Shield, RefreshCw
} from 'lucide-react';
import { updateContent } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { resolveMediaSource } from '../../utils/mediaUtils';

export default function ContentManager({ content, onRefresh }) {
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' | 'hero' | 'webind' | 'story' | 'cta'
  const [loading, setLoading] = useState(false);

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

  const [heroForm, setHeroForm] = useState({
    badgeText: '',
    title: '',
    titleAccent: '',
    tagline: '',
    ctaText: '',
    ctaLink: '',
    secondaryCtaText: '',
    secondaryCtaLink: '',
    videoUrl: ''
  });

  const [webindForm, setWebindForm] = useState({
    badge: '',
    tagline: '',
    description: '',
    liveUrl: ''
  });

  const [storyForm, setStoryForm] = useState({
    badge: '',
    title: '',
    mission: '',
    vision: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: ''
  });

  const [ctaForm, setCtaForm] = useState({
    badge: '',
    title: '',
    description: '',
    buttonText: '',
    email: ''
  });

  useEffect(() => {
    if (content) {
      if (content.sectionsConfig) setSectionsConfig(content.sectionsConfig);
      if (content.hero) setHeroForm({ ...content.hero, videoUrl: content.hero.videoUrl || '/videos/stackyr-showcase.mp4' });
      if (content.webind) setWebindForm({ ...content.webind });
      if (content.story) {
        setStoryForm({
          badge: content.story.badge || '',
          title: content.story.title || '',
          mission: content.story.mission || '',
          vision: content.story.vision || '',
          paragraph1: content.story.paragraphs?.[0] || '',
          paragraph2: content.story.paragraphs?.[1] || '',
          paragraph3: content.story.paragraphs?.[2] || ''
        });
      }
      if (content.cta) setCtaForm({ ...content.cta });
    }
  }, [content]);

  const toggleSection = (key) => {
    setSectionsConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      const payload = {
        sectionsConfig,
        hero: heroForm,
        webind: webindForm,
        story: {
          ...storyForm,
          paragraphs: [storyForm.paragraph1, storyForm.paragraph2, storyForm.paragraph3].filter(Boolean)
        },
        cta: ctaForm
      };

      await updateContent(payload);
      success('Website content and section controls published dynamically.');
      onRefresh();
    } catch (err) {
      error(err.message || 'Failed to update site content');
    } finally {
      setLoading(false);
    }
  };

  const sectionToggles = [
    { key: 'heroEnabled', label: 'Animated Hero Section', desc: 'Particle canvas, main typography & 3D matrix' },
    { key: 'featuredEnabled', label: 'Featured Venture Spotlight', desc: 'Detailed tabbed highlight of anchor brands' },
    { key: 'ecosystemEnabled', label: 'Interactive Brand Ecosystem', desc: 'Complete searchable directory with filter chips' },
    { key: 'webindEnabled', label: 'WEBIND Flagship Showcase', desc: 'Dedicated autonomous edge & WASM infrastructure' },
    { key: 'capabilitiesEnabled', label: 'Capabilities Bento Architecture', desc: '6 core pillars of Stacking Intelligence' },
    { key: 'storyEnabled', label: 'Story, Ethos & Vision', desc: 'Collective compounding narrative & values' },
    { key: 'comingSoonEnabled', label: 'Stealth Incubation Pipeline', desc: 'Encrypted repos & early access waitlist' },
    { key: 'ctaEnabled', label: 'Partner & Dialogue Form', desc: 'Venture partnership intake & transmission form' }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Site Content & Section CMS
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Dynamically toggle homepage sections, modify copy, headlines, and call-to-actions without editing source code.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="btn-primary"
          style={{ gap: '8px' }}
        >
          <Save size={16} />
          <span>{loading ? 'Publishing...' : 'Publish Content Live'}</span>
        </button>
      </div>

      {/* Editor Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '6px',
          borderRadius: '12px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          marginBottom: '28px'
        }}
      >
        {[
          { id: 'sections', label: 'Section Toggles' },
          { id: 'hero', label: 'Hero Section' },
          { id: 'webind', label: 'WEBIND by Stackyr' },
          { id: 'story', label: 'Story & Vision' },
          { id: 'cta', label: 'CTA & Dialogue' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              background: activeTab === tab.id ? 'var(--accent-orange)' : 'transparent',
              color: activeTab === tab.id ? '#000000' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SECTION TOGGLES */}
      {activeTab === 'sections' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '16px'
          }}
        >
          {sectionToggles.map((item) => {
            const isEnabled = sectionsConfig[item.key] !== false;
            return (
              <div
                key={item.key}
                onClick={() => toggleSection(item.key)}
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  background: isEnabled ? 'rgba(255, 107, 0, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isEnabled ? 'rgba(255, 107, 0, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
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
                    color: isEnabled ? '#000000' : 'var(--text-muted)'
                  }}
                >
                  {isEnabled ? 'ENABLED' : 'HIDDEN'}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: HERO SECTION EDITOR */}
      {activeTab === 'hero' && (
        <div
          style={{
            padding: 'clamp(18px, 4vw, 32px)',
            borderRadius: '20px',
            background: 'rgba(15, 17, 24, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              HERO BADGE TEXT
            </label>
            <input
              type="text"
              value={heroForm.badgeText}
              onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                PRIMARY HEADLINE TITLE
              </label>
              <input
                type="text"
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                ACCENT GRADIENT SUB-TITLE
              </label>
              <input
                type="text"
                value={heroForm.titleAccent}
                onChange={(e) => setHeroForm({ ...heroForm, titleAccent: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              MAIN TAGLINE & PARAGRAPH
            </label>
            <textarea
              rows={3}
              value={heroForm.tagline}
              onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                PRIMARY CTA BUTTON TEXT
              </label>
              <input
                type="text"
                value={heroForm.ctaText}
                onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                SECONDARY CTA BUTTON TEXT
              </label>
              <input
                type="text"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
              />
            </div>
          </div>

          {/* HERO SHOWCASE MEDIA (CLOUDINARY, IMAGEKIT, EMBEDS & DIRECT MP4) */}
          {(() => {
            const previewMedia = resolveMediaSource(heroForm.videoUrl);
            const providerLabels = {
              cloudinary: 'Cloudinary Media Engine (Direct / Embed Supported)',
              imagekit: 'ImageKit Real-time CDN (Direct / Transformed Supported)',
              youtube: 'YouTube Streaming Embed',
              vimeo: 'Vimeo High-Definition Embed',
              direct: 'Direct Video / File Stream',
              generic: 'Generic Embed Stream'
            };

            return (
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 107, 0, 0.05)',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        HERO SHOWCASE MEDIA URL / EMBED
                      </label>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          background: previewMedia.provider === 'cloudinary' 
                            ? 'rgba(52, 168, 83, 0.2)' 
                            : previewMedia.provider === 'imagekit' 
                            ? 'rgba(0, 164, 228, 0.2)' 
                            : 'rgba(255, 107, 0, 0.15)',
                          color: previewMedia.provider === 'cloudinary' 
                            ? '#4ADE80' 
                            : previewMedia.provider === 'imagekit' 
                            ? '#38BDF8' 
                            : '#FED7AA',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {providerLabels[previewMedia.provider] || 'Auto-Detected'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Supports Cloudinary (res.cloudinary.com or player embed), ImageKit (ik.imagekit.io), YouTube, Vimeo, iframe code, or direct MP4.
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setHeroForm({ ...heroForm, videoUrl: '/videos/stackyr-showcase.mp4' })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Paste Cloudinary URL, ImageKit link, YouTube/Vimeo embed, or direct MP4..."
                  value={heroForm.videoUrl || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 107, 0, 0.3)',
                    color: '#FFFFFF',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.86rem'
                  }}
                />

                {/* Cloudinary & ImageKit Quick Format Hints */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: '#94A3B8' }}>Supported formats:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#CBD5E1', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                    Cloudinary: https://res.cloudinary.com/.../video.mp4
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#CBD5E1', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                    ImageKit: https://ik.imagekit.io/.../video.mp4
                  </span>
                </div>

                {/* Media Live Preview Player */}
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    SHOWCASE MEDIA LIVE PREVIEW ({previewMedia.type.toUpperCase()}):
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '520px',
                      aspectRatio: '16 / 9',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#040508',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {previewMedia.url ? (
                      previewMedia.type === 'video' ? (
                        <video
                          key={previewMedia.url}
                          src={previewMedia.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : previewMedia.type === 'iframe' ? (
                        <iframe
                          key={previewMedia.url}
                          src={previewMedia.url}
                          title="Preview Stream"
                          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                          style={{ width: '100%', height: '100%', border: 'none' }}
                        />
                      ) : (
                        <img
                          key={previewMedia.url}
                          src={previewMedia.url}
                          alt="Preview Showcase"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        No media URL provided
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: WEBIND BY STACKYR EDITOR */}
      {activeTab === 'webind' && (
        <div
          style={{
            padding: 'clamp(18px, 4vw, 32px)',
            borderRadius: '20px',
            background: 'rgba(15, 17, 24, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              WEBIND BADGE
            </label>
            <input
              type="text"
              value={webindForm.badge}
              onChange={(e) => setWebindForm({ ...webindForm, badge: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              WEBIND TAGLINE
            </label>
            <input
              type="text"
              value={webindForm.tagline}
              onChange={(e) => setWebindForm({ ...webindForm, tagline: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              WEBIND DEEP DESCRIPTION
            </label>
            <textarea
              rows={4}
              value={webindForm.description}
              onChange={(e) => setWebindForm({ ...webindForm, description: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              OFFICIAL WEBIND LAUNCH URL
            </label>
            <input
              type="text"
              value={webindForm.liveUrl}
              onChange={(e) => setWebindForm({ ...webindForm, liveUrl: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>
        </div>
      )}

      {/* TAB 4: STORY & VISION EDITOR */}
      {activeTab === 'story' && (
        <div
          style={{
            padding: 'clamp(18px, 4vw, 32px)',
            borderRadius: '20px',
            background: 'rgba(15, 17, 24, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              STORY SECTION TITLE
            </label>
            <input
              type="text"
              value={storyForm.title}
              onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              CORE MISSION
            </label>
            <input
              type="text"
              value={storyForm.mission}
              onChange={(e) => setStoryForm({ ...storyForm, mission: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              LONG-RANGE VISION
            </label>
            <input
              type="text"
              value={storyForm.vision}
              onChange={(e) => setStoryForm({ ...storyForm, vision: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              ETHOS PARAGRAPH 1
            </label>
            <textarea
              rows={2}
              value={storyForm.paragraph1}
              onChange={(e) => setStoryForm({ ...storyForm, paragraph1: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              ETHOS PARAGRAPH 2
            </label>
            <textarea
              rows={2}
              value={storyForm.paragraph2}
              onChange={(e) => setStoryForm({ ...storyForm, paragraph2: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>
        </div>
      )}

      {/* TAB 5: CTA & DIALOGUE */}
      {activeTab === 'cta' && (
        <div
          style={{
            padding: 'clamp(18px, 4vw, 32px)',
            borderRadius: '20px',
            background: 'rgba(15, 17, 24, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              CALL TO ACTION HEADLINE
            </label>
            <input
              type="text"
              value={ctaForm.title}
              onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              CTA DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={ctaForm.description}
              onChange={(e) => setCtaForm({ ...ctaForm, description: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                BUTTON SUBMIT LABEL
              </label>
              <input
                type="text"
                value={ctaForm.buttonText}
                onChange={(e) => setCtaForm({ ...ctaForm, buttonText: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                DIRECT CONTACT EMAIL
              </label>
              <input
                type="email"
                value={ctaForm.email}
                onChange={(e) => setCtaForm({ ...ctaForm, email: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
