import React, { useState, useRef } from 'react';
import { ArrowUpRight, Sparkles, Layers, Shield, ExternalLink, Activity } from 'lucide-react';

export default function BrandCard({ brand, onSelect }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) translateY(-5px)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }
  };

  const accent = brand.accentColor || '#FF6B00';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(brand)}
      className="glass-card"
      style={{
        position: 'relative',
        borderRadius: '22px',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(26, 30, 46, 0.85) 0%, rgba(12, 14, 22, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(16, 19, 30, 0.65) 0%, rgba(8, 10, 16, 0.8) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        border: `1px solid ${isHovered ? accent : 'rgba(255, 255, 255, 0.1)'}`,
        boxShadow: isHovered
          ? `0 24px 50px -12px rgba(0, 0, 0, 0.85), 0 0 32px -6px ${accent}45, inset 0 1px 1px rgba(255, 255, 255, 0.25)`
          : '0 10px 30px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(18px, 3.5vw, 28px)',
        minHeight: '340px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Specular top glass line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: isHovered
            ? `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 40%, ${accent} 70%, transparent 100%)`
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
          pointerEvents: 'none'
        }}
      />
      {/* Ambient background glow inside card */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: accent,
          filter: 'blur(70px)',
          opacity: isHovered ? 0.3 : 0.08,
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease'
        }}
      />

      {/* Top Header Row */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          {/* Logo container */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '13px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${accent}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: `0 4px 16px -4px ${accent}30`
            }}
          >
            <img
              src={brand.logo || '/stackyr-icon-dark.png'}
              alt={brand.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/stackyr-icon-dark.png';
              }}
            />
          </div>

          {/* Badges: Featured / Stealth */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
            {brand.featured && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  background: 'rgba(255, 107, 0, 0.15)',
                  border: '1px solid rgba(255, 107, 0, 0.4)',
                  color: '#FF8A00',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                <Sparkles size={11} /> FEATURED
              </span>
            )}
            {brand.isComingSoon && (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  background: 'rgba(148, 163, 184, 0.12)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  color: '#CBD5E1',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                STEALTH
              </span>
            )}
          </div>
        </div>

        {/* Category Label (Dedicated row to prevent squishing) */}
        <div style={{ marginBottom: '6px' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              color: accent,
              fontWeight: 600,
              textTransform: 'uppercase'
            }}
          >
            {brand.category}
          </span>
        </div>

        {/* Brand Title and Tagline */}
        <h3
          style={{
            fontSize: 'clamp(1.35rem, 2.2vw, 1.55rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '6px',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            wordBreak: 'break-word'
          }}
        >
          {brand.name}
        </h3>

        <p
          style={{
            fontSize: '0.86rem',
            color: '#E2E8F0',
            fontWeight: 500,
            marginBottom: '14px',
            lineHeight: 1.45,
            wordBreak: 'break-word'
          }}
        >
          {brand.tagline || 'Autonomous Venture node'}
        </p>

        {/* Description snippet */}
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {brand.description}
        </p>

        {/* Service pills */}
        {brand.services && brand.services.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
            {brand.services.slice(0, 3).map((srv, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 9px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#CBD5E1'
                }}
              >
                {srv}
              </span>
            ))}
            {brand.services.length > 3 && (
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  color: 'var(--text-muted)'
                }}
              >
                +{brand.services.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Metrics & Explore Button */}
      <div>
        {brand.metrics && brand.metrics.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(brand.metrics.length, 2)}, 1fr)`,
              gap: '10px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '18px'
            }}
          >
            {brand.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '0.92rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFFFFF' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <span
            style={{
              fontSize: '0.84rem',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              color: isHovered ? accent : '#F8FAFC',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s ease'
            }}
          >
            Explore Venture Architecture
            <ArrowUpRight
              size={15}
              style={{
                transform: isHovered ? 'translate(2px, -2px)' : 'none',
                transition: 'transform 0.2s ease'
              }}
            />
          </span>

          {brand.websiteUrl && (
            <a
              href={brand.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '6px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              title="Visit external site"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
