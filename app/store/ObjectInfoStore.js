/*
 * File: app/store/ObjectInfoStore.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('ACMobileClient.store.ObjectInfoStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.ObjectInfoModel'
    ],

    config: {
        model: 'ACMobileClient.model.ObjectInfoModel',
        storeId: 'ObjectInfoStore',
        proxy: {
            type: 'rest',
            extraParams: {
                handler: 'object',
                provider: 'object',
                properties: [
                    'id',
                    'name',
                    'objecttextkey',
                    'displayname',
                    'description',
                    'creator.fullname',
                    'lastmodifier.fullname',
                    'owner.fullname',
                    'createdate',
                    'lastmodifydate',
                    'updatedate'
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
                fn: 'onStoreBeforeLoad',
                event: 'beforeload'
            }
        ]
    },

    onStoreBeforeLoad: function(store, operation, eOpts) {
        addSessionIdToParams(operation);

    }

});