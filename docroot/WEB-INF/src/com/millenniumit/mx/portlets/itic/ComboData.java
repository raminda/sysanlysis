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
public class ComboData {
	
	private String dateFormat  = "yyyy-MM-dd";
	private Logger logger = Logger.getLogger(ComboData.class);
	
	//Services Objects in Service class 
	
	private EquipmentsService equipmentService;

	private EquipmentsBulkService equipmentsBulkService;
	private ItemTypeService itemTypeService;
	private PackagesService packageService;
	private ProjectsService projectService;
	private ProjectItemsService projectItemsService;
	private EquipmentMapingService equipmentMapingService;
	
	public ComboData(EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService,EquipmentsBulkService equipmentsBulkService,ItemTypeService itemTypeService,PackagesService packageService,ProjectsService projectService,ProjectItemsService projectItemsService){
		
		
		this.equipmentService =equipmentService; 
		this.equipmentsBulkService=equipmentsBulkService;
		this.itemTypeService = itemTypeService;
		this.packageService =packageService ;
		this.projectService =projectService;
		this.projectItemsService = projectItemsService;
		this.equipmentMapingService=equipmentMapingService;
	}
	
	public ComboData(EquipmentsService equipmentService,EquipmentMapingService equipmentMapingService ,ItemTypeService itemTypeService){		
			
		this.equipmentService =equipmentService; 
		this.itemTypeService = itemTypeService;	
		this.equipmentMapingService=equipmentMapingService;
	}
	public ComboData(EquipmentsBulkService equipmentsBulkService,PackagesService packageService){		
		
		this.equipmentsBulkService=equipmentsBulkService;
		this.packageService =packageService ;
	}
	public ComboData(ItemTypeService itemTypeService){
		
		this.itemTypeService = itemTypeService;	
	}
	public ComboData(PackagesService packageService){
	
		this.packageService =packageService ;
	}
	public ComboData(ProjectsService projectService){
		
		this.projectService =projectService;
	}
	public ComboData(ProjectItemsService projectItemsService,ProjectsService projectService){
	
		this.projectItemsService = projectItemsService;
		this.projectService =projectService;
	}
	public ComboData(EquipmentMapingService equipmentMapingService){
		
		this.equipmentMapingService=equipmentMapingService;
	}


	
	public void Combo(ResourceRequest request, ResourceResponse response,String ServiceType) throws IOException{
		PrintWriter out = response.getWriter();
		//new Gson Object for getting String line to Json 
		Gson gson = new Gson();
		
		//*****equipment*******
		 if (ServiceType.equals("Equipment")) {	
			String jsonOb2="[";
			
			if(Long.parseLong(request.getParameter("value"))==1){
				 System.out.println("This section is for Parameter Equipment cmbo value is "+ request.getParameter("ID"));
				 // + 
				int value= itemTypeService.getItemType(request.getParameter("ID")).getAccsessLevel();
				System.out.println(request.getParameter("ID")+" "+value);
				 boolean bool=true;
				if(value==1){
					value=1;
					List<Equipments> lst = equipmentService.getBase(0);
						for(int i=0;i<lst.size();i++){
							//Equipments obj=lst.get(i);
							try{
								jsonOb2+="{ItemName: '" + ((Equipments) lst.get(i)).getItemName()+"'}";
							}catch (Exception e) {
								logger.info("Error : " + e.getMessage());
								jsonOb2+="'}";
								//bool=false;
							}
							System.out.println(jsonOb2);
							if(i<lst.size()-1 && bool){
								jsonOb2+=",";
							}
						}
						
						jsonOb2+="]";
				}	
				//gfdf
				else{
					value=3;
					jsonOb2+="{ItemName: 'This is a base Item'}]";
				}
			}
			else if(Long.parseLong(request.getParameter("value"))==2){
				 System.out.println("This section is for Parameter Equipment cmbo value is "+ request.getParameter("ID"));

				//
				 boolean bool=true;
				
					List<Equipments> lst = equipmentService.getBase(0);
						for(int i=0;i<lst.size();i++){
							//Equipments obj=lst.get(i);
							try{
								jsonOb2+="{ItemName: '" + ((Equipments) lst.get(i)).getItemName()+"'}";
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
				}
			else if(Long.parseLong(request.getParameter("value"))==3){
				 System.out.println("This section is for Parameter Equipment cmbo value is "+ request.getParameter("ID"));

				//
				 boolean bool=true;
				Long value =Long.parseLong(request.getParameter("ID"));
				
					/*List<Equipments> lst = equipmentService.getAll(itemTypeService.getItemTypes(value));*/
				//List <Equipments>lst=null;
				List <Equipmentmaping>list=equipmentMapingService.getEquipmentMapings(equipmentService.getEquipments(request.getParameter("ID2")),itemTypeService.getItemTypes(value));
				
						for(int i=0;i<list.size();i++){
							//Equipments obj=lst.get(i);
							Equipmentmaping objM=list.get(i);
							Equipments obj=objM.getChildID();
							try{
								jsonOb2+="{ ItemName: '" + obj.getItemName()+"',Summary:'"+obj.getSummary()+"',Price: '"+obj.getPrice()+"',Full_Descrip:'"+obj.getFull_Descrip()+"',ITIC_Descrip:'"+obj.getITIC_Descrip()+"',Tec_Descrip:'"+obj.getTec_Descrip()+"',EOLDate:'"+obj.getEOLDate()+"',date_logged:'"+obj.getDateModified()+"',date_modified:'"+obj.getDateLogged()+"',date_created:'"+obj.getDateCreated()+"',ID:'"+obj.getID()+"',ItemType:'"+obj.getItemType().getTypeName()+"'}";
								}catch (Exception e) {
									logger.info("Error : " + e.getMessage());
								jsonOb2+="'}";
								bool=false;
							}
							if(i<list.size()-1 && bool){
								jsonOb2+=",";
							}
						}
						
						jsonOb2+="]";
				}
			jsonOb2=linebracker(jsonOb2);
						out.println(jsonOb2);
			//gdfgdfgfd
		}
		//*****equipment Map*******
		else if (ServiceType.equals("EquipmentMap")) {	
			
			System.out.println("This section is for Parameter EquipmentMapService Update");
			
				
			
			
		}
		//******equipmentBulk********
		else if (ServiceType.equals("EquipmentsBulk")) {
			
			System.out.println("This section is for Parameter equipmentBulkService Combo");
			String jsonOb2=null;
			if(Long.parseLong(request.getParameter("ID"))==1){
				List<EquipmentsBulk>list=equipmentsBulkService.getPackageBulk(packageService.getPackages(request.getParameter("value")));
				int i=0;
				int j=0;
				
				while(j==0){
					try{
					EquipmentsBulk obj=list.get(i++);
					if(obj.getEquipmentsId().getItemType().getAccsessLevel()==0){
						j=1;
						jsonOb2="{ItemName : '" + obj.getEquipmentsId().getItemName()+"'}";
						System.out.println(jsonOb2);
					}
					else{
						j=0;
						
					}
					}catch (Exception e) {
						logger.info("Error : " + e.getMessage());
						j=1;
					}
					
				}
				jsonOb2=linebracker(jsonOb2);
				out.println(jsonOb2);
			}
			else if(Long.parseLong(request.getParameter("ID"))==2){
				List<EquipmentsBulk>lst=equipmentsBulkService.getPackageBulk(packageService.getPackages(request.getParameter("value")));
				Boolean bool=true;
				jsonOb2="[";
				for(int i=0;i<lst.size();i++){
					//Equipments obj=lst.get(i);
					EquipmentsBulk obj=lst.get(i);
					try{
						jsonOb2+="{ ItemID: '" + obj.getEquipmentsId().getItemName()+"',PackageID:'"+obj.getPackageID().getPackageName()+"',Price: '"+obj.getPrice()+"',Quantity:'"+obj.getQuantity()+"',date_logged:'"+obj.getDateModified()+"',date_modified:'"+obj.getDateLogged()+"',date_created:'"+obj.getDateCreated()+"',ID:'"+obj.getId()+"'}";
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
			
		}
		//************************Package**************
		else if (ServiceType.equals("Package")) {
			
			System.out.println("This section is for Parameter PackageService Combo");
			
		}
		//********ProjectItems**********
		else if (ServiceType.equals("ProjectItems")) {
			
			
				
			String a[] = new String[4];
			
			System.out.println("This section is for Parameter ProjectItemsService Combo");
			List<String> lst=null;
			
			//id value is for project options for Project ID
			 if(Long.parseLong(request.getParameter("value"))==1){
				 System.out.println("This section is for Parameter ProjectItemsService cmbo value is "+ request.getParameter("ID1"));
				
				//projectItems.setPackageType(jsonobj.getString("PackageType PcakageUsege"));projectItems.setPcakageUsege(jsonobj.getString("PcakageUsege")); 
				 lst = projectItemsService.getAllString(projectService.getProjects(request.getParameter("ID1")),a,1); 
				 boolean bool=true;
					String jsonOb2="[";
					for(int i=0;i<lst.size();i++){
						String obj=lst.get(i);
						try{
							jsonOb2+="{ ProjectID: '"+"',OptionID:'"+obj+"',VersionID: '"+"',SiteID:'"+"',PackageID:'"+"',Quantity:'"+"',PackageType :'"+"', PcakageUsege :'"+"',Price:'"+"',date_logged:'"+"',date_modified:'"+"',date_created:'"+"', ID:'"+"'}";
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
			 else if(Long.parseLong(request.getParameter("value"))==2){
				 a[0]=request.getParameter("ID2");
				 lst = projectItemsService.getAllString(projectService.getProjects(request.getParameter("ID1")),a,2); 
				 boolean bool=true;
					String jsonOb2="[";
					for(int i=0;i<lst.size();i++){
						String obj=lst.get(i);
						try{
							jsonOb2+="{ ProjectID: '"+"',OptionID:'"+"',VersionID: '"+obj+"',SiteID:'"+"',PackageID:'"+"',Quantity:'"+"',PackageType :'"+"', PcakageUsege :'"+"',Price:'"+"',date_logged:'"+"',date_modified:'"+"',date_created:'"+"', ID:'"+"'}";
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
			 else if(Long.parseLong(request.getParameter("value"))==3){
				 a[0]=request.getParameter("ID2");
				 a[1]=request.getParameter("ID3");
				 lst = projectItemsService.getAllString(projectService.getProjects(request.getParameter("ID1")),a,3); 
				boolean bool=true;
					String jsonOb2="[";
					for(int i=0;i<lst.size();i++){
						String obj=lst.get(i);
						try{
							jsonOb2+="{ ProjectID: '"+"',OptionID:'"+"',VersionID: '"+"',SiteID:'"+obj+"',PackageID:'"+"',Quantity:'"+"',PackageType :'"+"', PcakageUsege :'"+"',Price:'"+"',date_logged:'"+"',date_modified:'"+"',date_created:'"+"', ID:'"+"'}";
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
			 else if(Long.parseLong(request.getParameter("value"))==4){
				 a[0]=request.getParameter("ID2");
				 a[1]=request.getParameter("ID3");
				 a[2]=request.getParameter("ID4");
				 lst = projectItemsService.getAllString(projectService.getProjects(request.getParameter("ID1")),a,4); 
				boolean bool=true;
					String jsonOb2="[";
					for(int i=0;i<lst.size();i++){
						String obj=lst.get(i);
						try{
							jsonOb2+="{ ProjectID: '"+"',OptionID:'"+"',VersionID: '"+"',SiteID:'"+"',PackageID:'"+"',Quantity:'"+"',PackageType :'"+obj+"', PcakageUsege :'"+"',Price:'"+"',date_logged:'"+"',date_modified:'"+"',date_created:'"+"', ID:'"+"'}";
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
			 else if(Long.parseLong(request.getParameter("value"))==8 ||Long.parseLong(request.getParameter("value"))==5||Long.parseLong(request.getParameter("value"))==6||Long.parseLong(request.getParameter("value"))==7){
				 a[0]=request.getParameter("ID2");
				 a[1]=request.getParameter("ID3");
				 a[2]=request.getParameter("ID4");
				 List<ProjectItems> jsonOb1=null;
				 logger.info(request.getParameter("value")+" vcbcg "+ a[1] );
				 if(Long.parseLong(request.getParameter("value"))==5)
					 jsonOb1 = projectItemsService.getAll(projectService.getProjects(request.getParameter("ID1")),a[0],a[1],a[2]); 
				 else if(Long.parseLong(request.getParameter("value"))==6)
					 jsonOb1= projectItemsService.getAll(projectService.getProjects(request.getParameter("ID1")),a[0],a[1]);
				 else if(Long.parseLong(request.getParameter("value"))==7)
					 jsonOb1= projectItemsService.getAll(projectService.getProjects(request.getParameter("ID1")),a[0]); 
				 else if(Long.parseLong(request.getParameter("value"))==8)
					 jsonOb1= projectItemsService.getAll(projectService.getProjects(request.getParameter("ID1"))); 
				 
			
			 
				 
				 boolean bool=true;
					String jsonOb2="[";
					for(int i=0;i<jsonOb1.size();i++){
						ProjectItems obj=jsonOb1.get(i);
						try{
							jsonOb2+="{ ProjectID: '" + obj.getProjectId().getProjectName()+"',OptionID:'"+obj.geOptId()+"',VersionID: '"+obj.getVerId()+"',SiteID:'"+obj.getSiteId()+"',PackageID:'"+obj.getPackageId().getPackageName()+"',Quantity:'"+obj.getQuantity()+"',PackageType :'"+obj.gePackageType()+"', PcakageUsege :'"+obj.getPcakageUsege()+"',Price:'"+obj.getBPrice()+"',date_logged:'"+obj.getDateLogged()+"',date_modified:'"+obj.getDateModified()+"',date_created:'"+obj.getDateCreated()+"', ID:'"+obj.getId()+"'}";
							}
						catch (Exception e) {
							logger.info("Error : " + e.getMessage());
							jsonOb2+="'}";
							bool=false;
						}
						if(i<jsonOb1.size()-1 && bool){
							jsonOb2+=",";
						}
					}
					
					jsonOb2+="]";
					System.out.println(jsonOb2);
					jsonOb2=linebracker(jsonOb2);
					out.println(jsonOb2);
			 }
			 else{
				 out.println("");
			 }
			 
		}
		//*********Project*********
		else if (ServiceType.equals("Projects")){
			
			System.out.println("This section is for Parameter ProjectsService Combo2");
			List<Projects> lst=null;
			//value =1 means select projects for regular company 
			//System.out.println(request.getParameter("value"));
			
			if(Long.parseLong(request.getParameter("value"))==1){
				lst = (List<Projects>) projectService.getCompany(request.getParameter("ID"));
			}else{
				System.out.println(request.getParameter("value"));
				lst = projectService.getProjects();
			}
			out.println(gson.toJson(lst));
			
		}
		//**********ItemType***********
		else if (ServiceType.equals("ItemType")) {
			
			System.out.println("This section is for Parameter ItemTypeService Combo");
			List<ItemType> lst= itemTypeService.getAll(Integer.parseInt(request.getParameter("ID")));
			out.println(gson.toJson(lst));
		}
		else if (ServiceType.equals("SiteType")) {
			
			System.out.println("This section is for Parameter ItemTypeService Combo");
			
		}
		//**********Nothing***********
		else {
			System.out.println("This section is for Nothing but Combo");
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
