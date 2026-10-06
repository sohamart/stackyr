import React from 'react';
import ContactSection from '../components/public/ContactSection';
import { Mail, MapPin, Sparkles, Shield, Send, Globe, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ ctaData, brands }) {
  const hubs = [
    { city: 'Bengaluru', timezone: 'IST (UTC+5:30)', focus: 'AI Architecture & Swarms', flag: 'IN' },
    { city: 'Singapore', timezone: 'SGT (UTC+8)', focus: 'Global Tier-1 Mesh Routing', flag: 'SG' },
    { city: 'San Francisco', timezone: 'PST (UTC-8)', focus: 'Silicon & Deep-Tech Ventures', flag: 'US' },
    { city: 'London', timezone: 'GMT (UTC+0)', focus: 'Enterprise Cryptography', flag: 'UK' }
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

      {/* Top Global Hubs Telemetry Strip (SINGLE, NON-DUPLICATED) */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(8px, 2vw, 20px)', paddingBottom: 'clamp(20px, 4vw, 36px)', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto clamp(24px, 4vw, 36px) auto' }}>
          <div className="badge-pill" style={{ margin: '0 auto 14px auto', display: 'inline-flex', padding: '4px 14px', fontSize: '0.68rem', gap: '6px' }}>
            <Globe size={13} />
            <span>GLOBAL PROTOCOL NETWORK</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.85rem, 5.5vw, 3.6rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
              lineHeight: 1.15
            }}
          >
            Direct Access to <span className="text-gradient">Stackyr Collective</span>
          </h1>

          <p style={{ fontSize: 'clamp(0.88rem, 1.6vw, 1.08rem)', color: '#94A3B8', lineHeight: 1.6 }}>
            Our founders and engineering architects review inquiries directly across our four primary operational hubs.
          </p>
        </div>

        {/* Global Node Hubs Bar */}
        <div
          className="contact-hubs-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
            gap: '10px',
            marginBottom: 'clamp(32px, 5vw, 48px)'
          }}
        >
          {hubs.map((hub) => (
            <div
              key={hub.city}
              style={{
                padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 18px)',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>
                  {hub.city}
                </span>
                <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>
                  {hub.timezone}
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                {hub.focus}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-hubs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
        }
      `}</style>

      {/* Main Interactive Contact Transmission Deck */}
      <ContactSection ctaData={ctaData} brands={brands} />
    </div>
  );
}
