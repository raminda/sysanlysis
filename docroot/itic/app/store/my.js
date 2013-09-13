Ext.define( 'New.store.my', {
	extend :'Ext.data.Store',
	model : 'New.model.SupportModel',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		url : ExcelUrl,
		reader : {
			type : 'json'
		},
		
		extraParams: {
			ID1:'Null',
            ID2:'Null',
            ID3:'Null',
            purpose:'null',
		}
	},
	 listeners: {
         load: function (me, records, successful, eOpts) {
        	 var jsn=null;
        	 
        	 
	        	 Ext.each(records, function(rec) {
	        	 	jsn=Ext.encode(rec.raw);//"+jsn.FileName + "
	        	 	jsn=JSON.parse(jsn);
	                console.log(jsn + "   -       +   ");
	        	 });
	
	        	 if(jsn.FileName!=null){
	        		 Ext.getCmp('buttonExcel').href=jsn.FileName;
	        		 Ext.getCmp('imageExcel1').setVisible(false);
	        		 Ext.getCmp('imageExcel2').setVisible(true);
	        		 Ext.getCmp('buttonExcel').setText("Click To Download");
	        	 }
	        	 else{
	        		 console.log(jsn );
	        	 }
        	 
         }
      }
});
