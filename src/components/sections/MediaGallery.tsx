import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t, language, isRtl, cmsData } = useLanguage();
  
  const getLocalized = (field: any) => {
    if (!field) return undefined;
    if (typeof field === 'string') return field;
    return field[language] || field.en || field.ar;
  };

  const cmsMedia = cmsData?.media;
  const localFallbacks = [
    { image: '/assets/gallery/golf-1.jpg', title: 'Trump Golf Villas', category: 'Luxury Living' },
    { image: '/assets/gallery/amour-1.jpg', title: 'Amour Sans Deiour Villas', category: 'Premium Design' },
    { image: '/assets/gallery/nickelodeon-1.jpg', title: 'Nickelodeon AIDA', category: 'Modern Living' },
    { image: '/assets/gallery/hotel-1.jpg', title: 'Trump Hotel & Villa', category: 'Exquisite Hospitality' },
    { image: '/assets/gallery/coastal-1.jpg', title: 'Coastal Investment Villa', category: 'Oceanfront' },
    { image: '/assets/gallery/sunrise-1.jpg', title: 'Sunrise Haven', category: 'Nature & Peace' },
    { image: '/assets/gallery/fairway-1.jpg', title: 'Fairway Villas', category: 'Green Landscapes' },
    { image: '/assets/gallery/coastal-2.jpg', title: 'Exclusive Seafront', category: 'Beachfront' }
  ];
  const galleryItems = (cmsMedia?.photoGallery && cmsMedia.photoGallery.length > 0) ? cmsMedia.photoGallery : localFallbacks;
  const featuredVideo = cmsMedia?.featuredVideo;

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/').split('&')[0];
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
    }
    if (url.includes('vimeo.com/')) {
      return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    }
    return url;
  };

  const getOptimizedUrl = (url: string, w = 1200) => {
    if (!url) return '';
    if (url.includes('cdn.sanity.io')) return `${url}?auto=format&w=${w}&q=75`;
    return url;
  };

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
              {getLocalized(cmsMedia?.title) || t.media.title}
            </motion.span>
            <h2 className={`text-4xl md:text-5xl lg:text-7xl font-headline font-bold text-[#1b1c1a] tracking-tight px-2 md:px-0 ${isRtl ? 'leading-[1.4]' : 'leading-[1.1]'}`}>
              {getLocalized(featuredVideo?.title) || t.media.featured.title}
            </h2>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="relative flex bg-white p-1 rounded-full border border-black/5 shadow-inner">
              {[
                { id: 'videos', label: getLocalized(cmsMedia?.videoButtonText) || t.media.tabs.videos },
                { id: 'photos', label: getLocalized(cmsMedia?.photoButtonText) || t.media.tabs.photos }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative z-10 px-8 md:px-10 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 rounded-full ${
                    activeTab === tab.id ? 'text-white' : 'text-[#1b1c1a]/40 hover:text-[#1b1c1a]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
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
              {!isPlaying ? (
                <>
                  <img 
                    src={getOptimizedUrl(featuredVideo?.thumbnail || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80", 1920)} 
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2000ms] ease-out" 
                    alt="Cinema Gallery Hero"
                  />
                  
                  {/* Centered Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.button 
                      onClick={() => setIsPlaying(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="size-20 md:size-28 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white shadow-2xl relative group/play"
                    >
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse scale-110" />
                      <span className="material-symbols-outlined text-5xl md:text-6xl lg:text-7xl relative z-10 translate-x-[2px]">
                        play_arrow
                      </span>
                    </motion.button>
                  </div>

                  {/* Title Overlay (Bottom) */}
                  <div className="absolute inset-x-0 bottom-0 p-10 md:p-14 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="max-w-xl">
                      <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 drop-shadow-md">
                        {getLocalized(featuredVideo?.subtitle) || t.media.featured.subtitle}
                      </p>
                      <h3 className="text-white font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] drop-shadow-lg">
                        {getLocalized(featuredVideo?.title) || t.media.featured.title}
                      </h3>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-black relative flex items-center justify-center animate-in fade-in duration-500">
                  {featuredVideo?.videoFileUrl ? (
                    <video
                      src={featuredVideo.videoFileUrl}
                      className="w-full h-full object-cover md:object-contain"
                      controls
                      autoPlay
                      controlsList="nodownload"
                    />
                  ) : (
                    <iframe
                      src={getEmbedUrl(featuredVideo?.videoUrl || "") + (featuredVideo?.videoUrl ? "?autoplay=1" : "")}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-[60] bg-black/40 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {Array.isArray(galleryItems) && galleryItems.map((item: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 mb-4 md:mb-0 cursor-pointer"
                  onClick={() => setSelectedImage(item.image || (index === 0 ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" : "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1200&q=80"))}
                >
                  <img 
                    src={getOptimizedUrl(item.image || (index === 0 
                      ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                      : "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1200&q=80"
                    ), 1000)} 
                    loading="lazy"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1500ms]" 
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:via-black/20 transition-all duration-500" />
                  
                  <div className={`absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px] ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="text-secondary font-bold text-[9px] uppercase tracking-[0.3em] mb-3">
                      {getLocalized(item.category)}
                    </span>
                    <h4 className="text-white font-headline text-2xl md:text-3xl font-bold">
                      {getLocalized(item.title)}
                    </h4>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white/80">
                      <span className="material-symbols-outlined text-sm">fullscreen</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold">View Full Image</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors z-10"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Full size gallery image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
