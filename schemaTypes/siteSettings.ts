export const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'cv',
            title: 'CV / Resume (PDF)',
            type: 'file',
            options: {
                accept: '.pdf'
            }
        }
    ]
}
