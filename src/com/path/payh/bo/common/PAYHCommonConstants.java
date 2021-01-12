package com.path.payh.bo.common;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PAYHCommonConstants
{
	
	// LOV ID
    public static final BigDecimal LOV_TYPE_CONS_COMMON_STATUS = new BigDecimal(949);
    
    // IV CRUD VALUES
    public static final String IV_CRUD_MAINTENANCE = "R";
    public static final String IV_CRUD_APPROVE = "P";
    public static final String IV_CRUD_UPDATE_AFTER_APPROVE = "UP";
    public static final String IV_CRUD_SUSPENDED = "S";
    public static final String IV_CRUD_REACTIVATE = "RA";
    public static final String IV_CRUD_DELETED = "D";
    
    // Status
    public static final String STATUS_CREATED = "C";
    public static final String STATUS_MODIFIED = "M";
    public static final String STATUS_ACTIVE = "A";
    public static final String STATUS_DELETED = "D";
    public static final String STATUS_APPROVED = "P";
    public static final String STATUS_SUSPENDED = "S";
    public static final String STATUS_REACTIVATE = "RA";
    public static final String STATUS_APPROVE_REJECTED = "R";
    public static final String STATUS_UPDATE_AFTER_APPROVE = "UP";
    
    public static final boolean TRUE_BOOLEAN = true;
    public static final boolean FALSE_BOOLEAN = false;
        
    public static final String DYNAMIC_FILE_MESSAGE = "DYNAMIC_FILE_MESSAGE";
    public static final String DYNAMIC_FILE_TAGS = "DYNAMIC_FILE_TAGS";
    public static final String DYNAMIC_FILE_STRUCTURE = "DYNAMIC_FILE_STRUCTURE";
    public static final String IMCO_DYN_FILE_VALUES_TMP = "IMCO_DYN_FILE_VALUES_TMP";
    
    public static final BigDecimal PAYH_COMMON_STATUS_LOV = new BigDecimal(2004);
    public static final String STATUS_COLOR_CODE_B = "B";
    
	public static final List<String> payHubStatusLst = new ArrayList<String>();
   	static
   	{
   		payHubStatusLst.add("CREATED_BY," + STATUS_CREATED + ",CREATED_DATE");
   		payHubStatusLst.add("MODIFIED_BY," + STATUS_MODIFIED + ",MODIFIED_DATE");
   		payHubStatusLst.add("DELETED_BY," + STATUS_DELETED + ",DELETED_DATE");
   		payHubStatusLst.add("APPROVED_BY," + STATUS_APPROVED + ",APPROVED_DATE");
	}
    
    
}
