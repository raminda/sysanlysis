Ext.define( 'New.store.EquipmentsBulkStoreGrid', {
	extend :'Ext.data.Store',
	model : 'New.model.EquipmentsBulkModel',
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

