Ext.define('New.model.EquipmentsBulkModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'ID',
		type : 'number'
	}, {
		name : 'ItemID',
		type : 'string'
	}, {
		name : 'PackageID',
		type : 'string'
	},{
		name : 'Quantity',
		type : 'number'
	},{
		name : 'Price',
		type : 'number'
	}, {
		name : 'date_created',
		type : 'string'
	}, {
		name : 'date_modified',
		type : 'string'
	},{
		name : 'date_logged',
		type : 'string'
	}]
});