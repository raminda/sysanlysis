Ext.define('New.view.SMenuStoreView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.StoreType',
	title : 'Stores Menu',
	layout : 'fit',
	anchor: '100% 100%',
	frame : false,
	border : false,
	bodyPadding : 0,
	items : [ {
		xtype : 'panel',
		bodyPadding : 15,
		border : false,
		items : [{
			xtype : 'button',
			text : 'Configure Equipment',
			width : 200,
			handler : function() {
				
				//var grid = Ext.getCmp('gridEquipmentView');
				var store = Ext.getStore('EquipmentsBulkStoreGrid');
				store.proxy.extraParams.purpose='null';
				store.load();
				var store = Ext.getStore('EquipmentStoreGrid');
				store.proxy.extraParams.purpose='null';
				store.load();
				
				Ext.getCmp('EquipmentBulkDD').setVisible(true);
				
				
				Ext.getCmp('GridBody').setVisible(true);				
				Ext.getCmp('MBody').setVisible(false);	
				Ext.getCmp('FormsBody').setVisible(false);
				Ext.getCmp('AddProjectDetails').setVisible(false);	
				
			}//
		},{
			xtype : 'button',
			text : 'Base Equipments',
			width : 200,
			id : 'Base_Equipments',
			name : 'Base_Equipments',
			handler : function() {
				
				var grid = Ext.getCmp('gridPackageView');
				var store = grid.getStore('PackageStoreGrid');
				store.proxy.extraParams.purpose='Grid';
				store.load();
				
				Ext.getCmp('PackageGrid').setVisible(true);
				Ext.getCmp('GridBody').setVisible(true);
				
				Ext.getCmp('FormsBody').setVisible(false);				
				Ext.getCmp('MBody').setVisible(false);
				
				Ext.getCmp('ItemTypeGrid').setVisible(false);
				Ext.getCmp('ProjectGrid').setVisible(false);
				Ext.getCmp('EquipmentGrid').setVisible(false);
				Ext.getCmp('EquipmentBulkDD').setVisible(false);
				Ext.getCmp('AddProjectDetails').setVisible(false);
			}
		},{
			xtype : 'button',
			text : 'Equipment',
			width : 200,
			id : '_Equipments',
			name : '_Equipments',
			handler : function() {
				
				var grid = Ext.getCmp('gridEquipmentView');
				var store = grid.getStore('EquipmentStoreGrid');
				store.proxy.extraParams.purpose='Grid';
				store.load();
				
				
				//Ext.get("gridEquipmentView").setHeight(Ext.get("ViewMainBody").getHeight()-100);
				
				Ext.getCmp('EquipmentGrid').setVisible(true);
				Ext.getCmp('GridBody').setVisible(true);
				
				Ext.getCmp('FormsBody').setVisible(false);				
				Ext.getCmp('MBody').setVisible(false);
				Ext.getCmp('EquipmentBulkDD').setVisible(false);
				
				Ext.getCmp('ItemTypeGrid').setVisible(false);
				Ext.getCmp('ProjectGrid').setVisible(false);
				Ext.getCmp('PackageGrid').setVisible(false);
				Ext.get("gridEquipmentView").setWidth(  (Ext.get("MainBodypanel").getWidth())*74/100-10);
				Ext.getCmp('AddProjectDetails').setVisible(false);
			}//Ext.getCmp('EquipmentBulkDD').setVisible(false);
		},{
			xtype : 'button',
			text : 'Item Types',
			id : 'Item_Types',
			name : 'Item_Types',
			width : 200,
			handler : function() {
				var grid = Ext.getCmp('GridItemTypeView');
				var store = grid.getStore('ItemTypeStoreGrid');
				store.proxy.extraParams.purpose='Grid';
				store.load();
				
				Ext.getCmp('ItemTypeGrid').setVisible(true);
				Ext.getCmp('GridBody').setVisible(true);
				
				Ext.getCmp('FormsBody').setVisible(false);				
				Ext.getCmp('MBody').setVisible(false);
				
				Ext.getCmp('EquipmentGrid').setVisible(false);
				Ext.getCmp('ProjectGrid').setVisible(false);
				Ext.getCmp('PackageGrid').setVisible(false);
				Ext.getCmp('EquipmentBulkDD').setVisible(false);
				Ext.getCmp('AddProjectDetails').setVisible(false);
			}
		}]		         
	} ],

	initComponent : function() {
		this.callParent(arguments);
	}
});
