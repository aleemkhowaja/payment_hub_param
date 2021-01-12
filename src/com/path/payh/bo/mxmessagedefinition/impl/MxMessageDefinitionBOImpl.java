package com.path.payh.bo.mxmessagedefinition.impl;

import java.io.IOException;
import java.util.List;

import org.apache.struts2.json.JSONException;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.bo.impl.mxmessageparser.PrepareXsdTags;
import com.path.bo.mxmessageparser.MxMessageParserBO;
import com.path.lib.common.base.BaseBO;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.common.util.StringUtil;
import com.path.payh.bo.common.PAYHCommonConstants;
import com.path.payh.bo.mxmessagedefinition.MxMessageDefinitionBO;
import com.path.payh.dao.mxmessagedefinition.MxMessageDefinitionDAO;
import com.path.payh.dbmaps.vo.DGTL_MSG_DEFVO;
import com.path.payh.vo.mxmessagedefinition.MxMessageDefinitionCO;
import com.path.payh.vo.mxmessagedefinition.MxMessageDefinitionSC;
import com.path.vo.mxmessageparser.XsdParserCO;
import com.predic8.schema.Schema;

/**
 * 
 * Copyright 2020, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * MxMessageDefinitionBOImpl.java used to
 */
public class MxMessageDefinitionBOImpl extends BaseBO implements MxMessageDefinitionBO 
{

	private MxMessageParserBO mxMessageParserBO;
	
	private MxMessageDefinitionDAO mxMessageDefinitionDAO;

	@Override
	public List returnMxMessageDefinitionTagsList(MxMessageDefinitionSC criteria) throws BaseException {
		return mxMessageDefinitionDAO.returnMxMessageDefinitionTagsList(criteria);
	}

	public int returnMxMessageDefinitionListCount(MxMessageDefinitionSC criteria) throws BaseException {
		return mxMessageDefinitionDAO.returnMxMessageDefinitionListCount(criteria);
	}

	@Override
	public Integer save(MxMessageDefinitionCO co) throws BaseException 
	{
		DGTL_MSG_DEFVO dgtl_MSG_DEFVO = co.getDgtl_MSG_DEFVO();
		dgtl_MSG_DEFVO.setMSG_TYPE("XML");
		dgtl_MSG_DEFVO.setSTATUS(ConstantsCommon.ACTIVE_RECORD);

		Integer rows = 0;

		if (NumberUtil.isEmptyDecimal(dgtl_MSG_DEFVO.getDGTL_MSG_DEF_ID())) {
			dgtl_MSG_DEFVO.setCREATED_BY(co.getUserId());
			dgtl_MSG_DEFVO.setCREATED_DATE(commonLibBO.returnSystemDateWithTime());
			rows = genericDAO.insert(dgtl_MSG_DEFVO);

			co.setDgtl_MSG_DEFVO(dgtl_MSG_DEFVO);

			// call audit for insert
			auditBO.callAudit(null, dgtl_MSG_DEFVO, co.getAuditRefCO());
		} else {
			dgtl_MSG_DEFVO.setMODIFIED_BY(co.getUserId());
			dgtl_MSG_DEFVO.setMODIFIED_DATE(commonLibBO.returnSystemDateWithTime());
			rows = genericDAO.update(dgtl_MSG_DEFVO);

			if (rows == null || rows < 1) 
				throw new BOException(MessageCodes.RECORD_CHANGED);
			

			// retrieve old Audit Object
			DGTL_MSG_DEFVO oldDGTL_MSG_DEFVO = (DGTL_MSG_DEFVO) co.getAuditObj();

			// call Audit
			auditBO.callAudit(oldDGTL_MSG_DEFVO, dgtl_MSG_DEFVO, co.getAuditRefCO());

		}

		/**
		 * save tags
		 */
		saveTags(co);

		// insert Audit
		auditBO.insertAudit(co.getAuditRefCO());

		return rows;
	}

	/**
	 * Save Mx Message Definition Tags
	 * 
	 * @param co
	 * @return
	 * @throws BaseException
	 * @throws JSONException
	 */
	private Integer saveTags(MxMessageDefinitionCO mxMessageDefinitionCO) throws BaseException {
		Integer rows = 0;

		mxMessageDefinitionCO.setDgtlMsgDefId(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID());

		/**
		 * delete all tags of mxMessageDefinition id
		 */
		mxMessageDefinitionDAO.deleteMxMessageDefinitionTags(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID());

		/**
		 * Save Tags
		 */
		if(mxMessageDefinitionCO.getAllTagsCos() != null && mxMessageDefinitionCO.getAllTagsCos().size() > 0)
			mxMessageDefinitionDAO.insertDGTL_XML_MSG_TAGS(mxMessageDefinitionCO);
		
		return rows;
	}


	@Override
	public Integer handleStatusProcess(MxMessageDefinitionCO mxMessageDefinitionCO) throws BaseException 
	{
		DGTL_MSG_DEFVO dgtl_MSG_DEFVO = mxMessageDefinitionCO.getDgtl_MSG_DEFVO();

		if (PAYHCommonConstants.STATUS_APPROVED.equals(mxMessageDefinitionCO.getMode())) 
		{
			dgtl_MSG_DEFVO.setAPPROVED_BY(mxMessageDefinitionCO.getUserId());
			dgtl_MSG_DEFVO.setAPPROVED_DATE(commonLibBO.returnSystemDateWithTime());
			dgtl_MSG_DEFVO.setSTATUS(PAYHCommonConstants.STATUS_APPROVED);
		} else if (PAYHCommonConstants.STATUS_DELETED.equals(mxMessageDefinitionCO.getMode())) 
		{
			dgtl_MSG_DEFVO.setDELETED_BY(mxMessageDefinitionCO.getUserId());
			dgtl_MSG_DEFVO.setDELETED_DATE(commonLibBO.returnSystemDateWithTime());
			dgtl_MSG_DEFVO.setSTATUS(PAYHCommonConstants.STATUS_DELETED);
		}

		Integer rows = genericDAO.update(dgtl_MSG_DEFVO);
		if (rows == null || rows < 1) {
			throw new BOException(MessageCodes.RECORD_CHANGED);
		}

		// retrieve old Audit Object
		DGTL_MSG_DEFVO auditObj = (DGTL_MSG_DEFVO) mxMessageDefinitionCO.getAuditObj();

		// call Audit
		auditBO.callAudit(auditObj, dgtl_MSG_DEFVO, mxMessageDefinitionCO.getAuditRefCO());

		// insert Audit
		auditBO.insertAudit(mxMessageDefinitionCO.getAuditRefCO());

		return rows;
	}

	@Override
	public MxMessageDefinitionCO validateMxMsgDefinitionCode(MxMessageDefinitionCO mxMessageDefinitionCO)
			throws BaseException {

		return mxMessageDefinitionCO;
	}
	
	@Override
	public MxMessageDefinitionCO parseXsdAndPrepareTags(MxMessageDefinitionCO mxMessageDefinitionCO) throws BaseException
	{
        try
        {
        	XsdParserCO xsdParserCO = new XsdParserCO();
        	xsdParserCO.setXsdFile(mxMessageDefinitionCO.getXsdFile());
        	xsdParserCO.setXsdSchema(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getMSG_SCHEMA());
        	
        	/**
        	 * Parse the Schema from file or from database 
        	 */
        	Schema schema = PrepareXsdTags.parseSchema(xsdParserCO);
        	
        	if(schema == null) return mxMessageDefinitionCO;
        	
        	/**
        	 * if Xsd file is not null
        	 * This condition is application for while file upload
        	 */
        	if( mxMessageDefinitionCO.getXsdFile() != null &&
        			
             	   ((StringUtil.isNotEmpty(xsdParserCO.getIdentifier())
             	   && NumberUtil.isEmptyDecimal(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID())
             	  )
             		||
             			(!NumberUtil.isEmptyDecimal(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID())
             					&& !StringUtil.nullToEmpty(mxMessageDefinitionCO.getOldBriefName()).equals(
             							xsdParserCO.getIdentifier())
             			))
             	)
             	{
             		/** 
             		 * Check the brief name of mx message definition is already exist in database or not
             		 * Because Brief name should be unique
             		 */
             		Integer records = mxMessageDefinitionDAO.validateMxMessageByDesc(xsdParserCO.getIdentifier());
             		if(records > 0)
             			throw new BOException(MessageCodes.INVALID_MISSING,
             					new String[] { "mx_message_is_already_available_key" });
             	}
        	
        	/**
        	 * Add Schema for parsing the tags
        	 */
        	xsdParserCO.setSchema(schema);
        	
        	/**
        	 * Prepare Tags from Schema/File
        	 */
        	mxMessageParserBO.parseXsdAndPrepareTags(xsdParserCO);
        	
        	/**
    		 * set all tags in list
    		 */
    		mxMessageDefinitionCO.setAllTagsCos(xsdParserCO.getAllTagsCos());
    		
    		mxMessageDefinitionCO.setTagsCos(xsdParserCO.getTagsCos());
        	
    		mxMessageDefinitionCO.setSchema(null);
	

			
		} catch (IOException e) 
        {
			log.error(e, "Error while parsing Tags from Xsd : " + e);
        }
        
        return mxMessageDefinitionCO;
	}

	@Override
	public MxMessageDefinitionCO returnMxMessageDefinitionDetails(MxMessageDefinitionSC criteria) throws BaseException {
		return mxMessageDefinitionDAO.returnMxMessageDefinitionDetails(criteria);
	}

	@Override
	public List returnMxMessageDefinitionList(MxMessageDefinitionSC criteria) throws BaseException {
		return mxMessageDefinitionDAO.returnMxMessageDefinitionList(criteria);
	}

	
	public void setMxMessageParserBO(MxMessageParserBO mxMessageParserBO) {
		this.mxMessageParserBO = mxMessageParserBO;
	}

	public void setMxMessageDefinitionDAO(MxMessageDefinitionDAO mxMessageDefinitionDAO) {
		this.mxMessageDefinitionDAO = mxMessageDefinitionDAO;
	}

}
