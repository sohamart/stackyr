import React, { useState } from 'react';
import {
  Layers, LayoutDashboard, PlusCircle, FileText, Image as ImageIcon,
  MessageSquare, Globe, LogOut, ChevronRight, Eye, Shield, Cpu,
  Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import BrandManager from './BrandManager';
import ContentManager from './ContentManager';
import AssetsManager from './AssetsManager';
import InquiriesManager from './InquiriesManager';
import BrandFormModal from './BrandFormModal';

export default function AdminLayout({
  brands = [],
  content,
  onRefresh,
  onExitAdmin,
  onTogglePreviewMode,
  isPreviewMode
}) {
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard' | 'brands' | 'content' | 'assets' | 'inquiries'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'brands', label: 'Venture Catalog', icon: Layers, badge: brands.length },
    { id: 'content', label: 'Site Content CMS', icon: FileText },
    { id: 'assets', label: 'Visual Assets Hub', icon: ImageIcon },
    { id: 'inquiries', label: 'Dialogue & Inquiries', icon: MessageSquare }
  ];

  const handleOpenCreate = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#060608', color: '#FFFFFF', position: 'relative' }}>
      {/* Mobile Backdrop */}
      <div
        className={`admin-mobile-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Admin Sidebar */}
      <aside
        style={{
          width: '280px',
          background: 'linear-gradient(180deg, #0A0C12 0%, #06070A 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 18px',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <div>
          {/* Stackyr Admin Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '0 8px 24px 8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="/stackyr-icon-dark.png"
                alt="Stackyr Symbol"
                style={{ height: '34px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,0,0.3))' }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>
                  STACKYR
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-orange)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Ecosystem Console
                </div>
              </div>
            </div>

            {/* Mobile close sidebar button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="admin-hamburger-btn"
              style={{
                display: 'inline-flex',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer'
              }}
              title="Close Navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Action: New Venture */}
          <button
            onClick={handleOpenCreate}
            className="btn-primary"
            style={{
              width: '100%',
              marginBottom: '24px',
              padding: '10px 16px',
              fontSize: '0.88rem'
            }}
          >
            <PlusCircle size={16} />
            <span>Stack New Venture</span>
          </button>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setSidebarOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-heading)',
                    background: active ? 'rgba(255, 107, 0, 0.12)' : 'transparent',
                    border: `1px solid ${active ? 'rgba(255, 107, 0, 0.3)' : 'transparent'}`,
                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} color={active ? 'var(--accent-orange)' : 'var(--text-muted)'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: active ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)',
                        color: active ? '#000000' : 'var(--text-secondary)',
                        fontWeight: 700
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px' }}>
          {/* User profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', padding: '0 6px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 107, 0, 0.15)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              SA
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {user?.name || 'Super Admin'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Sovereign Key Active
              </div>
            </div>
          </div>

          {/* Return to website */}
          <button
            onClick={onExitAdmin}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              color: '#FFFFFF',
              fontSize: '0.84rem',
              fontWeight: 500,
              cursor: 'pointer',
              marginBottom: '8px'
            }}
          >
            <Globe size={16} color="var(--accent-orange)" />
            <span>View Public Website</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '8px 14px',
              borderRadius: '10px',
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            <LogOut size={15} />
            <span>Disconnect Session</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main
        style={{
          marginLeft: '280px',
          flex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#060608',
          width: '100%',
          minWidth: 0
        }}
        className="admin-main-container"
      >
        {/* Top Navbar */}
        <header
          style={{
            minHeight: '64px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(10, 12, 17, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px clamp(12px, 3vw, 32px)',
            position: 'sticky',
            top: 0,
            zIndex: 90,
            gap: '12px'
          }}
        >
          {/* Left Title / Breadcrumbs + Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <button
              type="button"
              className="admin-hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Admin Menu"
              title="Open Menu"
            >
              <Menu size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Console</span>
              <ChevronRight size={14} color="var(--text-muted)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {navItems.find(n => n.id === currentTab)?.label}
              </span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Live Preview Toggle Button */}
            <button
              onClick={onTogglePreviewMode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                background: isPreviewMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isPreviewMode ? '#22C55E' : 'rgba(255, 255, 255, 0.1)'}`,
                color: isPreviewMode ? '#22C55E' : 'var(--text-secondary)'
              }}
            >
              <Eye size={13} />
              <span>{isPreviewMode ? 'PREVIEW ON' : 'PREVIEW'}</span>
            </button>

            {/* Exit Admin Button */}
            <button
              onClick={onExitAdmin}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              Site →
            </button>
          </div>
        </header>

        {/* Content View */}
        <div style={{ padding: 'clamp(14px, 3.5vw, 36px)', paddingBottom: 'clamp(90px, 14vw, 120px)', flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          {currentTab === 'dashboard' && (
            <AdminDashboard
              brands={brands}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenCreate={handleOpenCreate}
            />
          )}

          {currentTab === 'brands' && (
            <BrandManager
              brands={brands}
              onRefresh={onRefresh}
              onOpenCreate={handleOpenCreate}
              onOpenEdit={handleOpenEdit}
            />
          )}

          {currentTab === 'content' && (
            <ContentManager
              content={content}
              onRefresh={onRefresh}
            />
          )}

          {currentTab === 'assets' && (
            <AssetsManager
              content={content}
              onRefresh={onRefresh}
            />
          )}

          {currentTab === 'inquiries' && (
            <InquiriesManager />
          )}
        </div>
      </main>

      {/* Mobile Floating Bottom Dock (Screen <= 900px) */}
      <nav
        className="admin-mobile-dock"
        aria-label="Admin Mobile Navigation"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '12px',
          left: '12px',
          right: '12px',
          height: '62px',
          background: 'rgba(10, 12, 18, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 107, 0, 0.35)',
          borderRadius: '9999px',
          zIndex: 950,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 107, 0, 0.25)',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setSidebarOpen(false);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                background: active ? 'rgba(255, 107, 0, 0.16)' : 'transparent',
                border: 'none',
                borderRadius: '16px',
                padding: '6px 10px',
                cursor: 'pointer',
                color: active ? '#FFFFFF' : 'var(--text-muted)',
                position: 'relative',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              title={item.label}
            >
              <Icon size={18} color={active ? 'var(--accent-orange)' : 'var(--text-muted)'} />
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: active ? 700 : 500,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.id === 'dashboard' ? 'Overview' : item.id === 'brands' ? 'Ventures' : item.id === 'content' ? 'CMS' : item.id === 'assets' ? 'Assets' : 'Inquiry'}
              </span>
              {item.badge !== undefined && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '6px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-orange)',
                    boxShadow: '0 0 6px var(--accent-orange)'
                  }}
                />
              )}
            </button>
          );
        })}

        {/* Quick Add Venture FAB in Dock */}
        <button
          onClick={handleOpenCreate}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(255, 107, 0, 0.45)',
            flexShrink: 0
          }}
          title="Stack New Venture"
          aria-label="Stack New Venture"
        >
          <PlusCircle size={20} color="#000000" />
        </button>
      </nav>

      {/* 6-Step Multi-Step Brand Builder Modal */}
      {isModalOpen && (
        <BrandFormModal
          brand={editingBrand}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBrand(null);
          }}
          onSaved={onRefresh}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-main-container {
            margin-left: 0 !important;
          }
          aside.sidebar-closed {
            transform: translateX(-100%);
          }
          aside.sidebar-open {
            transform: translateX(0);
          }
          .admin-mobile-dock {
            display: flex !important;
          }
          .admin-mobile-save-bar {
            bottom: 84px !important;
          }
        }
      `}</style>
    </div>
  );
}
