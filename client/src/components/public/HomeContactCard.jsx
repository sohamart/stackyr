import React, { useState } from 'react';
import {
  Send, Mail, Check, ArrowRight, Sparkles, Shield,
  Globe, MessageSquare, Terminal, Clock, Copy
} from 'lucide-react';

export default function HomeContactCard({ onNavigate, contactData }) {
  const [copied, setCopied] = useState(false);
  const email = contactData?.email || 'ventures@stackyr.io';

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      className="section-pad"
      style={{
        paddingTop: 'clamp(36px, 6vw, 64px)',
        paddingBottom: 'clamp(60px, 9vw, 100px)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            position: 'relative',
            borderRadius: 'clamp(24px, 4vw, 32px)',
            background: 'linear-gradient(135deg, rgba(16, 18, 28, 0.92) 0%, rgba(8, 9, 14, 0.98) 100%)',
            border: '1px solid rgba(255, 107, 0, 0.35)',
            boxShadow: '0 30px 90px -20px rgba(0, 0, 0, 0.95), 0 0 60px -15px rgba(255, 107, 0, 0.22)',
            padding: 'clamp(28px, 5vw, 60px)',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Corner Glow (Optimized Zero-Blur Raster) */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 107, 0, 0.16) 0%, rgba(245, 158, 11, 0.05) 45%, rgba(255, 107, 0, 0.01) 60%, transparent 75%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '40px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Left Content Column */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 107, 0, 0.12)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                  marginBottom: '18px'
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
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#FED7AA',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  {contactData?.badge || 'DIRECT PROTOCOL COLLABORATION'}
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                  lineHeight: 1.15
                }}
              >
                {contactData?.title || 'Ready to Compound'} <span className="text-gradient">{contactData?.titleAccent || 'Intelligence?'}</span>
              </h2>

              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                  color: '#CBD5E1',
                  lineHeight: 1.65,
                  marginBottom: '26px'
                }}
              >
                {contactData?.description || "Whether you're deploying bare-metal AI clusters, pitching a venture to the Stackyr ecosystem, or integrating Webind edge compute, our leadership collective is ready."}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('contact') : window.location.hash = '#contact'}
                  className="btn-primary"
                  style={{
                    padding: '14px 28px',
                    fontSize: '0.96rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>{contactData?.primaryBtnText || 'Open Contact Portal'}</span>
                  <Send size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn-secondary"
                  style={{
                    padding: '14px 22px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {copied ? <Check size={16} color="#22C55E" /> : <Copy size={16} color="var(--accent-orange)" />}
                  <span>{copied ? `Copied ${email}` : (contactData?.copyBtnText || 'Copy Direct Email')}</span>
                </button>
              </div>

              {/* Response Time & Security Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>
                  <Clock size={13} color="var(--accent-orange)" />
                  <span>{contactData?.responseNotice || 'P99 First Response: < 4 Hours'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>
                  <Shield size={13} color="#22C55E" />
                  <span>Zero-Trust Encrypted Channels</span>
                </div>
              </div>
            </div>

            {/* Right Information Deck & Hubs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: 'rgba(10, 12, 18, 0.65)',
                padding: 'clamp(20px, 3vw, 28px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  STACKYR CHANNELS
                </span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#22C55E' }}>
                  ● ALL LINES ACTIVE
                </span>
              </div>

              {/* Channel 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255, 107, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={16} color="var(--accent-orange)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF' }}>Venture Incubation</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Seed to Scale Synergistic Co-Founding</div>
                  </div>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>

              {/* Channel 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Globe size={16} color="#22C55E" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF' }}>Enterprise Node Mesh</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Sovereign Computing & Custom Silicon</div>
                  </div>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>

              {/* Channel 3 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Terminal size={16} color="#F59E0B" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF' }}>Stackyr Community</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Developer Guilds & Research Grants</div>
                  </div>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
