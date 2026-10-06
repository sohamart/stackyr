import React, { useState } from 'react';
import { Sparkles, Globe, Cpu, Zap, Shield, ArrowUpRight, Terminal, CheckCircle2, Play } from 'lucide-react';

export default function WebindSection({ webindData }) {
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'code' | 'benchmark'

  const data = webindData || {
    badge: 'Flagship Platform',
    title: 'WEBIND by Stackyr',
    tagline: 'Next-Generation Autonomous Web Infrastructure & Digital Acceleration',
    description: 'WEBIND unifies hyper-scalable cloud edge computing, multi-agent AI web orchestration, and sub-millisecond dynamic asset compilation into a single, bulletproof developer stack.',
    liveUrl: 'https://webind.stackyr.io',
    highlights: [
      { title: 'Autonomous Edge Meshing', desc: 'Intelligently routes traffic across global Tier-1 backbones with sub-10ms delivery everywhere.', metric: '8.2ms p99' },
      { title: 'Dynamic AI Pipeline', desc: 'Compiles, optimizes, and transforms web assets in real-time through on-the-fly generative neural workers.', metric: '4.8x Speed' },
      { title: 'Zero-Trust Sovereign Security', desc: 'Integrated post-quantum cryptographic enclaves protecting payloads and API handshakes.', metric: '100% Secure' },
      { title: 'Infinite Composable Scaling', desc: 'Elastic auto-sharding clusters that scale from zero to millions of concurrent requests seamlessly.', metric: '99.999% SLA' }
    ],
    techStack: ['Edge Rust V8', 'WASM Mesh', 'Multi-Agent Orchestrator', 'Distributed Redis', 'Post-Quantum TLS', 'eBPF Routing']
  };

  return (
    <section id="webind" className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background illumination */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%) translateZ(0)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.1) 0%, rgba(245, 158, 11, 0.02) 60%, transparent 75%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          backfaceVisibility: 'hidden'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Banner badge & heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px auto' }}>
          <div
            className="badge-pill"
            style={{
              margin: '0 auto 16px auto',
              background: 'rgba(255, 107, 0, 0.12)',
              border: '1px solid rgba(255, 107, 0, 0.4)',
              color: '#FF8A00'
            }}
          >
            <Sparkles size={13} />
            <span>VENTURE SPOTLIGHT • BRAND UNDER STACKYR</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '18px',
              color: '#FFFFFF'
            }}
          >
            WEBIND <span className="text-gradient">by Stackyr</span>
          </h2>

          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--accent-orange)',
              fontWeight: 500,
              marginBottom: '16px'
            }}
          >
            {data.tagline || 'Autonomous Web Infrastructure & Digital Acceleration'}
          </p>

          <p
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Bento Grid Layout: Flagship Visual + Live Feature Nodes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(20px, 3vw, 28px)',
            alignItems: 'stretch',
            marginBottom: '48px'
          }}
        >
          {/* Interactive Topology Display Card */}
          <div
            style={{
              gridColumn: 'span 1',
              borderRadius: 'clamp(18px, 3.5vw, 24px)',
              background: 'linear-gradient(180deg, rgba(17, 19, 27, 0.9) 0%, rgba(9, 10, 14, 0.98) 100%)',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 107, 0, 0.15)',
              padding: 'clamp(16px, 3.5vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Tab switchers */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveTab('architecture')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: activeTab === 'architecture' ? 'rgba(255, 107, 0, 0.2)' : 'transparent',
                      color: activeTab === 'architecture' ? 'var(--accent-orange)' : 'var(--text-muted)',
                      border: activeTab === 'architecture' ? '1px solid rgba(255, 107, 0, 0.3)' : '1px solid transparent'
                    }}
                  >
                    Mesh Topology
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: activeTab === 'code' ? 'rgba(255, 107, 0, 0.2)' : 'transparent',
                      color: activeTab === 'code' ? 'var(--accent-orange)' : 'var(--text-muted)',
                      border: activeTab === 'code' ? '1px solid rgba(255, 107, 0, 0.3)' : '1px solid transparent'
                    }}
                  >
                    V8 WASM Config
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#22C55E'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#22C55E',
                      boxShadow: '0 0 6px #22C55E'
                    }}
                  />
                  <span>14,280 NODES ONLINE</span>
                </div>
              </div>

              {/* Tab 1: Live Mesh Topology Visual */}
              {activeTab === 'architecture' && (
                <div style={{ padding: '10px 0' }}>
                  {/* Step Nodes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 107, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Globe size={20} color="var(--accent-orange)" />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                            Anycast Edge Routing
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Direct BGP peering across 310 global POPs
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                        2.1ms
                      </span>
                    </div>

                    <div
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Cpu size={20} color="#F59E0B" />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                            Autonomous Neural Worker Mesh
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Real-time WASM compilation & payload optimization
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#F59E0B', fontWeight: 700 }}>
                        4.8ms
                      </span>
                    </div>

                    <div
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Shield size={20} color="#22C55E" />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                            Post-Quantum Zero-Trust Guard
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Hardware-verified cryptographic integrity
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#22C55E', fontWeight: 700 }}>
                        0-Trust
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Code Snippet */}
              {activeTab === 'code' && (
                <div
                  style={{
                    background: '#040508',
                    borderRadius: '14px',
                    padding: '18px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: '#E2E8F0',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    lineHeight: 1.5,
                    overflowX: 'auto'
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>// stackyr-webind.config.js</span><br />
                  <span style={{ color: '#FF8A00' }}>export default</span> {'{\n'}
                  {'  '}cluster: <span style={{ color: '#22C55E' }}>'global-mesh-autonomous'</span>,<br />
                  {'  '}acceleration: {'{\n'}
                  {'    '}edgeWorker: <span style={{ color: '#38BDF8' }}>'wasm-v8-turbo'</span>,<br />
                  {'    '}neuralAssets: <span style={{ color: '#FF8A00' }}>true</span>,<br />
                  {'    '}p99ThresholdMs: <span style={{ color: '#F59E0B' }}>8.2</span><br />
                  {'  }'},<br />
                  {'  '}security: {'{\n'}
                  {'    '}zkProofRouting: <span style={{ color: '#FF8A00' }}>true</span>,<br />
                  {'    '}enclave: <span style={{ color: '#22C55E' }}>'sgx-nitro-hybrid'</span><br />
                  {'  }'}<br />
                  {'};'}
                </div>
              )}
            </div>

            {/* Launch CTA Button */}
            <div style={{ marginTop: '24px' }}>
              <a
                href={data.liveUrl || 'https://webind.stackyr.io'}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <span>Launch WEBIND Console</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Highlights Bento Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 'clamp(16px, 2.5vw, 20px)'
            }}
          >
            {data.highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: 'clamp(18px, 3.5vw, 26px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-orange)',
                      marginBottom: '10px'
                    }}
                  >
                    {item.metric}
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={13} color="var(--accent-orange)" />
                  <span>AUTONOMOUS WORKER</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills Strip */}
        {data.techStack && data.techStack.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '16px 24px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              maxWidth: '860px',
              margin: '0 auto'
            }}
          >
            <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Engineered With:
            </span>
            {data.techStack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.78rem',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 107, 0, 0.08)',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  color: '#FED7AA',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
