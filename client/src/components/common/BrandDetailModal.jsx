import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2, Shield, Layers, Globe, Twitter, Linkedin, Github } from 'lucide-react';

export default function BrandDetailModal({ brand, onClose }) {
  useEffect(() => {
    if (window.__lenis) window.__lenis.stop();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const origBody = document.body.style.overflow;
    const origHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origBody;
      document.documentElement.style.overflow = origHtml;
    };
  }, [onClose]);

  if (!brand) return null;
  const accent = brand.accentColor || '#FF6B00';

  return (
    <div
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 4, 6, 0.88)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0px, 2vw, 20px)',
        animation: 'fadeIn 0.25s ease'
      }}
      className="mobile-modal-overlay"
      onClick={onClose}
    >
      <div
        className="glass-card mobile-modal-sheet"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          background: 'linear-gradient(135deg, rgba(16, 18, 28, 0.92) 0%, rgba(9, 10, 16, 0.98) 100%)',
          backdropFilter: 'blur(32px) saturate(200%)',
          border: `1px solid ${accent}50`,
          borderRadius: 'clamp(20px, 3.5vw, 26px)',
          boxShadow: `0 28px 70px rgba(0, 0, 0, 0.95), 0 0 50px -10px ${accent}30, inset 0 1px 1px rgba(255, 255, 255, 0.25)`,
          overflowY: 'auto',
          position: 'relative',
          padding: 'clamp(16px, 3.5vw, 36px)',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular Top Glass Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 40%, ${accent} 70%, transparent 100%)`,
            pointerEvents: 'none'
          }}
        />

        {/* Top Control Bar: Truly Centered SVG Notch Handle + Dedicated Close Button */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            marginBottom: '16px',
            paddingTop: '2px'
          }}
        >
          {/* Centered SVG Drag Notch */}
          <div
            className="mobile-drag-handle"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingBottom: '10px'
            }}
          >
            <svg width="48" height="5" viewBox="0 0 48 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="5" rx="2.5" fill="rgba(255, 255, 255, 0.38)" />
            </svg>
          </div>

          {/* Close Button on the right */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#CBD5E1',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#CBD5E1';
            }}
            aria-label="Close brand modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(14px, 3vw, 20px)',
            alignItems: 'flex-start',
            marginBottom: '24px',
            width: '100%'
          }}
        >
          {/* Logo Container */}
          <div
            style={{
              width: 'clamp(54px, 12vw, 72px)',
              height: 'clamp(54px, 12vw, 72px)',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${accent}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              flexShrink: 0,
              boxShadow: `0 8px 24px -6px ${accent}40`
            }}
          >
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            ) : (
              <Layers size={28} color={accent} />
            )}
          </div>

          {/* Details Container */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: 'clamp(0.66rem, 1.8vw, 0.72rem)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: `${accent}18`,
                  border: `1px solid ${accent}40`,
                  color: accent,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
              >
                {brand.category}
              </span>

              {brand.featured && (
                <span
                  style={{
                    fontSize: 'clamp(0.66rem, 1.8vw, 0.72rem)',
                    fontFamily: 'var(--font-mono)',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 107, 0, 0.12)',
                    border: '1px solid rgba(255, 107, 0, 0.3)',
                    color: '#FF8A00',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}
                >
                  STACKYR PILLAR
                </span>
              )}
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                wordBreak: 'break-word',
                marginBottom: '4px'
              }}
            >
              {brand.name}
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.85rem, 1.8vw, 0.98rem)',
                color: accent,
                fontWeight: 500,
                lineHeight: 1.45,
                wordBreak: 'break-word'
              }}
            >
              {brand.tagline}
            </p>
          </div>
        </div>

        {/* Brand Overview */}
        <div style={{ marginBottom: '24px' }}>
          <h4
            style={{
              fontSize: '0.76rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '8px'
            }}
          >
            Venture Architecture & Mission
          </h4>
          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.6vw, 0.98rem)',
              color: '#CBD5E1',
              lineHeight: 1.65,
              wordBreak: 'break-word'
            }}
          >
            {brand.description}
          </p>
        </div>

        {/* Performance Metrics Readout */}
        {brand.metrics && brand.metrics.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '10px'
              }}
            >
              Telemetry & Benchmark Specs
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
                gap: '10px'
              }}
            >
              {brand.metrics.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 'clamp(12px, 2.5vw, 16px)',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      wordBreak: 'break-word'
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: '#FFFFFF',
                      marginTop: '4px',
                      wordBreak: 'break-word'
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services & Capabilities */}
        {brand.services && brand.services.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h4
              style={{
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '10px'
              }}
            >
              Stackyr Integrated Services
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                gap: '8px'
              }}
            >
              {brand.services.map((srv, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.86rem)',
                    color: '#E2E8F0',
                    wordBreak: 'break-word'
                  }}
                >
                  <CheckCircle2 size={15} color={accent} style={{ flexShrink: 0 }} />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar & Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {brand.socialLinks?.twitter && (
              <a
                href={brand.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '9px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-secondary)'
                }}
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
            )}
            {brand.socialLinks?.linkedin && (
              <a
                href={brand.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '9px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-secondary)'
                }}
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
            )}
            {brand.socialLinks?.github && (
              <a
                href={brand.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '9px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-secondary)'
                }}
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
            )}
          </div>

          {/* Visit Website Button */}
          {brand.websiteUrl ? (
            <a
              href={brand.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{
                textDecoration: 'none',
                background: `linear-gradient(135deg, ${accent} 0%, #FF851B 100%)`,
                padding: '10px 20px',
                fontSize: '0.88rem',
                flex: '1 1 auto',
                justifyContent: 'center'
              }}
            >
              <span>Launch Platform</span>
              <ExternalLink size={15} />
            </a>
          ) : (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Private Alpha Access Only
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
