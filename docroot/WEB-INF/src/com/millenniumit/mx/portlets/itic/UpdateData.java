package com.millenniumit.mx.portlets.itic;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;


import org.apache.log4j.Logger;
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

public class UpdateData {
	private String dateFormat  = "yyyy-MM-dd";
	private Logger logger = Logger.getLogger(UpdateData.class);
	private JsonCreator jsonCreator=new JsonCreator();
	//Services Objects in Service class 
	
	private EquipmentsService equipmentService;
	private EquipmentsBulkService equipmentsBulkService;
	private ItemTypeService itemTypeService;
	private PackagesService packageService;
	private ProjectsService projectService;
	private ProjectItemsService projectItemsService;
	private EquipmentMapingService equipmentMapingService;

	public UpdateData(EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,EquipmentsBulkService equipmentsBulkService,ItemTypeService itemTypeService,PackagesService packageService,ProjectsService projectService,ProjectItemsService projectItemsService){
		
		
		this.equipmentService =equipmentService; 
		this.equipmentsBulkService=equipmentsBulkService;
		this.itemTypeService = itemTypeService;
		this.packageService =packageService ;
		this.projectService =projectService;
		this.projectItemsService = projectItemsService;
		this.equipmentMapingService=equipmentMapingService;
	}
	
	public UpdateData(EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,ItemTypeService itemTypeService){		
			
		this.equipmentService =equipmentService; 
		this.equipmentMapingService=equipmentMapingService;
		this.itemTypeService=itemTypeService;
	}
	public UpdateData(EquipmentsBulkService equipmentsBulkService,PackagesService packageService){		
		
		this.equipmentsBulkService=equipmentsBulkService;
		this.packageService =packageService ;
	}
	public UpdateData(ItemTypeService itemTypeService){
		
		this.itemTypeService = itemTypeService;	
	}
	public UpdateData(PackagesService packageService){
	
		this.packageService =packageService ;
	}
	public UpdateData(ProjectsService projectService){
		
		this.projectService =projectService;
	}
	public UpdateData(ProjectItemsService projectItemsService){
	
		this.projectItemsService = projectItemsService;
	}
	public UpdateData(EquipmentMapingService equipmentMapingService){
		
		this.equipmentMapingService=equipmentMapingService;
	}


	public void UpdateDB(ResourceRequest request, ResourceResponse response,String ServiceType) throws JSONException, ParseException{
		Calendar calendar = Calendar.getInstance();
		JSONObject jsonobj=jsonCreator.JsonCreat(request, response,ServiceType);
		

		//*****equipment*******
		if (ServiceType.equals("Equipment")) {	
			
			if(request.getParameter("value")=="base"){
				System.out.println("This section is for Parameter equipmentService Update New");
				Equipments NewEquipment=equipmentService.getEquipments(Long.parseLong(jsonobj.getString("ID")));
				NewEquipment.setItemName(jsonobj.getString("ItemName"));
				NewEquipment.setItemType(itemTypeService.getItemType(jsonobj.getString("ItemType")));
				NewEquipment.setSummary(jsonobj.getString("Summary"));
				NewEquipment.setFull_Descrip(jsonobj.getString("Full_Descrip"));
				NewEquipment.setTec_Descrip(jsonobj.getString("Tec_Descrip"));
				NewEquipment.setITIC_Descrip(jsonobj.getString("ITIC_Descrip"));
				NewEquipment.setPrice(Long.parseLong(jsonobj.getString("Price"),10));
				NewEquipment.setDateModified(calendar.getTime());
			//NewEquipment.setEOLDate(jsonobj.getString("EOLDate"));
				equipmentService.update(NewEquipment);
			}
			else if(request.getParameter("value")!="base"){
				System.out.println("This section is for Parameter equipmentService Update Delete");
				Equipments NewEquipment=equipmentService.getEquipments(Long.parseLong(jsonobj.getString("ID")));
				equipmentService.delete(NewEquipment);
				NewEquipment=new Equipments();
				NewEquipment.setID(Long.parseLong(jsonobj.getString("ID")));
				NewEquipment.setItemName(jsonobj.getString("ItemName"));
				NewEquipment.setItemType(itemTypeService.getItemType(jsonobj.getString("ItemType")));
				NewEquipment.setSummary(jsonobj.getString("Summary"));
				NewEquipment.setFull_Descrip(jsonobj.getString("Full_Descrip"));
				NewEquipment.setTec_Descrip(jsonobj.getString("Tec_Descrip"));
				NewEquipment.setITIC_Descrip(jsonobj.getString("ITIC_Descrip"));
				NewEquipment.setPrice(Long.parseLong(jsonobj.getString("Price"),10));
				NewEquipment.setDateModified(calendar.getTime());
				
				Date date = new SimpleDateFormat(dateFormat).parse(jsonobj.getString("EOLDate"));
				/**********************************/
				try{
					NewEquipment.setEOLDate(date);
				}
				catch (Exception e) {
					 logger.info("Error : " + e.getMessage());
				}
				equipmentService.save(NewEquipment);
				
				/*************************************EOLDate************************************
				 *
				 * */
				Long CID=(long) 1;
			
				try {
					
					CID=Long.parseLong(jsonobj.getString("ID"));
					
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
						equipmentMapingService.save(equipmentMaping);	
					}catch (Exception e) {
						logger.info("Error : " + e.getMessage());
					}
					
					//
				}
				/**
				 * *************************************************************************************************************************************************/
			}
			
		}
		//*****equipment Map*******
		else if (ServiceType.equals("EquipmentMap")) {	
			
			System.out.println("This section is for Parameter EquipmentMapService Update");
			
		}
		//******equipmentBulk********
		else if (ServiceType.equals("EquipmentsBulk")) {
			EquipmentsBulk equipmentsBulk=equipmentsBulkService.EquipmentsBulkget(packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID"))), equipmentService.getEquipments(jsonobj.getString("ItemID")));
			equipmentsBulk.setQuantity(equipmentsBulk.getQuantity()+(Integer.parseInt(jsonobj.getString("Quantity"),10)));
			equipmentsBulk.setPrice((Long.parseLong(jsonobj.getString("Price"),10)*equipmentsBulk.getQuantity()));
			
			equipmentsBulkService.update(equipmentsBulk);
			Packages packages =packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID")));
			System.out.println("This section is for Parameter equipmentBulkService Update");
			List<EquipmentsBulk> equipmentmaping=equipmentsBulkService.getPackageBulk(packages);
			Long prices=(long) 0;
			for(int i=0;i<equipmentmaping.size();i++){
				prices+=equipmentmaping.get(i).getPrice();
				
			}
			packages.setPrice(prices);
			packageService.update(packages);
			
		}
		//************************Package**************
		else if (ServiceType.equals("Package")) {
			
			System.out.println("This section is for Parameter PackageService Update");
			Packages packages= packageService.getPackagess(Long.parseLong(jsonobj.getString("ID")));
			
			packages.setDateModified(calendar.getTime());
			packages.setPackageName(jsonobj.getString("PackageName"));
			packages.setSummary(jsonobj.getString("Summery"));
			packages.setFullDescription(jsonobj.getString("Full_Descrip"));
			packages.setTecDescription(jsonobj.getString("Tec_Descrip"));
			packages.setITICDescription(jsonobj.getString("ITIC_Descrip"));
			packages.setPrice(Long.parseLong(jsonobj.getString("Price"),10));
			
			Date date = new SimpleDateFormat(dateFormat).parse(jsonobj.getString("EOLDate"));
			/**********************************/
			try{
				packages.setEOLDate(date);
			}
			catch (Exception e) {
				 logger.info("Error : " + e.getMessage());
			}
			packageService.update(packages);
		}
		//********ProjectItems**********
		else if (ServiceType.equals("ProjectItems")) {
			
			System.out.println("This section is for Parameter ProjectItemsService Update");
			ProjectItems projectItems=projectItemsService.getProjectItemss(Long.parseLong(jsonobj.getString("ID"))) ;
			projectItems.setPackageType(jsonobj.getString("PackageType"));
			projectItems.setPcakageUsege(jsonobj.getString("PcakageUsege"));
			projectItems.setQuantity(Integer.parseInt(jsonobj.getString("Quantity")));
			projectItems.setPrice(projectItems.getQuantity()*packageService.getPackagess(Long.parseLong(jsonobj.getString("PackageID"))).getPrice());
			projectItems.setDateModified(calendar.getTime());
			
			projectItemsService.update(projectItems);
			
			
		}
		//*********Project*********
		else if (ServiceType.equals("Projects")) {
			
			System.out.println("This section is for Parameter ProjectsService Update");
			Projects projects =projectService.getProjects(Long.parseLong(jsonobj.getString("ID")));
			projects.setCompany(jsonobj.getString("Company"));
			projects.setProjectName(jsonobj.getString("ProjectName"));
			projects.setDateModified(calendar.getTime());
			projectService.update(projects);
		}
		//**********ItemType***********
		else if (ServiceType.equals("ItemType")) {
			
			System.out.println("This section is for Parameter ItemTypeService Update");
			ItemType itemType=itemTypeService.getItemTypes(Long.parseLong(jsonobj.getString("ID")));
			if(itemType!=null && (Integer.parseInt(jsonobj.getString("AccsessLevel"))==0||Integer.parseInt(jsonobj.getString("AccsessLevel"))==1) && jsonobj.getString("TypeName")!=null){
				itemType.setAccsessLevel(Integer.parseInt(jsonobj.getString("AccsessLevel")));
				itemType.setDateModified(calendar.getTime());
				itemType.setTypeName(jsonobj.getString("TypeName"));
				itemTypeService.update(itemType);
			}
			else{
				System.out.println("Error ; In valide data");
			}
			
		}
		//**********Nothing***********
		else {
			System.out.println("This section is for Nothing but Combo");
			
		}
	}
}
