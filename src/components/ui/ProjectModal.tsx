import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../data/projects';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '../../constants';

interface ProjectModalProps {
  project: Project | null;
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

  const projectInfo = (t.projects.items as any)[project.translationKey];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % project.gallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  const highResUrl = (url: string) => {
    if (url.includes('images.unsplash.com')) {
      return url.replace('w=1200', 'w=2400').replace('q=80', 'q=100');
    }
    return url;
  };

  const whatsappMessage = t.social.whatsapp.projectInquiry.replace('{project}', projectInfo.title);
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
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentSlide}
                layoutId={`project-image-${project.id}-${currentSlide}`}
                src={project.gallery[currentSlide]}
                initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 100 : -100 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                whileTap={{ scale: 0.98 }}
                onTap={() => setIsZoomed(true)}
                onTouchEnd={handleDoubleTap}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50) prevSlide();
                  else if (info.offset.x < -50) nextSlide();
                }}
                className="absolute inset-0 w-full h-full object-cover cursor-zoom-in group-hover/carousel:scale-105 transition-transform duration-700 pointer-events-auto"
              />
            </AnimatePresence>

            {/* Zoom Icon Hint */}
            <div className="absolute top-6 right-6 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 flex items-center gap-2 pointer-events-none">
              <div className="bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Navigation Arrows (Desktop Only) */}
            <div className={`hidden md:flex absolute inset-0 items-center justify-between p-6 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500 pointer-events-none ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={prevSlide}
                className="size-12 flex items-center justify-center bg-white/10 hover:bg-white/30 text-white rounded-full backdrop-blur-md border border-white/10 transition-all pointer-events-auto"
              >
                <span className="material-symbols-outlined">{isRtl ? 'chevron_right' : 'chevron_left'}</span>
              </button>
              <button
                onClick={nextSlide}
                className="size-12 flex items-center justify-center bg-white/10 hover:bg-white/30 text-white rounded-full backdrop-blur-md border border-white/10 transition-all pointer-events-auto"
              >
                <span className="material-symbols-outlined">{isRtl ? 'chevron_left' : 'chevron_right'}</span>
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
              {project.gallery.map((_, idx) => (
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
                {projectInfo.category}
              </span>
            </div>

            <h2 className="mb-6 text-3xl md:text-4xl font-headline font-bold text-[#1b1c1a] leading-tight">
              {projectInfo.title}
            </h2>

            {/* Specs Grid */}
            <div className={`mb-8 grid grid-cols-3 gap-2 md:gap-4 border-y border-black/5 py-8 md:py-10 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary mb-2 md:mb-3">square_foot</span>
                <span className="text-[9px] uppercase tracking-widest text-[#1b1c1a]/40 mb-1">{t.projects.modal.area}</span>
                <span className="text-[10px] md:text-xs font-bold text-[#1b1c1a]">{project.specs.area} sqm</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary mb-2 md:mb-3">bed</span>
                <span className="text-[9px] uppercase tracking-widest text-[#1b1c1a]/40 mb-1">{t.projects.modal.bedrooms}</span>
                <span className="text-[10px] md:text-xs font-bold text-[#1b1c1a]">{project.specs.bedrooms}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary mb-2 md:mb-3">apartment</span>
                <span className="text-[9px] uppercase tracking-widest text-[#1b1c1a]/40 mb-1">{t.projects.modal.type}</span>
                <span className="text-[10px] md:text-xs font-bold text-[#1b1c1a]">{project.specs.type}</span>
              </div>
            </div>

            <div className="prose prose-sm mb-10 overflow-hidden">
              <p className="text-sm md:text-base leading-relaxed text-[#1b1c1a]/70 font-light">
                {projectInfo.fullDescription}
              </p>
            </div>

            <div className="mt-auto pt-4 md:pt-8">
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

        {/* Zoom Overlay (Full Screen) */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black flex items-center justify-center cursor-zoom-out"
              onClick={() => setIsZoomed(false)}
            >
              {/* Zoom Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                }}
                className={`fixed top-8 ${isRtl ? 'left-8' : 'right-8'} z-[160] size-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl border border-white/20 transition-all`}
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              <motion.div
                className="relative w-full h-full flex items-center justify-center p-4 md:p-20"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <motion.img
                  layoutId={`project-image-${project.id}-${currentSlide}`}
                  src={highResUrl(project.gallery[currentSlide])}
                  className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing shadow-2xl"
                  drag
                  dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>

              {/* Mobile Hint */}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center md:hidden pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white/60 text-[10px] uppercase tracking-widest">
                  {isRtl ? 'اسحب للاستكشاف • اضغط مرتين للإغلاق' : 'Drag to explore • Double-tap to close'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
