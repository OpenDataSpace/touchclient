Ext.define('ACMobileClient.view.UploadList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.uploadlist',

    requires:[
        'Ext.ActionSheet'
    ],

    config: {
        //onItemDisclosure: true,
        mode: 'SINGLE',
        itemTpl: [
            '<div class="list_style">',
            '    <div class="list_icons">',
            '        <div class="list_icon upload_status{status}"></div>',
            '    </div>',
            '    <div class="list_entry">{name}</div>',
            '    <div class="list_entry">{percent}%<span class="msg">{message}</span></div>',
            '    <div class="list_entry"><span class="path_info">{[this.getPath(values.path)]}</span></div>',
            '</div>',
            {
                compiled:true,
                disableFormats: true,
                getPath:function(path){
                    console.log(path)
                    return path;
                }
            }
        ],


        listeners: [
            {
                fn: 'onDocumentListSelect',
                //event: 'itemtap'
                event: 'itemsingletap'
            },
            {
                fn: 'onDocumentListSelect',
                //event: 'itemtap'
                event: 'itemdoubletap'
            },
            {
                fn: 'onDocumentListRefresh',
                event: 'refresh'
            }
        ]
    },

    onDocumentListSelect: function(dataview, index, target, record, e, eOpts) {
        console.log(record)

        var id, orgName,
            previewAble;

        // For both 'taphold' and 'disclose' events, sencha fires an additional
        // 'singletap' afterwards. Since we trigger actions for both events and
        // only want *ONE* action to happen at any time, we set a timestamp in
        // the respective Handlers which is checkt below. If one of those events
        // fired less than a 2 seconds ago, we ignore the singletap.
        if (this.lastAction && this.lastAction > Date.now() - 2000) {
            this.deselectAll();
            return;
        }

        this.lastAction = Date.now();

        id = record.get("id");
        orgName = record.get("name");
        console.log(MyGlobals.uploadItems)
        if(typeof MyGlobals.uploadItems[id] !== 'undefined'){
            Ext.Msg.prompt(
                "", 
                "Please input new name: ", 
                function(buttonId, value){
                    if(buttonId === 'ok'){
                        newName = Ext.String.trim(value);
                        if(newName !== "" && newName !== orgName){
                            record.set('name', newName);
                            MyGlobals.uploadItems[id].name = newName;
                            console.log(MyGlobals.uploadItems);
                        }
                    }
                },
                this,
                false,
                orgName
            );
        }
    },

    onDocumentListRefresh: function(dataview, eOpts) {
        this.deselectAll();
    }

});
