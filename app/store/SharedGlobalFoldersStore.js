/*
 * File: app/store/SharedGlobalFoldersStore.js
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

Ext.define('ACMobileClient.store.SharedGlobalFoldersStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.SharedGlobalFolders'
    ],

    config: {
        groupField: 'category',
        model: 'ACMobileClient.model.SharedGlobalFolders',
        pageSize: 50,
        remoteSort: true,
        storeId: 'SharedFolderStore'
    }
});