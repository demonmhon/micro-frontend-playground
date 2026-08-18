import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLocale = 'en' | 'th';
export type SupportedTheme = 'dark' | 'light';

export interface MfeContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  theme: SupportedTheme;
  setTheme: (theme: SupportedTheme) => void;
}

export const defaultMfeContextValue: MfeContextValue = {
  locale: 'en',
  setLocale: () => {},
  theme: 'dark',
  setTheme: () => {}
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
  value?: MfeContextValue;
}

export const MfeProvider: React.FC<MfeProviderProps> = ({
  children,
  initialLocale = 'en',
  initialTheme = 'dark',
  value
}) => {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale);
  const [theme, setTheme] = useState<SupportedTheme>(initialTheme);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const activeTheme = value ? value.theme : theme;
      document.documentElement.setAttribute('data-theme', activeTheme);
    }
  }, [theme, value]);

  const contextValue: MfeContextValue = value || {
    locale,
    setLocale,
    theme,
    setTheme
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
