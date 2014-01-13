/*
 * File: app/view/ContentContainerBar.js
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

Ext.define('ACMobileClient.view.ContentContainerBar', {
    extend: 'Ext.TitleBar',
    alias: 'widget.contentContainerBar',

    config: {
        docked: 'top',
        items: [
            {
                xtype: 'button',
                hidden: true,
                itemId: 'listButton',
                ui: 'plain',
                iconCls: 'layout'
            },
            {
                xtype: 'button',
                hidden: true,
                itemId: 'backButton',
                ui: 'back',
                text: 'xx'
            }
        ],
        listeners: [
            {
                fn: 'onListButtonNewTap',
                event: 'tap',
                delegate: '#listButton'
            },
            {
                fn: 'onBackButtonTap',
                event: 'tap',
                delegate: '#backButton'
            },
            {
                fn: 'onTitlebarPainted',
                event: 'painted'
            }
        ]
    },

    onListButtonNewTap: function(button, e, eOpts) {
        var men = MyGlobals.menuPanel;
        if (men.isHidden()) {
            men.showBy(button);
        } else {
            men.hide();
        }
    },

    onBackButtonTap: function(button, e, eOpts) {
        // sometimes tap once fire twice
        if (this.lastAction && this.lastAction > Date.now() - 2000) {
            return;
        }
        this.lastAction = Date.now();
        MyGlobals.mainPanel.contentContainerBack();
    },

    onTitlebarPainted: function(element, eOpts) {
        if (MyGlobals.showListButton) {
            this.down('#listButton').show();
        }
        else {
            this.down('#listButton').hide();
        }
    },

    doRepaint: function() {
        if (MyGlobals.showListButton) {
            this.down('#listButton').show();
        }
        else {
            this.down('#listButton').hide();
        }
    }

});