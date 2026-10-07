import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, Lock, CheckCircle2, ExternalLink, Scale, Sparkles } from 'lucide-react';

export default function LegalModal({ initialTab = 'privacy', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'privacy' | 'terms'

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Lock body & Lenis smooth scroll while modal is active
  useEffect(() => {
    // 1. Pause Lenis smooth scroll so it does not intercept wheel events
    if (window.__lenis) {
      window.__lenis.stop();
    }

    // 2. Lock document body and html elements
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 3. Escape key listener to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Resume Lenis smooth scroll on unmount
      if (window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 24px)',
        background: 'rgba(3, 4, 7, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '860px',
          height: 'min(86vh, 760px)',
          maxHeight: '86vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #0C0E17 0%, #06070B 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 107, 0, 0.15)',
          overflow: 'hidden',
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(255, 107, 0, 0.12)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)'
              }}
            >
              {activeTab === 'privacy' ? <Shield size={18} /> : <Scale size={18} />}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFFFFF', fontSize: '1.15rem' }}>
                {activeTab === 'privacy' ? 'Sovereign Privacy Policy' : 'Terms of Service & Usage Governance'}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                STACKYR ECOSYSTEM INC. • STRICT REVISION V3.4 • EFFECTIVE 2026
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Tab Switcher */}
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '3px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <button
                onClick={() => setActiveTab('privacy')}
                style={{
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'privacy' ? 'var(--accent-orange)' : 'transparent',
                  color: activeTab === 'privacy' ? '#000000' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                style={{
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'terms' ? 'var(--accent-orange)' : 'transparent',
                  color: activeTab === 'terms' ? '#000000' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                Terms of Service
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="legal-scroll-container"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            padding: '24px clamp(18px, 4vw, 32px)',
            overflowY: 'auto',
            flex: '1 1 0px',
            minHeight: 0,
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            lineHeight: 1.7,
            color: '#CBD5E1',
            fontSize: '0.88rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          {activeTab === 'privacy' ? (
            <>
              {/* PRIVACY POLICY CONTENT */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 107, 0, 0.06)',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Lock size={18} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: '#F8FAFC' }}>
                  <strong>Strict Zero-Knowledge Data Commitment:</strong> Stackyr does not harvest, monetize, sell, or profile individual technical inference queries, model weights, or private cognitive agent communications.
                </span>
              </div>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  1. Scope & Sovereign Entities
                </h4>
                <p>
                  This Privacy Policy applies strictly to all digital touchpoints, telemetry fabrics, edge compilation tools (including WEBIND), and web applications operated by <strong>Stackyr Ecosystem Inc.</strong> and its affiliated sovereign deep-tech ventures (“Stackyr”, “we”, “our”, or “the Ecosystem”). By navigating our infrastructure or deploying connected nodes, you acknowledge the parameters outlined herein.
                </p>
              </section>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  2. Strict Data Collection Minimization
                </h4>
                <p>We enforce an uncompromising minimization protocol:</p>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Voluntary Partnership Telemetry:</strong> Contact inquiries submitted through our sovereign intake portal (such as email, institutional affiliation, and venture proposal decks) are encrypted at rest using AES-256-GCM.</li>
                  <li><strong>Ephemeral Edge Routing Telemetry:</strong> Network routing parameters, round-trip ping latency, and regional load metrics are utilized exclusively in volatile RAM to balance node routing across our 14,280 distributed silicon edge clusters, purged within 24 hours.</li>
                  <li><strong>Local PWA Cache:</strong> Service worker cached assets (`sw.js`) and Web Manifest data reside purely on your device hardware to enable sub-millisecond execution and offline navigation. No persistent tracking beacons are deployed.</li>
                </ul>
              </section>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  3. Zero-Knowledge Proofs & Enclave Defense
                </h4>
                <p>
                  Where ventures in the Stackyr orbit execute neural models or cryptographic transactions (e.g. Cybermesh, Kronix AI, Synapth), execution occurs within hardware-level confidential compute enclaves. Data payloads are mathematically blinded via zero-knowledge verifiable proofs (zk-SNARKs). Even operators within Stackyr cannot access raw decrypted payload inputs.
                </p>
              </section>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  4. International Standards & Rights of Erasure
                </h4>
                <p>
                  In full adherence to the EU General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and global post-quantum cryptographic standards, any party maintains the unconditional right to audit, request complete cryptographic deletion, or inspect any direct communication archive by submitting a verified transmission to:
                </p>
                <div style={{ marginTop: '8px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-orange)' }}>
                  security-compliance@stackyr.io
                </div>
              </section>
            </>
          ) : (
            <>
              {/* TERMS OF SERVICE CONTENT */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.06)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Scale size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: '#F8FAFC' }}>
                  <strong>Legally Binding Usage Agreement:</strong> Unconditional adherence to these terms is mandatory for any automated crawler, developer client, commercial entity, or individual interacting with the Stackyr Ecosystem.
                </span>
              </div>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  1. Acceptance & Sovereign Eligibility
                </h4>
                <p>
                  Accessing, browsing, referencing, or interfacing via API with Stackyr constitutes full, unconditional legal acceptance of these Terms. If you do not consent to every provision in this contract, you must terminate network connections to our domain and edge infrastructure immediately.
                </p>
              </section>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  2. Intellectual Property & Anti-Reverse Engineering Protections
                </h4>
                <p>
                  All proprietary compilation runtimes, WASM edge acceleration modules, the "Stacking Intelligence" operational architecture, procedural UI synthesis codebases, visual trademarks, and mathematical vector indexing structures belong exclusively to <strong>Stackyr Ecosystem Inc.</strong>
                </p>
                <p style={{ marginTop: '8px' }}>
                  <strong>Strict Prohibitions:</strong> You may not under any circumstance: (a) reverse engineer, decompile, or disassemble any binary or obfuscated asset; (b) train competing generative models by unauthorized systematic scraping of proprietary venture documentation; or (c) mirror or frame our digital interface without explicit written sovereign charter.
                </p>
              </section>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  3. Hostile Interference & Rate Limit Governance
                </h4>
                <p>
                  Any intentional attempt to introduce Byzantine faults, poison distributed neural weights, conduct unauthorized stress or denial-of-service (DDoS) testing against Stackyr edge nodes, or bypass administrative key barriers will result in instantaneous IP null-routing, cryptographic blacklisting, and immediate civil and criminal prosecution under international cyberdefense statutes.
                </p>
              </section>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  4. Disclaimer of Warranties & Limitation of Liability
                </h4>
                <p>
                  The Stackyr platform and all affiliated venture proofs are provided on an "AS IS" and "AS AVAILABLE" basis. While our clusters maintain an architectural standard of 99.999% fault-tolerant availability, Stackyr explicitly disclaims all warranties, express or implied. Under no legal theory shall Stackyr Ecosystem Inc. be held liable for indirect, punitive, or consequential computational damages arising from reliance on algorithmic inferences or edge pipeline latency.
                </p>
              </section>

              <section>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  5. Governing Jurisdiction & Mandatory Arbitration
                </h4>
                <p>
                  These Terms shall be interpreted and enforced strictly in accordance with sovereign commercial tech laws. Any dispute arising under or in connection with these Terms shall be resolved exclusively through final and binding arbitration under the rules of the International Commercial Arbitration Association.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 0, 0, 0.4)',
            flexWrap: 'wrap',
            gap: '12px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={14} color="#22C55E" />
            <span>Cryptographically Verified & Enforced Worldwide</span>
          </div>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              padding: '8px 20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              borderRadius: '9999px',
              cursor: 'pointer'
            }}
          >
            I Acknowledge & Understand
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .legal-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .legal-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 9999px;
        }
        .legal-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 0, 0.5);
          border-radius: 9999px;
        }
        .legal-scroll-container::-webkit-scrollbar-thumb:hover {
          background: var(--accent-orange);
        }
      `}</style>
    </div>
  );
}
