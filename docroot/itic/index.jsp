<%@ taglib uri="http://java.sun.com/portlet" prefix="portlet" %>
<portlet:defineObjects/>
<portlet:resourceURL var="SiteTypeStoreUrl" id="SiteTypeStoreUrl" escapeXml="false" />
<portlet:resourceURL var="ProjectItemsStoreUrl" id="ProjectItemsStoreUrl" escapeXml="false" />
<portlet:resourceURL var="EquipmentsBulkStoreUrl" id="EquipmentsBulkStoreUrl" escapeXml="false" />
<portlet:resourceURL var="ItemTypeStoreUrl" id="ItemTypeStoreUrl" escapeXml="false" />	
<portlet:resourceURL var="ProjectsStoreUrl" id="ProjectsStoreUrl" escapeXml="false" />
<portlet:resourceURL var="EquipmentStoreUrl" id="EquipmentStoreUrl" escapeXml="false" />
<portlet:resourceURL var="PackageStoreUrl" id="PackageStoreUrl" escapeXml="false" />	
<portlet:resourceURL var="UserStoreUrl" id="UserStoreUrl" escapeXml="false" />			
<portlet:resourceURL var="EquipmentsMapingStoreUrl" id="EquipmentsMapingStoreUrl" escapeXml="false" />	
<portlet:resourceURL var="ExcelUrl" id="ExcelUrl" escapeXml="false" />		
<portlet:resourceURL var="validate_url" id="validate_url" escapeXml="false" />	
<script type="text/javascript">
	/******************************** app ********************************/
	
		var new_namespace 		= "<portlet:namespace/>";
 		var Menu_div			= "<portlet:namespace/>-Menu-ext-div";
 		var Body_div 			= "<portlet:namespace/>-Body-ext-div";
 		//var Slide_div		 	= "<portlet:namespace/>-Slide-ext-div";
 		var Futter_div 			= "<portlet:namespace/>-Futter-ext-div"; 
 		
 	/******************************************* urls *******************************************************/
 	
	 	<%-- var UserGridUrl = "<%= renderResponse.encodeURL(UserGridUrl.toString()) %>";		
		var PackageGridUrl = "<%= renderResponse.encodeURL(PackageGridUrl.toString()) %>";	
		var ItemTypeGridUrl = "<%= renderResponse.encodeURL(ItemTypeGridUrl.toString()) %>";
		var EquipmentGridUrl = "<%= renderResponse.encodeURL(EquipmentGridUrl.toString()) %>"; --%>
		var validate_url	="<%= renderResponse.encodeURL(validate_url.toString())%>";
		var ExcelUrl	="<%= renderResponse.encodeURL(ExcelUrl.toString())%>";
		var EquipmentsMapingStoreUrl	="<%= renderResponse.encodeURL(EquipmentsMapingStoreUrl.toString())%>";
		var ProjectItemsStoreUrl	="<%= renderResponse.encodeURL(ProjectItemsStoreUrl.toString())%>";
		var EquipmentsBulkStoreUrl	="<%= renderResponse.encodeURL(EquipmentsBulkStoreUrl.toString())%>";
		var ItemTypeStoreUrl		="<%= renderResponse.encodeURL(ItemTypeStoreUrl.toString())%>";
		var PackageStoreUrl			="<%= renderResponse.encodeURL(PackageStoreUrl.toString())%>";
		var ProjectsStoreUrl	 	="<%= renderResponse.encodeURL(ProjectsStoreUrl.toString())%>";
		var EquipmentStoreUrl		="<%= renderResponse.encodeURL(EquipmentStoreUrl.toString())%>";
		var UserStoreUrl 			="<%= renderResponse.encodeURL(UserStoreUrl.toString())%>";	
		var SiteTypeStoreUrl 			="<%= renderResponse.encodeURL(SiteTypeStoreUrl.toString())%>";	
		
	/********************************* paths**********************************/
	
		var ext_path = "/SystemAnalyze-portlet/itic/ext-4.0/src";
  		var app_path = "/SystemAnalyze-portlet/itic/app";
  		
</script>

	<%-- <table>
		<tr>
			<td style="width: 25px"></td>
			<td><div id="<portlet:namespace />-Menu-ext-div" ></div></td>
			<td style="width: 25px"></td>
		</tr>
	</table>
<br>
	<table>
	 	<tr><td style="width: 25px"></td>
	   		<td style="width: 250px"><div id="<portlet:namespace />-Slide-ext-div"></div></td>
	    	<td ><div id="<portlet:namespace />-Body-ext-div"></div></td>
	    	<td style="width: 25px"></td>
	  	</tr>
	</table> --%>
	<div>
		<div id="<portlet:namespace />-Menu-ext-div" align="center"></div>
		<br>
		<div id="<portlet:namespace />-Body-ext-div" align="center"></div>
		<br>
		<div id="<portlet:namespace />-Futter-ext-div" align="center"></div>
	</div>
	
	
