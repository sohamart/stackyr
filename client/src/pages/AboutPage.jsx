import React from 'react';
import StoryVisionSection from '../components/public/StoryVisionSection';
import { Sparkles, Shield, Zap, Layers, Compass, Award, ArrowRight, Activity, Terminal } from 'lucide-react';

export default function AboutPage({ storyData, onNavigate }) {
  return (
    <div style={{ paddingTop: 'clamp(116px, 18vw, 150px)', paddingBottom: '100px', minHeight: '100vh', background: '#060608', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Ambient Horizon Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(800px, 92vw)',
          height: '350px',
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.12) 0%, rgba(245, 158, 11, 0.03) 50%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Modern Animated Hero Banner (SINGLE, NON-DUPLICATED) */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(8px, 2vw, 20px)', paddingBottom: 'clamp(24px, 4vw, 40px)', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto clamp(24px, 4vw, 36px) auto' }}>
          <div className="badge-pill" style={{ margin: '0 auto 14px auto', display: 'inline-flex', padding: '4px 14px', fontSize: '0.68rem', gap: '6px' }}>
            <Sparkles size={13} />
            <span>ORIGIN & COMPOUNDING THESIS</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.9rem, 5.5vw, 3.8rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '14px',
              lineHeight: 1.15
            }}
          >
            The Genesis of <span className="text-gradient">Stacking Intelligence</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.8vw, 1.12rem)',
              color: '#94A3B8',
              lineHeight: 1.6,
              maxWidth: '740px',
              margin: '0 auto'
            }}
          >
            Why we reject fragmented startup silos in favor of an interconnected, hyper-scalable venture fabric where every deployed node multiplies intelligence at every tier.
          </p>
        </div>
      </div>

      {/* Main Story & Vision Narrative (NO DUPLICATE HEADER) */}
      <StoryVisionSection storyData={storyData} hideHeader={true} />

      {/* Operating Model Bento Section */}
      <section className="section-pad" style={{ paddingTop: '20px', paddingBottom: '90px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto clamp(28px, 4vw, 48px) auto' }}>
            <div className="badge-pill" style={{ margin: '0 auto 14px auto', display: 'inline-flex' }}>
              <Activity size={13} />
              <span>THE OPERATING MECHANICS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              How the <span className="text-gradient">Stackyr Engine</span> Compounds
            </h2>
            <p style={{ fontSize: 'clamp(0.88rem, 1.6vw, 1rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Three fundamental mechanics driving compounding technological equity across our brands.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(14px, 2.5vw, 24px)'
            }}
          >
            <div
              className="glass-card"
              style={{
                padding: 'clamp(20px, 3.5vw, 36px)',
                borderRadius: '22px',
                background: 'linear-gradient(180deg, rgba(18, 20, 30, 0.75) 0%, rgba(10, 11, 16, 0.9) 100%)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255, 107, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Layers size={22} color="var(--accent-orange)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                Shared Telemetry & Data Mesh
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                Breakthrough algorithms discovered within one venture (e.g., edge WASM acceleration in WEBIND) instantly propagate across cognitive agents in Kronix AI and developer tools in Stackyr Community.
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                padding: 'clamp(24px, 3.5vw, 36px)',
                borderRadius: '22px',
                background: 'linear-gradient(180deg, rgba(18, 20, 30, 0.75) 0%, rgba(10, 11, 16, 0.9) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Zap size={22} color="#F59E0B" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                Hyper-Velocity Incubation
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                Stealth ventures inherit battle-tested cryptography from Cybermesh and bare-metal nodes from Aura Cloud on day zero, bypassing 18 months of infrastructural groundwork.
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                padding: 'clamp(24px, 3.5vw, 36px)',
                borderRadius: '22px',
                background: 'linear-gradient(180deg, rgba(18, 20, 30, 0.75) 0%, rgba(10, 11, 16, 0.9) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Shield size={22} color="#22C55E" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                Sovereign Control & Zero Lock-in
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                Every component is engineered with cryptographic independence. We build sovereign co-processors and self-healing WASM runtimes to preserve total architectural freedom.
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '0.96rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Partner With the Stackyr Collective</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
