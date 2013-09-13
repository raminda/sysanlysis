Ext.define('New.model.ItemTypeModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'ID',
		type : 'number'
	},{
		name : 'TypeName',
		type : 'string'
	},{
		name : 'AccsessLevel',
		type : 'string'
	},{
		name : 'date_created',
		type : 'date'
	},{
		name : 'date_modified',
		type : 'date'
	},{
		name : 'date_logged',
		type : 'date'
	}]
});