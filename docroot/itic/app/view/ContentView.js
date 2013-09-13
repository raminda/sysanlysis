Ext.define('New.view.ContentView', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ContentView',
	border : false,
	frame : true,
	layout : {
		align: 'stretch', 
		type : 'hbox',
		padding : 5
		
	},
	minheight:700,
	height:900,
	minheight:1400,
	items:[{
		anchor: '24% 100%',
		flex : 25,
		xtype : 'Showpanel',
		id : 'Showpanel',
		name : 'Showpanel',
	},{
		anchor: '2% 100%',
		flex : 1,
    	xtype: 'splitter'
    },{
    	anchor: '74% 100%',
    	flex : 84,
		xtype : 'MainBodypanel',
		id : 'MainBodypanel',
		name : 'MainBodypanel',
	}],
	
	tbar :[{
		//collapsible:true,
		anchor: '100% 100%',
		xtype : 'MenuBar',
		id : 'MenuBarpanel',
		name : 'MenuBarpanel',
		flex : 1,
	}],
	
	initComponent : function() {
		this.callParent(arguments);	
	}
});

