import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'socialSection',
  title: 'النشاط على السوشيال ميديا',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsappTitle',
      title: 'عنوان بطاقة الواتساب',
      type: 'localeString',
    }),
    defineField({
      name: 'whatsappSubtitle',
      title: 'العنوان الفرعي لبطاقة الواتساب',
      type: 'localeText',
    }),
    defineField({
      name: 'feedImages',
      title: 'صور منشورات السوشيال ميديا',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
})
