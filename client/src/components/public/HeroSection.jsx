import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Sparkles, Activity, Layers, Shield, Zap,
  Cpu, Globe, Terminal
} from 'lucide-react';

export default function HeroSection({ heroData, onExploreClick, onNavigate }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const torchRef = useRef(null);

  // High-performance GPU cursor spotlight (Zero React re-renders)
  useEffect(() => {
    const handleMove = (e) => {
      if (!torchRef.current) return;
      torchRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  // Subtle synaptic dust canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, ${p.alpha})`;
        ctx.shadowColor = '#FF6B00';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Ensure Video Autoplays Muted smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [heroData?.videoUrl]);

  const hero = {
    badgeText: heroData?.badgeText || 'Autonomous Venture Ecosystem • V2.6',
    title: heroData?.title || 'STACKING',
    titleAccent: heroData?.titleAccent || 'INTELLIGENCE.',
    tagline: heroData?.tagline || 'Stackyr orchestrates a hyper-synergistic ecosystem of breakthrough AI ventures, high-velocity web infrastructure, and sovereign computing architectures.',
    ctaText: heroData?.ctaText || 'Explore Ventures & Brands',
    ctaLink: heroData?.ctaLink || '#brands',
    secondaryCtaText: heroData?.secondaryCtaText || 'Our Ethos & Story',
    secondaryCtaLink: heroData?.secondaryCtaLink || '#about',
    videoUrl: heroData?.videoUrl || '/videos/stackyr-showcase.mp4',
    stats: heroData?.stats || [
      { label: 'Ecosystem Ventures', value: '8+', detail: 'Synergistic deep-tech entities' },
      { label: 'Distributed Nodes', value: '14,280', detail: 'Global Tier-1 mesh routing' },
      { label: 'Inferences / sec', value: '850K+', detail: 'Autonomous neural throughput' },
      { label: 'SLA Fault Tolerance', value: '99.999%', detail: 'Zero-downtime architecture' }
    ]
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'clamp(116px, 18vw, 150px)',
        paddingBottom: 'clamp(48px, 7vw, 80px)',
        overflow: 'hidden',
        background: '#060608',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* 1. Cinematic Horizon Spotlight & Top Cone */}
      <div className="hero-spotlight" />

      {/* 2. Interactive Cursor Torch Follower (Zero CPU overhead) */}
      <div
        ref={torchRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          transform: 'translate3d(500px, 300px, 0) translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, rgba(245, 158, 11, 0.02) 45%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 1,
          willChange: 'transform'
        }}
      />

      {/* 3. Perspective Cyber Grid */}
      <div className="hero-cyber-grid" />

      {/* 4. Synaptic Micro-particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* 5. Glowing Horizon Light Beam */}
      <div className="hero-horizon-line" />

      {/* Main Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 clamp(14px, 3.5vw, 24px)' }}>
        {/* Top Announcement Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(20px, 4vw, 30px)', maxWidth: '100%' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '9999px',
              maxWidth: '100%',
              background: 'rgba(18, 20, 28, 0.85)',
              border: '1px solid rgba(255, 107, 0, 0.35)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 107, 0, 0.15)',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 8px #22C55E',
                  flexShrink: 0
                }}
              />
              <span
                style={{
                  fontSize: '0.66rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#FED7AA',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                STACKYR VENTURE ECOSYSTEM
              </span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: 600,
                color: 'var(--accent-orange)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Autonomous Intelligence Fabric
            </span>
          </div>
        </div>

        {/* Central Headline & Tagline */}
        <div style={{ textAlign: 'center', maxWidth: '940px', margin: '0 auto clamp(20px, 4vw, 36px) auto' }}>
          <h1
            style={{
              fontSize: 'clamp(1.9rem, 7.5vw, 5.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#FFFFFF',
              marginBottom: '14px',
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)'
            }}
          >
            STACKING <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FF851B 45%, #FF6B00 75%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                position: 'relative'
              }}
            >
              INTELLIGENCE.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.88rem, 2vw, 1.15rem)',
              color: '#94A3B8',
              lineHeight: 1.55,
              maxWidth: '680px',
              margin: '0 auto 22px auto',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
            }}
          >
            {hero.tagline}
          </p>

          {/* Action CTAs (Fluid Native Buttons on Mobile) */}
          <div
            className="hero-cta-group"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <button
              onClick={() => onNavigate ? onNavigate('brands') : onExploreClick && onExploreClick()}
              className="btn-primary"
              style={{
                padding: '13px 26px',
                fontSize: '0.94rem',
                boxShadow: '0 10px 35px rgba(255, 107, 0, 0.4), 0 0 20px rgba(255, 107, 0, 0.2)',
                cursor: 'pointer'
              }}
            >
              <span>Explore Ventures & Brands</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate ? onNavigate('about') : null}
              className="btn-secondary"
              style={{
                padding: '13px 24px',
                fontSize: '0.94rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={16} color="var(--accent-orange)" />
              <span>Our Ethos & Story</span>
            </button>
          </div>
        </div>

        {/* 6. Ultra-Modern Cinematic Showcase Video Card */}
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            position: 'relative',
            borderRadius: 'clamp(18px, 3.2vw, 26px)',
            padding: 'clamp(6px, 1.2vw, 12px)',
            background: 'linear-gradient(180deg, rgba(255, 107, 0, 0.28) 0%, rgba(255, 255, 255, 0.05) 30%, rgba(9, 11, 16, 0.98) 100%)',
            border: '1px solid rgba(255, 107, 0, 0.45)',
            boxShadow: '0 40px 120px -20px rgba(0, 0, 0, 0.98), 0 0 70px -10px rgba(255, 107, 0, 0.28), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            overflow: 'hidden',
            boxSizing: 'border-box',
            touchAction: 'pan-y'
          }}
          className="animate-float"
        >
          {/* Ambient Video Backlight Aura (Breathes gently) */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 107, 0, 0.24) 0%, rgba(245, 158, 11, 0.06) 50%, transparent 75%)',
              filter: 'blur(55px)',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'pulseGlow 4s ease-in-out infinite',
              willChange: 'transform, opacity'
            }}
          />

          {/* Ultra-Clean Cinematic Hardware Chassis */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'clamp(12px, 2.2vw, 18px)',
              overflow: 'hidden',
              background: '#040508',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.95), 0 12px 40px rgba(0, 0, 0, 0.7)',
              zIndex: 1
            }}
          >
            {/* Top Chassis Bar (Ultra-modern minimal device header) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 18px',
                background: 'rgba(12, 15, 24, 0.96)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              {/* Traffic light dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F56', opacity: 0.85, boxShadow: '0 0 6px rgba(255,95,86,0.5)' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFBD2E', opacity: 0.85, boxShadow: '0 0 6px rgba(255,189,46,0.5)' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27C93F', opacity: 0.85, boxShadow: '0 0 6px rgba(39,201,63,0.5)' }} />
              </div>

              {/* Center status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ position: 'relative', display: 'flex', width: '6px', height: '6px' }}>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22C55E', opacity: 0.75, animation: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
                </span>
                <span className="chassis-status-text" style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#CBD5E1', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  KINETIC AUTONOMOUS MESH • 4K STREAM
                </span>
              </div>

              {/* FPS Counter */}
              <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                60 FPS
              </div>
            </div>

            {/* Video Container (16:9) */}
            <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%', overflow: 'hidden' }}>
              <video
                key={hero.videoUrl}
                ref={videoRef}
                src={hero.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* 7. Floating Telemetry Dock Strip */}
        {hero.stats && hero.stats.length > 0 && (
          <div
            className="hero-stats-dock"
            style={{
              marginTop: '36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
              gap: '14px',
              padding: 'clamp(14px, 3vw, 24px)',
              borderRadius: '20px',
              background: 'rgba(12, 14, 20, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {hero.stats.map((st, idx) => (
              <div
                key={idx}
                className="hero-stat-card"
                style={{
                  borderLeft: '1px solid rgba(255, 107, 0, 0.25)',
                  paddingLeft: '14px'
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 900,
                    fontFamily: 'var(--font-mono)',
                    color: '#FFFFFF',
                    letterSpacing: '-0.03em',
                    lineHeight: 1
                  }}
                >
                  {st.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-orange)', marginTop: '4px' }}>
                  {st.label}
                </div>
                {st.detail && (
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {st.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-cta-group button {
            width: 100% !important;
            justify-content: center !important;
            padding: 14px 20px !important;
          }
          .hero-stats-dock {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            padding: 12px !important;
            margin-top: 20px !important;
          }
          .hero-stat-card {
            padding: 10px 12px !important;
            background: rgba(255, 255, 255, 0.02) !important;
            border-radius: 12px !important;
          }
          .chassis-status-text {
            font-size: 0.54rem !important;
            letter-spacing: 0.04em !important;
          }
        }
      `}</style>
    </section>
  );
}
