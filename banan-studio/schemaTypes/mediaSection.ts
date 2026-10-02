import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaSection',
  title: 'معرض الوسائط',
  type: 'document',
  groups: [
    { name: 'general', title: 'إعدادات عامة (عناوين)' },
    { name: 'video', title: 'قسم الفيديو' },
    { name: 'photos', title: 'قسم الصور' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان القسم',
      type: 'localeString',
      group: 'general',
    }),
    defineField({
      name: 'videoButtonText',
      title: 'تسمية زر الفيديوهات',
      type: 'localeString',
      group: 'general',
    }),
    defineField({
      name: 'photoButtonText',
      title: 'تسمية زر الصور',
      type: 'localeString',
      group: 'general',
    }),
    defineField({
      name: 'featuredVideo',
      title: 'الفيديو المميز',
      type: 'object',
      group: 'video',
      fields: [
        defineField({name: 'title', title: 'عنوان الفيديو', type: 'localeString'}),
        defineField({name: 'subtitle', title: 'العنوان الفرعي للفيديو', type: 'localeString'}),
        defineField({name: 'videoUrl', title: 'رابط يوتيوب/فيميو', type: 'url'}),
        defineField({name: 'thumbnail', title: 'الصورة المصغرة للفيديو', type: 'image'}),
      ]
    }),
    defineField({
      name: 'photoGallery',
      title: 'معرض الصور',
      type: 'array',
      group: 'photos',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'image', title: 'الصورة', type: 'image'}),
          defineField({name: 'title', title: 'عنوان الصورة', type: 'localeString'}),
          defineField({name: 'category', title: 'التصنيف/العلامة', type: 'localeString'}),
        ]
      }]
    }),
  ],
  preview: {
    select: {
      title: 'title.ar',
    },
    prepare(selection) {
      return {
        title: selection.title || 'إعدادات معرض الوسائط',
      }
    }
  }
})
