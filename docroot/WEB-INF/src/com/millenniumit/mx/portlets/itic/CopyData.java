package com.millenniumit.mx.portlets.itic;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.Calendar;
import java.util.List;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.millenniumit.mx.data.itic.domain.Equipmentmaping;
import com.millenniumit.mx.data.itic.domain.Equipments;
import com.millenniumit.mx.data.itic.domain.EquipmentsBulk;
import com.millenniumit.mx.data.itic.domain.ItemType;
import com.millenniumit.mx.data.itic.domain.ProjectItems;
import com.millenniumit.mx.data.itic.domain.Projects;
import com.millenniumit.mx.data.itic.service.EquipmentMapingService;
import com.millenniumit.mx.data.itic.service.EquipmentsBulkService;
import com.millenniumit.mx.data.itic.service.EquipmentsService;
import com.millenniumit.mx.data.itic.service.ItemTypeService;
import com.millenniumit.mx.data.itic.service.PackagesService;
import com.millenniumit.mx.data.itic.service.ProjectItemsService;
import com.millenniumit.mx.data.itic.service.ProjectsService;

@SuppressWarnings("unused")
public class CopyData {

	
	private String dateFormat  = "dd-MM-yyyy";
	private Logger logger = Logger.getLogger(CopyData.class);
	
	//Services Objects in Service class 
	
	private EquipmentsService equipmentService;

	private EquipmentsBulkService equipmentsBulkService;
	private ItemTypeService itemTypeService;
	private PackagesService packageService;
	private ProjectsService projectService;
	private ProjectItemsService projectItemsService;
	private EquipmentMapingService equipmentMapingService;
	private JsonCreator jsonCreator=new JsonCreator();
	
	public CopyData(EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,EquipmentsBulkService equipmentsBulkService,ItemTypeService itemTypeService,PackagesService packageService,ProjectsService projectService,ProjectItemsService projectItemsService){
		
		
		this.equipmentService =equipmentService; 
		this.equipmentsBulkService=equipmentsBulkService;
		this.itemTypeService = itemTypeService;
		this.packageService =packageService ;
		this.projectService =projectService;
		this.projectItemsService = projectItemsService;
		this.equipmentMapingService=equipmentMapingService;
	}
	
	public CopyData(ProjectsService projectService){
		
		this.projectService =projectService;
	}
	public CopyData(ProjectItemsService projectItemsService,ProjectsService projectService){
	
		this.projectItemsService = projectItemsService;
		this.projectService =projectService;
	}
	public void CopyDataRows(ResourceRequest request, ResourceResponse response,String ServiceType) throws JSONException, ParseException{
		Calendar calendar = Calendar.getInstance();
		JSONObject jsonobj=jsonCreator.JsonCreat(request, response,ServiceType);
		String CopyType=request.getParameter("ID");
		
		if(CopyType=="Version"){
			System.out.println(request.getParameter("value")+ " &&&&&&*&*&*& "+jsonobj+ " ****** " );
			String Copyvalue=request.getParameter("value");
			
			JSONObject jsonobj1=jsonCreator.JsonCreat(Copyvalue);
			//JsonObject= {ProjectID:ProjectName,OptionID :OptionName,VersionID:Version};
			
			//{[CompanyName :'"+OCompanyName+"',ProjectName : '"+OProjectName+"',OptionName :'"+OOptionName+"',Version : '"+OVersion+"']}";
			
			
			List <ProjectItems>lst=projectItemsService.getAll(projectService.getProjects(jsonobj1.getString("ProjectName")), jsonobj1.getString("OptionName"), jsonobj1.getString("Version"));
			for(int i=0;i<lst.size();i++){
				ProjectItems items=new ProjectItems();
				
				items.setOpId(jsonobj.getString("OptionID"));
				items.setPackageType(lst.get(i).gePackageType());
				items.setPcakageUsege(lst.get(i).getPcakageUsege());
				items.setPrice(lst.get(i).getBPrice());
				items.setProjectId(projectService.getProjects(jsonobj.getString("ProjectID")));
				items.setQuantity(lst.get(i).getQuantity());
				items.setSiteId(lst.get(i).getSiteId());
				items.setVerId(jsonobj.getString("VersionID"));
				Long ID=(long) 0;
				
				try{
				ID=projectItemsService.save(items);
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					ID=(long) 0;
				}
				System.out.println(ID);
			}
			
		}
		else{
			System.out.println(request.getParameter("value")+ " &&&&&&*&*&*& "+jsonobj+ " ****** ");
		}
		
		
	}

}
