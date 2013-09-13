Ext.define('New.view.SMenuProjectView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ProjectType',
	title : 'Project Menu',
	layout : 'fit',
	anchor: '100% 100%',
	frame : false,
	border : true,
	bodyPadding : 0,
	items : [ {
		xtype : 'panel',
		bodyPadding : 15,
		border : false,
		items : [{
			xtype : 'button',
			text : 'Configure Equipment',
			width : 200,
			handler : function() {
				
				//var grid = Ext.getCmp('gridEquipmentView');
				var store = Ext.getStore('EquipmentsBulkStoreGrid');
				store.proxy.extraParams.purpose='null';
				store.load();
				var store = Ext.getStore('EquipmentStoreGrid');
				store.proxy.extraParams.purpose='null';
				store.load();
				Ext.getCmp('gridProjectoutView').setVisible(false);
	        	Ext.getCmp('ProjectDetailspanel').setVisible(false);
	        	
				Ext.getCmp('EquipmentBulkDD').setVisible(true);
				
				
				Ext.getCmp('GridBody').setVisible(true);				
				Ext.getCmp('MBody').setVisible(false);	
				Ext.getCmp('FormsBody').setVisible(false);
				Ext.getCmp('AddProjectDetails').setVisible(false);	
				
			}//
		},{
			xtype : 'button',
			text : 'Projects',
			width : 200,
			handler : function() {
				Ext.getCmp('AddProjectDetails').setVisible(true);
				Ext.getCmp('FormsBody').setVisible(true);
				var form = Ext.getCmp('AddProjectDetails').getForm();
	        	form.reset(true);
				Ext.getCmp('AddscProjects').setVisible(false);
				Ext.getCmp('MBody').setVisible(false);
				Ext.getCmp('GridBody').setVisible(false);
				
				Ext.getCmp('EquipmentBulkDD').setVisible(false);
			}
		},{
			xtype : 'button',
			text : 'Clients',
			width : 200,
			handler : function() {
			
				var grid = Ext.getCmp('gridProjectView');
				var store = grid.getStore('ProjectsStoreGrid');
				store.proxy.extraParams.purpose='Grid';
				store.load();
				
				Ext.getCmp('ProjectGrid').setVisible(true);
				Ext.getCmp('GridBody').setVisible(true);
				
				
				Ext.getCmp('FormsBody').setVisible(false);				
				Ext.getCmp('MBody').setVisible(false);
				
				Ext.getCmp('EquipmentGrid').setVisible(false);
				Ext.getCmp('ItemTypeGrid').setVisible(false);
				Ext.getCmp('PackageGrid').setVisible(false);
				Ext.getCmp('EquipmentBulkDD').setVisible(false);
				Ext.getCmp('AddProjectDetails').setVisible(false);
			}
		},{
			xtype : 'button',
			text : 'Generate Project To Excel',
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
		}]	         
	}],

	initComponent : function() {
		this.callParent(arguments);
		
	}
});
