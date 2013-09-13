Ext.define('New.view.GridItemTypeView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ItemTypeGrid',
	title : 'Item Type Grid View',
	height :750,
	frame : true,
	border : false,
	bodyPadding : 0,
	items : [ {
		xtype : 'gridpanel',
		scroll : true,
		border : false,
		columnLines : true,
		id : 'GridItemTypeView',
		name : 'GridItemTypeView',
		store : 'ItemTypeStoreGrid',
		overflowX : 'auto',

		viewConfig: {
            forceFit: true
		},
		columns :[ /*{
			header : 'Item Type ID',
			dataIndex : 'ID',
	
		},*/{
			flex : 1,
			header : 'Type Name',
			dataIndex : 'TypeName',
	
		},{
			flex : 1,
			header : 'Access level',
			dataIndex : 'AccsessLevel',
	
		},{
			flex : 1,
			header : 'date created',
			dataIndex : 'date_created',
	
		},{
			flex : 1,
			header : 'date modified',
			dataIndex : 'date_modified',
	
		}],
		tbar : [ {
			text : 'Add New Item Type',
			iconCls : 'add',
			handler : function() {
				var win=null;
				win= Ext.create('Ext.window.Window', {
					title : 'Add New Item Type',
					width : 450,
					height : 250,
					minWidth : 300,
					minHeight : 200,
					layout : 'fit',
					plain : true,
					items : [{
						xtype : 'AddItemType',
					}],
					buttons : [{
						xtype : 'button',
						text : 'Save',
						width : 150,
						handler : function() {
								
							var Name = Ext.getCmp('txtItemName').getValue();
							var Type = Ext.getCmp('cmbAsLvlLevel').getValue();
																
							var row=null;
							var store=null;
						 	var form = Ext.getCmp('AddItemType').getForm();
						 	if(form.isValid()){
						 		store = Ext.getStore('ItemTypeStore');
								store.proxy.extraParams.purpose = 'New';
								JsonObject= {TypeName:Name,AccsessLevel: Type};
								row= Ext.create('New.model.ItemTypeModel', JsonObject);
								store.insert(0, row);
	
								Ext.getCmp('txtItemName').reset();
								Ext.getCmp('cmbAsLvlLevel').reset();
								
								var grid = Ext.getCmp('GridItemTypeView');
								var store=grid.getStore('ItemTypeStoreGrid');
								store.proxy.extraParams.purpose = 'Grid';
								store.load();
								
								win.close();//Ext.Msg.alert('Sucsess', 'Sucsess !');
					         }
					 		else{
					 			Ext.Msg.alert('Error', 'Plese Fill all the feied brfor saving !');
					 		}
						}
							
							
					} ,{
						text : 'Close',
						width : 150,
						handler : function() {
							win.close();
						}
					}],
				});
				win.show();
			}
		},{
			text : 'Remove Item Type',
			iconCls : 'remove',
			handler : function(){
				var grid = Ext.getCmp('GridItemTypeView');
				var sm = grid.getSelectionModel();
				var val = sm.getSelection();
				var store = grid.getStore('ItemTypeStoreGrid');
				
				if(val[0]!=null){
					store.remove(val);
					if (store.getCount() > 0) {
					sm.select(0);
					}
				
					store.proxy.extraParams.purpose = 'delete';
					store.proxy.extraParams.value = val[0].get('ID');
					store.load();
					
					
					var grid = Ext.getCmp('GridItemTypeView');
					var store=grid.getStore('ItemTypeStoreGrid');
					store.proxy.extraParams.purpose = 'Grid';
					store.load();
					
				}
				else{
					Ext.Msg.alert('Error ', "Plese Select one Row befor Pressing Delete");
				}

				
				}
			},{
				text : 'Refresh',
				iconCls : 'refresh',
				handler : function(){
					var grid = Ext.getCmp('GridItemTypeView');
					var store=grid.getStore('ItemTypeStoreGrid');
					store.proxy.extraParams.purpose = 'Grid';
					store.load();
			}
		} ],
		listeners : {
			itemdblclick: function(me, record, item, index, e, eOpts ){
				var win=null;
				win= Ext.create('Ext.window.Window', {
					title : 'Update Item Type details',
					width : 450,
					height : 250,
					minWidth : 300,
					minHeight : 200,
					layout : 'fit',
					plain : true,
					items : [ {
						xtype : 'UpdateItemType'
					} ],

					buttons : [{
						text : 'Update',
						width : 150,
						handler : function() {
							
							var Name = Ext.getCmp('txtUItemName').getValue();
							var Type = Ext.getCmp('cmbUAsLvlLevel').getValue();
							var ID =Ext.getCmp('txtUItemID').getValue();					
							
									var row=null;
									var store=null;
									var form = Ext.getCmp('UpdateItemType').getForm();
							         if(form.isValid()){
									store = Ext.getStore('ItemTypeStore');
									store.proxy.extraParams.purpose = 'Update';
									JsonObject= {ID:ID,TypeName:Name,AccsessLevel: Type};
									row= Ext.create('New.model.ItemTypeModel', JsonObject);
									store.insert(0, row);

									var grid = Ext.getCmp('GridItemTypeView');
									var store=grid.getStore('ItemTypeStoreGrid');
									store.proxy.extraParams.purpose = 'Grid';
									store.load();
									win.close();
							         }
							         else{
							        	 Ext.Msg.alert('Error', 'Plese Fill all the feied brfor saving !'); 
							         }
									//Ext.Msg.alert('Sucsess', 'Sucsess !');
								}
								
							
						} ,{
							text : 'Close',
							width : 150,
							handler : function() {
								win.close();
							}
						}]
				});

				win.show();
			}
		}
	}
],

	initComponent : function() {
		this.callParent(arguments);
	}
});