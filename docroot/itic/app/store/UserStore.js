Ext.define( 'New.store.UserStore', {
	extend :'Ext.data.Store',
	model : 'New.model.UserModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : UserStoreUrl,
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

