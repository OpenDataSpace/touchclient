/*
 * File: app/view/InfoPanel.js
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

Ext.define('ACMobileClient.view.DeviceInfoPanel', {
    extend: 'Ext.Container',
    alias: 'widget.deviceinfoPanel',

    config: {
        //style: 'font-size:1.25em',
        layout: {
            type: 'card'
        },
        items: [
            {
                xtype: 'container',
                itemId: 'viewContainer',
                layout: {
                    type: 'fit'
                },
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Device Info',
                        itemId: 'objectInfoToolbar',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'closeBtnLeft',
                                iconCls: 'arrow_left'
                            },            
                            {
                                xtype: 'spacer'
                            },
                            {
                                xtype: 'button',
                                itemId: 'closeBtnRight',
                                iconCls: 'arrow_right'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        itemId: 'cardContainer',
                        layout: {
                            type: 'card'
                        },
                        items: [
                            {
                                xtype: 'container',
                                cls: 'infoContainer',
                                itemId: 'deviceInfoContainer',
                                padding: 10,
                                scrollable: true,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'platform',
                                                clearIcon: false,
                                                label: 'Platform',
                                                labelWidth: 110,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'browserName',
                                                clearIcon: false,
                                                label: 'Browser Name',
                                                labelWidth: 110,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'browserEngine',
                                                clearIcon: false,
                                                label: 'Browser Engine',
                                                labelWidth: 110,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'deviceType',
                                                clearIcon: false,
                                                label: 'Device Type',
                                                labelWidth: 110,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'osName',
                                                clearIcon: false,
                                                label: 'OS Name',
                                                labelWidth: 110,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'screenSize',
                                                clearIcon: false,
                                                label: 'Screen Size',
                                                labelWidth: 110,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'stVersion',
                                                clearIcon: false,
                                                label: 'ST Version',
                                                labelWidth: 110,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textareafield',
                                                cls: 'myTextArea',
                                                itemId: 'userAgent',
                                                clearIcon: false,
                                                label: 'User Agent',
                                                labelWidth: 110,
                                                height: 140,
                                                value: '',
                                                readOnly: true
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
                delegate: '#closeBtnLeft'
            },
            {
                fn: 'onCloseButtonRightTap',
                event: 'tap',
                delegate: '#closeBtnRight'
            },
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onCloseButtonLeftTap: function(button, e, eOpts) {
        var devicePanel = MyGlobals.deviceInfoPanel;
        if (devicePanel) {
            if (MyGlobals.isNarrow()) {
                setTimeout(function() {
                    MyGlobals.mainPanel.remove(devicePanel, true);
                    MyGlobals.deviceInfoPanel = null;
                }, 1000);
                MyGlobals.mainPanel.getLayout().setAnimation({
                    type: 'slide',
                    direction: 'right'
                });
                MyGlobals.mainPanel.setActiveItem(MyGlobals.menuPanel);
            } else {
                MyGlobals.mainPanel.remove(devicePanel, true);
                MyGlobals.deviceInfoPanel = null;
            }
        }
    },

    onCloseButtonRightTap: function(button, e, eOpts) {
        this.onCloseButtonLeftTap(button, e, eOpts);
    },

    onContainerPainted: function(element, eOpts) {
        if (MyGlobals.isNarrow()) {
            this.down('#closeBtnLeft').show();
            this.down('#closeBtnRight').hide();
        }
        else {
            this.down('#closeBtnLeft').hide();
            this.down('#closeBtnRight').show();
        }

        this.down('#platform').setValue(navigator.platform);
        this.down('#userAgent').setValue(Ext.browser.userAgent);
        this.down('#browserName').setValue(Ext.browser.name);
        this.down('#browserEngine').setValue(Ext.browser.engineName);
        this.down('#deviceType').setValue(Ext.os.deviceType);
        this.down('#osName').setValue(Ext.os.name);
        this.down('#screenSize').setValue(window.screen.availHeight + "*" + window.screen.availWidth);
        this.down('#stVersion').setValue(Ext.version);
    }

});