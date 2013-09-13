Ext.define( 'New.store.ProjectItemsStore1', {
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
	        purpose: 'NULL',
	        value: '0',
	        ID1:'0',
	        ID2:'0',
	        ID3:'0',
	        ID4:'0'
		}
	}
});

