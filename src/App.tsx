import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import MediaGallery from './components/sections/MediaGallery';
import ProjectsGallery from './components/sections/ProjectsGallery';
import SocialPulse from './components/sections/SocialPulse';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import LegalModal from './components/ui/LegalModal';
import CookieConsent from './components/ui/CookieConsent';
import { useLanguage } from './context/LanguageContext';

const App = () => {
  const { t } = useLanguage();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({
    isOpen: false,
    type: 'privacy'
  });
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
        <Features 
          selectedFeature={selectedFeature}
          onSelectFeature={setSelectedFeature}
        />
        <MediaGallery />
        <ProjectsGallery />
        <SocialPulse />
      </main>
      <Footer 
        onOpenLegal={openLegal} 
        onShowCookies={() => setShowCookieConsent(true)}
        onOpenFeature={handleOpenFeatureById}
      />
      <ScrollToTop />
      
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))} 
        type={legalModal.type} 
      />

      <CookieConsent 
        forceShow={showCookieConsent} 
        onClose={() => setShowCookieConsent(false)}
        onOpenSettings={() => openLegal('privacy')} 
      />
    </div>
  );
};

export default App;
