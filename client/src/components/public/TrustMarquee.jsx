import React from 'react';

export default function TrustMarquee({ marqueeData }) {
  const partners = [
    {
      name: 'NVIDIA',
      category: 'Accelerated Compute',
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M9.17 6.12c-.63.2-6.52 3.98-6.52 10.36 0 5.48 4.29 8.27 8.7 8.27 3.53 0 6.64-1.92 8.31-4.99-3.23 2.1-6.15 1.58-8.2 0-2.07-1.58-3.07-3.9-3.07-6.27 0-3.66 2.22-6.27 5.56-7.37.52-.17.96-.28 1.4-.33-.6-.11-1.3-.12-2.18-.12-1.63 0-3.13.16-4-.55z"/>
          <path d="M12.98 9.5c-2.4 0-4.08 1.83-4.08 4.25 0 2.22 1.57 3.95 3.93 3.95 2.2 0 3.73-1.61 3.73-3.97 0-2.35-1.5-4.23-3.58-4.23z"/>
        </svg>
      )
    },
    {
      name: 'Amazon Web Services',
      category: 'Cloud Infrastructure',
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M6.2 12.8c-.8 0-1.4-.2-1.9-.5l.4-1.3c.4.3.9.4 1.4.4.8 0 1.2-.4 1.2-1.1V5.7h1.6v4.7c0 1.5-1 2.4-2.7 2.4zm4.8 0V5.7h1.6v2.8c.4-.7 1.2-1.1 2.1-1.1 1.6 0 2.5 1.1 2.5 2.7v2.7h-1.6v-2.5c0-.9-.5-1.5-1.4-1.5-.9 0-1.6.6-1.6 1.7v2.3h-1.6zm-8.8 5.6c4.6 3.1 10.8 3.1 15.4 0 .4-.3.9.1.5.5-4.9 3.5-11.5 3.5-16.4 0-.4-.4 0-.8.5-.5z"/>
        </svg>
      )
    },
    {
      name: 'Google Cloud',
      category: 'Distributed Mesh',
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
      )
    },
    {
      name: 'OpenAI',
      category: 'Neural Models',
      svg: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M22.28 9.37a5.99 5.99 0 0 0-.52-4.94 6.07 6.07 0 0 0-6.52-2.82 6.07 6.07 0 0 0-4.66-2.07 6.13 6.13 0 0 0-5.83 4.25 6.07 6.07 0 0 0-3.9 2.82 6.04 6.04 0 0 0 .74 7.15 6 6 0 0 0 .52 4.93 6.07 6.07 0 0 0 6.52 2.83 6.07 6.07 0 0 0 4.66 2.07 6.13 6.13 0 0 0 5.83-4.25 6.07 6.07 0 0 0 3.9-2.82 6.04 6.04 0 0 0-.74-7.15zM12 14.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
      )
    },
    {
      name: 'Cloudflare',
      category: 'Edge WASM Network',
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M18.2 8.6c-.6-3.2-3.4-5.6-6.8-5.6-3 0-5.6 1.9-6.5 4.7C2.2 8.3 0 10.7 0 13.6c0 3.3 2.7 6 6 6h12.5c3 0 5.5-2.5 5.5-5.5 0-2.8-2.1-5.1-4.8-5.5z"/>
        </svg>
      )
    },
    {
      name: 'Microsoft Azure',
      category: 'Enterprise Mesh',
      svg: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M13.48 2.67a.75.75 0 0 0-.82.16L1.6 13.91a.75.75 0 0 0 .53 1.28h7.12l-2.07 6.14a.75.75 0 0 0 1.35.61l13.82-13.82a.75.75 0 0 0-.53-1.28H14.8l2.07-4.14a.75.75 0 0 0-.69-.87z"/>
        </svg>
      )
    },
    {
      name: 'Intel Xeon',
      category: 'Photonic Silicon',
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M19.8 11.2c-.3-1.8-1.5-3.3-3.2-4.1-1.8-.8-3.9-.9-5.8-.3-1.9.6-3.4 1.9-4.3 3.6-.9 1.7-1.1 3.8-.5 5.7.6 1.9 1.9 3.4 3.6 4.3 1.7.9 3.8 1.1 5.7.5 1.9-.6 3.4-1.9 4.3-3.6.4-.8.7-1.6.8-2.5h-2.2c-.1.6-.3 1.2-.6 1.7-.7 1.3-1.8 2.2-3.3 2.6-1.4.4-3 .2-4.3-.5-1.3-.7-2.3-1.8-2.7-3.2-.4-1.4-.3-3 .4-4.3.7-1.3 1.8-2.3 3.2-2.7 1.4-.4 3-.2 4.3.5 1.3.7 2.2 1.8 2.5 3.2h2.2z"/>
        </svg>
      )
    },
    {
      name: 'Vercel',
      category: 'Edge Runtime',
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M24 22.525H0l12-21.05 12 21.05z"/>
        </svg>
      )
    },
    {
      name: 'Supabase',
      category: 'Sovereign Database',
      svg: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M21.36 9.88a1.2 1.2 0 0 0-1.12-.88h-6.28l4.4-7.46a1.2 1.2 0 0 0-1.74-1.5l-13.2 11.2a1.2 1.2 0 0 0 .78 2.06h6.28l-4.4 7.46a1.2 1.2 0 0 0 1.74 1.5l13.2-11.2a1.2 1.2 0 0 0 .34-1.18z"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      category: 'Container Swarm',
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M13.98 8.06h2.24v2.24h-2.24V8.06zm-3.36 0h2.24v2.24h-2.24V8.06zm-3.36 0h2.24v2.24H7.26V8.06zm10.08 3.36h2.24v2.24h-2.24v-2.24zm-3.36 0h2.24v2.24h-2.24v-2.24zm-3.36 0h2.24v2.24h-2.24v-2.24zm-3.36 0h2.24v2.24H7.26v-2.24zm-3.36 0h2.24v2.24H3.9v-2.24zm-.5 3.36c.4 3.7 3.5 6.6 7.3 6.6 4.7 0 8.6-3.8 8.6-8.5 0-.4 0-.8-.1-1.2 1.4-.7 2.4-2 2.7-3.6-.8-.2-1.7-.1-2.4.3-.2-.5-.5-1-.9-1.4l-.8.5c.3.4.6.8.8 1.3-.8.2-1.5.7-1.9 1.4-1.3-.7-2.9-1.1-4.5-1.1H1.5c-.3 1.1-.4 2.2-.4 3.3 0 .8.1 1.6.3 2.4z"/>
        </svg>
      )
    },
    {
      name: 'Stripe',
      category: 'Payment Infrastructure',
      svg: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M13.98 10.43c0-1.1-.92-1.61-2.42-1.61-2.14 0-4.85.83-6.66 1.87L3.6 7.42c2.06-1.17 5.16-2.02 8.02-2.02 4.3 0 7.15 2.14 7.15 5.56 0 4.79-6.57 5.03-6.57 7.03 0 1.22 1.12 1.72 2.72 1.72 2.57 0 5.48-1.07 7.48-2.29l1.2 3.32c-2.3 1.4-5.69 2.26-8.74 2.26-4.5 0-7.51-2.26-7.51-5.67 0-4.99 6.63-5.26 6.63-6.9z"/>
        </svg>
      )
    },
    {
      name: 'Datadog',
      category: 'Mesh Observability',
      svg: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
        </svg>
      )
    }
  ];

  // Seamless 0 to -50% CSS infinite loop
  const duplicatedList = [...partners, ...partners];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        contain: 'paint',
        padding: '30px 0',
        background: 'linear-gradient(180deg, rgba(6, 6, 8, 0.98) 0%, rgba(9, 11, 16, 0.6) 50%, rgba(6, 6, 8, 0.98) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      {/* Top subtle micro-header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '20px',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          color: '#64748B',
          letterSpacing: '0.14em',
          textTransform: 'uppercase'
        }}
      >
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.35)' }} />
        <span>{marqueeData?.badge || 'TRUSTED BY INDUSTRY LEADERS & ECOSYSTEM PARTNERS'}</span>
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.35)' }} />
      </div>

      {/* Left Gradient Fade Mask */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'clamp(70px, 15vw, 200px)',
          background: 'linear-gradient(90deg, #060608 0%, rgba(6, 6, 8, 0.9) 35%, rgba(6, 6, 8, 0) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
          contain: 'paint'
        }}
      />

      {/* Right Gradient Fade Mask */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'clamp(70px, 15vw, 200px)',
          background: 'linear-gradient(270deg, #060608 0%, rgba(6, 6, 8, 0.9) 35%, rgba(6, 6, 8, 0) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
          contain: 'paint'
        }}
      />

      {/* Infinite Scrolling Track - Clean Hardware Composited */}
      <div className="marquee-track">
        {duplicatedList.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="partner-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 22px',
              margin: '0 8px',
              borderRadius: '9999px',
              background: 'rgba(16, 18, 26, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              flexShrink: 0,
              cursor: 'default',
              transition: 'border-color 0.2s ease, background 0.2s ease'
            }}
          >
            {/* Unified Monochrome Platinum SVG Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                flexShrink: 0,
                transition: 'color 0.25s ease'
              }}
              className="partner-logo"
            >
              {partner.svg}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#CBD5E1',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  transition: 'color 0.25s ease'
                }}
                className="partner-name"
              >
                {partner.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: '#64748B',
                  letterSpacing: '0.02em',
                  marginTop: '1px'
                }}
              >
                {partner.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .partner-pill:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        .partner-pill:hover .partner-logo {
          color: #FFFFFF !important;
        }
        .partner-pill:hover .partner-name {
          color: #FFFFFF !important;
        }
      `}</style>
    </div>
  );
}
