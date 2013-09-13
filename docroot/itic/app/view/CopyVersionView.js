Ext.define('New.view.CopyVersionView', {
	extend : 'Ext.form.Panel',
	alias  : 'widget.CopyVersion',	
	layout : 'column',
	frame : false,
	border : false,
	buttonAlign : 'center',
	width : '100%',
	bodyPadding : 15,
	id : 'CopyVersion',
	name : 'CopyVersion',
	
        items: [{
        	xtype : 'panel',
    		width : '100%',
    		bodyPadding : 15,
    		border : false,
    		items : [ {
        		fieldLabel: 'Orginal Company Name',
        		labelWidth: 200,
            	xtype : 'combobox',
    			id : 'cmbCpOpPrjCompany',
    			name : 'cmbCpOpPrjCompany',
    			valueField : 'Company',
    			displayField:'Company',
    			selectOnTab : true,
    			allowBlank : false,
    			editable:false,
    			store : 'ProjectsStore',
                width : 400,
                flex: 1,
                layout: {
                    type: 'absolute'
                },   
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){                		
            		if(Ext.getCmp('cmbCpOpPrjCompany').getValue()!=null){
	            				
	    				Ext.getCmp('cmbCpOpPrjProject').enable(true);
	    				Ext.getCmp('cmbCpOpPrjCompany').disable(true);	
            		}
            		else{
            			          			
                		Ext.getCmp('cmbCpOpPrjProject').disable(true);
            		}
            		Ext.getCmp('cmbCpOpPrjProject').reset();
    	    	},
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectsStore');
                	store.proxy.extraParams.purpose = 'Grid';
                	store.proxy.extraParams.value = '1';
                	store.load();
                }
        	}
        },{ 
        	fieldLabel: 'Orginal Project Name',
        	labelWidth: 200,
        	xtype : 'combobox',
			id : 'cmbCpOpPrjProject',
			name : 'cmbCpOpPrjProject',
			valueField : 'ProjectName',
			displayField:'ProjectName',
			allowBlank : false,
			editable:false,
			store : 'ProjectsStore',
            width : 400,
            flex: 1,
            layout: {
                type: 'absolute'
            },   
            listeners: {
            	
            	change:function ( me, newValue, oldValue, eOpts ){
            		if(Ext.getCmp('cmbCpOpPrjProject').getValue()!=null){
            			
						Ext.getCmp('cmbCpOpPrjOption').enable(true);
						Ext.getCmp('cmbCpOpPrjProject').disable(true);
            		}	
            		Ext.getCmp('cmbOrOpPrjCompany').reset();
	    	    },
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectsStore');
    				store.proxy.extraParams.purpose = 'Combo';
    				store.proxy.extraParams.value="1";
        				
    				store.proxy.extraParams.ID=Ext.getCmp('cmbCpOpPrjCompany').getValue();
    				store.load();
                }
	          }
            },{
            	fieldLabel: 'Orginal Option Name',
            	labelWidth: 200,
	        	xtype : 'combobox',
				id : 'cmbCpOpPrjOption',
				name : 'cmbCpOpPrjOption',
				valueField : 'OptionID',
				displayField:'OptionID',
				allowBlank : false,
				store : 'ProjectItemsStore1',
	            width : 400,
	            editable:false,
	            flex: 1,
	            layout: {
                    type: 'absolute'
                },
	            listeners: {
	            	change:function ( me, newValue, oldValue, eOpts ){
                		if(Ext.getCmp('cmbCpOpPrjOption').getValue()!=null){
                			Ext.getCmp('cmbCpOpVersion').enable(true);
                			Ext.getCmp('cmbCpOpPrjOption').disable(true);
                		}
                		else{
                			Ext.getCmp('cmbCpOpVersion').disable(true);
                		}
                		
                	},
                	
                    focus:function( me, The, eOpts ){
                    	var store = Ext.getStore('ProjectItemsStore1');
						store.proxy.extraParams.purpose = 'Combo';
						store.proxy.extraParams.value='1';
						store.proxy.extraParams.ID1=Ext.getCmp('cmbCpOpPrjProject').getValue();
						store.load();
						//Ext.Msg.alert('Message',Ext.getCmp('cmbCpOpPrjProject').getValue());
                    }
            	}
            },{
            	fieldLabel: 'Orginal Version Name',
            	labelWidth: 200,
            	xtype : 'combobox',
				id : 'cmbCpOpVersion',
				name : 'cmbCpOpVersion',
				valueField : 'VersionID',
				displayField:'VersionID',
				selectOnTab : true,
				allowBlank : false,
				//editable:false,
				store : 'ProjectItemsStore2',
	            width : 400,
	            flex: 1,
	            typeAhead: true ,
	            layout: {
                    type: 'absolute'
                },
	            listeners: {
	            	change:function ( me, newValue, oldValue, eOpts ){
                		if(Ext.getCmp('cmbCpOpVersion').getValue()!=null){
                			Ext.getCmp('cmbOrOpPrjCompany').enable(true);
                			Ext.getCmp('cmbOrOpPrjProject').enable(true);
                			Ext.getCmp('cmbOrOpPrjOption').enable(true);
                			Ext.getCmp('cmbOrOpVersion').enable(true);
    						Ext.getCmp('cmbCpOpVersion').disable(true);
                		}
                		else{
                			Ext.getCmp('cmbOrOpPrjProject').disable(true);
                			Ext.getCmp('cmbOrOpPrjCompany').disable(true);
                			Ext.getCmp('cmbOrOpPrjOption').disable(true);
                			Ext.getCmp('cmbOrOpVersion').disable(true);
    	            		
                		}
                		
                	},
                	
	                focus:function( me, The, eOpts ){
	                	var store = Ext.getStore('ProjectItemsStore2');
        				store.proxy.extraParams.purpose = 'Combo';
        				store.proxy.extraParams.value='2';
        				store.proxy.extraParams.ID1=Ext.getCmp('cmbCpOpPrjProject').getValue();
        				store.proxy.extraParams.ID2=Ext.getCmp('cmbCpOpPrjOption').getValue();
						store.load();
	                }
	        	}
	        },{
            	fieldLabel: 'Copied Company Name',
            	labelWidth: 200,
            	xtype : 'combobox',
    			id : 'cmbOrOpPrjCompany',
    			name : 'cmbOrOpPrjCompany',
    			valueField : 'Company',
    			displayField:'Company',
    			selectOnTab : true,
    			allowBlank : false,
    			editable:false,
    			store : 'ProjectsStore',
                width : 400,
                flex: 1,
                layout: {
                    type: 'absolute'
                },   
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){                		
            		Ext.getCmp('cmbOrOpPrjProject').reset();
    	    	},
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectsStore');
                	store.proxy.extraParams.purpose = 'Grid';
                	store.proxy.extraParams.value = '1';
                	store.load();
                }
        	}
        },{
        	fieldLabel: 'Copied Project Name',	
        	labelWidth: 200,
        	xtype : 'combobox',
			id : 'cmbOrOpPrjProject',
			name : 'cmbOrOpPrjProject',
			valueField : 'ProjectName',
			displayField:'ProjectName',
			allowBlank : false,
			editable:false,
			store : 'ProjectsStore',
            width : 400,
            flex: 1,
            layout: {
                type: 'absolute'
            },   
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){
            		Ext.getCmp('cmbOrOpPrjOption').reset();
            	},
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectsStore');
    				store.proxy.extraParams.purpose = 'Combo';
    				store.proxy.extraParams.value="1";
        				
    				store.proxy.extraParams.ID=Ext.getCmp('cmbOrOpPrjCompany').getValue();
    				store.load();
                }
	          }
        },{
        	fieldLabel: 'Orginal Option Name',
        	labelWidth: 200,
        	xtype : 'combobox',
			id : 'cmbOrOpPrjOption',
			name : 'cmbOrOpPrjOption',
			valueField : 'OptionID',
			displayField:'OptionID',
			allowBlank : false,
			store : 'ProjectItemsStore1',
            width : 400,
            editable:true,
            flex: 1,
            layout: {
                type: 'absolute'
            },
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){
            		Ext.getCmp('cmbOrOpVersion').reset();
            		
            	},
            	
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectItemsStore1');
					store.proxy.extraParams.purpose = 'Combo';
					store.proxy.extraParams.value='1';
					store.proxy.extraParams.ID1=Ext.getCmp('cmbOrOpPrjProject').getValue();
					store.load();
					//Ext.Msg.alert('Message',Ext.getCmp('cmbCpOpPrjProject').getValue());
                }
        	}
        },{
        	fieldLabel: 'Copied Version Name',
        	labelWidth: 200,
        	xtype : 'combobox',
			id : 'cmbOrOpVersion',
			name : 'cmbOrOpVersion',
			valueField : 'VersionID',
			displayField:'VersionID',
			selectOnTab : true,
			allowBlank : false,
			//editable:false,
			store : 'ProjectItemsStore2',
            width : 400,
            flex: 1,
            typeAhead: true ,
            layout: {
                type: 'absolute'
            },
            listeners: {
            	change:function ( me, newValue, oldValue, eOpts ){
            		
            	},
            	
                focus:function( me, The, eOpts ){
                	var store = Ext.getStore('ProjectItemsStore2');
    				store.proxy.extraParams.purpose = 'Combo';
    				store.proxy.extraParams.value='2';
    				store.proxy.extraParams.ID1=Ext.getCmp('cmbOrOpPrjProject').getValue();
    				store.proxy.extraParams.ID2=Ext.getCmp('cmbOrOpPrjOption').getValue();
					store.load();
                }
        	}
        }]
    }],  
        initComponent : function() {
        	this.callParent(arguments);
        	
        	Ext.getCmp('cmbOrOpPrjProject').disable(true);
        	Ext.getCmp('cmbOrOpPrjCompany').disable(true);
        	Ext.getCmp('cmbCpOpPrjProject').disable(true);
        	Ext.getCmp('cmbCpOpPrjOption').disable(true);
        	Ext.getCmp('cmbOrOpPrjOption').disable(true);
        	Ext.getCmp('cmbCpOpVersion').disable(true);
        	Ext.getCmp('cmbOrOpVersion').disable(true);
        }
});