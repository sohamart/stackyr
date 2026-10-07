import React from 'react';
import {
  Terminal, Users, Sparkles, ArrowRight, Github, MessageSquare,
  Cpu, Code2, Award, Zap, Globe, ShieldCheck, Flame, BookOpen, ExternalLink, Clock
} from 'lucide-react';
import ReviewsSection from '../components/public/ReviewsSection';
import { useToast } from '../context/ToastContext';

export default function StackAddaPage({ onNavigate, communityData }) {
  const { info } = useToast();
  const badgeText = communityData?.badge || 'DEVELOPER & HACKER COLLECTIVE • 14,200+ SYSTEMS ARCHITECTS';
  const mainTitle = communityData?.title || 'Stackyr Community:';
  const accentTitle = communityData?.titleAccent || 'The Engineering Crucible.';
  const mainDesc = communityData?.description || 'An open technical collective within the Stackyr ecosystem. Where systems architects, kernel hackers, and AI researchers gather to stress-test zero-trust enclaves, optimize edge WASM runtimes, and build sovereign computing architectures.';
  const discordUrl = communityData?.discordLink || 'https://discord.gg/stackyr';
  const discordBtnText = communityData?.discordButtonText || 'Enter Stackyr Community Discord';
  const isDiscordComingSoon = Boolean(communityData?.discordComingSoon);
  const discordComingSoonBadge = communityData?.discordComingSoonBadge || 'COMING SOON';
  const githubUrl = communityData?.githubLink || 'https://github.com/stackyr';
  const githubBtnText = communityData?.githubButtonText || 'Explore GitHub Repos';
  const isGithubComingSoon = Boolean(communityData?.githubComingSoon);
  const githubComingSoonBadge = communityData?.githubComingSoonBadge || 'COMING SOON';
  const statsList = (communityData?.stats && communityData?.stats.length > 0) ? communityData.stats : [
    { label: 'Active Engineers', value: '14,200+' },
    { label: 'Micro-Grants Disbursed', value: '$250,000+' },
    { label: 'Specialized Guilds', value: '18 Units' },
    { label: 'Open-Source Repos', value: '94 Codebases' }
  ];
  const pillars = [
    {
      icon: Code2,
      title: 'Open Source Swarms & Bounties',
      desc: 'Hack on bare-metal WASM kernels, distributed mesh routers, and cryptographic primitives. Earn micro-grants and tokenized equity allocations.',
      badge: '$250K+ In Grant Pools'
    },
    {
      icon: BookOpen,
      title: 'Cryptographic Research Working Groups',
      desc: 'Weekly peer review on zero-knowledge SNARKs, sub-watt photonic computing, and sovereign decentralized database models.',
      badge: '18 Active Guilds'
    },
    {
      icon: Flame,
      title: 'Quarterly Deep-Tech Hackathons',
      desc: 'Build high-velocity ventures on top of the Stackyr infrastructure. Winning teams receive incubation and seed funding from Stackyr Ventures.',
      badge: 'Next: Q4 Global Sprint'
    },
    {
      icon: Cpu,
      title: 'Bare-Metal Edge Telemetry Lab',
      desc: 'Direct access to 14,280 distributed silicon nodes and bare-metal hardware sandboxes to stress-test your AI inference models.',
      badge: 'Free Tier Available'
    }
  ];

  const workingGroups = [
    { name: 'WASM Edge Runtimes', lead: 'Dr. Aris Thorne', count: '1,420 members', status: 'Active Sprint' },
    { name: 'zk-SNARK Enclave Security', lead: 'Marcus Vance', count: '980 members', status: 'Drafting Spec' },
    { name: 'Photonic Silicon Optimization', lead: 'Elena Rostova', count: '840 members', status: 'Benchmarking' },
    { name: 'Autonomous Agent Orchestration', lead: 'Siddharth Sen', count: '2,150 members', status: 'Deploying V2' }
  ];

  return (
    <div style={{ paddingTop: 'clamp(116px, 18vw, 150px)', paddingBottom: '100px', minHeight: '100vh', background: '#060608', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Ambient Radial Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(800px, 92vw)',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.14) 0%, rgba(245, 158, 11, 0.03) 50%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: 'clamp(8px, 2vw, 20px) clamp(16px, 4vw, 24px) clamp(50px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
        {/* Top Community Capsule */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto clamp(28px, 4vw, 44px) auto' }}>
          <div
            className="badge-pill"
            style={{
              margin: '0 auto 16px auto',
              display: 'inline-flex',
              padding: '4px 14px',
              fontSize: '0.68rem',
              gap: '6px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-orange)', boxShadow: '0 0 8px var(--accent-orange)' }} />
            <span>{badgeText}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.9rem, 5.5vw, 4rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
              lineHeight: 1.15
            }}
          >
            {mainTitle} <br />
            The <span className="text-gradient">{accentTitle}</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '28px',
              maxWidth: '720px',
              margin: '0 auto 28px auto'
            }}
          >
            {mainDesc}
          </p>

          {/* Action CTAs */}
          <div className="stack-adda-cta-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {isDiscordComingSoon ? (
              <button
                type="button"
                onClick={() => info ? info('The Stackyr Community Discord collective is currently in genesis preparation. Launching soon!') : alert('Stackyr Discord is launching soon!')}
                className="btn-primary"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.94rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 107, 0, 0.5)'
                }}
              >
                <MessageSquare size={17} />
                <span>{discordBtnText}</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.64rem',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    letterSpacing: '0.06em'
                  }}
                >
                  {discordComingSoonBadge}
                </span>
              </button>
            ) : (
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: '13px 26px',
                  fontSize: '0.94rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageSquare size={17} />
                <span>{discordBtnText}</span>
                <ExternalLink size={15} />
              </a>
            )}

            {isGithubComingSoon ? (
              <button
                type="button"
                onClick={() => info ? info('Stackyr open-source repositories are undergoing confidential security audit. Launching soon!') : alert('Stackyr GitHub is launching soon!')}
                className="btn-secondary"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.94rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 107, 0, 0.4)'
                }}
              >
                <Github size={17} />
                <span>{githubBtnText}</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.64rem',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255, 107, 0, 0.2)',
                    border: '1px solid var(--accent-orange)',
                    color: 'var(--accent-orange)',
                    fontWeight: 800,
                    letterSpacing: '0.06em'
                  }}
                >
                  {githubComingSoonBadge}
                </span>
              </button>
            ) : (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  padding: '13px 26px',
                  fontSize: '0.94rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Github size={17} />
                <span>{githubBtnText}</span>
                <ArrowRight size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Telemetry Counter Ribbon */}
        <div
          className="stack-adda-telemetry"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
            gap: '12px',
            padding: 'clamp(14px, 2.8vw, 24px)',
            borderRadius: '20px',
            background: 'rgba(14, 17, 26, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '48px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)'
          }}
        >
          {statsList.map((item, idx) => (
            <div key={idx} style={{ borderLeft: '1px solid rgba(255, 107, 0, 0.25)', paddingLeft: '14px' }}>
              <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#FFFFFF' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--accent-orange)', fontWeight: 600, marginTop: '2px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 640px) {
            .stack-adda-cta-group {
              flex-direction: column !important;
              width: 100% !important;
            }
            .stack-adda-cta-group a {
              width: 100% !important;
              justify-content: center !important;
              box-sizing: border-box !important;
            }
            .stack-adda-telemetry {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 10px !important;
              margin-bottom: 32px !important;
            }
          }
        `}</style>

        {/* 4 Core Pillars Grid */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF' }}>
              Collective <span className="text-gradient">Capabilities & Guilds</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'rgba(12, 14, 22, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255, 107, 0, 0.15)',
                        border: '1px solid rgba(255, 107, 0, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-orange)',
                        marginBottom: '18px'
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
                      {p.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
                      {p.desc}
                    </p>
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: 'rgba(255, 107, 0, 0.16)',
                        color: 'var(--accent-orange)',
                        fontWeight: 700
                      }}
                    >
                      {p.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Working Groups */}
        <div
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(16, 18, 28, 0.85) 0%, rgba(9, 10, 15, 0.95) 100%)',
            border: '1px solid rgba(255, 107, 0, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
                Featured Engineering Working Guilds
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#94A3B8', marginTop: '4px' }}>
                Join an active sprint, review RFCs, and contribute to cutting-edge Stackyr infrastructure.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="btn-secondary"
              style={{ padding: '10px 20px', fontSize: '0.86rem', cursor: 'pointer' }}
            >
              <span>Propose a New Guild</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {workingGroups.map((g, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {g.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                    Lead: {g.lead} • {g.count}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: '#22C55E',
                    fontWeight: 700
                  }}
                >
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Marquee inside Stack Adda */}
      <ReviewsSection />
    </div>
  );
}
