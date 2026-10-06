import React from 'react';
import { Star, CheckCircle2, Sparkles } from 'lucide-react';

export default function ReviewsSection() {
  const reviewsRow1 = [
    {
      id: 1,
      name: 'Dr. Aris Thorne',
      role: 'Principal Architect',
      organization: 'Cognitive Dynamics',
      location: 'San Francisco, CA',
      avatar: 'AT',
      metric: '8.2ms Global P99',
      headline: 'Layers decentralized compute and WASM seamlessly',
      text: 'By running Webind edge runtimes alongside cryptographic zero-trust enclaves, we hit sub-10ms inference latencies worldwide without touching legacy cloud clusters.'
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: 'CTO & Co-Founder',
      organization: 'HyperScale AI',
      location: 'Zurich, CH',
      avatar: 'ER',
      metric: '99.999% SLA Uptime',
      headline: 'Autonomous orchestration that compounds scale',
      text: 'Every venture layer feeds telemetry into the next. Stackyr Community has also become our core recruitment hub for world-class systems engineers.'
    },
    {
      id: 3,
      name: 'Devanagari V.',
      role: 'Head of Infra',
      organization: 'Vortex Protocol',
      location: 'Singapore',
      avatar: 'DV',
      metric: '14.2K+ Edge Nodes',
      headline: 'Sub-watt silicon cut power draw by 62%',
      text: 'Switching vector workloads to Aura Cloud hardware boosted throughput to 100k req/s. The architectural synergy is unlike anything in tech today.'
    },
    {
      id: 4,
      name: 'Marcus Vance',
      role: 'CISO',
      organization: 'ZeroKey Enclaves',
      location: 'London, UK',
      avatar: 'MV',
      metric: 'SOC-2 Type II',
      headline: 'Bank-grade zero-trust confidential compute',
      text: 'Cybermesh zk-ML integration guarantees mathematical proof of execution without exposing client training data to untrusted hosts.'
    }
  ];

  const reviewsRow2 = [
    {
      id: 5,
      name: 'Siddharth Sen',
      role: 'Lead AI Engineer',
      organization: 'Synapse Swarm',
      location: 'Bengaluru, IN',
      avatar: 'SS',
      metric: '10B+ Vectors',
      headline: 'Stackyr Community collective + Webind edge is unmatched',
      text: 'Deploying autonomous swarms through Kronix AI on the Stackyr mesh was instantaneous. The developer experience is remarkably polished.'
    },
    {
      id: 6,
      name: 'Chloe Takahashi',
      role: 'VP Engineering',
      organization: 'Aetheris Aerospace',
      location: 'Tokyo, JP',
      avatar: 'CT',
      metric: '0.8W / TOPS',
      headline: 'Masterclass in hardware & software co-design',
      text: 'Edge avionics telemetry requires deterministic execution. Bare-metal silicon co-processors delivered rock-solid stability during orbital simulation bursts.'
    },
    {
      id: 7,
      name: 'Liam Sterling',
      role: 'Director of Cloud',
      organization: 'Apex Labs',
      location: 'Austin, TX',
      avatar: 'LS',
      metric: '100k req/s Mesh',
      headline: 'Instant multi-cloud sync without lock-in',
      text: 'Migrated critical inferencing pipelines over a weekend. Latency drops were immediate with zero packet drops during peak traffic launch.'
    },
    {
      id: 8,
      name: 'Amara Chen',
      role: 'Chief Data Scientist',
      organization: 'NeuralForge',
      location: 'Berlin, DE',
      avatar: 'AC',
      metric: '340ms ZK Proofs',
      headline: 'Unparalleled cryptographic privacy for medical AI',
      text: 'With Cybermesh zero-knowledge verifications, institutional healthcare partners train cross-border diagnostic models with absolute HIPAA assurance.'
    }
  ];

  // Duplicate each row for seamless 0 to -50% CSS looping
  const duplicatedRow1 = [...reviewsRow1, ...reviewsRow1];
  const duplicatedRow2 = [...reviewsRow2, ...reviewsRow2];

  const renderCard = (review, idx) => (
    <div
      key={`${review.id}-${idx}`}
      className="review-compact-card"
      style={{
        width: 'clamp(250px, 22vw, 310px)',
        flexShrink: 0,
        margin: '0 6px',
        padding: '16px 18px',
        borderRadius: '16px',
        background: 'rgba(12, 14, 22, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 24px -5px rgba(0, 0, 0, 0.65)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, background 0.2s ease'
      }}
    >
      <div>
        {/* Card Header: Rating Stars & Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#FF6B00" color="#FF6B00" />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span
              style={{
                fontSize: '0.58rem',
                fontFamily: 'var(--font-mono)',
                color: '#22C55E',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                padding: '1px 6px',
                borderRadius: '9999px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <CheckCircle2 size={9} />
              VERIFIED
            </span>
          </div>
        </div>

        {/* Metric Pill */}
        <div style={{ marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-orange)',
              background: 'rgba(255, 107, 0, 0.12)',
              border: '1px solid rgba(255, 107, 0, 0.25)',
              padding: '2px 7px',
              borderRadius: '9999px',
              fontWeight: 700
            }}
          >
            {review.metric}
          </span>
        </div>

        {/* Compact Review Headline */}
        <h4
          style={{
            fontSize: '0.86rem',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.3,
            marginBottom: '6px',
            letterSpacing: '-0.01em'
          }}
        >
          "{review.headline}"
        </h4>

        {/* Compact Review Body */}
        <p
          style={{
            fontSize: '0.76rem',
            color: '#94A3B8',
            lineHeight: 1.5,
            marginBottom: '12px'
          }}
        >
          {review.text}
        </p>
      </div>

      {/* Reviewer Profile Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.25) 0%, rgba(245, 158, 11, 0.08) 100%)',
            border: '1px solid rgba(255, 107, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-orange)',
            flexShrink: 0
          }}
        >
          {review.avatar}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontSize: '0.66rem',
              color: '#64748B',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {review.role} • <span style={{ color: '#94A3B8' }}>{review.organization}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="reviews"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(6, 6, 8, 0.98) 0%, rgba(10, 12, 18, 0.75) 50%, rgba(6, 6, 8, 1) 100%)',
        overflow: 'hidden',
        paddingTop: 'clamp(36px, 5vw, 56px)',
        paddingBottom: 'clamp(44px, 6vw, 64px)'
      }}
    >
      {/* Ambient Radial Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.08) 0%, rgba(245, 158, 11, 0.01) 50%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      {/* Compact Section Header */}
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '28px', padding: '0 16px' }}>
        <div className="badge-pill" style={{ margin: '0 auto 12px auto', display: 'inline-flex', padding: '4px 12px', fontSize: '0.68rem' }}>
          <Sparkles size={11} />
          <span>ENTERPRISE & DEVELOPER FEEDBACK</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            marginBottom: '8px',
            lineHeight: 1.2
          }}
        >
          Validated by Systems Architects & <span className="text-gradient">Founders.</span>
        </h2>

        <p
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            fontSize: 'clamp(0.82rem, 1.4vw, 0.94rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.5
          }}
        >
          Real-world telemetry and verified architectural feedback across 14,000+ deployments.
        </p>

        {/* Compact Star Rating Overview Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginTop: '14px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="#FF6B00" color="#FF6B00" />
            ))}
          </div>
          <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFFFFF' }}>
            4.98 / 5.0
          </span>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
            Across 14,000+ Global Nodes
          </span>
        </div>
      </div>

      {/* Two Opposite-Moving Animated Marquee Rows Container */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {/* Left Gradient Fade Mask (Fluid on mobile) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 'clamp(30px, 10vw, 140px)',
            background: 'linear-gradient(90deg, #060608 0%, rgba(6, 6, 8, 0.85) 40%, rgba(6, 6, 8, 0) 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        {/* Right Gradient Fade Mask (Fluid on mobile) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 'clamp(30px, 10vw, 140px)',
            background: 'linear-gradient(270deg, #060608 0%, rgba(6, 6, 8, 0.85) 40%, rgba(6, 6, 8, 0) 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        {/* Row 1: Moves Left (Right to Left) - Continuous, Never pauses */}
        <div style={{ marginBottom: '10px' }}>
          <div className="reviews-marquee-left">
            {duplicatedRow1.map((rev, idx) => renderCard(rev, idx))}
          </div>
        </div>

        {/* Row 2: Moves Right (Left to Right) - Opposite Direction, Continuous, Never pauses */}
        <div>
          <div className="reviews-marquee-right">
            {duplicatedRow2.map((rev, idx) => renderCard(rev, idx))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollReviewsLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollReviewsRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Continuous Smooth Motion - NEVER STOPS ON HOVER */
        .reviews-marquee-left {
          display: flex;
          width: max-content;
          animation: scrollReviewsLeft 34s linear infinite;
          will-change: transform;
        }

        .reviews-marquee-right {
          display: flex;
          width: max-content;
          animation: scrollReviewsRight 34s linear infinite;
          will-change: transform;
        }

        .review-compact-card:hover {
          border-color: rgba(255, 107, 0, 0.35) !important;
          background: rgba(16, 20, 32, 0.88) !important;
        }

        @media (max-width: 640px) {
          .review-compact-card {
            width: 250px !important;
            padding: 13px 14px !important;
          }
          .reviews-marquee-left {
            animation-duration: 26s !important;
          }
          .reviews-marquee-right {
            animation-duration: 26s !important;
          }
        }
      `}</style>
    </section>
  );
}
