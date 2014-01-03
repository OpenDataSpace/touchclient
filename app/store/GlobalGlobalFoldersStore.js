Ext.define('ACMobileClient.store.GlobalGlobalFoldersStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.GlobalGlobalFolders'
    ],

    config: {
        groupField: 'category',
        model: 'ACMobileClient.model.GlobalGlobalFolders',
        pageSize: 50,
        remoteSort: true,
        storeId: 'GlobalFolderStore'
    }
});