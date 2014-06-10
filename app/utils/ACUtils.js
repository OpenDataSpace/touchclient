Ext.define('ACMobileClient.utils.ACUtils', { 
    instanceCount: 0,
    userSettingsStore: null,
    storedUser: null, 
    storedPassWord: null,
    lastConnectionCheck: 0,

    init: function() {
        //define model for user settings
        Ext.define('UserSettings', {
            extend: 'Ext.data.Model',
            config: {
                fields: [
                    'name', 
                    'value'
                ],
                proxy: {
                    type: 'localstorage',
                    id  : 'usersettings'
                }
            }
        });

        //load the usersettings store
        this.userSettingsStore = Ext.create('Ext.data.Store', {
            model: "UserSettings"
        });

        this.userSettingsStore.load();
        this.userSettingsStore.sync();
    },

    getConfigValue: function(name) {
        var s = this.userSettingsStore,
        i, data;
        for (i=0;i<s.getCount();i+=1) {
            data = s.getAt(i);
            if (data.get('name') === name) {
                //found the setting
                return data;
            }
        }
        return null;
    },

    setConfigValue: function(name, value) {
        var data = this.getConfigValue(name);
        if (!data) {
            //not present yet, create it
            data = Ext.create('UserSettings', {});
            data.set('name', name);
            this.userSettingsStore.add(data);
        }
        data.set('value', value);
        this.userSettingsStore.sync();
    },

    removeConfigValue: function(name) {
        var data = this.getConfigValue(name);
        if (data) {
            this.userSettingsStore.remove(data);
            this.userSettingsStore.sync();
        }		
    },

    saveLogin: function(user, passWord) {
        //save login
        this.setConfigValue("ACMobile.config.userName", user);
        this.setConfigValue("ACMobile.config.passWord", passWord);
        this.setConfigValue("ACMobile.config.autoLogin", 'true');
    },

    removeLogin: function() {
        this.removeConfigValue("ACMobile.config.userName");
        this.removeConfigValue("ACMobile.config.passWord");
        this.removeConfigValue("ACMobile.config.autoLogin");
    },

    isAutoLogin: function() {
        var autoL = this.getConfigValue("ACMobile.config.autoLogin");
        if (autoL && autoL.get('value') === 'true') {
            return true;
        }
        return false;
    },

    getUserName: function() {
        return this.getConfigValue("ACMobile.config.userName").get('value');
    },

    getPassWord: function() {
        return this.getConfigValue("ACMobile.config.passWord").get('value');
    },

    testLogin: function() {
        var userData = this.getConfigValue("ACMobile.config.userName");
        if (userData) {
            alert(userData.get('value'));
        }
    },

    checkConnection: function() {
        alert("Dont use this function: checkConnection");
    },

    reconnect: function(callBack) {
        //not connected anymore, so reconnect
        this.login(this.storedUser, this.storedPassWord, callBack, function() {
            Ext.Msg.alert('Error', 'Could not reconnect, jumping back to login...', function(){
                window.location.reload();
            });
        });
    },

    login: function(userName, passWord, successFn, failureFn) {
        //not connected anymore, so reconnect
        Ext.Ajax.request({
            url: '/api/rest/session/login.json',
            method: 'post',
            params: { 
                username: userName,
                password: passWord,
                noCache: new Date().getTime()
            },
            success: function(response) {
                var jsonResp = Ext.decode(response.responseText);

                if (!jsonResp.sessionId) {
                    if (failureFn) {
                        failureFn();
                    }
                }
                else {
                    MyGlobals.sessionId = jsonResp.sessionId;
                    if (successFn) {
                        successFn(jsonResp.sessionId);
                    }
                }
            },
            failure: function() {
                if (failureFn) {
                    failureFn();
                }
            },
            scope: this
        });
    },

    checkConnectionWithFunction: function(callBack) {
        var at = new Date().getTime(),
        me = this,
        connected = false;
        if (at - this.lastConnectionCheck > 60000) {

            //check connection on server

            Ext.Ajax.request({
                url: '/api/rest/session/isConnected.json',
                method: 'get',
                params: {
                    sessionId: MyGlobals.sessionId,
                    noCache: new Date().getTime()
                },
                success: function(response) {

                    //check every minute
                    this.lastConnectionCheck = at;

                    var jsonResp = Ext.decode(response.responseText);
                    connected = jsonResp.connected;
                    if (!connected) {
                        console.log("not connected, so reconnect");
                        me.reconnect(callBack);
                    }
                    else {
                        callBack();
                    }					
                },
                failure: function() {
                    me.reconnect(callBack);
                },
                scope: this
            }); 
        }
        else {
            callBack();
        }
    },

    test: function() {
        this.instanceCount+=1;
        return this.instanceCount;
    },

    checkFile: function(files){
        if(files.length == 0){
            Ext.Msg.alert('Info', 'Could not upload this file.', Ext.emptyFn);
        }
    }
});
