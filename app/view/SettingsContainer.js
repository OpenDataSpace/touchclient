/*
 * File: app/view/SettingsContainer.js
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

Ext.define('ACMobileClient.view.SettingsContainer', {
    extend: 'Ext.Container',
    alias: 'widget.SettingsContainer',

    requires: [
        'generated.AppVersion',
        'ACMobileClient.view.DeviceInfoPanel'
    ],

    config: {
        //padding: 10,
        // layout: {
        //     type: 'vbox'
        // },
        scrollable: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Settings'
            },
            {
                xtype: 'fieldset',
                title: 'Settings',
                items: [
                    {
                        xtype: 'checkboxfield',
                        itemId: 'autoLogin',
                        label: 'Keep me logged in',
                        labelWidth: '70%'
                    },
                    {
                        xtype: 'checkboxfield',
                        itemId: 'autoStartUpload',
                        label: 'Autostart Upload',
                        labelWidth: '70%'
                    }
                ]
            },
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                text: 'Device Info',
                //docked: 'bottom',
                ui: 'normal',
                width: '94%',
                margin: '20px auto',
                itemId: 'btnDeviceInfo',
                handler: function(){
                    this.up().showDeviceInfo();
                }
            },
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                text: 'Logout',
                //docked: 'bottom',
                ui: 'action',
                width: '94%',
                margin: '20px auto',
                itemId: 'btnLogout',
                handler: function(){
                    this.up().onLogoutTap();
                }
            },
            {
                xtype: 'spacer'
            },
            {
                xtype: 'label',
                //docked: 'bottom',
                width: '94%',
                margin: '0px auto',
                padding: '0',
                html: 'x',
                itemId: 'Version',
                styleHtmlCls: 'x-html appversion',
                styleHtmlContent: true,
                listeners: [
                    {
                        fn: function(component, eOpts) {
                            var v = Ext.create('generated.AppVersion');
                            component.setHtml('touchui v' + v.version + '<br/>Build: ' + v.build + '<br />Git-Rev: ' + v.gitrev);
                        },
                        event: 'initialize'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onAutoLoginCheck',
                event: 'check',
                delegate: '#autoLogin'
            },
            {
                fn: 'onAutoLoginUncheck',
                event: 'uncheck',
                delegate: '#autoLogin'
            },
            {
                fn: 'onAutoStartUploadCheck',
                event: 'check',
                delegate: '#autoStartUpload'
            },
            {
                fn: 'onAutoStartUploadUncheck',
                event: 'uncheck',
                delegate: '#autoStartUpload'
            },
            {
                fn: 'onSettingsContainerShow',
                event: 'show'
            }
        ]
    },

    onAutoLoginCheck: function(checkboxfield, e, eOpts) {
        if (!this.initMode) {
            ACUtils.utils.saveLogin(ACUtils.utils.storedUser, ACUtils.utils.storedPassWord);
        }
    },

    onAutoLoginUncheck: function(checkboxfield, e, eOpts) {
        if (!this.initMode) {
            ACUtils.utils.removeLogin();
        }
    },

    onAutoStartUploadCheck: function(checkboxfield, e, eOpts) {
        if (!this.initMode) {
            ACUtils.utils.setConfigValue('ACMobile.config.autoStartUpload', 'true');
        }
    },

    onAutoStartUploadUncheck: function(checkboxfield, e, eOpts) {
        if (!this.initMode) {
            ACUtils.utils.setConfigValue('ACMobile.config.autoStartUpload', 'false');
        }
    },

    onSettingsContainerShow: function(component, eOpts) {
        var autoStartUpload = ACUtils.utils.getConfigValue('ACMobile.config.autoStartUpload'),
            deviceEvent = 'click',
            autoLoginItem = this.down('#autoLogin'),
            autoStartItem = this.down('#autoStartUpload');

        this.initMode = true;
        if (ACUtils.utils.isAutoLogin()) {
            autoLoginItem.check();
        }
        else {
            autoLoginItem.uncheck();
        }
        if (autoStartUpload &&  autoStartUpload.get('value') === 'true') {
            autoStartItem.check();
        }
        else {
            autoStartItem.uncheck();
        }
        this.initMode = false;

        if(navigator.platform === 'BlackBerry'){
            if(Ext.os.deviceType === 'Phone'){
                deviceEvent = 'touchup';
            }
            document.getElementById(autoLoginItem.getId()).addEventListener(deviceEvent,function(){
                if(autoLoginItem.isChecked()){
                    autoLoginItem.uncheck();
                } else {
                    autoLoginItem.check();
                }
            });

            document.getElementById(autoStartItem.getId()).addEventListener(deviceEvent,function(){
                if(autoStartItem.isChecked()){
                    autoStartItem.uncheck();
                } else {
                    autoStartItem.check();
                }
            });
        }


    },

    onLogoutTap: function(btn, e, eOpts){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loging out...'
        });

        Ext.Ajax.request({
            method:'POST',
            url:"/api/rest/session/logout.json",
            timeout: 5000,
            callback:function(options, success, response){
                // ACUtils.utils.setConfigValue('ACMobile.config.autoLogin', 'false');
                // window.location.reload();
            }
        });

        setTimeout(function(){
            ACUtils.utils.setConfigValue('ACMobile.config.autoLogin', 'false');
            window.location.reload();
        }, 500);
        // ACUtils.utils.setConfigValue('ACMobile.config.autoLogin', 'false');
        // window.location.reload();
    },

    showDeviceInfo: function(btn, e, eOpts){
        if (MyGlobals.deviceInfoPanel) {
            MyGlobals.mainPanel.remove(MyGlobals.deviceInfoPanel, true);
            MyGlobals.deviceInfoPanel = null;
        }


        var deviceInfoPanel = Ext.create('ACMobileClient.view.DeviceInfoPanel', {}),
            height, width;

        MyGlobals.mainPanel.add(deviceInfoPanel);
        if (MyGlobals.isNarrow()) {
            MyGlobals.mainPanel.getLayout().setAnimation({
                type: 'slide',
                direction: 'left'
            });
            MyGlobals.mainPanel.setActiveItem(deviceInfoPanel);    
        } else {
            height = MyGlobals.mainPanel.element.getHeight();
            width = MyGlobals.mainPanel.down('#contentContainer').element.getWidth();
            deviceInfoPanel.setDocked(null);
            deviceInfoPanel.setShowAnimation("slideIn");
            deviceInfoPanel.setHideAnimation({
                type: 'slideOut',
                direction: 'right'
            });
            deviceInfoPanel.setTop(0);
            deviceInfoPanel.setLeft(width-320);
            deviceInfoPanel.setHeight(height);
            deviceInfoPanel.setWidth(320);
            deviceInfoPanel.addCls('shadowPanel');

            deviceInfoPanel.show();
        }

        MyGlobals.deviceInfoPanel = deviceInfoPanel;
    }

});