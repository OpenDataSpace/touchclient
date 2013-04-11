Ext.define('ACMobileClient.view.ImageViewer', {
	extend: 'Ext.Container',
	
		doubleTapScale: 1
		,maxScale: 1
		,loadingMask: false //true
		,imageSrc: false
		,initOnActivate: false
		,caller: null
		,pageNumber: 1
		,pageCount: 0
		,isLoaded: false
		,parentContainer: null
		,objectId: null
		,abortLoad: false
		,imageViewerContainer: null
		,nextImageViewer: null
		,loadNext: false
		,isLoading: false

	,config: {
		cls: 'imageBox'
		,scrollable: 'both'
		,html: ['<figure><img></figure>']
		,layout: {
			type: 'fit'
    }
	}

	,showLoader: function() {
		this.imageViewerContainer.showLoader();
		this.hidePreview();
	}
	
	,hideLoader: function() {
		this.imageViewerContainer.hideLoader();
		var imgViewer = this;
		imgViewer.imgEl.dom.style.visibility="visible";
		/*
		setTimeout(function() {
		}, 100);*/
	}
	
	,initialize: function() {
		this.on('activate', this.initViewer, this, {delay: 10, single: true});
		this.callParent();
	}
	
	,loadImageFromServer: function(previewTicket, pageCount, page, objectId) {
		console.log("loading image from server");
		this.showLoader();
		this.isLoaded = true;
		var imgSrc = "/api/rest/object/preview/"+previewTicket+
			".png?noCache="+new Date().getTime()+"&sessionId="+MyGlobals.sessionId;

		this.loadImage(imgSrc);
		this.pageCount = pageCount;
		this.page = page;
		this.pageNumber = page;
		this.objectId = objectId;

		//Ext.Msg.alert("Info", ""+jsonResp.previewTicket+", "+jsonResp.pageCount);
	}
	
	,doScrolling: function(enable) {
		var scroller = this.getScrollable().getScroller();
		scroller.setDisabled(!enable);
		scroller.setDirection("both");
	}

	,doWipe: function(enable) {
		this.caller.enableWipe(enable);
	}
	
	,initViewer: function() {
		this.doScrolling(false);
		this.doWipe(true);
		var scroller = this.getScrollable().getScroller();
		//scroller
		
		// mask image viewer
		if(this.loadingMask)
			this.mask(Ext.LoadingSpinner);
			

		// retrieve DOM els
		this.figEl = this.element.down('figure');
		this.imgEl = this.figEl.down('img');
		//this.divEl = this.figEl.down('div');

		// apply required styles
		this.figEl.setStyle({
			overflow: 'hidden',
			display: 'block'
			,margin: 0
		});

		this.imgEl.setStyle({
			'-webkit-user-drag': 'none'
			,'-webkit-transform-origin': '0 0'
			,'visibility': 'hidden'

		});
		
		// attach event listeners
		this.imgEl.dom.onload = Ext.Function.bind( this.onImageLoad, this, [this.imgEl], 0);

		this.imgEl.on('doubletap', this.onDoubleTap, this, {});
		this.imgEl.on('pinchstart', this.onImagePinchStart, this, {});
		this.imgEl.on('pinch', this.onImagePinch, this, {});
		this.imgEl.on('pinchend', this.onImagePinchEnd, this, {});
		this.on('resize', this.reloadViewer, this, {});
		this.imgEl.on('swipe', this.onSwipe, this, {});
		this.imgEl.on('dragend', this.onDragEnd, this, {});
		this.getScrollable().getScroller().on('scroll', this.onScroll, this, {});
		this.getScrollable().getScroller().on('scrollend', this.onScrollEnd, this, {});
		
		// load image
		/*
		if(this.imageSrc) {
			this.loadImage(this.imageSrc);
		}
		*/
	}
	
	,viewerHidden: function() {
		this.abortLoad = true;
	}
	
	,viewerShown: function(loadNext) {
		console.log("viewerShown called: "+loadNext);
		this.abortLoad = false;
		this.loadNext = loadNext;
		if (loadNext) {
			this.parentContainer.setPageLabel(this.page, this.pageCount);
		}
		var imgViewer = this;
		if (imgViewer.isLoaded == false) {
			this.showLoader();
		}
		
		imgViewer.reloadViewer();
		
		setTimeout(function() {
			if (!imgViewer.abortLoad) {
				console.log("isLoaded? "+imgViewer.isLoaded+", "+imgViewer.isLoading);
				if (imgViewer.isLoaded == false && imgViewer.isLoading == false) {
					imgViewer.isLoading = true;
					
					//load first image
					console.log('load preview 2: '+imgViewer.objectId+", "+imgViewer.page);
					var previewStore = Ext.create('ACMobileClient.store.PreviewStore', {});
					previewStore.source = imgViewer.objectId;
					previewStore.page = imgViewer.page;

					previewStore.on('load', function() {
							console.log("LoadPreview 2 finished");
							var mdl = previewStore.getAt(0);
							var ticket = +mdl.get('ticket');
							var pageCount = previewStore.getTotalCount();
							
							imgViewer.loadImageFromServer(ticket, pageCount, imgViewer.page, imgViewer.objectId);
					});
					
					//now load the preview
					previewStore.load();
								
				}
				else {
					if (imgViewer.nextImageViewer != null && imgViewer.loadNext) {
						console.log("load next...");
						//preload next image
						imgViewer.nextImageViewer.viewerShown(false);
					}
				}
			}
		}, 500);
	}
	
	,onDragEnd: function(event, node, options, eOpts) {
		console.log("onDragEnd");
		//this.doScrolling(true);
	}

	,onScrollEnd: function(scroller, x, y, eOpts) {
		console.log("onScrollEnd");
		//this.doScrolling(true);
	}

	,onScrollStart: function(scroller, x, y, eOpts) {
		console.log("onScrollStart");
	}
	
	,onScroll: function(scroller, x, y, eOpts) {
		this.scrollOffsetX = -x;
		this.scrollOffsetY = -y;

		var boundWidth = Math.max(this.imgWidth * this.scale, this.viewportWidth);
		var boundHeight = Math.max(this.imgHeight * this.scale, this.viewportHeight);
		
		var sw = -(this.viewportWidth-this.imgWidth*this.scale);
		var sh = -(this.viewportHeight-this.imgHeight*this.scale);
		
		if (sw < 0) sw = 0;
		if (sh < 0) sh = 0;
		
		var sow = x;
		if (sow > 0) {
			sow = sow - sw;
			if (sow < 0) sow = 0;
		}	
		
		this.lastScrollBoundWidth = sow;
		/*
		if (sow != 0) {
			this.doWipe(true);
			this.doScrolling(false);
		}
		else {
			this.doWipe(false);
			this.doScrolling(true);
		}
		*/
		//console.log("scrollOffs: "+x+", "+y+", "+sow);
	}
	
	
	,onSwipe: function(ev, node, options, eOpts) {
		/*
		if (Math.abs(this.lastScrollBoundWidth) > 30) {
			if (ev.direction == 'left') this.caller.loadNextPage();
			if (ev.direction == 'right') this.caller.loadPrevPage();
			//console.log("swipe: "+ev.direction);
		}
		*/
	}
	
	,hidePreview: function() {
		if (this.imgEl) {
			this.imgEl.dom.style.visibility="hidden";
		}
	}
	
	,loadImage: function(src) {	
		this.imageSrc = src;
		if(this.imgEl) {
			this.imgEl.dom.src = src;
		}
	}

	,reloadViewer: function() {
		if (!this.imgEl) return;
		
		this.doWipe(true);
		this.doScrolling(false);
		// get viewport size
		this.viewportWidth = this.element.getWidth();
		this.viewportHeight = this.element.getHeight();
		
		// grab image size
		this.imgWidth = this.imgEl.dom.width
		this.imgHeight = this.imgEl.dom.height;
		// calculate and apply initial scale to fit image to screen
		if(this.imgWidth > this.viewportWidth || this.imgHeight > this.viewportHeight)
			this.scale = this.baseScale = Math.min(this.viewportWidth/this.imgWidth, this.viewportHeight/this.imgHeight);
		else
			this.scale = this.baseScale = 1;
		
		// set initial translation to center
		this.translateX = this.translateBaseX = (this.viewportWidth - this.baseScale * this.imgWidth) / 2;
		this.translateY = this.translateBaseY = 0; //-this.imgHeight / 2; //this.translateBaseY = (this.viewportHeight - this.baseScale * this.imgHeight) / 2;
		
		// apply initial scale and translation
		this.applyTransform();
		
		// initialize scroller configuration
		this.adjustScroller();

		// show image and remove mask
		//this.imgEl.setStyle({ visibility: 'visible' });

		this.getScrollable().getScroller().scrollTo(0, 0, false);
		//this.imgEl.dom.style.visibility="visible";
	}
	
	,onImageLoad: function() {
		if (!this.parentContainer.isBeingRemoved) {
			//this.fireEvent('imageLoaded', this);
			this.isLoading = false;
			this.hideLoader();
			this.reloadViewer();
			if (this.nextImageViewer != null && this.loadNext) {
				console.log("load next...");
				//preload next image
				this.nextImageViewer.viewerShown(false);
			}
		}
	}

	
	,onImagePinchStart: function(ev) {
		//console.log("onImagePinchStart");
		// disable scrolling during pinch
		//this.getScrollable().getScroller().stopMomentumAnimation();
		//this.scroller.disable();
			
		// store beginning scale
		this.startScale = this.scale;
		
		// calculate touch midpoint relative to image viewport
		//alert(ev.touches[0].pageX);
		this.originViewportX = (ev.touches[0].pageX + ev.touches[1].pageX) / 2 - this.element.getX();
		this.originViewportY = (ev.touches[0].pageY + ev.touches[1].pageY) / 2 - this.element.getY();
		
		// translate viewport origin to position on scaled image
		this.originScaledImgX = this.originViewportX - (this.scrollOffsetX || 0) - this.translateX;
		this.originScaledImgY = this.originViewportY - (this.scrollOffsetY || 0) - this.translateY;
		
		// unscale to find origin on full size image
		this.originFullImgX = this.originScaledImgX / this.scale;
		this.originFullImgY = this.originScaledImgY / this.scale;
		
		// calculate translation needed to counteract new origin and keep image in same position on screen
		this.translateX += (-1 * ((this.imgWidth*(1-this.scale)) * (this.originFullImgX/this.imgWidth)));
		this.translateY += (-1 * ((this.imgHeight*(1-this.scale)) * (this.originFullImgY/this.imgHeight)))
	
		//alert((this.scrollOffsetX || 0));
		// apply new origin
		this.setOrigin(this.originFullImgX, this.originFullImgY);
	
		// apply translate and scale CSS
		this.applyTransform();
	}
	
	,onImagePinch: function(ev) {
		//alert("onImagePinch");
		// prevent scaling to smaller than screen size
		this.maxScale = 1;
		this.scale = Ext.Number.constrain(ev.scale * this.startScale, this.baseScale, this.maxScale);
		//alert(thisscale);
		this.applyTransform();
	}
	
	,onImagePinchEnd: function(ev) {
		// set new translation
		if(Math.abs(this.baseScale - this.scale) < 0.01) {
			// move to center
			this.setTranslation(this.translateBaseX, this.translateBaseY);
		}
		else {
			// calculate rescaled origin
			this.originReScaledImgX = this.originScaledImgX * (this.scale / this.startScale);
			this.originReScaledImgY = this.originScaledImgY * (this.scale / this.startScale);
			
			// maintain zoom position
			//hierher
			var curImgW = this.imgWidth * this.scale;
			var curImgH = this.imgHeight * this.scale;
			
			var posX = this.originViewportX - this.originReScaledImgX;
			var posY = this.originViewportY - this.originReScaledImgY;
			
			console.log(posX+"/"+curImgW+", "+posY+"/"+curImgH);
			
			if (posX > 0) posX = 0;
			if (posY > 0) posY = 0;
			
			if (curImgW < this.viewportWidth) {
				posX = (this.viewportWidth - curImgW)/2;
			}
			
			if (curImgH < this.viewportHeight) {
				posY = (this.viewportHeight - curImgH)/2;
			}
			this.setTranslation(posX, posY);			
		}
		// reset origin and update transform with new translation
		this.setOrigin(0, 0);
		this.applyTransform();

		// adjust scroll container
		this.adjustScroller();
	}

	
	,onDoubleTap: function(ev, t) {
		/*
		alert(this.doubleTapScale);
		if(!this.doubleTapScale)
			return false;
		*/
		// set scale and translation
		if(Math.abs(this.baseScale - this.scale) > 0.01) {
			// zoom out to base view
			this.doScrolling(false);
			this.doWipe(true);
			
			this.scale = this.baseScale;
			this.setTranslation(this.translateBaseX, this.translateBaseY);
		}
		else {
			// zoom in toward tap position
			this.doScrolling(true);
			this.doWipe(false);

			console.log("trasnX: "+(ev.pageX-this.element.getX()));
			var oldScale = this.scale
				,newScale = 1
				,originViewportX = ev ? (ev.pageX - this.element.getX()) : 0
				,originViewportY = ev ? (ev.pageY - this.element.getY()) : 0
				,originScaledImgX = originViewportX - (this.scrollOffsetX || 0) - this.translateX
				,originScaledImgY = originViewportY - (this.scrollOffsetY || 0)  - this.translateY
				,originReScaledImgX = originScaledImgX * (newScale / oldScale)
				,originReScaledImgY = originScaledImgY * (newScale / oldScale);
				
			this.scale = newScale;
			this.setTranslation(originViewportX - originReScaledImgX, originViewportY - originReScaledImgY);
		}
			
		// reset origin and update transform with new translation
		this.applyTransform();

		// adjust scroll container
		this.adjustScroller();
		
		// force repaint to solve occasional iOS rendering delay
		//Ext.repaint();
	}
	
	,setOrigin: function(x, y) {
		this.imgEl.dom.style.webkitTransformOrigin = x+'px '+y+'px';
	}
	
	,setTranslation:  function(translateX, translateY) {
		this.translateX = translateX;
		this.translateY = translateY;
			
		// transfer negative translations to scroll offset
		this.scrollX = this.scrollY = 0;
		
		if(this.translateX < 0) {
			this.scrollX = this.translateX;
			this.translateX = 0;
		}
		if(this.translateY < 0) {
			this.scrollY = this.translateY;
			this.translateY = 0;
		}
	}
		

	,applyTransform: function() {
		if(Math.abs(this.baseScale - this.scale) > 0.01) {
			//console.log("zoomed in");
			this.doScrolling(true);
			this.doWipe(false);
		}
		else {
			//console.log("zoomed out");
			this.doScrolling(false);
			this.doWipe(true);
		}
		var fixedX = Ext.Number.toFixed(this.translateX,5)
			,fixedY = Ext.Number.toFixed(this.translateY,5)
			,fixedScale = Ext.Number.toFixed(this.scale, 8);
	
		if(Ext.os.is.Android) {
			this.imgEl.dom.style.webkitTransform = 
				//'translate('+fixedX+'px, '+fixedY+'px)'
				//+' scale('+fixedScale+','+fixedScale+')';
				'matrix('+fixedScale+',0,0,'+fixedScale+','+fixedX+','+fixedY+')'
		}
		else {
			//console.log("zoomed: "+fixedX+", "+fixedY+", "+fixedScale);
			
			this.imgEl.dom.style.webkitTransform =
				'translate3d('+(fixedX)+'px, '+(fixedY)+'px, 0)'
				+' scale3d('+fixedScale+','+fixedScale+',1)';
		}
		
	}


	,adjustScroller: function() {
		// size container to final image size
		var boundWidth = Math.max(this.imgWidth * this.scale, this.viewportWidth);
		var boundHeight = Math.max(this.imgHeight * this.scale, this.viewportHeight);

		this.figEl.setStyle({
			width: boundWidth + 'px'
			,height: boundHeight + 'px'
		});
		
		// update scroller to new content size
		this.getScrollable().refresh();

		// apply scroll
		this.getScrollable().getScroller().scrollTo(
			-this.scrollX || 0, -this.scrollY || 0, {
        duration : 0				
    });
		
		// update scroller to new content size
		this.getScrollable().refresh();
	}

});

