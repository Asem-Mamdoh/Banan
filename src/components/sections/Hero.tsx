import { useLanguage } from '../../context/LanguageContext';
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '../../constants';

export default function Hero() {
  const { t, isRtl } = useLanguage();

  const whatsappLink = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.social.whatsapp.general)}`;

  return (
    <section id="home" className="relative min-h-[85vh] flex flex-col justify-center pt-[120px] pb-[50px] overflow-hidden bg-[#faf9f5]">
      {/* Background with tonal layering */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#004B63]/10 to-transparent"></div>
        <div className="absolute bottom-0 start-0 w-full h-[60%] bg-gradient-to-t from-[#faf9f5] to-transparent"></div>
      </div>

      <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7" data-aos={isRtl ? 'fade-left' : 'fade-right'}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004B63]/5 border border-[#004B63]/10 mb-6 font-headline">
            <span className="w-1.5 h-1.5 rounded-full bg-[#004B63] animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#004B63]">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl lg:text-[84px] font-headline font-bold leading-[0.95] tracking-tight text-[#1b1c1a] mb-8">
            {t.hero.headline}
          </h1>
          
          <p className="text-lg text-[#1b1c1a]/70 max-w-lg mb-10 leading-relaxed">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#004B63] text-white px-8 py-4 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:bg-[#003a4d] transition-colors shadow-lg shadow-[#004B63]/20 inline-block"
            >
              {t.hero.cta}
            </a>
            <button className="flex items-center gap-3 px-8 py-4 rounded-sm font-bold text-[11px] uppercase tracking-widest text-[#1b1c1a] border border-[#1b1c1a]/10 hover:bg-[#1b1c1a]/5 transition-colors">
              <span className="material-symbols-outlined text-xl" data-icon="play_circle">play_circle</span>
              {t.hero.watchStory}
            </button>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-5 relative" data-aos={isRtl ? 'fade-right' : 'fade-left'}>
          <div className="relative aspect-[4/5] rounded-tl-[100px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" 
              alt="Oman Luxury Property" 
              className="object-cover w-full h-full scale-110 hover:scale-100 transition-transform duration-[2s]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
