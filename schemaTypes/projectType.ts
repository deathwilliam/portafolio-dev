import { defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Stack', value: 'Full Stack' },
                    { title: 'Frontend', value: 'Frontend' },
                    { title: 'Backend', value: 'Backend' },
                    { title: 'Mobile', value: 'Mobile' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tech',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'demo',
            title: 'Demo URL',
            type: 'url',
        }),
        defineField({
            name: 'repo',
            title: 'Repository URL',
            type: 'url',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            category: 'category',
        },
        prepare(selection) {
            const { title, media, category } = selection
            return {
                title,
                subtitle: category,
                media,
            }
        },
    },
})
