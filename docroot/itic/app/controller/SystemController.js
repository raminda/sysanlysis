/**
 * This is where all the event processing logic goes in And also the glue code
 */

Ext.define('New.controller.SystemController', {
	extend : 'Ext.app.Controller',

	views 	: ['Body','BodyView','CopyVersionView','ContentView','FormAddBulkDdView','FormAddEquipmentView','FormAddItemTypeView','FormAddPackageView','FormAddProjectsView','FormProjectDetailsView','FormsView','FormUpdateEquipment','frmProjects','FormUpdateItemType','FormUpdateProjects','FormUpdatePackage','GenerateExcel','GridEquipmentsBulkView','GridEquipmentView','GridItemTypeView','GridPackageView','GridProjectItems','GridProjectsItemsView','GridProjectView','GridView','imageView','MenuBarView','SlideMenuPanelsView','SMenuHomeView','SMenuProjectView','SMenuReportView','SMenuStoreView'],
	stores 	: ['my','GridStringStore','ProjectsStore','ProjectsStoreGrid','ProjectItemsStoreResult','ProjectItemsStoreGrid','ProjectItemsStoreGrid','ProjectItemsStore','ProjectItemsStore1','ProjectItemsStore2','ProjectItemsStore3','ProjectItemsStore4','PackageStore','ProjectsStore','PackageStoreGrid','EquipmentStoreGrid','EquipmentsMapStore','EquipmentStoreComp','ItemTypeStore','EquipmentStore','ItemTypeStoreGrid','EquipmentsBulkStore','EquipmentsBulkStoreGrid'],
	models 	: ['GridStringModel','SupportModel','EquipmentModel','EquipmentsBulkModel','GridStringModel','ItemTypeModel','ProjectItemsModel','ProjectsModel','EquipmentMapModel','PackageModel'],

	init : function() {
		this.control({

		});
	}
});
	/*views 	: [ 'BulkAddView','Body','BodyView','FormsView','FormProjectsAddView','FormEquipmentAddView','FormAddTypeView','FormPackageAddView','FormUserAddView','GridEquipmentsBulkView','GridItemTypeView','GridProjectsItemsView','GridProjectView','GridView','GridEquipmentView','GridPackageView','GridUserView','MenuBarView','OrderView','SMenuAccountView','SMenuHomeView','SMenuProjectView','SMenuReportView','SMenuStoreView','SlideMenuPanelsView'],
	stores 	: ['EquipmentsMapStore','EquipmentStoreComp','EquipmentStoreGrid','PackageStoreGrid','UserStoreGrid','ProjectsStoreGrid','ProjectItemsStoreGrid','ItemTypeStoreGrid','EquipmentsBulkStoreGrid' ,'SiteTypeStoreGrid','EquipmentStore','PackageStore','UserStore','ProjectsStore','ProjectItemsStore','ItemTypeStore','EquipmentsBulkStore' ,'SiteTypeStore'],
	models 	: ['EquipmentMapModel','EquipmentModel','PackageModel','UserModel' ,'ProjectsModel','ProjectItemsModel','ItemTypeModel','EquipmentsBulkModel','SiteTypeModel'],
*/


//***********************   ,'FormPacakgeItemsView'   ***********************   ,'GridEqDDView'
/*
 * 
 */