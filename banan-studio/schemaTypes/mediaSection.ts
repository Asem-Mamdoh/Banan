import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaSection',
  title: 'معرض الوسائط',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'إعدادات عامة (عناوين)' },
    { name: 'video', title: 'قسم الفيديو' },
    { name: 'photos', title: 'قسم الصور' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان القسم',
      type: 'localeString',
      fieldset: 'general',
    }),
    defineField({
      name: 'videoButtonText',
      title: 'تسمية زر الفيديوهات',
      type: 'localeString',
      fieldset: 'general',
    }),
    defineField({
      name: 'photoButtonText',
      title: 'تسمية زر الصور',
      type: 'localeString',
      fieldset: 'general',
    }),
    defineField({
      name: 'featuredVideo',
      title: 'الفيديو المميز',
      type: 'object',
      fieldset: 'video',
      fields: [
        defineField({name: 'title', title: 'عنوان الفيديو', type: 'localeString'}),
        defineField({name: 'subtitle', title: 'العنوان الفرعي للفيديو', type: 'localeString'}),
        defineField({
          name: 'videoUrl', 
          title: 'رابط يوتيوب/فيميو (بديل 1)', 
          type: 'url',
          description: 'إذا كان الفيديو مرفوعاً على يوتيوب ضع الرابط هنا'
        }),
        defineField({
          name: 'videoFile', 
          title: 'ملف الفيديو مباشرة (بديل 2 - مفضل)', 
          type: 'file',
          description: 'ارفع ملف الفيديو بصيغة MP4 ليعمل داخل الموقع بدون إعلانات يوتيوب',
          options: { accept: 'video/*' }
        }),
        defineField({name: 'thumbnail', title: 'الصورة المصغرة للفيديو', type: 'image'}),
      ]
    }),
    defineField({
      name: 'photoGallery',
      title: 'معرض الصور',
      type: 'array',
      fieldset: 'photos',
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
