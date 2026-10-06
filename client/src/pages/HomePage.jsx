import React from 'react';
import HeroSection from '../components/public/HeroSection';
import TrustMarquee from '../components/public/TrustMarquee';
import FeaturedSection from '../components/public/FeaturedSection';
import CapabilitiesSection from '../components/public/CapabilitiesSection';
import ReviewsSection from '../components/public/ReviewsSection';
import HomeContactCard from '../components/public/HomeContactCard';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Cpu } from 'lucide-react';

export default function HomePage({ content, brands, onSelectBrand, onNavigate }) {
  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'clip' }}>
      {/* 1. Parent Ecosystem Hero with Animated Autoplay Video Showcase */}
      <HeroSection
        heroData={content?.hero}
        onNavigate={onNavigate}
        onExploreClick={() => onNavigate('brands')}
      />

      {/* 2. Branded Ventures & Trust Verification Infinite Marquee (With Gradient Fade Edges) */}
      <TrustMarquee />

      {/* 3. Featured Ventures Spotlight */}
      <div style={{ position: 'relative' }}>
        <FeaturedSection
          brands={brands}
          onSelectBrand={onSelectBrand}
        />

        {/* View All Ventures Link Banner */}
        <div className="container" style={{ textAlign: 'center', margin: 'clamp(28px, 5vw, 44px) auto clamp(40px, 6vw, 64px) auto' }}>
          <button
            onClick={() => onNavigate('brands')}
            className="btn-secondary"
            style={{
              padding: '12px 28px',
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '9999px',
              cursor: 'pointer'
            }}
          >
            <Layers size={16} color="var(--accent-orange)" />
            <span>Explore All 8+ Stackyr Ventures & Stealth Pipeline</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 4. Core Capabilities Bento Preview */}
      <CapabilitiesSection
        capabilitiesData={content?.capabilities}
      />

      {/* 5. About Stackyr Ethos Callout Banner */}
      <section className="section-pad" style={{ paddingTop: 'clamp(32px, 5vw, 60px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
        <div className="container">
          <div
            className="glass-card"
            style={{
              padding: 'clamp(28px, 5vw, 56px)',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(16, 18, 28, 0.85) 0%, rgba(9, 10, 15, 0.95) 100%)',
              border: '1px solid rgba(255, 107, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '28px'
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div className="badge-pill" style={{ marginBottom: '14px' }}>
                <Sparkles size={13} />
                <span>WHY WE STACK INTELLIGENCE</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', lineHeight: 1.15 }}>
                Intelligence compounds when <span className="text-gradient">layered synergistically.</span>
              </h3>
              <p style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', color: '#CBD5E1', lineHeight: 1.65 }}>
                Stackyr eliminates bureaucratic drag and venture silos. Every stacked entity feeds telemetry, cryptographic security, and computational edge into every other.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => onNavigate('about')}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '0.96rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <span>Read Full Story & Vision</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="btn-secondary"
                style={{ padding: '12px 28px', fontSize: '0.92rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <span>Initiate Dialogue</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trusted by People & Industry Leaders (Read-only Curated Social Proof) */}
      <ReviewsSection />

      {/* 7. Modern Interactive Contact Card at the End of HomePage */}
      <HomeContactCard onNavigate={onNavigate} />
    </div>
  );
}
