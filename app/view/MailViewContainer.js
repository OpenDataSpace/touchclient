/*
 * File: app/view/MailViewContainer.js
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

Ext.define('ACMobileClient.view.MailViewContainer', {
    extend: 'Ext.Panel',

    config: {
        scrollable: 'both',
        items: [
            {
                xtype: 'container',
                cls: 'mail_frame',
                itemId: 'fromLine',
                minHeight: 30,
                padding: 10,
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'label',
                        flex: 0,
                        cls: 'mail_label',
                        html: 'From:',
                        itemId: 'fromLabel',
                        padding: '0 5 0 0'
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        itemId: 'fromButtons'
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'mail_frame',
                itemId: 'toLine',
                minHeight: 30,
                padding: 10,
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'label',
                        flex: 0,
                        cls: 'mail_label',
                        html: 'To:',
                        itemId: 'fromLabel',
                        padding: '0 5 0 0'
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        itemId: 'toButtons'
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'mail_frame',
                itemId: 'subjectLine',
                minHeight: 30,
                padding: 10,
                items: [
                    {
                        xtype: 'label',
                        cls: 'mail_subject',
                        html: '',
                        itemId: 'subjectLabel',
                        padding: '0 5 0 0',
                        tpl: [
                            '{subject}'
                        ]
                    },
                    {
                        xtype: 'label',
                        cls: 'mail_date',
                        html: '',
                        itemId: 'dateLabel',
                        padding: '0 5 0 0',
                        tpl: [
                            '{mailDate:date("m.d.Y h:i")}'
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                itemId: 'bodyContainer'
            },
            {
                xtype: 'container',
                cls: 'scaled_content',
                hidden: true,
                html: '',
                id: '',
                itemId: 'bodyTextOld',
                padding: 10,
                tpl: [
                    '{text}'
                ],
                ui: 'light'
            },
            {
                xtype: 'container',
                height: 10,
                itemId: 'attachments',
                layout: {
                    type: 'hbox'
                },
                scrollable: false,
                items: [
                    {
                        xtype: 'list',
                        flex: 1,
                        itemId: 'attachmentList',
                        padding: '0 0 10 0 ',
                        ui: 'round',
                        deselectOnContainerClick: false,
                        itemTpl: [
                            '<div class="list_style">',
                            '<div class="list_icons">',
                            '<div class="list_icon list_icon_{className}"></div>',
                            '</div>',
                            '<div class="list_entry">{name}</div>',
                            '</div>'
                        ]
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                hidden: true,
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'reply'
                    },
                    {
                        xtype: 'button',
                        iconAlign: 'right',
                        iconCls: 'compose'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onAttachmentListSelect',
                event: 'select',
                delegate: '#attachmentList'
            }
        ]
    },

    onAttachmentListSelect: function(dataview, record, eOpts) {
        var classObject = record.get("className");
        var objectId = record.get("objectId");
        var name = record.get("name");

        MyGlobals.mainPanel.handleObject(classObject, objectId, name, true, record);

        var me = this;
        setTimeout(function() {
            me.down('#attachmentList').deselectAll();
        }, 100);
    },

    load: function(objectId) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            me.dataStore = Ext.create('ACMobileClient.store.MailViewStore', {});

            me.setMasked({
                xtype: 'loadmask',
                message: 'Loading mail'
            });

            me.dataStore.on('load', function(store, records) {
                me.loadMask(store.getAt(0), objectId);
            });

            //event, after store has been loaded
            me.dataStore.load( {
                params: {	
                    id: objectId
                }
            });
        });
    },

    onDoubleTap: function(ev, t) {
        var bodyTextDiv = this.down('#bodyText').element.dom;
        if (this.scaled) {
            setStyle(bodyTextDiv, "-webkit-transform-origin", "0 0");
            setStyle(bodyTextDiv, "-webkit-transform", "scale(1)");

            setStyle(bodyTextDiv, "width", this.orgWidth+"px");
            setStyle(bodyTextDiv, "height", this.orgHeight+"px");
        }
        else {
            setStyle(bodyTextDiv, "-webkit-transform-origin", "0 0");
            setStyle(bodyTextDiv, "-webkit-transform", "scale("+this.scaleFactor+")");

            setStyle(bodyTextDiv, "width", this.scaleWidth+"px");
            setStyle(bodyTextDiv, "height", this.scaleHeight+"px");
        }

        this.scaled = !this.scaled;

    },

    loadMask: function(record, objectId) {
        var data = record.getData(true);
        this.down('#subjectLabel').setData(data);
        this.down('#dateLabel').setData(data);

        //from
        var fromAddress = record.get('from');
        var but1 = Ext.create('ACMobileClient.view.MailButton', {});
        but1.setHtml(Ext.String.htmlEncode(fromAddress));
        this.down('#fromButtons').add(but1);

        //to
        var toAddresses = record.get('to');
        if (toAddresses) {
            for (var adr in toAddresses) {
                var theAddress = toAddresses[adr];
                var butTo = Ext.create('ACMobileClient.view.MailButton', {});
                butTo.setHtml(Ext.String.htmlEncode(theAddress));
                this.down('#toButtons').add(butTo);
            }
        }

        var bodyText = Ext.create('Ext.Container', {
            cls: [
            'scaled_content'
            ],
            html: '',
            itemId: 'bodyText',
            padding: 10,
            ui: 'light'
        });

        var text = data.text;
        text = text.replace(/cid:/gi, "/api/rest/object/embed/");
        bodyText.setHtml(text);
        var bodyTextDiv = bodyText.element.dom;

        //this.element.down('#bodyText').dom.innerHTML = record.get('text');
        //this.down('#bodyText').setHtml('<iframe width="100%" height="100%" border="0" frameborder="0" scrolling="no"  src="mailviewbody/mailviewbody.jsp?objectId='+objectId+'"/>');

        var tags = bodyTextDiv.getElementsByTagName('style');
        if (tags) {
            for (var st=0;st<tags.length;st++) {
                tags[st].parentNode.removeChild(tags[st]);
            }
        }

        tags = bodyTextDiv.getElementsByTagName('script');
        if (tags) {
            for (var st=0;st<tags.length;st++) {
                tags[st].parentNode.removeChild(tags[st]);
            }
        }

        tags = bodyTextDiv.getElementsByTagName('meta');
        if (tags) {
            for (var st=0;st<tags.length;st++) {
                tags[st].content='';
            }
        }

        this.down('#bodyContainer').add(bodyText);
        //this.add(bodyText);

        bodyText.element.on('doubletap', this.onDoubleTap, this, {}); 
        this.scaled = true;
        var w = parseInt(getStyle(bodyTextDiv, "width"));
        this.orgWidth = w;
        var h = parseInt(getStyle(bodyTextDiv, "height"));
        this.orgHeight = h;
        var wc = parseInt(getStyle(this.element.dom, "width"));

        if (w > wc) {
            //scale down
            var fac = wc/w;
            this.scaleFactor = fac;
            setStyle(bodyTextDiv, "-webkit-transform-origin", "0 0");
            setStyle(bodyTextDiv, "-webkit-transform", "scale("+fac+")");

            //recalc new height and width
            var nw = w * fac;
            var nh = h * fac;
            this.scaleWidth = nw;
            this.scaleHeight = nh;
            setStyle(bodyTextDiv, "width", nw+"px");
            setStyle(bodyTextDiv, "height", nh+"px");

        }

        //load attachments
        //var modl = Ext.create('ACMobileClient.model.MailAttachmentModel', {});
        //var attas = record.get('attachments');
        var store = Ext.create('ACMobileClient.store.MailAttachmentStore');
        var me = this;
        store.on('load', function(record) {
            if (record.data.length == 0) {
                me.down('#attachments').hide();
            }
            else {
                me.down('#attachments').setHeight(47*record.data.length+2*13);
                console.log("h: "+me.down('#attachments').getHeight()+", "+record.data.length);
            }
        });

        this.down('#attachmentList').setStore(store);
        store.load({
            params: {
                sessionId: MyGlobals.sessionId,
                source: objectId
            }
        });



        this.setMasked(false);

        //var wc = getStyle(, "width");
        //alert(w + " == "+ wc);
        //this.doLayout();
        //this.down('#bodyText').show();

    }

});