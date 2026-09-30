import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'featuresSection',
  title: 'لماذا الاستثمار (المميزات)',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'نص الشارة (Badge Text)',
      type: 'localeString',
    }),
    defineField({
      name: 'title',
      title: 'عنوان القسم',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'وصف القسم',
      type: 'localeText',
    }),
    defineField({
      name: 'items',
      title: 'عناصر المميزات',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'icon', title: 'اسم الأيقونة (Google Material)', type: 'string'}),
          defineField({name: 'watermark', title: 'أيقونة العلامة المائية', type: 'string'}),
          defineField({name: 'title', title: 'العنوان', type: 'localeString'}),
          defineField({name: 'subtitle', title: 'العنوان الفرعي', type: 'localeString'}),
          defineField({name: 'description', title: 'وصف قصير', type: 'localeText'}),
          defineField({
            name: 'details', 
            title: 'المحتوى التفصيلي (فقرات نصية)', 
            type: 'array', 
            of: [{type: 'localeText'}]
          }),
          defineField({name: 'whatsappMessage', title: 'رسالة استفسار واتساب', type: 'localeString'}),
        ]
      }]
    }),
    defineField({
      name: 'consultExpertText',
      title: 'نص زر استشارة الخبير',
      type: 'localeString',
    }),
  ],
})
