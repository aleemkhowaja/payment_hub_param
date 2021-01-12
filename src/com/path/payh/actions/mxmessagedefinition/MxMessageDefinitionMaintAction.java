package com.path.payh.actions.mxmessagedefinition;

import java.util.ArrayList;
import java.util.List;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.vo.GridUpdates;
import com.path.payh.actions.common.base.PAYHBaseAction;
import com.path.payh.bo.common.PAYHCommonConstants;
import com.path.payh.bo.mxmessagedefinition.MxMessageDefinitionBO;
import com.path.payh.bo.mxmessagedefinition.MxMessageDefinitionConstants;
import com.path.payh.vo.mxmessagedefinition.MxMessageDefinitionCO;
import com.path.payh.vo.mxmessagedefinition.MxMessageDefinitionSC;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.mxmessageparser.TagsCo;
/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * MxMessageDefinitionMaintAction.java used to
 */
public class MxMessageDefinitionMaintAction extends PAYHBaseAction
{
	private  MxMessageDefinitionCO mxMessageDefinitionCO = new MxMessageDefinitionCO();
	private  MxMessageDefinitionBO mxMessageDefinitionBO;
	private  MxMessageDefinitionSC criteria = new  MxMessageDefinitionSC();
	private List<TagsCo> tagsCos = new ArrayList<TagsCo>();
	private List<SelectCO> loadFromList;
	

   /**
    * Load MX Message Definition Page
    */
    public String loadMxMessageDefinitionPage()
    {
		try
		{
		    set_searchGridId("mxMessageDefinitionGridTbl_Id");
		    set_showNewInfoBtn("true");
		    set_showSmartInfoBtn("false");
		    set_enableAudit(true);
		    
		    /**
		     * fill dropdown of screen
		     */
		    fillDropDown();
		}
		catch(Exception ex)
		{
		    handleException(ex, null, null);
		}
	return "mxMessageDefinitionList";
    }
    
    
	/**
	 * return Sub Grid Page while clcik the + button of any parent row
	 * @return
	 */
	public String returnSubGridPage()
	{
		mxMessageDefinitionCO.setSubGridId("webServiceGuiSubGridTbl_SubGrid_Id"+mxMessageDefinitionCO.getParentRowId()+"_"+get_pageRef());
		// Set Fields Read only
	    if(PAYHCommonConstants.IV_CRUD_APPROVE.equals(getIv_crud())
		    || PAYHCommonConstants.IV_CRUD_DELETED.equals(getIv_crud())
		    || PAYHCommonConstants.STATUS_APPROVED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS())
		    || PAYHCommonConstants.STATUS_DELETED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS()))
	    {
	    	set_recReadOnly(ConstantsCommon.TRUE);
	    }
	    else
	    {
	    	set_recReadOnly(ConstantsCommon.FALSE);
	    }
		return "childRowGrid";
	}
	
	/**
	 * Method to Save and Update MX Message Definition
	 * @return 
	 */
    public String save() 
    {
		try
		{
			/**
			 * Apply Session Values
			 */
			applySessionValues();
			
			/**
			 * parse xsd and get all tags in order to save required tags
			 */
//			MxMessageDefinitionCO co = new MxMessageDefinitionCO();
//			co.getDgtl_MSG_DEFVO().setMSG_SCHEMA(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getMSG_SCHEMA());
//			co.getDgtl_MSG_DEFVO().setDGTL_MSG_DEF_ID(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID());
//			PrepareXsdTags.prepareXsdTags(co);
			
			/**
			 * prepare Mandatory Tags
			 */
//			PrepareXsdTags.prepareMandatoryTags(co);
//			mxMessageDefinitionCO.setMandatorytags(co.getMandatorytags());
			
			/**
			 * prepare Mx Message Tags
			 */
			prepareTagsLis();
			
			
			//call Audit common method
			mxMessageDefinitionCO.setAuditKey(AuditConstant.MX_MSG_DEF_KEY);
		    fillAuditDetails(mxMessageDefinitionCO);
			
			/**
			 * Save record
			 */
			mxMessageDefinitionBO.save(mxMessageDefinitionCO);
			
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return SUCCESS;
    }
 
    /**
     * Prepare Tag List from json to List
     */
    private void prepareTagsLis()
    {
    	
    	
    	/**
    	 * Convert newly selected tags json to list
    	 */
    	String tagsArray[] = mxMessageDefinitionCO.getGridData();
    	List<TagsCo> tagsCos = new ArrayList<TagsCo>();
    	
    	if(tagsArray != null)
    	{
        	for(int i=0; i<tagsArray.length; i++)
        	{
        		GridUpdates guMultiselect = getGridUpdates(tagsArray[i],TagsCo.class, true);
        		tagsCos.addAll(guMultiselect.getLstAllRec());
        	}
    	}
    	
    	
    	/**
    	 * If Selected tags where the parents are non mandatory
    	 */
//    	if(StringUtil.isNotEmpty(mxMessageDefinitionCO.getNonMandatoryParentSelectedRequiredChildsJSON()))
//    	{
//    		GridUpdates guMultiselect = getGridUpdates(mxMessageDefinitionCO.getNonMandatoryParentSelectedRequiredChildsJSON(),TagsCo.class, true);
//    		tagsCos.addAll(guMultiselect.getLstAllRec());
//    	}
    	
    	if(null != tagsCos && tagsCos.size() > 0)
    		mxMessageDefinitionCO.setAllTagsCos(tagsCos);
    	
    }
    
    /**
     * Method to return Mx Message Definition record by id
     * @return
     */
    public String edit()
    {
		try
		{
		    // fill session data
			//applySessionValues();
			SessionCO sessionCO = returnSessionObject();
			
			//fill dropdowns
			 fillDropDown();
			/**
			 * return Mx Message Definition record by if
			 */
			criteria.setStatus(ConstantsCommon.STATUS_ACTIVE);
			criteria.setLovTypeId(PAYHCommonConstants.PAYH_COMMON_STATUS_LOV);
			criteria.setPreferredLanguage(sessionCO.getLanguage());
			
			/**
			 * return Mx Message Definition record by id
			 */
			mxMessageDefinitionCO = mxMessageDefinitionBO.returnMxMessageDefinitionDetails(criteria);
			
			mxMessageDefinitionCO.setOldBriefName(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getBRIEF_NAME());
			
			
			 //apply Audit for retrieve reecord
			mxMessageDefinitionCO.setUpdateMode(ConstantsCommon.YES);
		    applyRetrieveAudit(AuditConstant.MX_MSG_DEF_KEY, mxMessageDefinitionCO.getDgtl_MSG_DEFVO(), mxMessageDefinitionCO.getDgtl_MSG_DEFVO());
		    
			
			/**
			 * set color based on status
			 */
			mxMessageDefinitionCO.setStatusColorCode(getStatusColorCode(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS(),
					PAYHCommonConstants.STATUS_COLOR_CODE_B));
			
		    // Set Fields Read only
		    if(PAYHCommonConstants.IV_CRUD_APPROVE.equals(getIv_crud())
			    || PAYHCommonConstants.IV_CRUD_DELETED.equals(getIv_crud())
			    || (PAYHCommonConstants.STATUS_APPROVED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS())
			    		&& !PAYHCommonConstants.IV_CRUD_UPDATE_AFTER_APPROVE.equals(getIv_crud())
			    		)
			    || PAYHCommonConstants.STATUS_DELETED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS()))
		    {
		    	set_recReadOnly(ConstantsCommon.TRUE);
		    }
		    else
		    {
		    	set_recReadOnly(ConstantsCommon.FALSE);
		    }
			
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		    return ERROR;
		}
		return "mxMessageDefinitionMaint";
    }

    /**
     * Method to Approve, Reject, Suspend OR Reactivate the ATM Interface
     * 
     * @return
     */
    public String handleStatusProcess()
    {
		try
		{
			/**
			 * Apply Session Values
			 */
		    applySessionValues();
		    
		    //call Audit common method
			mxMessageDefinitionCO.setAuditKey(AuditConstant.MX_MSG_DEF_KEY);
		    fillAuditDetails(mxMessageDefinitionCO);
		    
		    /**
		     * Handle Status like approve, delete
		     */
		    mxMessageDefinitionBO.handleStatusProcess(mxMessageDefinitionCO);
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
	return SUCCESS;
    }
    
    
    /**
     * Method to delete MX Message Definition
     * @return String
     */
    public String delete()
    {
    	try
    	{
    		applySessionValues();
    		//mxMessageDefinitionBO.deleteDynamicFileStructure(dynamicFileStructureCO);
    	}
    	catch(Exception e)
    	{
    	    handleException(e, null, null);
    	}
    	return SUCCESS;
    }
        
        
    /**
   	 * Method to empty File Definition Form
   	 * @return 
   	 */
    public String clearForm()
    {
		try
		{
			mxMessageDefinitionCO = new MxMessageDefinitionCO();
			
			/**
			 * fill dropdowns of screen
			 */
			fillDropDown();
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return "mxMessageDefinitionMaint";
    }
    
    /**
	* Method to Check Reference Duplication
	* @return
	*/
//	public String checkRefUnique()
//	{
//		try 
//		{
//			criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
//			criteria.setFileReference(criteria.getFileReference().toUpperCase().trim());
//			int count = mxMessageDefinitionBO.checkFileRefUnique(criteria);
//			if(count > 0)
//			{
//			    updates = "1";
//			}
//		} catch (Exception e) 
//		{
//			handleException(e, null, null);
//		}
//		return SUCCESS;
//	}
    
    /**
   	 * Method to Apply Session values
   	 * @return 
   	 */
    private void applySessionValues()
    {
		SessionCO sessionCO = returnSessionObject();
		mxMessageDefinitionCO.setCompCode(sessionCO.getCompanyCode());
		mxMessageDefinitionCO.setUserId(sessionCO.getUserName());
		mxMessageDefinitionCO.setRunningDate(sessionCO.getRunningDateRET());
    }
    
	/**
	 * Upload Xsd File
	 * @return
	 */
	public String uploadXsdFile()
    {
        try {
        	
        	mxMessageDefinitionBO.parseXsdAndPrepareTags(mxMessageDefinitionCO);
        }
        catch(BaseException ex) 
        {
        	handleException(ex, null, null);
        }
		return SUCCESS;
    }
	
	/**
	 * This Method is used to load tags grid After dbclicking the record from grid 
	 * @return
	 */
	public String loadTagsGridBySchemaAndId()
	{
		try 
		{
			
			mxMessageDefinitionBO.parseXsdAndPrepareTags(mxMessageDefinitionCO);
	        
	        /**
	         * Return tags saved in database
	         */
	        criteria.setMxMsgDefinitionId(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID());
	        List<TagsCo> tagsCos = mxMessageDefinitionBO.returnMxMessageDefinitionTagsList(criteria);
	        mxMessageDefinitionCO.setAllTagsCos(tagsCos);
	        
	        
		}
        catch(BaseException ex) {
        	ex.printStackTrace();
        	handleException(ex, null, null);
        }
		return SUCCESS;
	}
	
	
    /**
     * Validate Mx Message Definition
     * @return
     * @throws BaseException
     */
    public String validateMxMsgDefinitionCode()
    {
		try
		{
			mxMessageDefinitionCO = mxMessageDefinitionBO.validateMxMsgDefinitionCode(mxMessageDefinitionCO);
		    NumberUtil.resetEmptyValues(mxMessageDefinitionCO);
		}
		catch(BaseException e)
		{
		    handleException(e, null, null);
		}
		return SUCCESS;
    }
    
    /**
     * Fill Dropdown
     */
    private void fillDropDown()
    {
	try
	{
	    SelectSC selSC = new SelectSC(MxMessageDefinitionConstants.LOAD_FROM_LOV);
	    selSC.setLovCodesExclude(" 'XML', 'WSDL'");
	    loadFromList = fillDropDown(selSC);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
    }

	
	public MxMessageDefinitionSC getCriteria()
	{
		return criteria;
	}

	public void setCriteria(MxMessageDefinitionSC criteria)
	{
		this.criteria = criteria;
	}

	public void setMxMessageDefinitionBO(MxMessageDefinitionBO mxMessageDefinitionBO)
	{
		this.mxMessageDefinitionBO = mxMessageDefinitionBO;
	}

	public MxMessageDefinitionCO getMxMessageDefinitionCO() 
	{
		return mxMessageDefinitionCO;
	}

	public void setMxMessageDefinitionCO(MxMessageDefinitionCO mxMessageDefinitionCO) 
	{
		this.mxMessageDefinitionCO = mxMessageDefinitionCO;
	}
	
	public List<TagsCo> getTagsCos() {
		return tagsCos;
	}


	public void setTagsCos(List<TagsCo> tagsCos) {
		this.tagsCos = tagsCos;
	}


	public List<SelectCO> getLoadFromList() {
		return loadFromList;
	}


	public void setLoadFromList(List<SelectCO> loadFromList) {
		this.loadFromList = loadFromList;
	}
	
	

	
}
