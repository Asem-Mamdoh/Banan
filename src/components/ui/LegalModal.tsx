import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const { t, isRtl } = useLanguage();
  const content = type === 'privacy' ? t.legal.privacy : t.legal.terms;

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-black/5"
          >
            {/* Header */}
            <div className={`p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl md:text-2xl font-headline font-bold text-[#004B63] tracking-tight">
                {content.title}
              </h2>
              <button
                onClick={onClose}
                className="size-10 flex items-center justify-center rounded-full bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all border border-slate-200 shadow-sm"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Body */}
            <div className={`p-6 md:p-10 overflow-y-auto custom-scrollbar ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="space-y-8 text-sm md:text-base text-slate-800 leading-relaxed font-body">
                {content.content.map((paragraph: string, idx: number) => (
                  <p key={idx} className="relative ps-6 before:absolute before:start-0 before:top-2 before:size-2 before:bg-[#004B63]/20 before:rounded-full">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Footer Stamp */}
              <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center gap-4 opacity-100">
                <div className="size-14 rounded-full border border-[#004B63]/10 flex items-center justify-center bg-[#004B63]/5 text-[#004B63]">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#004B63]/60 mb-1">
                    Banan Real Estate
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Oman • {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
