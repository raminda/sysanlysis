Ext.define('New.view.GridUserView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.UserGrid',
	title : 'User Views',
	frame : false,
	border : false,
	bodyPadding : 10,
	
	items : [ {
		xtype : 'panel',
		items : [{
			xtype : 'gridpanel',
			scroll : true,
			border : false,
			columnLines : true,
			id : 'gridUserView',
			name : 'gridUserView',
			store : 'UserStoreGrid',
			viewConfig: {
	            forceFit: true
			},
			flex : 4,
			columns :[/*{
					header : 'User ID',
					dataIndex : 'ID',
					
				},*/ {
					header : 'User NAME',
					dataIndex : 'UserName',

				}, {
					header : 'User Type',
					dataIndex : 'UserLevel',

				}, {
					header : 'Date created',
					dataIndex : 'date_created',

				}, {
					header : 'Date modified',
					dataIndex : 'date_modified',

				} ],
			tbar : [ {
				text : 'Add New User',
				iconCls : 'add',
				handler : function() {
					var win = Ext.create('Ext.window.Window', {
						title : 'Add New User',
						width : 450,
						height : 250,
						minWidth : 300,
						minHeight : 200,
						layout : 'fit',
						plain : true,
						items : [{
							xtype : 'addUser',
						}],
						buttons : [],
					});
					win.show();
					}
				}, {
				text : 'Remove User',
				iconCls : 'remove',
				handler : function(){
					var grid = Ext.getCmp('gridUserView');
					var sm = grid.getSelectionModel();
					var val = sm.getSelection();
					var store = grid.getStore('UserStoreGrid');
					
					store.remove(val);
					if (store.getCount() > 0) {
						sm.select(0);
					}
					
					store.proxy.extraParams.purpose = 'delete';
					store.proxy.extraParams.value = val[0].get('ID');
					store.load();
					Ext.Msg.alert('Sucsess', val[0].get('ID')+"===fd==="+val);
					
					var grid = Ext.getCmp('gridUserView');
					var store = grid.getStore('UserStoreGrid');
					store.proxy.extraParams.purpose='Grid';
					store.load();
					}
				},{
					text : 'Refresh',
					iconCls : 'refresh',
					handler : function(){
						var grid = Ext.getCmp('gridUserView');
						var store = grid.getStore('UserStoreGrid');
						store.proxy.extraParams.purpose='Grid';
							store.load();
				}
			} ],
			listeners : {
				
				itemdblclick: function(me, record, item, index, e, eOpts ){
					var win = Ext.create('Ext.window.Window', {
						title : 'Update User details',
						width : 450,
						height : 250,
						minWidth : 300,
						minHeight : 200,
						layout : 'fit',
						plain : true,
						items : [ {
							xtype : 'UpdateUser'
						} ],

						buttons : []
					});

					win.show();
				}
			}
			} ]
		} ],


		initComponent : function() {
			this.callParent(arguments);
		}
	});