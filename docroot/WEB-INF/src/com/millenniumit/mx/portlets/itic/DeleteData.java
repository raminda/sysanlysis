package com.millenniumit.mx.portlets.itic;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

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

public class DeleteData {
	
	//private Logger logger = Logger.getLogger(IticSystemPortlet.class);
	//Services Objects in Service class 
	
	private EquipmentsService equipmentService;
	private EquipmentsBulkService equipmentsBulkService;
	private ItemTypeService itemTypeService;
	private PackagesService packageService;
	private ProjectsService projectService;
	private ProjectItemsService projectItemsService;
	private EquipmentMapingService equipmentMapingService;
	
	/*public DeleteData(AcUserService acUserService,EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,EquipmentsBulkService equipmentsBulkService,ItemTypeService itemTypeService,PackagesService packageService,ProjectsService projectService,ProjectItemsService projectItemsService){
		
		
		this.equipmentService =equipmentService; 
		this.equipmentsBulkService=equipmentsBulkService;
		this.itemTypeService = itemTypeService;
		this.packageService =packageService ;
		this.projectService =projectService;
		this.projectItemsService = projectItemsService;
		this.equipmentMapingService=equipmentMapingService;
		this.acUserService=acUserService;
	}*/
	
	public DeleteData(EquipmentsService equipmentService){		
			
		this.equipmentService =equipmentService; 
	}
	public DeleteData(EquipmentsBulkService equipmentsBulkService){		
		
		this.equipmentsBulkService=equipmentsBulkService;
	}
	public DeleteData(ItemTypeService itemTypeService){
		
		this.itemTypeService = itemTypeService;	
	}
	public DeleteData(PackagesService packageService){
	
		this.packageService =packageService ;
	}
	public DeleteData(ProjectsService projectService){
		
		this.projectService =projectService;
	}
	public DeleteData(ProjectItemsService projectItemsService){
	
		this.projectItemsService = projectItemsService;
	}
	public DeleteData(EquipmentMapingService equipmentMapingService){
		
		this.equipmentMapingService=equipmentMapingService;
	}

	
	public void DeleteDB(ResourceRequest request, ResourceResponse response,String ServiceType){
		
		
		//*****equipment*******
		 if (ServiceType.equals("Equipment")) {
			
			Equipments newEquipments=new Equipments();
			newEquipments=equipmentService.getEquipments(Long.parseLong(request.getParameter("value")));
			equipmentService.delete(newEquipments);
		}
		//******equipmentBulk********
		else if (ServiceType.equals("EquipmentsBulk")) {
			
			EquipmentsBulk newEquipmentBulk=new EquipmentsBulk();
			newEquipmentBulk=equipmentsBulkService.getEquipmentsBulks(Long.parseLong(request.getParameter("value")));
			equipmentsBulkService.delete(newEquipmentBulk);
		}
		//*****equipment Map*******
		else if (ServiceType.equals("EquipmentMap")) {	
			
			
			Equipmentmaping equipmentMaping=new Equipmentmaping();
			equipmentMaping =equipmentMapingService.getEquipmentMapings(Long.parseLong(request.getParameter("value")));
			equipmentMapingService.delete(equipmentMaping);
			
		}
		//************************Package**************
		else if (ServiceType.equals("Package")) {
			
			Packages newPackage=new Packages();
			newPackage = packageService.getPackagess(Long.parseLong(request.getParameter("value")));
			packageService.delete(newPackage);
			
		}
		//********ProjectItems**********
		else if (ServiceType.equals("ProjectItems")) {
			
			ProjectItems newProjectItems=new ProjectItems();
			newProjectItems=projectItemsService.getProjectItemss(Long.parseLong(request.getParameter("value")));
			projectItemsService.delete(newProjectItems);
			
		}
		//*********Project*********
		else if (ServiceType.equals("Projects")) {
			
			Projects newprojects=new Projects();
			newprojects=projectService.getProjects(Long.parseLong(request.getParameter("value")));
			projectService.delete(newprojects);	
			
		}
		//**********ItemType***********
		else if (ServiceType.equals("ItemType")) {
			
			ItemType newItemType=new ItemType();
			newItemType=itemTypeService.getItemTypes(Long.parseLong(request.getParameter("value")));
			itemTypeService.delete(newItemType);
			
		}
		//**********Nothing***********
		else {
			
			System.out.println("This section is for Nothing for Delete");
		}
	}
}
