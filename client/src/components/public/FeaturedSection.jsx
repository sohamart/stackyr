import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Activity, Cpu, ArrowUpRight } from 'lucide-react';

export default function FeaturedSection({ brands = [], onSelectBrand }) {
  const featuredBrands = brands.filter((b) => b.featured);
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (featuredBrands.length === 0) return null;
  const currentBrand = featuredBrands[selectedIdx] || featuredBrands[0];
  const accent = currentBrand.accentColor || '#FF6B00';

  return (
    <section id="featured" className="section-pad" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section title */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <Sparkles size={13} />
              <span>FEATURED VENTURE SPOTLIGHT</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF' }}>
              Pillars of <span className="text-gradient">Compounding Scale</span>
            </h2>
          </div>

        {/* Tab selector for featured brands */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {featuredBrands.map((b, idx) => {
            const active = selectedIdx === idx;
            return (
              <button
                key={b._id || b.id || idx}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  background: active ? 'rgba(255, 107, 0, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${active ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)'}`,
                  color: active ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {b.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Brand Spotlight Card */}
      <div
        className="glass-card"
        style={{
          borderRadius: 'clamp(18px, 3.5vw, 28px)',
          background: 'linear-gradient(135deg, rgba(16, 18, 28, 0.88) 0%, rgba(9, 10, 15, 0.96) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${accent}50`,
          padding: 'clamp(16px, 3.5vw, 40px)',
          boxShadow: `0 24px 70px -20px rgba(0, 0, 0, 0.9), 0 0 40px -15px ${accent}25, inset 0 1px 1px rgba(255, 255, 255, 0.15)`,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Subtle accent light bloom */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: accent,
            filter: 'blur(100px)',
            opacity: 0.18,
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(20px, 3.5vw, 40px)',
            alignItems: 'center'
          }}
        >
          {/* Left Content */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: `${accent}18`,
                  border: `1px solid ${accent}40`,
                  color: accent,
                  fontWeight: 600
                }}
              >
                {currentBrand.category}
              </span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                VENTURE #0{selectedIdx + 1}
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.8rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '10px',
                letterSpacing: '-0.02em',
                wordBreak: 'break-word',
                lineHeight: 1.15
              }}
            >
              {currentBrand.name}
            </h3>

            <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: accent, fontWeight: 500, marginBottom: '16px', lineHeight: 1.4 }}>
              {currentBrand.tagline}
            </p>

            <p style={{ fontSize: 'clamp(0.88rem, 1.6vw, 0.98rem)', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '24px' }}>
              {currentBrand.description}
            </p>

            {/* Services tags */}
            {currentBrand.services && currentBrand.services.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Engineered Capabilities:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {currentBrand.services.map((srv, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.76rem',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#E2E8F0'
                      }}
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                onClick={() => onSelectBrand && onSelectBrand(currentBrand)}
                className="btn-primary"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, #FF851B 100%)`,
                  padding: '12px 22px',
                  fontSize: '0.9rem',
                  flex: '1 1 auto'
                }}
              >
                <span>Explore Full Architecture</span>
                <ArrowRight size={16} />
              </button>

              {currentBrand.websiteUrl && (
                <a
                  href={currentBrand.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{
                    padding: '12px 20px',
                    fontSize: '0.9rem',
                    flex: '1 1 auto'
                  }}
                >
                  <span>Visit Live Portal</span>
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Right Telemetry Specs */}
          <div
            style={{
              borderRadius: '18px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: 'clamp(18px, 3.5vw, 30px)',
              minWidth: 0,
              width: '100%'
            }}
          >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={currentBrand.logo || '/stackyr-icon-dark.png'}
                      alt={currentBrand.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', wordBreak: 'break-word' }}>
                      {currentBrand.name} Node
                    </div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#22C55E' }}>
                      ● SYNCHRONIZED
                    </div>
                  </div>
                </div>
                <Activity size={18} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
              </div>

              {/* Metrics Readout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(currentBrand.metrics || [
                  { label: 'Computational Velocity', value: '12x' },
                  { label: 'Ecosystem SLA', value: '99.999%' },
                  { label: 'State Proofs', value: 'Real-Time' }
                ]).map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {m.label}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFFFFF' }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
