import React from 'react';
import EcosystemSection from '../components/public/EcosystemSection';
import ComingSoonSection from '../components/public/ComingSoonSection';
import { Sparkles, Layers, ShieldCheck, Zap, Activity, Cpu, ArrowUpRight } from 'lucide-react';

export default function BrandsPage({ brands, onSelectBrand, onNavigate }) {
  const activeCount = brands.filter(b => b.status === 'active' && !b.isComingSoon).length;
  const stealthCount = brands.filter(b => b.isComingSoon).length;

  return (
    <div style={{ paddingTop: 'clamp(116px, 18vw, 150px)', paddingBottom: '100px', minHeight: '100vh', background: '#060608', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Ambient Horizon Glow */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
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
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(8px, 2vw, 20px)', paddingBottom: 'clamp(24px, 4vw, 36px)', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto clamp(24px, 4vw, 36px) auto' }}>
          {/* Status Capsule */}
          <div
            className="badge-pill"
            style={{
              margin: '0 auto 14px auto',
              display: 'inline-flex',
              padding: '4px 14px',
              fontSize: '0.68rem',
              gap: '6px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
            <span>{activeCount} VENTURES LIVE • {stealthCount} IN INCUBATION STEALTH</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.9rem, 5.5vw, 3.8rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
              lineHeight: 1.15
            }}
          >
            The Stackyr <span className="text-gradient">Constellation</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.86rem, 1.6vw, 1.08rem)',
              color: '#94A3B8',
              lineHeight: 1.55,
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            Autonomous deep-tech entities operating with sovereign agility, compounding compute, telemetry, and market velocity under the Stackyr parent umbrella.
          </p>

          {/* Quick Pillar Counter Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '10px',
              marginTop: '22px',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>LAYER 03 • COMPUTE</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>Autonomous Web & Agents</div>
            </div>

            <div
              style={{
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#FF8A00' }}>LAYER 02 • SOVEREIGN</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>zk-ML Cryptographic Data</div>
            </div>

            <div
              style={{
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#F59E0B' }}>LAYER 01 • HARDWARE</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>Bare-Metal Silicon & Qubits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brands Ecosystem Grid (NO DUPLICATE HEADER) */}
      <EcosystemSection
        brands={brands}
        onSelectBrand={onSelectBrand}
        hideHeader={true}
      />

      {/* Stealth Incubation Pipeline */}
      <ComingSoonSection
        brands={brands}
      />
    </div>
  );
}
