import React from 'react';
import { Layers, ShieldCheck, Zap, Sparkles, Target, Compass, Award } from 'lucide-react';

export default function StoryVisionSection({ storyData, hideHeader = false }) {
  const data = storyData || {
    badge: 'The Stackyr Ethos & Genesis',
    title: 'Why We Stack Intelligence',
    paragraphs: [
      'In an era where isolated technology silos create computational friction, Stackyr was forged with a unified premise: intelligence compounds exponentially when layered synergistically.',
      'Rather than operating disconnected startups, we build and orchestrate an interconnected constellation of specialized ventures — each mastering an essential technological layer: from low-level silicon acceleration to autonomous agent orchestration and high-performance digital ecosystems like WEBIND.',
      'Every brand in the Stackyr ecosystem feeds telemetry, algorithmic breakthroughs, and infrastructure into every other. When one venture scales, the entire collective intelligence ascends.'
    ],
    mission: 'To orchestrate, incubate, and scale synergistic deep-tech brands that collectively solve humanity’s high-computation frontiers.',
    vision: 'An interconnected hyper-intelligence fabric where every stacked node amplifies all others.',
    pillars: [
      {
        title: 'Synergistic Compounding',
        desc: 'Each venture enhances the capabilities, throughput, and technological edge of every other entity.',
        icon: 'Layers'
      },
      {
        title: 'Uncompromising Velocity',
        desc: 'We eliminate bureaucratic drag, building production-grade deep-tech at an unprecedented speed of iteration.',
        icon: 'Zap'
      },
      {
        title: 'Sovereign Engineering',
        desc: 'Foundational control over compute, cryptographic layers, and algorithmic architectures.',
        icon: 'Shield'
      }
    ]
  };

  const getPillarIcon = (name) => {
    if (name === 'Zap') return <Zap size={22} color="#FF6B00" />;
    if (name === 'Shield') return <ShieldCheck size={22} color="#F59E0B" />;
    return <Layers size={22} color="#FF8A00" />;
  };

  return (
    <section
      id="story"
      className={hideHeader ? '' : 'section-pad'}
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: hideHeader ? 'clamp(16px, 3.5vw, 36px)' : undefined,
        paddingBottom: hideHeader ? 'clamp(36px, 6vw, 64px)' : undefined
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(28px, 5vw, 60px)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: The Narrative */}
          <div>
            {!hideHeader && (
              <>
                <div className="badge-pill" style={{ marginBottom: '20px' }}>
                  <Sparkles size={13} />
                  <span>{data.badge || 'THE STACKYR ETHOS'}</span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    marginBottom: '28px'
                  }}
                >
                  {data.title || 'Why We Stack Intelligence'}
                </h2>
              </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
              {data.paragraphs?.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: '1.05rem',
                    color: '#CBD5E1',
                    lineHeight: 1.7
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Mission & Vision Callout Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
              <div
                style={{
                  padding: 'clamp(16px, 3.5vw, 20px)',
                  borderRadius: '16px',
                  background: 'rgba(255, 107, 0, 0.06)',
                  border: '1px solid rgba(255, 107, 0, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-orange)', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Target size={16} /> MISSION
                </div>
                <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                  {data.mission}
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(245, 158, 11, 0.06)',
                  border: '1px solid rgba(245, 158, 11, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Compass size={16} /> VISION
                </div>
                <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                  {data.vision}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars with Glowing Connections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.pillars?.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '30px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px'
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getPillarIcon(pillar.icon)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>
                      PILLAR 0{idx + 1}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
