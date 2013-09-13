Ext.require(['*']); 

//define row model
var myrow=Ext.define('myrow', {
	extend:'Ext.selection.RowModel',
	singleSelect : true,
});


var formPanel = Ext.define('formPanel', {
	extend:'Ext.form.Panel',
    alias : 'widget.fdd',
    title      : 'Package Bulk',
    height :350,
    bodyStyle  : 'padding: 10px; background-color: #DFE8F6',
    margins    : '0 0 0 3',
    items      : [{
    	fieldLabel: 'Pacakge Name',
    	xtype : 'combobox',
		id : 'cmbDDPackage',
		name : 'cmbDDPackage',
		valueField : 'PackageName',
		displayField:'PackageName',
		selectOnTab : true,
		allowBlank : false,
		editable:false,
		store : 'PackageStoreGrid',
        width : 350,
        flex: 1,
        layout: {
            type: 'absolute'
        },
        listeners: {
        	change: function(){
				if(Ext.getCmp('cmbDDPackage').getValue()!=null){
					Ext.getCmp('cmbBsItem').enable(true);
									
					Ext.getCmp('txtBsItemName').enable(true);
		        	Ext.getCmp('txtBsItemType').enable(true);
		        	Ext.getCmp('txtBsItemPrice').enable(true);
		        	Ext.getCmp('txtBsItemQuntity').enable(true);
		        	Ext.getCmp('cmbBsItemType').enable(true);
		        	Ext.getCmp('cmbBsItem').reset();
		        	Ext.getCmp('btnbulkReset').enable(true);
		        	
				}
        	},
            focus:function( me, The, eOpts ){
            	var store = Ext.getStore('PackageStoreGrid');
				store.proxy.extraParams.purpose = 'Grid';
				store.load();
            }
    	}
    },{
		
		xtype : 'combobox',
		fieldLabel : 'Base Item Name',
		id : 'cmbBsItem',
		name : 'cmbBsItem',
		valueField : 'ItemName',
		displayField:'ItemName',
		selectOnTab : true,
		allowBlank : false,
		width : 350,
		editable:false,
		store : 'GridStringStore',
		flex: 1,
		listeners: {
			change: function(){
				if(Ext.getCmp('cmbBsItem').getValue()!=null){
					
					Ext.getCmp('txtBsItemName').reset();
		        	Ext.getCmp('txtBsItemType').reset();
		        	Ext.getCmp('txtBsItemPrice').reset();
		        	Ext.getCmp('txtBsItemQuntity').reset();
		        	
		        	
		        	
		        	var grid = Ext.getCmp('gridEquipmentsBulkView');
					var store=grid.getStore('EquipmentsBulkStoreGrid');
					store.proxy.extraParams.purpose = 'Combo';
					store.proxy.extraParams.ID="2";
					store.proxy.extraParams.value=Ext.getCmp('cmbDDPackage').getValue();
					store.load();
				}
        	},
        	focus:function( me, The, eOpts ){
        		var store = Ext.getStore('GridStringStore');
				if(Ext.getCmp('cmbDDPackage').getValue()!=null){
					store.proxy.extraParams.purpose = 'Combo';
					store.proxy.extraParams.ID="1";
					store.proxy.extraParams.value=Ext.getCmp('cmbDDPackage').getValue();
    			}
    			else{
    				store.proxy.extraParams.purpose = 'Null';
    			}
    			store.load();
        	}
    	}
		
	},{
		
		xtype : 'combobox',
		fieldLabel : 'Item Type',
		id : 'cmbBsItemType',
		name : 'cmbBsItemType',
		valueField : 'ID',
		displayField:'TypeName',
		selectOnTab : true,
		allowBlank : false,
		width : 350,
		editable:false,
		store : 'ItemTypeStore',
		flex: 1,
		listeners: {
			
			change: function(){
				if(Ext.getCmp('cmbBsItemType').getValue()!=null){
					var grid = Ext.getCmp('formgridPanel');
					var store=grid.getStore('EquipmentStoreGrid');
					store.proxy.extraParams.purpose = 'Combo';
					store.proxy.extraParams.value="3";
					store.proxy.extraParams.ID=Ext.getCmp('cmbBsItemType').getValue();
					store.proxy.extraParams.ID2=Ext.getCmp('cmbBsItem').getValue();
					store.load();
					
					Ext.getCmp('formgridPanel').enable(true);
					
					Ext.getCmp('txtBsItemName').reset(true);
		        	Ext.getCmp('txtBsItemType').reset(true);
		        	Ext.getCmp('txtBsItemPrice').reset(true);
		        	Ext.getCmp('txtBsItemQuntity').reset(true);
				}
				else{
					var grid = Ext.getCmp('formgridPanel');
					var store=grid.getStore('EquipmentStoreGrid');
					store.proxy.extraParams.purpose = 'null';
					store.load();
				}
        	},
    			focus:function( me, The, eOpts ){
    				var store = Ext.getStore('ItemTypeStore');     				
    				store.proxy.extraParams.purpose = 'Combo';
					store.proxy.extraParams.ID="1";
        			store.load();
                }
    	}
		
	},{
			xtype : 'textfield',
	    	fieldLabel : 'Item Name',
	        name       : 'ItemName',
	        id : 'txtBsItemName',
	        width : 350,
	 
	    	},{
			xtype : 'textfield',
			fieldLabel : 'Item Type',
			name       : 'ItemType',
			id : 'txtBsItemType',
			width : 350,
	
	    	},{
			xtype : 'numberfield',
			fieldLabel : 'Equipment Price',
			name       : 'Price',
			id : 'txtBsItemPrice',
			allowNegative: false,
			allowDecimals: false,
			minValue: 0,
			width : 350,
		
			},{
			xtype : 'numberfield',
			fieldLabel : 'Quntity ',
			name       : 'Quntity',
			id : 'txtBsItemQuntity',
			defaultValue:'1',
			allowNegative: false,
			allowDecimals: false,
			minValue: 0,
			width : 350,
			
			}],
    	/*}]*/
	});

	var grid = Ext.define('grid', {
		extend:'Ext.grid.Panel',
		alias : 'widget.DD',
		store   :'EquipmentStoreGrid',
		overflowX : 'auto',
		anchor: '100% 100%',
		height :350,
		scroll : true,
		columnLines : true,
		viewConfig: {
	        plugins: {
	            ddGroup: 'GridExample',
	            ptype: 'gridviewdragdrop',
	            enableDrop: false,
	        }
	    },
	    columns:[{
			header : 'Equipment Name',
			dataIndex : 'ItemName',
			flex: 2,
		  },{
		  	flex: 2,
			header : ' Price',
			dataIndex : 'Price',
	
		  },{
			  flex: 3,
				header : ' Summary',
				dataIndex : 'Summary',  
		  }],
	    enableDragDrop   : true,
	    stripeRows       : true,
	    margins          : '0 2 0 0',
	    region           : 'west',
	    title            : 'Bulk',
	    selModel         : 'myrow',

	});

	//main form panel for Equipment Bulk Drag and Drop form
Ext.define('New.view.FormAddBulkDdView', {
	extend : 'Ext.Panel',
		alias : 'widget.EquipmentBulkDD',   
		frame : false,
		border : false,
        bodyPadding: 5,
        layout: 'hbox',
        items    : [{
				anchor: '60% 100%',
				text : 'Body',
				flex: 1,
				id : 'formPanel',
				name : 'formPanel',
				iconCls : 'Icon',
				textAlign : 'left',
				xtype : 'fdd',
			},{
        		xtype: 'splitter'
            },{
        		anchor: '40% 100%',
				text : 'grid',
				flex: 1,
				id : 'formgridPanel',
				name : 'formgridPanel',
				iconCls : 'Icon',
				textAlign : 'left',
				xtype : 'DD',
			}],
			
			bbar : [ {
		        	flex: 1,
			  		text : 'Save',
			  		width: 200,
			  		height: 30,
			  		id : 'btnbulkOK',
			  		handler : function() {
			  			//EquipmentsBulkStore
			  			var PackageID = Ext.getCmp('cmbDDPackage').getValue();
			  			var Itemname = Ext.getCmp('txtBsItemName').getValue();
			  			var Price = Ext.getCmp('txtBsItemPrice').getValue();
			  			var Quntity=Ext.getCmp('txtBsItemQuntity').getValue();
			  			var cmbBsItem=Ext.getCmp('cmbBsItem').getValue();
			  			
			  			if(PackageID==""||Itemname==""||Price==""){
			  				Ext.Msg.alert('Message', 'Drag and drop Suitabale Equipment befor Saving');				
			  			}
			  			else if(Quntity<1){
			  				Ext.Msg.alert('Message', 'Entet Quntitiy Befor Saving Package item!');
			  			}
			  			else{
			     				var store = Ext.getStore('EquipmentsBulkStore');
			     				store.proxy.extraParams.purpose = 'New';
			     				store.proxy.extraParams.value=cmbBsItem;
			     				var JsonObject= {PackageID:PackageID,ItemID:Itemname,Quantity: Quntity,Price:Price};
			     				var row= Ext.create('New.model.EquipmentsBulkModel', JsonObject);
			     				store.insert(0, row);
			     				
			     				
			     				Ext.getCmp('txtBsItemName').reset(true);
			     	        	Ext.getCmp('txtBsItemType').reset(true);
			     	        	Ext.getCmp('txtBsItemPrice').reset(true);
			     	        	Ext.getCmp('txtBsItemQuntity').reset(true);
			     	        	
			     	        	var grid = Ext.getCmp('gridEquipmentsBulkView');
								var store=grid.getStore('EquipmentsBulkStoreGrid');
								store.proxy.extraParams.purpose = 'Combo';
								store.proxy.extraParams.ID="2";
								store.proxy.extraParams.value=Ext.getCmp('cmbDDPackage').getValue();
								store.load();
								Ext.getCmp('btnbulkOK').disable(true);
								Ext.getCmp('btnbulkClear').disable(true);
			     	        	
			  			}
			  		}
			  	},{
			  		flex: 1,
			  		text : 'Clear',
			  		id : 'btnbulkClear',
			  		width: 200,
			  		height: 30,
			  		handler : function() {
			  			var grid = Ext.getCmp('formgridPanel');
						var store=grid.getStore('EquipmentStoreGrid');
						store.proxy.extraParams.purpose = 'Combo';
						store.proxy.extraParams.value="3";
						store.proxy.extraParams.ID=Ext.getCmp('cmbBsItemType').getValue();
						store.proxy.extraParams.ID2=Ext.getCmp('cmbBsItem').getValue();
						store.load();
			  			
			  			Ext.getCmp('txtBsItemName').reset(true);
			          	Ext.getCmp('txtBsItemType').reset(true);
			          	Ext.getCmp('txtBsItemPrice').reset(true);
			          	Ext.getCmp('txtBsItemQuntity').reset(true);
			          	Ext.getCmp('btnbulkClear').disable(true);
			          	Ext.getCmp('btnbulkReset').enable(true);
			  		}
			  	},{
			  		flex: 1,
			          text    : 'Reset Filde',
			          width: 200,
			          height: 30,
			          id : 'btnbulkReset',
			          handler : function() {
			              //refresh source grid
			          	var grid = Ext.getCmp('formgridPanel');
			  			var store=grid.getStore('EquipmentStoreGrid');
			  			store.proxy.extraParams.purpose = 'null';
			  			store.load();
			  			
			  			var grid = Ext.getCmp('gridEquipmentsBulkView');
						var store=grid.getStore('EquipmentsBulkStoreGrid');
						store.proxy.extraParams.purpose = 'null';
						store.load();
						
			  			Ext.getCmp('formPanel').getForm().reset();
			  			Ext.getCmp('btnbulkOK').disable(true); 
			  			Ext.getCmp('btnbulkClear').disable(true);
			  			Ext.getCmp('formgridPanel').disable(true);
			  			Ext.getCmp('btnbulkReset').disable(true);
			  			Ext.getCmp('formgridPanel').disable(true);
			  			Ext.getCmp('cmbBsItem').disable(true);
			        	
			        	Ext.getCmp('txtBsItemName').disable(true);
			        	Ext.getCmp('txtBsItemType').disable(true);
			        	Ext.getCmp('txtBsItemPrice').disable(true);
			        	Ext.getCmp('txtBsItemQuntity').disable(true);
			        	Ext.getCmp('cmbBsItemType').disable(true);
			  			
			             }
			         }],
        initComponent : function() {
        	this.callParent(arguments);	 
        	Ext.getCmp('formgridPanel').disable(true);
        	Ext.getCmp('cmbDDPackage').enable(true);
        	Ext.getCmp('cmbBsItem').disable(true);
        	
        	Ext.getCmp('txtBsItemName').disable(true);
        	Ext.getCmp('txtBsItemType').disable(true);
        	Ext.getCmp('txtBsItemPrice').disable(true);
        	Ext.getCmp('txtBsItemQuntity').disable(true);
        	Ext.getCmp('cmbBsItemType').disable(true);
        	
        	Ext.getCmp('txtBsItemName').setReadOnly(true);
        	Ext.getCmp('txtBsItemType').setReadOnly(true);
        	Ext.getCmp('txtBsItemPrice').setReadOnly(true);
        	
        	Ext.getCmp('btnbulkOK').disable(true);
        	Ext.getCmp('btnbulkClear').disable(true);
        	Ext.getCmp('btnbulkReset').disable(true);
        	 
        }    
});







