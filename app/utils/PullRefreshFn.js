/**
 * This  pulugin used to extend the Ext.plugin.PulRefresh in Sencha Touch 2.3.1.
 * Add refreshFn config option.
 */
Ext.define('ACMobileClient.utils.PullRefreshFn', {
    extend: 'Ext.plugin.PullRefresh',
    alias: 'plugin.pullrefreshfn',
    requires: ['Ext.DateExtras'],

    config: {
        /**
        * @cfg {Function} refreshFn The function that will be called to refresh the list.
        * If this is not defined, the store's load function will be called.
        * The refresh function gets called with a reference to this plugin instance.
        * @accessor
        */
        refreshFn: null
    },

    fetchLatest: function(){
        if(this.getRefreshFn()){
            this.getRefreshFn().call(this, this);
            this.setState("loaded");
            this.fireEvent("latestfetched", this, 'refreshFn');
            if(this.getAutoSnapBack()){
            	this.snapBack();
            }
        }
    }
});
