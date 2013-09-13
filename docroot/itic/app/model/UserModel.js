Ext.define('New.model.UserModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'ID',
		type : 'number'
	},{
		name : 'UserName',
		type : 'string'
	},{
		name : 'UserLevel',
		type : 'number'
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