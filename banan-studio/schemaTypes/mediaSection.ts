import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaSection',
  title: 'معرض الوسائط',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان القسم',
      type: 'localeString',
    }),
    defineField({
      name: 'videoButtonText',
      title: 'تسمية زر الفيديوهات',
      type: 'localeString',
    }),
    defineField({
      name: 'photoButtonText',
      title: 'تسمية زر الصور',
      type: 'localeString',
    }),
    defineField({
      name: 'featuredVideo',
      title: 'الفيديو المميز',
      type: 'object',
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
})
