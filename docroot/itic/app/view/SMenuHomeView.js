Ext.define('New.view.SMenuHomeView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.HomeType',
	title : 'Home',
	layout : 'fit',
	anchor: '100% 100%',
	frame : false,
	border : false,
	bodyPadding : 0,
	items : [ {
		xtype : 'panel',
		bodyPadding : 15,
		items : [{
			xtype : 'button',
			text : 'Projects',
			width : 200,
			handler : function() {
				Ext.getCmp('AddProjectDetails').setVisible(true);
				Ext.getCmp('FormsBody').setVisible(true);
				var form = Ext.getCmp('AddProjectDetails').getForm();
	        	form.reset(true);
	        	Ext.getCmp('gridProjectoutView').setVisible(false);
	        	Ext.getCmp('ProjectDetailspanel').setVisible(false);
	        	
				Ext.getCmp('GridBody').setVisible(false);
				Ext.getCmp('MBody').setVisible(false);
				
				Ext.getCmp('AddscProjects').setVisible(false);
				Ext.getCmp('EquipmentBulkDD').setVisible(false);
			}
		}]		         
	} ],

	initComponent : function() {
		this.callParent(arguments);
	}
});
