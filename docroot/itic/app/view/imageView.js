var wrappedImage = Ext.define('New.view.imageView', {
	extend :'Ext.Img',
	alias  : 'widget.image',
	//id : 'viewimage',
	//name : 'viewimage',
	border : false,
	frame : true,
	anchor: '100% 100%',
	height :900,
	flex:1,
	layout : {
		align: 'stretch', 
		type : 'fit',
		padding : 5
	},
    src: '/SystemAnalyze-portlet/Img/4.png',
  //  autoEl: 'div', // wrap in a div
    initComponent : function() {
		this.callParent(arguments);
		
	}

});
