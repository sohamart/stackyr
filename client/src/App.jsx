import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MobileAppDock from './components/common/MobileAppDock';
import BrandDetailModal from './components/common/BrandDetailModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';

// Dedicated Standalone Pages
import HomePage from './pages/HomePage';
import BrandsPage from './pages/BrandsPage';
import StackAddaPage from './pages/StackAddaPage';
import AboutPage from './pages/AboutPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import ContactPage from './pages/ContactPage';
import defaultData from './data/defaultData.json';

import { fetchBrands, fetchContent } from './services/api';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';
import { Eye, Cpu } from 'lucide-react';
import Lenis from 'lenis';

export default function App() {
  const { isAuthenticated } = useAuth();
  const { error } = useToast();

  const [brands, setBrands] = useState(defaultData?.brands || []);
  const [content, setContent] = useState(defaultData?.content || null);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Hash-based page determination
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '').replace('/', '').trim();
    if (hash === 'admin') return 'admin';
    if (hash === 'brands' || hash === 'ventures' || hash === 'ecosystem') return 'brands';
    if (hash === 'community' || hash === 'stackadda' || hash === 'collective') return 'community';
    if (hash === 'about' || hash === 'story' || hash === 'vision') return 'about';
    if (hash === 'capabilities' || hash === 'arch') return 'capabilities';
    if (hash === 'contact' || hash === 'partner') return 'contact';
    if (hash === 'reviews' || hash === 'feedback') return 'home';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Load Data with seamless fallback to bundled defaultData
  const loadData = async () => {
    try {
      const [brandsRes, contentRes] = await Promise.allSettled([
        fetchBrands(),
        fetchContent()
      ]);
      if (brandsRes.status === 'fulfilled' && brandsRes.value?.success && brandsRes.value?.data?.length > 0) {
        setBrands(brandsRes.value.data);
      }
      if (contentRes.status === 'fulfilled' && contentRes.value?.success && contentRes.value?.data) {
        setContent(contentRes.value.data);
      }
    } catch (err) {
      console.warn('Initial data load error:', err);
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    loadData().finally(() => {
      const elapsed = Date.now() - startTime;
      const minDisplay = 800; // 800ms gives a modern, premium branding splash on refresh
      const remaining = Math.max(0, minDisplay - elapsed);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 450);
      }, remaining);
    });

    const handleHash = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      if (page === 'admin' && !isAuthenticated) {
        setShowLoginModal(true);
      }
    };

    if (getPageFromHash() === 'admin' && !isAuthenticated) {
      setShowLoginModal(true);
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAuthenticated]);

  // Initialize Gold-Standard Lenis Inertial Smooth Scrolling across site
  useEffect(() => {
    // Only initialize Lenis on desktop pointer devices.
    // On touch/mobile devices, native hardware inertial touch scrolling provides 120Hz smooth scrolling
    // and must NEVER be hijacked by JS touch listeners (which causes touch freeze and stutter).
    const isTouchDevice = typeof window !== 'undefined' && 
      (('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth <= 768);

    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const handleNavigate = (pageId) => {
    if (pageId === 'reviews') {
      if (currentPage === 'home') {
        const el = document.getElementById('reviews');
        if (el) {
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
          else el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setCurrentPage('home');
        window.location.hash = '#reviews';
        setTimeout(() => {
          const el = document.getElementById('reviews');
          if (el) {
            if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
            else el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      }
      return;
    }

    setCurrentPage(pageId);
    if (pageId === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `#${pageId}`;
    }
    
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setCurrentPage('admin');
      window.location.hash = '#admin';
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setCurrentPage('admin');
    window.location.hash = '#admin';
  };

  const handleExitAdmin = () => {
    setCurrentPage('home');
    window.location.hash = '';
  };

  // Secret keyboard shortcut (Ctrl + Shift + A / Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  // If in Admin Console
  if (currentPage === 'admin' && isAuthenticated) {
    return (
      <AdminLayout
        brands={brands}
        content={content}
        onRefresh={loadData}
        onExitAdmin={handleExitAdmin}
        onTogglePreviewMode={() => {
          setIsPreviewMode(!isPreviewMode);
          setCurrentPage('home');
        }}
        isPreviewMode={isPreviewMode}
      />
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#060608' }}>
      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Cybernetic Brand Loading Splash on Refresh & Initial Load (Mobile + Desktop) */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#060608',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            opacity: fadeOut ? 0 : 1,
            transform: fadeOut ? 'scale(1.03)' : 'scale(1)',
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: fadeOut ? 'none' : 'auto'
          }}
        >
          {/* Holographic Radar Pulse Container */}
          <div style={{ position: 'relative', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255, 107, 0, 0.25)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
            <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '1px dashed rgba(255, 107, 0, 0.4)', animation: 'spin 10s linear infinite' }} />
            <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 107, 0, 0.18) 0%, transparent 70%)', filter: 'blur(12px)' }} />

            <img
              src="/stackyr-icon-dark.png"
              alt="Stackyr"
              style={{ height: '48px', width: 'auto', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 16px rgba(255, 107, 0, 0.6))' }}
            />
          </div>

          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 3.5vw, 1.25rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '12px', textAlign: 'center' }}>
            STACKYR <span className="text-gradient">CONSTELLATION</span>
          </div>

          {/* High-Tech Shimmer Progress Line */}
          <div style={{ width: 'min(200px, 60vw)', height: '3px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #FF6B00, #F59E0B)', animation: 'loadingBar 1.2s ease-in-out infinite' }} />
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.14em', color: '#94A3B8', marginTop: '16px', textTransform: 'uppercase', textAlign: 'center' }}>
            INITIALIZING QUANTUM RUNTIMES...
          </div>
        </div>
      )}

      {/* Live Preview Mode Banner if active */}
      {isPreviewMode && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 9999,
            background: 'linear-gradient(90deg, #FF6B00 0%, #F59E0B 100%)',
            color: '#000000',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={16} />
            <span>LIVE PREVIEW MODE: Viewing public site before publishing changes</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setCurrentPage('admin')}
              style={{
                background: '#000000',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.76rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Cpu size={12} />
              Return to Console
            </button>
            <button
              onClick={() => setIsPreviewMode(false)}
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                color: '#000000',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

      {/* Public Navbar (Hidden Admin Button, Liquid Hover Effect) */}
      <Navbar
        currentView={currentPage}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        siteContent={content}
        brandCount={brands.filter(b => b.status === 'active' && !b.isComingSoon).length}
      />

      {/* Dedicated Standalone Page Rendering */}
      <main style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
        {currentPage === 'home' && (
          <HomePage
            content={content}
            brands={brands}
            onSelectBrand={(b) => setSelectedBrand(b)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'brands' && (
          <BrandsPage
            brands={brands}
            onSelectBrand={(b) => setSelectedBrand(b)}
            onNavigate={handleNavigate}
          />
        )}

        {(currentPage === 'community' || currentPage === 'stackadda') && (
          <StackAddaPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'capabilities' && (
          <CapabilitiesPage
            capabilitiesData={content?.capabilities}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            storyData={content?.story}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            ctaData={content?.cta}
            brands={brands}
          />
        )}
      </main>

      {/* Public Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Mobile App Dock with Liquid Water Droplet Animation */}
      <MobileAppDock
        currentView={currentPage}
        onNavigate={handleNavigate}
        brandCount={brands.length || 8}
      />

      {/* Brand Detailed Modal / Mobile Bottom Sheet */}
      {selectedBrand && (
        <BrandDetailModal
          brand={selectedBrand}
          onClose={() => setSelectedBrand(null)}
        />
      )}

      {/* Secret Admin Login Modal */}
      {showLoginModal && (
        <AdminLogin
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
