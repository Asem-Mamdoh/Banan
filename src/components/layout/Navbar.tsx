import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '../../constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleLanguage, t, isRtl } = useLanguage();

  const whatsappLink = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.social.whatsapp.general)}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="container-custom flex items-center justify-between h-20 md:h-24">
        <a href="/" className="flex items-center bg-transparent">
          <img src="/logo.png" alt="BANAN Real Estate" className="h-12 md:h-16 w-auto object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <a href="#home" className="text-sm font-headline font-bold uppercase tracking-widest hover:text-secondary transition-all">
            {t.nav.home}
          </a>
          <a href="#projects" className="text-sm font-headline font-bold uppercase tracking-widest hover:text-secondary transition-all">
            {t.nav.projects}
          </a>
          <a href="#media" className="text-sm font-headline font-bold uppercase tracking-widest hover:text-secondary transition-all">
            {t.nav.media}
          </a>
          <a href="#contact" className="text-sm font-headline font-bold uppercase tracking-widest hover:text-secondary transition-all">
            {t.nav.contact}
          </a>
        </div>

        {/* Global Controls */}
        <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <button 
            onClick={toggleLanguage}
            className="text-[12px] font-bold uppercase tracking-[0.2em] px-4 py-2 hover:text-secondary transition-colors"
          >
            {t.nav.langToggle}
          </button>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-secondary text-on-secondary px-8 py-3.5 rounded-sm font-display text-[10px] font-bold tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20"
          >
            {t.nav.contactBtn}
          </a>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface border-t border-white/5 py-10 flex flex-col items-center gap-8 shadow-2xl backdrop-blur-2xl">
          <a href="#home" onClick={() => setIsOpen(false)} className="text-lg font-headline font-bold uppercase tracking-widest">{t.nav.home}</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-lg font-headline font-bold uppercase tracking-widest">{t.nav.projects}</a>
          <a href="#media" onClick={() => setIsOpen(false)} className="text-lg font-headline font-bold uppercase tracking-widest">{t.nav.media}</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-headline font-bold uppercase tracking-widest">{t.nav.contact}</a>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-on-secondary px-10 py-4 rounded-sm font-display text-xs font-bold tracking-[0.2em] uppercase mt-4"
          >
            {t.nav.contactBtn}
          </a>
        </div>
      )}
    </nav>
  );
}
