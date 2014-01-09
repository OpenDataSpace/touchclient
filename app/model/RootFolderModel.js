Ext.define('ACMobileClient.model.RootFolderModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'node',
                type: 'string'
            },
            {
                name: 'children'
            },
            {
                name: 'leaf',
                type: 'boolean'
            }
        ]
    }
});