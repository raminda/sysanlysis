Ext.define('New.view.Body' , {
	extend :'Ext.panel.Panel',
	alias  : 'widget.BulkDD',
    title: 'Main Display',
    anchor: '100% 100%',
    border : false,
	frame : false,
    layout: {
        align: 'stretch',  
        padding: 0
    },
    items: [{
    	anchor: '100% 70%',
		text : 'Body',
		iconCls : 'Icon',
		textAlign : 'left',
		xtype : 'EquipmentBulkDD',
		//equipment bulk Form
		
    },{
		xtype: 'splitter'
    },{
    	anchor: '100% 30%',
    	text : 'Save',
    	iconCls : 'Icon',
		textAlign : 'left',
		xtype : 'EquipmentsBulkGrid',
		//equipment bulk Grid
		tbar : [{
			//top bar buttons
			text : 'Add New Equiment',
			iconCls : 'add',
			id : 'addEquipment_inBulkDD',
			name : 'addEquipment_inBulkDD',
			handler : function() {
				var win =null;
				//create new Window for add new equipment
				win= Ext.create('Ext.window.Window', {
					title : 'Add New Equiment',
					width : 450,
					height : 530,
					minWidth : 300,
					minHeight : 200,
					layout : 'fit',
					plain : true,
					items : [{
						xtype : 'AddEquiment',
					}],
					buttons : [{
						//save button
						text : 'Save',
						width : 150,
						handler : function() {
							var Name = Ext.getCmp('txtEquipmentName').getValue();
							var ItemType = Ext.getCmp('cmbEqItemType').getValue();
							var Price = Ext.getCmp('txtEqPrice').getValue();
							var Summary=Ext.getCmp('txtEqSummery').getValue();
							var support=Ext.getCmp('cmbEqSupport').getValue();
							var FullDescription = Ext.getCmp('txtEqFullDescription').getValue();
							var ITICDescription = Ext.getCmp('txtEqITICDescription').getValue();
							var TecDescription = Ext.getCmp('txtEqTecDescription').getValue();
							var edate= Ext.getCmp('txtEqEOD').getValue();						

							
							var Support=support.toString();
							if(Support=="This is a base Item" ||Support==""){
								Support='base';
								
							}
							//check form validity 
							 var form = Ext.getCmp('AddEquiment').getForm();
					         if(form.isValid()){
								//if form valid		
							    var date = new Date(edate),
						        mnth = ("0" + (date.getMonth()+1)).slice(-2),
						        day  = ("0" + date.getDate()).slice(-2);
							    var EOL=[ date.getFullYear(), mnth, day ].join("-"); //format date string to without GTM
							    
								var store = Ext.getStore('EquipmentStore');
								store.proxy.extraParams.purpose = 'New'; 
								//new key word is for navigating to saving in server side
								store.proxy.extraParams.ID=Support; 
								//supported items (Equipments for Equipment mapping table)
								var JsonObject= {ItemName:Name,ItemType:ItemType,Summary: Summary,Full_Descrip:FullDescription,ITIC_Descrip:ITICDescription,Tec_Descrip:TecDescription,Price:Price,EOLDate:EOL};
								var row= Ext.create('New.model.EquipmentModel', JsonObject);
								store.insert(0, row);
								
								//reset all fields
								Ext.getCmp('txtEquipmentName').reset();
								Ext.getCmp('cmbEqItemType').reset();
								Ext.getCmp('txtEqPrice').reset();
								Ext.getCmp('txtEqSummery').reset();
								Ext.getCmp('cmbEqSupport').reset();
								Ext.getCmp('txtEqFullDescription').reset();
								Ext.getCmp('txtEqITICDescription').reset();
								Ext.getCmp('txtEqTecDescription').reset();
								Ext.getCmp('txtEqEOD').reset();
								
								//refresh Grid
								var grid = Ext.getCmp('gridEquipmentView');
								var store = grid.getStore('EquipmentStoreGrid');
								store.proxy.extraParams.purpose='Grid';
								store.load();
								
								var grid = Ext.getCmp('gridEquipmentsBulkView');
								var store=grid.getStore('EquipmentsBulkStoreGrid');
								store.proxy.extraParams.purpose = 'Combo';
								store.proxy.extraParams.ID="2";
								store.proxy.extraParams.value=Ext.getCmp('cmbDDPackage').getValue();
								store.load();	
								
							}
					         else{
					        	 Ext.Msg.alert('Error', 'Plese Fill all the feied brfor saving !');
							}
								
						}
					},{
						text : 'Reset',
						width : 150,
						handler : function() {
							Ext.getCmp('txtEquipmentName').reset();
							Ext.getCmp('cmbEqItemType').reset();
							Ext.getCmp('txtEqPrice').reset();
							Ext.getCmp('txtEqSummery').reset();
							Ext.getCmp('cmbEqSupport').reset();
							Ext.getCmp('txtEqFullDescription').reset();
							Ext.getCmp('txtEqITICDescription').reset();
							Ext.getCmp('txtEqTecDescription').reset();
							Ext.getCmp('txtEqEOD').reset();
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
				text : 'Add New Package',
				iconCls : 'add',
				id : 'addPackage_inBulkDD',
				name : 'addPackage_inBulkDD',
				handler : function() {
					var win=null;
					win= Ext.create('Ext.window.Window', {
						title : 'Add New Package',
						width : 450,
						height : 480,
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
							text : 'Reset',
							width : 150,
							handler : function() {
								Ext.getCmp('txtPackageName').reset();
								Ext.getCmp('txtUpPackageName').reset();
								Ext.getCmp('txtUpPkgSummery').reset();
								Ext.getCmp('txtUpPkgFullDescription').reset();
								Ext.getCmp('txtUppkgITICDescription').reset();
								Ext.getCmp('txtUppkgTecDescription').reset();
								Ext.getCmp('txtUpPkgEOD').reset();
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
				text : 'Remove Item in Bulk',
				iconCls : 'remove',
				handler : function(){
					
					var grid = Ext.getCmp('gridEquipmentsBulkView');
					var sm = grid.getSelectionModel();
					var val = sm.getSelection();
					var store = Ext.getStore('EquipmentsBulkStoreGrid');
					
					if(val[0]!=null){
						
						store.remove(val);
						if (store.getCount() > 0) {
						sm.select(0);
						}
					
						store.proxy.extraParams.purpose = 'delete';
						store.proxy.extraParams.value = val[0].get('ID');
						store.load();
						
						var grid = Ext.getCmp('gridEquipmentsBulkView');
						var store=grid.getStore('gridEquipmentsBulkView');
						store.proxy.extraParams.purpose = 'Combo';
						store.proxy.extraParams.ID="2";
						store.proxy.extraParams.value=Ext.getCmp('cmbDDPackage').getValue();
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
					var grid = Ext.getCmp('gridEquipmentsBulkView');
					var store=grid.getStore('EquipmentsBulkStoreGrid');
					store.proxy.extraParams.purpose = 'Combo';
					store.proxy.extraParams.ID="2";
					store.proxy.extraParams.value=Ext.getCmp('cmbDDPackage').getValue();
					store.load();
			}
		} ],
    	}], 
       initComponent : function() {
			this.callParent(arguments);
       }
    });

Ext.onReady(function(){
	Ext.Ajax.request({
		url : validate_url,
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		params : {
			'type' : 'unique',
			'context' : 'task&group',
			'purpose' : 'add',
		},
		jsonData : {},
		success : function(response) {
			//if success
			if(!response.responseText.match(/*.0.*/)){
				Ext.getCmp('addEquipment_inBulkDD').disable(true);	
				Ext.getCmp('addPackage_inBulkDD').disable(true);	
				//Ext.Msg.alert('Message', response.responseText);
			}
		},
		failure : function(response) {											
		}
	});
	
});