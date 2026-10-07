import React, { useState, useEffect } from 'react';
import {
  Layers, Sparkles, Activity, ShieldCheck, Cpu, ArrowUpRight,
  TrendingUp, Users, Eye, Plus, FileText, CheckCircle2
} from 'lucide-react';
import { fetchAnalytics } from '../../services/api';

export default function AdminDashboard({ brands = [], onNavigate, onOpenCreate }) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetchAnalytics();
        if (res.success) setAnalytics(res.data);
      } catch (err) {
        console.warn('Analytics load error:', err);
      }
    }
    loadStats();
  }, [brands]);

  const totalBrands = brands.length;
  const activeCount = brands.filter(b => b.status === 'active' && !b.isComingSoon).length;
  const featuredCount = brands.filter(b => b.featured).length;
  const stealthCount = brands.filter(b => b.isComingSoon).length;

  // Category distribution
  const catMap = {};
  brands.forEach(b => {
    const c = b.category || 'General';
    catMap[c] = (catMap[c] || 0) + 1;
  });

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          padding: 'clamp(18px, 4vw, 32px)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(15, 17, 24, 0.8) 100%)',
          border: '1px solid rgba(255, 107, 0, 0.3)',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div className="badge-pill" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} />
            <span>EXECUTIVE CONSOLE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Stackyr Ecosystem Intelligence Core
          </h2>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)' }}>
            Real-time governance over venture orchestration, digital assets, and high-velocity web infrastructure.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate && onNavigate('content')}
            className="btn-secondary"
            style={{ gap: '8px', padding: '10px 18px', fontSize: '0.86rem' }}
          >
            <FileText size={16} color="var(--accent-orange)" />
            <span>Edit Site Copy & CMS</span>
          </button>
          <button
            onClick={onOpenCreate}
            className="btn-primary"
            style={{ gap: '8px', padding: '10px 20px', fontSize: '0.86rem' }}
          >
            <Plus size={16} />
            <span>Stack New Venture</span>
          </button>
        </div>
      </div>

      {/* Metric Tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}
      >
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TOTAL VENTURES</span>
            <Layers size={18} color="var(--accent-orange)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
            {totalBrands}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#22C55E', marginTop: '4px' }}>
            ● 100% Synced to Orbit
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ACTIVE ONLINE</span>
            <Activity size={18} color="#22C55E" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
            {activeCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Publicly accessible nodes
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>FEATURED PILLARS</span>
            <Sparkles size={18} color="#FF8A00" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
            {featuredCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-orange)', marginTop: '4px' }}>
            Hero Spotlight active
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STEALTH PIPELINE</span>
            <ShieldCheck size={18} color="#F59E0B" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
            {stealthCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#F59E0B', marginTop: '4px' }}>
            In private incubation
          </div>
        </div>
      </div>

      {/* Two Column Layout: Category Distribution & Live Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px'
        }}
      >
        {/* Category Breakdown */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px' }}>
            Venture Domain Distribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(catMap).map(([name, count]) => {
              const pct = totalBrands > 0 ? Math.round((count / totalBrands) * 100) : 0;
              return (
                <div key={name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '6px' }}>
                    <span style={{ color: '#E2E8F0' }}>{name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 600 }}>
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: 'var(--accent-gradient)',
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Ecosystem Health */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
              Autonomous Mesh Telemetry
            </h3>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#22C55E',
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '4px 10px',
                borderRadius: '9999px'
              }}
            >
              STATUS: OPTIMAL
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Ecosystem SLA Uptime', value: '99.999%', sub: 'Target met across all regions' },
              { label: 'Distributed Node Registry', value: '14,280 Nodes', sub: 'Global Tier-1 peering active' },
              { label: 'Mesh Consensus Sync Latency', value: '1.2ms p99', sub: 'Sub-millisecond threshold' },
              { label: 'Dynamic Asset Compiler', value: 'WEBIND V8', sub: 'Zero backlog detected' }
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600 }}>{stat.label}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{stat.sub}</div>
                </div>
                <div style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-orange)' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
