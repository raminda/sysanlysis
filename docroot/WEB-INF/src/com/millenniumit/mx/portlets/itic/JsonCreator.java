package com.millenniumit.mx.portlets.itic;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonCreator {
	
	private Logger logger;
	
	public JsonCreator(){
		logger = Logger.getLogger(JsonCreator.class);
	}
	
	public JSONObject JsonCreat(ResourceRequest request, ResourceResponse response,String ServiceType){
		
		
		//DateFormat formatter = DateFormat.getDateInstance(DateFormat.MEDIUM);
			String json = "";
			//try to read Requested Line
			try {
				json = request.getReader().readLine();
			}	catch (UnsupportedEncodingException e) {
					logger.info("Error JSON Reading : " + e.getMessage());
				} 
				catch (IOException e) {
					logger.info("Error JSON Reading : " + e.getMessage());
				}
			//Retrieved json
			logger.info("Json string retrived : " + json);
			
			return jsonConvert(json);
		
		}
	
		public JSONObject JsonCreat(String json){
			return jsonConvert(json);
		}
		
		private JSONObject jsonConvert(String json){
			JSONArray jsonArray = null;
			JSONObject jsonobj = null;
			try{
				//check json array is around by [] and if not insert [] to json
				char[] a=json.toCharArray();
				if(a[0]!='['){
					json='['+json+']';
				}
			}catch (Exception e) {
				logger.info("Error JSON Convert to char : " + e.getMessage());
			}
			json=linebracker(json);
			//Create Json Array
			try {
				 jsonArray = new JSONArray(json);
			}catch (JSONException e) {
				logger.info("Error JSON Array : " + e.getMessage());
				}
			logger.info("JSON Array lenth: +"+jsonArray.length());
			//Create Json object
			try {
				if(jsonArray.length()>1)
					jsonobj = (JSONObject)jsonArray.get(0);
				else
					jsonobj = (JSONObject)jsonArray.get(jsonArray.length()-1);
			} catch (JSONException e) {
				logger.info("Error JSON Object: " + e.getMessage());
				}
		

			return jsonobj;
			
	}
	
	private String linebracker(String jsonOb2){
		//String a="|";
		//String b="\n";
		//jsonOb2=jsonOb2.replaceAll(a, b);
		return jsonOb2;
	}
}
