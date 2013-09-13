Ext.define( 'New.store.EquipmentStoreComp', {
	extend :'Ext.data.Store',
	model : 'New.model.EquipmentModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : EquipmentStoreUrl,
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

