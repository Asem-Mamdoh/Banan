import { useLanguage } from '../../context/LanguageContext';
import FeatureDrawer from '../ui/FeatureDrawer';

interface FeaturesProps {
  selectedFeature: any;
  onSelectFeature: (feature: any) => void;
}

export default function Features({ selectedFeature, onSelectFeature }: FeaturesProps) {
  const { t, isRtl } = useLanguage();
  const features = t.features.items;

  return (
    <section className="section-padding bg-[#faf9f5]">
      <div className="container-custom">
        <div className="max-w-3xl mb-20" data-aos="fade-up">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#004B63] mb-4 font-headline">
            {t.features.badge}
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-[#1b1c1a] mb-6 tracking-tight ${isRtl ? 'leading-[1.2]' : ''}`}>
            {t.features.title}
          </h2>
          <p className="text-lg text-[#1b1c1a]/60 leading-relaxed">
            {t.features.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature: any, index: number) => (
            <div 
              key={feature.id} 
              className="group p-8 bg-white border border-[#1b1c1a]/5 hover:border-[#004B63]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#004B63]/5 rounded-sm"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#004B63]/5 text-[#004B63] rounded-sm mb-8 group-hover:bg-[#004B63] group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-2xl" data-icon={feature.icon}>{feature.icon}</span>
              </div>
              
              <h3 className="text-xl font-headline font-bold text-[#1b1c1a] mb-2">
                {feature.title}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#004B63]/40 mb-4 font-headline">
                {feature.subtitle}
              </p>
              <p className="text-[#1b1c1a]/60 leading-relaxed text-sm">
                {feature.description}
              </p>

              <div className="mt-8 pt-8 border-t border-[#1b1c1a]/5">
                <button 
                  onClick={() => onSelectFeature(feature)}
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#004B63] hover:text-secondary transition-all duration-300 group/link relative"
                >
                  <span className="relative">
                    {t.features.learnMore}
                    <span className="absolute -bottom-1 inset-x-0 h-[1px] bg-secondary scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left rtl:origin-right duration-300"></span>
                  </span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-300 group-hover/link:ps-1 ${isRtl ? 'rotate-180' : ''}`}>
                    {isRtl ? 'chevron_left' : 'chevron_right'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FeatureDrawer 
        isOpen={selectedFeature !== null}
        onClose={() => onSelectFeature(null)}
        feature={selectedFeature}
      />
    </section>
  );
}
