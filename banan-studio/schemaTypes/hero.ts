import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'القسم الرئيسي (البداية)',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'نص الشارة (Badge Text)',
      type: 'localeString',
    }),
    defineField({
      name: 'headline',
      title: 'العنوان الرئيسي',
      type: 'localeString',
    }),
    defineField({
      name: 'subheadline',
      title: 'العنوان الفرعي',
      type: 'localeText',
    }),
    defineField({
      name: 'ctaText',
      title: 'نص الزر الرئيسي (Primary CTA)',
      type: 'localeString',
    }),
    defineField({
      name: 'watchStoryText',
      title: 'نص زر مشاهدة القصة',
      type: 'localeString',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'صورة الخلفية',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
