import React, { useState } from 'react';
import { Send, Mail, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { submitInquiry } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function ContactSection({ ctaData, brands = [] }) {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    brandInterest: 'WEBIND by Stackyr',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const data = ctaData || {
    badge: 'Partner & Build',
    title: 'Ready to Stack Intelligence With Us?',
    description: 'Whether you are scaling an intelligent venture or seeking synergistic enterprise integration, let’s shape what’s next.',
    buttonText: 'Initiate Dialogue',
    email: 'ventures@stackyr.io'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitInquiry(formData);
      success('Inquiry transmitted. A Stackyr partner will reach out within 24 hours.');
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        brandInterest: 'WEBIND by Stackyr',
        message: ''
      });
    } catch (err) {
      error(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad" style={{ position: 'relative' }}>
      <div className="container">
        <div
          style={{
            borderRadius: 'clamp(20px, 4vw, 32px)',
            background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.9) 0%, rgba(10, 11, 16, 0.98) 100%)',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 50px -15px rgba(255, 107, 0, 0.18)',
            padding: 'clamp(18px, 4vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Ambient corner light */}
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              right: '-120px',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, transparent 65%)',
              filter: 'blur(90px)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(28px, 4vw, 50px)',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Left Narrative Column */}
            <div>
              <div className="badge-pill" style={{ marginBottom: '20px' }}>
                <Sparkles size={13} />
                <span>{data.badge || 'INITIATE DIALOGUE'}</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  marginBottom: '20px'
                }}
              >
                {data.title || 'Ready to Stack Intelligence With Us?'}
              </h2>

              <p
                style={{
                  fontSize: '1.08rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '36px',
                  maxWidth: '520px'
                }}
              >
                {data.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255, 107, 0, 0.1)',
                      border: '1px solid rgba(255, 107, 0, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Mail size={18} color="var(--accent-orange)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      DIRECT SYNERGY DESK
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 600, color: '#FFFFFF' }}>
                      {data.email || 'ventures@stackyr.io'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MapPin size={18} color="#CBD5E1" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      GLOBAL COMPUTATIONAL FABRIC
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 600, color: '#FFFFFF' }}>
                      San Francisco • Singapore • Tokyo • London
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Column */}
            <div
              style={{
                borderRadius: '24px',
                background: 'rgba(8, 9, 13, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '36px'
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px auto'
                    }}
                  >
                    <CheckCircle2 size={32} color="#22C55E" />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                    Transmission Received
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
                    Your inquiry has entered the Stackyr venture pipeline. An executive partner will evaluate synergy metrics and respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                        CORPORATE EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@enterprise.com"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                        ORGANIZATION
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Venture / Fund / Studio"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                        VENTURE FOCUS
                      </label>
                      <select
                        value={formData.brandInterest}
                        onChange={(e) => setFormData({ ...formData, brandInterest: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          background: '#090A0E',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      >
                        <option value="WEBIND by Stackyr">WEBIND by Stackyr (Infrastructure)</option>
                        {brands.filter(b => !b.isComingSoon).map(b => (
                          <option key={b._id || b.name} value={b.name}>{b.name}</option>
                        ))}
                        <option value="General Ecosystem Partnership">General Ecosystem Synergy</option>
                        <option value="Stealth Incubation">Stealth Incubation Program</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                      PROJECT & OBJECTIVE DETAILS *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your architecture requirements, integration scope, or strategic investment inquiry..."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        outline: 'none',
                        fontSize: '0.9rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '6px' }}
                  >
                    <span>{loading ? 'Transmitting...' : (data.buttonText || 'Initiate Dialogue')}</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
