import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '../../constants';

interface Feature {
  id: number;
  icon: string;
  watermark: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  whatsappMessage: string;
}

interface FeatureDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature | null;
}

export default function FeatureDrawer({ isOpen, onClose, feature }: FeatureDrawerProps) {
  const { t, isRtl } = useLanguage();

  if (!feature) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1b1c1a]/40 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-full max-w-[550px] bg-white z-[101] shadow-2xl overflow-hidden flex flex-col`}
          >
            {/* Watermark Icon */}
            <div className={`absolute top-20 ${isRtl ? 'left-[-10%]' : 'right-[-10%]'} pointer-events-none opacity-[0.03] select-none`}>
              <span className="material-symbols-outlined text-[400px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {feature.watermark}
              </span>
            </div>

            {/* Header */}
            <div className="relative p-8 md:p-12 pb-0 flex items-center justify-between">
              <button 
                onClick={onClose}
                className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1c1a]/40 hover:text-[#004B63] transition-colors"
              >
                <span className={`material-symbols-outlined text-lg transition-transform group-hover:scale-110 ${isRtl ? 'rotate-0' : 'rotate-180'}`}>
                  arrow_right_alt
                </span>
                {t.features.back}
              </button>

              <div className="w-12 h-12 flex items-center justify-center bg-[#004B63]/5 text-[#004B63] rounded-full">
                <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-y-auto px-8 md:px-12 py-12 custom-scrollbar">
              <div className="max-w-2xl">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#004B63] mb-4 font-headline">
                  {feature.subtitle}
                </div>
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-[#1b1c1a] mb-12 leading-tight">
                  {feature.title}
                </h2>

                <div className="space-y-8">
                  {feature.details.map((paragraph, idx) => (
                    <p 
                      key={idx} 
                      className="text-lg md:text-xl text-[#1b1c1a]/70 leading-relaxed font-light first-letter:text-3xl first-letter:font-bold first-letter:text-[#004B63]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="relative p-8 md:p-12 pt-0 bg-gradient-to-t from-white via-white to-transparent">
              <a
                href={`${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  (t.social.whatsapp.featureInquiry as string).replace('{feature}', feature.title)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between w-full p-6 bg-[#004B63] text-white overflow-hidden rounded-sm transition-transform active:scale-[0.98]"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/20 to-secondary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative flex flex-col items-start gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Expert Consultation
                  </span>
                  <span className="text-lg font-headline font-medium">
                    {t.features.consultExpert}
                  </span>
                </div>
                
                <div className="relative w-12 h-12 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined group-hover:animate-pulse">chat</span>
                </div>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
