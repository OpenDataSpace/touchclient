
Ext.define('ACMobileClient.model.ObjectUploadLinkModel', {
    extend: 'Ext.data.Model',
    alias: 'model.ObjectUpLoadLinkModel',

    config: {
        fields: [
            {
                name: 'objId',
                type: 'string'
            },
            {
                name: 'expirationDate',
                type: 'string'
            },
            {
                name: 'mailaddress',
                type: 'string'
            },
            {
                name: 'message',
                type: 'string'
            },
            {
                name: 'subject',
                type: 'string'
            },
            {
                name: 'password',
                type: 'string'
            }
        ],

        validations:[
            {type:'email', field:'mailaddress',message:'Mail Address is invalid.'},
            {type:'presence', field:'subject', message:'Subject is required.'},
            {type:'presence', field:'message', message:'Message is required.'},
            {type:'presence', field:'password', message:'Password is required.'}
        ]
    },

    validate: function(options){
        var me = this,
            errors = me.callParent(arguments),
            expirationDate = this.get('expirationDate');

        if(expirationDate < Ext.Date.format(new Date(), 'Ymd')){
            errors.add({
                field: 'expirationDate',
                message: 'ExpirationDate is invalid.'
            });
        }
        
        return errors;
    }

});