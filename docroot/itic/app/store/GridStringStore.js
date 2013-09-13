Ext.define( 'New.store.GridStringStore', {
	extend :'Ext.data.Store',
	model : 'New.model.GridStringModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : EquipmentsBulkStoreUrl,
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

