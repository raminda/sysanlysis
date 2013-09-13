Ext.define('New.view.GridPackageView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.PackageGrid',
	title : 'Package Grid View',
	height :750,
	frame : true,
	border : false,
	bodyPadding : 0,
	items : [{
		xtype : 'gridpanel',
		scroll : true,
		border : false,
		columnLines : true,
		id : 'gridPackageView',
		name : 'gridPackageView',
		store : 'PackageStoreGrid',
		overflowX : 'auto',
		columns :[/* {
			header : 'Package ID',
			dataIndex : 'ID',
	
		},*/{
			flex : 1,
			header : 'Package Name',
			dataIndex : 'PackageName',
	
		}, /*{
			header : 'Price',
			dataIndex : 'Price',
	
		},*/{
			flex : 1,
			header : 'Summery',
			dataIndex : 'Summery',
	
		},{
			flex : 1,
			header : 'Full Description',
			dataIndex : 'Full_Descrip',
	
		},{
			flex : 1,
			header : 'Technical Description',
			dataIndex : 'Tec_Descrip',
			
		},{
			flex : 1,
			header : 'End Of Life date',
			dataIndex : 'EOLDate',
			
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
			text : 'Add New Package',
			iconCls : 'add',
			handler : function() {
				var win=null;
				win= Ext.create('Ext.window.Window', {
					title : 'Add New Package',
					width : 450,
					height : 500,
					minWidth : 300,
					minHeight :400,
					layout : 'fit',
					plain : true,
					items : [{
						xtype : 'AddPackage',
					}],
					buttons : [{
						xtype : 'button',
						text : 'Save',
						width : 150,
						handler : function() {
							
							var Name = Ext.getCmp('txtPackageName').getValue();
							var Summary=Ext.getCmp('txtPkgSummery').getValue();
							var FullDescription = Ext.getCmp('txtPkgFullDescription').getValue();
							var ITICDescription = Ext.getCmp('txtpkgITICDescription').getValue();
							var TecDescription = Ext.getCmp('txtpkgTecDescription').getValue();
							var edate= Ext.getCmp('txtPkgEOD').getValue();
							
							var Itemname = Ext.getCmp('cmbItemss').getValue();
							var ndate=new Date();
							if(EOLdate<ndate){
								Ext.Msg.alert('Date Not match', 'Invalide date For EOD!');
							}
							else{
								var date = new Date(edate),
						        mnth = ("0" + (date.getMonth()+1)).slice(-2),
						        day  = ("0" + date.getDate()).slice(-2);
								var EOLdate=[ date.getFullYear(), mnth, day ].join("-");
								
								var row=null;
								var store=null;
								
								 var form = Ext.getCmp('AddPackage').getForm();
						         if(form.isValid()){
									store = Ext.getStore('PackageStore');
									store.proxy.extraParams.purpose = 'New';
									store.proxy.extraParams.ID="[{PackageID:'"+Name+"',ItemID:'"+Itemname+"',Quantity:'1'}]";
									JsonObject= {PackageName:Name,Summery: Summary,Full_Descrip:FullDescription,ITIC_Descrip:ITICDescription,Tec_Descrip:TecDescription,Price:0,EOLDate:EOLdate};
									row= Ext.create('New.model.PackageModel', JsonObject);
									store.insert(0, row);
																
									
									Ext.getCmp('txtPackageName').reset();
									Ext.getCmp('txtPkgSummery').reset();
									Ext.getCmp('txtPkgFullDescription').reset();
									Ext.getCmp('txtpkgITICDescription').reset();
									Ext.getCmp('txtpkgTecDescription').reset();
									Ext.getCmp('txtPkgEOD').reset();
									
									var grid = Ext.getCmp('gridPackageView');
									var store = grid.getStore('PackageStoreGrid');
									store.proxy.extraParams.purpose='Grid';
									store.load();
									win.close();
						         }
						         else{
						        	 Ext.Msg.alert('Error', 'Plese Fill all the feied brfor saving !');
						         }
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
				text : 'Remove Packages',
				iconCls : 'remove',
				handler : function(){
					var grid = Ext.getCmp('gridPackageView');
					var sm = grid.getSelectionModel();
					var val = sm.getSelection();
					var store = grid.getStore('PackageStoreGrid');
					if(val[0]!=null){
						store.remove(val);
						if (store.getCount() > 0) {
							sm.select(0);
						}
						
						store.proxy.extraParams.purpose = 'delete';
						store.proxy.extraParams.value = val[0].get('ID');
						store.load();
						
						var grid = Ext.getCmp('gridPackageView');
						var store = grid.getStore('PackageStoreGrid');
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
					var grid = Ext.getCmp('gridPackageView');
					var store = grid.getStore('PackageStoreGrid');
					store.proxy.extraParams.purpose='Grid';
					store.load();
			}
		} ],
		listeners : {
			itemdblclick: function(me, record, item, index, e, eOpts ){
				var win=null;
				win= Ext.create('Ext.window.Window', {
					title : 'Update Package Details',
					width : 450,
					height : 500,
					minWidth : 300,
					minHeight : 400,
					layout : 'fit',
					plain : true,
					items : [ {
						xtype : 'UpdatePackage'
					} ],

					buttons : [{
						text : 'Update',
						width : 150,
						handler : function() {
							
							var ID = Ext.getCmp('txtUpPackageID').getValue();
							var Name = Ext.getCmp('txtUpPackageName').getValue();
							//var Price = Ext.getCmp('txtUpPkgPrice').getValue();
							var Summery=Ext.getCmp('txtUpPkgSummery').getValue();
							var FullDescription = Ext.getCmp('txtUpPkgFullDescription').getValue();
							var ITICDescription = Ext.getCmp('txtUppkgITICDescription').getValue();
							var TecDescription = Ext.getCmp('txtUppkgTecDescription').getValue();
							var edate= Ext.getCmp('txtUpPkgEOD').getValue();
							
							var ndate=new Date();
							//txtUpPackageID Ext.Msg.alert('Date Not match', Name+" "+Price+" " +Summary+" "+FullDescription+" "+ITICDescription+" "+TecDescription+" "+ndate+" obcvbcvbv");
								if(EOLdate<ndate){
									Ext.Msg.alert('Date Not match', 'Invalide date For EOD!');
								}
								else{
									
									var date = new Date(edate),
							        mnth = ("0" + (date.getMonth()+1)).slice(-2),
							        day  = ("0" + date.getDate()).slice(-2);
									var EOLdate=[ date.getFullYear(), mnth, day ].join("-");
									
									var row=null;
									var store=null;
									
									var form = Ext.getCmp('UpPackage').getForm();
							         if(form.isValid()){
										store = Ext.getStore('PackageStore');
										store.proxy.extraParams.purpose = 'Update';
										JsonObject= {ID:ID,PackageName:Name,Summery: Summery,Full_Descrip:FullDescription,ITIC_Descrip:ITICDescription,Tec_Descrip:TecDescription,EOLDate:EOLdate};
										row= Ext.create('New.model.PackageModel', JsonObject);
										store.insert(0, row);
										
										
										var grid = Ext.getCmp('gridPackageView');
										var store = grid.getStore('PackageStoreGrid');
										store.proxy.extraParams.purpose='Grid';
										store.load();
										win.close();
							         }
							         else{
							        	 Ext.Msg.alert('Error', 'Plese Fill all the feied brfor saving !');
							         }
									//Ext.Msg.alert('Sucsess', 'Sucsess !');
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
	}
],

	initComponent : function() {
		this.callParent(arguments);
	}
});