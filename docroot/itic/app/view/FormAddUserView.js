var Ulevel = Ext.create('Ext.data.Store', {
    fields: ['Level','name'],
    data : [
        {"Level":"0", "name":"Admin"},
        {"Level":"1", "name":"ITIC"},
        {"Level":"2", "name":"User"}

    ]
});
Ext.define('New.view.FormAddUserView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.addUser',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'addUser',
	name : 'addUser',
	
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [ {
			xtype : 'textfield',
			fieldLabel : 'User Name',
			id : 'txtAddUserName',
			name : 'txtAddUserName',
			allowBlank : false,
			width : 400
		},{
			xtype : 'combobox',
			fieldLabel : 'User Level',
			id : 'cmbUsLevel',
			name : 'cmbUsLevel',
			valueField : 'Level',
			displayField:'name',
			selectOnTab : true,
			allowBlank : false,
			width : 400,
			editable:false,
			allowBlank:false,
			store : Ulevel
		}],

		buttons: [{
		xtype : 'button',
		id:'mysaving',
		text : 'Save',
		width : 150,
		handler : function() {

			var Name = Ext.getCmp('txtAddUserName').getValue();
			var Level = Ext.getCmp('cmbUsLevel').getValue();
			
			var store = Ext.getStore('UserStore');
			store.proxy.extraParams.purpose = 'New';
			JsonObject= {UserName:Name,UserLevel:Level};
			row= Ext.create('New.model.UserModel', JsonObject);
			store.insert(0,row);
				
			var grid = Ext.getCmp('gridUserView');
			var store = grid.getStore('UserStoreGrid');
			store.proxy.extraParams.purpose='Grid';
			store.load();
			Ext.getCmp('txtAddUserName').reset();
			Ext.getCmp('cmbUsLevel').reset();
			}
		}],
	}],
	initComponent : function() {
		this.callParent(arguments);
			
		
	}
});
