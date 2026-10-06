import React from 'react';
import { Cpu, ShieldCheck, Zap, Database, Terminal, Sparkles, Layers, Box, Globe, Lock } from 'lucide-react';

export default function CapabilitiesSection({ capabilitiesData, hideHeader = false }) {
  const data = capabilitiesData || {
    badge: 'Foundational Pillars',
    title: 'How We Stack Intelligence',
    subtitle: 'Modular, composable, and relentlessly optimized foundations powering each entity in our venture stack.',
    items: [
      {
        id: 'cap-1',
        title: 'Autonomous Multi-Agent Orchestration',
        description: 'Coordinated swarms of specialized cognitive agents that plan, verify, and execute multi-modal workflows across distributed telemetry.',
        metrics: 'Sub-15ms coordination latency',
        tags: ['Cognitive Mesh', 'Agent Swarms', 'Self-Healing']
      },
      {
        id: 'cap-2',
        title: 'Distributed Edge & Sovereign Infrastructure',
        description: 'Bare-metal high-density compute fabrics interconnected with zero-trust post-quantum security and low-power silicon optimization.',
        metrics: '14.2K globally distributed nodes',
        tags: ['Low-Power Silicon', 'Confidential Compute', 'Global Mesh']
      },
      {
        id: 'cap-3',
        title: 'Hyper-Velocity Web & Digital Acceleration',
        description: 'Powering platforms like WEBIND with instant compilation, zero-latency streaming pipelines, and micro-frontend federation.',
        metrics: '8.2ms worldwide average p99',
        tags: ['Edge CDN', 'WASM Runtime', 'Dynamic Bundling']
      },
      {
        id: 'cap-4',
        title: 'Exabyte-Scale Topological Vector Fabrics',
        description: 'High-density neural vector storage with mathematical similarity search designed for trillion-token context retrieval.',
        metrics: '10B+ vectors indexed concurrently',
        tags: ['Graph Search', 'HNSW Indices', 'Quantized Memory']
      },
      {
        id: 'cap-5',
        title: 'Zero-Knowledge Sovereign Defense',
        description: 'Hardware-level enclaves and verifiable zk-SNARK cryptographic guarantees for enterprise data confidentiality and compliance.',
        metrics: 'Zero-Trust hardware roots',
        tags: ['zk-ML Proofs', 'Quantum Defense', 'Audit Trails']
      },
      {
        id: 'cap-6',
        title: 'Neural Real-Time Procedural Synthesis',
        description: 'Spatial generative engines generating dynamic user interfaces, 3D assets, and procedural environments with instant tactile response.',
        metrics: '60 FPS real-time neural feed',
        tags: ['Generative UI', 'Procedural 3D', 'USDZ Pipeline']
      }
    ]
  };

  const getIcon = (idx) => {
    const icons = [Cpu, Globe, Zap, Database, ShieldCheck, Sparkles];
    const IconComp = icons[idx % icons.length];
    return <IconComp size={22} color="var(--accent-orange)" />;
  };

  return (
    <section
      id="capabilities"
      className={hideHeader ? '' : 'section-pad'}
      style={{
        position: 'relative',
        paddingTop: hideHeader ? 'clamp(16px, 3.5vw, 36px)' : undefined,
        paddingBottom: hideHeader ? 'clamp(36px, 6vw, 64px)' : undefined
      }}
    >
      <div className="container">
        {/* Header */}
        {!hideHeader && (
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
            <div className="badge-pill" style={{ margin: '0 auto 16px auto' }}>
              <Cpu size={13} />
              <span>{data.badge || 'FOUNDATIONAL CAPABILITIES'}</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Architecture of <span className="text-gradient">Collective Power</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {data.subtitle}
            </p>
          </div>
        )}

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(16px, 3vw, 24px)'
          }}
        >
          {data.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="glass-card"
              style={{
                padding: 'clamp(18px, 3.5vw, 30px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div>
                {/* Icon & Index */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(255, 107, 0, 0.1)',
                      border: '1px solid rgba(255, 107, 0, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(idx)}
                  </div>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    0{idx + 1} // ARCH
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {item.description}
                </p>
              </div>

              <div>
                {/* Metric pill */}
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-orange)',
                    fontWeight: 600,
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-orange)' }} />
                  {item.metrics}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.tags?.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
