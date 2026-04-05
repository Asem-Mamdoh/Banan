import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface CookieConsentProps {
  onOpenSettings: () => void;
  forceShow?: boolean;
  onClose?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenSettings, forceShow, onClose }) => {
  const { t, isRtl } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent && !forceShow) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  useEffect(() => {
    if (forceShow) setIsVisible(true);
  }, [forceShow]);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className={`bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${isRtl ? 'md:flex-row-reverse text-right' : 'md:flex-row text-left'}`}>
              
              <div className="flex items-center gap-4">
                <div className="size-10 shrink-0 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">cookie</span>
                </div>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-body">
                  {t.cookies.banner}
                </p>
              </div>

              <div className={`flex items-center gap-4 w-full md:w-auto ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={onOpenSettings}
                  className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide underline decoration-white/20 underline-offset-4"
                >
                  {t.cookies.settings}
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-8 py-2.5 bg-secondary text-on-secondary rounded-full font-display text-sm font-bold tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  {t.cookies.accept}
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
