import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const value = {
    toast: {
      success: (msg) => addToast(msg, 'success'),
      error: (msg) => addToast(msg, 'error'),
      info: (msg) => addToast(msg, 'info')
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '420px',
        pointerEvents: 'none'
      }}>
        {toasts.map(t => (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'rgba(15, 17, 24, 0.95)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${
                t.type === 'success' ? 'rgba(34, 197, 94, 0.4)' :
                t.type === 'error' ? 'rgba(239, 68, 68, 0.4)' :
                'rgba(255, 107, 0, 0.4)'
              }`,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
              color: '#F8FAFC',
              fontSize: '0.9rem',
              animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {t.type === 'success' && <CheckCircle2 size={18} color="#22C55E" />}
            {t.type === 'error' && <AlertCircle size={18} color="#EF4444" />}
            {t.type === 'info' && <Info size={18} color="#FF6B00" />}
            <span style={{ flex: 1, lineHeight: 1.4 }}>{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              style={{ color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context.toast;
}
