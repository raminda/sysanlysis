Ext.define('New.view.GenerateExcel', {
	extend : 'Ext.form.Panel',
	alias  : 'widget.GenerateExcel',	
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 15,
	id : 'GenerateExcel',
	name : 'GenerateExcel',
        items: [{
        	xtype : 'panel',
    		width : '100%',
    		bodyPadding : 15,
    		border : false,
    		layout: {
	            type: 'hbox',
	        },
                items: [{
	    			id : 'buttonExcel',
	    			name : 'buttonExcel',
	    			xtype: 'button',
	                labelWidth: 100,
	                text : 'Plese wait..',
	                width : 150,
	                height : 150,
	                flex: 1,
	                layout: {
	                    type: 'absolute'
	                },
	                href: null,
	                handler : function() {
	                	if (this.href) {
	                        window.location.href = this.href;
	                        Ext.getCmp('buttonExcel').disable(true);
	                    }
	                	else{
	                		Ext.Msg.alert('Message', 'Nothing to Download!');
	                	}
	                }//src: '/SystemAnalyze-portlet/Img/6.gif',
                },{
                	id : 'imageExcel1',
	    			name : 'imageExcel1',
	    			xtype: 'image',
	    			width : 200,
	                height : 150,
	    			src: '/SystemAnalyze-portlet/Img/6.gif',
                },{
                	id : 'imageExcel2',
	    			name : 'imageExcel2',
	    			xtype: 'image',
	    			width : 200,
	                height : 150,
	    			src: '/SystemAnalyze-portlet/Img/8.gif',
                }]
        }],
        initComponent : function() {
    		this.callParent(arguments);
    		Ext.getCmp('imageExcel2').setVisible(false);
    		
    	}
});