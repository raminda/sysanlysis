Ext.define('New.view.FormAddEquipmentView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.AddEquiment',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'AddEquiment',
	name : 'AddEquiment',
	
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [{
			xtype : 'textfield',
			fieldLabel : 'Equiment Name',
			id : 'txtEquipmentName',
			name : 'txtEquipmentName',
			allowBlank : false,
			msgTarget: 'side',
			width : 400
		}, {
			xtype : 'combobox',
			fieldLabel : 'Item Type',
			id : 'cmbEqItemType',
			name : 'cmbEqItemType',
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
    	
        			if(Ext.getCmp('cmbEqItemType').getValue()==null){
        				Ext.getCmp('cmbEqSupport').disable(true);
        			}
        			else{
        				Ext.getCmp('cmbEqSupport').enable(true);
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
			id : 'cmbEqSupport',
			name : 'cmbEqSupport',
			valueField : 'ItemName',
			displayField:'ItemName',
			selectOnTab : true,
			allowBlank : false,
			msgTarget: 'side',
			width : 400,
			editable:false,
			multiSelect:true,
			store : 'EquipmentStoreComp',
			listeners: {
        			focus:function( me, The, eOpts ){
        				var store = Ext.getStore('EquipmentStoreComp');
        				if(Ext.getCmp('cmbEqItemType').getValue()!=null){
            				
            				store.proxy.extraParams.purpose = 'Combo';
            				store.proxy.extraParams.value="1";	
            				store.proxy.extraParams.ID=Ext.getCmp('cmbEqItemType').getValue();
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
			id : 'txtEqPrice',
			fieldLabel : 'Item Price',
			width : 400,
			msgTarget: 'side',
			height : 60,
			allowNegative: false,
			allowDecimals: false,
			minValue: 0,
			emptyText : '$'
		},{
			xtype : 'textarea',
			id : 'txtEqSummery',
			fieldLabel : 'Summery',
			width : 400,
			allowBlank : false,
			height : 60,
			emptyText : 'txtSummery Here'
		},{
			xtype : 'textarea',
			id : 'txtEqFullDescription',
			fieldLabel : 'Full Description',
			width : 400,
			height : 60,
			emptyText : 'Description Here'
		}, {
			xtype : 'textarea',
			id : 'txtEqITICDescription',
			fieldLabel : 'ITIC Description',
			width : 400,
			height : 60,
			emptyText : 'ITIC Description Here'
		},{
			xtype : 'textarea',
			id : 'txtEqTecDescription',
			fieldLabel : 'Technical Description',
			width : 400,
			height : 60,
			emptyText : 'Technical Description Here'
		},{
			msgTarget: 'side',
			xtype : 'datefield',
			id : 'txtEqEOD',
			fieldLabel : 'End Of Life Date',
			width : 400,
			height : 60,
			selectOnTab : true,
			minValue:new Date(),
			format:"d/M/Y"
		
		}
	]
	
	}],

	buttons: [],

	initComponent : function() {
		this.callParent(arguments);
		Ext.getCmp('cmbEqSupport').disable(true);
	}
});
