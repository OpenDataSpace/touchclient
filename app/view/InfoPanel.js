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

Ext.define('ACMobileClient.view.InfoPanel', {
    extend: 'Ext.Container',
    alias: 'widget.infoPanel',

    config: {
        style: 'font-size:1.25em',
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
                        itemId: 'objectInfoToolbar',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'closeButtonLeft',
                                iconCls: 'left2'
                            },
                            {
                                xtype: 'segmentedbutton',
                                itemId: 'buttonSegment',
                                items: [
                                    {
                                        xtype: 'button',
                                        pressed: true,
                                        itemId: 'infoButton',
                                        iconCls: 'info',
                                        text: 'Info'
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'notesButton',
                                        iconCls: 'chat',
                                        text: 'Notes'
                                    }
                                ]
                            },
                            {
                                xtype: 'spacer'
                            },
                            {
                                xtype: 'button',
                                itemId: 'closeButtonRight',
                                iconCls: 'right2'
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
                                itemId: 'infoContainer',
                                padding: 10,
                                scrollable: true,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                itemId: 'name',
                                                clearIcon: false,
                                                label: 'Name',
                                                labelWidth: 100,
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textareafield',
                                                cls: 'myTextArea',
                                                itemId: 'description',
                                                clearIcon: false,
                                                label: 'Description',
                                                labelWidth: 100,
                                                value: 'Eine kleine schöne Beschreibung der Datei ...ere ger goherger uiew rhg ieuhr guiehr wuigwhe iurgh weiruhg ehr',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'objectId',
                                                clearIcon: false,
                                                label: 'Id',
                                                labelWidth: 100,
                                                readOnly: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'size',
                                                clearIcon: false,
                                                label: 'Size',
                                                labelWidth: 100,
                                                readOnly: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'creator',
                                                clearIcon: false,
                                                label: 'Creator',
                                                labelWidth: 100,
                                                value: 'Oliver Schulze',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'owner',
                                                clearIcon: false,
                                                label: 'Owner',
                                                labelWidth: 100,
                                                value: 'Rolf Lang',
                                                readOnly: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'createDate',
                                                clearIcon: false,
                                                label: 'Creation Time',
                                                labelWidth: 100,
                                                value: '17.09.1978 13:52',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'lastModifyDate',
                                                clearIcon: false,
                                                label: 'Last Modification',
                                                labelWidth: 100,
                                                value: '12.06.2012 17:52',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'accessDate',
                                                clearIcon: false,
                                                label: 'Last Access',
                                                labelWidth: 100,
                                                value: '12.06.2012 18:00',
                                                readOnly: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                itemId: 'notesContainer',
                                layout: {
                                    type: 'card'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'notesList',
                                        layout: {
                                            type: 'fit'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'notesContainer',
                                                hidden: true,
                                                itemId: 'noteEntries',
                                                padding: 5,
                                                scrollable: true
                                            },
                                            {
                                                xtype: 'toolbar',
                                                docked: 'bottom',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'createNote',
                                                        iconCls: 'compose',
                                                        text: 'Create  Note'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        itemId: 'notesWrite',
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'receivers'
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'notesText',
                                                items: [
                                                    {
                                                        xtype: 'textareafield',
                                                        required: true,
                                                        value: 'uirwe uhg weiohg weuiroh gouiwehr guiowehr\nwer uighwreoigh weruiohg werouihg\nwe uigwehr giouehr\n\nuirwe uhg weiohg weuiroh gouiwehr guiowehr\nwer uighwreoigh weruiohg werouihg\nwe uigwehr giouehr\n\nuirwe uhg weiohg weuiroh gouiwehr guiowehr\nwer uighwreoigh weruiohg werouihg\nwe uigwehr giouehr\n\nuirwe uhg weiohg weuiroh gouiwehr guiowehr\nwer uighwreoigh weruiohg werouihg\nwe uigwehr giouehr\n\nuirwe uhg weiohg weuiroh gouiwehr guiowehr\nwer uighwreoigh weruiohg werouihg\nwe uigwehr giouehr\n\nuirwe uhg weiohg weuiroh gouiwehr guiowehr\nwer uighwreoigh weruiohg werouihg\nwe uigwehr giouehr'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'toolbar',
                                                docked: 'bottom',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        ui: 'confirm',
                                                        text: 'Senden'
                                                    },
                                                    {
                                                        xtype: 'spacer'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        ui: 'decline',
                                                        text: 'Abbrechen'
                                                    }
                                                ]
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
                delegate: '#closeButtonLeft'
            },
            {
                fn: 'onInfoButtonTap',
                event: 'tap',
                delegate: '#infoButton'
            },
            {
                fn: 'onNotesButtonTap',
                event: 'tap',
                delegate: '#notesButton'
            },
            {
                fn: 'onCloseButtonRightTap',
                event: 'tap',
                delegate: '#closeButtonRight'
            },
            {
                fn: 'onCreateNoteTap',
                event: 'tap',
                delegate: '#createNote'
            },
            {
                fn: 'onContainerMove',
                event: 'move'
            },
            {
                fn: 'onContainerLeftChange',
                event: 'leftchange'
            },
            {
                fn: 'onContainerPainted',
                event: 'painted'
            },
            {
                fn: 'onContainerActivate',
                event: 'activate'
            },
            {
                fn: 'onContainerActiveItemChange',
                event: 'activeitemchange'
            }
        ]
    },

    onCloseButtonLeftTap: function(button, e, eOpts) {
        MyGlobals.mainPanel.hideInfoPanel();
    },

    onInfoButtonTap: function(button, e, eOpts) {
        this.down('#cardContainer').setActiveItem(0);
    },

    onNotesButtonTap: function(button, e, eOpts) {
        this.down('#cardContainer').setActiveItem(1);
    },

    onCloseButtonRightTap: function(button, e, eOpts) {
        this.hide();
        //MyGlobals.mainPanel.remove(this, true);
    },

    onCreateNoteTap: function(button, e, eOpts) {
        this.writeNote();
    },

    onContainerMove: function(container, item, toIndex, fromIndex, eOpts) {
        console.log('move');
    },

    onContainerLeftChange: function(component, value, oldValue, eOpts) {
        console.log(value+", "+oldValue);
    },

    onContainerPainted: function(element, eOpts) {
        if (MyGlobals.isPhone) {
            this.down('#closeButtonRight').hide();
        }
        else {
            this.down('#closeButtonLeft').hide();
        }
    },

    onContainerActivate: function(newActiveItem, container, oldActiveItem, eOpts) {

    },

    onContainerActiveItemChange: function(container, value, oldValue, eOpts) {
        //we come from noteslist, so reload if necessary
        if (value.config && value.config.itemId === 'viewContainer') {
            this.reload();
        }

    },

    reload: function() {
        var me = this;
        if (MyGlobals.performReload) {
            MyGlobals.performReload = false;
            ACUtils.utils.checkConnectionWithFunction(function() {
                me.down('#notesListList').setMasked({
                    xtype: 'loadmask',
                    message: 'Refreshing...'
                });
                me.down('#notesListList').getStore().loadPage(1);
            });
        }
    },

    load: function(objectId) {
        var me = this,
            store = Ext.create('ACMobileClient.store.ObjectInfoStore', {}),
            noteStore = Ext.create('ACMobileClient.store.NoteStore', {
                'objectId': objectId
            }),
            notesList = Ext.create('ACMobileClient.view.NotesListList', {
                'itemTpl': new Ext.XTemplate(
                '<div class="notesHead {[this.selectedNote(values.id)]}">',
                '	<div class="notesDate">{createdate:date("d.m.y")}<br>{createdate:date("H:i")}</div>',
                '	<div class="notesUser">{creator}</div>',
                '	<div class="notesText">{[this.convertContent(values.content)]}</div>',
                '</div>',
                {
                    // XTemplate configuration:
                    'disableFormats': false,
                    'selectedNote': function(theId) {
                        if (me.noteId && me.noteId === theId) {
                            return "selectedNote";
                    }
                    return "";
                },
                'convertContent': function(content) {
                    return content.replace(/\n/gi, "<br>");
                }
            }
            ),
            'store': noteStore,
            'itemId': 'notesListList'
        });

        //load objectInfo
        me.objectId = objectId;

        store.on('load', function(store, records) {
            var rec = store.getAt(0);
            me.down('#name').setValue(rec.get('name'));
            me.down('#objectId').setValue(rec.get('id'));
            me.down('#description').setValue(rec.get('description'));
            me.down('#creator').setValue(rec.get('creator'));
            me.down('#owner').setValue(rec.get('owner'));
            me.down('#createDate').setValue(formatDate(rec.get('createdate')));
            me.down('#lastModifyDate').setValue(formatDate(rec.get('lastmodifydate')));
            me.down('#accessDate').setValue(formatDate(rec.get('updatedate')));
            if(rec.get('size') !== null) {
                me.down('#size').setValue(rec.get('size') + ' KB');
            }

            //show after load
            if(!me.notesFirst) {
                me.loadCallback();
            }
        });

        store.load({
            params: {
                id: objectId
            }
        });

        /*
        var noteStore = Ext.create('ACMobileClient.store.NoteStore', {});
        noteStore.objectId = me.objectId;
        var notesList = Ext.create('ACMobileClient.view.NotesListList', {
        itemTpl: myTpl,
        store: noteStore,
        itemId: 'notesListList'
        });
        */

        noteStore.on('load', function(store, records) {
            /*
            var data = store.getData();
            data.each(function (item) {
            var noteEntry = Ext.create('ACMobileClient.view.NoteEntry', {
            layout: 'vbox'
            });
            noteEntry.loadNote(item, me.noteId);
            me.down('#noteEntries').add(noteEntry);
            });
            */

            //show after load
            if (me.notesFirst) {
                me.loadCallback();
            }

        });


        this.down('#notesList').add(notesList);
        noteStore.loadPage(1);
    },

    writeNote: function() {
        var me = this,
            nwc = Ext.create('ACMobileClient.view.NotesWriteContainer', {
                entryCallback: function(text) {
                    console.log("callback: "+text);
                return false;
            },
            objectId: me.objectId
        });

        me.add(nwc);
        nwc.hide();
        me.getLayout().setAnimation({
            type: 'slide',
            direction: 'left'
        });
        me.setActiveItem(nwc);
    },

    showNote: function(noteId) {
        var arr = [this.down('#notesButton')];
        this.down('#cardContainer').setActiveItem(1);
        this.down('#buttonSegment').setPressedButtons(arr);
        this.notesFirst = true;
        this.noteId = noteId;
    }

});