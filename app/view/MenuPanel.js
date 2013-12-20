/*
 * File: app/view/MenuPanel.js
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

Ext.define('ACMobileClient.view.MenuPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.menupanel',

    requires: [
        'ACMobileClient.view.DocumentListContainer',
        'ACMobileClient.view.SearchContainer',
        'ACMobileClient.view.SettingsContainer'
    ],
    uses: [
        'ACMobileClient.view.FolderListContainer',
        'ACMobileClient.store.PrivateGlobalFoldersStore',
        'ACMobileClient.store.SharedGlobalFoldersStore',
        'ACMobileClient.store.FolderObjectDataStore'
    ],

    config: {
        style: '',
        hideOnMaskTap: false,
        layout: {
            type: 'fit'
        },
        modal: false,
        items: [
            {
                xtype: 'tabpanel',
                itemId: 'tabPanel',
                tabBar: {
                    docked: 'bottom',
                    itemId: 'tabBar'
                },
                items: [
                    {
                        xtype: 'DocumentListContainer',
                        itemId: 'documentsBar',
                        layout: {
                            type: 'card'
                        },
                        title: 'My folders',
                        iconCls: 'user'
                    },
                    {
                        xtype: 'DocumentListContainer',
                        itemId: 'sharedFolders',
                        layout: {
                            type: 'card'
                        },
                        title: 'Shared folders',
                        iconCls: 'team'
                    },
                    {
                        xtype: 'searchcontainer',
                        itemId: 'searchContainer',
                        title: 'Search',
                        iconCls: 'search'
                    },
                    {
                        xtype: 'SettingsContainer',
                        itemId: 'settingsContainer',
                        title: 'Settings',
                        iconCls: 'settings'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onTabBarActivate',
                event: 'activate',
                delegate: '#tabBar'
            },
            {
                fn: 'onTabPanelActivate',
                event: 'activate',
                delegate: '#tabPanel'
            },
            {
                fn: 'onTabPanelActiveItemChange',
                event: 'activeitemchange',
                delegate: '#tabPanel'
            }
        ]
    },

    onTabBarActivate: function(newActiveItem, container, oldActiveItem, eOpts) {

    },

    onTabPanelActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        var me = this,
            tabBar = me.down('#tabBar');

        tabBar.on({
            'tap': 'tabCallback',
            'delegate': '> tab',
            'scope': me
        });

    },

    onTabPanelActiveItemChange: function(container, value, oldValue, eOpts) {
        this.lastActiveItem = value.id;

    },

    search: function(searchQuery) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            me.down('#searchList').setMasked({
                xtype: 'loadmask',
                message: 'Search...'
            });
            me.down('#searchList').getStore().searchQuery = searchQuery;
            me.down('#searchList').getStore().load();
        });
    },

    deselectAllLists: function() {
        if (MyGlobals.currentDocumentList) {
            console.log("desel 1");
            MyGlobals.currentDocumentList.deselectAll();
        }

        if (MyGlobals.currentSearchList) {
            console.log("desel 2");
            MyGlobals.currentSearchList.deselectAll();
        }

        if (MyGlobals.currentEventAssistanceList) {
            console.log("desel 3");
            MyGlobals.currentEventAssistanceList.deselectAll();
        }

    },

    navigateToFolder: function(fId, name, isRoot, area) {
        ACUtils.utils.checkConnectionWithFunction(function() {

            var parentName = '',
            // create a new FolderList view
                foldC = Ext.create("ACMobileClient.view.FolderListContainer", {}),
                store = null;

            if (isRoot)  {
                // If root, load the areas
                if (area.getItemId() === 'documentsBar') {
                    store = Ext.create("ACMobileClient.store.PrivateGlobalFoldersStore", {});
                } else {
                    store = Ext.create("ACMobileClient.store.SharedGlobalFoldersStore", {
                        groupField:'sharedowner'
                    });  
                    foldC.down('#documentList').setGrouped(true);                  
                }
            } else {
                parentName = area.getActiveItem().titleName;
                // if not root load a normal folder structure
                store = Ext.create("ACMobileClient.store.FolderObjectDataStore", {});
            }

            foldC.down('#documentList').setStore(store);

            //foldC.down('#').setStore(store);

            if (!isRoot) {
                //activate back button
                foldC.down('#backButton').setText(parentName);
                foldC.down('#backButton').show();
            }
            else {
                foldC.down('#backButton').hide();
            }

            foldC.down('#titleBar').setTitle(name);
            foldC.titleName = name;

            if (!isRoot) {
                foldC.down('#documentList').getStore().folderId = fId;
                MyGlobals.uploadController.checkAccessLevel(
                fId, 'protected',
                function() { // onGranted
                    foldC.down('#uploadButton').enable();
                    MyGlobals.uploadController.initUploader(foldC);
                },
                function() { // onDenied
                    foldC.down('#uploadButton').disable();
                },
                function() { // onFailure
                    foldC.down('#uploadButton').disable();
                    Ext.Msg.alert('Could not fetch permissions');
                });
            }

            foldC.down('#documentList').getStore().loadPage(1, {});

            if (area.getLayout().setAnimation) {
                area.getLayout().setAnimation({
                    type: 'slide',
                    direction: 'left'
                });
            }

            area.setActiveItem(foldC);

        });
    },

    navigateToParent: function() {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var fIds, names, parent, name, colon, i;

            if (me.pathList && me.pathList !== '') {
                fIds = me.pathList.split('|');
                names = me.pathNameList.split('|');
                parent = fIds[fIds.length-2];
                name = names[names.length-2];

                me.pathList = "";
                me.pathNameList = "";
                colon = "";
                for (i = 0; i < fIds.length-2; i+=1) {
                    me.pathList += colon + fIds[i];
                    me.pathNameList += colon + names[i];
                    colon = "|";
                }
                me.navigateToFolder(parent, name);
            }
        });
    },

    tabCallback: function(tab) {
        //check if a tab is tapped twice
        if (this.lastActiveItem) {
            this.lastActiveItem = null;
        }
        else {
            var activeItem = this.down('#tabPanel').getActiveItem();
            if (activeItem.doubleTapCallback) {
                activeItem.doubleTapCallback();
            }
        }
    },

    navigateToParent2: function(container) {
        var db = MyGlobals.menuPanel.down('#tabPanel').getActiveItem(),
            items = db.items,
            actItem = db.getActiveItem();

        db.getLayout().setAnimation({
            type: 'slide',
            direction: 'right'
        });


        db.setActiveItem(items.length - 2);
        setTimeout(function() {
            db.remove(actItem, true);
        }, 500);


    }

});