import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
  const { t, isRtl } = useLanguage();
  const galleryItems = t.media.gallery;

  return (
    <section id="media" className="section-padding bg-[#faf9f6] relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-6"
            >
              {t.media.title}
            </motion.span>
            <h2 className={`text-4xl md:text-5xl lg:text-7xl font-headline font-bold text-[#1b1c1a] tracking-tight px-2 md:px-0 ${isRtl ? 'leading-[1.4]' : 'leading-[1.1]'}`}>
              {t.media.featured.title}
            </h2>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="relative flex bg-white p-1 rounded-full border border-black/5 shadow-inner">
              {['videos', 'photos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`relative z-10 px-8 md:px-10 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 rounded-full ${
                    activeTab === tab ? 'text-white' : 'text-[#1b1c1a]/40 hover:text-[#1b1c1a]'
                  }`}
                >
                  {(t.media.tabs as any)[tab]}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="active-tab-bg"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20 border border-white/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'videos' ? (
            <motion.div 
              key="videos"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-video rounded-3xl overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-black"
            >
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2000ms] ease-out" 
                alt="Cinema Gallery Hero"
              />
              
              {/* Centered Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="size-20 md:size-28 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white shadow-2xl relative group/play"
                >
                  {/* Pulsing Outer Ring */}
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse scale-110" />
                  
                  <span className="material-symbols-outlined text-5xl md:text-6xl lg:text-7xl relative z-10 translate-x-[2px]">
                    play_arrow
                  </span>
                </motion.button>
              </div>

              {/* Title Overlay (Bottom) */}
              <div className="absolute inset-x-0 bottom-0 p-10 md:p-14 z-10">
                <div className="max-w-xl">
                  <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
                    {t.media.featured.subtitle}
                  </p>
                  <h3 className="text-white font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    {t.media.featured.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {Array.isArray(galleryItems) && galleryItems.map((item: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 mb-4 md:mb-0"
                >
                  <img 
                    src={index === 0 
                      ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                      : "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1200&q=80"
                    } 
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1500ms]" 
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:via-black/20 transition-all duration-500" />
                  
                  <div className={`absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px] ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="text-secondary font-bold text-[9px] uppercase tracking-[0.3em] mb-3">
                      {item.category}
                    </span>
                    <h4 className="text-white font-headline text-2xl md:text-3xl font-bold">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
