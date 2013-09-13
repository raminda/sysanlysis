package com.millenniumit.mx.portlets.itic;

import java.io.IOException;
import java.io.PrintWriter;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.apache.log4j.Logger;

import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.portal.model.User;
import com.liferay.portal.service.UserLocalServiceUtil;

public class ValidateData {
	private static String ADMIN_USER_ROLE = "administrator";
	private static String DEFAULT_USER_ROLE = "power-user"; 

	// any authenticated 
	private Logger logger = Logger.getLogger(ValidateData.class);
	
	public void vaidate(ResourceRequest request, ResourceResponse response) throws IOException, PortalException, SystemException{
		PrintWriter out = response.getWriter();
		long userID=Long.parseLong(request.getRemoteUser());
		
		User user = UserLocalServiceUtil.getUser(userID);
		logger.info("User  : " +user);
		if (request.isUserInRole(ADMIN_USER_ROLE)) {
			logger.info("User  : " +"ID level is : ADMIN_USER_ROLE  "+request.getUserPrincipal() );
			out.println(0);
		}
		 else if (request.isUserInRole(DEFAULT_USER_ROLE)) {
			 logger.info("User  : " +"ID level is DEFAULT_USER_ROLE : "+request.getUserPrincipal() );
			 out.println(1);
		 }
		 else{
			 logger.info("User  : "+"ID level is :  Gest_USER_ROLE "+request.getUserPrincipal() );
			 out.println(2);
		 }
	}
}
