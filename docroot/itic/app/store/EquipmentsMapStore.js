Ext.define( 'New.store.EquipmentsMapStore', {
	extend :'Ext.data.Store',
	model : 'New.model.EquipmentMapModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : EquipmentsMapingStoreUrl,
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

