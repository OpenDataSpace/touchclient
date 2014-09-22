Ext.define('ACMobileClient.controller.PreviewController', {
    extend: 'Ext.app.Controller',

    requires: [
        'ACMobileClient.utils.ACUtils'
    ],

    config: {
        refs:{
            documentList : 'folderlistlist',
            imageviewercontainer : 'imageviewercontainer',
            imageviewer : 'imageviewer'
        },
        control:{
            documentList : {
                preview : 'previewItem'
            },
            imageviewercontainer : {
                viewershown : 'viewerShown',
                viewerhidden : 'viewerHidden'
            },
            imageviewer : {
                imgload : 'imgLoad'
                // tonext : 'toNext',
                // toprevious : 'toPrevious'
            }
        }
    },

    previewItem: function(classObject, objectId, name, persistent, record){
        console.log("PreviewItem in PreviewController");

        var me = this,
            page = 1;
        ACUtils.utils.checkConnectionWithFunction(function() {
            //precreate a preview container
            var previewContainer = Ext.create("ACMobileClient.view.PreviewContainer", {});
            MyGlobals.previewContrainer = previewContainer;

            me.currentPreviewContainer = previewContainer;

            me.loadPreview(objectId, page, previewContainer);
            me.loadContentContainer(previewContainer,persistent,true,"Document");
        });
        
    },

    imgLoad : function(imgViewer){
        var me = this;
        if (!imgViewer.parentContainer.isBeingRemoved) {
            imgViewer.isLoading = false;
            me.hideLoader(imgViewer);
            imgViewer.reloadViewer();
            if (imgViewer.nextImageViewer !== null && imgViewer.loadNext) {
                console.log("load next...");
                //preload next image
                me.viewerShown(imgViewer.nextImageViewer, false);
            }
        }

    },

    launch: function() {
        this.currentPreviewContainer = null;
    },

    'showLoader': function(imgViewer) {
        imgViewer.imageViewerContainer.showLoader();
        //imgViewer.hidePreview();
        // hidePreview function
        imgViewer.initViewer();
        imgViewer.imgEl.dom.style.visibility="hidden";
    },

    'hideLoader': function(imgViewer) {
        console.log('hideLoader in Controller');
        //var imgViewer = this;
        //console.log(imgViewer.imageViewerContainer)
        imgViewer.imageViewerContainer.hideLoader();
        imgViewer.imgEl.dom.style.visibility = "visible";
    },

    showInContentContainer: function() {
        var me = MyGlobals.mainPanel, cc = MyGlobals.contentContainer;
        if (MyGlobals.isNarrow()) {
            me.getLayout().setAnimation({
                type: 'slide',
                direction: 'left'
            });
            me.setActiveItem(cc);
        }
    },

    setPageLabel: function(page, pageCount) {
        this.currentPreviewContainer.down('#pageLabel').setHtml(page+"/"+pageCount);
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


    loadPreview: function(objectId, page, parentContainer) {
        console.log("loadPreview in PreviewController");

        var me = this,
            previewCarousel =  parentContainer.down('#previewCarousel');
            //MyGlobals.previewContrainer.down('#previewCarousel');
            //previewCarousel =  this.getPreviewCarousel();

        ACUtils.utils.checkConnectionWithFunction(function() {
            var imageViewerContainer,
                imageViewer,
                pageCount = 0,
                imageCarousel = previewCarousel,
                previewStore;

            previewCarousel.enableWipe(true);
            previewCarousel.removeAll(true, false);

            //put in there the ImageViewer-Preview-Module
            imageViewerContainer = Ext.create("ACMobileClient.view.ImageViewerContainer", {});
            imageViewer = Ext.create("ACMobileClient.view.ImageViewer", {});

            //console.log("============="+imageViewer.getId())

            imageViewer.caller = previewCarousel;
            imageViewer.parentContainer = parentContainer;
            imageViewer.imageViewerContainer = imageViewerContainer;
            imageViewer.loadNext = true;

            imageViewerContainer.imageViewer = imageViewer;
            imageViewerContainer.add(imageViewer);

            previewCarousel.add(imageViewerContainer);
            previewCarousel.setActiveItem(imageViewerContainer);

            previewCarousel.on('activeitemchange', previewCarousel.onMycarouselActiveItemChange, previewCarousel, {});
            imageViewerContainer.showLoader();

            //load first image
            console.log('load preview 1: '+objectId+", "+page);


            previewStore = Ext.create('ACMobileClient.store.PreviewStore', {});
            previewStore.source = objectId;
            previewStore.page = page;
            previewStore.tryCount = 10;

            previewStore.on('load', function(store, records, successful, operation, eOpts) {
                var mdl = previewStore.getAt(0),
                    ticket, pageCount, lastImageViewer, i, imageViewerContainer2, imageViewer2;
                
                if (!successful) {
                    console.log("preview 1 failed");
                    if(operation.error.status === 0 && previewStore.tryCount > 0){ // time out
                        previewStore.tryCount -= 1;
                        previewStore.load();
                    } else {
                        Ext.Msg.alert("", "Failed to preview.", function(){
                            MyGlobals.mainPanel.contentContainerBack();
                        });
                    }

                    return;
                }
                //ticket = mdl.get('ticket');
                ticket = objectId; //mdl.get('ticket');
                pageCount = mdl.get("total");//previewStore.getTotalCount();
                lastImageViewer = imageViewer;

                console.log("preview 1 finished");
                console.log('ticket: ' + ticket + ', ' + pageCount);

                //parentContainer.setPageLabel(page, pageCount);
                me.setPageLabel(page, pageCount);

                //all other images
                for (i = 1; i < pageCount; i+=1) {
                    console.log("init next page: ", i);

                    imageViewerContainer2 = Ext.create("ACMobileClient.view.ImageViewerContainer", {});
                    imageViewer2 = Ext.create("ACMobileClient.view.ImageViewer", {});

                    //console.log("--------" + imageViewer2.getId())

                    imageViewerContainer2.imageViewer = imageViewer2;
                    imageViewer2.imageViewerContainer = imageViewerContainer2;
                    imageViewer2.caller = imageCarousel;
                    lastImageViewer.nextImageViewer = imageViewer2;
                    lastImageViewer = imageViewer2;
                    imageViewer2.page = i+1;
                    imageViewer2.pageCount = pageCount;
                    imageViewer2.objectId = objectId;
                    imageViewerContainer2.showLoader();
                    imageViewer2.parentContainer = parentContainer;
                    imageViewerContainer2.add(imageViewer2);
                    imageCarousel.add(imageViewerContainer2);        
                }

                //imageViewer.loadImageFromServer(ticket, pageCount, page, objectId);
                me.loadImageFromServer(imageViewer, ticket, pageCount, page, objectId);

            });

            //now load the preview
            previewStore.load();

        });
    },

    'loadImageFromServer': function(imgViewer, previewTicket, pageCount, page, objectId) {
        var imgSrc = "/api/rest/object/preview/" + previewTicket +
            ".jpg?noCache=" + new Date().getTime() + "&sessionId=" + MyGlobals.sessionId +
            "&page=" + page,

            me = this;

        //imgViewer.showLoader();
        me.showLoader(imgViewer);
        imgViewer.isLoaded = true;

        //imgViewer.loadImage(imgSrc);
        imgViewer.initViewer();
        imgViewer.imageSrc = imgSrc;
        imgViewer.imgEl.dom.src = imgSrc;


        imgViewer.pageCount = pageCount;
        imgViewer.page = page;
        imgViewer.pageNumber = page;
        imgViewer.objectId = objectId;
    },

    'viewerHidden': function(imgViewer) {
        imgViewer.abortLoad = true;
    },

    'viewerShown': function(imgViewer, loadNext) {
        console.log("Controller viewerShown called: "+loadNext);
        var me = this;
        imgViewer.abortLoad = false;
        imgViewer.loadNext = loadNext;
        if (loadNext) {
            //imgViewer.parentContainer.setPageLabel(imgViewer.page, imgViewer.pageCount);
            me.setPageLabel(imgViewer.page, imgViewer.pageCount);
        }
        //var imgViewer = imgViewer;
        if (imgViewer.isLoaded === false) {
            me.showLoader(imgViewer);
        }

        imgViewer.reloadViewer();

        setTimeout(function() {
            var previewStore;
            if (!imgViewer.abortLoad) {
                console.log("isLoaded? " + imgViewer.isLoaded + ", isLoading? " + imgViewer.isLoading);
                if (imgViewer.isLoaded === false && imgViewer.isLoading === false) {
                    imgViewer.isLoading = true;

                    //load first image
                    console.log('load preview 2: ' + imgViewer.objectId + ", " + imgViewer.page);
                    previewStore = Ext.create('ACMobileClient.store.PreviewStore', {});
                    previewStore.source = imgViewer.objectId;
                    previewStore.page = imgViewer.page;

                    previewStore.on('load', function() {
                        var mdl = previewStore.getAt(0),
                            ticket = imgViewer.objectId,//mdl.get('ticket'),
                            pageCount = mdl.get("total");//previewStore.getTotalCount();

                        console.log("LoadPreview 2 finished");
                        //imgViewer.loadImageFromServer(ticket, pageCount, imgViewer.page, imgViewer.objectId);
                        me.loadImageFromServer(imgViewer, ticket, pageCount, imgViewer.page, imgViewer.objectId);
                    });

                    //now load the preview
                    previewStore.load();

                } else {
                    if (imgViewer.nextImageViewer !== null && imgViewer.loadNext) {
                        console.log("load next...");
                        //preload next image
                        //imgViewer.nextImageViewer.viewerShown(false);
                        me.viewerShown(imgViewer.nextImageViewer, false);
                    }
                }
            }
        }, 500);
    }

});