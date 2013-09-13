Ext.define('New.model.ProjectsModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'ID',
		type : 'number'
	},{
		name : 'Company',
		type : 'string'
	},{
		name : 'TotalAmount',
		type : 'number'
	},{
		name : 'ProjectName',
		type : 'string'
	},{
		name : 'date_created',
		type : 'string'
	},{
		name : 'date_modified',
		type : 'string'
	},{
		name : 'date_logged',
		type : 'string'
	}

	]
});