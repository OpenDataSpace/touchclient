/*
 * File: app/store/FolderObjectDataStore.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('ACMobileClient.store.FolderObjectDataStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.FolderObjectDataModel'
    ],

    config: {
        model: 'ACMobileClient.model.FolderObjectDataModel',
        remoteSort: true,
        storeId: 'FolderObjectDataStore',
        proxy: {
            type: 'rest',
            extraParams: {
                provider: 'folder',
                createhandler: 'folder',
                properties: [
                    'id',
                    'displayname',
                    'classname',
                    'read',
                    'previewable',
                    'textavailable',
                    'isfolder',
                    'objecttextkey'
                ]
            },
            url: '/api/rest/object',
            format: 'json',
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'data'
            }
        },
        listeners: [
            {
                fn: 'onJsonstoreBeforeLoad',
                event: 'beforeload'
            }
        ],
        sorters: {
            property: 'name'
        }
    },

    onJsonstoreBeforeLoad: function(store, operation, eOpts) {
        operation.setParams( {
            source: store.folderId
        });

        addSessionIdToParams(operation);


    }

});