Ext.define('New.model.PackageModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'ID',
		type : 'number'
	}, {
		name : 'PackageName',
		type : 'string'
	}, {
		name : 'Price',
		type : 'number'
	},{
		name : 'EOLDate',
		type : 'string'
	},{
		name : 'Summery',
		type : 'string'
	},{
		name : 'Full_Descrip',
		type : 'string'
	},{
		name : 'ITIC_Descrip',
		type : 'string'
	},{
		name : 'Tec_Descrip',
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
	}]
});