import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'Portfolio CMS',

    projectId: 'n83zg3as',
    dataset: 'production',
    basePath: '/studio',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        // Singleton for Site Settings
                        S.listItem()
                            .title('Site Settings')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings')
                            ),
                        // Filter out singleton from default list
                        ...S.documentTypeListItems().filter(
                            (listItem) => !['siteSettings'].includes(listItem.getId() as string)
                        ),
                    ]),
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
})
