Ext.define('ACMobileClient.controller.LoginController', {
    extend: 'Ext.app.Controller',

    requires: [
        'ACMobileClient.utils.ACUtils'
    ],

    config: {
        refs:{
            userName : "#userName",
            passWord : "#passWord",
            loginBtn : "#loginButton",
            forgotPwdBtn : '#forgotPwdBtn',
            loginForm : '#loginForm',
            loginPanel : '#loginPanel'
        },
        control:{
            passWord : {
                action : 'doLogin'
            },
            loginBtn : {
                tap : 'doLogin'
            },
            forgotPwdBtn : {
                tap : 'showForgotPwd'
            },
            loginPanel : {
                autoLogin : 'doLogin'
            }
        }
    },

    doLogin: function() {
        var loginPanel = this.getLoginPanel();

        var userName = this.getUserName(),
            passWord = this.getPassWord();

        userName.blur();
        passWord.blur();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Logging in'
        });

        ACUtils.utils.login(
        userName.getValue(),
        passWord.getValue(),
        function(sessionId) {
            console.log("SessionId: "+MyGlobals.sessionId);
            ACUtils.utils.storedUser=userName.getValue();
            ACUtils.utils.storedPassWord=passWord.getValue();

            if (loginPanel.down('#rememberLogin').getChecked()) {
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
                                    } else if(repoName === 'projects'){
                                        MyGlobals.projectsId = data[i].id;
                                    }
                                }

                                console.log("myId: " + MyGlobals.myId);
                                console.log("sharedId: " + MyGlobals.sharedId);
                                console.log("globalId: " + MyGlobals.globalId);
                                console.log("projectsId: " + MyGlobals.projectsId);

                                // Init viewport main
                                Ext.Viewport.setMasked(false);
                                loginPanel.hide();
                                loginPanel.remove();

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
                scope: loginPanel
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
        });  // end of ACUtils.utils.login
    },

    showForgotPwd: function(){
         Ext.Msg.prompt("", "Please input username or E-mail", function(button, value){
            if(button === 'yes' || button === 'ok'){
                 Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Loading'
                });
                Ext.Ajax.request({
                    method:'GET',
                    url:"/api/rest/reset/forgotpassword.json",
                    params: {
                        "user":Ext.String.trim(value)
                    },
                    success:function(response, success){
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert("","Reset password e-mail has been sent");
                    },
                    failure:function(response){
                        Ext.Viewport.setMasked(false);
                        var rsJson = Ext.decode(response.responseText);
                        Ext.Msg.alert("",rsJson.message);
                    }
                });
            }
        });
    }

});