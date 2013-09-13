Ext.define('New.model.ProjectItemsModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'ID',
		type : 'number'
	},{
		name : 'ProjectID',
		type : 'string'
	},{
		name : 'OptionID',
		type : 'string'
	},{
		name : 'VersionID',
		type : 'string'
	},{
		name : 'SiteID',
		type : 'string'
	},{
		name : 'PackageID',
		type : 'string'
	},{
		name : 'PackageType',
		type : 'string'
	},{
		name : 'Quantity',
		type : 'number'
	},{
		name : 'PcakageUsege', 
		type : 'string'
	},{
		name : 'Price',
		type : 'number'
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