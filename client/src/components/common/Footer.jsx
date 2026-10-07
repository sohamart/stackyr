import React from 'react';
import {
  Layers, ArrowUpRight, Cpu, Terminal, Sparkles, Shield,
  Github, MessageSquare, Twitter, Mail, CheckCircle2, Globe, ExternalLink
} from 'lucide-react';

export default function Footer({ footerData, onNavigate, onOpenAdmin, onOpenLegal }) {
  const handleNav = (page) => {
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footer = {
    brandName: footerData?.brandName || 'STACKYR',
    brandTagline: footerData?.brandTagline || 'Stacking Intelligence',
    description: footerData?.description || 'The unified compound architecture orchestrating breakthrough AI ventures, high-velocity edge networks like WEBIND, and sovereign computing fabrics.',
    statusText: footerData?.statusText || 'GLOBAL MESH OPERATIONAL • 99.999%',
    col2Title: footerData?.col2Title || 'Architecture Nav',
    col3Title: footerData?.col3Title || 'Venture Constellation',
    col4Title: footerData?.col4Title || 'Connect & Build',
    col4Description: footerData?.col4Description || 'Join the engineering collective, submit venture pitches, or access bare-metal testnets.',
    discordText: footerData?.discordText || 'Discord Collective',
    discordUrl: footerData?.discordUrl || 'https://discord.gg/stackyr',
    githubText: footerData?.githubText || 'GitHub Repositories',
    githubUrl: footerData?.githubUrl || 'https://github.com/stackyr',
    email: footerData?.email || 'ventures@stackyr.io',
    ctaButtonText: footerData?.ctaButtonText || 'Initiate Dialogue',
    copyrightText: footerData?.copyrightText || `© ${new Date().getFullYear()} STACKYR Ecosystem Inc. “Stacking Intelligence”. All Rights Reserved.`,
    privacyPolicyText: footerData?.privacyPolicyText || 'Privacy Policy',
    termsOfServiceText: footerData?.termsOfServiceText || 'Terms of Service',
    constellationList: footerData?.constellationList && footerData.constellationList.length > 0
      ? footerData.constellationList
      : [
          { name: 'WEBIND (Edge Compute)', tag: 'Flagship', link: 'webind' },
          { name: 'Kronix AI (Cognitive Swarms)', tag: '', link: 'brands' },
          { name: 'Cybermesh (zk-Cryptography)', tag: '', link: 'brands' },
          { name: 'Synapth (Vector Fabrics)', tag: '', link: 'brands' },
          { name: 'NeuroGrid (Silicon Edge)', tag: '', link: 'brands' }
        ]
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(180deg, #060608 0%, #030305 100%)',
        padding: 'clamp(50px, 8vw, 84px) 0 clamp(24px, 4vw, 40px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient bottom warm glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-140px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 94vw)',
          height: '320px',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.12) 0%, rgba(245, 158, 11, 0.03) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Main 4-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
            gap: 'clamp(32px, 5vw, 48px)',
            marginBottom: 'clamp(36px, 6vw, 64px)'
          }}
        >
          {/* Column 1: Brand & Operational Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="/retouch_2026100722274326.png"
                alt="Stackyr Symbol"
                style={{ height: '36px', width: 'auto', filter: 'drop-shadow(0 0 12px rgba(255, 107, 0, 0.35))' }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {footer.brandName}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-orange)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {footer.brandTagline}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              {footer.description}
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
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#4ADE80',
                width: 'fit-content'
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
              <span>{footer.statusText}</span>
            </div>
          </div>

          {/* Column 2: Ecosystem Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '18px',
                fontWeight: 700
              }}
            >
              {footer.col2Title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <button onClick={() => handleNav('home')} className="footer-nav-link">Home Ecosystem</button>
              <button onClick={() => handleNav('brands')} className="footer-nav-link">Ventures & Brands</button>
              <button onClick={() => handleNav('community')} className="footer-nav-link">Stackyr Community</button>
              <button onClick={() => handleNav('capabilities')} className="footer-nav-link">Deep-Tech Capabilities</button>
              <button onClick={() => handleNav('about')} className="footer-nav-link">About Us & Ethos</button>
              <button onClick={() => handleNav('contact')} className="footer-nav-link">Contact & Partner</button>
            </div>
          </div>

          {/* Column 3: Venture Entities */}
          <div>
            <h4
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '18px',
                fontWeight: 700
              }}
            >
              {footer.col3Title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              {footer.constellationList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNav(item.link || 'brands')}
                  className="footer-nav-link"
                >
                  <span>{item.name}</span>
                  {item.tag && <span className="footer-pill-tag">{item.tag}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Engineering Channels & Dialogue */}
          <div>
            <h4
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '18px',
                fontWeight: 700
              }}
            >
              {footer.col4Title}
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
              {footer.col4Description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {footer.discordUrl && (
                <a
                  href={footer.discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link"
                >
                  <MessageSquare size={14} color="#5865F2" />
                  <span>{footer.discordText}</span>
                  <ArrowUpRight size={12} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                </a>
              )}

              {footer.githubUrl && (
                <a
                  href={footer.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link"
                >
                  <Github size={14} color="var(--accent-orange)" />
                  <span>{footer.githubText}</span>
                  <ArrowUpRight size={12} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                </a>
              )}

              {footer.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="footer-social-link"
                >
                  <Mail size={14} color="#F59E0B" />
                  <span>{footer.email}</span>
                  <ArrowUpRight size={12} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                </a>
              )}
            </div>

            <button
              onClick={() => handleNav('contact')}
              className="btn-primary"
              style={{
                padding: '9px 18px',
                fontSize: '0.82rem',
                borderRadius: '9999px',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>{footer.ctaButtonText}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          {/* Copyright & Trademark */}
          <div>
            <span>{footer.copyrightText}</span>
          </div>

          {/* Legal Links & PC-Only Admin Access */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {/* Privacy Policy Trigger */}
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {footer.privacyPolicyText}
            </button>

            {/* Terms of Service Trigger */}
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {footer.termsOfServiceText}
            </button>

            {/* PC-ONLY Admin Access Shortcut (Hidden on Mobile) */}
            <button
              onClick={onOpenAdmin}
              className="pc-only-admin-shortcut"
              title="System Operator Console (PC Shortcut: Ctrl+Shift+A)"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px 10px',
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                gap: '8px',
                alignItems: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.4)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.background = 'rgba(255, 107, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <Terminal size={12} color="var(--accent-orange)" />
              <span>Admin Console</span>
              <kbd
                style={{
                  padding: '2px 5px',
                  borderRadius: '4px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.68rem',
                  color: 'var(--accent-orange)'
                }}
              >
                Ctrl+Shift+A
              </kbd>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          text-align: left;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          font-size: 0.88rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.18s ease, transform 0.18s ease;
        }
        .footer-nav-link:hover {
          color: #FFFFFF;
          transform: translateX(3px);
        }
        .footer-pill-tag {
          font-size: 0.64rem;
          font-family: var(--font-mono);
          padding: 1px 6px;
          border-radius: 9999px;
          background: rgba(255, 107, 0, 0.15);
          color: var(--accent-orange);
          border: 1px solid rgba(255, 107, 0, 0.3);
          font-weight: 700;
        }
        .footer-social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          font-size: 0.8rem;
          text-decoration: none;
          transition: all 0.18s ease;
        }
        .footer-social-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.12);
        }
        /* PC ONLY Admin Shortcut: Visible on desktop, completely hidden on mobile/tablet */
        .pc-only-admin-shortcut {
          display: inline-flex;
        }
        @media (max-width: 899px) {
          .pc-only-admin-shortcut {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
