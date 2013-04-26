/*
 * File: app/view/SettingsContainer.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
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
        'generated.AppVersion'
    ],

    config: {
        padding: 10,
        layout: {
            type: 'vbox'
        },
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
                xtype: 'label',
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
        var autoStartUpload = ACUtils.utils.getConfigValue('ACMobile.config.autoStartUpload');

        this.initMode = true;
        if (ACUtils.utils.isAutoLogin()) {
            this.down('#autoLogin').check();
        }
        else {
            this.down('#autoLogin').uncheck();
        }
        if (autoStartUpload &&  autoStartUpload.get('value') === 'true') {
            this.down('#autoStartUpload').check();
        }
        else {
            this.down('#autoStartUpload').uncheck();
        }
        this.initMode = false;
    }

});