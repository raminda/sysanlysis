Ext.define( 'New.store.SiteTypeStoreGrid', {
	extend :'Ext.data.Store',
	model : 'New.model.SiteTypeModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : SiteTypeStoreUrl,
		reader : {
			type : 'json'
		},
		extraParams: {
            purpose: 'Grid',
            value: '0',
            ID:'Null'
		}
	}
});

