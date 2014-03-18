Ext.define('ACMobileClient.view.ImageViewer', {
    alias: 'widget.imageviewer',
    'require': ['ACMobileClient.store.PreviewStore'],

    'extend': 'Ext.Container',

    'doubleTapScale': 1,
    'maxScale': 1,
    'loadingMask': false, //true
    'imageSrc': false,
    'initOnActivate': false,
    'caller': null,
    'pageNumber': 1,
    'pageCount': 0,
    'isLoaded': false,
    'parentContainer': null,
    'objectId': null,
    'abortLoad': false,
    'imageViewerContainer': null,
    'nextImageViewer': null,
    'lastScrollBoundWidth': null,
    'loadNext': false,
    'isLoading': false,
    'mustInitialize': true,

    'config': {
        'cls': 'imageBox',
        'scrollable': 'both',
        'html': ['<figure><img></figure>'],
        'layout': {
            'type': 'fit'
        }
    },

    'initialize': function() {
        // this.on('painted', this.initViewer, this, {'single': true});
        this.callParent();
    },

    'doScrolling': function(enable) {
        var scroller = this.getScrollable().getScroller();
        scroller.setDisabled(!enable);
        scroller.setDirection("both");
    },

    'doWipe': function(enable) {
        this.caller.enableWipe(enable);
    },

    'initViewer': function() {
        var me = this, scroller;

        if (me.mustInitialize) {
            me.mustInitialize = false;

            me.doScrolling(false);
            me.doWipe(true);

            scroller = me.getScrollable().getScroller();

            // mask image viewer
            if (me.loadingMask) {
                me.mask(Ext.LoadingSpinner);
            }

            // retrieve DOM els
            me.figEl = me.element.down('figure');
            me.imgEl = me.figEl.down('img');

            // apply required styles
            me.figEl.setStyle({
                'overflow': 'hidden',
                'display': 'block',
                'margin': 0
            });

            me.imgEl.setStyle({
                '-webkit-user-drag': 'none',
                '-webkit-transform-origin': '0 0',
                'visibility': 'hidden'
            });

            // attach event listeners
            me.imgEl.dom.onload = Ext.Function.bind( me.onImageLoad, me, [me.imgEl], 0);
            me.imgEl.on('doubletap', me.onDoubleTap, me, {});
            me.imgEl.on('pinchstart', me.onImagePinchStart, me, {});
            me.imgEl.on('pinch', me.onImagePinch, me, {});
            me.imgEl.on('pinchend', me.onImagePinchEnd, me, {});
            me.on('resize', me.reloadViewer, me, {});
            me.imgEl.on('swipe', me.onSwipe, me, {});
            me.getScrollable().getScroller().on('scroll', me.onScroll, me, {});
            me.getScrollable().getScroller().on('scrollend', me.onScrollEnd, me, {});
        }

    },

    'onScrollEnd': function(scroller, x, y, eOpts) {
        console.log("onScrollEnd");
        //this.doScrolling(true);
    },

    'onScrollStart': function(scroller, x, y, eOpts) {
        console.log("onScrollStart");
    },

    'onScroll': function(scroller, x, y, eOpts) {
        var boundWidth = Math.max(this.imgWidth * this.scale, this.viewportWidth),
            boundHeight = Math.max(this.imgHeight * this.scale, this.viewportHeight),
            sw = -(this.viewportWidth-this.imgWidth*this.scale),
            sh = -(this.viewportHeight-this.imgHeight*this.scale),
            sow = x;

        this.scrollOffsetX = -x;
        this.scrollOffsetY = -y;

        if (sw < 0) {
            sw = 0;
        }
        if (sh < 0) {
            sh = 0;
        }

        if (sow > 0) {
            sow = sow - sw;
            if (sow < 0) {
                sow = 0;
            }
        }

        this.lastScrollBoundWidth = sow;
    },


    'onSwipe': function(ev, node, options, eOpts) {
        if (this.lastScrollBoundWidth !== null && Math.abs(this.lastScrollBoundWidth) > 30) {
           if (ev.direction === 'left') {
               //this.caller.loadNextPage();
               this.caller.next();
           }
           if (ev.direction === 'right') {
               //this.caller.loadPrevPage();
               this.caller.previous();
           }
        }
    },

    'reloadViewer': function() {
        var me = this;
        me.initViewer();

        me.doWipe(true);
        me.doScrolling(false);
        // get viewport size
        me.viewportWidth = me.element.getWidth();
        me.viewportHeight = me.element.getHeight();

        // grab image size
        me.imgWidth = me.imgEl.dom.width;
        me.imgHeight = me.imgEl.dom.height;

        // calculate and apply initial scale to fit image to screen
        if (me.imgWidth > me.viewportWidth || me.imgHeight > me.viewportHeight) {
            me.scale = me.baseScale =
                Math.min(me.viewportWidth/me.imgWidth, me.viewportHeight/me.imgHeight);
        } else {
            me.scale = me.baseScale = 1;
        }

        // set initial translation to center
        me.translateX = me.translateBaseX = (me.viewportWidth - me.baseScale * me.imgWidth) / 2;
        me.translateY = me.translateBaseY = 0;

        // apply initial scale and translation
        me.applyTransform();

        // initialize scroller configuration
        me.adjustScroller();
        me.getScrollable().getScroller().scrollTo(0, 0, false);
    },

    'onImageLoad': function() {
        this.fireEvent('imgload', this);
    },

    'onImagePinchStart': function(ev) {
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
        this.translateY += (-1 * ((this.imgHeight*(1-this.scale)) * (this.originFullImgY/this.imgHeight)));

        //alert((this.scrollOffsetX || 0));
        // apply new origin
        this.setOrigin(this.originFullImgX, this.originFullImgY);

        // apply translate and scale CSS
        this.applyTransform();
    },

    'onImagePinch': function(ev) {
        // prevent scaling to smaller than screen size
        this.maxScale = 1;
        this.scale = Ext.Number.constrain(ev.scale * this.startScale, this.baseScale, this.maxScale);
        //alert(thisscale);
        this.applyTransform();
    },

    'onImagePinchEnd': function(ev) {
        var curImgW, curImgH, posX, posY;

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
            curImgW = this.imgWidth * this.scale;
            curImgH = this.imgHeight * this.scale;

            posX = this.originViewportX - this.originReScaledImgX;
            posY = this.originViewportY - this.originReScaledImgY;

            console.log(posX+"/"+curImgW+", "+posY+"/"+curImgH);

            if (posX > 0) {
                posX = 0;
            }
            if (posY > 0) {
                posY = 0;
            }

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
    },


    'onDoubleTap': function(ev, t) {
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

            console.log("transX: "+(ev.pageX-this.element.getX()));
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
    },

    'setOrigin': function(x, y) {
        this.imgEl.dom.style.webkitTransformOrigin = x+'px '+y+'px';
    },

    'setTranslation':  function(translateX, translateY) {
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
    },

    'applyTransform': function() {
        var fixedX, fixedY, fixedScale;

        if (Math.abs(this.baseScale - this.scale) > 0.01) {
            this.doScrolling(true);
            this.doWipe(false);
        } else {
            this.doScrolling(false);
            this.doWipe(true);
        }

        fixedX = Ext.Number.toFixed(this.translateX,5);
        fixedY = Ext.Number.toFixed(this.translateY,5);
        fixedScale = Ext.Number.toFixed(this.scale, 8);

        if (Ext.os.is.Android) {
            this.imgEl.dom.style.webkitTransform =
                'matrix(' + fixedScale + ',0,0,' + fixedScale + ',' + fixedX + ',' + fixedY + ')';
        } else {

            // web-kit
            this.imgEl.dom.style.webkitTransform =
                'translate3d(' + (fixedX) + 'px, ' + (fixedY) + 'px, 0)'
                +' scale3d(' + fixedScale + ',' + fixedScale + ',1)';

            // IE10, firefox, opera
            this.imgEl.dom.style.transformOrigin = "0px 0px";
            this.imgEl.dom.style.transform =
                'translate3d(' + (fixedX) + 'px, ' + (fixedY) + 'px, 0)'
                +' scale3d(' + fixedScale + ',' + fixedScale + ',1)';
        }
    },

    'adjustScroller': function() {
        // size container to final image size
        var boundWidth = Math.max(this.imgWidth * this.scale, this.viewportWidth),
        boundHeight = Math.max(this.imgHeight * this.scale, this.viewportHeight);

        this.figEl.setStyle({
            'width': boundWidth + 'px',
            'height': boundHeight + 'px'
        });

        // update scroller to new content size
        this.getScrollable().refresh();

        // apply scroll
        if(typeof this.scrollX === 'undefined'){
            this.scrollX = 0;
        }
        if(typeof this.scrollY === 'undefined'){
            this.scrollY = 0;
        }
        this.getScrollable().getScroller().scrollTo(
                -this.scrollX,
                -this.scrollY,
                { 'duration' : 0 }
        );

        // update scroller to new content size
        this.getScrollable().refresh();
    }

});

