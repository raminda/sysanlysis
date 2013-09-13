Ext.define( 'New.store.ProjectsStoreGrid', {
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

