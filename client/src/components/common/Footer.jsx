import React from 'react';
import { Layers, ShieldCheck, ArrowUpRight, Cpu, Terminal, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate, onOpenAdmin }) {
  const handleNav = (page) => {
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(180deg, #060608 0%, #030304 100%)',
        padding: '80px 0 40px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle bottom ambient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.12) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '60px'
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/stackyr-icon-dark.png"
                alt="Stackyr"
                style={{ height: '36px', width: 'auto' }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF' }}>
                  STACKYR
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-orange)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Stacking Intelligence
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              The unified compound architecture of breakthrough AI ventures, sovereign edge networks, developer communities, and bare-metal compute.
            </p>

            {/* Operational Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: '#4ADE80'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 8px #22C55E'
                }}
              />
              ECOSYSTEM OPERATIONAL • 99.999%
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <button onClick={() => handleNav('home')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Home Page</button>
              <button onClick={() => handleNav('brands')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Ventures & Brands</button>
              <button onClick={() => handleNav('capabilities')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Deep-Tech Capabilities</button>
              <button onClick={() => handleNav('about')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>About Us & Ethos</button>
              <button onClick={() => handleNav('contact')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Contact & Partner</button>
            </div>
          </div>

          {/* Brands Portfolio Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Venture Entities
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <button onClick={() => handleNav('brands')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>WEBIND (Edge Compute)</button>
              <button onClick={() => handleNav('community')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Stackyr Community (Dev Collective)</button>
              <button onClick={() => handleNav('brands')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Kronix AI (Cognitive Swarms)</button>
              <button onClick={() => handleNav('brands')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Cybermesh (zk-Cryptography)</button>
              <button onClick={() => handleNav('brands')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Synapth (Vector Fabrics)</button>
            </div>
          </div>

          {/* Community & Dialogue */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Connect & Build
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Are you developing deep-tech AI models or looking to join the Stackyr venture pipeline?
            </p>
            <button
              onClick={() => handleNav('contact')}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.88rem', cursor: 'pointer' }}
            >
              <span>Initiate Dialogue</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>© {new Date().getFullYear()} STACKYR Ecosystem Inc. “Stacking Intelligence”. All Rights Reserved.</span>
            {/* Secret discreet Admin key */}
            <button
              onClick={onOpenAdmin}
              title="System Node"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                padding: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.15)')}
            >
              <Terminal size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shortcut: <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>Ctrl+Shift+A</kbd></span>
            <a href="#" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
