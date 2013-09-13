Ext.define('New.model.EquipmentMapModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'ID',
		type : 'number'
	}, {
		name : 'ParentID',
		type : 'string'
	}, {
		name : 'ChildID',
		type : 'string'
	}, {
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