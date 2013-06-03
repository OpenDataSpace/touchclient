/*
 * File: app/model/SearchDataModel.js
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

Ext.define('ACMobileClient.model.SearchDataModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                mapping: 'displayname',
                name: 'name',
                type: 'string'
            },
            {
                name: 'id',
                type: 'int'
            },
            {
                convert: function(v, rec) {
                    if (v) {
                        return v.toLowerCase();
                    }
                    else {
                        return v;
                    }
                },
                name: 'classname'
            },
            {
                name: 'previewable',
                type: 'boolean'
            },
            {
                name: 'read',
                type: 'boolean'
            },
            {
                name: 'textavailable',
                type: 'boolean'
            },
            {
                name: 'isfolder',
                type: 'boolean'
            }
        ]
    }
});