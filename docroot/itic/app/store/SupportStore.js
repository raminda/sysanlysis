Ext.define( 'New.store.SiteTypeStore', {
	extend :'Ext.data.Store',
	model : 'New.model.SupportModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : SiteTypeStoreUrl,
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

