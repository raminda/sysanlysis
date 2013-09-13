package com.millenniumit.mx.portlets.itic;



import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;

import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import jxl.read.biff.BiffException;
import jxl.write.WriteException;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.portlet.context.PortletApplicationContextUtils;
import org.json.JSONException;

import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.util.bridges.mvc.MVCPortlet;
import com.millenniumit.mx.data.itic.domain.Versions_details;
import com.millenniumit.mx.data.itic.service.EquipmentMapingService;
import com.millenniumit.mx.data.itic.service.EquipmentsBulkService;
import com.millenniumit.mx.data.itic.service.EquipmentsService;
import com.millenniumit.mx.data.itic.service.ItemTypeService;
import com.millenniumit.mx.data.itic.service.PackagesService;
import com.millenniumit.mx.data.itic.service.ProjectItemsService;
import com.millenniumit.mx.data.itic.service.ProjectsService;
import com.millenniumit.mx.data.itic.service.Versions_detailsService;


@SuppressWarnings("unused")
public class IticSystemPortlet  extends MVCPortlet {

	
	
	//private String dateFormat  = "yyyy-MM-dd";
	private Logger logger = Logger.getLogger(IticSystemPortlet.class);
	
	//Services Objects in Service class 
	EquipmentsService equipmentService;
	EquipmentsBulkService equipmentsBulkService;
	ItemTypeService itemTypeService;
	PackagesService packageService;
	ProjectsService projectService;
	ProjectItemsService projectItemsService;
	EquipmentMapingService equipmentMapingService;
	Versions_detailsService versions_detailsService;
	CopyData copyData;

	@Override
	public void doView(RenderRequest renderRequest,RenderResponse renderResponse) throws IOException, PortletException {

		ApplicationContext springCtx = PortletApplicationContextUtils.getWebApplicationContext(getPortletContext());
		
		//Service Objects  initializing Using Application.xml

		equipmentService = (EquipmentsService) springCtx.getBean("EquipmentsService");
		equipmentsBulkService = (EquipmentsBulkService) springCtx.getBean("EquipmentsBulkService");
		equipmentMapingService=(EquipmentMapingService)springCtx.getBean("EquipmentMapingService");
		itemTypeService = (ItemTypeService) springCtx.getBean("ItemTypeService");
		packageService = (PackagesService) springCtx.getBean("PackagesService");
		projectService = (ProjectsService) springCtx.getBean("ProjectsService");
		projectItemsService = (ProjectItemsService) springCtx.getBean("ProjectItemsService");
		versions_detailsService = (Versions_detailsService) springCtx.getBean("Versions_detailsService");
		
		super.doView(renderRequest, renderResponse);
	}
	//Handling Ajax Requests in Client Side
	
	@Override
	public void serveResource(ResourceRequest request, ResourceResponse response)throws IOException, PortletException {		
		UpdateData updateData=null;
		ComboData comboData=null;
		GridData gridData=null;
		SaveData saveData=null;
		DeleteData deleteData=null;
		ExcelCreator excelCreator=null;
		
		response.setContentType("application/json");
		String resourceID = request.getResourceID();

	
		/********************************************************************************************************************************************																	Form navigator
		*********************************************************************************************************************************************/
	
		String ItemName = null;
		//***********User**********
		
		//*********Equipment***********
		if (resourceID.equals("EquipmentStoreUrl")) {
			ItemName="Equipment";
			updateData=new UpdateData(equipmentService,equipmentMapingService,itemTypeService);
			comboData=new ComboData(equipmentService,equipmentMapingService,itemTypeService);
			gridData=new GridData(equipmentService);
			saveData=new SaveData(equipmentService,equipmentMapingService,itemTypeService);
			deleteData=new DeleteData(equipmentService);
		}
		//********EquipmentBulk**********
		else if (resourceID.equals("EquipmentsBulkStoreUrl")) {
			ItemName="EquipmentsBulk";
			updateData=new UpdateData(equipmentsBulkService,packageService);
			comboData=new ComboData(equipmentsBulkService,packageService);
			gridData=new GridData(equipmentsBulkService);
			saveData=new SaveData(equipmentsBulkService,packageService,equipmentService);
			deleteData=new DeleteData(equipmentsBulkService);
		}
		
		//********EquipmentMaping********
		else if (resourceID.equals("EquipmentsMapingStoreUrl")) {
			ItemName="EquipmentMap";
			
			updateData=new UpdateData(equipmentMapingService);
			comboData=new ComboData(equipmentMapingService);
			gridData=new GridData(equipmentMapingService);
			saveData=new SaveData(equipmentMapingService);
			deleteData=new DeleteData(equipmentMapingService);
		}
		//************Package**************
		else if (resourceID.equals("PackageStoreUrl")) {	
			ItemName="Package";
			updateData=new UpdateData(packageService);
			comboData=new ComboData(packageService);
			gridData=new GridData(packageService);
			saveData=new SaveData(packageService,equipmentsBulkService,equipmentService);
			deleteData=new DeleteData(packageService);
		}
		//********ProjectItems**********
		else if (resourceID.equals("ProjectItemsStoreUrl")) {		
			ItemName="ProjectItems";
			updateData=new UpdateData(projectItemsService);
			comboData=new ComboData(projectItemsService,projectService);
			gridData=new GridData(projectItemsService);
			saveData=new SaveData(projectItemsService,projectService,packageService);
			deleteData=new DeleteData(projectItemsService);
		}
		//*********Project*********
		else if (resourceID.equals("ProjectsStoreUrl")) {	
			ItemName="Projects";
			updateData=new UpdateData(projectService);
			comboData=new ComboData(projectService);
			gridData=new GridData(projectService);
			saveData=new SaveData(projectService);
			deleteData=new DeleteData(projectService);
		}
		//**********ItemType***********
		else if (resourceID.equals("ItemTypeStoreUrl")) {	
			ItemName="ItemType";
			updateData=new UpdateData(itemTypeService);
			comboData=new ComboData(itemTypeService);
			gridData=new GridData(itemTypeService);
			saveData=new SaveData(itemTypeService);
			deleteData=new DeleteData(itemTypeService);
		}
		
		else if (resourceID.equals("ExcelUrl")) {
			ItemName="excel";
			try {
				excelCreator=new ExcelCreator(equipmentService, equipmentsBulkService, itemTypeService, packageService, projectService, projectItemsService);	
			} catch (Exception e) {
				logger.info("Error  : " + e.getMessage());
			} 		
		}
		else if(resourceID.equals("validate_url")){
			ItemName="validate";
			ValidateData validateData=new ValidateData();
			try {
				validateData.vaidate(request, response);
			} catch (PortalException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SystemException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		/********************************************************************************************************************************************
																Navigator Part
		*********************************************************************************************************************************************/
		
		if (request.getParameter("purpose").equals("New")) {
			System.out.println("This section is for Navigate "+ ItemName+" for New");
			
			try {
				saveData.NewData(request, response,ItemName);
			} catch (NumberFormatException e) {
				logger.info("Error : " + e.getMessage());
			} catch (JSONException e) {
				logger.info("Error : " + e.getMessage());
			} catch (ParseException e) {
				logger.info("Error : " + e.getMessage());
			}
		}
		else if(request.getParameter("purpose").equals("delete")){
			System.out.println("This section is for Navigate "+ ItemName+" for Delete");
			deleteData.DeleteDB(request, response,ItemName);
		}
		else if(request.getParameter("purpose").equals("Grid")){
			System.out.println("This section is for Navigate "+ ItemName+" for Grid");
			gridData.gridLoad(request,  response, ItemName);
		}
		else if(request.getParameter("purpose").equals("Combo")){
			System.out.println("This section is for Navigate "+ ItemName+" for Combo");
			comboData.Combo(request,  response, ItemName);
		}
		else if(request.getParameter("purpose").equals("Update")){
			System.out.println("This section is for Navigate "+ ItemName+" for Update");
			
			try {
				
				updateData.UpdateDB(request,  response, ItemName);
			} catch (JSONException e) {
				logger.info("Error : " + e.getMessage());
			} catch (ParseException e) {
				logger.info("Error : " + e.getMessage());
			}
			
		}
		else if(request.getParameter("purpose").equals("ExcelCreate")){
			try {
				
				String Company=request.getParameter("ID1");
				String Option=request.getParameter("ID2");
				String Vertion=request.getParameter("ID3");
				
				excelCreator.myxcel(request,  response,Company, Option, Vertion);
			} catch (WriteException e) {
				logger.info("Error : " + e.getMessage());
			} catch (BiffException e) {
				logger.info("Error : " + e.getMessage());
			}
			
		}
		else if(request.getParameter("purpose").equals("Copy")){
				System.out.println("This section is for Navigate "+ ItemName+" for Copy");
			
			try {
				copyData=new CopyData(projectItemsService, projectService);
				copyData.CopyDataRows(request,  response, ItemName);
			} catch (JSONException e) {
				logger.info("Error : " + e.getMessage());
			} catch (ParseException e) {
				logger.info("Error : " + e.getMessage());
			}
		}
		/*else{
			PrintWriter out = response.getWriter();
			out.println("");
		}*/
		updateData=null;
		comboData=null;
		gridData=null;
		saveData=null;
		deleteData=null;
		excelCreator=null;
	}
}