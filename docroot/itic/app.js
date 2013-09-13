/**
 * This is the main configuration file for the ExtJS app. Note that we
 * initialize the app inside a AUI().ready(function(){}); call. This makes sure
 * that each of the portlets in the page are initialized on domready event.
 *Ext.require([ 'Ext.grid.plugin.RowEditing' ]); 
 */

AUI().ready(function() {
	Ext.Loader.setPath('Ext', ext_path);
	Ext.application({
		name : "New",

		// This is where all the files for the app is located
		appFolder : app_path,

		// List all the controllers in the app
		controllers : [ 'SystemController' ],

		launch : function() {
			Ext.create('Ext.container.Container', {

				layout : 'fit',
				width : '100%',
				frame : true,
				bodyStyle : {
					background : '#CBDEF3',
				},
					border : true,
					items : [/*{
						renderTo : Menu_div,
						xtype : 'MenuBar',
						
					},*/{
						renderTo : Body_div,
						xtype : 'ContentView',
						id : 'ContentView',
						name : 'ContentView',
					}]
			});
		}
	});	
});
