Ext.define( 'New.store.ItemTypeStore', {
	extend :'Ext.data.Store',
	model : 'New.model.ItemTypeModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : ItemTypeStoreUrl,
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

