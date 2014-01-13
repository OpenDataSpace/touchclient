
Ext.define('ACMobileClient.store.RootFolderStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.RootFolderModel'
    ],

    config: {
        model: 'ACMobileClient.model.RootFolderModel',
        storeId: 'RootFolderStore',
        proxy: {
            type: 'rest',
            extraParams: {
                source: "root",
                depth: 1,
                provider: "dataspaceglobalfolder",
                properties: [
                    'id',
                    'name',
                    'isfolder',
                    'shared',
                    'ownobject',
                    'sharedowner'
                ]
            },
            url: '/api/rest/object/tree/root',
            format: 'json',
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'data'
            }
        },
        filters:{
            property:"isFolder",
            value: true
        }
    }
});