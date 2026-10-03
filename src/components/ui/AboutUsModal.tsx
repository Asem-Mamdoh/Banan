import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  const { isRtl } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Global Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={onClose}
          className={`fixed top-4 md:top-8 ${isRtl ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-[210] size-12 md:size-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 group`}
        >
          <span className="material-symbols-outlined text-2xl transition-transform group-hover:rotate-90">close</span>
        </motion.button>

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-5xl h-[90vh] md:h-[80vh] overflow-y-auto bg-[#faf9f5] rounded-3xl shadow-2xl flex flex-col md:flex-row ${isRtl ? 'text-right' : 'text-left'}`}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
            <img 
              src="/hero-bg.webp" 
              alt="About BANAN" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-end p-8 md:p-12">
              <h2 className="text-white text-3xl md:text-5xl font-headline font-bold mb-2">BANAN</h2>
              <p className="text-secondary tracking-[0.2em] uppercase text-xs md:text-sm font-bold">Premium Real Estate Brokers</p>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl font-headline font-bold text-[#1b1c1a] mb-6">
              {isRtl ? "شريكك الموثوق في عالم العقارات الفاخرة" : "Your Trusted Partner in Luxury Real Estate"}
            </h3>
            
            <div className="space-y-6 text-[#1b1c1a]/70 leading-relaxed font-light text-sm md:text-base">
              <p>
                {isRtl 
                  ? "نحن في بنان العقارية لسنا مجرد مسوقين، بل نحن مستشارون وموجهون للنخبة. بصفتنا وسطاء عقاريين معتمدين لأكبر المطورين في سلطنة عُمان، نحن نكرس جهودنا لتوفير أفضل الفرص الاستثمارية وعقارات التملك الحر التي تمنحك إقامة دائمة وحياة استثنائية."
                  : "At BANAN Real Estate, we are more than just marketers; we are advisors and guides for the elite. As certified real estate brokers representing the biggest developers in the Sultanate of Oman, we are dedicated to securing the best investment opportunities and freehold properties that grant you permanent residency and an exceptional lifestyle."}
              </p>
              
              <p>
                {isRtl
                  ? "دورنا هو حمايتك وتمثيل مصالحك. نحن نتفاوض نيابة عنك، وننتقي المشاريع ذات العائد الاستثماري (ROI) المرتفع، ونوجهك خلال كل خطوة من خطوات الشراء دون أي تكلفة إضافية عليك، حيث أن عمولتنا تُدفع بالكامل من قبل المطورين العقاريين."
                  : "Our role is to protect and represent your interests. We negotiate on your behalf, handpick projects with high Return on Investment (ROI), and guide you through every step of the purchasing process at no additional cost to you, as our commission is fully covered by the developers."}
              </p>

              <div className="pt-6 border-t border-[#1b1c1a]/10 mt-8">
                <h4 className="text-secondary uppercase tracking-widest text-[10px] font-bold mb-4">
                  {isRtl ? "لماذا تختارنا؟" : "Why Choose Us?"}
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">verified_user</span>
                    <span className="font-bold text-[#1b1c1a]">{isRtl ? "الشفافية المطلقة في الأسعار والمشاريع" : "Absolute Transparency in Prices & Projects"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">trending_up</span>
                    <span className="font-bold text-[#1b1c1a]">{isRtl ? "تحليل دقيق لعوائد الاستثمار" : "Precise ROI Analysis"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">handshake</span>
                    <span className="font-bold text-[#1b1c1a]">{isRtl ? "دعم شامل لإنهاء إجراءات الإقامة" : "Comprehensive Support for Residency"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
