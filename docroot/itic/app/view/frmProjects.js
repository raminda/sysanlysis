Ext.define('New.view.frmProjects', {
	extend : 'Ext.form.Panel',
	alias  : 'widget.frmProject',
	border : false,

	anchor: '100% 100%',
	bodyPadding: 10,
    autoHeight: true,
    items : [ {
		xtype : 'panel',
		width : '100%',
		bodyPadding : 15,
		border : false,
        items: [{
        	fieldLabel: 'Company Name',
            labelWidth: 120,
        	xtype : 'combobox',
			id : 'cmbscPrjCompany',
			name : 'cmbscPrjCompany',
			valueField : 'Company',
			displayField:'Company',
			selectOnTab : true,
			allowBlank : false,
			editable:false,
			store : 'ProjectsStore',
            width : 350,
            flex: 1,
            layout: {
                type: 'absolute'
            },   
            listeners: {
	        	change:function ( me, newValue, oldValue, eOpts ){                		
	        		if(Ext.getCmp('cmbscPrjCompany').getValue()!=null){		
	    				Ext.getCmp('cmbscPrjProject').enable(true);
	    				Ext.getCmp('btnClearAll').enable(true);	
	        		}
	        		else{          			
	            		Ext.getCmp('cmbscPrjProject').disable(true);
	        		}
	        		Ext.getCmp('cmbscPrjProject').reset();
		    	},
	            focus:function( me, The, eOpts ){
	            	var store = Ext.getStore('ProjectsStore');
	            	store.proxy.extraParams.purpose = 'Grid';
	            	store.proxy.extraParams.value = '1';
	            	store.load();
	            }
        	}
        },{ 
        	labelWidth: 120,
        	fieldLabel: 'Project Name',
        	xtype : 'combobox',
			id : 'cmbscPrjProject',
			name : 'cmbscPrjProject',
			valueField : 'ProjectName',
			displayField:'ProjectName',
			allowBlank : false,
			editable:false,
			store : 'ProjectsStore',
            width : 350,
            flex: 1,
            layout: {
                type: 'absolute'
            },   
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){
            		if(Ext.getCmp('cmbscPrjProject').getValue()!=null){
            			Ext.getCmp('cmbscPrjOption').enable(true);	

            		}
            		else{
            			Ext.getCmp('cmbscPrjOption').disable(true);
	            		
            		}
            		Ext.getCmp('cmbscPrjOption').reset();
	    	    },
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectsStore');
    				store.proxy.extraParams.purpose = 'Combo';
    				store.proxy.extraParams.value="1";	
    				store.proxy.extraParams.ID=Ext.getCmp('cmbscPrjCompany').getValue();
    				store.load();
                }
	          }
        },{
        	fieldLabel: 'Option Name',
 	        labelWidth: 120,
        	xtype : 'combobox',
			id : 'cmbscPrjOption',
			name : 'cmbscPrjOption',
			valueField : 'OptionID',
			displayField:'OptionID',
			allowBlank : false,
			store : 'ProjectItemsStore1',
            width : 350,
            flex: 1,
            typeAhead: true ,
            layout: {
                type: 'absolute'
            },
            listeners: {
            	blur: function(){
	        		if(Ext.getCmp('cmbscPrjOption').getValue()!=null){
						Ext.getCmp('cmbscPrjVersion').enable(true);
        			}
	        		else{          		 
						Ext.getCmp('cmbscPrjVersion').disable(true); 
            		}
	        		Ext.getCmp('cmbscPrjVersion').reset();
            	},
            	
            	change:function ( me, newValue, oldValue, eOpts ){
            		if(Ext.getCmp('cmbscPrjOption').getValue()!=null){
						Ext.getCmp('cmbscPrjVersion').enable(true);
            		}
            		else{
						Ext.getCmp('cmbPrjVersion').disable(true); 
            		}
            		Ext.getCmp('cmbscPrjVersion').reset();
            	},
            	
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectItemsStore1');
					store.proxy.extraParams.purpose = 'Combo';
					store.proxy.extraParams.value='1';
					store.proxy.extraParams.ID1=Ext.getCmp('cmbscPrjProject').getValue();
					store.load();
                }
        	}
        },{
        	fieldLabel: 'Version Name',
	        labelWidth: 120,
        	xtype : 'combobox',
			id : 'cmbscPrjVersion',
			name : 'cmbscPrjVersion',
			valueField : 'VersionID',
			displayField:'VersionID',
			selectOnTab : true,
			allowBlank : false,
			//editable:false,
			store : 'ProjectItemsStore2',
            width : 350,
            flex: 1,
            typeAhead: true ,
            layout: {
                type: 'absolute'
            },
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){
            		if(Ext.getCmp('cmbscPrjVersion').getValue()!=null){
            			Ext.getCmp('cmbPrjSite').enable(true);
            		}
            		else{
            			Ext.getCmp('cmbPrjSite').disable(true);
            		}
            		Ext.getCmp('cmbPrjSite').reset();
            	},
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectItemsStore2');
    				store.proxy.extraParams.purpose = 'Combo';
    				store.proxy.extraParams.value='2';
    				store.proxy.extraParams.ID1=Ext.getCmp('cmbscPrjProject').getValue();
    				store.proxy.extraParams.ID2=Ext.getCmp('cmbscPrjOption').getValue();
					store.load();
                }
        	}
        }    	
    ],
    bbar :[{
            xtype: 'button',
            labelWidth: 100,
            text : 'Generate Project',
            width : 150,
            flex: 1,
            layout: {
                type: 'absolute'
            },
            handler : function() {
            	
            	var store = Ext.getStore('my');
            	store.proxy.extraParams.purpose="ExcelCreate";
        		store.proxy.extraParams.ID1=Ext.getCmp('cmbscPrjProject').getValue();
				store.proxy.extraParams.ID2=Ext.getCmp('cmbscPrjOption').getValue();
				store.proxy.extraParams.ID3=Ext.getCmp('cmbscPrjVersion').getValue();

				
				var win = Ext.create('Ext.window.Window', {
					title : 'Excel Genarating Window',
					width : 450,
					height : 250,
					minWidth : 300,
					minHeight : 200,
					layout : 'fit',
					plain : true,
					items : [{
						xtype : 'GenerateExcel',
					}],
					buttons : [],
				});
				win.show();
					
				store.load();
				store.reset();	
            }
        },{
                xtype: 'splitter'
        },{
                xtype: 'splitter'
        },{
	        xtype: 'button',
	        labelWidth: 100,
	        id : 'btnscClearAll',
			name : 'btnscClearAll',
	        text : 'Clear All',
	        width : 150,
	        flex: 1,
	        layout: {
	            type: 'absolute'
	        },
	        handler : function() {
	        	
	        	Ext.getCmp('cmbscPrjPackage').disable(true);
	        	Ext.getCmp('cmbscPrjPackage').reset();
	    		Ext.getCmp('cmbscPrjVersion').disable(true);           		 
	    		Ext.getCmp('cmbscPrjVersion').reset();
	        	Ext.getCmp('cmbscPrjOption').disable(true);
	    		Ext.getCmp('cmbscPrjOption').reset();
	        	Ext.getCmp('cmbscPrjProject').reset();
	    		Ext.getCmp('cmbscPrjProject').disable(true);
				Ext.getCmp('cmbscPrjCompany').reset();
	        	Ext.getCmp('cmbscPrjCompany').enable(true);
	        	
	        	Ext.getCmp('btnscClearAll').disable(true);
	        }
        }],
    }],     
	initComponent : function() {
		this.callParent(arguments);
		Ext.getCmp('cmbscPrjCompany').enable(true);
		Ext.getCmp('cmbscPrjOption').disable(true); 
		Ext.getCmp('cmbscPrjVersion').disable(true);
		Ext.getCmp('cmbscPrjProject').disable(true);
		Ext.getCmp('btnscClearAll').disable(true);
	}
        });