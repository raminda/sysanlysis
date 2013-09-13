Ext.define('New.view.BodyView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.MainBodypanel',
	border : false,
	frame : true,
	id : 'ViewMainBody',
	name : 'ViewMainBody',
	anchor: '100% 100%',
	height:800,
	items :[{
		flex : 1,
			text : 'Add Equipment to EquipmentBulk',
			id : 'EquipmentBulkDD',
			name : 'EquipmentBulkDD',
			iconCls : 'Icon',
			textAlign : 'left',
			xtype : 'BulkDD',
		},{
			flex : 1,
			text : 'Grid',
			id : 'GridBody',
			name : 'GridBody',
			iconCls : 'Icon',
			textAlign : 'left',
			xtype : 'GridBody',
		},{
			flex : 1,
			text : 'Main',
			id : 'FormsBody',
			name : 'FormsBody',
			iconCls : 'Icon',
			textAlign : 'left',
			xtype : 'FormsView',
		},{
			flex : 1,
			text : 'Main',
			id : 'MBody',
			name : 'MBody',
			title : 'MAIN MENU',
			xtype : 'image',
		}],
		
		initComponent : function() {
			this.callParent(arguments);
			
			Ext.getCmp('EquipmentBulkDD').setVisible(true);
			Ext.getCmp('GridBody').setVisible(false);
			Ext.getCmp('FormsBody').setVisible(false);
			
		}
});




Ext.onReady(function(){
	/****
    * Setup Drop Targets
    ***/
	
	var formPanelDropTargetEl =  Ext.getCmp('formPanel').body.dom;
    Ext.create('Ext.dd.DropTarget', formPanelDropTargetEl, {
        ddGroup: 'GridExample',
        notifyEnter: function(ddSource, e, data) {
        	
            //Add some flare to invite drop.
        	Ext.getCmp('formPanel').body.stopAnimation();
        	Ext.getCmp('formPanel').body.highlight();
        },
        notifyDrop  : function(ddSource, e, data){
        	
            // Reference the record (single selection) for readability
        	
            var selectedRecord = ddSource.dragData.records[0];

            // Load the record into the form
            Ext.getCmp('formPanel').getForm().loadRecord(selectedRecord);

            // Delete record from the source store.  not really required.
            ddSource.view.store.remove(selectedRecord);

            Ext.getCmp('btnbulkOK').enable(true);
            Ext.getCmp('btnbulkClear').enable(true);
            return true;
        }
    });
    Ext.getCmp('MBody').setVisible(true);
    
    Ext.getCmp('EquipmentBulkDD').setVisible(false);
    
});