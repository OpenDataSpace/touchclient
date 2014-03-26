Ext.define('ACMobileClient.view.DownloadLinkPanel', {
    extend: 'Ext.Container',
    //extend: 'Ext.form.Panel',
    alias: 'widget.downloadLinkPanel',
    required: [
        "ACMobileClient.model.ObjectDownloadLinkModel",
        "ACMobileClient.model.ObjectUploadLinkModel",
    ],
                
    config: {
        // style: 'font-size:1.25em',
        layout: {
            type: 'fit'
        },
        items: [
            {
                layout: {
                        type: 'fit'
                },
                xtype: 'container',
                itemId: 'linkRootContainer',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        itemId: 'linkToolbar',
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
                        layout: {
                            type: 'card'
                        },
                        xtype: 'tabpanel', //container
                        itemId: 'cardContainer',
                        items: [
                            {
                                // layout: {
                                //     type: 'fit'
                                // },
                                xtype: 'container',
                                title: 'Download Link',
                                itemId: 'downloadLinkContainer',
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
                                    } // fieldset
                                ]
                            }, // download link panel
                            {
                                // layout: {
                                //     type: 'fit'
                                // },
                                xtype: 'container',
                                title: 'Upload Link',
                                itemId: 'uploadLinkContainer',
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
                                        title: "Create Upload Link",
                                        items: [
                                            {
                                                xtype: 'emailfield',
                                                itemId: 'uploadMailaddress',
                                                name: 'uploadEmail',
                                                label: 'Mail Address',
                                                labelWidth: 110,
                                                required: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'uploadSubject',
                                                //clearIcon: false,
                                                label: 'Subject',
                                                labelWidth: 110,
                                                required: true
                                            },
                                            {
                                                xtype:'datepickerfield',
                                                name: 'uploadExpirationDate',
                                                itemId: 'uploadExpirationDate',
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
                                                itemId: 'uploadPassword',
                                                label: 'Password',
                                                labelWidth: 110,
                                                name: 'uploadPassword'
                                            },
                                            {
                                                xtype: 'textareafield',
                                                cls: 'myTextArea',
                                                itemId: 'uploadMessage',
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
                                                        itemId: 'btnUploadSend',
                                                        ui: 'action'
                                                    },
                                                    {
                                                        xtype: 'spacer'
                                                    }                                                  
                                                ]
                                            }
                                        ]
                                    } // fieldset
                                ]
                            } // upload link panel




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
                fn: 'onSendTap',
                event: 'tap',
                delegate: '#btnUploadSend'
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

            var viewPortHeight = Ext.Viewport.element.getHeight(),
                toolbarHeight = this.down("#linkToolbar").element.getHeight(),
                height = viewPortHeight - toolbarHeight;
            this.down("#cardContainer").setStyle("min-height:"+height+"px;");
        }
    },

    onSendTap: function(button, e, eOpts){
        var email, subject, expirationDate, validExpDate, pwd, msg, 
            param, postParam, model, modelName, errors, url, isDownloadLink,
            message = "",
            objId = this.objId;

        if(eOpts.delegate === "#btnSend"){ // download link
            isDownloadLink = true,
            url = '/api/rest/dataspace/createDownloadLink.json',
            modelName = 'ACMobileClient.model.ObjectDownloadLinkModel',
            email = MyGlobals.downloadLinkPanel.down("#mailaddress").getValue(),
            subject = MyGlobals.downloadLinkPanel.down("#subject").getValue(),
            expirationDate = MyGlobals.downloadLinkPanel.down("#expirationDate").getFormattedValue('Ymj'),
            validExpDate = MyGlobals.downloadLinkPanel.down("#expirationDate").getFormattedValue('Ymd'),
            pwd = MyGlobals.downloadLinkPanel.down("#password").getValue(),
            msg = MyGlobals.downloadLinkPanel.down("#message").getValue();
        } else {
            isDownloadLink = false,
            url = '/api/rest/object',
            modelName = 'ACMobileClient.model.ObjectUploadLinkModel',
            email = MyGlobals.downloadLinkPanel.down("#uploadMailaddress").getValue(),
            subject = MyGlobals.downloadLinkPanel.down("#uploadSubject").getValue(),
            expirationDate = MyGlobals.downloadLinkPanel.down("#uploadExpirationDate").getFormattedValue('c'),
            validExpDate = MyGlobals.downloadLinkPanel.down("#uploadExpirationDate").getFormattedValue('Ymd'),
            pwd = MyGlobals.downloadLinkPanel.down("#uploadPassword").getValue(),
            msg = MyGlobals.downloadLinkPanel.down("#uploadMessage").getValue();
        }

        param = {
            objectIds: objId, 
            expirationDate: validExpDate, 
            mailaddress: email, 
            message: msg, 
            subject: subject, 
            password: pwd
        };

        model = Ext.create(modelName, param);
        errors = model.validate();   

        Ext.each(errors.items, function(rec){
            message += rec.getMessage() + "<br />";
        });


        if(message !== ""){
            Ext.Msg.alert("Valid Failed", message);
            return;
        }

        if(pwd !== ""){
            pwd = SHA256(pwd);
        }


        if(isDownloadLink){
            postParam = {
                objectIds: objId, // array of ids which to be added to download link, mandatory
                expirationDate: expirationDate, // expiration date of download lin, mandatory
                mailaddress: email, // emailaddress to send link notification, mandatory
                message: msg, // message for notification, mandatory
                subject: subject, // subject for notification, mandatory
                password: pwd // password for downloadlink, optional
            };
        } else {
            postParam = {
                data: Ext.JSON.encode({
                    linkedfolder: objId,
                    expirationdate: expirationDate,
                    mailaddress: email,
                    "~dataspace_upload_message": msg,
                    "~dataspace_upload_message_subject": subject,
                    password: pwd}),
                handler: "dataspaceuploadlink"
            };
            postParam.data = Ext.JSON.encode({
                linkedfolder: objId,
                expirationdate: expirationDate,
                mailaddress: email,
                "~dataspace_upload_message": msg,
                "~dataspace_upload_message_subject": subject,
                password: pwd
            });
        }

        this.sendCreateLinkPost(url, postParam, isDownloadLink);

    },

    onCancelTap: function(button, e, eOpts){
        MyGlobals.mainPanel.hideDownloadLinkPanel();
    },

    sendCreateLinkPost: function(url, params, isDownloadLink){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Creating...'
        });

        var succMsg = "Download link was created.",
            failMsg = "Fail to create download link.";
        if(!isDownloadLink){
            succMsg = "Upload link was created.",
            failMsg = "Fail to create upload link.";
        }

        Ext.Ajax.request({
            method:'POST',
            timeout: '300000',
            url:url,
            params: params,
            success:function(response, success){
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert("", succMsg, function(){
                    MyGlobals.mainPanel.hideDownloadLinkPanel();
                });
            },
            failure:function(response){
                MyGlobals.downloadLinkPanel.setMasked(false);
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert("Fail", failMsg, function(){
                    //MyGlobals.mainPanel.hideDownloadLinkPanel();
                });
            }
        });
    }
 
});

