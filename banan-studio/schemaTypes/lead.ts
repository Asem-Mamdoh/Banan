import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lead',
  title: 'Leads (Contacts)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'project',
      title: 'Interested In (Project)',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where did this lead come from? (e.g. Website Contact Form, AI Agent)',
      initialValue: 'Website Form'
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New (Uncontacted)', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed (Won)', value: 'won' },
          { title: 'Closed (Lost)', value: 'lost' }
        ]
      },
      initialValue: 'new'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'phone',
    },
  },
})
