Ext.define('New.view.FormsView', {
		extend : 'Ext.form.Panel',
		alias  : 'widget.FormsView',
		border : false,
		frame : false,
		layout : {
			align: 'stretch', 
			type : 'fit',
			padding : 5
		},
		anchor: '100% 100%',
		id : 'FormsView',
		name : 'FormsView',
		height :900,
		items : [{
			flex : 1,
				text : 'Add Project Details',
				id : 'AddProjectDetails',
				name : 'AddProjectDetails',
				title : 'Add Projects',
				xtype : 'ProjectDetails',
				
			},{
				flex : 1,
				text : 'Project',
				id : 'AddscProjects',
				name : 'AddscProjects',
				title : 'Project ',
				xtype : 'frmProject',
			},/*{
				text : 'Package Add',
				id : 'PackageAdd',
				name : 'PackageAdd',
				title : 'Package Add',
				xtype : 'PackageAdd'
			},*/
			
			],

			initComponent : function() {
				this.callParent(arguments);
				Ext.getCmp('AddProjectDetails').setVisible(false);
				Ext.getCmp('AddscProjects').setVisible(false);
			}
		});