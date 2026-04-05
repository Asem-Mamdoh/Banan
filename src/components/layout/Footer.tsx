import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onShowCookies: () => void;
  onOpenFeature: (id: number) => void;
}

export default function Footer({ onOpenLegal, onShowCookies, onOpenFeature }: FooterProps) {
  const { t, isRtl } = useLanguage();

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="contact" className={`bg-[#1b1c1a] text-white/50 py-[50px] border-t border-white/5 font-body ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <img 
              src="/logo.png" 
              alt="BANAN Real Estate Logo" 
              className="h-16 md:h-20 w-auto mb-8"
            />
            <p className="max-w-md text-lg leading-relaxed mb-12">
              {t.footer.description}
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4 items-center">
              {[
                { 
                  id: 'instagram', 
                  icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>, 
                  label: t.footer.social.instagram 
                },
                { 
                  id: 'facebook', 
                  icon: <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.498v-9.294h-3.13v-3.622h3.13v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>, 
                  label: t.footer.social.facebook 
                },
                { 
                  id: 'tiktok', 
                  icon: <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2s-3.45 0-3.45 0v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.83 6.83 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>, 
                  label: t.footer.social.tiktok 
                }
              ].map((social) => (
                <a 
                  key={social.id}
                  href="#" 
                  className="flex items-center gap-3 group text-white/40 hover:text-secondary transition-all duration-300"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full border border-white/5 group-hover:border-secondary transition-all duration-300 flex-shrink-0">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-5 h-5 opacity-80 group-hover:opacity-100"
                    >
                      {social.icon}
                    </svg>
                  </div>
                  <span className="text-[10px] font-headline font-bold uppercase tracking-[0.25em] opacity-60 group-hover:opacity-100 group-hover:text-secondary transition-all duration-300">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-headline text-sm font-bold uppercase tracking-widest mb-8">{t.footer.quickLinks}</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={handleScrollToProjects}
                  className="text-sm hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  {t.footer.links.properties}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenFeature(2)}
                  className="text-sm hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  {t.footer.links.residency}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenFeature(3)}
                  className="text-sm hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  {t.footer.links.roi}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-headline text-sm font-bold uppercase tracking-widest mb-8">{t.footer.legal}</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onOpenLegal('privacy')}
                  className="text-sm hover:text-white transition-colors text-left rtl:text-right"
                >
                  {t.footer.links.privacy}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal('terms')}
                  className="text-sm hover:text-white transition-colors text-left rtl:text-right"
                >
                  {t.footer.links.terms}
                </button>
              </li>
              <li>
                <button 
                  onClick={onShowCookies}
                  className="text-sm hover:text-white transition-colors text-left rtl:text-right uppercase tracking-widest font-bold font-headline"
                >
                  {t.footer.links.cookies}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] uppercase tracking-widest font-bold font-headline opacity-30">{t.footer.rights}</p>
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold font-headline">
            <span className="text-white/40">{t.footer.crafted}</span>
            <a 
              href="https://linkedin.com/in/assem-mamdouh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-secondary transition-colors duration-300"
            >
              {t.footer.signature}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
