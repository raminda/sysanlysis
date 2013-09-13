Ext.define('New.view.GridEquipmentsBulkView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.EquipmentsBulkGrid',
	title : 'Package Grid View',
	height :400,
	frame : true,
	border : false,
	bodyPadding : 0,
	items : [ {
		xtype : 'gridpanel',
		scroll : true,
		columnLines : true,
		id : 'gridEquipmentsBulkView',
		name : 'gridEquipmentsBulkView',		
		store : 'EquipmentsBulkStoreGrid',
		overflowX : 'auto',
		columns :[/* {
			flex : 1,
			header : 'Equipments Bulk ID',
			dataIndex : 'ID',
	
		},*/{
			flex : 1,
			header : 'Item ID',
			dataIndex : 'ItemID',
	
		},{
			flex : 1,
			header : 'Package ID',
			dataIndex : 'PackageID',
	
		},{
			flex : 1,
			header : 'Quantity',
			dataIndex : 'Quantity',
			
		},{
			flex : 1,
			header : 'Price',
			dataIndex : 'Price',
	
		},{
			flex : 1,
			header : 'date created',
			dataIndex : 'date_created',
	
		},{
			flex : 1,
			header : 'date modified',
			dataIndex : 'date_modified',
	
		} ],
		
	}
],

	initComponent : function() {
		this.callParent(arguments);
	}
});