Ext.define('New.view.GridProjectView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ProjectGrid',
	title : 'Project Grid View',
	height :750,
	frame : true,
	border : false,
	bodyPadding : 0,
	items : [ {
			xtype : 'gridpanel',
			scroll : true,
			border : false,
			columnLines : true,
			id : 'gridProjectView',
			name : 'gridProjectView',
			store : 'ProjectsStoreGrid',
			overflowX : 'auto',
			viewConfig: {
	            forceFit: true
			},
			
			columns :[/*{
				header : 'Project ID',
				dataIndex : 'ID',
			},*/{
				flex : 1,
				header : 'Company Name',
				dataIndex : 'Company',
		
			},/*{
				flex : 1,
				header : 'TotalAmount',
				dataIndex : 'TotalAmount',
		
			},*/{
				flex : 1,
				header : 'Project Name',
				dataIndex : 'ProjectName',
				
			},{
				flex : 1,
				header : 'date created',
				dataIndex : 'date_created',
		
			},{
				flex : 1,
				header : 'date modified',
				dataIndex : 'date_modified',
	
		}],
		tbar : [{
			text : 'Add New Projects',
			iconCls : 'Add new Projects',
			handler : function() {
				var win =null;
				win= Ext.create('Ext.window.Window', {
					title : 'Add New Projects',
					width : 450,
					height : 250,
					minWidth : 300,
					minHeight : 200,
					layout : 'fit',
					plain : true,
					items : [{
						xtype : 'AddProjects',
					}],
					buttons : [{
						xtype : 'button',
						text : 'Save',
						id : 'btnSaveproject',
						name : 'btnSaveproject',
						width : 150,
						handler : function() {
							
							//saving Company data 
							var CompanyName = Ext.getCmp('txtCompanyName').getValue();
							var ProjectName = Ext.getCmp('txtProjectName').getValue();

							var row=null;
							var store=null;
							
							var form = Ext.getCmp('AddProjects').getForm();
							if(form.isValid()){
								store = Ext.getStore('ProjectsStore');
								store.proxy.extraParams.purpose = 'New';
								JsonObject= {Company:CompanyName,ProjectName:ProjectName};
								row= Ext.create('New.model.ProjectsModel', JsonObject);
								store.insert(0, row);
									
								win.close();
							}
							else{
								Ext.Msg.alert('Message', 'Plese Enter ProjectName And CompanyName Borth Befor Save!');
							}
						}
					},{
						text : 'Close',
						width : 150,
						handler : function() {
							win.close();
						}
					}],
				});
				win.show();
			}
		}, {
			text : 'Remove Project',
			iconCls : 'Remove',
			handler : function(){
				
				var grid = Ext.getCmp('gridProjectView');
				var sm = grid.getSelectionModel();
				var val = sm.getSelection();
				var store = grid.getStore('ProjectsStoreGrid');
				
				if(val[0]!=null){
					if (store.getCount() > 0) {
						sm.select(0);
					}
					store.proxy.extraParams.purpose = 'delete';
					store.proxy.extraParams.value = val[0].get('ID');
					store.load();
					
					var grid = Ext.getCmp('gridProjectView');
					var store = grid.getStore('ProjectsStoreGrid');
					store.proxy.extraParams.purpose='Grid';
					store.load();
					
					
					
				}
				else{
					Ext.Msg.alert('Error ', "Plese Select one Row befor Press Delete");
				}
	
			}
		},{
			text : 'Refresh',
			iconCls : 'refresh',
			handler : function(){
				
				var grid = Ext.getCmp('gridProjectView');
				var store = grid.getStore('ProjectsStoreGrid');
				store.proxy.extraParams.purpose='Grid';
				store.load();
				
				var store = Ext.getStore('my');
				//store.proxy.extraParams.purpose='Grid';
				store.load();
			}
		}],
		listeners : {
			itemdblclick: function(me, record, item, index, e, eOpts ){
				
				var win=null;
				win= Ext.create('Ext.window.Window', {
					title : 'Update Equipment details',
					width : 450,
					height : 250,
					minWidth : 300,
					minHeight : 200,
					layout : 'fit',
					plain : true,
					items : [ {
						xtype : 'UpdateProjects',
					} ],

					buttons : [{
						xtype : 'button',
						text : 'Update',
						id : 'btnUpdateproject',
						name : 'btnUpdateproject',
						width : 150,
						handler : function() {
						
							var CompanyName = Ext.getCmp('txtUpCompanyName').getValue();
							var ProjectName = Ext.getCmp('txtUpProjectName').getValue();
							var ID = Ext.getCmp('txtUpCompanyID').getValue();
	
							var row=null;
							var store=null;
							var form = Ext.getCmp('UpProjects').getForm();
							if(form.isValid()){
								store = Ext.getStore('ProjectsStore');
								store.proxy.extraParams.purpose = 'Update';
								JsonObject= {ID:ID,Company:CompanyName,ProjectName:ProjectName};
								row= Ext.create('New.model.ProjectsModel', JsonObject);
								store.insert(0, row);

								var grid = Ext.getCmp('gridProjectView');
								var store = grid.getStore('ProjectsStoreGrid');
								store.proxy.extraParams.purpose='Grid';
								store.load();
								
								win.close();
							}
							else{
								Ext.Msg.alert('Message', 'Plese Enter ProjectName And CompanyName Borth Befor Save!');
							}
						}
					},{
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
	}],
	initComponent : function() {
		this.callParent(arguments);
	}
});