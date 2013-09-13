Ext.define('New.view.SMenuReportView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ReportType',
	title : 'Reports Menu',
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
			text : 'Get Project',
			width : 200,
			handler : function() {
				Ext.getCmp('AddscProjects').setVisible(true);
				Ext.getCmp('FormsBody').setVisible(true);
				
				var form = Ext.getCmp('AddscProjects').getForm();
	        	form.reset(true);
				Ext.getCmp('AddProjectDetails').setVisible(false);
				Ext.getCmp('MBody').setVisible(false);
				Ext.getCmp('GridBody').setVisible(false);
				Ext.getCmp('EquipmentBulkDD').setVisible(false);
			}
		},{
			xtype : 'button',
			text : 'Get Equipments List',
			width : 200,
			handler : function() {
				
			}
		},{
			xtype : 'button',
			text : 'Get Packages List',
			width : 200,
			handler : function() {
				
			}
		},{
			xtype : 'button',
			text : 'Get Projects List',
			width : 200,
			handler : function() {
				
			}
		},{
			xtype : 'button',
			text : 'Get ItemTypes List',
			width : 200,
			handler : function() {
				
			}
		}]		         
	} ],

	initComponent : function() {
		this.callParent(arguments);
	}
});
