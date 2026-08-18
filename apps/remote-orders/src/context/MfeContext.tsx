import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SupportedLocale = 'en' | 'th';

export interface MfeContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const defaultMfeContextValue: MfeContextValue = {
  locale: 'en',
  setLocale: () => {}
};

// Guarantee singleton Context instance across independently bundled federated remotes
const globalScope = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : {};
export const MfeContext: React.Context<MfeContextValue> =
  (globalScope.__MFE_REACT_CONTEXT__ as React.Context<MfeContextValue>) ||
  (globalScope.__MFE_REACT_CONTEXT__ = createContext<MfeContextValue>(defaultMfeContextValue));

export interface MfeProviderProps {
  children: ReactNode;
  initialLocale?: SupportedLocale;
  value?: MfeContextValue;
}

export const MfeProvider: React.FC<MfeProviderProps> = ({ children, initialLocale = 'en', value }) => {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale);

  const contextValue: MfeContextValue = value || {
    locale,
    setLocale
  };

  return <MfeContext.Provider value={contextValue}>{children}</MfeContext.Provider>;
};

export const useMfe = (): MfeContextValue => useContext(MfeContext);
export const useLocale = () => {
  const { locale, setLocale } = useMfe();
  return { locale, setLocale };
};
