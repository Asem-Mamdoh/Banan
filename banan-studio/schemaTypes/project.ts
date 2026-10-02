import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'المشاريع العقارية',
  type: 'document',
  fields: [
    defineField({
      name: 'orderRank',
      title: 'الترتيب (Order)',
      type: 'number',
      description: 'أدخل رقم لترتيب عرض المشروع (1 سيظهر أولاً، 2 سيظهر ثانياً، إلخ)',
      initialValue: 99,
    }),
    defineField({
      name: 'titleEn',
      title: 'العنوان (إنجليزي)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAr',
      title: 'العنوان (عربي)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط (Slug)',
      type: 'slug',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'التصنيف',
      type: 'string',
      options: {
        list: [
          { title: 'جولف (Golf)', value: 'golf' },
          { title: 'واجهة بحرية (Waterfront)', value: 'waterfront' },
          { title: 'فلل (Villas)', value: 'villas' },
          { title: 'ساحلي (Coastal)', value: 'coastal' },
          { title: 'جبلي (Mountain)', value: 'mountain' },
          { title: 'وادي (Valley)', value: 'valley' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'الوصف (إنجليزي)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionAr',
      title: 'الوصف (عربي)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'الصورة الرئيسية',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'معرض الصور',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'brochure',
      title: 'ملف الـ PDF (Brochure)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'specs',
      title: 'المواصفات',
      type: 'object',
      fields: [
        { name: 'area', title: 'المساحة (قدم مربع)', type: 'string' },
        { name: 'bedrooms', title: 'عدد الغرف', type: 'string' },
        { name: 'typeEn', title: 'نوع العقار (إنجليزي)', type: 'string' },
        { name: 'typeAr', title: 'نوع العقار (عربي)', type: 'string' },
      ],
    }),
    defineField({
      name: 'units',
      title: 'الوحدات المتاحة والأسعار (Available Units & Prices)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'typeAr',
              title: 'نوع الوحدة (عربي)',
              type: 'string',
              description: 'مثال: استوديو، شقة غرفتين، فيلا',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'typeEn',
              title: 'Unit Type (English)',
              type: 'string',
              description: 'e.g. Studio, 2-Bed Apartment, Villa',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'priceOMR',
              title: 'السعر المبدئي بالريال العماني (Starting Price in OMR)',
              type: 'number',
            },
            {
              name: 'area',
              title: 'المساحة (Area)',
              type: 'string',
              description: 'e.g. 50 sqm / 50 متر مربع',
            },
          ],
          preview: {
            select: {
              title: 'typeAr',
              subtitle: 'priceOMR',
              area: 'area',
            },
            prepare(selection: any) {
              const { title, subtitle, area } = selection
              return {
                title: title || 'وحدة جديدة',
                subtitle: subtitle ? `السعر: ${subtitle} OMR${area ? ` - المساحة: ${area}` : ''}` : (area ? `المساحة: ${area}` : 'بدون سعر'),
              }
            }
          }
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
