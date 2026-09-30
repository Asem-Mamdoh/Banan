import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'text',
      rows: 3,
    }),
  ],
})
