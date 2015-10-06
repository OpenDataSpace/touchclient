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

    requires:[
        'Ext.ActionSheet'
    ],

    config: {
        //onItemDisclosure: true,

        itemTpl: new Ext.XTemplate(
        '<div class="list_style" itemname="{name}" itemid="{id}" itemisfolder="{isfolder}">',
        '<div class="list_icons">',
        '<div class="list_icon list-icon-type-{[this.convertSuffix(values)]}"></div>',
        '</div>',
        '<div class="list_entry" itemname="{name}" itemid="{id}" itemisfolder="{isfolder}">{[this.testing(values)]}{name}</div>',
        '</div>',
            {
                // XTemplate configuration:
                'disableFormats': true,
                // just a sample
                'testing': function(name){
                    //console.log(name)
                    return '';
                },
                convertSuffix : function(value){
                    var suffix = "folderobject";
                    if(!value.isfolder){
                        suffix = value.nameextension;
                    }
                    //console.log(suffix)
                    return suffix;
                }
            }
        ),


        listeners: [
            {
                fn: 'onDocumentListSelect',
                //event: 'itemtap'
                event: 'itemsingletap'
            },
            {
                fn: 'onDocumentListSelect',
                //event: 'itemtap'
                event: 'itemdoubletap'
            },
            {
                fn: 'onDocumentListRefresh',
                event: 'refresh'
            },
            // {
            //     fn: 'onDocumentListDisclose',
            //     event: 'disclose'
            // },
            {
                fn: 'onListItemTaphold',
                event: 'itemtaphold'
            }
        ],
        plugins: [
            {
                autoPaging: true,
                loadMoreText: 'Load More...',
                noMoreRecordsText: ' ',
                type: 'listpaging'
            },
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
                cls:'pulldown',
                loadingText: 'Loading...',
                pullText: 'Pull down to refresh',
                releaseRefreshText: 'Release to refresh...',
                xclass: 'ACMobileClient.utils.PullRefreshFn'
                //type: 'pullrefresh'
            }
        ]
    },

    onDocumentListSelect: function(dataview, index, target, record, e, eOpts) {
        var classObject, objectId, name,
            previewAble;

        // For both 'taphold' and 'disclose' events, sencha fires an additional
        // 'singletap' afterwards. Since we trigger actions for both events and
        // only want *ONE* action to happen at any time, we set a timestamp in
        // the respective Handlers which is checkt below. If one of those events
        // fired less than a 2 seconds ago, we ignore the singletap.
        if (this.lastAction && this.lastAction > Date.now() - 2000) {
            this.deselectAll();
            return;
        }

        this.lastAction = Date.now();

        classObject = record.get("classname");
        objectId = record.get("id");
        name = record.get("name");

        // separate 'enter folder' and 'preview'
        previewAble = record.get("previewable");
        if (classObject !== 'mailobject' && previewAble) {
            console.log('To fire preview event');
            this.fireEvent('preview', classObject, objectId, name, false, record);
        } else {
            MyGlobals.mainPanel.handleObject(classObject, objectId, name, false, record);
        }

        MyGlobals.currentDocumentList = this;
    },

    onDocumentListRefresh: function(dataview, eOpts) {
        this.deselectAll();
    },

    // onDocumentListDisclose: function(list, record, target, index, e, eOpts) {
    //     // See comment in onDocumentListSelect()
    //     this.lastAction = Date.now();

    //     this.deselectAll();
    //     MyGlobals.mainPanel.showInfoPanelSlided(record.get('id'));

    // },

    // wp81 use in wp 8.1, if the os is wp8.1 wp81=true, else wp81 is a object
    onListItemTaphold: function(dataview, index, target, record, e, eOpts, wp81) {
        var recordId = null,
            recordIsFolder = null,
            recordName = null,
            me = this;
        if(wp81 === true){
            this.lastAction = Date.now();
            recordId = record.id;
            recordIsFolder = record.isfolder;
            recordName = record.name;
        } else {
            recordId = record.get("id");
            recordIsFolder =  record.get('isfolder');
            recordName = record.get('name');

            console.log(recordId)
        }
        if (this.lastTaphold && this.lastTaphold > Date.now() - 2000) {
            //this.deselectAll();
            return;
        }
        this.lastTaphold = Date.now();
        var disableDownload = false,
            disableRename = false,
            folderStore = this.getStore(),

            actionSheet = Ext.create('Ext.ActionSheet', {
            items:[
                    {
                        text: 'Download',
                        id: 'btnDownload',
                        ui: 'action',
                        handler: function(){
                            console.log("download taphold");
                            objectId = recordId,
                            url = '/api/rest/object/download/' + objectId;

                            if(Ext.os.is.iOS){
                                //window.location.href = url;                                
                                window.open(url);
                            } else {
                                ifr = document.createElement('iframe');
                                ifr.style.display = 'none';
                                document.body.appendChild(ifr);
                                ifr.src = url;
                                ifr.onload = function(e) {
                                    document.body.removeChild(ifr);
                                    ifr = null;
                                };
                            }

                            actionSheet.hide();
                            actionSheet.destroy();
                        }
                    }, {
                        text: 'Rename',
                        id: 'btnRename',
                        ui: 'action',
                        disabled: true,
                        handler: function(){
                            console.log("handle rename");

                            var newName;

                            Ext.Msg.prompt(
                                "", 
                                "Please input new name: ", 
                                function(buttonId, value){
                                    if(buttonId === 'ok'){
                                        newName = Ext.String.trim(value);
                                        if(newName !== "" && newName !== recordName){
                                            MyGlobals.mainPanel.renameItem(recordId, newName, folderStore, wp81);
                                        }
                                    }
                                },
                                this,
                                false,
                                recordName
                            );


                            // if(wp81 === true){
                            //     newName = window.prompt("Please input new name: ", recordName);
                            //     if(newName != null && newName != recordName){
                            //         MyGlobals.mainPanel.renameItem(recordId, newName, folderStore, wp81);
                            //     }
                            // } else {
                            //     Ext.Msg.prompt(
                            //         "", 
                            //         "Please input new name: ", 
                            //         function(buttonId, value){
                            //             if(buttonId === 'ok'){
                            //                 newName = Ext.String.trim(value);
                            //                 if(newName !== "" && newName !== recordName){
                            //                     MyGlobals.mainPanel.renameItem(recordId, newName, folderStore, wp81);
                            //                 }
                            //             }
                            //         },
                            //         this,
                            //         false,
                            //         recordName
                            //     );
                            // }

                            actionSheet.hide();
                            actionSheet.destroy();
                        }
                    }, {
                        text: 'Info',
                        ui: 'action',
                        handler: function(){
                            console.log("handle show info");

                            MyGlobals.mainPanel.showInfoPanelSlided(recordId, null, null, recordIsFolder);

                            setTimeout(function(){
                                actionSheet.hide();
                                actionSheet.destroy();
                            }, 500);
                            // actionSheet.hide();
                            // actionSheet.destroy();
                        }
                    }, /*{
                        text: 'Create Link',
                        ui: 'action',
                        handler: function(){
                            console.log("handle download link");
                            MyGlobals.mainPanel.showDownloadLinkPanelSlided(recordId, recordIsFolder);

                            actionSheet.hide();
                            actionSheet.destroy();
                        }
                    },*/ {
                        text: 'Delete',
                        id: 'btnDelete',
                        ui: 'decline',
                        disabled: true,
                        handler: function(){
                            console.log(record);
                            //console.log(record.get("name"))
                            //objectId = record.get("id");
                           // var displayName = record.raw.displayname || record.raw.name;
                            var displayName = recordName;

                            Ext.Msg.confirm("Delete", "Are you sure to delete " + displayName + " ?", function(button){
                                if(button === 'yes' || button === 'ok'){
                                    MyGlobals.mainPanel.deleteItem(recordId, me.getStore());

                                    actionSheet.hide();
                                    actionSheet.destroy();
                                }
                            });

                            // if(wp81 === true){
                            //     if(window.confirm("Are you sure to delete " + displayName + "?")){
                            //         MyGlobals.mainPanel.deleteItem(recordId, me.getStore());
                            //     }
                            //     actionSheet.hide();
                            //     actionSheet.destroy();
                            // } else {
                            //     Ext.Msg.confirm("Delete", "Are you sure to delete " + displayName + " ?", function(button){
                            //         if(button === 'yes' || button === 'ok'){
                            //             MyGlobals.mainPanel.deleteItem(recordId, me.getStore());

                            //             actionSheet.hide();
                            //             actionSheet.destroy();
                            //         }
                            //     });
                            // }
                        }
                    }, {
                        text: 'Cancel',
                        ui: 'normal',
                        handler: function(){
                            //console.log("Hide Sheet")
                            actionSheet.hide();
                            actionSheet.destroy();
                        } 
                    }
                ]
            });

        MyGlobals.mainPanel.checkObjectAccessLevel(record, actionSheet, wp81);

        if (recordIsFolder) {
            disableDownload = true;
        }
        actionSheet.down("#btnDownload").setDisabled(disableDownload);

        // if(dataview.getStore().getGroupField() === 'sharedowner'){
        //     disableRename = true;
        // }
        // actionSheet.down("#btnRename").setDisabled(disableRename);

        MyGlobals.menuPanel.add(actionSheet);
        actionSheet.show();

         // var objectId, ifr, url;

        // // See comment in onDocumentListSelect()
        this.lastAction = Date.now();

        // if (record.get('isfolder')) {
        //     Ext.Msg.alert('Can not dowload folders yet.');
        //     return;
        // }

        // objectId = record.get("id");
        // ifr = document.createElement('iframe');
        // url = '/api/rest/object/download/' + objectId;
        // //alert(objectId)
        // //window.location.href = url;
        // ifr.style.display = 'none';
        // document.body.appendChild(ifr);
        // ifr.src = url;
        // ifr.onload = function(e) {
        //     document.body.removeChild(ifr);
        //     ifr = null;
        // };
        this.deselectAll();

    }

});
