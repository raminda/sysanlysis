Ext.define('New.view.FormUpdateProjects', {
	extend : 'Ext.form.Panel',
	alias : 'widget.UpdateProjects',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'UpProjects',
	name : 'UpProjects',
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [{
			xtype : 'textfield',
			fieldLabel : 'Company Name',
			id : 'txtUpCompanyID',
			name : 'txtUpCompanyID',
			allowBlank : false,
			width : 400
		}, {
			xtype : 'textfield',
			fieldLabel : 'Company Name',
			id : 'txtUpCompanyName',
			name : 'txtUpCompanyName',
			allowBlank : false,
			width : 400
		},{
			xtype : 'textarea',
			id : 'txtUpProjectName',
			fieldLabel : 'Project Name',
			width : 400,
			height : 60,
			emptyText : 'Project Name Here'
		}]
	
	}],

	buttons: [],

	initComponent : function() {
		this.callParent(arguments);
		
		var grid = Ext.getCmp('gridProjectView');
		var sm = grid.getSelectionModel();
		var val = sm.getSelection();

		var name = val[0].get('Company');
		var ProjectName = val[0].get('ProjectName');
		var ID=val[0].get('ID');
		
		Ext.getCmp('txtUpCompanyName').setValue(name);
		Ext.getCmp('txtUpProjectName').setValue(ProjectName);
		Ext.getCmp('txtUpCompanyID').setValue(ID);
		Ext.getCmp('txtUpCompanyID').setVisible(false);
	}
});
