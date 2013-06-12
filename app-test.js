/*global Ext, log4javascript, window, com, jasmine*/
//exclude these from jslint globals checker
Ext.require('Ext.app.Application');
var Application = null,
    user = 'jenkinstouchui',
    password = 'Jenkins1';

Ext.onReady(function () {
    //Ext.Loader.setConfig({disableCaching: false});
    Application = Ext.create('Ext.app.Application', {
        name: 'ACMobileClient',

        requires: [
            'com.graudata.Logging',
            'ACMobileClient.utils.ACUtils'
        ],


        launch: function () {
            var l = log4javascript.getLogger(),
                a = new log4javascript.BrowserConsoleAppender();
            a.setLayout(new log4javascript.PatternLayout('%d{HH:mm:ss,SSS} %-5p - %m{2}%n'));
            l.addAppender(a);
            l.setLevel(log4javascript.Level.TRACE);
            window.log = l;
            this.logAppender = a;

            //include the tests in the test.html head
            jasmine.getEnv().addReporter(new jasmine.HtmlReporter());
            jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('app-test/results/'));
            jasmine.getEnv().execute();

            Ext.define('MyGlobals', { 
                'singleton': true, 
                'app': this
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
        }


    });
});
