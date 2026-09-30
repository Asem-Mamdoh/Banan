import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'projectsSection',
  title: 'قسم المشاريع',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'نص الشارة',
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
  ],
})
