import React, { useState, useEffect, useRef } from 'react';
import { Layers, Sparkles, Menu, X, ArrowUpRight, Cpu, Home, Send, Shield, Zap, ChevronRight, Terminal, Award, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ currentView = 'home', onNavigate, onOpenAdmin, siteContent, brandCount = 8 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropletStyle, setDropletStyle] = useState({ left: 0, top: 4, width: 0, height: 36, opacity: 0, isHover: false });
  const [activeHoverId, setActiveHoverId] = useState(null);
  const [ripples, setRipples] = useState([]);
  
  const navContainerRef = useRef(null);
  const itemRefs = useRef({});
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret keyboard shortcut (Ctrl + Shift + A / Cmd + Shift + A) for admin access
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        onOpenAdmin && onOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAdmin]);

  const navLinks = [
    { label: 'Home', id: 'home', icon: Home },
    { label: 'Ventures', id: 'brands', icon: Layers },
    { label: 'Stackyr Community', id: 'community', icon: Terminal },
    { label: 'Capabilities', id: 'capabilities', icon: Cpu },
    { label: 'Reviews', id: 'reviews', icon: Award },
    { label: 'About Us', id: 'about', icon: Sparkles },
    { label: 'Contact', id: 'contact', icon: Send }
  ];

  // Dynamic Liquid Water Droplet Tracker
  const updateDroplet = (id, isHover = false) => {
    const targetEl = itemRefs.current[id];
    const container = navContainerRef.current;
    if (!targetEl || !container) return;

    const navRect = container.getBoundingClientRect();
    const elRect = targetEl.getBoundingClientRect();

    setDropletStyle({
      left: elRect.left - navRect.left,
      top: elRect.top - navRect.top,
      width: elRect.width,
      height: elRect.height,
      opacity: 1,
      isHover
    });
  };

  // Sync droplet with active menu item
  useEffect(() => {
    const isReviews = window.location.hash.includes('reviews');
    const effectiveView = isReviews ? 'reviews' : (currentView || 'home');
    const targetId = activeHoverId || effectiveView;
    const timer = setTimeout(() => {
      updateDroplet(targetId, Boolean(activeHoverId));
    }, 40);
    return () => clearTimeout(timer);
  }, [currentView, activeHoverId]);

  // Recalculate on screen resize
  useEffect(() => {
    const handleResize = () => {
      const isReviews = window.location.hash.includes('reviews');
      const effectiveView = isReviews ? 'reviews' : (currentView || 'home');
      const targetId = activeHoverId || effectiveView;
      updateDroplet(targetId, false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView, activeHoverId]);

  const handleMouseEnter = (id) => {
    setActiveHoverId(id);
    updateDroplet(id, true);
  };

  const handleMouseLeave = () => {
    setActiveHoverId(null);
    const isReviews = window.location.hash.includes('reviews');
    const effectiveView = isReviews ? 'reviews' : (currentView || 'home');
    updateDroplet(effectiveView, false);
  };

  const triggerWaterRipple = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y, buttonId: id };
    setRipples((prev) => [...prev.slice(-3), newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleLinkClick = (id, e) => {
    if (e) triggerWaterRipple(e, id);
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(id);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '12px',
        left: 0,
        right: 0,
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 clamp(8px, 2.5vw, 24px)',
        pointerEvents: 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Floating Rounded Glass Dock Pill */}
      <div
        className="navbar-glass-dock"
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 'min(1360px, calc(100vw - 16px))',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: scrolled ? '7px 18px' : '9px 22px',
          borderRadius: '9999px',
          background: scrolled
            ? 'rgba(7, 9, 15, 0.88)'
            : 'rgba(10, 12, 18, 0.72)',
          backdropFilter: 'blur(30px) saturate(210%)',
          WebkitBackdropFilter: 'blur(30px) saturate(210%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled
            ? '0 25px 60px -10px rgba(0, 0, 0, 0.95), 0 0 35px -5px rgba(255, 107, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.25)'
            : '0 16px 45px -10px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(255, 107, 0, 0.12), inset 0 1px 1.5px rgba(255, 255, 255, 0.18)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >
        {/* Left: Parent Ecosystem Logo with Ambient Aura */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.22) 0%, rgba(245, 158, 11, 0.06) 100%)',
              border: '1px solid rgba(255, 107, 0, 0.45)',
              boxShadow: '0 0 25px rgba(255, 107, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
            }}
          >
            <img
              src="/stackyr-icon-dark.png"
              alt="Stackyr Symbol"
              style={{
                height: '20px',
                width: 'auto'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.12rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                lineHeight: 1
              }}
            >
              STACKYR
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.56rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-orange)',
                fontWeight: 700,
                marginTop: '3px'
              }}
            >
              STACKING INTELLIGENCE
            </span>
          </div>
        </a>

        {/* Center: Desktop Liquid Glass Floating Capsule with Elastic Liquid Droplet */}
        <nav
          ref={navContainerRef}
          onMouseLeave={handleMouseLeave}
          style={{
            display: 'none',
            alignItems: 'center',
            position: 'relative',
            background: 'rgba(14, 17, 26, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '3px 5px',
            borderRadius: '9999px',
            backdropFilter: 'blur(24px) saturate(180%)',
            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.5)'
          }}
          className="desktop-nav"
        >
          {/* Organic Liquid Water Droplet Capsule */}
          <div
            style={{
              position: 'absolute',
              left: `${dropletStyle.left}px`,
              top: `${dropletStyle.top}px`,
              width: `${dropletStyle.width}px`,
              height: `${dropletStyle.height}px`,
              borderRadius: '9999px',
              background: 'radial-gradient(ellipse at 40% 30%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 107, 0, 0.35) 45%, rgba(245, 158, 11, 0.18) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              boxShadow: '0 8px 24px -2px rgba(255, 107, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.75), inset 0 -2px 4px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(16px)',
              pointerEvents: 'none',
              opacity: dropletStyle.opacity,
              transition: 'left 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.2s ease, opacity 0.22s ease',
              zIndex: 1,
              animation: dropletStyle.isHover ? 'liquidSquish 0.35s ease-out' : 'dropletFloat 3s ease-in-out infinite'
            }}
          >
            {/* Water Drop Specular Highlight Bead (Gleams like real liquid water) */}
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: '12px',
                width: '16px',
                height: '4px',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.15) 100%)',
                filter: 'blur(0.4px)'
              }}
            />

            {/* Micro water droplet reflection dot */}
            <div
              style={{
                position: 'absolute',
                top: '5px',
                right: '14px',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 0 4px #FFFFFF'
              }}
            />

            {/* Internal Liquid Core Glow */}
            <div
              style={{
                position: 'absolute',
                bottom: '1px',
                left: '20%',
                right: '20%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #FF6B00 50%, transparent)',
                boxShadow: '0 0 10px #FF6B00',
                borderRadius: '9999px'
              }}
            />
          </div>

          {navLinks.map((link) => {
            const isReviewsHash = typeof window !== 'undefined' && window.location.hash.includes('reviews');
            const isCommunity = (link.id === 'community' && (currentView === 'community' || currentView === 'stackadda'));
            const isSelected = ((currentView === link.id || isCommunity) && !isReviewsHash) || (link.id === 'reviews' && isReviewsHash);
            const isHovered = activeHoverId === link.id;
            const isHighlighted = isHovered || (!activeHoverId && isSelected);

            return (
              <button
                key={link.id}
                ref={(el) => (itemRefs.current[link.id] = el)}
                onClick={(e) => handleLinkClick(link.id, e)}
                onMouseEnter={() => handleMouseEnter(link.id)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 13px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: isHighlighted ? 700 : 500,
                  color: isHighlighted ? '#FFFFFF' : '#94A3B8',
                  background: 'transparent',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >
                {/* Active Water Dot */}
                {isSelected && (
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent-orange)',
                      boxShadow: '0 0 8px var(--accent-orange)'
                    }}
                  />
                )}

                <span>{link.label}</span>

                {link.badge && (
                  <span
                    style={{
                      fontSize: '0.58rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '1px 5px',
                      borderRadius: '9999px',
                      background: isHighlighted ? 'rgba(255, 107, 0, 0.35)' : 'rgba(255, 107, 0, 0.18)',
                      color: isHighlighted ? '#FFFFFF' : 'var(--accent-orange)',
                      border: '1px solid rgba(255, 107, 0, 0.3)',
                      fontWeight: 700,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {link.badge}
                  </span>
                )}

                {/* Click Water Ripple Waves */}
                {ripples.filter((r) => r.buttonId === link.id).map((r) => (
                  <span
                    key={r.id}
                    style={{
                      position: 'absolute',
                      left: r.x,
                      top: r.y,
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 107, 0, 0.5) 60%, transparent 100%)',
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

        {/* Right Action: Network Health Radar Pill + Direct Action CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 13px',
              borderRadius: '9999px',
              background: 'rgba(12, 14, 22, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)'
            }}
            id="ecosystem-counter-badge"
          >
            <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#22C55E',
                  opacity: 0.75,
                  animation: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 8px #22C55E'
                }}
              />
            </span>
            <span style={{ color: '#E2E8F0', letterSpacing: '0.04em' }}>
              CORE ONLINE
            </span>
          </div>

          {/* Quick Contact CTA */}
          <button
            type="button"
            onClick={(e) => handleLinkClick('contact', e)}
            className="desktop-nav"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 15px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.25) 0%, rgba(245, 158, 11, 0.12) 100%)',
              border: '1px solid rgba(255, 107, 0, 0.45)',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 107, 0, 0.2)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Get in Touch</span>
            <ChevronRight size={13} color="var(--accent-orange)" />
          </button>

          {/* PC / Desktop Admin Login Button */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="desktop-nav"
            title={isAuthenticated ? 'Open Sovereign Admin Console' : 'Administrator Portal Login'}
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              background: isAuthenticated
                ? 'rgba(34, 197, 94, 0.12)'
                : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isAuthenticated ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.14)'}`,
              color: isAuthenticated ? '#4ADE80' : '#E2E8F0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-orange)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.background = 'rgba(255, 107, 0, 0.18)';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 107, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isAuthenticated ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.14)';
              e.currentTarget.style.color = isAuthenticated ? '#4ADE80' : '#E2E8F0';
              e.currentTarget.style.background = isAuthenticated ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isAuthenticated ? (
              <>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
                <span>Console Active</span>
              </>
            ) : (
              <>
                <Lock size={12} color="var(--accent-orange)" />
                <span>Admin Login</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              color: '#FFFFFF',
              borderRadius: '9999px',
              background: mobileMenuOpen ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${mobileMenuOpen ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.12)'}`,
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>

        {/* Modern Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              right: 0,
              background: 'rgba(10, 12, 18, 0.95)',
              backdropFilter: 'blur(36px) saturate(220%)',
              WebkitBackdropFilter: 'blur(36px) saturate(220%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 107, 0, 0.18)',
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 100
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                marginBottom: '4px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                STACKYR CONSTELLATION DIRECTORY
              </span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#22C55E' }}>
                ● {brandCount} VENTURES LIVE
              </span>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: isActive ? 'rgba(255, 107, 0, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isActive ? 'rgba(255, 107, 0, 0.35)' : 'rgba(255, 255, 255, 0.05)'}`,
                    color: isActive ? '#FFFFFF' : '#CBD5E1',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isActive ? 'rgba(255, 107, 0, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? 'var(--accent-orange)' : 'var(--text-secondary)'
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span style={{ fontSize: '0.96rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                      {link.label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {link.badge && (
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          background: 'rgba(255, 107, 0, 0.2)',
                          color: 'var(--accent-orange)'
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                </button>
              );
            })}

            {/* Quick Admin Access inside Mobile Drawer */}
            <div style={{ paddingTop: '10px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin && onOpenAdmin();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 107, 0, 0.08)',
                  border: '1px dashed rgba(255, 107, 0, 0.35)',
                  color: 'var(--accent-orange)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={15} />
                  <span>Admin Console Login</span>
                </div>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes liquidSquish {
          0% { transform: scale(1, 1); }
          30% { transform: scale(1.12, 0.88); }
          60% { transform: scale(0.95, 1.05); }
          100% { transform: scale(1, 1); }
        }

        @keyframes dropletFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1.5px);
          }
        }

        @keyframes waterRippleEffect {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          #ecosystem-counter-badge { display: inline-flex !important; }
        }
        @media (max-width: 899px) {
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
