package com.millenniumit.mx.portlets.itic;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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

public class SaveData {
	
	private String dateFormat  = "yyyy-MM-dd";
	private Logger logger = Logger.getLogger(SaveData.class);
	private JsonCreator jsonCreator=new JsonCreator();
	//Services Objects in Service class 
	
	private EquipmentsService equipmentService;
	private EquipmentsBulkService equipmentsBulkService;
	private ItemTypeService itemTypeService;
	private PackagesService packageService;
	private ProjectsService projectService;
	private ProjectItemsService projectItemsService;
	private EquipmentMapingService equipmentMapingService;
	
	/*public SaveData(AcUserService acUserService,EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,EquipmentsBulkService equipmentsBulkService,ItemTypeService itemTypeService,PackagesService packageService,ProjectsService projectService,ProjectItemsService projectItemsService){
		
		
		this.equipmentService =equipmentService; 
		this.equipmentsBulkService=equipmentsBulkService;
		this.itemTypeService = itemTypeService;
		this.packageService =packageService ;
		this.projectService =projectService;
		this.projectItemsService = projectItemsService;
		this.equipmentMapingService=equipmentMapingService;
		this.acUserService=acUserService;
	}*/
	
	public SaveData(EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,ItemTypeService itemTypeService){		
			
		this.equipmentService =equipmentService;
		this.equipmentMapingService =equipmentMapingService;
		this.itemTypeService = itemTypeService;	
	}
	public SaveData(EquipmentsBulkService equipmentsBulkService,PackagesService packageService,EquipmentsService equipmentService){		
		
		this.equipmentsBulkService=equipmentsBulkService;
		this.packageService =packageService ;
		this.equipmentService=equipmentService;
	}
	public SaveData(ItemTypeService itemTypeService){
		
		this.itemTypeService = itemTypeService;	
	}
	public SaveData(PackagesService packageService,EquipmentsBulkService equipmentsBulkService,EquipmentsService equipmentService){
	
		this.packageService =packageService ;
		this.equipmentsBulkService=equipmentsBulkService;
		this.equipmentService=equipmentService;
	}
	public SaveData(ProjectsService projectService){
		
		this.projectService =projectService;
	}
	public SaveData(ProjectItemsService projectItemsService, ProjectsService projectService , PackagesService  packageService){
	
		this.projectItemsService = projectItemsService;
		this.packageService =packageService ;
		this.projectService =projectService;
	}
	public SaveData(EquipmentMapingService equipmentMapingService){
		
		this.equipmentMapingService=equipmentMapingService;
	}

	
	
	public void NewData(ResourceRequest request, ResourceResponse response,String ServiceType) throws NumberFormatException, JSONException, ParseException{
		JSONObject jsonobj=jsonCreator.JsonCreat(request, response,ServiceType);
		Long ID = null ;
		//Long ID2 = null ;
		
		//*****Equipment*******
		if (ServiceType.equals("Equipment")) {
			
			if(equipmentService.getEquipments(jsonobj.getString("ItemName"))==null){
				Equipments NewEquipment=new Equipments();
				try {
					//*************************************************
					System.out.println(jsonobj);
					System.out.println((jsonobj.get("EOLDate")));
					
					//*****Saving To Object******
					NewEquipment.setItemName(jsonobj.getString("ItemName"));
					NewEquipment.setItemType(itemTypeService.getItemType(jsonobj.getString("ItemType")));
					NewEquipment.setSummary(jsonobj.getString("Summary"));
					NewEquipment.setFull_Descrip(jsonobj.getString("Full_Descrip"));
					NewEquipment.setTec_Descrip(jsonobj.getString("Tec_Descrip"));
					NewEquipment.setITIC_Descrip(jsonobj.getString("ITIC_Descrip"));
					NewEquipment.setPrice(Long.parseLong(jsonobj.getString("Price"),10));
					
					//String dateFormat  = "yyyy-MM-dd";
					Date date = new SimpleDateFormat(dateFormat).parse(jsonobj.getString("EOLDate"));
							/**********************************/
					try{
						NewEquipment.setEOLDate(date);
					}
					catch (Exception e) {
						 logger.info("Error : " + e.getMessage());
					}
							/**********************************/
				} 
				
				catch (JSONException e) {logger.info("Error : " + e.getMessage());}
				//save data
				try {
					ID = equipmentService.save(NewEquipment);
					
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					ID=(long) 0;
				}
				
			}
			else{
				logger.info("Error : " + "Duplicate data entry (Same Equipment name in database )");
			}
			/**
			 *
			 * */
			Long CID=(long) 1;
			try {
				
				CID=equipmentService.getEquipments(jsonobj.getString("ItemName")).getID();
				
			} catch (Exception e) {
				logger.info("Error : " + e.getMessage());
			}
			
			String Items = null;
			//
			try {
				if(request.getParameter("ID")!="base"){
					Items = request.getParameter("ID");
				}
				else{
					CID=(long) 1;
				}
			} catch (Exception e) {
				logger.info("Error : " + e.getMessage());
			}
			
			System.out.println(Items);
			System.out.println("This section is for Parameter EquipmentMapService Update");
			StringTokenizer st = new StringTokenizer(Items, ",");
			
			while(st.hasMoreTokens()) { 
				String key = st.nextToken(); 
				
				Equipmentmaping equipmentMaping=new Equipmentmaping();
				//*************************************************
				logger.info("hi : " + key+" " + CID+" ");
				equipmentMaping.setParentID(equipmentService.getEquipments(key));
				equipmentMaping.setChildID(equipmentService.getEquipments(CID));
				//logger.info("hi : " + equipmentMaping.getChildID().getItemName() +"   "+equipmentMaping.getParentID().getItemName());
				//save data
				try {
					ID=equipmentMapingService.save(equipmentMaping);	
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					ID=(long) 0;
				}
				
				//
			}
			/**
			 * */
			//request.getRemoteUser() ;
		}
		
		//*****equipment Map*******
		else if (ServiceType.equals("EquipmentMap")) {	
		//base
			Long CID=(long) 1;
			try {
				
				CID=equipmentService.getEquipments(jsonobj.getString("ItemName")).getID();
				
			} catch (Exception e) {
				logger.info("Error : " + e.getMessage());
			}
			
			String Items = null;
			//
			try {
				if(request.getParameter("ID")!="base"){
					Items = request.getParameter("ID");
				}
				else{
					CID=(long) 1;
				}
			} catch (Exception e) {
				logger.info("Error : " + e.getMessage());
			}
			
			System.out.println(Items);
			System.out.println("This section is for Parameter EquipmentMapService Update");
			StringTokenizer st = new StringTokenizer(Items, ",");
			
			while(st.hasMoreTokens()) { 
				String key = st.nextToken(); 
				
				Equipmentmaping equipmentMaping=new Equipmentmaping();
				//*************************************************
				logger.info("hi : " + key+" " + CID+" ");
				equipmentMaping.setParentID(equipmentService.getEquipments(key));
				equipmentMaping.setChildID(equipmentService.getEquipments(CID));
				//logger.info("hi : " + equipmentMaping.getChildID().getItemName() +"   "+equipmentMaping.getParentID().getItemName());
				//save data
				try {
					ID=equipmentMapingService.save(equipmentMaping);	
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					ID=(long) 0;
				}
				
				//
			}
		}
		
		//******EquipmentBulk********
		else if (ServiceType.equals("EquipmentsBulk")) {
			if(equipmentsBulkService.EquipmentsBulkget(packageService.getPackages(jsonobj.getString("PackageID")),equipmentService.getEquipments(jsonobj.getString("ItemID"))) == null){
				EquipmentsBulk equipmentsBulk=new EquipmentsBulk();
				Packages packages=null;
				try{
					packages =packageService.getPackages(jsonobj.getString("PackageID"));
					equipmentsBulk.setPackageID(packages);
					Equipments equipments=equipmentService.getEquipments(jsonobj.getString("ItemID"));
					equipmentsBulk.setEquipmentsId(equipments);
					equipmentsBulk.setQuantity(Integer.parseInt(jsonobj.getString("Quantity"),10));
					equipmentsBulk.setPrice(equipments.getPrice()*equipmentsBulk.getQuantity());
					
					
				}
				catch (JSONException e) {logger.info("Error : " + e.getMessage());}
				//save data
				try {
					ID =equipmentsBulkService.save( equipmentsBulk);
					List<EquipmentsBulk> equipmentmaping=equipmentsBulkService.getPackageBulk(packages);
					Long prices=(long) 0;
					for(int i=0;i<equipmentmaping.size();i++){
						prices+=equipmentmaping.get(i).getPrice();
						
					}
					packages.setPrice(prices);
					packageService.update(packages);
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					ID=(long) 0;
				}
			}
			else{
				
				EquipmentsBulk equipmentsBulk=equipmentsBulkService.EquipmentsBulkget(packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID"))), equipmentService.getEquipments(jsonobj.getString("ItemID")));
				equipmentsBulk.setQuantity(equipmentsBulk.getQuantity()+(Integer.parseInt(jsonobj.getString("Quantity"),10)));
				equipmentsBulk.setPrice((Long.parseLong(jsonobj.getString("Price"),10)*equipmentsBulk.getQuantity()));
				
				equipmentsBulkService.update(equipmentsBulk);
			}
		}
		//************************Package**************
		else if (ServiceType.equals("Package")) {
			
			String Bulk=request.getParameter("ID");
			
			if(packageService.getPackages(jsonobj.getString("PackageName"))==null){
				Packages NewPackage=new Packages();
				try {
					//*****Saving To Object******
					NewPackage.setPackageName(jsonobj.getString("PackageName"));
					NewPackage.setSummary(jsonobj.getString("Summery"));
					NewPackage.setFullDescription(jsonobj.getString("Full_Descrip"));
					NewPackage.setTecDescription(jsonobj.getString("Tec_Descrip"));
					NewPackage.setITICDescription(jsonobj.getString("ITIC_Descrip"));
					NewPackage.setPrice(Long.parseLong(jsonobj.getString("Price"),10));
					logger.info("Error : " + NewPackage.getDateCreated());
				} 
				catch (JSONException e) {
					logger.info("Error : " + e.getMessage());
					}
				Date date = new SimpleDateFormat(dateFormat).parse(jsonobj.getString("EOLDate"));
				/**********************************/
				try{
					NewPackage.setEOLDate(date);
				}
				catch (Exception e) {
					 logger.info("Error : " + e.getMessage());
				}
				//save data
				try {
					ID = packageService.save( NewPackage);		
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					ID=(long) 0;
				}
			
		
				/****************************************************************************************************/
				/****************************************************************************************************/
				/****************************************************************************************************/
				/****************************************************************************************************/
				/****************************************************************************************************/
				/****************************************************************************************************/
				
				logger.info("Json string retrived : " + Bulk);
				
				JSONArray jsonArray = null;
				//Create Json Array
				try {
					 jsonArray = new JSONArray(Bulk);
				}catch (JSONException e) {
					logger.info("Error JSON Array : " + e.getMessage());
				}
				logger.info("JSON Array lenth: +"+jsonArray.length());
				try {
					if(jsonArray.length()>1)
						jsonobj = (JSONObject)jsonArray.get(0);
					else
						jsonobj = (JSONObject)jsonArray.get(jsonArray.length()-1);
				} catch (JSONException e) {
					logger.info("Error JSON Object: " + e.getMessage());
				}
				
				if(equipmentsBulkService.EquipmentsBulkget(packageService.getPackages(jsonobj.getString("PackageID")),equipmentService.getEquipments(jsonobj.getString("ItemID"))) == null){
					EquipmentsBulk equipmentsBulk=new EquipmentsBulk();
					Packages packages=null;
					try{
						packages =packageService.getPackages(jsonobj.getString("PackageID"));
						equipmentsBulk.setPackageID(packages);
						Equipments equipments=equipmentService.getEquipments(jsonobj.getString("ItemID"));
						equipmentsBulk.setEquipmentsId(equipments);
						equipmentsBulk.setQuantity(Integer.parseInt(jsonobj.getString("Quantity"),10));
						equipmentsBulk.setPrice(equipments.getPrice()*equipmentsBulk.getQuantity());
						
						
					}
					catch (JSONException e) {logger.info("Error : " + e.getMessage());}
					//save data
					try {
						ID =equipmentsBulkService.save( equipmentsBulk);
						List<EquipmentsBulk> equipmentmaping=equipmentsBulkService.getPackageBulk(packages);
						Long prices=(long) 0;
						for(int i=0;i<equipmentmaping.size();i++){
							prices+=equipmentmaping.get(i).getPrice();
							
						}
						packages.setPrice(prices);
						packageService.update(packages);
					}catch (Exception e) {
						logger.info("Error : " + e.getMessage());
						ID=(long) 0;
					}
				}
				else{
					Equipments equipments=equipmentService.getEquipments(jsonobj.getString("ItemID"));
					EquipmentsBulk equipmentsBulk=equipmentsBulkService.EquipmentsBulkget(packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID"))), equipmentService.getEquipments(jsonobj.getString("ItemID")));
					equipmentsBulk.setQuantity(equipmentsBulk.getQuantity()+(Integer.parseInt(jsonobj.getString("Quantity"),10)));
					equipmentsBulk.setPrice(equipments.getPrice()*equipmentsBulk.getQuantity());
					
					equipmentsBulkService.update(equipmentsBulk);
				}
			
			}
			else{
				logger.info("Error : " + "Duplicate data entry (Same Package name in database )");
			}
		}
		//********ProjectItems**********
		else if (ServiceType.equals("ProjectItems")) {
			
			ProjectItems projectItems=new ProjectItems();
			ProjectItems obj=projectItemsService.get(projectService.getProjects(jsonobj.getString("ProjectID")), jsonobj.getString("OptionID"), jsonobj.getString("VersionID"), (jsonobj.getString("SiteID")),packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID")))) ;
			if(obj== null){
				logger.info("saving not Duplicate ");
				try{

					Projects projects=projectService.getProjects(jsonobj.getString("ProjectID"));
					Packages packages=packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID")));
					logger.info("Error : " + projects.getProjectName()+"  "+ packages.getPackageName());
					
					projectItems.setProjectId(projects);
					projectItems.setOpId(jsonobj.getString("OptionID"));
					projectItems.setVerId(jsonobj.getString("VersionID"));
					projectItems.setSiteId((jsonobj.getString("SiteID")));
					projectItems.setPackageId(packages);
					projectItems.setQuantity(Integer.parseInt(jsonobj.getString("Quantity")));
					projectItems.setPackageType(jsonobj.getString("PackageType"));
					projectItems.setPcakageUsege(jsonobj.getString("PcakageUsege"));
					Long price;
					try {
						price=(packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID"))).getPrice())*projectItems.getQuantity();
						
					} catch (Exception e) {
						price=(long) 0;
					}
					projectItems.setPrice(price);
				}catch (JSONException e) {
					logger.info("Error222 : " + e.getMessage());
					}
				
				logger.info("data  : " + projectItems.getPackageId().getPackageName() + "  "+projectItems.getProjectId().getProjectName());
				//save data
				try {
					
					ID = projectItemsService.save(projectItems);		
				}
				catch (Exception e) {
					logger.info("saving error : " + e.getMessage());
					ID=(long) 0;
				}
			}
			else{
				logger.info("saving Duplicate Update : ");
				obj.setQuantity((obj.getQuantity())+Integer.parseInt(jsonobj.getString("Quantity")));
				obj.setPrice(obj.getQuantity()*packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID"))).getPrice());
				obj.setPackageType(jsonobj.getString("PackageType"));
				obj.setPcakageUsege(jsonobj.getString("PcakageUsege"));
				projectItemsService.update(obj);
			}
			
		}
		//*********Project*********
		
		else if (ServiceType.equals("Projects")) {
			if(projectService.getProjects(jsonobj.getString("ProjectName")) == null){
				Projects projects =new Projects();
				projects.setCompany(jsonobj.getString("Company"));
				projects.setProjectName(jsonobj.getString("ProjectName"));
				
				try {
					ID =projectService.save(projects);		
				}catch (Exception e) {
					logger.info("Error : " + e.getMessage());
					ID=(long) 0;
				}
			}
			else{
				logger.info("Error : " + "Duplicate data entry (Same Project name in database )");
			}
		}
		
		//**********ItemType***********
		else if (ServiceType.equals("ItemType")) {
			ItemType NewitemType=new ItemType();
			try {
				
				//*****Saving To Object******
				NewitemType.setTypeName(jsonobj.getString("TypeName"));
				NewitemType.setAccsessLevel(Integer.parseInt((jsonobj.getString("AccsessLevel"))));
			} 
			catch (JSONException e) {logger.info("Error : " + e.getMessage());}
			//save data
			try {
				ID =itemTypeService.save(NewitemType);		
			}catch (Exception e) {
				logger.info("Error : " + e.getMessage());
				ID=(long) 0;
			}
		}
		//**********Nothing***********
		else {
			/****/
			System.out.println("This section is for Nothing to Save");
		}
		logger.info("new ID - " + ID);
	}
}
