Ext.define( 'New.store.PackageStoreGrid', {
	extend :'Ext.data.Store',
	model : 'New.model.PackageModel',
	autoLoad : true,
	autoSync : false,
	proxy : {
		type : 'ajax',
		url : PackageStoreUrl,
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

