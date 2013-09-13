var Aslevel = Ext.create('Ext.data.Store', {
    fields: ['Level','name'],
    data : [
        {"Level":"0", "name":"Base Items"},
        {"Level":"1", "name":"Equipment"}

    ]
});


Ext.define('New.view.FormAddItemTypeView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.AddItemType',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'AddItemType',
	name : 'AddItemType',
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [ {
			xtype : 'textfield',
			fieldLabel : 'Item Type Name',
			id : 'txtItemName',
			name : 'txtItemName',
			allowBlank : false,
			msgTarget: 'side',
			width : 400
		}, {
			xtype : 'combobox',
			fieldLabel : 'Access level',
			id : 'cmbAsLvlLevel',
			name : 'cmbAsLvlLevel',
			valueField : 'Level',
			displayField:'name',
			selectOnTab : true,
			allowBlank : false,
			msgTarget: 'side',
			width : 400,
			editable:false,
			store : Aslevel
		}
	]
	
	}],

	buttons: [],

	initComponent : function() {
		this.callParent(arguments);
	}
});
