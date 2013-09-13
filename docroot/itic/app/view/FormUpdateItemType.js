var Aslevel = Ext.create('Ext.data.Store', {
    fields: ['Level','name'],
    data : [
        {"Level":"0", "name":"Base Items"},
        {"Level":"1", "name":"Equipment"}

    ]
});


Ext.define('New.view.FormUpdateItemType', {
	extend : 'Ext.form.Panel',
	alias : 'widget.UpdateItemType',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'UpdateItemType',
	name : 'UpdateItemType',
	
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [  {
			xtype : 'textfield',
			fieldLabel : 'Item Type Name',
			id : 'txtUItemID',
			name : 'txtUItemID',
			allowBlank : false,
			msgTarget: 'side',
			width : 400
		},{
			xtype : 'textfield',
			fieldLabel : 'Item Type Name',
			id : 'txtUItemName',
			name : 'txtUItemName',
			allowBlank : false,
			msgTarget: 'side',
			width : 400
		}, {
			xtype : 'combobox',
			fieldLabel : 'Access level',
			id : 'cmbUAsLvlLevel',
			name : 'cmbUAsLvlLevel',
			valueField : 'Level',
			displayField:'name',
			selectOnTab : true,
			allowBlank : false,
			width : 400,
			msgTarget: 'side',
			editable:false,
			store : Aslevel
		}
	]
	
	}],

	buttons: [
	],

	initComponent : function() {
		this.callParent(arguments);
		var grid = Ext.getCmp('GridItemTypeView');
		var sm = grid.getSelectionModel();
		var val = sm.getSelection();

		var name = val[0].get('TypeName');
		var userlevel = val[0].get('AccsessLevel');
		var ID=val[0].get('ID');
		
		Ext.getCmp('txtUItemName').setValue(name);
		Ext.getCmp('cmbUAsLvlLevel').setValue(userlevel);
		Ext.getCmp('txtUItemID').setValue(ID);
		Ext.getCmp('txtUItemID').setVisible(false);
	}
});
