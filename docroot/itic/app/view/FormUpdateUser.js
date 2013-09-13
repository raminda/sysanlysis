var Ulevel = Ext.create('Ext.data.Store', {
    fields: ['Level','name'],
    data : [
        {"Level":"0", "name":"Admin"},
        {"Level":"1", "name":"ITIC"},
        {"Level":"2", "name":"User"}

    ]
});
Ext.define('New.view.FormUpdateUser', {
	extend : 'Ext.form.Panel',
	alias : 'widget.UpdateUser',
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
		items : [  {
			xtype : 'textfield',
			fieldLabel : 'User Name',
			id : 'txtUpUserID',
			name : 'txtUpUserID',
			allowBlank : false,
			width : 400
		},{
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
			var ID=Ext.getCmp('txtUpUserID').getValue();
			
			var store = Ext.getStore('UserStore');
			store.proxy.extraParams.purpose = 'Update';
			JsonObject= {ID:ID,UserName:Name,UserLevel:Level};
			row= Ext.create('New.model.UserModel', JsonObject);
			store.insert(0,row);;
			
				var grid = Ext.getCmp('gridUserView');
				var store = grid.getStore('UserStoreGrid');
				store.proxy.extraParams.purpose='Grid';
				store.load();
			}
		}],
	}],
	initComponent : function() {
		this.callParent(arguments);
		
		var grid = Ext.getCmp('gridUserView');
		var sm = grid.getSelectionModel();
		var val = sm.getSelection();

		var name = val[0].get('UserName');
		var userlevel = val[0].get('UserLevel');
		var ID=val[0].get('ID');
		
		Ext.getCmp('cmbUsLevel').setValue(userlevel);
		Ext.getCmp('txtAddUserName').setValue(name);
		Ext.getCmp('txtUpUserID').setValue(ID);
		Ext.getCmp('txtUpUserID').setVisible(false);
	}
});



/* Ext.Msg.show({
title:'Save Changes?',
 msg: 'Your are closing a tab that has unsaved changes. Would you like to save your changes?',
buttons: Ext.Msg.YESNO,
fn:function showResult(btn){
		if(btn=='yes'){
		}
		else{
			Ext.Msg.alert('Sucsess', btn);
		}
		},
animEl: 'elId',

});
*/
