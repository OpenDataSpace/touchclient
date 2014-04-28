/*
 * File: app/controller/MyController.js
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

Ext.define('ACMobileClient.controller.MyController', {
    extend: 'Ext.app.Controller',

    requires: [
        'ACMobileClient.utils.ACUtils'
    ],

    launch: function() {
        Ext.define('ACMobileClient.view.ViewportLogin', {
            extend: 'ACMobileClient.view.LoginPanel',
            config: {
                fullscreen: true
            }
        });

        Ext.define('ACMobileClient.view.ViewportMain', {
            extend: 'ACMobileClient.view.MainPanel',
            config: {
                fullscreen: true
            }
        });


        Ext.define('ACMobileClient.view.ViewportTest', {
            extend: 'ACMobileClient.view.MailViewContainer',
            config: {
                fullscreen: true
            }
        });

        var isPhone, utils, urlVars = getUrlVars(),
            globalViewPort;
        Ext.Ajax.setDefaultHeaders( {"Accept":"application/json"});
        Ext.JSON.encodeDate = function(d){
            return Ext.Date.format(d, '"YmdHisO"');
        };

        Ext.define('MyGlobals', { 
            'singleton': true, 
            'app': this,
            'menuPanel': null,
            'imageViewer': null,
            'previewContrainer': null,
            'mainPanel': null,
            'contentContainer': null,
            'lastObjectInContentContainer': null,
            'isPhone': false,
            'uploadController' : null,
            'showListButton': false,
            'uploadItems': {},
            'uploadPointer': {},
            'folderStructure': {},
            'myId':'',
            'sharedId':'',
            'globalId':'',
            'isNarrow': function() {
                if (navigator.userAgent.match(/IEMobile/)){
                    if(Ext.Viewport.getWindowHeight()+200 >= Ext.Viewport.getWindowWidth()){
                        return true;
                    }
                    return false;
                }
                return Ext.Viewport.getOrientation() === 'portrait'; //this.isPhone || 
            }
        });

        Ext.define('ACUtils', {
            requires: [
            'ACMobileClient.utils.ACUtils'
            ],
            singleton: true,
            utils: null
        });

        utils = Ext.create('ACMobileClient.utils.ACUtils', {});
        utils.init();
        ACUtils.utils = utils;

        if (urlVars.isPhone) {
            isPhone = (urlVars.isPhone === 'true');
        }
        if (typeof isPhone === 'undefined') {
            isPhone = Ext.os.is.Phone;
        }

        MyGlobals.isPhone = isPhone;

        globalViewPort = Ext.create("ACMobileClient.view.ViewportLogin", {});
        globalViewPort.show();

    }

});