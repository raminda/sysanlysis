Ext.define( 'New.store.ProjectItemsStoreGrid', {
	extend :'Ext.data.Store',
	model : 'New.model.ProjectItemsModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : ProjectItemsStoreUrl,
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

