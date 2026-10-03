import React, { useState, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from './components/ui/GoogleAnalytics';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';

const Features = React.lazy(() => import('./components/sections/Features'));
const MediaGallery = React.lazy(() => import('./components/sections/MediaGallery'));
const ProjectsGallery = React.lazy(() => import('./components/sections/ProjectsGallery'));
const SocialPulse = React.lazy(() => import('./components/sections/SocialPulse'));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection'));
const Footer = React.lazy(() => import('./components/layout/Footer'));
const ScrollToTop = React.lazy(() => import('./components/ui/ScrollToTop'));
const LegalModal = React.lazy(() => import('./components/ui/LegalModal'));
const CookieConsent = React.lazy(() => import('./components/ui/CookieConsent'));
const SalesAgentChat = React.lazy(() => import('./components/ui/SalesAgentChat'));
const AboutUsModal = React.lazy(() => import('./components/ui/AboutUsModal'));

import { useLanguage } from './context/LanguageContext';
import { ChatErrorBoundary } from './components/ui/ChatErrorBoundary';

const App = () => {
  const { t } = useLanguage();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({
    isOpen: false,
    type: 'privacy'
  });
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const openLegal = (type: 'privacy' | 'terms') => setLegalModal({ isOpen: true, type });

  const handleOpenFeatureById = (id: number) => {
    const feature = t.features.items.find((item: any) => item.id === id);
    if (feature) {
      setSelectedFeature(feature);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container relative">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#004B63] border-t-transparent animate-spin"></div></div>}>
          <Features 
            selectedFeature={selectedFeature}
            onSelectFeature={setSelectedFeature}
          />
          <MediaGallery />
          <ProjectsGallery />
          <SocialPulse />
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer 
          onOpenLegal={openLegal} 
          onShowCookies={() => setShowCookieConsent(true)}
          onOpenFeature={handleOpenFeatureById}
          onOpenAboutUs={() => setShowAboutUs(true)}
        />
        <ScrollToTop />
        <LegalModal 
          isOpen={legalModal.isOpen} 
          onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))} 
          type={legalModal.type} 
        />
        <AboutUsModal
          isOpen={showAboutUs}
          onClose={() => setShowAboutUs(false)}
        />
        <CookieConsent 
          forceShow={showCookieConsent} 
          onClose={() => setShowCookieConsent(false)}
          onOpenSettings={() => openLegal('privacy')} 
        />
        <ChatErrorBoundary>
          <SalesAgentChat />
        </ChatErrorBoundary>
      </Suspense>
      <Analytics />
      <GoogleAnalytics />
    </div>
  );
};

export default App;
