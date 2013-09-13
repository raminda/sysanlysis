Ext.define('New.view.FormAddPackageView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.AddPackage',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'AddPackage',
	name : 'AddPackage',
	
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [{
				xtype : 'textfield',
				fieldLabel : 'Package Name',
				id : 'txtPackageName',
				name : 'txtPackageName',
				allowBlank : false,
				msgTarget: 'side',
				width : 400
			},{
				xtype : 'combobox',
				fieldLabel : 'Base Item Name',
				id : 'cmbItemss',
				name : 'cmbItemss',
				valueField : 'ItemName',
				displayField:'ItemName',
				selectOnTab : true,
				allowBlank : false,
				width : 400,
				editable:false,
				store : 'EquipmentStoreComp',
				listeners: {
					focus:function( me, The, eOpts ){
						var store = Ext.getStore('EquipmentStoreComp');
						store.proxy.extraParams.purpose = 'Combo';
						store.proxy.extraParams.value="2";	
		    			store.load();
		            }
		    	}
				
			},{
				xtype : 'textarea',
				id : 'txtPkgSummery',
				name : 'txtPkgSummery',
				fieldLabel : 'Summery',
				allowBlank : false,
				msgTarget: 'side',
				width : 400,
				height : 60,
				emptyText : 'txtSummery Here'
			},{
				xtype : 'textarea',
				id : 'txtPkgFullDescription',
				name : 'txtPkgFullDescription',
				fieldLabel : 'Full Description',
				width : 400,
				height : 60,
				emptyText : 'Description Here'
			}, {
				xtype : 'textarea',
				id : 'txtpkgITICDescription',
				name : 'txtpkgITICDescription',
				fieldLabel : 'ITIC Description',
				width : 400,
				height : 60,
				emptyText : 'ITIC Description Here'
			},{
				xtype : 'textarea',
				id : 'txtpkgTecDescription',
				name : 'txtpkgTecDescription',
				fieldLabel : 'Technical Description',
				width : 400,
				height : 60,
				emptyText : 'Technical Description Here'
			},{
				xtype : 'datefield',
				id : 'txtPkgEOD',
				name : 'txtPkgEOD',
				fieldLabel : 'End Of Life Date',
				width : 400,
				height : 60,
				selectOnTab : true,
				msgTarget: 'side',
				minValue:new Date(),
				format:"d/M/Y"
			
			}],
	}],
	initComponent : function() {
		this.callParent(arguments);
	}
});
