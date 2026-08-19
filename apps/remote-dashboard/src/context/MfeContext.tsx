import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLocale = 'en' | 'th';
export type SupportedTheme = 'dark' | 'light';
export type SupportedEnvironment = 'development' | 'staging' | 'production';

export interface MfeGlobalConfig {
  apiBaseUrl: string;
  environment: SupportedEnvironment;
  mockMode: boolean;
}

export interface MfeContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  theme: SupportedTheme;
  setTheme: (theme: SupportedTheme) => void;
  config: MfeGlobalConfig;
  updateConfig: (patch: Partial<MfeGlobalConfig>) => void;
}

export const defaultMfeGlobalConfig: MfeGlobalConfig = {
  apiBaseUrl: 'http://localhost:8080/api/v1',
  environment: 'development',
  mockMode: true
};

export const defaultMfeContextValue: MfeContextValue = {
  locale: 'en',
  setLocale: () => {},
  theme: 'dark',
  setTheme: () => {},
  config: defaultMfeGlobalConfig,
  updateConfig: () => {}
};

// Guarantee singleton Context instance across independently bundled federated remotes
const globalScope = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : {};
export const MfeContext: React.Context<MfeContextValue> =
  (globalScope.__MFE_REACT_CONTEXT__ as React.Context<MfeContextValue>) ||
  (globalScope.__MFE_REACT_CONTEXT__ = createContext<MfeContextValue>(defaultMfeContextValue));

export interface MfeProviderProps {
  children: ReactNode;
  initialLocale?: SupportedLocale;
  initialTheme?: SupportedTheme;
  initialConfig?: Partial<MfeGlobalConfig>;
  value?: MfeContextValue;
}

export const MfeProvider: React.FC<MfeProviderProps> = ({
  children,
  initialLocale = 'en',
  initialTheme = 'dark',
  initialConfig,
  value
}) => {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale);
  const [theme, setTheme] = useState<SupportedTheme>(initialTheme);
  const [config, setConfig] = useState<MfeGlobalConfig>({
    ...defaultMfeGlobalConfig,
    ...initialConfig
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const activeTheme = value ? value.theme : theme;
      document.documentElement.setAttribute('data-theme', activeTheme);
    }
  }, [theme, value]);

  const updateConfig = (patch: Partial<MfeGlobalConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const contextValue: MfeContextValue = value || {
    locale,
    setLocale,
    theme,
    setTheme,
    config,
    updateConfig
  };

  return <MfeContext.Provider value={contextValue}>{children}</MfeContext.Provider>;
};

export const useMfe = (): MfeContextValue => useContext(MfeContext);

export const useLocale = () => {
  const { locale, setLocale } = useMfe();
  return { locale, setLocale };
};

export const useTheme = () => {
  const { theme, setTheme } = useMfe();
  return { theme, setTheme };
};

export const useMfeConfig = () => {
  const { config, updateConfig } = useMfe();
  return { config, updateConfig };
};
