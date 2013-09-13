Ext.define('New.view.SMenuAccountView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.AccountType',
	title : 'Account Menu',
	layout : 'fit',
	anchor: '90% 100%',
	frame : false,
	border : false,
	bodyPadding : 0,
	items : [ {
		xtype : 'panel',
		bodyPadding : 15,
		items : [{
			xtype : 'button',
			text : 'Update My Details',
			width : 200,
			handler : function() {
				Ext.getCmp('AddProjectDetails').setVisible(false);
				Ext.Msg.alert('Message', 'Under Construction!');
			}
		},{
			xtype : 'button',
			text : 'Add new User',
			width : 200,
			handler : function() {
				//UserGrid
				var grid = Ext.getCmp('gridUserView');
				var store = grid.getStore('UserStoreGrid');
				store.proxy.extraParams.purpose='Grid';
				store.load();
				
				Ext.getCmp('UserGrid').setVisible(true);
				Ext.getCmp('GridBody').setVisible(true);
				
				Ext.getCmp('MBody').setVisible(false);				
				Ext.getCmp('FormsBody').setVisible(false);
				
				Ext.getCmp('ItemTypeGrid').setVisible(false);				
				Ext.getCmp('AddProjectDetails').setVisible(false);
				Ext.getCmp('EquipmentGrid').setVisible(false);
				Ext.getCmp('PackageGrid').setVisible(false);
				Ext.getCmp('AddProjectDetails').setVisible(false);
			}
		}]		         
	} ],

	initComponent : function() {
		this.callParent(arguments);
	}
});
