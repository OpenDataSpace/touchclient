/*
 * File: app/model/PreviewModel.js
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

Ext.define('ACMobileClient.model.PreviewModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'ticket',
                type: 'string'
            },
            {
                name: 'width',
                type: 'int'
            },
            {
                name: 'height',
                type: 'int'
            },
            {
                name: 'masterWidth',
                type: 'int'
            },
            {
                name: 'masterHeight',
                type: 'int'
            }
        ],
        proxy: {
            type: 'rest',
            extraParams: {
                provider: 'preview',
                parameters: Ext.encode({
                    width: -1,
                    height: -1
                })
            },
            url: '/api/rest/object',
            format: 'json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});