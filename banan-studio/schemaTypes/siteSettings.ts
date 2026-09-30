import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'اسم العلامة التجارية',
      type: 'localeString',
    }),
    defineField({
      name: 'footerDescription',
      title: 'وصف الفوتر (التذييل)',
      type: 'localeText',
    }),
    defineField({
      name: 'socialLinks',
      title: 'روابط السوشيال ميديا',
      type: 'object',
      fields: [
        defineField({name: 'instagram', title: 'رابط إنستجرام', type: 'url'}),
        defineField({name: 'facebook', title: 'رابط فيسبوك', type: 'url'}),
        defineField({name: 'tiktok', title: 'رابط تيك توك', type: 'url'}),
        defineField({name: 'whatsappNumber', title: 'رقم الواتساب (مثال 968XXXXXXXX)', type: 'string'}),
      ]
    }),
    defineField({
      name: 'legalContent',
      title: 'المحتوى القانوني',
      type: 'object',
      fields: [
        defineField({
          name: 'privacyPolicy',
          title: 'سياسة الخصوصية',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'localeString'}),
            defineField({name: 'content', type: 'array', of: [{type: 'localeText'}]}),
          ]
        }),
        defineField({
          name: 'termsOfService',
          title: 'شروط الخدمة',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'localeString'}),
            defineField({name: 'content', type: 'array', of: [{type: 'localeText'}]}),
          ]
        }),
      ]
    }),
    defineField({
      name: 'cookieSettings',
      title: 'إشعار ملفات الارتباط (Cookies)',
      type: 'object',
      fields: [
        defineField({name: 'bannerText', type: 'localeString'}),
        defineField({name: 'acceptText', type: 'localeString'}),
        defineField({name: 'settingsText', type: 'localeString'}),
      ]
    }),
    defineField({
      name: 'navLabels',
      title: 'عناوين الشريط العلوي',
      type: 'object',
      fields: [
        defineField({name: 'home', type: 'localeString'}),
        defineField({name: 'projects', type: 'localeString'}),
        defineField({name: 'media', type: 'localeString'}),
        defineField({name: 'contact', type: 'localeString'}),
        defineField({name: 'contactBtn', type: 'localeString'}),
      ]
    }),
    defineField({
      name: 'footerLabels',
      title: 'عناوين التذييل (Footer)',
      type: 'object',
      fields: [
        defineField({name: 'quickLinks', type: 'localeString'}),
        defineField({name: 'legal', type: 'localeString'}),
        defineField({name: 'rights', type: 'localeString'}),
        defineField({name: 'craftedBy', type: 'localeString'}),
      ]
    }),
  ],
})
