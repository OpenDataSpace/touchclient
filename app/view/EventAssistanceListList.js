/*
 * File: app/view/EventAssistanceListList.js
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

Ext.define('ACMobileClient.view.EventAssistanceListList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.ealistlist',

    config: {
        cls: 'eventList',
        disableSelection: false,
        store: 'EventAssistanceDataStore',
        onItemDisclosure: true,
        itemTpl: [
            '<div id="eaitem_{eaId}" class="list_style list_read_{read} list_editmode">',
            '<div class="list_editcircle"></div>',
            '<div class="list_read"></div>',
            '<div class="list_icons">',
            '	<tpl if="mailDir != null">	',
            '		<div class="list_icon list_icon_{classObject}{mailDir}"></div>',
            '	</tpl>',
            '	<tpl if="mailDir == null">	',
            '		<div class="list_icon list_icon_{classObject}"></div>',
            '	</tpl>',
            '	<tpl if="subClassObject != null">	',
            '		<div class="list_icon_{subClassObject}"></div>',
            '	</tpl>',
            '</div>',
            '<div class="list_date">{date:date("d.m.y")}<br>{date:date("H:i")}</div>',
            '<div class="list_headline"><nobr>{name}</nobr></div>',
            '<tpl if="subline != null">	',
            '	<div class="list_subline"><nobr>{subline}</nobr></div>',
            '</tpl>',
            '<tpl if="subContent != null">',
            '	<div class="list_content">{subContent:ellipsis(200)}</div>',
            '</tpl>',
            '</div>'
        ],
        listeners: [
            {
                fn: 'onEventAssistanceListSelect',
                event: 'select'
            },
            {
                fn: 'onEventAssistanceListSelectionChange',
                event: 'selectionchange'
            },
            {
                fn: 'onEventAssistanceListDisclose',
                event: 'disclose'
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
                type: 'pullrefresh'
            }
        ]
    },

    onEventAssistanceListSelect: function(dataview, record, eOpts) {
        if (this.parentClass.inEditMode) {
            //this.down('#eventAssistanceList').deselectAll();
        }
        else {

            var classObject = record.get("mainobject_classname");
            var objectId = record.get("mainobject_id");
            var name = record.get("displayname");

            //remove read style
            var eaItem = document.getElementById("eaitem_"+record.get("id"));
            if (hasClass(eaItem, 'list_read_false')) {
                removeClass(eaItem, 'list_read_false');
                addClass(eaItem, 'list_read_true');
            } 


            MyGlobals.mainPanel.handleObject(classObject, objectId, name, false, record);
            MyGlobals.currentEventAssistanceList = this;
        }

    },

    onEventAssistanceListSelectionChange: function(selectable, records, eOpts) {
        var me = this;
        var selected = this.getSelection();
        me.parentClass.selectedItems = [];

        Ext.Array.each(selected, function (item) {
            me.parentClass.selectedItems.push(''+item.get("eaId"));
        });
    },

    onEventAssistanceListDisclose: function(list, record, target, index, e, eOpts) {
        MyGlobals.mainPanel.showInfoPanelSlided(record.get('mainobject_id'),record.get('eaId'),record.get('classname'));
    }

});