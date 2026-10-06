import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import BrandCard from '../common/BrandCard';

export default function EcosystemSection({ brands = [], onSelectBrand, hideHeader = false }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'

  const categories = useMemo(() => {
    const set = new Set();
    brands.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ['All', ...Array.from(set)];
  }, [brands]);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      // Don't show stealth brands in main active ecosystem grid (they go in coming soon section)
      if (brand.isComingSoon) return false;

      const matchesCat =
        selectedCategory === 'All' || brand.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        brand.name.toLowerCase().includes(q) ||
        (brand.tagline && brand.tagline.toLowerCase().includes(q)) ||
        (brand.description && brand.description.toLowerCase().includes(q)) ||
        (brand.services && brand.services.some((s) => s.toLowerCase().includes(q)));

      return matchesCat && matchesSearch;
    });
  }, [brands, selectedCategory, searchQuery]);

  return (
    <section
      id="ecosystem"
      className={hideHeader ? '' : 'section-pad'}
      style={{
        position: 'relative',
        paddingTop: hideHeader ? 'clamp(16px, 3.5vw, 36px)' : undefined,
        paddingBottom: hideHeader ? 'clamp(36px, 6vw, 64px)' : undefined
      }}
    >
      <div className="container">
        {/* Section Header (Conditionally rendered) */}
        {!hideHeader && (
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
            <div className="badge-pill" style={{ margin: '0 auto 16px auto' }}>
              <Layers size={13} />
              <span>INTERACTIVE BRAND ECOSYSTEM</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px', color: '#FFFFFF' }}>
              The Stackyr <span className="text-gradient">Constellation</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Explore every venture engineered under the Stackyr umbrella. Each entity operates with sovereign autonomy while compounding into our unified intelligence fabric.
            </p>
          </div>
        )}

        {/* Filter and Search Bar Cluster */}
        <div
          style={{
            background: 'rgba(15, 17, 24, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '18px 24px',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          {/* Top row: Search input + View mode toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 280px',
                maxWidth: '440px'
              }}
            >
              <Search
                size={16}
                color="var(--text-muted)"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ventures, technologies, services..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-orange)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results counter & View Mode */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {filteredBrands.length} ACTIVE VENTURES
              </span>

              <div
                style={{
                  display: 'flex',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '10px',
                  padding: '3px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: viewMode === 'grid' ? 'rgba(255, 107, 0, 0.2)' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--accent-orange)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600
                  }}
                  title="Grid view"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: viewMode === 'compact' ? 'rgba(255, 107, 0, 0.2)' : 'transparent',
                    color: viewMode === 'compact' ? 'var(--accent-orange)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600
                  }}
                  title="Compact list view"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none'
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '7px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-heading)',
                    transition: 'all 0.2s ease',
                    background: active
                      ? 'var(--accent-gradient)'
                      : 'rgba(255, 255, 255, 0.04)',
                    color: active ? '#000000' : 'var(--text-secondary)',
                    border: active
                      ? '1px solid var(--accent-orange)'
                      : '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brands Container: Grid View or Compact View */}
        {filteredBrands.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              borderRadius: '20px',
              background: 'rgba(15, 17, 24, 0.5)',
              border: '1px dashed rgba(255, 255, 255, 0.1)'
            }}
          >
            <Layers size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>
              No ventures match the specified criteria
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(16px, 3vw, 24px)'
            }}
          >
            {filteredBrands.map((brand) => (
              <BrandCard
                key={brand._id || brand.id}
                brand={brand}
                onSelect={onSelectBrand}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredBrands.map((brand) => (
              <div
                key={brand._id || brand.id}
                onClick={() => onSelectBrand(brand)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 24px',
                  borderRadius: '14px',
                  background: 'rgba(15, 17, 24, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = brand.accentColor || 'var(--accent-orange)';
                  e.currentTarget.style.background = 'rgba(22, 24, 34, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(15, 17, 24, 0.7)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px'
                    }}
                  >
                    <img
                      src={brand.logo || '/stackyr-icon-dark.png'}
                      alt={brand.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.05rem' }}>
                      {brand.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: brand.accentColor || 'var(--accent-orange)' }}>
                      {brand.tagline}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {brand.category}
                  </span>
                  <button className="btn-ghost" style={{ fontSize: '0.82rem' }}>
                    Inspect →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
