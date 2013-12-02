/*
 * File: app/view/SearchContainerSub.js
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

Ext.define('ACMobileClient.view.SearchContainerSub', {
    extend: 'Ext.Container',
    alias: 'widget.SearchContainerSub',

    config: {
        itemId: '',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                itemId: 'searchToolbar',
                items: [
                    {
                        xtype: 'searchfield',
                        itemId: 'mysearchfield',
                        width: '95%'
                    },
                    {
                        xtype: 'selectfield',
                        height: 29,
                        hidden: true,
                        itemId: 'searchFilter',
                        width: '0%',
                        displayField: 'label',
                        store: 'QuickSearchDataStore'
                    }
                ]
            },
            {
                xtype: 'list',
                cls: 'searchList',
                itemId: 'searchList',
                masked: true,
                itemTpl: [
                    '<div class="list_style">',
                    '<div class="list_icons">',
                    '<div class="list_icon list_icon_{classname}"></div>',
                    '</div>',
                    '<div class="list_entry">{name}</div>',
                    '</div>'
                ],
                loadingText: 'Search...',
                store: 'SearchDataStore',
                onItemDisclosure: true,
                plugins: [
                    {
                        refreshFn: function(plugin) {
                            ACUtils.utils.checkConnectionWithFunction(function() {
                                plugin.up().setMasked({
                                    xtype: 'loadmask',
                                    message: 'Refreshing...'
                                });
                                plugin.up().getStore().loadPage(1);
                            });

                        },
                        xclass: 'ACMobileClient.utils.PullRefreshFn'
                        //type: 'pullrefresh'
                    },
                    {
                        autoPaging: true,
                        loadMoreText: 'Mehr laden...',
                        noMoreRecordsText: ' ',
                        type: 'listpaging'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onMysearchfieldAction',
                event: 'action',
                delegate: '#mysearchfield'
            },
            {
                fn: 'onSearchListSelect',
                event: 'select',
                delegate: '#searchList'
            },
            {
                fn: 'onSearchListDisclose',
                event: 'disclose',
                delegate: '#searchList'
            },
            {
                fn: 'onContainerDeactivate',
                event: 'deactivate'
            },
            {
                fn: 'onContainerActivate',
                event: 'activate'
            },
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onMysearchfieldAction: function(textfield, e, eOpts) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var query = me.down('#searchFilter').getValue();
            query = query.replace(/\$\{query\}/gi, me.down('#mysearchfield').getValue());
            if (MyGlobals.areaIds !== "") {
                query += " AND ("+MyGlobals.areaIds+")";
            }
            console.log("searching for: "+query);
            MyGlobals.menuPanel.search(query);
        });
    },

    onSearchListSelect: function(dataview, record, eOpts) {
        var classObject = record.get("classname"),
            objectId = record.get("id"),
            name = record.get("name");

        MyGlobals.mainPanel.handleObject(classObject, objectId, name, false, record);
        MyGlobals.currentSearchList = this.down('#searchList');
    },

    onSearchListDisclose: function(list, record, target, index, e, eOpts) {
        MyGlobals.mainPanel.showInfoPanelSlided(record.get('id'));
    },

    onContainerDeactivate: function(oldActiveItem, container, newActiveItem, eOpts) {
        this.deactivateCallback();
    },

    onContainerActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        this.activateCallback();
    },

    onContainerPainted: function(element, eOpts) {
        var store = this.down('#searchFilter').getStore();
        if (!store.isLoaded()) {
            console.log("loading QuickSearch");
            store.load();
        }

        this.titleName = "Suche";
    },

    activateCallback: function() {
        this.down('#searchList').deselectAll();
    },

    deactivateCallback: function() {
        this.down('#searchList').deselectAll();

    }

});