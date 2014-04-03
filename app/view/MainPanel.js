/*
 * File: app/view/MainPanel.js
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

Ext.define('ACMobileClient.view.MainPanel', {
    extend: 'Ext.Panel',

    config: {
        cls: 'page',
        padding: 0,
        style: '',
        styleHtmlContent: true,
        ui: 'light',
        hideOnMaskTap: false,
        layout: {
            type: 'card'
        },
        listeners: [
            {
                fn: 'onPanelShow',
                event: 'show'
            },
            {
                fn: 'onContentContainerAdd',
                event: 'add',
                delegate: '#contentContainer'
            }
        ],
        items: [
            {
                xtype: 'container',
                itemId: 'contentContainer',
                style: 'font-size:1.25em',
                ui: 'light',
                layout: {
                    type: 'fit'
                },
                items: [
                    {
                        xtype: 'container',
                        itemId: 'content',
                        layout: {
                            animation: 'slide',
                            type: 'card'
                        }
                    }
                ]
            }
        ]
    },

    onPanelShow: function(component, eOpts) {
        var me = this,
            contentContainer = me.down('#contentContainer'),
            men, logoContainer;

        MyGlobals.mainPanel = me;

        //create the menu panel
        if (MyGlobals.isNarrow()) {
            men = Ext.create("ACMobileClient.view.MenuPanel", {});
        } else {
            men = Ext.create("ACMobileClient.view.MenuPanel", {
                modal: true,
                hideOnMaskTap: true
            });
        }
        // if (MyGlobals.isPhone) {
        //     men.setStyle("font-size:1.25em");
        // }


        //remember the panel in the globals to reuse it on another place
        MyGlobals.menuPanel = men;    
        me.add(men);

        men.navigateToFolder('', "Start", true, this.down('#documentsBar'));
        men.navigateToFolder('', "Start", true, this.down('#sharedFolders'));
        men.navigateToFolder('', "Start", true, this.down('#globalFolders'));

        // ST2.3 not fire 'orientationchage' event in android browser.
        // if(Ext.os.is.Android && !navigator.userAgent.match(/Chrome/)){
        //     Ext.Viewport.bodyElement.on('resize', function(){
        //         me.handleOrientationChange();
        //     }, this, { buffer: 1});
        // }

        if(Ext.feature.has.OrientationChange){
            //register event for orientation change
            Ext.Viewport.on('orientationchange', 'handleOrientationChange', me,  {buffer: 50 });
        }else{
            // ST2.3 not fire 'orientationchage' event in android browser.
            Ext.Viewport.bodyElement.on('resize', function(){
                me.handleOrientationChange();
            }, this, { buffer: 50});
        }

        // ST2.3 not fire 'orientationchage' event in android browser.
        // Ext.Viewport.bodyElement.on('resize', function(){
        //     me.handleOrientationChange();
        // }, this, { buffer: 50});

        //register event for orientation change
        //Ext.Viewport.on('orientationchange', 'handleOrientationChange', me,  {buffer: 50 });

        MyGlobals.contentContainer = contentContainer;
        logoContainer = Ext.create("ACMobileClient.view.LogoContainer", {});
        logoContainer.persistent = true;
        MyGlobals.lastObjectInContentContainer = logoContainer;
        me.loadContentContainer(logoContainer, true, false, "Start");

        //init the view
        me.handleOrientationChange();

        me.showMenuPanel();
        me.loadQuickSearchAreas();

    },

    onContentContainerAdd: function(container, item, index, eOpts) {
        this.down('#contentContainer').setMasked(false);
    },

    contentContainerBack: function() {
        var cont = MyGlobals.contentContainer.down('#content'),
            lastObj = MyGlobals.lastObjectInContentContainer,
            items;

        cont.getLayout().setAnimation({
            type: 'slide',
            direction: 'right'
        });


        items = cont.items;
        MyGlobals.lastObjectInContentContainer = cont.getAt(items.length - 2);

        if (items.length === 2 && MyGlobals.isNarrow()) {
            this.showMenuPanel();

            // setTimeout(function() {
            //     cont.remove(cont.getActiveItem(), true);
            // }, 1000);

            cont.remove(cont.getActiveItem(), true);
            MyGlobals.menuPanel.deselectAllLists();
        } else {
            cont.remove(cont.getActiveItem(), true);
            if (items.length > 1) {
                if (items.length === 2) {
                    if (MyGlobals.menuPanel) {
                        MyGlobals.menuPanel.deselectAllLists();
                    }
                }
                cont.setActiveItem(items.length-2);
            }
        }
    },

    handleObject: function(classObject, objectId, name, persistent, record) {
        var me = this,
            tab;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var previewAble = record.get("previewable"),
                textAvailable = record.get("textavailable"),
                isFolder = record.get("isfolder");

            if (classObject==="mailobject") {
                me.showMail(objectId, persistent);
            }
            else if (previewAble) {
                me.showPreview(objectId,1,persistent);
            }
            else if (textAvailable) {
                me.showText(objectId,persistent);
            }
            else if (isFolder) {
                tab = MyGlobals.menuPanel.down('#tabPanel').getActiveItem();
                //MyGlobals.menuPanel.down('#tabPanel').setActiveItem(me.down('#documentsBar'));

                MyGlobals.menuPanel.navigateToFolder(objectId, name, false, tab);
            }
            else {
                Ext.Msg.alert('Error', 'This file is not support preview.', Ext.emptyFn);
                //Ext.Msg.alert('Error', 'Für dieses Objekt ist derzeit noch keine Anzeige erstellt: '+classObject, Ext.emptyFn);   
            }

        });
    },

    handleOrientationChange: function() {
        var me = this;

        if (MyGlobals.isNarrow()) {             //Ext.Viewport.getOrientation() === 'portrait'
            this.setStyle("font-size:1.25em");
        } else {
            this.setStyle("font-size:1.0em");
        }      

        ACUtils.utils.checkConnectionWithFunction(function() {
            
            var men = MyGlobals.menuPanel,
                isAndroidTablet = (Ext.os.deviceType === 'Tablet' && !Ext.os.is.iOS),
                cont = me.down('#content'),
                items = cont.items,
                itemLen = items.length,
                height = me.element.getHeight(),
                i, el;

            if (MyGlobals.isNarrow()) {
                men.setHideOnMaskTap(false);
                men.setModal(null);
                men.setDocked(null);
                men.setTop(null);
                men.setLeft(null);
                men.setHeight(null);
                men.setWidth(null);

                MyGlobals.showListButton = false;

                if(!MyGlobals.downloadLinkPanel){
                    if (MyGlobals.contentContainer.down('#content').items.length > 1) {
                        me.showInContentContainer();
                    } else {
                        me.showMenuPanel();
                    } 
                }


            } else {
                men.setHideOnMaskTap(true);
                men.setModal(true);
                // if (isAndroidTablet) {
                //     men.setDocked(null);
                //     men.setTop(5);
                //     men.setLeft(5);
                //     men.setHeight(height - 70);
                //     men.setWidth(315);
                //     men.removeCls("MenuBorder");
                //     men.hide();
                // } else {
                //     men.setDocked("left");
                //     men.setTop(null);
                //     men.setLeft(null);
                //     men.setCls("MenuBorder");
                //     men.setHeight(height);
                //     men.setWidth(315);
                //     men.show();
                // }

                men.setDocked("left");
                men.setTop(null);
                men.setLeft(null);
                men.setCls("MenuBorder");
                men.setHeight(height);
                men.setWidth(315);
                men.show();

                MyGlobals.showListButton = true;

                MyGlobals.contentContainer.show();
            }


            if (MyGlobals.imageViewer) {
                MyGlobals.imageViewer.reloadViewer();
            }

            //reload content elements
            for (i=0; i<itemLen; i+=1) {
                el = cont.getAt(i);
                if (el.doRepaint) {
                    el.doRepaint();
                }
            }
            me.restoreSidePanel();
            Ext.repaint();
        });
    },

    hideInfoPanel: function() {
        var me = this,
            ip = MyGlobals.infoPanel;
        if (ip) {
            me.remove(ip, true);
            MyGlobals.infoPanel = null;
        }
        if (MyGlobals.isNarrow()) {
            me.setActiveItem(MyGlobals.menuPanel);
        }
    },

    hideDownloadLinkPanel: function(){
        console.log("To hide downloadLinkPanel");
        var me = this,
            linkPanel = MyGlobals.downloadLinkPanel;

        if (linkPanel) {
            linkPanel.hide();
            MyGlobals.linkPanel = null;
        }
        if (MyGlobals.isNarrow()) {
            me.setActiveItem(MyGlobals.menuPanel);
        } 
    },

    hideLoader: function() {
        this.down('#contentContainer').setMasked(false);
    },

    loadContentContainer: function(container, persistent, hasPrevious, navTitle) {
        var cont = MyGlobals.contentContainer.down('#content'),
            lastObj = MyGlobals.lastObjectInContentContainer,
            items = cont.items,
            itemLen = items.length,
            contCon;

        if (!persistent && lastObj !== null && typeof lastObj !== 'undefined' && !lastObj.persistent) {
            itemLen -= 1;
            setTimeout(function() {
                console.log("removing last: " + lastObj);
                cont.remove(lastObj, true);
            }, 1000);
        }

        if (cont.getLayout && cont.getLayout().setAnimation) {
            cont.getLayout().setAnimation({
                type: 'slide',
                direction: 'left'
            });
        }

        contCon = Ext.create('ACMobileClient.view.ContentContainer', {});
        contCon.hasPrevious = hasPrevious;
        // if (hasPrevious) {
        //     if (itemLen > 0) {
        //         //contCon.navTitle =  cont.getAt(itemLen-1).prevNavTitle;
        //     }
        // }

        contCon.persistent = container.persistent;
        contCon.add(container);


        cont.add(contCon);
        cont.setActiveItem(contCon);
        contCon.prevNavTitle = navTitle;
        MyGlobals.lastObjectInContentContainer = contCon;
        this.showInContentContainer();

        if (MyGlobals.isNarrow()) {
            // hide menu panel when showing something in container
            setTimeout(function() {
                var men;
                if (MyGlobals.showListButton)  {
                    men = MyGlobals.menuPanel;
                    men.deselectAllLists();
                    men.hide();
                }
            }, 20);
        }
    },

    loadQuickSearchAreas: function() {
        var theOr = '';

        MyGlobals.areaIds = '';

        Ext.Ajax.request({
            url: '/api/rest/object.json',
            method: 'get',
            params: { 
                sessionId: MyGlobals.sessionId,
                provider: 'area',
                source: 'MAIN_MODULE_MANAGEMENT/mobileclient/control/areas',
                page: 1,
                start: 0,
                limit: 2000,
                noCache: new Date().getTime()
            },
            success: function(response) {
                var jsonResp = Ext.decode(response.responseText),
                    areas = jsonResp.data,
                    i;
                for (i = 0; i < areas.length; i+=1) {
                    MyGlobals.areaIds += theOr + "inpath:" + areas[i].id;
                    theOr = " OR ";
                }
            },
            failure: function() {
            },
            scope: this
        });
    },

    loadNextPage: function() {
        if (MyGlobals.imageViewer.pageCount > MyGlobals.imageViewer.pageNumber) {
            this.showPreview(MyGlobals.imageViewer.objectId,  MyGlobals.imageViewer.pageNumber+1);
        }
    },

    loadPrevPage: function() {
        if (MyGlobals.imageViewer.pageNumber > 1) {
            this.showPreview(MyGlobals.imageViewer.objectId,  MyGlobals.imageViewer.pageNumber-1);
        }
    },

    restoreSidePanel: function() {
        var me = this,
            iPanel = MyGlobals.infoPanel,
            height, width;
        if (iPanel) {
            if (MyGlobals.isNarrow()) {
                iPanel.setTop(null);
                iPanel.setLeft(null);
                iPanel.setHeight(null);
                iPanel.setWidth(null);
                me.getLayout().setAnimation({
                    type: 'slide',
                    direction: 'left'
                });
                me.setActiveItem(iPanel);
            } else {
                height = me.element.getHeight();
                width = me.down('#contentContainer').element.getWidth();
                iPanel.setDocked(null);
                iPanel.setShowAnimation("slideIn");
                iPanel.setHideAnimation({
                    type: 'slideOut',
                    direction: 'right'
                });
                iPanel.setTop(0);
                iPanel.setLeft(width-320);
                iPanel.setHeight(height);
                iPanel.setWidth(320);
            }
        }
    },

    showInContentContainer: function() {
        var me = this, cc = MyGlobals.contentContainer;
        if (MyGlobals.isNarrow()) {
            me.getLayout().setAnimation({
                type: 'slide',
                direction: 'left'
            });
            me.setActiveItem(cc);
        }
    },

    showInfoPanelSlided: function(objectId, noteId, className) {
        var me = this,
            iPanel;

        if (MyGlobals.infoPanel) {
            me.remove(MyGlobals.infoPanel, true);
            MyGlobals.infoPanel = null;
        }

        iPanel = Ext.create('ACMobileClient.view.InfoPanel', {});
        iPanel.load(objectId);

        if (className && className === 'noteobject') {
            //switch not note view
            iPanel.showNote(noteId);
        }

        me.add(iPanel);
        iPanel.hide();

        iPanel.loadCallback = function() {
            var height, width;

            if (MyGlobals.isNarrow()) {
                me.getLayout().setAnimation({
                    type: 'slide',
                    direction: 'left'
                });
                me.setActiveItem(iPanel);    
            } else {
                height = me.element.getHeight();
                width = me.down('#contentContainer').element.getWidth();
                iPanel.setDocked(null);
                iPanel.setShowAnimation("slideIn");
                iPanel.setHideAnimation({
                    type: 'slideOut',
                    direction: 'right'
                });
                iPanel.setTop(0);
                iPanel.setLeft(width-320);
                iPanel.setHeight(height);
                iPanel.setWidth(320);
                iPanel.addCls('shadowPanel');

                iPanel.show();
            }
        };

        MyGlobals.infoPanel = iPanel;

    },

    showDownloadLinkPanelSlided: function(objectId, isFolder) {
        var me = this,
            linkPanel;

        if (MyGlobals.downloadLinkPanel) {
            me.remove(MyGlobals.downloadLinkPanel, true);
            MyGlobals.downloadLinkPanel = null;
        }

        linkPanel = Ext.create('ACMobileClient.view.DownloadLinkPanel', {});

        console.log("showDownloadLinkPanel id: " + objectId);
        linkPanel.objId = objectId;

        if(!isFolder){
            linkPanel.down("#uploadLinkContainer").setDisabled(true);
        } else {
            MyGlobals.mainPanel.toCheckAccessLevel(objectId, "upload", linkPanel, true);
        }

        me.add(linkPanel);

        if(Ext.browser.is.IE){
            if (MyGlobals.isNarrow()) {
                me.getLayout().setAnimation({
                    type: 'slide',
                    direction: 'left'
                });
                me.setActiveItem(linkPanel);    
            } else {
                //height = me.element.getHeight();
                width = me.down('#contentContainer').element.getWidth();
                linkPanel.setDocked(null);
                linkPanel.setShowAnimation("slideIn");
                linkPanel.setHideAnimation({
                    type: 'slideOut',
                    direction: 'right'
                });
                linkPanel.setTop(0);
                //linkPanel.setLeft(width-320);
                //linkPanel.setHeight(height);
                linkPanel.setWidth(width);
                //linkPanel.addCls('shadowPanel');

                linkPanel.show();
            }
        } else {
            linkPanel.show();
        }     

        MyGlobals.downloadLinkPanel = linkPanel;

    },

    showLoader: function() {
        this.down('#contentContainer').setMasked({ 
            xtype: 'loadmask', 
            message: 'loading' 
        });
    },

    showMail: function(objectId, persistent) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var mailView = Ext.create("ACMobileClient.view.MailViewContainer", {});
            mailView.load(objectId);
            me.loadContentContainer(mailView,persistent,true,"Mail");
        });
    },

    showMenuPanel: function() {
        if (MyGlobals.isNarrow()) {
            this.getLayout().setAnimation({
                type: 'slide',
                direction: 'right'
            });
            this.setActiveItem(MyGlobals.menuPanel);
        }
    },

    showPreview: function(objectId, page, persistent) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            //precreate a preview container
            var previewContainer = Ext.create("ACMobileClient.view.PreviewContainer", {});
            MyGlobals.previewContrainer = previewContainer;
            previewContainer.down('#previewCarousel').loadPreview(objectId, page, previewContainer);

            me.loadContentContainer(previewContainer,persistent,true,"Document");
        });
    },

    showText: function(objectId, persistent) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var textView = Ext.create("ACMobileClient.view.TextViewContainer", {});
            textView.load(objectId);
            me.loadContentContainer(textView,persistent,true,"Document");
        });
    },

    switchToRoot: function(obj) {
        //reset to root
        //remove all other items
        var me = obj,
            toRemove = me.getInnerItems().slice(1);

        console.log("switch to root");

        me.getLayout().setAnimation({
            type: 'slide',
            direction: 'right'
        });

        me.setActiveItem(0);
        setTimeout(function() {
            toRemove.forEach(function (el) {
                me.remove(el, true);
            });
        }, 500);

    },

    deleteItem: function(objectId, dataview){
        console.log("To delete Item: " + objectId);

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Deleting...'
        });

        Ext.Ajax.request({
            method:'DELETE',
            url:'/api/rest/object/' + objectId,
            params: {},
            success:function(response, success){
                Ext.Viewport.setMasked(false);
                dataview.getStore().loadPage(1);
            },
            failure:function(response){
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert("Failed", "Delete failed.", Ext.emptyFn);
            }
        });
    },

    createFolder: function(parentFolder, folderName, dataview){
        //console.log("To create folder, parent: " + parentFolder + " folderName: " + folderName);

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Creating...'
        });

        Ext.Ajax.request({
            method:'POST',
            url:"/api/rest/dataspace/createFolder.json",
            params: {destination:parentFolder, folderName:folderName},
            success:function(response, success){
                Ext.Viewport.setMasked(false);
                dataview.getStore().loadPage(1);
            },
            failure:function(response){
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert("Failed", "Create folder failed.", Ext.emptyFn);
            }
        });
    },

    renameItem: function(record){
        var objectId = record.get('id'),
            orgName = record.get('name'),
            newName = "",
            parmeter;

            Ext.Msg.prompt(
                "Rename", 
                "Please input new name: ", 
                function(buttonId, value){
                    if(buttonId === 'ok'){
                        newName = Ext.String.trim(value);

                        if(newName !== "" && newName !== orgName){
                            parmeter = Ext.String.format('{"name":"{0}"}', newName.replace('"', '\\"') );
                            console.log(parmeter);
                            //Ext.Viewport.setMasked(true);

                            ACUtils.utils.checkConnectionWithFunction(function() {
                                Ext.Ajax.request({
                                    method:'PUT',
                                    url:"/api/rest/object/"+ objectId +".json",
                                    params: {
                                        "data":parmeter
                                    },
                                    success:function(response, success){
                                        //Ext.Viewport.setMasked(false);
                                        record.set('name', newName);
                                    },
                                    failure:function(response){
                                        //Ext.Viewport.setMasked(false);
                                        Ext.Msg.alert("Failed", "Rename failed.", Ext.emptyFn);
                                    }
                                });
                            }); 
                        }
                    }
                },
                this,
                false,
                orgName
            );
    },

    checkObjectAccessLevel: function(record, actionSheet){
        var objectId = record.get("id"),
            accessLevelArry = ["write", "rename"],
            i, hasAccessLevel, rs;

        ACUtils.utils.checkConnectionWithFunction(function() {
            for(i=0; i<accessLevelArry.length; i+=1){
                MyGlobals.mainPanel.toCheckAccessLevel(objectId, accessLevelArry[i], actionSheet);
            }
        });
    },

    toCheckAccessLevel: function(objectId, accessLevel, container, isUploadLink){
        Ext.Ajax.request({
            method:'GET',
            url:"/api/rest/dataspace/hasAccessLevel.json",
            params: {
                "accessLevel":accessLevel,
                "objectIds":objectId
            },
            success:function(response, success){
                rs = Ext.JSON.decode(response.responseText, true);
                hasAccessLevel = rs.hasAccessLevel;

                switch(accessLevel){
                    case "write":
                        container.down("#btnDelete").setDisabled( !hasAccessLevel); // hasAccessLevel => ture, setDisabled(false)
                        break;                                                      // hasAccessLevel => false, setDisabled(true)
                    case "rename":
                        container.down("#btnRename").setDisabled( !hasAccessLevel);
                        break;
                    case "upload":
                        container.down("#uploadLinkContainer").setDisabled( !hasAccessLevel); 
                        break;
                    default:
                        break;
                }
            },
            failure:function(response){
                console.log("Get accessLevel failed: " + accessLevel);
            }
        });
    }

});