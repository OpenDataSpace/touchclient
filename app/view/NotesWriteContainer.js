/*
 * File: app/view/NotesWriteContainer.js
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

Ext.define('ACMobileClient.view.NotesWriteContainer', {
    extend: 'Ext.Container',

    config: {
        layout: {
            type: 'vbox'
        },
        scrollable: false,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'titleBar',
                title: 'Notiz',
                layout: {
                    align: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        maxWidth: 100,
                        iconCls: 'delete1',
                        text: 'Abbrechen'
                    },
                    {
                        xtype: 'button',
                        align: 'right',
                        itemId: 'actionButton',
                        iconCls: 'compose',
                        text: 'Speichern'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'receiverFieldSet',
                margin: '10 10 5 10'
            },
            {
                xtype: 'fieldset',
                itemId: 'messageFieldSet',
                margin: '5 10 10 10',
                items: [
                    {
                        xtype: 'textareafield',
                        cls: 'messageText',
                        itemId: 'messageText',
                        clearIcon: false
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onBackButtonTap',
                event: 'tap',
                delegate: '#backButton'
            },
            {
                fn: 'onActionButtonTap',
                event: 'tap',
                delegate: '#actionButton'
            },
            {
                fn: 'onContainerPainted',
                event: 'painted'
            },
            {
                fn: 'onMessageTextKeyup',
                event: 'keyup',
                delegate: '#messageText'
            },
            {
                fn: 'onContainerInitialize',
                event: 'initialize'
            }
        ]
    },

    onBackButtonTap: function(button, e, eOpts) {
        button.disable();

        this.hideWriter();
    },

    onActionButtonTap: function(button, e, eOpts) {
        this.saveNote();
    },

    onContainerPainted: function(element, eOpts) {

    },

    onMessageTextKeyup: function(textfield, e, eOpts) {
        console.log('keyup');
        return;
        /*
        var theId = this.down('#messageText').id;
        console.log(""+theId);
        var obj = document.getElementById(theId);
        console.log("h: "+obj.clientHeight);
        this.down('#messageText').setHeight(obj.clientHeight-25);
        return;
        var TEXTAREA_LINE_HEIGHT = 13;

        var theInpId = this.down('#messageText').element.down('textarea').id;
        var textArea = document.getElementById(theInpId);

        console.log('textArea: '+textArea);

        var newHeight = textArea.scrollHeight;
        var currentHeight = textArea.clientHeight;

        if (newHeight > currentHeight) {
        var h = newHeight + 5 * TEXTAREA_LINE_HEIGHT;
        //textArea.style.height = h + 'px';
        this.down('#messageContainer').setHeight(this.down('#messageContainer').getHeight());
        this.down('#messageText').setHeight(h);
    }
    */
    },

    onContainerInitialize: function(component, eOpts) {
        var store = Ext.create('ACMobileClient.store.UserGroupSearchStore', {});

        this.objectId = this.config.objectId;
        console.log("check obj: "+this.objectId);
        store.getProxy().config.extraParams.parameters = Ext.encode({
            prefixSort: true,
            prefixKey: 'name',
            checkobject: this.objectId
        });

        this.to = Ext.create('ACMobileClient.view.ReceiverInputField', {
            itemId: 'receiver',
            flex: 0,
            store: store,
            entryCallback: this.config.entryCallback
        });

        this.down('#receiverFieldSet').add(this.to);

        //this.to.addField('Oliver Schulze', '12345');
    },

    hideWriter: function() {
        var par = this.getParent();
        par.getLayout().setAnimation({
            type: 'slide',
            direction: 'right'
        });
        par.remove(this);
    },

    saveNote: function() {
        var me = this,
            receivers = me.to.getReceivers(),
            content = me.down('#messageText').getValue(),
            recList, colon, i;

        if (content.trim().length === 0) {
            Ext.Msg.alert('Warnung', 'Bitte geben Sie einen Text ein', Ext.emptyFn);
        }
        else {
            //save the note...
            recList = null;
            colon = "";

            console.log(receivers);
            for (i = 0; i < receivers.length; i+=1) {
                console.log(receivers[i].value);
                console.log(receivers[i]);
                if (recList === null) {
                    recList = "";
                }
                recList += colon + receivers[i].value;
                colon = ";";
            }

            //save the not on the server
            ACUtils.utils.checkConnectionWithFunction(function() {
                Ext.Ajax.request({
                    url: '/api/rest/object.json',
                    method: 'post',

                    params: { 
                        sessionId: MyGlobals.sessionId,
                        handler: 'note',
                        noCache: new Date().getTime(),
                        data: Ext.encode({
                            recipients: recList,
                            content: content,
                            target: me.objectId
                        })
                    },
                    success: function(response) {
                        var jsonResp = Ext.decode(response.responseText);
                        MyGlobals.performReload = true;
                        me.hideWriter();
                    },
                    failure: function() {
                        Ext.Msg.alert('Error', 'Could not save note...', Ext.emptyFn);
                    },
                    scope: me
                });
            });
        }
    }

});