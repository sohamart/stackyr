import React, { useState, useEffect, useRef } from 'react';
import {
  X, Check, ArrowRight, ArrowLeft, Upload, Sparkles, Layers,
  Globe, Twitter, Linkedin, Github, MessageSquare, Plus, Trash2,
  Eye, CheckCircle2, Shield, AlertCircle
} from 'lucide-react';
import BrandCard from '../common/BrandCard';
import { createBrand, updateBrand, uploadAsset } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const STEPS = [
  { id: 1, label: 'Identity', number: '01' },
  { id: 2, label: 'Content', number: '02' },
  { id: 3, label: 'Services', number: '03' },
  { id: 4, label: 'Links', number: '04' },
  { id: 5, label: 'Assets', number: '05' },
  { id: 6, label: 'Preview', number: '06' }
];

const ACCENT_PRESETS = [
  '#FF6B00', '#FF8A00', '#F59E0B', '#EA580C',
  '#10B981', '#06B6D4', '#6366F1', '#EC4899'
];

const CATEGORY_PRESETS = [
  'AI & Autonomous Systems',
  'Web Infrastructure & Cloud',
  'Security & Sovereign Data',
  'Data Intelligence',
  'Creative Tech'
];

export default function BrandFormModal({ brand, onClose, onSaved }) {
  const isEditing = !!brand;
  const { success, error } = useToast();
  const fileInputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: brand?.name || '',
    tagline: brand?.tagline || '',
    category: brand?.category || 'AI & Autonomous Systems',
    accentColor: brand?.accentColor || '#FF6B00',
    description: brand?.description || '',
    status: brand?.status || 'active',
    featured: brand?.featured || false,
    isComingSoon: brand?.isComingSoon || false,
    order: brand?.order !== undefined ? brand.order : 1,
    services: brand?.services ? [...brand.services] : ['Autonomous Agent Mesh', 'Distributed Edge Telemetry'],
    metrics: brand?.metrics ? [...brand.metrics] : [
      { label: 'Compute Speed', value: '8.4x' },
      { label: 'Latency', value: '4.2ms' }
    ],
    websiteUrl: brand?.websiteUrl || '',
    socialLinks: {
      twitter: brand?.socialLinks?.twitter || '',
      linkedin: brand?.socialLinks?.linkedin || '',
      github: brand?.socialLinks?.github || '',
      discord: brand?.socialLinks?.discord || ''
    },
    logo: brand?.logo || '/uploads/stackyr-icon-dark.png',
    coverImage: brand?.coverImage || ''
  });

  const [newServiceText, setNewServiceText] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(brand?.logo || '/uploads/stackyr-icon-dark.png');
  const [dragOver, setDragOver] = useState(false);

  // Handle Logo Upload Preview
  const handleLogoFileSelect = (file) => {
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target.result);
      setFormData(prev => ({ ...prev, logo: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFetchWebsiteFavicon = () => {
    if (!formData.websiteUrl) {
      error('Please enter a Website URL first in Step 04 (Links)');
      return;
    }
    try {
      let cleanUrl = formData.websiteUrl.trim();
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
      }
      const host = new URL(cleanUrl).hostname;
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${host}&sz=256`;
      setLogoPreview(faviconUrl);
      setFormData(prev => ({ ...prev, logo: faviconUrl }));
      setLogoFile(null);
      success(`Extracted brand logo for ${host}!`);
    } catch (e) {
      error('Invalid website URL format');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Add Service tag
  const addService = () => {
    if (!newServiceText.trim()) return;
    if (!formData.services.includes(newServiceText.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newServiceText.trim()]
      }));
    }
    setNewServiceText('');
  };

  // Remove Service tag
  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  // Add Metric
  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { label: 'Metric', value: 'Value' }]
    }));
  };

  // Update Metric
  const updateMetric = (index, field, val) => {
    setFormData(prev => {
      const nextMetrics = [...prev.metrics];
      nextMetrics[index] = { ...nextMetrics[index], [field]: val };
      return { ...prev, metrics: nextMetrics };
    });
  };

  // Remove Metric
  const removeMetric = (index) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index)
    }));
  };

  // Step Validation
  const canProceed = () => {
    if (currentStep === 1) return formData.name.trim().length > 0;
    if (currentStep === 2) return formData.description.trim().length > 0;
    return true;
  };

  // Final Submit
  const handleSave = async () => {
    setLoading(true);
    try {
      let finalLogoUrl = formData.logo;

      // Prioritize Base64 Data URL or direct URL so logo is saved directly into MongoDB Atlas
      if (formData.logo && formData.logo.startsWith('data:')) {
        finalLogoUrl = formData.logo;
        if (logoFile) {
          uploadAsset(logoFile).catch(() => {});
        }
      } else if (logoFile) {
        try {
          const uploadRes = await uploadAsset(logoFile);
          if (uploadRes.success && uploadRes.url) {
            finalLogoUrl = uploadRes.url;
          }
        } catch (err) {
          console.warn('Direct asset upload fallback:', err);
        }
      }

      const payload = {
        ...formData,
        logo: finalLogoUrl
      };

      if (isEditing) {
        await updateBrand(brand._id || brand.id, payload);
        success(`Venture "${formData.name}" updated successfully.`);
      } else {
        await createBrand(payload);
        success(`New venture "${formData.name}" stacked into ecosystem!`);
      }

      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      error(err.message || 'Failed to save venture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(4, 5, 8, 0.88)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          background: 'linear-gradient(180deg, #10121A 0%, #090A0E 100%)',
          border: '1px solid rgba(255, 107, 0, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 45px rgba(255, 107, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Multi-Step Progress Tracker */}
        <div
          style={{
            padding: 'clamp(14px, 3vw, 22px) clamp(14px, 3.5vw, 32px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 107, 0, 0.12)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Layers size={18} color="var(--accent-orange)" />
              </div>
              <div>
                <h3 style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  {isEditing ? `Edit: ${brand.name}` : 'Stack New Ecosystem Venture'}
                </h3>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  STAGE 0{currentStep} OF 06 — {STEPS[currentStep - 1].label.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Step Indicator Bar (Scrollable on small mobile) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              paddingBottom: '4px'
            }}
          >
            {STEPS.map((s, idx) => {
              const isPast = currentStep > s.id;
              const isCurr = currentStep === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    // Allow jumping back or to next if validated
                    if (s.id < currentStep || canProceed()) setCurrentStep(s.id);
                  }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    opacity: isCurr ? 1 : isPast ? 0.8 : 0.4,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isCurr ? 'var(--accent-orange)' : isPast ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      border: `1px solid ${isCurr ? 'var(--accent-orange)' : isPast ? '#22C55E' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: isCurr ? '#000000' : isPast ? '#22C55E' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {isPast ? <Check size={12} strokeWidth={3} /> : s.number}
                  </div>
                  <span style={{ fontSize: '0.76rem', fontWeight: 600, color: isCurr ? '#FFFFFF' : 'var(--text-muted)' }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: 'clamp(16px, 4vw, 32px)', overflowY: 'auto', flex: 1 }}>
          {/* STEP 01 — BRAND IDENTITY */}
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  VENTURE BRAND NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KRONIX AI or WEBIND by Stackyr"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '1.05rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  STRATEGIC TAGLINE
                </label>
                <input
                  type="text"
                  placeholder="e.g. Autonomous Multi-Agent Cognitive Synthesizer"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  VENTURE CATEGORY
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: '#090A0E',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  {CATEGORY_PRESETS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  BRAND ACCENT COLOR & GLOW
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {ACCENT_PRESETS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, accentColor: color })}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: color,
                        border: formData.accentColor === color ? '3px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: formData.accentColor === color ? `0 0 16px ${color}` : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    style={{ width: '40px', height: '36px', borderRadius: '8px', cursor: 'pointer', background: 'transparent', border: 'none' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: formData.accentColor }}>
                    {formData.accentColor}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 02 — CONTENT & ARCHITECTURE */}
          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  FULL VENTURE OVERVIEW & MISSION *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Detail the technical capability, role within the Stackyr ecosystem, computational throughput, and problem solved..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none',
                    lineHeight: 1.6
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                {/* Status */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    DEPLOYMENT STATUS
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: '#090A0E',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="active">Active Online</option>
                    <option value="draft">Internal Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Display Order */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    SORT ORDER INDEX
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              {/* Toggles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }}>
                <div
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    background: formData.featured ? 'rgba(255, 107, 0, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${formData.featured ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={() => {}}
                    style={{ accentColor: 'var(--accent-orange)', width: '18px', height: '18px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#FFFFFF' }}>
                      Featured Venture Pillar
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Showcases brand prominently in featured spotlights
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, isComingSoon: !formData.isComingSoon })}
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    background: formData.isComingSoon ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${formData.isComingSoon ? '#F59E0B' : 'rgba(255, 255, 255, 0.08)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.isComingSoon}
                    onChange={() => {}}
                    style={{ accentColor: '#F59E0B', width: '18px', height: '18px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#FFFFFF' }}>
                      Stealth / Incubation Mode
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Displays in incubation pipeline with waitlist triggers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 03 — SERVICES & METRICS */}
          {currentStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {/* Dynamic Services Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  INTEGRATED VENTURE SERVICES & CAPABILITIES
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  <input
                    type="text"
                    placeholder="Type service (e.g. Distributed Edge Compute) and press Add"
                    value={newServiceText}
                    onChange={(e) => setNewServiceText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addService();
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="btn-secondary"
                    style={{ padding: '0 20px', borderRadius: '10px' }}
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>

                {/* Service Tag Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.services.map((srv, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 107, 0, 0.1)',
                        border: '1px solid rgba(255, 107, 0, 0.3)',
                        color: '#FED7AA',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span>{srv}</span>
                      <X
                        size={14}
                        style={{ cursor: 'pointer', color: 'var(--accent-orange)' }}
                        onClick={() => removeService(idx)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Telemetry Metrics */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    BENCHMARK SPECS & TELEMETRY
                  </label>
                  <button
                    type="button"
                    onClick={addMetric}
                    style={{ fontSize: '0.78rem', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={14} /> Add Benchmark
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {formData.metrics.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Label (e.g. P99 Latency)"
                        value={m.label}
                        onChange={(e) => updateMetric(idx, 'label', e.target.value)}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          fontSize: '0.86rem'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 8.2ms)"
                        value={m.value}
                        onChange={(e) => updateMetric(idx, 'value', e.target.value)}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          fontSize: '0.86rem'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeMetric(idx)}
                        style={{ color: '#EF4444', padding: '6px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 04 — LINKS & SOCIAL */}
          {currentStep === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  OFFICIAL LIVE PLATFORM URL
                </label>
                <div style={{ position: 'relative' }}>
                  <Globe size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="url"
                    placeholder="https://venture.stackyr.io"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  TWITTER / X HANDLE OR URL
                </label>
                <div style={{ position: 'relative' }}>
                  <Twitter size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="https://x.com/venture_ai"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  LINKEDIN COMPANY URL
                </label>
                <div style={{ position: 'relative' }}>
                  <Linkedin size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="https://linkedin.com/company/venture"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  GITHUB REPOSITORY / ORG URL
                </label>
                <div style={{ position: 'relative' }}>
                  <Github size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="https://github.com/stackyr/venture"
                    value={formData.socialLinks.github}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 05 — DESIGN ASSETS & LOGO UPLOAD */}
          {currentStep === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Drag and Drop Zone */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  DRAG & DROP BRAND LOGO (OR SELECT FILE)
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragOver ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.15)'}`,
                    borderRadius: '16px',
                    padding: '36px',
                    textAlign: 'center',
                    background: dragOver ? 'rgba(255, 107, 0, 0.08)' : 'rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Upload size={32} color="var(--accent-orange)" style={{ margin: '0 auto 12px auto' }} />
                  <div style={{ fontSize: '0.96rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                    Click or drag & drop brand logo here
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    PNG, SVG, JPG, WebP supported up to 15MB
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleLogoFileSelect(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Website Auto-fetch & URL Input Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    EXTRACT FROM WEBSITE URL
                  </label>
                  <button
                    type="button"
                    onClick={handleFetchWebsiteFavicon}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px', gap: '8px' }}
                  >
                    <Globe size={16} color="var(--accent-orange)" />
                    <span>Auto-Extract Logo from {formData.websiteUrl ? new URL(formData.websiteUrl.startsWith('http') ? formData.websiteUrl : 'https://' + formData.websiteUrl).hostname : 'Website URL'}</span>
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    OR PASTE LOGO / IMAGE URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or data:image/..."
                    value={formData.logo && !formData.logo.startsWith('data:') ? formData.logo : ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLogoPreview(val || '/uploads/stackyr-icon-dark.png');
                      setFormData(prev => ({ ...prev, logo: val }));
                      setLogoFile(null);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Live Image Preview + Presets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                    ACTIVE LOGO PREVIEW
                  </div>
                  <div
                    style={{
                      height: '100px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px'
                    }}
                  >
                    <img
                      src={logoPreview}
                      alt="Brand preview"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                {/* Quick Select Provided Stackyr Assets */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                    OR SELECT PRE-LOADED STACKYR LOGO
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {[
                      { label: 'Dark Icon', path: '/uploads/stackyr-icon-dark.png' },
                      { label: 'Light Icon', path: '/uploads/stackyr-icon-light.png' },
                      { label: 'Dark Full', path: '/uploads/stackyr-full-dark.png' },
                      { label: 'Light Full', path: '/uploads/stackyr-full-light.png' }
                    ].map((asset, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setLogoPreview(asset.path);
                          setFormData({ ...formData, logo: asset.path });
                          setLogoFile(null);
                        }}
                        style={{
                          height: '60px',
                          borderRadius: '8px',
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: formData.logo === asset.path ? '2px solid var(--accent-orange)' : '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: '6px'
                        }}
                        title={asset.label}
                      >
                        <img
                          src={asset.path}
                          alt={asset.label}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 06 — PREVIEW & PUBLISH */}
          {currentStep === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  color: '#4ADE80',
                  fontSize: '0.88rem'
                }}
              >
                <CheckCircle2 size={18} />
                <span>All parameters validated. Ready to commit and deploy this venture to the live public ecosystem.</span>
              </div>

              {/* Live Rendered BrandCard */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                  LIVE INTERACTIVE ECOSYSTEM CARD PREVIEW
                </label>
                <div style={{ maxWidth: '420px', margin: '0 auto' }}>
                  <BrandCard
                    brand={{
                      ...formData,
                      logo: logoPreview
                    }}
                    onSelect={() => {}}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: 'clamp(12px, 3vw, 18px) clamp(16px, 4vw, 32px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap'
          }}
        >
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="btn-secondary"
              style={{ gap: '8px' }}
            >
              <ArrowLeft size={16} /> Previous Step
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              disabled={!canProceed()}
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="btn-primary"
              style={{
                opacity: canProceed() ? 1 : 0.5,
                cursor: canProceed() ? 'pointer' : 'not-allowed'
              }}
            >
              <span>Next: {STEPS[currentStep].label}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                boxShadow: '0 4px 18px rgba(34, 197, 94, 0.35)'
              }}
            >
              <span>{loading ? 'Deploying Venture...' : (isEditing ? 'Save Changes' : 'Publish Venture to Stackyr')}</span>
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
