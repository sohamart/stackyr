import React, { useState, useRef } from 'react';
import { Upload, Check, Copy, Sparkles, Layers, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { uploadAsset, updateContent } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function AssetsManager({ content, onRefresh }) {
  const { success, error } = useToast();
  const [uploadingTarget, setUploadingTarget] = useState(null);
  const fileInputRef = useRef(null);

  const assetsList = [
    {
      id: 'mainLogoDark',
      label: 'Stackyr Full Brand Logo (Dark Mode)',
      desc: 'Used across headers and dark backgrounds',
      path: content?.visualAssets?.mainLogoDark || '/stackyr-full-dark.png',
      isDarkBg: true
    },
    {
      id: 'iconLogoDark',
      label: 'Stackyr Stacking Ribbon Symbol (Dark Mode)',
      desc: 'Primary geometric icon mark for dark mode',
      path: content?.visualAssets?.iconLogoDark || '/stackyr-icon-dark.png',
      isDarkBg: true
    },
    {
      id: 'mainLogoLight',
      label: 'Stackyr Full Brand Logo (Light Mode)',
      desc: 'Used across light documentation and exports',
      path: content?.visualAssets?.mainLogoLight || '/stackyr-full-light.png',
      isDarkBg: false
    },
    {
      id: 'iconLogoLight',
      label: 'Stackyr Stacking Ribbon Symbol (Light Mode)',
      desc: 'Icon mark for light theme backgrounds',
      path: content?.visualAssets?.iconLogoLight || '/stackyr-icon-light.png',
      isDarkBg: false
    },
    {
      id: 'favicon',
      label: 'Ecosystem Favicon & App Icon',
      desc: '32x32 and 512x512 browser tab icon',
      path: '/favicon.png',
      isDarkBg: true
    },
    {
      id: 'coverBanner',
      label: 'WEBIND Architecture Hero Visual',
      desc: 'Flagship platform high-res backdrop',
      path: '/uploads/originals/stackyr-brand-dark.jpeg',
      isDarkBg: true
    }
  ];

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingTarget) return;

    try {
      const res = await uploadAsset(file);
      if (res.success && res.url) {
        // Update content visual assets
        await updateContent({
          visualAssets: {
            ...(content?.visualAssets || {}),
            [uploadingTarget]: res.url
          }
        });
        success(`Asset "${uploadingTarget}" replaced and synchronized live.`);
        onRefresh();
      }
    } catch (err) {
      error(err.message || 'Failed to upload asset');
    } finally {
      setUploadingTarget(null);
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(window.location.origin + url);
    success('Asset path copied to clipboard');
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Visual Brand Assets Hub
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Manage, inspect, and update official Stackyr brand assets, transparent logo marks, and high-resolution ecosystem graphics.
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}
      >
        {assetsList.map((asset) => (
          <div
            key={asset.id}
            className="glass-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>
                  OFFICIAL ASSET
                </span>
                <button
                  onClick={() => copyUrl(asset.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title="Copy URL"
                >
                  <Copy size={13} /> Copy Path
                </button>
              </div>

              {/* Asset Preview Box */}
              <div
                style={{
                  height: '140px',
                  borderRadius: '14px',
                  background: asset.isDarkBg ? '#08090D' : '#F1F5F9',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  marginBottom: '18px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={asset.path}
                  alt={asset.label}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none', color: '#64748B', fontSize: '0.8rem' }}>
                  Asset not loaded
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                {asset.label}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                {asset.desc}
              </p>
            </div>

            {/* Replace Button */}
            <button
              onClick={() => {
                setUploadingTarget(asset.id);
                fileInputRef.current?.click();
              }}
              className="btn-secondary"
              style={{ width: '100%', gap: '8px' }}
            >
              <Upload size={15} />
              <span>Replace / Upload New Asset</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
