Ext.define('New.view.FormUpdateEquipment', {
	extend : 'Ext.form.Panel',
	alias : 'widget.UpdateEquiment',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'UpdateEquiment',
	name : 'UpdateEquiment',
	
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [{
			xtype : 'textfield',
			fieldLabel : 'Equiment Name',
			id : 'cmbEqUpID',
			name : 'cmbEqUpID',
			allowBlank : false,
			msgTarget: 'side',
			width : 400
		},{
			xtype : 'textfield',
			fieldLabel : 'Equiment Name',
			id : 'txtEqUpEquipmentName',
			name : 'txtEqUpEquipmentName',
			allowBlank : false,
			msgTarget: 'side',
			width : 400
		}, {
			xtype : 'combobox',
			fieldLabel : 'Item Type',
			id : 'cmbEqUpItemType',
			name : 'cmbEqUpItemType',
			valueField : 'TypeName',
			displayField:'TypeName',
			selectOnTab : true,
			allowBlank : false,
			msgTarget: 'side',
			width : 400,
			editable:false,
			store : 'ItemTypeStoreGrid',   
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){                		
    	
        			if(Ext.getCmp('cmbEqUpItemType').getValue()==null){
        				Ext.getCmp('cmbEqUpSupport').disable(true);
        			}
        			else{
        				Ext.getCmp('cmbEqUpSupport').enable(true);
        			}
            	},
    			focus:function( me, The, eOpts ){
    				var store = Ext.getStore('ItemTypeStoreGrid');
    				store.proxy.extraParams.purpose = 'Grid';
        			store.load();
                }

        	}
		},{
			xtype : 'combobox',
			fieldLabel : 'Support Item Type',
			id : 'cmbEqUpSupport',
			name : 'cmbEqUpSupport',
			valueField : 'ItemName',
			displayField:'ItemName',
			selectOnTab : true,
			allowBlank : true,
			width : 400,
			editable:false,
			multiSelect:true,
			store : 'EquipmentStoreComp',
			listeners: {
    			focus:function( me, The, eOpts ){
    				var store = Ext.getStore('EquipmentStoreComp');
    				if(Ext.getCmp('cmbEqUpItemType').getValue()!=null){
        				
        				store.proxy.extraParams.purpose = 'Combo';
        				store.proxy.extraParams.value="1";	
        				store.proxy.extraParams.ID=Ext.getCmp('cmbEqUpItemType').getValue();
            			}
            			else{
            				store = Ext.getStore('EquipmentStoreComp');
            				store.proxy.extraParams.purpose = 'Null';
        				
            			}
            			store.load();
                }
			}
		},{
			xtype : 'numberfield',
			id : 'txtEqUpPrice',
			fieldLabel : 'Item Price',
			width : 400,
			allowBlank : false,
			msgTarget: 'side',
			height : 60,
			allowNegative: false,
			allowDecimals: false,
			minValue: 0,
			emptyText : '$'
		},{
			xtype : 'textarea',
			id : 'txtEqUpSummery',
			fieldLabel : 'Summery',
			width : 400,
			height : 60,
			emptyText : 'txtSummery Here'
		},{
			xtype : 'textarea',
			id : 'txtEqUpFullDescription',
			fieldLabel : 'Full Description',
			width : 400,
			height : 60,
			emptyText : 'Description Here'
		}, {
			xtype : 'textarea',
			id : 'txtEqUpITICDescription',
			fieldLabel : 'ITIC Description',
			width : 400,
			height : 60,
			emptyText : 'ITIC Description Here'
		},{
			xtype : 'textarea',
			id : 'txtEqUpTecDescription',
			fieldLabel : 'Technical Description',
			width : 400,
			height : 60,
			emptyText : 'Technical Description Here'
		},{
			xtype : 'datefield',
			id : 'txtEqUpEOD',
			fieldLabel : 'End Of Life Date',
			width : 400,
			height : 60,
			selectOnTab : true,
			allowBlank : false,
			msgTarget: 'side',
			minValue:new Date(),
			format:"d/M/Y"
		
		}
	]
	
	}],

	buttons: [],

	initComponent : function() {
		this.callParent(arguments);
		var grid = Ext.getCmp('gridEquipmentView');
		var sm = grid.getSelectionModel();
		var val = sm.getSelection();

		var ItemName = val[0].get('ItemName');
		var ID = val[0].get('ID');
		var Summary = val[0].get('Summary');
		var Full_Descrip = val[0].get('Full_Descrip');
		var ITIC_Descrip = val[0].get('ITIC_Descrip');
		var Tec_Descrip = val[0].get('Tec_Descrip');
		var EOLDates = val[0].get('EOLDate');
		var Price = val[0].get('Price');
		var ItemType = val[0].get('ItemType');
		
		var date = new Date(EOLDates),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
		var EOLDate =[ day, mnth,  date.getFullYear()].join("-");
		
		Ext.getCmp('txtEqUpEquipmentName').setValue(ItemName);
		Ext.getCmp('txtEqUpPrice').setValue(Price);
		Ext.getCmp('txtEqUpSummery').setValue(Summary);
		Ext.getCmp('txtEqUpFullDescription').setValue(Full_Descrip);
		Ext.getCmp('txtEqUpITICDescription').setValue(ITIC_Descrip);
		Ext.getCmp('txtEqUpTecDescription').setValue(Tec_Descrip);
		Ext.getCmp('txtEqUpEOD').setValue(EOLDate);
		Ext.getCmp('cmbEqUpItemType').setValue(ItemType);
		Ext.getCmp('cmbEqUpID').setValue(ID);
		Ext.getCmp('cmbEqUpID').setVisible(false);
	}
});
