/*
 * File: app/view/LoginPanel.js
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

Ext.define('ACMobileClient.view.LoginPanel', {
    extend: 'Ext.Panel',

    requires:[
        'ACMobileClient.store.RootFolderStore'
    ],

    config: {
        cls: 'logoBack',
        fullscreen: true,
        items: [
            {
                xtype: 'formpanel',
                centered: true,
                height: 10,
                itemId: 'loginForm',
                minHeight: 330,
                padding: 7,
                showAnimation: 'slideIn',
                cls: 'login_panel',
                style: 'background-color:transparent;box-shadow:none;',
                width: 300,
                url: '/api/rest/session/login',
                items: [
                    {
                        xtype: 'image',
                        cls: 'dslogo',
                        height: 41,
                        docked:'top',
                        src: 'images/gds2-logo.png'
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Login'
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'loginFieldSet',
                        width: 250,
                        margin: '0.5em auto 1.5em',
                        items: [
                            {
                                xtype: 'textfield',
                                border: '',
                                itemId: 'userName',
                                width: '',
                                label: 'Username:',
                                labelWidth: 100,
                                name: 'username'
                            },
                            {
                                xtype: 'passwordfield',
                                itemId: 'passWord',
                                label: 'Password:',
                                labelWidth: 100,
                                name: 'password'
                            },
                            {
                                xtype: 'checkboxfield',
                                itemId: 'rememberLogin',
                                label: 'Remember Me:',
                                labelWidth: 180,
                                name: 'rememberLogin'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id: '',
                        itemId: 'loginButton',
                        ui: 'action-round',
                        width: 150,
                        text: 'Login',
                        margin: '0 auto'
                    }
                ]
            }
            // ,
            // {
            //     xtype: 'image',
            //     cls: 'dslogo',
            //     height: 150,
            //     src: 'images/gds2-logo.png'
            // }
        ],
        listeners: [
            {
                fn: 'onUserNameAction',
                event: 'action',
                delegate: '#userName'
            },
            {
                fn: 'onPassWordAction',
                event: 'action',
                delegate: '#passWord'
            },
            {
                fn: 'onLoginButtonTap',
                event: 'tap',
                delegate: '#loginButton'
            },
            {
                fn: 'onPanelPainted',
                event: 'painted'
            }
        ]
    },

    onUserNameAction: function(textfield, e, eOpts) {
        this.down('#passWord').focus();
    },

    onPassWordAction: function(textfield, e, eOpts) {
        this.doLogin();
    },

    onLoginButtonTap: function(button, e, eOpts) {
        this.doLogin();
    },

    onPanelPainted: function(element, eOpts) {
        var checkBoxItem = this.down('#rememberLogin'),
            deviceEvent = 'click';
        if (ACUtils.utils.isAutoLogin()) {
            this.down('#userName').setValue(ACUtils.utils.getUserName());
            this.down('#passWord').setValue(ACUtils.utils.getPassWord());
            this.down('#rememberLogin').check();
            this.doLogin();
        } else {
            if(navigator.platform === 'BlackBerry'){
                if(Ext.os.deviceType === 'Phone'){
                    deviceEvent = 'touchup';
                }
                document.getElementById(checkBoxItem.getId()).addEventListener(deviceEvent,function(){
                    if(checkBoxItem.isChecked()){
                        checkBoxItem.uncheck();
                    } else {
                        checkBoxItem.check();
                    }
                });
            }
        }
    },

    doLogin: function() {
        var me = this;

        me.down('#userName').blur();
        me.down('#passWord').blur();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Logging in'
        });

        ACUtils.utils.login(
        me.down('#userName').getValue(),
        me.down('#passWord').getValue(),
        function(sessionId) {
            console.log("SessionId: "+MyGlobals.sessionId);
            ACUtils.utils.storedUser=me.down('#userName').getValue();
            ACUtils.utils.storedPassWord=me.down('#passWord').getValue();

            if (me.down('#rememberLogin').getChecked()) {
                //save login data for next reuse
                ACUtils.utils.saveLogin(ACUtils.utils.storedUser, ACUtils.utils.storedPassWord);
            }
            else {
                //save login data for next reuse
                ACUtils.utils.removeLogin();
            }


            //load language
            var lang = "de",
                url = "app/languages/"+lang+"/Messages.js";

            Ext.Ajax.request({
                url: url,
                method: 'get',
                params: { 
                    noCache: new Date().getTime()
                },
                success: function(response) {
                    /* On success, the response contains a
                    * Language definition class which is the reason
                    * for the eval here.
                    */
                    eval(response.responseText);

                    var rootFolderStore = Ext.create('ACMobileClient.store.RootFolderStore', {
                        storeId: 'rootFolderStore'
                    });

                    // Get root repo ids
                    rootFolderStore.load(function(records, operation, success){
                        //console.log(records);
                        if(success){
                            var data = records[0].data.children,
                                vpMain,
                                repoName,
                                i;

                                for(i=0; i < data.length; i+=1){
                                    repoName = data[i].name.toLowerCase();
                                    if(repoName === 'my'){
                                        MyGlobals.myId = data[i].id;
                                    } else if(repoName === 'shared'){
                                        MyGlobals.sharedId = data[i].id;
                                    } else if(repoName === 'global'){
                                        MyGlobals.globalId = data[i].id;
                                    }
                                }

                                console.log("myId: " + MyGlobals.myId);
                                console.log("sharedId: " + MyGlobals.sharedId);
                                console.log("globalId: " + MyGlobals.globalId);

                                // Init viewport main
                                Ext.Viewport.setMasked(false);
                                me.hide();
                                me.remove();

                                //load main page
                                vpMain = Ext.create("ACMobileClient.view.ViewportMain", {});
                                vpMain.show();

                        } else {
                            Ext.Viewport.setMasked(false);
                            Ext.Msg.alert('Error', 'Get root repository id failed.', Ext.emptyFn);
                        }
                    });

                    // Ext.Viewport.setMasked(false);
                    // me.hide();
                    // me.remove();

                    // //load main page
                    // var vpMain = Ext.create("ACMobileClient.view.ViewportMain", {});
                    // vpMain.show();
                },
                scope: me
            });
        }, 
        function(response) {
            var responseText = response.responseText || "",
                json = Ext.decode(responseText),
                msg = "Login failed, Username/password incorrect?";
            if(json.message === "LOCKED"){
                msg = "The login attempts are currently locked until the " + new Date(json.lockedUntil).toLocaleString();
            }
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Error', msg, Ext.emptyFn);
            // if(navigator.userAgent.match(/Trident\/7\.0/)){
            //     window.alert('Login failed, Username/password incorrect?');
            // } else {
            //     Ext.Msg.alert('Error', 'Login failed,<br /> Username/password incorrect?', Ext.emptyFn);
            // }
        }
        );
    }

});