Ext.define('New.view.FormAddProjectsView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.AddProjects',
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 0,
	id : 'AddProjects',
	name : 'AddProjects',
	
	items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
		items : [ {
			fieldLabel : 'Company Name',
        	xtype : 'combobox',
			id : 'txtCompanyName',
			name : 'txtCompanyName',
			valueField : 'Company',
			displayField:'Company',
			selectOnTab : true,
			allowBlank : false,
			editable:true,
			store : 'ProjectsStore',
            width : 400,
            flex: 1,
            layout: {
                type: 'absolute'
            },   
            listeners: {
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectsStore');
                	store.proxy.extraParams.purpose = 'Grid';
                	store.proxy.extraParams.value = '1';
                	store.load();
                },
                change:function ( me, newValue, oldValue, eOpts ){
                	Ext.getCmp('txtProjectName').reset();
                }
        	}
		},{
			xtype : 'textfield',
			id : 'txtProjectName',
			fieldLabel : 'Project Name',
			width : 400,
			height : 60,
			emptyText : 'Project Name Here'
		}]
	
	}],

	buttons: [],

	initComponent : function() {
		this.callParent(arguments);
	}
});
