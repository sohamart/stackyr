import React, { useState } from 'react';
import { Lock, Sparkles, Bell, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { submitInquiry } from '../../services/api';

export default function ComingSoonSection({ brands = [] }) {
  const stealthBrands = brands.filter((b) => b.isComingSoon);
  const { success, error } = useToast();
  const [modalBrand, setModalBrand] = useState(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (stealthBrands.length === 0) return null;

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await submitInquiry({
        name: 'Stealth Waitlist Applicant',
        email,
        brandInterest: modalBrand ? modalBrand.name : 'Stealth Pipeline',
        company: 'Venture / Institutional',
        message: `Requested early stealth access for ${modalBrand?.name || 'All Stealth Ventures'}`
      });
      success('Early access registered! You will receive priority invitation keys upon public unlock.');
      setEmail('');
      setModalBrand(null);
    } catch (err) {
      error(err.message || 'Failed to submit registration');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="pipeline" className="section-pad" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div
            className="badge-pill"
            style={{
              margin: '0 auto 16px auto',
              background: 'rgba(148, 163, 184, 0.08)',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              color: '#CBD5E1'
            }}
          >
            <Lock size={13} />
            <span>INCUBATION PIPELINE</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
            Stealth <span className="text-gradient">Innovations</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Next-generation architectures currently undergoing private testing, quantum simulation, and proprietary algorithmic training.
          </p>
        </div>

        {/* Stealth Brand Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(16px, 3vw, 24px)'
          }}
        >
          {stealthBrands.map((brand) => {
            const accent = brand.accentColor || '#F59E0B';
            return (
              <div
                key={brand._id || brand.id}
                className="glass-card"
                style={{
                  padding: 'clamp(18px, 3.5vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'linear-gradient(180deg, rgba(14, 15, 22, 0.85) 0%, rgba(8, 9, 13, 0.95) 100%)',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(245, 158, 11, 0.12)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#F59E0B',
                        fontWeight: 600
                      }}
                    >
                      ENCRYPTED REPO
                    </div>
                    <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      STEALTH PROTOCOL
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                    {brand.name}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: accent, fontWeight: 500, marginBottom: '14px' }}>
                    {brand.tagline || 'Next-gen sovereign computing'}
                  </p>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {brand.description}
                  </p>

                  {/* Teaser specs */}
                  {brand.metrics && brand.metrics.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '14px',
                        borderRadius: '12px',
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        marginBottom: '24px'
                      }}
                    >
                      {brand.metrics.map((m, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{m.label}:</span>
                          <span style={{ fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 600 }}>{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Request early access button */}
                <button
                  onClick={() => setModalBrand(brand)}
                  className="btn-secondary"
                  style={{ width: '100%', gap: '8px' }}
                >
                  <Bell size={15} />
                  <span>Request Early Access</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Early Access Modal */}
      {modalBrand && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 6, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setModalBrand(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              background: 'linear-gradient(180deg, #12141D 0%, #0A0B0F 100%)',
              border: '1px solid var(--border-accent)',
              padding: '32px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Stealth Access: {modalBrand.name}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              Enter your corporate email to be notified when private alpha slots open for this architecture.
            </p>

            <form onSubmit={handleNotifySubmit}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalBrand(null)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  {submitting ? 'Registering...' : 'Join Waitlist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
