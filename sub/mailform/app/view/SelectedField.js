/*
 * File: app/view/SelectedField.js
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

Ext.define('ACMobile.view.SelectedField', {
    extend: 'Ext.Button',
    alias: 'widget.SelectedField',

    config: {
        margin: '0 5 5 0',
        maxWidth: 125,
        style: 'display:inline-block;top:-2px',
        ui: 'small',
        text: 'test@test.de',
        listeners: [
            {
                fn: 'onButtonTap',
                event: 'tap'
            }
        ]
    },

    onButtonTap: function(button, e, eOpts) {
        this.theParent.selectField(this);
    }

});