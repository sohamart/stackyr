import React, { useState, useEffect } from 'react';
import { Mail, Clock, Building, MessageSquare, RefreshCw, UserCheck } from 'lucide-react';
import { fetchInquiries } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error } = useToast();

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetchInquiries();
      if (res.success) {
        setInquiries(res.data || []);
      }
    } catch (err) {
      error(err.message || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Venture Dialogue & Inquiries
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Transmissions submitted by institutional partners, founders, and enterprises from the public website.
          </p>
        </div>

        <button
          onClick={loadInquiries}
          className="btn-secondary"
          style={{ gap: '6px' }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            borderRadius: '18px',
            background: 'rgba(15, 17, 24, 0.6)',
            border: '1px dashed rgba(255, 255, 255, 0.1)'
          }}
        >
          <Mail size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '6px' }}>
            No incoming transmissions yet
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            When users submit the Partner Dialogue form on the public site, inquiries will display here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {inquiries.map((inq) => (
            <div
              key={inq.id || inq._id}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(255, 107, 0, 0.12)',
                      border: '1px solid rgba(255, 107, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Mail size={16} color="var(--accent-orange)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>
                      {inq.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {inq.email} • {inq.company || 'Enterprise'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 107, 0, 0.1)',
                      color: 'var(--accent-orange)',
                      border: '1px solid rgba(255, 107, 0, 0.25)'
                    }}
                  >
                    {inq.brandInterest}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.9rem',
                  color: '#CBD5E1',
                  lineHeight: 1.6
                }}
              >
                {inq.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
