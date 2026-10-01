import { useLanguage } from '../../context/LanguageContext';
import LeadForm from '../ui/LeadForm';

export default function ContactSection() {
  const { isRtl } = useLanguage();

  return (
    <section id="contact" className="section-padding bg-surface">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">
            {isRtl ? 'ابدأ رحلة استثمارك' : 'Start Your Investment Journey'}
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            {isRtl 
              ? 'تواصل معنا الآن للحصول على استشارة عقارية مجانية، ومعرفة أحدث المشاريع والعروض الحصرية المتاحة.'
              : 'Contact us now to get a free real estate consultation, and learn about the latest projects and exclusive offers available.'}
          </p>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
