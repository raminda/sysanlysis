Ext.define('New.view.SlideMenuPanelsView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.Showpanel',
	border : false,
	frame : true,
	layout : {
		type : 'fit',
		padding : 5
	},
	height:780,
	lbar :[{
			text : 'Home',
			id : 'HomePanel',
			name : 'HomePanel',
			iconCls : 'homeIcon',
			textAlign : 'left',
			xtype :'HomeType',	
		},{	
			text : 'Project',
			id : 'ProjectPanel',
			name : 'ProjectPanel',
			iconCls : 'ProjectIcon',
			textAlign : 'left',
			xtype :'ProjectType',
		},{
			text : 'Stores',
			id : 'StoresPanel',
			name : 'StoresPanel',
			iconCls : 'StoresIcon',
			textAlign : 'left',
			xtype :'StoreType',
		},{
			text : 'Reports',
			id : 'ReportsPanel',
			name : 'ReportsPanel',
			iconCls : 'ReportIcon',
			textAlign : 'left',
			xtype :'ReportType',
		}],
	initComponent : function() {
		
		this.callParent(arguments);
		
		Ext.getCmp('HomePanel').setVisible(true);
		Ext.getCmp('ProjectPanel').setVisible(false);
		Ext.getCmp('StoresPanel').setVisible(false);
		Ext.getCmp('ReportsPanel').setVisible(false);
		
		
	}
});

Ext.onReady(function(){
	Ext.Ajax.request({
		url : validate_url,
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		params : {
			'type' : 'unique',
			'context' : 'task&group',
			'purpose' : 'add',
		},
		jsonData : {},
		success : function(response) {
			//if success   Base_Equipments  _Equipments  Item_Types
			if(!response.responseText.match(/*.0.*/)){
				Ext.getCmp('Base_Equipments').disable(true);	
				Ext.getCmp('_Equipments').disable(true);	
				Ext.getCmp('Item_Types').disable(true);	
				Ext.Msg.alert('Message', response.responseText);
			}
		},
		failure : function(response) {											
		}
	});
	
});