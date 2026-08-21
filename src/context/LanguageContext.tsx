'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

export type Locale = 'es' | 'en';
export type Translations = typeof es;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    // Check saved preference in localStorage or navigator language
    const saved = localStorage.getItem('arbizu_labs_locale') as Locale | null;
    if (saved === 'es' || saved === 'en') {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'en') {
        setLocaleState('en');
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('arbizu_labs_locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  const toggleLanguage = () => {
    const next = locale === 'es' ? 'en' : 'es';
    setLocale(next);
  };

  const t = locale === 'es' ? es : en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
