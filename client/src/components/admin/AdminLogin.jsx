import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Cpu, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLogin({ onClose, onSuccess }) {
  const { login } = useAuth();
  const { success, error } = useToast();
  const [email, setEmail] = useState('admin@stackyr.io');
  const [password, setPassword] = useState('stackyr2026!');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg('');

    try {
      await login(email, password);
      success('Authenticated into Stackyr Ecosystem Console');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setErrMsg(err.message || 'Authentication failed. Please verify credentials.');
      error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCreds = () => {
    setEmail('admin@stackyr.io');
    setPassword('stackyr2026!');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(3, 4, 6, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'linear-gradient(180deg, #10121A 0%, #08090D 100%)',
          border: '1px solid rgba(255, 107, 0, 0.35)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 107, 0, 0.15)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>
        )}

        {/* Stackyr Symbol & Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="/stackyr-icon-dark.png"
            alt="Stackyr Symbol"
            style={{
              height: '48px',
              width: 'auto',
              margin: '0 auto 16px auto',
              filter: 'drop-shadow(0 0 16px rgba(255, 107, 0, 0.4))'
            }}
          />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Console Authentication
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Stackyr Stacking Intelligence Ecosystem Core
          </p>
        </div>

        {errMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#F87171',
              fontSize: '0.84rem',
              marginBottom: '20px'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
              ADMINISTRATOR EMAIL
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stackyr.io"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
              ENCRYPTED PASSPHRASE
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', marginTop: '6px' }}
          >
            <span>{loading ? 'Verifying Key...' : 'Unlock Ecosystem Console'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick demo credentials helper */}
        <div
          style={{
            marginTop: '22px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Default Sovereign Admin Credentials:
          </div>
          <button
            type="button"
            onClick={fillDemoCreds}
            style={{
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-orange)',
              background: 'rgba(255, 107, 0, 0.08)',
              border: '1px solid rgba(255, 107, 0, 0.25)',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            admin@stackyr.io / stackyr2026!
          </button>
        </div>
      </div>
    </div>
  );
}
