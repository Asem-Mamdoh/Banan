import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '../../constants';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import ReactMarkdown from 'react-markdown';

interface ProjectModalProps {
  project: any | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset states when project changes
  useEffect(() => {
    setCurrentSlide(0);
    setIsZoomed(false);
  }, [project]);

  // Global Escape Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, onClose]);

  // Double-tap for mobile toggle zoom
  const [lastTap, setLastTap] = useState(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      setIsZoomed(!isZoomed);
    }
    setLastTap(now);
  };

  // Body scroll lock
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const title = isRtl ? project.titleAr : project.titleEn;
  const description = isRtl ? project.descriptionAr : project.descriptionEn;
  const typeSpec = isRtl ? project.specs?.typeAr : project.specs?.typeEn;
  const galleryImages = project.gallery?.length ? project.gallery : [project.mainImageUrl].filter(Boolean);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const highResUrl = (url: string) => {
    if (url && url.includes('images.unsplash.com')) {
      return url.replace('w=1200', 'w=2400').replace('q=80', 'q=100');
    }
    return url;
  };

  const whatsappMessage = t.social.whatsapp.projectInquiry.replace('{project}', title);
  const whatsappLink = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Global Close Button (Outside Container) */}
        {!isZoomed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={onClose}
            className={`fixed top-4 md:top-8 ${isRtl ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-[110] size-12 md:size-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 group`}
          >
            <span className="material-symbols-outlined text-2xl transition-transform group-hover:rotate-90">close</span>
          </motion.button>
        )}

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-6xl h-full max-h-[85vh] overflow-hidden bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row"
        >
          {/* Left/Top: Image Carousel */}
          <div className="relative w-full md:w-[60%] h-[350px] md:h-auto bg-neutral-100 overflow-hidden group/carousel mb-4 md:mb-0">
            {/* Preload adjacent images for instant switching */}
            <div className="hidden">
              <img src={galleryImages[(currentSlide + 1) % galleryImages.length] ? `${galleryImages[(currentSlide + 1) % galleryImages.length]}?auto=format&w=2000&q=90` : ''} alt="preload next" />
              <img src={galleryImages[(currentSlide - 1 + galleryImages.length) % galleryImages.length] ? `${galleryImages[(currentSlide - 1 + galleryImages.length) % galleryImages.length]}?auto=format&w=2000&q=90` : ''} alt="preload prev" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={galleryImages[currentSlide] ? `${galleryImages[currentSlide]}?auto=format&w=2000&q=90` : ''}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setIsZoomed(true)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50) prevSlide();
                  else if (info.offset.x < -50) nextSlide();
                }}
                className="absolute inset-0 w-full h-full object-cover cursor-zoom-in pointer-events-auto"
              />
            </AnimatePresence>

            {/* Zoom Icon Hint */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity duration-300 flex items-center gap-2 pointer-events-none z-10">
              <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Navigation Arrows (Visible on mobile, hover on desktop) */}
            <div className={`absolute inset-0 flex items-center justify-between p-4 md:p-6 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity duration-500 pointer-events-none z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="size-10 md:size-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-lg"
              >
                <span className="material-symbols-outlined">{isRtl ? 'chevron_right' : 'chevron_left'}</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="size-10 md:size-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-lg"
              >
                <span className="material-symbols-outlined">{isRtl ? 'chevron_left' : 'chevron_right'}</span>
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none z-10">
              {galleryImages.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 rounded-full transition-all duration-500 pointer-events-auto ${
                    idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right/Bottom: Info Section */}
          <div className="w-full md:w-[40%] p-10 md:p-14 overflow-y-auto bg-[#faf9f5] flex flex-col">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[1px] w-10 bg-secondary/40"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
                {project.category}
              </span>
            </div>

            <h2 className="mb-6 text-3xl md:text-4xl font-headline font-bold text-[#1b1c1a] leading-tight">
              {title}
            </h2>

            {/* Specs Grid */}
            <div className={`mb-8 grid grid-cols-3 gap-2 md:gap-4 border-y border-black/5 py-8 md:py-10 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary mb-2 md:mb-3">square_foot</span>
                <span className="text-[9px] uppercase tracking-widest text-[#1b1c1a]/40 mb-1">{t.projects.modal.area}</span>
                <span className="text-[10px] md:text-xs font-bold text-[#1b1c1a]">{project.specs?.area || '-'}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary mb-2 md:mb-3">bed</span>
                <span className="text-[9px] uppercase tracking-widest text-[#1b1c1a]/40 mb-1">{t.projects.modal.bedrooms}</span>
                <span className="text-[10px] md:text-xs font-bold text-[#1b1c1a]">{project.specs?.bedrooms || '-'}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary mb-2 md:mb-3">apartment</span>
                <span className="text-[9px] uppercase tracking-widest text-[#1b1c1a]/40 mb-1">{t.projects.modal.type}</span>
                <span className="text-[10px] md:text-xs font-bold text-[#1b1c1a]">{typeSpec || '-'}</span>
              </div>
            </div>

            {description && (
              <div className="mb-10 relative bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
                <div className={`absolute top-0 ${isRtl ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full'} w-1.5 h-full bg-secondary`}></div>
                <div className="prose prose-sm md:prose-base prose-neutral max-w-none prose-headings:text-primary prose-headings:font-headline prose-p:text-[#1b1c1a]/80 prose-p:font-light prose-p:leading-relaxed prose-a:text-secondary prose-strong:text-[#1b1c1a]">
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Units & Prices Table */}
            {project.units && project.units.length > 0 && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-black/10">
                <div className="bg-[#1b1c1a] px-4 py-3 text-center">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                    {t.projects.modal.availableUnits}
                  </h4>
                </div>
                <div className="divide-y divide-black/5 bg-white">
                  {project.units.map((unit: any, idx: number) => {
                    const unitType = isRtl ? unit.typeAr : unit.typeEn;
                    return (
                      <div key={idx} className="flex items-center justify-between p-4 text-sm hover:bg-black/[0.02] transition-colors">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1b1c1a]">{unitType}</span>
                          {unit.area && <span className="text-[10px] text-[#1b1c1a]/50 mt-1">{unit.area}</span>}
                        </div>
                        {unit.priceOMR ? (
                          <div className="text-right">
                            <span className="text-[10px] uppercase tracking-widest text-[#1b1c1a]/50 block mb-1">
                              {t.projects.modal.price}
                            </span>
                            <span className="font-bold text-secondary">{unit.priceOMR.toLocaleString()} OMR</span>
                          </div>
                        ) : (
                          <div className="text-right">
                            <span className="font-bold text-[#1b1c1a]/50 text-sm block mt-2">
                              {isRtl ? 'السعر حسب الطلب' : 'Price on Request'}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-auto pt-4 md:pt-6 flex flex-col gap-3">
              {project.brochureUrl && (
                <a
                  href={`${project.brochureUrl}?dl=`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-4 w-full py-4 md:py-5 border-2 border-[#1b1c1a] text-[#1b1c1a] bg-transparent overflow-hidden rounded-2xl font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-[#1b1c1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative material-symbols-outlined text-xl group-hover:text-white transition-colors duration-500">picture_as_pdf</span>
                  <span className="relative text-[10px] md:text-xs group-hover:text-white transition-colors duration-500">{t.projects.modal.downloadBrochure}</span>
                </a>
              )}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-4 w-full py-5 md:py-6 bg-primary text-white overflow-hidden rounded-2xl font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative material-symbols-outlined text-xl group-hover:animate-bounce">chat</span>
                <span className="relative text-[10px] md:text-xs">{t.projects.modal.inquiry}</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Zoom Overlay (Professional Full Screen) */}
        <Lightbox
          open={isZoomed}
          close={() => setIsZoomed(false)}
          index={currentSlide}
          slides={galleryImages.map((url: string) => ({ src: highResUrl(url) }))}
          plugins={[Zoom]}
          zoom={{ maxZoomPixelRatio: 3 }}
          on={{ view: ({ index: currentIndex }) => setCurrentSlide(currentIndex) }}
          carousel={{ padding: 0, spacing: 0, imageFit: 'contain' }}
        />
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
