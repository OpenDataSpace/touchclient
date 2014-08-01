Ext.define('ACMobileClient.store.GlobalGlobalFoldersStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.GlobalGlobalFolders'
    ],

    config: {
        groupField: 'name',
        model: 'ACMobileClient.model.GlobalGlobalFolders',
        pageSize: 50,
        remoteSort: true,
        storeId: 'GlobalFolderStore',

        proxy: {
            type: 'rest',
            extraParams: {
                provider: 'dataspacefolder',
                handler: 'dataspaceobject',
                source: 'agorum/roi/files/dataspace',
                query: '',
                properties: [
                    'id',
                    'name',
                    'isfolder',
                    'shared',
                    'ownobject',
                    'sharedowner',
                    'classname',
                    'uuid',
                    'owner.fullname',
                    'creator.fullname',
                    'nameextension'
                ]
                // ,
                // filter: [
                //     Ext.encode({
                //         property: 'isfolder',
                //         value: true
                //     })
                // ]
            },
            url: '/api/rest/object',
            reader: {
                type: 'json',
                rootProperty: 'data',
                useSimpleAccessors: true
            },
            writer: {
                type: 'json',
                nameProperty: 'mapping',
                encode: true,
                rootProperty: 'data'
            }
        },
        listeners: [
            {
                fn: 'onJsonstoreBeforeLoad',
                event: 'beforeload'
            }
        ]
    },

    onJsonstoreBeforeLoad: function(store, operation, eOpts) {
        console.log(operation);
        operation.setParams({source: MyGlobals.globalId});
    }

});