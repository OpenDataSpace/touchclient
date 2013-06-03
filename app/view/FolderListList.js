/*
 * File: app/view/FolderListList.js
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

Ext.define('ACMobileClient.view.FolderListList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.folderlistlist',

    config: {
        onItemDisclosure: true,
        listeners: [
            {
                fn: 'onDocumentListSelect',
                event: 'itemsingletap'
            },
            {
                fn: 'onDocumentListRefresh',
                event: 'refresh'
            },
            {
                fn: 'onDocumentListDisclose',
                event: 'disclose'
            },
            {
                fn: 'onListItemTaphold',
                event: 'itemtaphold'
            }
        ],
        plugins: [
            {
                autoPaging: true,
                loadMoreText: 'Mehr laden...',
                noMoreRecordsText: ' ',
                type: 'listpaging'
            },
            {
                refreshFn: function(plugin) {
                    var me = this;
                    ACUtils.utils.checkConnectionWithFunction(function() {
                        plugin.up().setMasked({
                            xtype: 'loadmask',
                            message: 'Refreshing...'
                        });
                        plugin.up().getStore().loadPage(1);
                    });
                },
                loadingText: 'Lade...',
                pullRefreshText: 'Zum Aktualisieren ziehen',
                releaseRefreshText: 'Zum Aktualisieren loslassen',
                type: 'pullrefresh'
            }
        ]
    },

    onDocumentListSelect: function(dataview, index, target, record, e, eOpts) {
        var classObject, objectId, name;

        // For both 'taphold' and 'disclose' events, sencha fires an additional
        // 'singletap' afterwards. Since we trigger actions for both events and
        // only want *ONE* action to happen at any time, we set a timestamp in
        // the respective Handlers which is checkt below. If one of those events
        // fired less than a 2 seconds ago, we ignore the singletap.
        if (this.lastAction && this.lastAction > Date.now() - 2000) {
            this.deselectAll();
            return;
        }

        classObject = record.get("classname");
        objectId = record.get("id");
        name = record.get("name");
        MyGlobals.mainPanel.handleObject(classObject, objectId, name, false, record);
        MyGlobals.currentDocumentList = this;
    },

    onDocumentListRefresh: function(dataview, eOpts) {
        this.deselectAll();
    },

    onDocumentListDisclose: function(list, record, target, index, e, eOpts) {
        // See comment in onDocumentListSelect()
        this.lastAction = Date.now();

        this.deselectAll();
        MyGlobals.mainPanel.showInfoPanelSlided(record.get('id'));

    },

    onListItemTaphold: function(dataview, index, target, record, e, eOpts) {
        var objectId, ifr, url;

        // See comment in onDocumentListSelect()
        this.lastAction = Date.now();

        if (record.get('isfolder')) {
            Ext.Msg.alert('Can not dowload folders yet.');
            return;
        }

        objectId = record.get("id");
        ifr = document.createElement('iframe');
        url = '/api/rest/object/download/' + objectId;

        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        ifr.src = url;
        ifr.onload = function(e) {
            document.body.removeChild(ifr);
            ifr = null;
        };
        this.deselectAll();

    }

});