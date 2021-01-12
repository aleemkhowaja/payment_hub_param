/**
 * Upload Text File
 * @param proceed
 * @returns
 */
function xmlEditor_uploadFile()
{
    var requestParams = {};
    $("#mxMessageDefForm_"+_pageRef).ajaxSubmit({
	url  :    jQuery.contextPath+ "/path/mxmessagedefinition/MxMessageDefinitionMaintAction_uploadXsdFile?_pageRef="+_pageRef,
	type :   'post',
	data :    requestParams,
	dataType: 'application/json; charset=utf-8',
	beforeSubmit:_showProgressBar(true),				
	success: function(response, status, xhr) 
	{
	    _showProgressBar(false);
	    var responseText = JSON.parse(response);
	    
	    
	    if (responseText["_error"] != null || typeof responseText["_error"] != "undefined") 
		{
	    	_showErrorMsg(mx_message_is_already_available_key, info_msg_title, 300,100);
	    	$("#upload_"+_pageRef).val("");
	    	return;
		}
        /**
         * Load Tags Grid 
         */
        MxMessageDefinitionMaint_loadTagsGrd(responseText.mxMessageDefinitionCO);
     
        
        MxMessageDefinitionMaint_onTagsGridCompleteTopics("mxMsgDefTagListGridTbl_Id_"+_pageRef);
        
        /**
         * set all mandatory tags and its parents in hidden fields 
         * I need all mandatory tags and its parent because if i select the parent, child, so I
         * need to select all mandatories leaf tags or all parent and set in json
         */
    	//var parentTagsJson = responseText.mxMessageDefinitionCO.parentTagsJson;
    	//var mandatoryTagsJson = responseText.mxMessageDefinitionCO.mandatoryTagsJson;
    	

    	/**
    	 * 
    	 */
       // MxMessageDefinitionMaint_setAllMandatoryTagsAndParents(parentTagsJson, mandatoryTagsJson); 
        
        
        
        /**
         * Add schema and brief name in hidden field
         */
        $("#msgIdentifier_"+_pageRef).val(responseText.mxMessageDefinitionCO.dgtl_MSG_DEFVO.MSG_IDENTIFIER);
        $("#msgSchema_"+_pageRef).val(responseText.mxMessageDefinitionCO.dgtl_MSG_DEFVO.MSG_SCHEMA);
	}
    }); 
}


/**
 * Load Tags Grid after db click on main grid
 * @returns
 */
function xmlEditor_loadTagsGridAfterDBClick()
{
	
	_showProgressBar(true);
	
	var msgDefid = $("#DGTL_MSG_DEF_ID_"+_pageRef).val();
	var msgSchema = $("#msgSchema_"+_pageRef).val();
	var oldBriefName = $("#oldBriefName_"+_pageRef).val();
	var msgIdentifier = $("#msgIdentifier_"+_pageRef).val();
	
		
	var gridParam = 
	{
			"mxMessageDefinitionCO.dgtl_MSG_DEFVO.MSG_SCHEMA": msgSchema,
			"mxMessageDefinitionCO.dgtl_MSG_DEFVO.DGTL_MSG_DEF_ID" : msgDefid,
			"mxMessageDefinitionCO.dgtl_MSG_DEFVO.MSG_IDENTIFIER" : msgIdentifier,
			"mxMessageDefinitionCO.oldBriefName" : oldBriefName,
			"_pageRef" : _pageRef
	}
	
	var url = jQuery.contextPath + "/path/mxmessagedefinition/MxMessageDefinitionMaintAction_loadTagsGridBySchemaAndId";
	
	$.ajax({
		url : url,
		type : "post",
		dataType : "json",
		data : gridParam,
		success : function(data) 
		{
			/**
	         * Load Tags Grid 
	         */
	        MxMessageDefinitionMaint_loadTagsGrd(data.mxMessageDefinitionCO);
	     
	        /**
	         * convert selected rows into json
	         * and set in hidden field for toretrieve and select rows 
	         *
	         */
	        if(data.mxMessageDefinitionCO.allTagsCos != null && typeof data.mxMessageDefinitionCO.allTagsCos != "undefined") 
	        	$("#selectedTagsData_"+_pageRef).val(JSON.stringify(data.mxMessageDefinitionCO.allTagsCos));
	        
	        /**
	         * add + button after grid comple 
	         * and select the rows which already saved
	         */
	        MxMessageDefinitionMaint_onTagsGridCompleteTopics("mxMsgDefTagListGridTbl_Id_"+_pageRef);
	        
	        /**
	         * add saved tags data in Hidden Fields
	         */
	        MxMessageDefinitionMaint_prepareHiddenFieldsForSavedTags();
	        
	        _showProgressBar(false);
		}
	});
}