import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Luxury Project',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAr',
      title: 'Title (Arabic)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Golf', value: 'golf' },
          { title: 'Waterfront', value: 'waterfront' },
          { title: 'Villas', value: 'villas' },
          { title: 'Coastal', value: 'coastal' },
          { title: 'Mountain', value: 'mountain' },
          { title: 'Valley', value: 'valley' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Description (Arabic)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'brochure',
      title: 'PDF Brochure',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'area', title: 'Area (sq ft)', type: 'string' },
        { name: 'bedrooms', title: 'Bedrooms', type: 'string' },
        { name: 'typeEn', title: 'Property Type (English)', type: 'string' },
        { name: 'typeAr', title: 'Property Type (Arabic)', type: 'string' },
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
