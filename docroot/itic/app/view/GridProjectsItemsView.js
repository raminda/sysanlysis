Ext.define('New.view.GridProjectsItemsView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ProjectsItemsGrids',
	title : 'Projects Items View',
	height :400,
	frame : false,
	border : false,
	bodyPadding : 0,
	items : [ {
		xtype : 'panel',
		border : false,
		items : [
         {
		xtype : 'gridpanel',
		scroll : true,
		border : false,
		columnLines : true,
		id : 'ProjectItemsResultGrid',
		name : 'ProjectItemsResultGrid',
		store : 'ProjectItemsStoreResult',
		overflowX : 'auto',
		columns :[/* {
			header : 'Project Items ID',
			dataIndex : 'ID',	
	
		  }, */{
			  flex : 1,
			id : 'ProjectItemsResultGridProjectID',
			name : 'ProjectItemsResultGridProjectID',
			header : 'Project ID',
			dataIndex : 'ProjectID',
	
		  }, {
			  flex : 1,
			  id : 'ProjectItemsResultGridOptionID',
				name : 'ProjectItemsResultGridOptionID',
			header : 'Option ID',
			dataIndex : 'OptionID',
	
		  }, {
			  id : 'ProjectItemsResultGridVersionID',
				name : 'ProjectItemsResultGridVersionID',
				flex : 1,
				header : 'Version ID',
			dataIndex : 'VersionID',	
	
		  }, {
			  flex : 1,
			  id : 'ProjectItemsResultGridSiteID',
				name : 'ProjectItemsResultGridSiteID',
			header : 'SiteID',
			dataIndex : 'SiteID',
	
		  },{
			  flex : 1,
			  id : 'ProjectItemsResultGridPackageID',
				name : 'ProjectItemsResultGridPackageID',
			header : 'Package ID',
			dataIndex : 'PackageID',
	
		  },{
			  flex : 1,
			  id : 'ProjectItemsResultGridQuantity',
				name : 'ProjectItemsResultGridQuantity',
			header : 'Quantity',
			dataIndex : 'Quantity',
	//
		  },{
			  flex : 1,
			  id : 'ProjectItemsResultGridPcakageUsege',
				name : 'ProjectItemsResultGridPcakageUsege',
			header : 'Usage',
			dataIndex : 'PcakageUsege',
		
		  },{
			  flex : 1,
			  id : 'ProjectItemsResultGridPackageType',
				name : 'ProjectItemsResultGridPackageType',
			header : 'Package Type',
			dataIndex : 'PackageType',				
		  },{
			  flex : 1,
			  id : 'ProjectItemsResultGridPrice',
				name : 'ProjectItemsResultGridPrice',
			header : 'Price',
			dataIndex : 'Price',
	
		  },{
			  flex : 1,
			  id : 'ProjectItemsResultGriddate_modified',
				name : 'ProjectItemsResultGriddate_modified',
			header : 'Date modified',
			dataIndex : 'date_modified',
	
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
							xtype : 'GenerateExcel'
						} ],

						buttons : []
					});

					win.show();
					var grid = Ext.getCmp('ProjectItemsResultGrid');
					var sm = grid.getSelectionModel();
					var val = sm.getSelection();
					
					var ProjectID = val[0].get('ProjectID');
					var OptionID = val[0].get('OptionID');
					var VersionID=val[0].get('VersionID');
					
					var store = Ext.getStore('my');
	            	store.proxy.extraParams.purpose="ExcelCreate";
	        		store.proxy.extraParams.ID1=ProjectID;
					store.proxy.extraParams.ID2=OptionID;
					store.proxy.extraParams.ID3=VersionID;
					store.load();
				}
			}
			}]
		}
	],
	tbar : [{
        xtype: 'button',
        text : 'Add Package',
        width : 100,
        flex: 1,
        handler : function() {
			var win=null;
			win= Ext.create('Ext.window.Window', {
			title : 'Add Package',
			width : 500,
			height : 450,
			minWidth : 300,
			minHeight : 200,
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
					//var Price = Ext.getCmp('txtPkgPrice').getValue();
					var Summary=Ext.getCmp('txtPkgSummery').getValue();
					var FullDescription = Ext.getCmp('txtPkgFullDescription').getValue();
					var ITICDescription = Ext.getCmp('txtpkgITICDescription').getValue();
					var TecDescription = Ext.getCmp('txtpkgTecDescription').getValue();
					var edate= Ext.getCmp('txtPkgEOD').getValue();
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
						
						store = Ext.getStore('PackageStore');
						store.proxy.extraParams.purpose = 'New';
						JsonObject= {PackageName:Name,Summery: Summary,Full_Descrip:FullDescription,ITIC_Descrip:ITICDescription,Tec_Descrip:TecDescription,Price:0,EOLDate:EOLdate};
						row= Ext.create('New.model.PackageModel', JsonObject);
						store.insert(0, row);
						
						Ext.getCmp('txtPackageName').reset();
						//Ext.getCmp('txtPkgPrice').reset();
						Ext.getCmp('txtPkgSummery').reset();
						Ext.getCmp('txtPkgFullDescription').reset();
						Ext.getCmp('txtpkgITICDescription').reset();
						Ext.getCmp('txtpkgTecDescription').reset();
						Ext.getCmp('txtPkgEOD').reset();
						
						var grid = Ext.getCmp('gridPackageView');
						var store = grid.getStore('PackageStoreGrid');
						store.proxy.extraParams.purpose='Grid';
						store.load();
						Ext.Msg.alert('Sucsess', 'Sucsess !');
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
    },{
        xtype: 'button',
        text : 'Add New Company',
        width : 100,
        flex: 1,
        handler : function() {
			var win=null;
			win= Ext.create('Ext.window.Window', {
				title : 'Add New Project',
				width : 500,
				height : 250,
				minWidth : 300,
				minHeight : 200,
				layout : 'fit',
				plain : true,
				
				items : [{
					xtype : 'AddProjects',
				}],
				buttons: [{
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
    },{
        xtype: 'button',
        text : 'Copy Version',
        width : 100,
        flex: 1,
        handler : function() {
			var win=null;
			win= Ext.create('Ext.window.Window', {
			title : 'Copy Version',
			width : 500,
			height : 350,
			minWidth : 300,
			minHeight : 200,
			layout : 'fit',
			plain : true,
			items : [{    				
				xtype : 'CopyVersion',
				}],
				buttons : [{
					xtype : 'button',
					text : 'Copy',
					id : 'btnSaveproject',
					name : 'btnSaveproject',
					width : 150,
					handler : function() {
					
						var  OOptionName  = Ext.getCmp('cmbCpOpPrjOption').getValue();
						var OProjectName = Ext.getCmp('cmbCpOpPrjProject').getValue();
						var OCompanyName= Ext.getCmp('cmbCpOpPrjCompany').getValue();
						var OVersion =Ext.getCmp('cmbCpOpVersion').disable(true);
						//var CompanyName = Ext.getCmp('cmbOrOpPrjCompany').getValue();
						var ProjectName = Ext.getCmp('cmbOrOpPrjProject').getValue();
						var OptionName = Ext.getCmp('cmbOrOpPrjOption').getValue();
						var Version = Ext.getCmp('cmbOrOpVersion').getValue();
   						
						var row=null;
						var store=null;
						
						var form = Ext.getCmp('CopyVersion').getForm();
						if(form.isValid()){
							store = Ext.getStore('ProjectItemsStore');
							store.proxy.extraParams.purpose = 'Copy';
							store.proxy.extraParams.value="{[CompanyName :'"+OCompanyName+"',ProjectName : '"+OProjectName+"',OptionName :'"+OOptionName+"',Version : '"+OVersion+"']}";
							store.proxy.extraParams.ID='Version';
							JsonObject= {ProjectID:ProjectName,OptionID :OptionName,VersionID:Version};
							row= Ext.create('New.model.ProjectItemsModel', JsonObject);
							store.insert(0, row);
							
							win.close();
						}
						else{
							Ext.Msg.alert('Message', 'Plese Enter All fields Befor Save!');
						}
					}
				},{
					 flex: 1,
					text : 'Reset',
					width : 150,
					handler : function() {
						Ext.getCmp('cmbCpOpPrjCompany').reset();
						Ext.getCmp('cmbCpOpPrjCompany').enable(true);
						
						Ext.getCmp('cmbCpOpPrjOption').reset();
						Ext.getCmp('cmbCpOpPrjProject').reset();
						Ext.getCmp('cmbOrOpPrjCompany').reset();
						Ext.getCmp('cmbOrOpPrjProject').reset();
   						Ext.getCmp('cmbOrOpPrjOption').reset();	
   						Ext.getCmp('cmbOrOpVersion').reset();	
   						Ext.getCmp('cmbCpOpVersion').reset();	
						
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
    },{
		text : 'Remove Project Items',
		iconCls : 'remove',
		handler : function(){
			var grid = Ext.getCmp('ProjectItemsResultGrid');
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
							
				var grid = Ext.getCmp('ProjectItemsResultGrid');
				var store = grid.getStore('ProjectItemsStoreResult');
				store.proxy.extraParams.purpose = 'Combo';
	    		
        		store.proxy.extraParams.ID1=Ext.getCmp('cmbPrjProject').getValue();
				store.proxy.extraParams.ID2=Ext.getCmp('cmbPrjOption').getValue();
				store.proxy.extraParams.ID3=Ext.getCmp('cmbPrjVersion').getValue();
				store.proxy.extraParams.ID4=Ext.getCmp('cmbPrjSite').getValue();
				
				if(Ext.getCmp('cmbPrjSite').getValue()!=null)
	    			store.proxy.extraParams.value = '5';
	    		else if(Ext.getCmp('cmbPrjVersion').getValue()!=null)
	    			store.proxy.extraParams.value = '6';	
	    		else if(Ext.getCmp('cmbPrjOption').getValue()!=null)
	    			store.proxy.extraParams.value = '7';
	    		else if(Ext.getCmp('cmbPrjProject').getValue()!=null)
	    			store.proxy.extraParams.value = '8';
				
				store.load();
			}
			else{
				Ext.Msg.alert('Error ', "Plese Select one Row befor Pressing Delete");
			}

		}
			
	}],
	initComponent : function() {
		this.callParent(arguments);
		
	}
	}
);