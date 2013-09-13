package com.millenniumit.mx.portlets.itic;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.millenniumit.mx.data.itic.domain.Equipmentmaping;
import com.millenniumit.mx.data.itic.domain.Equipments;
import com.millenniumit.mx.data.itic.domain.EquipmentsBulk;
import com.millenniumit.mx.data.itic.domain.ItemType;
import com.millenniumit.mx.data.itic.domain.Packages;
import com.millenniumit.mx.data.itic.domain.ProjectItems;
import com.millenniumit.mx.data.itic.domain.Projects;
import com.millenniumit.mx.data.itic.service.EquipmentMapingService;
import com.millenniumit.mx.data.itic.service.EquipmentsBulkService;
import com.millenniumit.mx.data.itic.service.EquipmentsService;
import com.millenniumit.mx.data.itic.service.ItemTypeService;
import com.millenniumit.mx.data.itic.service.PackagesService;
import com.millenniumit.mx.data.itic.service.ProjectItemsService;
import com.millenniumit.mx.data.itic.service.ProjectsService;

public class GridData {
	//private String dateFormat  = "yyyy-MM-dd";
	private Logger logger = Logger.getLogger(GridData.class);
	
	//Services Objects in Service class 
	
	private EquipmentsService equipmentService;

	private EquipmentsBulkService equipmentsBulkService;
	private ItemTypeService itemTypeService;
	private PackagesService packageService;
	private ProjectsService projectService;
	private ProjectItemsService projectItemsService;
	private EquipmentMapingService equipmentMapingService;
	
	public GridData(EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,EquipmentsBulkService equipmentsBulkService,ItemTypeService itemTypeService,PackagesService packageService,ProjectsService projectService,ProjectItemsService projectItemsService){
		
		
		this.equipmentService =equipmentService; 
		this.equipmentsBulkService=equipmentsBulkService;
		this.itemTypeService = itemTypeService;
		this.packageService =packageService ;
		this.projectService =projectService;
		this.projectItemsService = projectItemsService;
		this.equipmentMapingService=equipmentMapingService;
	
	}
	
	public GridData(EquipmentsService equipmentService){		
			
			this.equipmentService =equipmentService; 
	}
	public GridData(EquipmentsBulkService equipmentsBulkService){		
		
		this.equipmentsBulkService=equipmentsBulkService;
	}
	public GridData(ItemTypeService itemTypeService){
		
		this.itemTypeService = itemTypeService;	
	}
	public GridData(PackagesService packageService){
	
		this.packageService =packageService ;
	}
	public GridData(ProjectsService projectService){
		
		this.projectService =projectService;
	}
	public GridData(ProjectItemsService projectItemsService){
	
		this.projectItemsService = projectItemsService;
	}
	public GridData(EquipmentMapingService equipmentMapingService){
		
		this.equipmentMapingService=equipmentMapingService;
	}


	
	public void gridLoad(ResourceRequest request, ResourceResponse response,String ServiceType) throws IOException{
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		//new Gson Object for getting String line to Json 
		Gson gson = new Gson();
		
		//*****equipment*******
		if (ServiceType.equals("Equipment")) {	
			System.out.println("This section is for Parameter equipmentService Grid");
			List<Equipments> lst = equipmentService.getAll();
			boolean bool=true;
			String jsonOb2="[";
			for(int i=0;i<lst.size();i++){
				Equipments obj=lst.get(i);
				try{
					jsonOb2+="{ ItemName: '" + obj.getItemName()+"',Summary:'"+obj.getSummary()+"',Price: '"+obj.getPrice()+"',Full_Descrip:'"+obj.getFull_Descrip()+"',ITIC_Descrip:'"+obj.getITIC_Descrip()+"',Tec_Descrip:'"+obj.getTec_Descrip()+"',EOLDate:'"+obj.getEOLDate()+"',date_logged:'"+obj.getDateModified()+"',date_modified:'"+obj.getDateLogged()+"',date_created:'"+obj.getDateCreated()+"',ID:'"+obj.getID()+"',ItemType:'"+obj.getItemType().getTypeName()+"'}";
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					jsonOb2+="'}";
					bool=false;
				}
				if(i<lst.size()-1 && bool){
					jsonOb2+=",";
				}
			}
			///
			
			jsonOb2+="]";
			jsonOb2=linebracker(jsonOb2);
			out.println(jsonOb2);
		}
		//******equipmentBulk********
		else if (ServiceType.equals("EquipmentsBulk")) {	
			System.out.println("This section is for Parameter equipmentBulkService Grid");
			List<EquipmentsBulk> lst = equipmentsBulkService.getEquipmentsBulk();
			boolean bool=true;
			String jsonOb2="[";
			for(int i=0;i<lst.size();i++){
				EquipmentsBulk obj=lst.get(i);
				try{
					jsonOb2+="{ ItemID : '" + obj.getEquipmentsId().getItemName()+"',PackageID:'"+obj.getPackageID().getPackageName()+"',Quantity: '"+obj.getQuantity()+"',Price:'"+obj.getPrice()+"',date_logged:'"+obj.getDateLogged()+"',date_modified:'"+obj.getDateModified()+"',date_created:'"+obj.getDateCreated()+"', ID:'"+obj.getId()+"'}";
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					jsonOb2+="'}";
					bool=false;
				}
				if(i<lst.size()-1 && bool){
					jsonOb2+=",";
				}
			}
			
			jsonOb2+="]";
			jsonOb2=linebracker(jsonOb2);
			out.println(jsonOb2);	
		}
		//*****equipment Map*******
		else if (ServiceType.equals("EquipmentMap")) {	
			
			System.out.println("This section is for Parameter EquipmentMapService Update");
			List<Equipmentmaping> lst =equipmentMapingService.getEquipmentMapings();
			boolean bool=true;
			String jsonOb2="[";
			for(int i=0;i<lst.size();i++){
				Equipmentmaping obj=lst.get(i);
				try{
					jsonOb2+="{ ParentID : '" + obj.getParentID().getItemName()+"',ChildID:'"+obj.getChildID().getItemName()+"',date_logged:'"+obj.getDateLogged()+"',date_modified:'"+obj.getDateModified()+"',date_created:'"+obj.getDateCreated()+"', ID:'"+obj.getID()+"'}";
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					jsonOb2+="'}";
					bool=false;
				}
				if(i<lst.size()-1 && bool){
					jsonOb2+=",";
				}
			}
			
			jsonOb2+="]";
			jsonOb2=linebracker(jsonOb2);
			out.println(jsonOb2);
			
		}
		//************************Package**************
		else if (ServiceType.equals("Package")) {
			
			System.out.println("This section is for Parameter PackageService Grid");
			List<Packages> lst = packageService.getPackages();
			out.println(gson.toJson(lst));
		}
		
		//********ProjectItems**********
		else if (ServiceType.equals("ProjectItems")) {
			
			System.out.println("This section is for Parameter ProjectItemsService Grid ");
			List<ProjectItems> lst = projectItemsService.getAll();
			boolean bool=true;
			String jsonOb2="[";
			for(int i=0;i<lst.size();i++){
				ProjectItems obj=lst.get(i);
				try{
					jsonOb2+="{ ProjectID: '" + obj.getProjectId().getProjectName()+"',OptionID:'"+obj.geOptId()+ "',PcakageUsege:'"+obj.getPcakageUsege()+"',PackageType:'"+obj.gePackageType()+"',VersionID: '"+obj.getVerId()+"',SiteID:'"+obj.getSiteId()+"',PackageID:'"+obj.getPackageId().getPackageName()+"',Quantity:'"+obj.getQuantity()+"',Price:'"+obj.getBPrice()+"',date_logged:'"+obj.getDateLogged()+"',date_modified:'"+obj.getDateModified()+"',date_created:'"+obj.getDateCreated()+"', ID:'"+obj.getId()+"'PackageType :'"+obj.gePackageType()+"}";
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					jsonOb2+="'}";
					bool=false;
				}
				if(i<lst.size()-1 && bool){
					jsonOb2+=",";
				}
			}
			
			jsonOb2+="]";
			System.out.println(jsonOb2);
			jsonOb2=linebracker(jsonOb2);
			out.println(jsonOb2);
		}
		
		//*********Project*********
		else if (ServiceType.equals("Projects")) {
			
			System.out.println("This section is for Parameter ProjectsService Grid");
			
			if(Long.parseLong(request.getParameter("value"))==1){
				List<String> a= projectService.getAllNames();
				System.out.println(a.size());
				String jsonOb2="[";
				boolean bool=true;
				for(int i=0;i<a.size();i++){
					try{
						jsonOb2+="{ Company: '" +a.get(i)+"'}";
					}catch (Exception e) {
						logger.info("Error : " + e.getMessage());
						jsonOb2+="'}";
						bool=false;
					}
					if(i<a.size()-1 && bool){
						jsonOb2+=",";
					}
				}
				jsonOb2+="]";
				System.out.println(jsonOb2);
				jsonOb2=linebracker(jsonOb2);
				out.println(jsonOb2);
			}
			else{
				List<Projects> lst = projectService.getProjects();
				out.println(gson.toJson(lst));	
			}
			
			
		}
		
		//**********ItemType***********
		else if (ServiceType.equals("ItemType")) {
			
			System.out.println("This section is for Parameter ItemTypeService Grid");
			List<ItemType> lst = itemTypeService.getItemType();
			//Equipment  Base Items
			String jsonOb2="[";
			String AccsessLevel="";
			boolean bool=true;
			for(int i=0;i<lst.size();i++){
				try{
					if(lst.get(i).getAccsessLevel()==0){
						AccsessLevel="Base Items";
					}
					else{
						AccsessLevel="Equipment";
					}
					jsonOb2+="{ TypeName: '" +lst.get(i).getTypeName() +"',AccsessLevel: '" +AccsessLevel+"',ID :'"+lst.get(i).getID()+"',date_logged:'"+lst.get(i).getDateLogged()+"',date_modified:'"+lst.get(i).getDateModified()+"',date_created:'"+lst.get(i).getDateCreated()+"'}";
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					jsonOb2+="'}";
					bool=false;
				}
				if(i<lst.size()-1 && bool){
					jsonOb2+=",";
				}
			}
			jsonOb2+="]";
			System.out.println(jsonOb2);
			jsonOb2=linebracker(jsonOb2);
			out.println(jsonOb2);
			//out.println(gson.toJson(lst));	
		}
		
		//**********Nothing***********
		else {
			
			System.out.println("This section is for Nothing but Grid");
			out.println("");
		}
	}
	
	
	private String linebracker(String jsonOb2){
		jsonOb2=jsonOb2.replaceAll("\\n", "|");
		jsonOb2=jsonOb2.replaceAll("\r", "");
		jsonOb2=jsonOb2.replaceAll("\n", "|");
		return jsonOb2;
	}
	
	
}
