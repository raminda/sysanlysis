Ext.define( 'New.store.ProjectsStore', {
	extend :'Ext.data.Store',
	model : 'New.model.ProjectsModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : ProjectsStoreUrl,
		reader : {
			type : 'json'
		},
		extraParams: {
	        purpose: 'Null',
	        value: '0',
	        ID:'Null'
		}
	}
});

