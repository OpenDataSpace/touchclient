Ext.define('ACMobileClient.view.DownloadLinkPanel', {
    extend: 'Ext.Container',
    //extend: 'Ext.form.Panel',
    alias: 'widget.downloadLinkPanel',
    required: "ACMobileClient.model.ObjectDownloadLinkModel",


    config: {
        // style: 'font-size:1.25em',
        layout: {
            type: 'fit'
        },
        items: [
            {
                // layout: {
                //         type: 'fit'
                // },
                xtype: 'container',
                //itemId: 'viewContainer2',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        itemId: 'objectInfoToolbar',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'closeButtonLeft',
                                iconCls: 'arrow_left'
                            },
                            {
                                xtype: 'spacer'
                            },
                            {
                                xtype: 'button',
                                itemId: 'closeButtonRight',
                                iconCls: 'arrow_right'
                            }
                        ]
                    },
                    {
                        // layout: {
                        //     type: 'card'
                        // },
                        xtype: 'container',
                        itemId: 'cardContainer',
                        items: [
                            {
                                // layout: {
                                //     type: 'fit'
                                // },
                                xtype: 'container',
                                // itemId: 'infoContainer',
                                padding: 10,
                                fullscreen: true,
                                style: {
                                    width: '100%',
                                    height: '100%'
                                },
                                scrollable:{
                                    directionLock: true,
                                    direction: 'vertical'
                                },
                                cls: 'infoContainer',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: "Create Download Link",
                                        items: [
                                            {
                                                xtype: 'emailfield',
                                                itemId: 'mailaddress',
                                                name: 'email',
                                                label: 'Mail Address',
                                                labelWidth: 110,
                                                required: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'subject',
                                                //clearIcon: false,
                                                label: 'Subject',
                                                labelWidth: 110,
                                                required: true
                                            },
                                            {
                                                xtype:'datepickerfield',
                                                name: 'expirationDate',
                                                itemId: 'expirationDate',
                                                label:'Expiration Date',
                                                dataFormat :'Y/m/d',
                                                labelWidth: 110,
                                                picker:{
                                                    yearFrom:parseInt(Ext.Date.format(new Date(), 'Y'), 10),
                                                    yearTo:2100
                                                },
                                                value:new Date()
                                            },
                                            {
                                                xtype: 'passwordfield',
                                                itemId: 'password',
                                                label: 'Password',
                                                labelWidth: 110,
                                                name: 'password'
                                            },
                                            {
                                                xtype: 'textareafield',
                                                cls: 'myTextArea',
                                                itemId: 'message',
                                                clearIcon: false,
                                                label: 'Message',
                                                labelWidth: 110,
                                                value: ''
                                            },                                          
                                            {
                                                xtype: 'panel',
                                                padding:10,
                                                layout:{
                                                    type:'hbox',
                                                    pack:'end'
                                                },
                                                defaults:{
                                                    xtype:'button'
                                                },
                                                items:[
                                                    {
                                                        xtype: 'spacer'
                                                    },                                                
                                                    {
                                                        text:'Cancel',
                                                        itemId: 'btnCancel'
                                                    },
                                                    {
                                                        xtype: 'spacer'
                                                    },
                                                    {
                                                        text:'Send',
                                                        itemId: 'btnSend',
                                                        ui: 'action'
                                                    },
                                                    {
                                                        xtype: 'spacer'
                                                    }                                                  
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onCloseButtonLeftTap',
                event: 'tap',
                delegate: '#closeButtonLeft'
            },
            {
                fn: 'onCloseButtonRightTap',
                event: 'tap',
                delegate: '#closeButtonRight'
            },
            {
                fn: 'onSendTap',
                event: 'tap',
                delegate: '#btnSend'
            },
            {
                fn: 'onCancelTap',
                event: 'tap',
                delegate: '#btnCancel'
            },
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onCloseButtonLeftTap: function(button, e, eOpts) {
        //MyGlobals.mainPanel.hideInfoPanel();
        MyGlobals.mainPanel.hideDownloadLinkPanel();
    },

    onCloseButtonRightTap: function(button, e, eOpts) {
        MyGlobals.mainPanel.hideDownloadLinkPanel();
    },

    onContainerPainted: function(element, eOpts) {
        if (MyGlobals.isNarrow()) {
            this.down('#closeButtonLeft').show();
            this.down('#closeButtonRight').hide();
        }
        else {
            this.down('#closeButtonLeft').hide();
            this.down('#closeButtonRight').show();
        }
    },

    onSendTap: function(button, e, eOpts){
        var email = MyGlobals.downloadLinkPanel.down("#mailaddress").getValue(),
            subject = MyGlobals.downloadLinkPanel.down("#subject").getValue(),
            expirationDate = MyGlobals.downloadLinkPanel.down("#expirationDate").getFormattedValue('Ymj'),
            pwd = MyGlobals.downloadLinkPanel.down("#password").getValue(),
            msg = MyGlobals.downloadLinkPanel.down("#message").getValue(),
            objId = this.objId,
            param = {
                            objectIds: objId, 
                            expirationDate: MyGlobals.downloadLinkPanel.down("#expirationDate").getFormattedValue('Ymd'), 
                            mailaddress: email, 
                            message: msg, 
                            subject: subject, 
                            password: pwd
                        },
            model = Ext.create('ACMobileClient.model.ObjectDownloadLinkModel', param),
            errors = model.validate(),
            message = "";

        Ext.each(errors.items, function(rec){
            message += rec.getMessage() + "<br />";
        });
        //console.log("email: " + email + " subject: " + subject + " exp: " + typeof expirationDate + " pwd: " + pwd + " msg: "+msg)

        if(message !== ""){
            Ext.Msg.alert("Valid Failed", message);
            return;
        }

        if(pwd !== ""){
            pwd = SHA256(pwd);
        }

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Creating...'
        });

        Ext.Ajax.request({
            method:'POST',
            timeout: '300000',
            url:'/api/rest/dataspace/createDownloadLink.json',
            params: {
                objectIds: objId, // array of ids which to be added to download link, mandatory
                expirationDate: expirationDate, // expiration date of download lin, mandatory
                mailaddress: email, // emailaddress to send link notification, mandatory
                message: msg, // message for notification, mandatory
                subject: subject, // subject for notification, mandatory
                password: pwd // password for downloadlink, optional
            },
            success:function(response, success){
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert("", "Download link was created.", function(){
                    MyGlobals.mainPanel.hideDownloadLinkPanel();
                });
            },
            failure:function(response){
                MyGlobals.downloadLinkPanel.setMasked(false);
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert("Fail", "Fail to create download link.", function(){
                    //MyGlobals.mainPanel.hideDownloadLinkPanel();
                });
            }
        });
    },

    onCancelTap: function(button, e, eOpts){
        MyGlobals.mainPanel.hideDownloadLinkPanel();
    }
 
});

