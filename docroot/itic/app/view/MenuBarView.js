Ext.define('New.view.MenuBarView', {
	extend : 'Ext.form.Panel',
	alias  : 'widget.MenuBar',
	border : false,
	frame : true,
	layout : {
		align: 'center', 
		type : 'fit',
		padding : 5
	},
	
	height :50,
	//Top Menu Bars
	/**
	 * This navigate Menu by dividing in to 5 sub units like 
	 * HomePanel,Projects,Stores,Reports,Account
	 **/
	tbar : [{
		text : 'Home',
		iconCls : 'homeIcon',
		//width : 200,
		height : 30,
		flex : 1,
		textAlign : 'left',
		handler : function() {

			Ext.getCmp('HomePanel').setVisible(true);
			Ext.getCmp('MBody').setVisible(true);
			
			Ext.getCmp('EquipmentBulkDD').setVisible(false);
			
			Ext.getCmp('ProjectPanel').setVisible(false);
			Ext.getCmp('StoresPanel').setVisible(false);
			Ext.getCmp('ReportsPanel').setVisible(false);
			
			Ext.getCmp('FormsBody').setVisible(false);
			Ext.getCmp('GridBody').setVisible(false);
			
			}
	},{
		text : 'Projects',
		iconCls : 'jobsIcon',
		width :200,
		height : 30,
		flex : 1,
		textAlign : 'left',
		handler : function() {
			
			Ext.getCmp('ProjectPanel').setVisible(true);
			
			Ext.getCmp('MBody').setVisible(true);
				
			Ext.getCmp('HomePanel').setVisible(false);
			Ext.getCmp('StoresPanel').setVisible(false);
			Ext.getCmp('ReportsPanel').setVisible(false);
			
			Ext.getCmp('FormsBody').setVisible(false);
			Ext.getCmp('GridBody').setVisible(false);
			
			Ext.getCmp('EquipmentBulkDD').setVisible(false);
		}
	},{
		text : 'Stores',
		iconCls : 'jobsIcon',
		width : 200,
		height : 30,
		flex : 1,
		id : 'StoresType',
		name : 'StoresType',
		textAlign : 'left',
		handler : function() {
			
			Ext.getCmp('StoresPanel').setVisible(true);
			Ext.getCmp('MBody').setVisible(true);
			
			
			Ext.getCmp('HomePanel').setVisible(false);
			Ext.getCmp('ProjectPanel').setVisible(false);
			Ext.getCmp('ReportsPanel').setVisible(false);
			
			Ext.getCmp('FormsBody').setVisible(false);
			Ext.getCmp('GridBody').setVisible(false);
			
			Ext.getCmp('EquipmentBulkDD').setVisible(false);

		}
	},{
		text : 'Reports',
		iconCls : 'jobsIcon',
		width : 200,
		height : 30,
		flex : 1,
		textAlign : 'left',
		handler : function() {
			
			Ext.getCmp('ReportsPanel').setVisible(true);
			Ext.getCmp('MBody').setVisible(true);
			
			Ext.getCmp('HomePanel').setVisible(false);
			Ext.getCmp('ProjectPanel').setVisible(false);
			Ext.getCmp('StoresPanel').setVisible(false);
			
			Ext.getCmp('FormsBody').setVisible(false);
			Ext.getCmp('GridBody').setVisible(false);
			
			Ext.getCmp('EquipmentBulkDD').setVisible(false);
		}
	}],
		
	initComponent : function() {
		this.callParent(arguments);
	
	}
});

