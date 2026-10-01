import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function LeadForm() {
  const { t, isRtl } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', project: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', project: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-8 bg-surface-bright rounded-2xl shadow-sm border border-outline/10 text-center ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        <h3 className="text-xl font-headline font-bold mb-2">
          {isRtl ? 'تم استلام طلبك بنجاح!' : 'Request Received Successfully!'}
        </h3>
        <p className="text-on-surface-variant">
          {isRtl ? 'سيقوم أحد مستشارينا العقاريين بالتواصل معك في أقرب وقت.' : 'One of our real estate advisors will contact you shortly.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`p-8 bg-surface-bright rounded-2xl shadow-sm border border-outline/10 ${isRtl ? 'text-right' : 'text-left'}`}>
      <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">
        {isRtl ? 'طلب استشارة عقارية' : 'Request Real Estate Consultation'}
      </h3>
      <p className="text-sm text-on-surface-variant mb-6">
        {isRtl 
          ? 'سجل بياناتك الآن وسنقوم بالتواصل معك لتقديم أفضل العروض.' 
          : 'Register your details now and we will contact you with the best offers.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">{isRtl ? 'الاسم الكريم *' : 'Full Name *'}</label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder={isRtl ? 'اكتب اسمك هنا' : 'Enter your name'}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">{isRtl ? 'رقم الهاتف (مع الرمز الدولي) *' : 'Phone Number (with country code) *'}</label>
          <input 
            required
            type="tel" 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-left"
            placeholder="+968 1234 5678"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">{isRtl ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-left"
            placeholder="example@email.com"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">{isRtl ? 'بماذا أنت مهتم؟ (اختياري)' : 'What are you interested in? (Optional)'}</label>
          <input 
            type="text" 
            value={formData.project}
            onChange={e => setFormData({...formData, project: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder={isRtl ? 'مثال: فلل الواجهة البحرية، الاستثمار' : 'e.g. Waterfront Villas, Investment'}
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">{isRtl ? 'حدث خطأ، يرجى المحاولة لاحقاً.' : 'An error occurred, please try again later.'}</p>
        )}

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full py-4 rounded-xl bg-primary text-white font-bold tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-70 mt-2"
        >
          {status === 'loading' 
            ? (isRtl ? 'جاري الإرسال...' : 'Sending...') 
            : (isRtl ? 'تأكيد وإرسال' : 'Submit Request')}
        </button>
      </form>
    </div>
  );
}
