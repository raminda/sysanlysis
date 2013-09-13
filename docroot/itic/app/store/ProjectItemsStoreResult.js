Ext.define( 'New.store.ProjectItemsStoreResult', {
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
	        ID1:'Null',
	        ID2:'Null',
	        ID3:'Null',
	        ID4:'Null'
		}
	}
});

