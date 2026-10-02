import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../translations';
import { client, getLocaleContent } from '../lib/sanity';
import { heroQuery, featuresQuery, mediaQuery, siteSettingsQuery, projectsSectionQuery, socialSectionQuery, projectsListQuery } from '../lib/sanity.queries';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.en;
  isRtl: boolean;
  cmsData: any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('banan_language');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });
  const [cmsRaw, setCmsRaw] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const fetchCmsData = async () => {
      console.log('Starting CMS data fetch...');
      
      // 1. Try to load from Local Storage instantly
      try {
        const cachedData = localStorage.getItem('banan_cms_cache');
        if (cachedData) {
          console.log('Loaded CMS data from local cache instantly 🚀');
          setCmsRaw(JSON.parse(cachedData));
          setIsLoading(false);
        }
      } catch (e) {
        console.warn('Cache read error:', e);
      }

      // 2. Fetch fresh data from Sanity in the background
      try {
        const [hero, features, media, settings, projectsSection, socialSection, projectsList] = await Promise.all([
          client.fetch(heroQuery),
          client.fetch(featuresQuery),
          client.fetch(mediaQuery),
          client.fetch(siteSettingsQuery),
          client.fetch(projectsSectionQuery),
          client.fetch(socialSectionQuery),
          client.fetch(projectsListQuery),
        ]);
        
        const freshData = { hero, features, media, settings, projectsSection, socialSection, projectsList };
        console.log('Fresh CMS data fetched from server successfully');
        
        // Update the app with fresh data (if anything changed)
        setCmsRaw(freshData);
        
        // Save the fresh data to Local Storage for the next visit
        try {
          localStorage.setItem('banan_cms_cache', JSON.stringify(freshData));
        } catch (e) {
          console.warn('Cache write error:', e);
        }
        
      } catch (error) {
        console.error('CRITICAL: Error fetching CMS data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCmsData();
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('banan_language', newLang);
      return newLang;
    });
  };

  const isRtl = language === 'ar';
  const t = translations[language];

  // Helper to resolve raw CMS data based on current language
  const cmsData = React.useMemo(() => {
    if (!cmsRaw) return null;

    const resolve = (obj: any) => {
      if (!obj || typeof obj !== 'object') return obj;
      if ('en' in obj && 'ar' in obj) return getLocaleContent(obj, language);
      
      const resolved: any = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        resolved[key] = resolve(obj[key]);
      }
      return resolved;
    };

    return resolve(cmsRaw);
  }, [cmsRaw, language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRtl, cmsData, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

