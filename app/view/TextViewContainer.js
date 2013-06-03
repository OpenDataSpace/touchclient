/*
 * File: app/view/TextViewContainer.js
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

Ext.define('ACMobileClient.view.TextViewContainer', {
    extend: 'Ext.Panel',

    config: {
        scrollable: 'both',
        items: [
            {
                xtype: 'container',
                itemId: 'text',
                padding: 5,
                tpl: [
                    '{text}'
                ]
            }
        ]
    },

    load: function(objectId) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            me.dataStore = Ext.create('ACMobileClient.store.TextViewStore', {});

            me.setMasked({
                xtype: 'loadmask',
                message: 'Loading text'
            });

            me.dataStore.on('load', function(store, records) {
                me.loadMask(store.getAt(0), objectId);
            });

            //event, after store has been loaded
            me.dataStore.load( {
                params: {	
                    sessionId: MyGlobals.sessionId,
                    id: objectId
                }
            });
        });
    },

    loadMask: function(record, objectId) {
        var data = record.getData(true);
        this.down('#text').setData(data);
        this.setMasked(false);

    }

});