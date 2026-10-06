import React, { useState, useEffect, useRef } from 'react';
import { Home, Layers, Terminal, Sparkles, Send } from 'lucide-react';

export default function MobileAppDock({ currentView = 'home', onNavigate }) {
  const [dropletPos, setDropletPos] = useState({ left: 0, width: 0, opacity: 0 });
  const [ripples, setRipples] = useState([]);
  const dockRef = useRef(null);
  const tabRefs = useRef({});

  // 5 Clean Tabs: Home prominent in the center, zero badges
  const tabs = [
    { label: 'Ventures', id: 'brands', icon: Layers },
    { label: 'Community', id: 'community', icon: Terminal },
    { label: 'Home', id: 'home', icon: Home, isCenter: true },
    { label: 'About', id: 'about', icon: Sparkles },
    { label: 'Contact', id: 'contact', icon: Send }
  ];

  // Update sliding water droplet position (only for standard items)
  const updateDroplet = (id) => {
    const targetId = (id === 'stackadda') ? 'community' : (id || 'home');
    const dock = dockRef.current;
    const tabEl = tabRefs.current[targetId];
    if (!dock || !tabEl) return;

    const dockRect = dock.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();
    const extraPad = 6;

    setDropletPos({
      left: tabRect.left - dockRect.left - (extraPad / 2),
      width: tabRect.width + extraPad,
      opacity: targetId === 'home' ? 0 : 1
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateDroplet(currentView);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentView]);

  useEffect(() => {
    const handleResize = () => updateDroplet(currentView);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView]);

  // Liquid Water Ripple Animation on Tap
  const handleTabClick = (tabId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now() + Math.random(),
      tabId,
      x,
      y
    };

    setRipples((prev) => [...prev.slice(-3), newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onNavigate) {
      onNavigate(tabId);
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="mobile-app-dock-wrapper"
      style={{
        position: 'fixed',
        bottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
        left: 0,
        right: 0,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none'
      }}
    >
      <nav
        ref={dockRef}
        className="mobile-app-dock"
        aria-label="Mobile App Navigation Dock"
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4px',
          padding: '5px 8px',
          borderRadius: '9999px',
          background: 'rgba(9, 11, 18, 0.92)',
          backdropFilter: 'blur(30px) saturate(210%)',
          WebkitBackdropFilter: 'blur(30px) saturate(210%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.95), 0 0 30px -5px rgba(255, 107, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
          maxWidth: 'min(396px, calc(100vw - 20px))',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Specular Liquid Water Surface Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20px',
            right: '20px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45) 50%, transparent)',
            pointerEvents: 'none'
          }}
        />

        {/* Dynamic Sliding Liquid Water Droplet Capsule (for non-center tabs) */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            bottom: '4px',
            left: `${dropletPos.left}px`,
            width: `${dropletPos.width}px`,
            borderRadius: '16px',
            background: 'linear-gradient(180deg, rgba(255, 107, 0, 0.32) 0%, rgba(245, 158, 11, 0.12) 100%)',
            border: '1px solid rgba(255, 107, 0, 0.55)',
            boxShadow: '0 0 20px rgba(255, 107, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
            opacity: dropletPos.opacity,
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {/* Internal Liquid Light Core */}
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '18px',
              height: '3px',
              borderRadius: '9999px',
              background: '#FFFFFF',
              boxShadow: '0 0 8px #FFFFFF, 0 0 14px var(--accent-orange)',
              opacity: 0.8
            }}
          />
        </div>

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id || (tab.id === 'community' && currentView === 'stackadda');
          const isCenter = tab.isCenter;

          if (isCenter) {
            return (
              <div
                key={tab.id}
                ref={(el) => (tabRefs.current[tab.id] = el)}
                style={{
                  position: 'relative',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 6px'
                }}
              >
                <button
                  onClick={(e) => handleTabClick(tab.id, e)}
                  aria-label="Home"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: isActive
                      ? 'linear-gradient(135deg, #FF6B00 0%, #FF851B 60%, #F59E0B 100%)'
                      : 'linear-gradient(135deg, rgba(255, 107, 0, 0.22) 0%, rgba(20, 24, 36, 0.95) 100%)',
                    border: `1.5px solid ${isActive ? '#FFFFFF' : 'rgba(255, 107, 0, 0.65)'}`,
                    boxShadow: isActive
                      ? '0 0 25px rgba(255, 107, 0, 0.85), 0 4px 15px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
                      : '0 0 14px rgba(255, 107, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    touchAction: 'manipulation',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Subtle pulsing liquid aura */}
                  <span
                    style={{
                      position: 'absolute',
                      inset: '-4px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 107, 0, 0.35) 0%, transparent 70%)',
                      animation: 'pulseGlow 2.5s ease-in-out infinite',
                      pointerEvents: 'none'
                    }}
                  />
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.6 : 2.2}
                    color="#FFFFFF"
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))'
                    }}
                  />

                  {/* Center Ripple Waves */}
                  {ripples.filter((r) => r.tabId === tab.id).map((r) => (
                    <span
                      key={r.id}
                      style={{
                        position: 'absolute',
                        left: r.x,
                        top: r.y,
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255, 107, 0, 0.8) 60%, transparent 100%)',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                        animation: 'waterRippleEffect 0.55s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                        zIndex: 4
                      }}
                    />
                  ))}
                </button>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              onClick={(e) => handleTabClick(tab.id, e)}
              aria-label={tab.label}
              style={{
                position: 'relative',
                zIndex: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                background: 'transparent',
                border: 'none',
                padding: '5px 2px',
                borderRadius: '16px',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                transition: 'color 0.25s ease',
                cursor: 'pointer',
                touchAction: 'manipulation',
                overflow: 'visible'
              }}
            >
              {/* Icon Container (Zero Badges) */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  color={isActive ? '#FFFFFF' : '#94A3B8'}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.7))' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>

              {/* Tab Label */}
              <span
                style={{
                  fontSize: tab.id === 'community' ? '0.57rem' : '0.62rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: tab.id === 'community' ? '-0.025em' : '0em',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  textAlign: 'center'
                }}
              >
                {tab.label}
              </span>

              {/* Water Droplet Tap Ripple Waves */}
              {ripples.filter((r) => r.tabId === tab.id).map((r) => (
                <span
                  key={r.id}
                  style={{
                    position: 'absolute',
                    left: r.x,
                    top: r.y,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 107, 0, 0.6) 60%, transparent 100%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    animation: 'waterRippleEffect 0.55s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                    zIndex: 3
                  }}
                />
              ))}
            </button>
          );
        })}
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .mobile-app-dock-wrapper {
            display: none !important;
          }
        }
        @keyframes waterRippleEffect {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(12);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
