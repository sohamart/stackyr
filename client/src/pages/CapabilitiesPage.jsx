import React from 'react';
import CapabilitiesSection from '../components/public/CapabilitiesSection';
import { Cpu, Zap, ShieldCheck, Database, ArrowRight, Activity, Globe, CheckCircle2 } from 'lucide-react';

export default function CapabilitiesPage({ capabilitiesData, onNavigate }) {
  const benchmarks = [
    { label: 'Global Edge Latency', value: '8.2ms', sub: 'P99 Worldwide', color: '#FF6B00' },
    { label: 'Neural Inferences', value: '850K+', sub: 'Per Second Throughput', color: '#F59E0B' },
    { label: 'Active Edge Nodes', value: '14,280', sub: 'Tier-1 Mesh Routing', color: '#22C55E' },
    { label: 'Hardware Efficiency', value: '0.8W', sub: 'Per TOPS Inferencing', color: '#38BDF8' }
  ];

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
            <Cpu size={13} />
            <span>DEEP-TECH ARCHITECTURE & CAPABILITIES</span>
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
            Architecture of <span className="text-gradient">Collective Power</span>
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
            Modular, composable, and relentlessly optimized foundations powering each entity in our venture stack — from low-level quantum annealers to WASM runtime federations.
          </p>

          {/* Realtime Benchmark HUD Strip (Native Mobile Responsive) */}
          <div
            className="capabilities-benchmark-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))',
              gap: '12px',
              marginTop: '28px',
              textAlign: 'left'
            }}
          >
            {benchmarks.map((b) => (
              <div
                key={b.label}
                style={{
                  padding: 'clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 20px)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${b.color}35`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 8px 24px -10px ${b.color}20`
                }}
              >
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {b.label}
                </div>
                <div style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, color: b.color, marginTop: '2px', lineHeight: 1.2 }}>
                  {b.value}
                </div>
                <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginTop: '4px' }}>
                  {b.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .capabilities-benchmark-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {/* Main Capabilities Bento Grid (NO DUPLICATE HEADER) */}
      <CapabilitiesSection capabilitiesData={capabilitiesData} hideHeader={true} />

      {/* Explore Brands CTA */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '80px', marginTop: '30px' }}>
        <button
          onClick={() => onNavigate('brands')}
          className="btn-primary"
          style={{ padding: '14px 32px', fontSize: '0.96rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <span>See How Our Brands Deploy These Capabilities</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
