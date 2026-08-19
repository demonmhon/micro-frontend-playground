import React, { useState } from 'react';
import { useLocale, useMfeConfig, SupportedEnvironment } from '../context/MfeContext';
import { getHostTranslations } from '../locales';

interface GlobalConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalConfigModal: React.FC<GlobalConfigModalProps> = ({ isOpen, onClose }) => {
  const { locale } = useLocale();
  const { config, updateConfig } = useMfeConfig();
  const t = getHostTranslations(locale);

  const [baseUrl, setBaseUrl] = useState(config.apiBaseUrl);
  const [environment, setEnvironment] = useState<SupportedEnvironment>(config.environment);
  const [mockMode, setMockMode] = useState(config.mockMode);

  if (!isOpen) return null;

  const handleApplyPreset = (url: string, env: SupportedEnvironment) => {
    setBaseUrl(url);
    setEnvironment(env);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      apiBaseUrl: baseUrl.trim(),
      environment,
      mockMode
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="mfe-card"
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)',
          padding: '24px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mfe-flex-between" style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800 }}>{t.config.modalTitle}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {t.config.modalSubtitle}
            </p>
          </div>
          <button
            type="button"
            className="mfe-btn mfe-btn-outline mfe-btn-sm"
            onClick={onClose}
            style={{ borderRadius: '50%', width: '28px', height: '28px', padding: 0 }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick Presets */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {t.config.quickPresets}
            </span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`mfe-btn mfe-btn-sm ${environment === 'development' && baseUrl === 'http://localhost:8080/api/v1' ? 'mfe-btn-primary' : 'mfe-btn-secondary'}`}
                onClick={() => handleApplyPreset('http://localhost:8080/api/v1', 'development')}
              >
                💻 {t.config.envDev}
              </button>
              <button
                type="button"
                className={`mfe-btn mfe-btn-sm ${environment === 'staging' ? 'mfe-btn-primary' : 'mfe-btn-secondary'}`}
                onClick={() => handleApplyPreset('https://staging-api.example.com/api/v1', 'staging')}
              >
                🧪 {t.config.envStaging}
              </button>
              <button
                type="button"
                className={`mfe-btn mfe-btn-sm ${environment === 'production' ? 'mfe-btn-primary' : 'mfe-btn-secondary'}`}
                onClick={() => handleApplyPreset('https://api.example.com/api/v1', 'production')}
              >
                🚀 {t.config.envProd}
              </button>
            </div>
          </div>

          {/* Base URL Input */}
          <div className="mfe-form-group">
            <label className="mfe-label">{t.config.apiBaseUrlLabel}</label>
            <input
              type="text"
              className="mfe-input"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder={t.config.apiBaseUrlPlaceholder}
              required
            />
          </div>

          {/* Environment Selector */}
          <div className="mfe-form-group">
            <label className="mfe-label">{t.config.envLabel}</label>
            <select
              className="mfe-select"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as SupportedEnvironment)}
            >
              <option value="development">development</option>
              <option value="staging">staging</option>
              <option value="production">production</option>
            </select>
          </div>

          {/* Mock Mode Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: 'var(--item-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>{t.config.mockLabel}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {t.config.mockSub}
              </div>
            </div>
            <input
              type="checkbox"
              checked={mockMode}
              onChange={(e) => setMockMode(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
            />
          </div>

          {/* Active Preview */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-primary-light)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <strong>{t.config.activeEndpoint}</strong> <code style={{ color: 'var(--color-primary)' }}>{baseUrl}</code>
            </div>
            <span className={`mfe-badge ${mockMode ? 'mfe-badge-warning' : 'mfe-badge-success'}`}>
              <span className="mfe-badge-dot"></span>
              {mockMode ? 'Mock' : 'Live'}
            </span>
          </div>

          {/* Form Actions */}
          <div className="mfe-flex-gap" style={{ justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" className="mfe-btn mfe-btn-secondary" onClick={onClose}>
              {t.config.closeBtn}
            </button>
            <button type="submit" className="mfe-btn mfe-btn-primary">
              💾 {t.config.saveBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
