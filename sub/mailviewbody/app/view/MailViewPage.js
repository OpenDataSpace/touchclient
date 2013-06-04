/*
 * File: app/view/MailViewPage.js
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

Ext.define('ACMobileClient.view.MailViewPage', {
    extend: 'Ext.Container',
    alias: 'widget.mailviewpage',

    config: {
        itemId: '',
        tpl: [
            '{text}'
        ],
        listeners: [
            {
                fn: 'onContainerInitialize',
                event: 'initialize'
            }
        ]
    },

    onContainerInitialize: function(component, eOpts) {
        var urlVars = getUrlVars();
        if (urlVars["objectId"]) {
            var objectId = urlVars["objectId"];
            this.dataStore = Ext.create('ACMobileClient.store.MailTextViewStore', {});

            var me = this;

            this.dataStore.on('load', function(store, records) {
                me.loadMask(store.getAt(0));
            });

            //event, after store has been loaded
            this.dataStore.load( {
                params: {	
                    objectIds: objectId
                }
            });
        }
    },

    loadMask: function(record) {

        var data = record.getData(true);
        this.setData(data);
        //this.element.down('#bodyText').dom.innerHTML = record.get('text');

        /*
        var bodyTextDiv = this.element.down('#bodyText').dom;
        var w = parseInt(getStyle(bodyTextDiv, "width"));
        var h = parseInt(getStyle(bodyTextDiv, "height"));
        var wc = parseInt(getStyle(this.element.dom, "width"));

        if (w > wc) {
        //scale down
        var fac = wc/w;
        setStyle(bodyTextDiv, "-webkit-transform-origin", "0 0");
        setStyle(bodyTextDiv, "-webkit-transform", "scale("+fac+")");

        //recalc new height and width
        var nw = w * fac;
        var nh = h * fac;

        setStyle(bodyTextDiv, "width", nw+"px");
        setStyle(bodyTextDiv, "height", nh+"px");

    }
    this.setMasked(false);
    */

    //var wc = getStyle(, "width");
    //alert(w + " == "+ wc);
    //this.doLayout();
    //this.down('#bodyText').show();

    }

});