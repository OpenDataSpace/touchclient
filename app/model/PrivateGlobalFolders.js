/*
 * File: app/model/PrivateGlobalFolders.js
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

Ext.define('ACMobileClient.model.PrivateGlobalFolders', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'name'
            },
            {
                mapping: 'gdscategory',
                name: 'category'
            },
            {
                name: 'isfolder'
            },
            {
                name: 'shared'
            },
            {
                name: 'ownobject'
            },
            {
                name: 'sharedowner'
            },
            {
                convert: function(v, rec) {
                    return v.toLowerCase();
                    //return 'folderobject';
                },
                name: 'classname'
            }
        ],
        proxy: {
            type: 'rest',
            extraParams: {
                provider: 'dataspaceglobalfolder',
                handler: 'dataspaceobject',
                source: 'private',
                query: '',
                properties: [
                    'id',
                    'name',
                    'isfolder',
                    'shared',
                    'ownobject',
                    'sharedowner',
                    'classname'
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
        }
    }
});