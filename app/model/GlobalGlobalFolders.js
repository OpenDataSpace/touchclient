Ext.define('ACMobileClient.model.GlobalGlobalFolders', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'name'
            },
            {
                mapping: 'gdscategory',
                name: 'category'
            },
            {
                name: 'isfolder'
            },
            {
                name: 'shared'
            },
            {
                name: 'ownobject'
            },
            {
                name: 'sharedowner'
            },
            {
                convert: function(v, rec) {
                    return v.toLowerCase();
                    //return 'folderobject';
                },
                name: 'classname'
            }
        ]
    //     ,
    //     proxy: {
    //         type: 'rest',
    //         extraParams: {
    //             provider: 'dataspacefolder',
    //             handler: 'dataspaceobject',
    //             source: 'agorum/roi/files/dataspace',
    //             query: '',
    //             properties: [
    //                 'id',
    //                 'name',
    //                 'isfolder',
    //                 'shared',
    //                 'ownobject',
    //                 'sharedowner',

    //                 'uuid',
    //                 'owner.fullname',
    //                 'creator.fullname'
    //             ],
    //             filter: [
    //                 Ext.encode({
    //                     property: 'isfolder',
    //                     value: true
    //                 })
    //             ]
    //         },
    //         url: '/api/rest/object',
    //         reader: {
    //             type: 'json',
    //             rootProperty: 'data',
    //             useSimpleAccessors: true
    //         },
    //         writer: {
    //             type: 'json',
    //             nameProperty: 'mapping',
    //             encode: true,
    //             rootProperty: 'data'
    //         }
    //     }
    }
});