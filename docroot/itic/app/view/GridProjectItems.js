Ext.define('New.view.GridProjectItems', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ProjectsItemGrid',
	title : 'Projects Items View',
	layout : 'fit',
/*	anchor: '100% 100%',*/
	height :750,
	frame : false,
	border : false,
	bodyPadding : 0,
	items : [ {
		xtype : 'gridpanel',
		scroll : true,
		border : false,
		columnLines : true,
		id : 'gridProjectoutViews',
		name : 'gridProjectoutViews',
		height : 700,
		store : 'ProjectItemsStoreResult',
		overflowX : 'auto',
		
		columns :[/* {
			header : 'Project Items ID',
			dataIndex : 'ID',	
	
		  }, */{
			header : 'Project ID',
			dataIndex : 'ProjectID',
	
		  }, {
			header : 'Option ID',
			dataIndex : 'OptionID',
	
		  }, {
			header : 'Version ID',
			dataIndex : 'VersionID',	
	
		  }, {
			header : 'SiteID',
			dataIndex : 'SiteID',
	
		  }, {
			header : 'Package ID',
			dataIndex : 'PackageID',
	
			}, {
			header : 'Quantity',
			dataIndex : 'Quantity',
	
			}, {
			header : 'Price',
			dataIndex : 'Price',
	
			},{
			header : 'Date modified',
			dataIndex : 'date_modified',
	
		}],
		tbar : [{
				text : 'Add New Package',
				iconCls : 'add',
				handler : function() {
					var win = Ext.create('Ext.window.Window', {
						title : 'Add New Project Items',
						width : 450,
						height : 250,
						minWidth : 300,
						minHeight : 200,
						layout : 'fit',
						plain : true,
						items : [{
							xtype : 'AddPackage',
						}],
						buttons : [],
					});
					win.show();
					}
				}, {
					text : 'Remove Project Items',
					iconCls : 'remove',
					handler : function(){
						var grid = Ext.getCmp('gridProjectoutView');
						var sm = grid.getSelectionModel();
						var val = sm.getSelection();
						var store = grid.getStore('ProjectItemsStoreResult');
						
						if(val[0]!=null){
							store.remove(val);
							if (store.getCount() > 0) {
							sm.select(0);
							}
						
							store.proxy.extraParams.purpose = 'delete';
							store.proxy.extraParams.value = val[0].get('ID');
							store.load();
							
							
							var grid = Ext.getCmp('gridProjectoutView');
							var store = grid.getStore('ProjectItemsStoreResult');
							store.proxy.extraParams.purpose='Grid';
							store.load();
							
						}
						else{
							Ext.Msg.alert('Error ', "Plese Select one Row befor Pressing Delete");
						}
						
						
					}
				
				},{
					text : 'refresh',
					iconCls : 'refresh',
					handler : function(){
						var grid = Ext.getCmp('gridProjectoutView');
						var store = grid.getStore('ProjectItemsStoreResult');
						store.load();
				}
			}],
			listeners : {
				itemdblclick: function(me, record, item, index, e, eOpts ){
					var win = Ext.create('Ext.window.Window', {
						title : 'Update Project Items details',
						width : 450,
						height : 250,
						minWidth : 300,
						minHeight : 200,
						layout : 'fit',
						plain : true,
						items : [ {
							//xtype : 'updatUser'
						} ],

						buttons : []
					});

					win.show();
				}
			}
			}],
	initComponent : function() {
		this.callParent(arguments);
	}
});