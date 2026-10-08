import React, { useState, useMemo } from 'react';
import {
  Search, Plus, ArrowUp, ArrowDown, Edit3, Trash2, Sparkles,
  Layers, Check, ExternalLink, AlertTriangle, Eye, Shield
} from 'lucide-react';
import { updateBrand, deleteBrand, reorderBrands } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function BrandManager({ brands = [], onRefresh, onOpenCreate, onOpenEdit }) {
  const { success, error } = useToast();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [reordering, setReordering] = useState(false);
  const [localBrands, setLocalBrands] = useState([...brands]);

  // Sync with prop updates
  React.useEffect(() => {
    setLocalBrands([...brands].sort((a, b) => (a.order || 0) - (b.order || 0)));
  }, [brands]);

  const categories = useMemo(() => {
    const set = new Set();
    localBrands.forEach(b => { if (b.category) set.add(b.category); });
    return ['All', ...Array.from(set)];
  }, [localBrands]);

  const filtered = useMemo(() => {
    return localBrands.filter(b => {
      const matchCat = selectedCat === 'All' || b.category === selectedCat;
      const q = search.toLowerCase().trim();
      const matchSearch = !q || b.name.toLowerCase().includes(q) || (b.tagline && b.tagline.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [localBrands, selectedCat, search]);

  // Toggle Featured status
  const handleToggleFeatured = async (brand) => {
    try {
      await updateBrand(brand._id || brand.id, { featured: !brand.featured });
      success(`Updated "${brand.name}" featured status.`);
      onRefresh();
    } catch (err) {
      error(err.message || 'Failed to update brand status');
    }
  };

  // Toggle Coming Soon status
  const handleToggleStealth = async (brand) => {
    try {
      await updateBrand(brand._id || brand.id, { isComingSoon: !brand.isComingSoon });
      success(`Updated "${brand.name}" stealth status.`);
      onRefresh();
    } catch (err) {
      error(err.message || 'Failed to update brand status');
    }
  };

  // Move brand up in sort order
  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...localBrands];
    const temp = next[idx - 1];
    next[idx - 1] = next[idx];
    next[idx] = temp;
    next.forEach((b, i) => { b.order = i + 1; });
    setLocalBrands(next);
    setReordering(true);
  };

  // Move brand down in sort order
  const moveDown = (idx) => {
    if (idx === localBrands.length - 1) return;
    const next = [...localBrands];
    const temp = next[idx + 1];
    next[idx + 1] = next[idx];
    next[idx] = temp;
    next.forEach((b, i) => { b.order = i + 1; });
    setLocalBrands(next);
    setReordering(true);
  };

  // Save new order to backend
  const handleSaveOrder = async () => {
    try {
      const orderList = localBrands.map((b, i) => ({
        id: b._id || b.id,
        order: i + 1
      }));
      await reorderBrands(orderList);
      success('Venture order priority synchronized successfully.');
      setReordering(false);
      onRefresh();
    } catch (err) {
      error(err.message || 'Failed to save order');
    }
  };

  // Delete Brand confirmation
  const handleDelete = async () => {
    if (!brandToDelete) return;
    try {
      await deleteBrand(brandToDelete._id || brandToDelete.id);
      success(`Venture "${brandToDelete.name}" removed from ecosystem.`);
      setBrandToDelete(null);
      onRefresh();
    } catch (err) {
      error(err.message || 'Failed to delete venture');
    }
  };

  return (
    <div>
      {/* Top Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Venture Ecosystem Catalog
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Manage all active, featured, and stealth ventures across the Stackyr network without writing code.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {reordering && (
            <button
              onClick={handleSaveOrder}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}
            >
              <Check size={16} /> Save Order Changes
            </button>
          )}

          <button
            onClick={onOpenCreate}
            className="btn-primary"
          >
            <Plus size={16} /> Stack New Venture
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          padding: '16px 20px',
          borderRadius: '16px',
          background: 'rgba(15, 17, 24, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '24px'
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '380px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Filter catalog by name, tagline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxWidth: '100%', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: selectedCat === cat ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCat === cat ? '#000000' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ventures Desktop Table (Hidden on Mobile) */}
      <div
        className="admin-desktop-brand-table"
        style={{
          borderRadius: '18px',
          background: 'rgba(12, 14, 20, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden'
        }}
      >
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ minWidth: '760px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '70px 1.8fr 1.2fr 100px 100px 140px',
                padding: '14px 20px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}
            >
              <div>Order</div>
              <div>Venture Entity</div>
              <div>Category</div>
              <div>Featured</div>
              <div>Stealth</div>
              <div style={{ textAlign: 'right' }}>Actions</div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No ventures found matching the search criteria.
              </div>
            ) : (
              filtered.map((brand, idx) => (
                <div
                  key={brand._id || brand.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px 1.8fr 1.2fr 100px 100px 140px',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.025)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Order buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', minWidth: '18px' }}>
                      {idx + 1}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        style={{ color: idx === 0 ? 'rgba(255, 255, 255, 0.1)' : 'var(--text-muted)', cursor: idx === 0 ? 'default' : 'pointer' }}
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === filtered.length - 1}
                        style={{ color: idx === filtered.length - 1 ? 'rgba(255, 255, 255, 0.1)' : 'var(--text-muted)', cursor: idx === filtered.length - 1 ? 'default' : 'pointer' }}
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Brand Logo & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={brand.logo || '/stackyr-icon-dark.png'}
                        alt={brand.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/stackyr-icon-dark.png';
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.94rem' }}>
                        {brand.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: brand.accentColor || 'var(--accent-orange)' }}>
                        {brand.tagline || 'Autonomous Venture node'}
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {brand.category}
                    </span>
                  </div>

                  {/* Featured Toggle */}
                  <div>
                    <button
                      onClick={() => handleToggleFeatured(brand)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: brand.featured ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${brand.featured ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.1)'}`,
                        color: brand.featured ? 'var(--accent-orange)' : 'var(--text-muted)'
                      }}
                    >
                      {brand.featured ? 'FEATURED' : 'Standard'}
                    </button>
                  </div>

                  {/* Stealth Toggle */}
                  <div>
                    <button
                      onClick={() => handleToggleStealth(brand)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: brand.isComingSoon ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${brand.isComingSoon ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)'}`,
                        color: brand.isComingSoon ? '#F59E0B' : 'var(--text-muted)'
                      }}
                    >
                      {brand.isComingSoon ? 'STEALTH' : 'Public'}
                    </button>
                  </div>

                  {/* Action Buttons: Edit, Delete */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => onOpenEdit(brand)}
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                      title="Edit venture parameters"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => setBrandToDelete(brand)}
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        cursor: 'pointer'
                      }}
                      title="Remove from ecosystem"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Ventures Mobile Card List (Visible only on Mobile screens < 768px) */}
      <div className="admin-mobile-brand-cards" style={{ display: 'none', flexDirection: 'column', gap: '14px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(12, 14, 20, 0.8)', borderRadius: '16px' }}>
            No ventures found matching search.
          </div>
        ) : (
          filtered.map((brand, idx) => (
            <div
              key={brand._id || brand.id}
              className="glass-card"
              style={{
                padding: '16px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Header: Logo, Name, Category */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '5px',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={brand.logo || '/stackyr-icon-dark.png'}
                      alt={brand.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/stackyr-icon-dark.png';
                      }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.94rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {brand.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: brand.accentColor || 'var(--accent-orange)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {brand.tagline || 'Autonomous Venture node'}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '6px', flexShrink: 0 }}>
                  #{idx + 1}
                </span>
              </div>

              {/* Toggles Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleToggleFeatured(brand)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: brand.featured ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${brand.featured ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: brand.featured ? 'var(--accent-orange)' : 'var(--text-muted)'
                  }}
                >
                  {brand.featured ? '★ FEATURED' : 'Standard'}
                </button>

                <button
                  onClick={() => handleToggleStealth(brand)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: brand.isComingSoon ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${brand.isComingSoon ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: brand.isComingSoon ? '#F59E0B' : 'var(--text-muted)'
                  }}
                >
                  {brand.isComingSoon ? '🔒 STEALTH' : 'Public'}
                </button>

                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  {brand.category}
                </span>
              </div>

              {/* Actions Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.75rem', opacity: idx === 0 ? 0.3 : 1 }}
                    title="Move Up"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === filtered.length - 1}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.75rem', opacity: idx === filtered.length - 1 ? 0.3 : 1 }}
                    title="Move Down"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => onOpenEdit(brand)}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }}
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setBrandToDelete(brand)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      cursor: 'pointer'
                    }}
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-desktop-brand-table {
            display: none !important;
          }
          .admin-mobile-brand-cards {
            display: flex !important;
          }
        }
      `}</style>

      {/* Delete Confirmation Modal */}
      {brandToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(4, 5, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setBrandToDelete(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              borderRadius: '20px',
              background: '#0E1017',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              padding: '28px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#EF4444', marginBottom: '14px' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                Confirm Venture Removal
              </h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
              Are you sure you want to permanently remove <strong style={{ color: '#FFFFFF' }}>{brandToDelete.name}</strong> from the Stackyr ecosystem? This action cannot be reversed.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setBrandToDelete(null)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn-primary"
                style={{ flex: 1, background: '#EF4444', color: '#FFFFFF' }}
              >
                Delete Venture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
