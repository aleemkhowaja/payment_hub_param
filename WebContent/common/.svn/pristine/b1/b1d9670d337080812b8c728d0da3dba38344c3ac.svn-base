/**
 * check not to permit of removing visibility if Required is checked
 * @param {Object} theCheckBox
 * @param {Object} what
 */
function objCust_CheckVisbleReadOnlyVal(element, what)
{
	var elemId  = element.id;
	var elemVal = $("#"+elemId).val();
	var prevVal = $("#"+elemId).attr("prevvalue");
	var fldDepVisible = "0";
	// if Required Checked
	
	if(what == 'VIS')// visibility comboBox
	{
		if(elemVal == "2" || elemVal == "3")
		{
			manageDynamicDisplay("fldcust_visibleExpr_" + custScrPageRef,{fldcust_visibleExpr:{IS_VISIBLE:"1"}},"fldcust_visibleExpr");
		}
		else
		{
            $("#fldcust_visibleExpr_"+custScrPageRef).val("");
			manageDynamicDisplay("fldcust_visibleExpr_" + custScrPageRef,{fldcust_visibleExpr:{IS_VISIBLE:"0"}},"fldcust_visibleExpr");
		}
	}
	else if(what == 'READONLY')//readOnly management
	{
	   if(elemVal == "2" || elemVal == "3")
	   {
		 manageDynamicDisplay("fldcust_readonlyExpr_" + custScrPageRef,{fldcust_readonlyExpr:{IS_VISIBLE:"1"}},"fldcust_readonlyExpr");
		 $("#fldcust_addDeleteFlag_" + custScrPageRef).attr('disabled', false);
	   }
	   else
	   {
		 $("#fldcust_readonlyExpr_"+custScrPageRef).val("");
		 manageDynamicDisplay("fldcust_readonlyExpr_" + custScrPageRef,{fldcust_readonlyExpr:{IS_VISIBLE:"0"}},"fldcust_readonlyExpr");
		 $("#fldcust_addDeleteFlag_" + custScrPageRef).attr('disabled', false);
		 if(elemVal == "1")
		 {
			 $("#fldcust_addDeleteFlag_" + custScrPageRef).val(0);
			 $("#fldcust_addDeleteFlag_" + custScrPageRef).attr('disabled', true);
			 $("#fldcust_addDeleteExpr_"+custScrPageRef).val("");
			 manageDynamicDisplay("fldcust_addDeleteExpr_" + custScrPageRef,{fldcust_addDeleteExpr:{IS_VISIBLE:"0"}},"fldcust_addDeleteExpr");  
		 }
	   }
	}
	else if(what == 'ADD_DELETE')
	{
	   if(elemVal == "2" || elemVal == "3")
	   {
		 manageDynamicDisplay("fldcust_addDeleteExpr_" + custScrPageRef,{fldcust_addDeleteExpr:{IS_VISIBLE:"1"}},"fldcust_addDeleteExpr");    
	   }
	   else
	   {
		 $("#fldcust_addDeleteExpr_"+custScrPageRef).val("");
		 manageDynamicDisplay("fldcust_addDeleteExpr_" + custScrPageRef,{fldcust_addDeleteExpr:{IS_VISIBLE:"0"}},"fldcust_addDeleteExpr");    
	   }		
	}
	$("#"+elemId).attr("prevvalue",elemVal);
}

/**
 * reset object customization 
 * @returns
 */
function objCust_resetCustomization()
{
	_showConfirmMsg(
			(typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key
					: "Reset Customization?", confirm_msg_title,
			function(yesNo)
			{
				if (yesNo)
				{
						_showProgressBar(true);
						
						var currPageRef = "";
						var curParams = {};
						if(typeof _pageRef !== "undefined")
						{
							curParams._pageRef = _pageRef;
							currPageRef = _pageRef;
						}
						curParams.objectId = $('#objectId').val();
						var srcURL = jQuery.contextPath+'/path/objectCustomization/objectCustomizationMain_loadCustMaintPage.action';
						var theForm = $("#custObjectMaintForm_"+custScrPageRef).serializeForm();
						
						$.ajax({
							 url: jQuery.contextPath+"/path/objectCustomization/objectCustomizationMain_resetChanges",
					         type:"post",
							 dataType:"json",
							 data: theForm,
							 success: function(data)
							 		{
								 		if(typeof data["_error"] == "undefined" || data["_error"] == null)
								 		{
								 			// relaod the Dialog
								 		 $("#global_object_cust_div").load(srcURL, curParams, function()
								 			 {
									 			 _showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
									 			 clearCachedPathData();
									 			 _showProgressBar(false);
								 			 });
								 		}
								 		else // there is error
								 		{
								 			_showProgressBar(false);
								 		}
								 	}
							 });
			} }, "yesNo");

}
/**
 * load names of grid columns to the combo filtered based on the grid content
 * @returns
 */
function objCust_loadColumnNamesCombo()
{
	//return the column names exists in the grid (already chosen)
	var namesArray = getColumnNames();
	
	var gridId = $('#objectId').val();
	var $table = $("#"+gridId+ "_" + custScrPageRef);
	if($table.length == 0)
	{
		$table = $("#"+gridId);
	}
	var rowData = $table.jqGrid('getGridParam','colModel');
	var rowDataName = $table.jqGrid('getGridParam','colNames');
	var list = "";
	for(var i=0; i<rowData.length; i++)
 	{
		var value = rowDataName[i];
		if(rowData[i].hidden == true || namesArray.indexOf(value) !== -1)continue;
		var key = rowData[i].name;
	    if(typeof key == "undefined") //no id for select box
	       key = "";
        if(list.length>0)
              list += ";" ;
        list += key + ":" + value;
 	}
	return list;
}

/**
 *  add new empty row to the grid
 * @returns
 */
function objCust_addMapGrid()
{
	var thCustTbl =	$("#ObjectCustDetailsGrid_Id_"+custScrPageRef);
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}

/**
 * delete selected row from the grid
 * @returns
 */
function objCust_deleteMapGrid(theRowId)
{
	var $table = $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var selectedRowObject 	= $table.jqGrid('getRowData', theRowId);
	if(selectedRowObject["sysParamObjDetailsDispVO.BUS_RELATED"]=="1")
	{
		var deleteBusRelated = document.getElementById("bus_related_delete_key").value;
		_showErrorMsg(deleteBusRelated);
		return;
	}
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		    {
				if(yesNo) 
				{
					var selectedRowObject = $table.jqGrid('getRowData', theRowId);
					var objDisplayId = selectedRowObject["sysParamObjDetailsDispVO.OBJ_DISPLAY_ID"];
					
					if(objDisplayId == '')
					{
						$("#ObjectCustDetailsGrid_Id_"+custScrPageRef).jqGrid('deleteGridRow',theRowId);	
					}
					else
					{
						
						_showProgressBar(true);
						var deleteAction = jQuery.contextPath+"/path/objectCustomization/objectCustomizationDetailsListAction_deleteObjectCustDetails.action";
						var deleteParam = { 
											"sysParamObjDetailsDispVO.OBJ_DISPLAY_ID": objDisplayId,
											"sysParamObjDetailsDispVO.OBJ_DET_NAME":selectedRowObject["sysParamObjDetailsDispVO.OBJ_DET_NAME"]
										  };
						
						$.ajax({
							 url: deleteAction,
					         type:"post",
							 dataType:"json",
							 data: deleteParam,
							 success: function(data){
							     
								 if(typeof data["_error"] == "undefined" || data["_error"] == null)
							     {	 
									   if($("#ObjectCustDetailsGrid_Id_"+custScrPageRef).html()!=null && $("#ObjectCustDetailsGrid_Id_"+custScrPageRef).html()!="")
							           {
							            	 $("#ObjectCustDetailsGrid_Id_"+custScrPageRef).trigger("reloadGrid");
							           }
					             } 
								 
								 _showProgressBar(false);
								 
							 }
					    });
					}
				}
			},"yesNo");	
}
/**
 * on select row set the descriptions for comboboxes
 * @param rowObj
 * @returns
 */
function objCust_onRowSelTopic(rowObj)
{
	objCust_comboChanged();
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var selectedRowId 		= $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject 	= $table.jqGrid('getRowData', selectedRowId);
	if(selectedRowObject["sysParamObjDetailsDispVO.BUS_RELATED"]=="1")
	{
		for(var c in  selectedRowObject)
		{
			$table.jqGrid("setCellReadOnly", selectedRowId,c,"true");
		}
	}
	
}

/**
 * on changing any combo handle visibility for each related expression text areas 
 * @returns
 */
function objCust_comboChanged()
{
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var selectedRowId 		= $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject 	= $table.jqGrid('getRowData', selectedRowId);
	var readOnly 			= selectedRowObject["readOnlyComboDesc"];
	var visibility			= selectedRowObject["visibilityComboDesc"];
	var mandatory 			= selectedRowObject["mandatoryComboDesc"];
	
	apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.LABEL_KEY_EXPR",expression_cust_tags);
	//if columnName already exists in DB then it must be readonly therefore selectedRowObject["columnNameComboDesc"] will retrun the title instead of the key since readonly convert it to textfield.
	var columnName = selectedRowObject["sysParamObjDetailsDispVO.OBJ_DET_NAME"];
	if(selectedRowId.indexOf("new")!== -1)
	{
		columnName			= selectedRowObject["columnNameComboDesc"];
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.OBJ_DET_NAME",columnName);
	}
	$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_READONLY",readOnly);
	$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_VISIBLE",visibility);
	$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_MANDATORY",mandatory);
	
	//2 = readonlyexpression
	if(readOnly!=null && readOnly == "2")
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.READONLY_EXPR",expression_cust_tags);
	}
	else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
	}
	
	//2 = visibility expression
	if(visibility!=null && visibility == "2")
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","true");
		apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.VISIBILITY_EXPR",expression_cust_tags);
	}
	else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","false");
	}
	
	//2 = required expression
	if(mandatory!=null && mandatory == "2")
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","true");
		apply_auto_complete(selectedRowId + "_sysParamObjDetailsDispVO.MANDATORY_EXPR",expression_cust_tags);
	}
	else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","false");
	}
	
	//if the column is required then the column must be editable and visible
	if(mandatory == "1")
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_READONLY",'0');
		$table.jqGrid('setCellValue', selectedRowId,"readOnlyComboDesc",'0');
		$table.jqGrid("setCellReadOnly", selectedRowId,"readOnlyComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
		
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_VISIBLE",'1');
		$table.jqGrid('setCellValue', selectedRowId,"visibilityComboDesc",'1');
		$table.jqGrid("setCellReadOnly", selectedRowId,"visibilityComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.VISIBILITY_EXPR","false");
	}
	else
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"readOnlyComboDesc","false");
		$table.jqGrid("setCellReadOnly", selectedRowId,"visibilityComboDesc","false");
	}
	
	// if read only from dev mode is true then the readonly and required combo must be disabled
	var readOnlyFromDev = checkIfReadOnlyFrmDevMode(columnName);
	if(readOnlyFromDev)
	{
		$table.jqGrid("setCellReadOnly", selectedRowId,"readOnlyComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_READONLY",'1');
		$table.jqGrid('setCellValue', selectedRowId,"readOnlyComboDesc",'1');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.READONLY_EXPR","false");
		
		$table.jqGrid("setCellReadOnly", selectedRowId,"mandatoryComboDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.IS_MANDATORY",'0');
		$table.jqGrid('setCellValue', selectedRowId,"mandatoryComboDesc",'0');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR",'');
        $table.jqGrid("setCellReadOnly", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamObjDetailsDispVO.MANDATORY_EXPR","false");
	}
}

/**
 * set the column name for columnNamesCombo on loading the grid data and in case if it is not new the we make it readonly.
 * @returns
 */
function objCust_setColumnNamesCombo()
{
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var rowIds				= $table.jqGrid('getDataIDs');
	for(var i = 0 ; i < rowIds.length ; i++)
	{
		$table.jqGrid('getRowData',rowIds[i]);
		$table.jqGrid('setCellValue', rowIds[i],"columnNameComboDesc",getTitle($table.jqGrid('getRowData',rowIds[i])["sysParamObjDetailsDispVO.OBJ_DET_NAME"]));
		if(rowIds[i].indexOf("new") === -1)
		{
			$table.jqGrid("setCellReadOnly", rowIds[i],"columnNameComboDesc","true");
		}
	}
}
/**
 * retrun column names for the existing rows in the grid.
 * @returns
 */
function getColumnNames()
{
	var $table 				= $("#ObjectCustDetailsGrid_Id_" + custScrPageRef);
	var rowIds				= $table.jqGrid('getDataIDs');
	var myArr				= [];
	for(var i = 0 ; i < rowIds.length ; i++)
	{
		var selectedRowObject = $table.jqGrid('getRowData',rowIds[i]);
		if(selectedRowObject["columnNameComboDesc"] != null && selectedRowObject["columnNameComboDesc"]!='' )
		{
			myArr.push(selectedRowObject["columnNameComboDesc"]);
		}
	}
	return myArr;
}

/**
 * return the translated name for the key for the customized grid.
 * @param name
 * @returns
 */
function getTitle(name)
{
	var gridId = $('#objectId').val();
	
	var $table = $("#"+gridId+ "_" + custScrPageRef);
	if($table.length == 0)
	{
		$table = $("#"+gridId);
	}
	
	var rowData = $table.jqGrid('getGridParam','colModel');
	var rowDataName = $table.jqGrid('getGridParam','colNames');
	for(var i=0; i<rowData.length; i++)
 	{
		if(name == rowData[i].name )
        return rowDataName[i];
 	}
	return name;
}



function exportScreenCustomization(exportType) 
{
	var theCheckBox =  $("#fldcust_specificMenu_"+custScrPageRef);
	var isCheckBoxChked = theCheckBox.is(":checked");
	params = {
		"custSC.cutomizationPROG_REF" : custScrPageRef,
		"custSC.exportCustType" : exportType,
		"custSC.sysParamObjDispVO.OBJECT_ID" : $("#objectId").val(),
		"custSC.useSpecificPageRef" : isCheckBoxChked};

var urlSrc = jQuery.contextPath + '/path/objectCustomization/objectCustomizationFileMaint_exportObjectCustomization';

_showProgressBar(true);
$.fileDownload(urlSrc,
{
successCallback: function (url) {
	_showProgressBar(false);
},
failCallback: function (html, url) {	 
    _showErrorMsg(html);
},
data:params
});
		
}

function checkIfReadOnlyFrmDevMode(columnName)
{
	var isReadOnly = false;
	var gridId = $('#objectId').val();
	var $table = $("#"+gridId+ "_" + custScrPageRef);
	if($table.length == 0)
	{
		$table = $("#"+gridId);
	}
	var rowData = $table.jqGrid('getGridParam','colModel');
	for(var i=0; i<rowData.length; i++)
 	{
		if(columnName == rowData[i].name )
		{
			// fixing Read-only column in column customization for live search is not set to read-only
			if ((rowData[i].editable == false || rowData[i].editable == undefined)
					&& rowData[i].fromCustomization != true)
			{
				isReadOnly = true;
			}
			break;
		}
 	}
	return isReadOnly;
}

/*953614 Specify Grid Filter Query Expression - Grid/Livesearch Customization Enhancements*/
/*filter-expression region*/
var columnTitleInTagPrefix = "[column.";
var columnTitleInTagSuffix = "]";

function objCust_filterExpCheckBoxClicked(checkBoxHTMLElement)
{
	//getting the related textField
		//convention followed => checkBoxId: checkbox_fldcust_xxx${_pageRef} , textAreaId: fldcust_xxx${_pageRef}
	var $filterExprCheckBox = $(checkBoxHTMLElement);
	var filterExprTextAreaId =checkBoxHTMLElement.id.replace("checkbox_","");
	var $filterExprTextArea = $("#"+filterExprTextAreaId);
	//if this checkBox is checked => show the textField
	if ($filterExprCheckBox.prop("checked"))
	{
		$filterExprTextArea.show();
	}
	else
	{
		$filterExprTextArea.hide();
		$filterExprTextArea.val("");
	}
}

/**
 * replaces empty titles or titles containing html(invalid titles) with index value related to each column,
 * if index attribute of a column doen't exist, it replaces titles/invalid titles with empty string value
 * @param $table
 * @returns
 */
function processGridTitles($table)
{
	var unprocessedTitlesArr = $table.jqGrid('getGridParam','colNames');
	var processedTitlesArr=[];
	var colModelsArray = $table.jqGrid("getGridParam").colModel;
	
	//used for processing duplicate titles.
	var unprocessedValidTitles =unprocessedTitlesArr
								.filter(function(titl){return isNotEmptyString(titl) && !containsHTML(titl);})
	
	var i;
	for(i = 0 ; i < unprocessedTitlesArr.length ; i++)
	{
		var title = unprocessedTitlesArr[i];
		var processedTitle = "";
		
		var colIndexAttr = colModelsArray[i].index
		if(isNotNullAndNotUndefined(colIndexAttr) && isNotEmptyString(colIndexAttr))
		{
			if( isEmptyString(title) || containsHTML(title))
			{
				processedTitle = colIndexAttr;
			}
			else // title exists
			{
				//in case of duplicate titles
				if(unprocessedValidTitles.filter(function(ttl){return ttl === title;}).length > 1)
				{
					title = title+"("+colIndexAttr+")";
					
				}
				processedTitle = title;
			}
		}
		processedTitlesArr[i] = processedTitle;
	}
	return processedTitlesArr;
	
	//helper functions
	function containsHTML(str)
	{
		var a = document.createElement('div');
		  a.innerHTML = str;

		  for (var c = a.childNodes, i = c.length; i--; ) {
		    if (c[i].nodeType == 1) return true; 
		  }

		  return false;
	}
}

function getGridColumnsTitlesAndConcatWith(tagsArray) {
	 //adding columns titles to tag list assigned to filter-expression
	var gridId = $('#objectId').val();
	var $table = $("#"+gridId+ "_" + custScrPageRef);
	if($table.length == 0)
	{
		$table = $("#"+gridId);
	}
//	var columnsNamesArray = $table.jqGrid('getGridParam','colNames');
	columnsNamesArray =  processGridTitles($table)///////////////
	var columnNamesWithBracketsArray = columnsNamesArray.filter(function(colName){return isNotEmptyString(colName);})
										.map(function(colName){return columnTitleInTagPrefix+ colName +columnTitleInTagSuffix;});
	return tagsArray.concat(columnNamesWithBracketsArray);
}

//converts columnTitles tags shown in filter-expression to model's properties names 
function convertColumnTitlesToPropNames(inputString, $table)
{
	var resultString = inputString;
//	var colTitlesArray = $table.jqGrid("getGridParam").colNames;
	colTitlesArray =  processGridTitles($table)///////////////
	var colModelsArray = $table.jqGrid("getGridParam").colModel;
	var i;
	for (i in colTitlesArray)
	{
		var colTitle = colTitlesArray[i];
		
		if(resultString.indexOf(columnTitleInTagPrefix + colTitle + columnTitleInTagSuffix) < 0)
		{
			continue;
		}
		
		resultString = resultString
					.replace(new RegExp(escapeRegExp(columnTitleInTagPrefix + colTitle + columnTitleInTagSuffix),"g")
					,colModelsArray[i].index);
	}
	return resultString;
}

//converts model's properties names back to columnTitles to be shown in filter-expression textArea
function convertPropNamesToColumnTitles(inputString, $table)
{
	 var resultString = inputString;
//	 var colTitlesArray = $table.jqGrid("getGridParam").colNames;
	 colTitlesArray =  processGridTitles($table)///////////////
	  var colIndexesArr = $table.jqGrid("getGridParam").colModel.map(function(model){return model.index;});
	  var i;
	  for(i in colIndexesArr)
	  {
		  var colIndex = colIndexesArr[i];
		  
		  if(isNullOrUndefined(colIndex) || isEmptyString(colIndex) || resultString.indexOf(colIndex) < 0)
		  {
			  continue;
		  }
		  
		  resultString = resultString
		  		.replace(new RegExp(escapeRegExp(colIndex),"g")
		  		, columnTitleInTagPrefix+colTitlesArray[i]+columnTitleInTagSuffix);
	  }
	  return resultString;
}
//when page is fully loaded, this function is used to convert received database-stored filter-expression query to column-title-kind-of-query 
function fillFilterExpTA()
{
	var gridId = $('#objectId').val();
	var $gridTable = $("#"+gridId + "_" + custScrPageRef);
	if($gridTable.length == 0)
	{
		$gridTable = $("#"+gridId);
	}
	var $filterExpressionTextArea = $("#fldcust_filterExpression_"+custScrPageRef);
	var filterExpressionRealVal=$("#fldcust_filterExpressionToSend_"+custScrPageRef).val();
	if(typeof filterExpressionRealVal === "string" && filterExpressionRealVal.length > 0)
	{
		$filterExpressionTextArea.val(convertPropNamesToColumnTitles(filterExpressionRealVal, $gridTable));
	}
}
/**
 *  fills filter expression text area with database stored value if any, and auto-complete it with tags after
 *  adding grid columns tags
 * @param filterTxtAreaId
 * @param tags
 * @returns
 */
function initializefilterExp(filterTxtAreaId , tags)
{
	var filterTags = getGridColumnsTitlesAndConcatWith(tags);
	apply_auto_complete(filterTxtAreaId,filterTags);
	fillFilterExpTA();
}
/*end: 953614*/
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used to add row in grid
 * 
 * @returns
 */
function objCustElem_addRow()
{
	var showConfirmDialog = objCustParamMapGrid_confirmationToSave('objCustElem_addNewRow');
	if(!showConfirmDialog)
	{
		objCustElem_addNewRow();
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used to add new row in grid
 * 
 * @returns
 */
function objCustElem_addNewRow()
{
	var $table = $("#ObjCustElementActivityGrid_Id_" + custScrPageRef);
	/**
	 * fetch all row ids and get last row data to check filled properly
	 * so, validate if activity id not filled then don't add new row
	 */
	var rowIds = $table.jqGrid("getDataIDs");
	if(rowIds.length > 0)
	{
		var lastRowId = rowIds[rowIds.length-1];
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var ind = $table.jqGrid("getInd", selectedRowId, true);
		if($(ind).attr("editable") == "1" && selectedRowId != lastRowId)
		{
			$table.jqGrid('saveRow', selectedRowId);
		}

		var lastRowObject = $table.jqGrid('getRowData', lastRowId);
		var activityId = lastRowObject["sysParamElemActivitiesVO.ACTIVITY_ID"];
		if(isNullOrUndefined(activityId) || isEmptyString(activityId)) // validate whether last row is filled properly
		{
			_showErrorMsg(fill_mandatory_key, error_msg_title);
			return;
		}

		if($(ind).attr("editable") == "1" && selectedRowId == lastRowId)
		{
			$table.jqGrid('saveRow', selectedRowId);
		}
	}
	/**
	 * objCustElem_loadGridColumnNamesCombo method returns empty when all grid columns already adjusted in "Custom Activity on Columns"
	 * so, validate if columnNamesList empty then don't add new row
	 */
	var gridColumnNamesList = objCustElem_loadGridColumnNamesCombo(false);
	if(isEmptyString(gridColumnNamesList))
	{
		_showErrorMsg(noeditablecols_add_key, error_msg_title);
		return;
	}
	//add new row
	var rowId = $table.jqGrid('addInlineRow', {});
	$table.jqGrid('setCellValue', rowId, 'sysParamElemActivitiesVO.ACTIVITY_ENABLE_YN', "1");
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used to delete selected row in grid
 * 
 * @param theRowId
 * @returns
 */
function objCustElem_deleteRow(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined) ? Confirm_Delete_Process_key: "Delete Selected Row?", confirm_msg_title,
		function(yesNo)
		{
			if (yesNo)
			{
				var $table = $("#ObjCustElementActivityGrid_Id_"+ custScrPageRef);
				var selectedRowObject = $table.jqGrid('getRowData', theRowId);
				var sequenceId = selectedRowObject["sysParamElemActivitiesVO.SEQUENCE_ID"];
				if(sequenceId == '')
				{
					$table.jqGrid('deleteGridRow',theRowId);
					objCustParamMapGrid_remove();
				}
				else
				{
					_showProgressBar(true);
					var deleteAction = jQuery.contextPath+"/path/customization/CustomElementActivity_deleteElementActivity.action";
					var deleteParam = {"criteria.sysParamElemActivitiesVO.SEQUENCE_ID" :sequenceId,
							"criteria.sysParamElemActivitiesVO.APP_NAME" :selectedRowObject["sysParamElemActivitiesVO.APP_NAME"],
							"criteria.sysParamElemActivitiesVO.PROG_REF" :selectedRowObject["sysParamElemActivitiesVO.PROG_REF"],
							"criteria.sysParamElemActivitiesVO.FLD_IDENTIFIER" :selectedRowObject["sysParamElemActivitiesVO.FLD_IDENTIFIER"],
							"criteria.sysParamElemActivitiesVO.ACTIVITY_ID" :selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_ID"],
							"criteria.sysParamElemActivitiesVO.ACTIVITY_TYPE" :selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"]};

					$.ajax({
						url: deleteAction,
						type:"post",
						dataType:"json",
						data: deleteParam,
						success: function(data){
							if(typeof data["_error"] == "undefined" || data["_error"] == null)
							{
								var $tableHtml = $table.html();
								if($tableHtml != null && isNotEmptyString($tableHtml))
								{
									$table.trigger("reloadGrid");
								}
								objCustParamMapGrid_remove();
							}
							_showProgressBar(false);
						}
					});
				}
			}
		}, "yesNo");
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used to load Dynamic screen param map
 * 
 * @returns
 */
function objCustElem_LoadDynScrnParamMapGrid()
{
	var $table = $("#ObjCustElementActivityGrid_Id_"+ custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var data = $table.jqGrid('getRowData', selectedRowId);
	if(data == undefined || data == null)
	{
		return;	
	}

	var operationId = data["sysParamElemActivitiesVO.ACTIVITY_ID"];
	if(isNullOrUndefined(operationId) || isEmptyString(operationId))
	{
		objCustParamMapGrid_remove();
		return;
	}

	$.struts2_jquery.require("ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");

	var dynScreenMapParam = {};
	dynScreenMapParam.divId = 'objcustElem_parmaMapGrid_' + custScrPageRef;
	dynScreenMapParam.currentPageRef = custScrPageRef;
	dynScreenMapParam.elementIdentifier =  data["sysParamElemActivitiesVO.FLD_IDENTIFIER"];
	dynScreenMapParam.appName = data["sysParamElemActivitiesVO.APP_NAME"];
	dynScreenMapParam.progRef = data["sysParamElemActivitiesVO.PROG_REF"];
	dynScreenMapParam.compCode = 0;
	dynScreenMapParam.activityOnColumns = true;
	dynScreenMapParam.gridColumnName = data["gridColumnName"];
//	dynScreenMapParam.gridColumnNameDesc = data["gridColumnNameDesc"];
	dynScreenMapParam.rowId = selectedRowId;
//	dynScreenMapParam.rowsCount = $table.jqGrid('getGridParam', 'records');

	var activityType  = data["sysParamElemActivitiesVO.ACTIVITY_TYPE"];
	if(activityType == '6')
	{
		dynScreenMapParam.mapElementType = '3';
		dynScreenMapParam.defaultScreenId = null;
		dynScreenMapParam.globalActivityId = operationId;
		dynScreenMapParam.operationDesc = data["sysParamElemActivitiesVO.DESCRIPTION"];
		dynScreenMapParam.sequenceId  = data["sysParamElemActivitiesVO.SEQUENCE_ID"];
		dynScreenMapParam.loadedInObjDisplay = true;
		$("#objCust_gridRow_"+custScrPageRef).val(JSON.stringify(dynScreenMapParam));
		$("#info_dialog:visible").find("#closedialog").click();
		screenGenerator_loadButtonCustomizationParamMap(dynScreenMapParam);
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used to initialize default values for the grid
 * 
 * @returns
 */
function objCustElem_onRowSelTopic()
{
	var showConfirmDialog = objCustParamMapGrid_confirmationToSave('objCustElem_onRowSelectTopic');
	if(!showConfirmDialog)
	{
		objCustElem_onRowSelectTopic();
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used to initialize default values for the grid
 * 
 * @returns
 */
function objCustElem_onRowSelectTopic()
{
	var gridId = "ObjCustElementActivityGrid_Id_" + custScrPageRef;
	var $table = $("#" + gridId);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);

	var progRef = selectedRowObject["sysParamElemActivitiesVO.PROG_REF"];
	if(isEmptyString(progRef))
	{
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.PROG_REF", $('#fldcust_progRef_' + custScrPageRef).val());
	}

	var appName = selectedRowObject["sysParamElemActivitiesVO.APP_NAME"];
	if(isEmptyString(appName))
	{
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.APP_NAME", $('#fldcust_appName_' + custScrPageRef).val() );
	}

	if(selectedRowObject["autoCompleteTags"] == null || isEmptyString(selectedRowObject["autoCompleteTags"]))
	{
		returnAutoCompleteData(gridId);
	}

	var sequenceId = selectedRowObject["sysParamElemActivitiesVO.SEQUENCE_ID"];
	if(isNotNullAndNotUndefined(sequenceId) &&  isNotEmptyString(sequenceId))
	{
		$table.jqGrid("setCellReadOnly", selectedRowId, "gridColumnNameDesc", "true");
	}
	else
	{
		objCustElem_GridColNamesComboChanged();	//set grid column name description in select box (column name)
	}

	applyAutoCompleteTags(gridId, selectedRowId);	//set autocomplete tags
	objCustElem_CheckActivityIdVisibility(true);	//enable disable the grid columns as per global activity
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used, to set autocomplete tags
 * 
 * @param gridId
 * @param rowId
 * @returns
 */
function applyAutoCompleteTags(gridId, rowId)
{
	var proceedOnExpressionColumnId = rowId + "_" + "sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION_" + gridId;
	var proceedOnExpressionColumn = document.getElementById(proceedOnExpressionColumnId); 
	if(isNullOrUndefined(proceedOnExpressionColumn))
	{
		proceedOnExpressionColumnId = rowId + "_" + "sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION";
	}
	var $table = $("#" + gridId);
	var selectedRowObject = $table.jqGrid('getRowData', rowId);
	var expression_cust_tags = selectedRowObject["autoCompleteTags"];
	expression_cust_tags = expression_cust_tags.split(",");
	apply_auto_complete(proceedOnExpressionColumnId, expression_cust_tags);
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements 
 * @createdBy Sajjad Soomro
 * @description this function is used to set the grid column name description
 * 
 * @returns
 */
function objCustElem_completeTopics()
{
	var $table = $("#ObjCustElementActivityGrid_Id_"+ custScrPageRef);
	var rowIds = $table.jqGrid('getDataIDs');
	for(var i=0; i < rowIds.length; i++)
	{
		var rowData = $table.jqGrid('getRowData', rowIds[i]);
		var gridColumnName = rowData["gridColumnName"];
		if(!startsWith(rowIds[i], "new_") && isNotNullAndNotUndefined(gridColumnName) && isNotEmptyString(gridColumnName))
		{
			var title = getTitle(gridColumnName);
			/**
			 * regExp is used to identify that the title is html tag or not.
			 * if title is html tag then replace title with empty string 
			 */
			var htmlTagExp = /(?:(\"<|<)*([\w\W]+)(>\"|>)$)/g;
			title = title.match(htmlTagExp)? "" : title;
			$table.jqGrid('setCellValue',    rowIds[i], "gridColumnNameDesc", title);
			$table.jqGrid("setCellReadOnly", rowIds[i], "gridColumnNameDesc", "true");
		}
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used, to set changed to the row on clicking the checkbox enable y/n and proceed on fail
 * 
 * @param e
 * @returns
 */
function objCustElem_traceChange(e)
{
	if (e)
	{
		var row = $(e.target).closest('tr.jqgrow');
		if(isNotNullAndNotUndefined(row))
		{
	        var rowid = row.attr('id');
	        var $table = $("#ObjCustElementActivityGrid_Id_"+ custScrPageRef);
			//set row as selected
	        $table.jqGrid('setSelection', rowid, true);
			var myHtmlRow = $table.jqGrid("getInd", rowid, true);
			var $myHtmlRowObj = $(myHtmlRow);
			//set row as changed
			$myHtmlRowObj.attr("changed", "1");
			//set row as change on chrome browser, $myHtmlRowObj.attr("changed", "1") is not supported on chrome and vice versa.
			$myHtmlRowObj.trigger( "change" );
		}
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description this function is used, return the string of columnNames with key:pair; structure 
 * 
 * @returns String
 */
function objCustElem_loadGridColumnNamesCombo(fromRowSel)
{
	var gridId = $('#objectId').val();
	var $table = $("#" + gridId + "_" + custScrPageRef);
	if($table.length == 0)
	{
		$table = $("#"+gridId);
	}
	var rowData = $table.jqGrid('getGridParam','colModel');
	var rowColNames = $table.jqGrid('getGridParam','colNames');
	var gridColNamesArray = objCustElem_getGridColumnNames(fromRowSel); //return the column names already exists in the grid (already chosen columns)
	var list = "";
	for(var i=0; i<rowData.length; i++)
 	{
		var key = rowData[i].name;
		var value = rowColNames[i];
		if(rowData[i].editable == false || rowData[i].hidden == true || gridColNamesArray.indexOf(key) !== -1 || isEmptyString(value) || rowData[i].readonly=="readonly") continue;
        if(list.length > 0)
        {
        	list += ";";
        }
        list += key + ":" + value;
 	}
	return list;
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to, retrun the column names already exists in the grid (already chosen columns)
 * 
 * @param gridId
 * @returns Array
 */
function objCustElem_getGridColumnNames(fromRowSel)
{
	var $table = $("#ObjCustElementActivityGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var rowIds = $table.jqGrid('getDataIDs');
	var myArr = [];
	for(var i = 0 ; i < rowIds.length ; i++)
	{
		var rowObject = $table.jqGrid('getRowData',rowIds[i]);
		var gridColumnName = rowObject["gridColumnName"];
		var gridColumnNameDesc = rowObject["gridColumnNameDesc"];
		if(gridColumnNameDesc != null
			&& (isNotEmptyString(gridColumnNameDesc) 
				|| (isEmptyString(gridColumnNameDesc) && gridColumnName != null && isNotEmptyString(gridColumnName))))
		{
			if(!fromRowSel)
				myArr.push(gridColumnName);
			else if(rowIds[i] != selectedRowId)
				myArr.push(gridColumnName);	
		}
	}
	return myArr;
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description used to set grid column name description when column combo changed
 *  
 * @returns
 */
function objCustElem_GridColNamesComboChanged()
{
	var showConfirmDialog = objCustParamMapGrid_confirmationToSave('objCustElem_GridColNamesComboData');
	if(!showConfirmDialog)
	{
		objCustElem_GridColNamesComboData();
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro
 * @description used to set grid column name description
 *  
 * @returns
 */
function objCustElem_GridColNamesComboData()
{
	var $table = $("#ObjCustElementActivityGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	if(startsWith(selectedRowId, "new_"))
	{
		var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
		var gridColumnNameDesc = selectedRowObject["gridColumnNameDesc"];
		$table.jqGrid('setCellValue', selectedRowId, "gridColumnName", gridColumnNameDesc);
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description function used to manage the visibility of the activity fields
 * 
 * @param fromRowSel
 * @returns
 */
function objCustElem_CheckActivityIdVisibility(fromRowSel)
{
	var $table = $("#ObjCustElementActivityGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var activityType = selectedRowObject["activityDescription"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamElemActivitiesVO.ACTIVITY_TYPE",activityType);
	$table.jqGrid("setCellRequired", selectedRowId,"sysParamElemActivitiesVO.ACTIVITY_ID","true");
	// if this function is called from row select we should not reset the values 
	if(!fromRowSel)
	{
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.ACTIVITY_ID",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.DESCRIPTION",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.SCREEN_WIDTH",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.SCREEN_HEIGHT",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.SCREEN_TITLE",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.PROCEED_ON_FAIL",'');
		objCustParamMapGrid_remove();
	}
	/**
	 * this ajax request made to check the attached global activity has screen or not 
	 * and then set width, height and title fields depends on it
	 */
	var activityHasScreen = false;
	var action = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_returnButtonActionsList.action";
	$.ajax({
		url: action,
		type:"post",
		dataType:"json",
		async : false,
		data: {"dependancyCriteria.buttonId":selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_ID"]},
		success: function(data){
			if(typeof data["_error"] == "undefined" || data["_error"] == null)
			{
				var actionList = data.argumentsList;
				if(actionList != null)
				{
					for(var i=0; i<actionList.length; i++)
					{
						var imalApiVO = actionList[i].imImalApiVO;
						if(imalApiVO != null && imalApiVO.SERVICE_TYPE == "D")
						{
							activityHasScreen = true;
							return;
						}
					}
				}
			}
		}
	});
	$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamElemActivitiesVO.SCREEN_WIDTH", !activityHasScreen);
	$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamElemActivitiesVO.SCREEN_HEIGHT", !activityHasScreen);
	$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamElemActivitiesVO.SCREEN_TITLE", !activityHasScreen);
	//change result list of activity id
	jQuery.globalEval("options_liveSearch_sysParamElemActivitiesVO_ACTIVITY_ID_ObjCustElementActivityGrid_Id_"  + custScrPageRef + ".resultList = 'sysParamBtnCustVO.BTN_ID:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,sysParamBtnCustVO.DESCRIPTION:sysParamElemActivitiesVO.DESCRIPTION'");
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description change the combo list for activity with respect to the rows added
 *  
 * @param zUrl
 * @param zList
 * @param zId
 * @param zValue
 * @returns
 */
function objCustElem_customLoadCombo(zUrl, zList, zId, zValue)
{
	var $table = $("#ObjCustElementActivityGrid_Id_" + custScrPageRef);
	if(isEmptyString(zUrl))
	{
		zUrl = jQuery.contextPath+"/path/customization/CustomElementActivity_loadActivityTypeSelect";
	}
	zUrl += zUrl.indexOf("?")!=-1?"&":"?";
	zUrl += "fromObjDisplay=1&objColumnActivity=true";
	return loadCombo(zUrl, zList, zId, zValue);
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description when activity id is changed we must retreive the autocomplete data for the selected activity id
 *  
 * @returns
 */
function objCustElem_afterActivityIdChange()
{
	var showConfirmDialog = objCustParamMapGrid_confirmationToSave('objCustElem_processActivityIdChange');
	if(!showConfirmDialog)
	{
		objCustElem_processActivityIdChange();
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description when activity id is changed we must retreive the autocomplete data for the selected activity id
 *  
 * @returns
 */
function objCustElem_processActivityIdChange()
{
	var gridId = "ObjCustElementActivityGrid_Id_" + custScrPageRef;
	returnAutoCompleteData(gridId);
	objCustElem_CheckActivityIdVisibility(true);
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to add row in grid
 *  
 * @returns
 */
function objCustParamMapGrid_addMapGrid()
{
	var thCustTbl =	$("#ObjCustParamMapGrid_Id_" + custScrPageRef);
	var rId = thCustTbl.jqGrid('addInlineRow', {});
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to delete row in grid
 * 
 * @param theRowId
 * @returns
 */
function objCustParamMapGrid_deleteMapGrid(theRowId)
{
	_showConfirmMsg((typeof Confirm_Delete_Process_key != undefined)?Confirm_Delete_Process_key:"Delete Selected Row?",confirm_msg_title,function(yesNo)
		{
			if(yesNo)
			{
				var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
				var selectedRowObject = $table.jqGrid('getRowData', theRowId);
				var mapId = selectedRowObject["sysParamGlobalActArgMapVO.MAP_ID"];
				if(mapId == '')
				{
					$table.jqGrid('deleteGridRow',theRowId);
				}
				else
				{
					_showProgressBar(true);
					var deleteAction = jQuery.contextPath+"/path/buttoncustomization/ButtonCustomizationMaint_deleteButtonCustFieldMapping.action";
					var deleteParam = {"buttonCustomizationCO.mapId": mapId};
					$.ajax({
						url: deleteAction,
						type:"post",
						dataType:"json",
						data: deleteParam,
						success: function(data){
							if(typeof data["_error"] == "undefined" || data["_error"] == null)
							{
								if($table.html()!=null && isNotEmptyString($table.html()))
								{
									$table.trigger("reloadGrid");
								}
							}
							_showProgressBar(false);
						}
					});
				}
			}
		},"yesNo");
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to initialize default values for the grid
 *  
 * @param rowObj
 * @returns
 */
function objCustParamMapGrid_onRowSelTopic(rowObj)
{
	var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["sysParamGlobalActArgMapVO.MAP_TYPE"];
	var dynParamTypeDesc = selectedRowObject["sysParamGlobalActArgMapVO.DYN_PARAM_TYPE"];

	if(dynParamTypeDesc == '')
	{
		dynParamTypeDesc = selectedRowObject["dynParamTypeDesc"];
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DYN_PARAM_TYPE",dynParamTypeDesc);
	}
	if(mapTypeDesc == '')
	{
		mapTypeDesc = selectedRowObject["mapTypeDesc"];
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",mapTypeDesc);
	}
	if(mapTypeDesc == '3')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"screenFldIdDesc",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc",false);
	}
	else if(mapTypeDesc == '1' || mapTypeDesc == '2' || mapTypeDesc == '9')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",false);
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","true");
	}
	objCustParamMapGrid_adjustMapValueResultList(mapTypeDesc, null);
	objCustDisableEnableArgDynElemId(selectedRowObject["apiType"],true);
	objCustEnableDisableSelectionType();

	//Initialize rows default values
	var progRef = selectedRowObject["sysParamGlobalActArgMapVO.PROG_REF"];
	if(progRef == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.PROG_REF", $('#objCustParamMapGrid_PROG_REF_' + custScrPageRef).val() );
	}

	var pageRef = selectedRowObject["sysParamGlobalActArgMapVO.SCREEN_ELEM_PROG_REF"];
	if(pageRef == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.SCREEN_ELEM_PROG_REF", $('#objCustParamMapGrid_currentPageRef_' + custScrPageRef).val() );
	}

	var appName = selectedRowObject["sysParamGlobalActArgMapVO.APP_NAME"];
	if(appName == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.APP_NAME", $('#objCustParamMapGrid_APP_NAME_' + custScrPageRef).val() );
	}

	var elemFldId = selectedRowObject["sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER"];
	if(elemFldId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER", $('#objCustParamMapGrid_ELEM_FLD_IDENTIFIER_' + custScrPageRef).val() );
	}

	var btnId = selectedRowObject["sysParamGlobalActArgMapVO.BTN_ID"];
	if(btnId == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.BTN_ID", $('#objCustParamMapGrid_BTN_ID_' + custScrPageRef).val() );
	}

	var mapDirection = selectedRowObject["sysParamGlobalActArgMapVO.MAP_DIRECTION"];
	if(mapDirection == '')
	{
		mapDirection = selectedRowObject["mapDirection"];
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_DIRECTION",mapDirection);
	}

	var gridColumnName = selectedRowObject["gridColumnName"];
	if(gridColumnName == '')
	{
		$table.jqGrid('setCellValue', selectedRowId,"gridColumnName", $('#objCustParamMapGrid_GRID_COLUMN_NAME_' + custScrPageRef).val() );
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description
 * 
 * @param mapTypeDesc
 * @param selectedRowId
 * @returns
 */
function objCustParamMapGrid_adjustMapValueResultList(mapTypeDesc,selectedRowId)
{
	var resultList = "";
	var dataAction = "";
	var paramList = "";
	var actionName = "";
	var dependencySrc = "";
	var dependency = "";
	var params = "";

	if(mapTypeDesc == '2')	// Session
	{
		resultList = "'propertyName:screenFldIdDesc_lookuptxt'";
		paramList = "'criteria.mapType:sysParamGlobalActArgMapVO.MAP_TYPE'";
		dependencySrc = jQuery.contextPath + "/path/buttoncustomization/ButtonCustomizationMaint_dependencyForScreenElementsOrSessionLookup";
		dependency = "buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION:mapDescription";
		params = "buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamActionArgMapVO.MAP_TYPE:sysParamGlobalActArgMapVO.MAP_TYPE";
	}
	else if(mapTypeDesc == '1' || mapTypeDesc == '9')	// Screen or Grid 
	{
		if(mapTypeDesc == '1')
		{
			resultList = "'FLD_IDENTIFIER:screenFldIdDesc_lookuptxt,FIELD_KEY_LABEL_CODE:mapDescription,FROM_SOURCE:fromSource'";
		}
		else if( mapTypeDesc == '9')
		{
			resultList = "'propertyName:screenFldIdDesc_lookuptxt,description:mapDescription'";
		}
		paramList = "'criteria.mapType:sysParamGlobalActArgMapVO.MAP_TYPE,criteria.currAppName:objCustParamMapGrid_APP_NAME_" + custScrPageRef + ",criteria.progRef:objCustParamMapGrid_currentPageRef_" + custScrPageRef + ",criteria.gridColumns:objCustParamMapGrid_GRID_COLUMNS_" + custScrPageRef + "'";
		dependencySrc = jQuery.contextPath + "/path/buttoncustomization/ButtonCustomizationMaint_dependencyForScreenElementsOrSessionLookup";
		dependency = "buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamBtnCustVO.DESCRIPTION:mapDescription,buttonCustomizationCO.sysParamScreenElementsVO.FROM_SOURCE:fromSource";
		params = "buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:screenFldIdDesc_lookuptxt,buttonCustomizationCO.sysParamActionArgMapVO.MAP_TYPE:sysParamGlobalActArgMapVO.MAP_TYPE,buttonCustomizationCO.sysParamBtnCustVO.APP_NAME:objCustParamMapGrid_APP_NAME_" + custScrPageRef + ",buttonCustomizationCO.sysParamBtnCustVO.PROG_REF:objCustParamMapGrid_currentPageRef_" + custScrPageRef + ",buttonCustomizationCO.gridColumns:objCustParamMapGrid_GRID_COLUMNS_" + custScrPageRef;			
	}
	
	if(mapTypeDesc == '1' || mapTypeDesc == '2' || mapTypeDesc == '9')
	{
		jQuery.globalEval("options_liveSearch_screenFldIdDesc_ObjCustParamMapGrid_Id_"  + custScrPageRef + ".resultList = " + resultList);
		jQuery.globalEval("options_liveSearch_screenFldIdDesc_ObjCustParamMapGrid_Id_"  + custScrPageRef + ".paramList = " + paramList);
		
		var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
		var colModel = $table.jqGrid('getGridParam', 'colModel');
		for (var i = 0; i < colModel.length; i++)
		{
			if (colModel[i].name == 'screenFldIdDesc')
			{
				colModel[i].dependencySrc = dependencySrc;
				colModel[i].dependency = dependency;
				colModel[i].params = params;
				break;
			}
		}
		$table.jqGrid('setGridParam', 'colModel', colModel);		
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description
 * 
 * @param apiType
 * @param fromRowSel
 * @returns
 */
function objCustDisableEnableArgDynElemId(apiType,fromRowSel)
{
	var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapDirection = selectedRowObject["mapDirection"];
	
	$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","false");
	//integration or Report we should enable the arg_Id and disable dyn_elem_Id
	if((apiType == "1"|| apiType == "2") && mapDirection!=null)
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "dynParamTypeDesc","true");
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",'');
		$table.jqGrid('setCellValue', selectedRowId, "dynElemDescription",'');
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","false");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.ARG_ID","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",false);
		$table.jqGrid("setCellRequired", selectedRowId,"dynParamTypeDesc",false);
		if(!fromRowSel)
		{
			$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID",'');
			$table.jqGrid('setCellValue', selectedRowId, "argDescription",'');
			$table.jqGrid('setCellValue', selectedRowId, "screenFldIdDesc",'');
			$table.jqGrid('setCellValue', selectedRowId, "mapDescription",'');
		}
		if(apiType == "2")
		{
			$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.MAP_DIRECTION",'I');
			$table.jqGrid('setCellValue', selectedRowId, "mapDirection",'I');
			$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","true");
			$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","false");
			mapDirection = "I";
		}
	}
	//dynamic screen we should disable the arg_Id and enable dyn_elem_Id
	else if(apiType == "3")
	{
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.MAP_DIRECTION",'I');
		$table.jqGrid('setCellValue', selectedRowId, "mapDirection",'I');
		mapDirection = "I";
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "dynParamTypeDesc","false");
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID",'');
		$table.jqGrid('setCellValue', selectedRowId, "argDescription",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.ARG_ID",false);
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",false);
		$table.jqGrid("setCellRequired", selectedRowId,"dynParamTypeDesc",false);
		if(!fromRowSel)
		{
			$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_ID",'');
			$table.jqGrid('setCellValue', selectedRowId, "dynElemDescription",'');
		}
	}
	else
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapDirection","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "dynParamTypeDesc","true");
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ID",'');
		$table.jqGrid('setCellValue', selectedRowId, "argDescription",'');
		$table.jqGrid('setCellValue', selectedRowId, "sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",'');
		$table.jqGrid('setCellValue', selectedRowId, "dynElemDescription",'');
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.ARG_ID",false);
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",false);
		$table.jqGrid("setCellRequired", selectedRowId,"dynElemDescription",false);
	}
	
	if(mapDirection=="O")
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "mapTypeDesc","true");
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",1);
		$table.jqGrid('setCellValue', selectedRowId,"mapTypeDesc",1);
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_DIRECTION",mapDirection);
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to set map direction when changed
 * 
 * @returns
 */
function objCustomizationParamMapGrid_mapDirectionChanged()
{
	var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapDirection = selectedRowObject["mapDirection"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_DIRECTION",mapDirection);
	objCustDisableEnableArgDynElemId(selectedRowObject["apiType"],false);
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to enable/disable the selection type
 * 
 * @returns
 */
function objCustEnableDisableSelectionType()
{
	var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var fromSource = selectedRowObject["fromSource"];
	var delimiter = selectedRowObject["sysParamGlobalActArgMapVO.DELIMITER"];
	var mapDirection = selectedRowObject["mapDirection"];
	
	if("GRID" == fromSource  && mapDirection =='I')
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","false");
		$table.jqGrid('setCellRequired', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","true");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.SELECTION_TYPE","false");
	}else
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DELIMITER",'');
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.SELECTION_TYPE","");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","true");
		$table.jqGrid('setCellRequired', selectedRowId, "sysParamGlobalActArgMapVO.DELIMITER","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.SELECTION_TYPE","true");
	}
	
	var screenFldIdDesc = selectedRowObject["screenFldIdDesc"];
	var mapDescription  = selectedRowObject["mapDescription"];
	if(isNotNullAndNotUndefined(screenFldIdDesc) && isNotEmptyString(screenFldIdDesc)
			&& isNotNullAndNotUndefined(mapDescription) && isNotEmptyString(mapDescription)
			&& $("input[id='"+ screenFldIdDesc +"'][propid='"+ mapDescription +"'][type='file']").length > 0)
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN","false");
	}
	else
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN","true");
		$table.jqGrid('setCellValue'   , selectedRowId, "sysParamGlobalActArgMapVO.ARG_ADDITIONAL_ATTR_YN","0");
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to enable/disable the fields based on api type
 * 
 * @param data
 * @returns
 */
function objCustomizationParamMapGrid_afterOP_IDDependency(data)
{
	objCustDisableEnableArgDynElemId(data.buttonCustomizationCO.sysParamBtnCustActionsVO.API_TYPE, true);
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to set readonly/required field MAP_VALUE based on mapTypeDesc
 * 
 * @param fromRowSel
 * @returns
 */
function objCustomizationParamMapGrid_mapTypeChanged(fromRowSel)
{
	var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["mapTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_TYPE",mapTypeDesc);

	if(mapTypeDesc == '3') //constant map type
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc",false);
	}
	else if(mapTypeDesc == '1' || mapTypeDesc == '2' || mapTypeDesc == '9') //screen or session map type or grid column
	{
		$table.jqGrid('setCellReadOnly', selectedRowId, "screenFldIdDesc","false");
		$table.jqGrid('setCellReadOnly', selectedRowId, "sysParamGlobalActArgMapVO.MAP_VALUE","true");
		$table.jqGrid("setCellRequired", selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",false);
		$table.jqGrid("setCellRequired", selectedRowId,"screenFldIdDesc","true");
	}
	if(!fromRowSel)
	{
		$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.MAP_VALUE",'');
		$table.jqGrid('setCellValue', selectedRowId,"screenFldIdDesc",'');
		$table.jqGrid('setCellValue', selectedRowId,"mapDescription",'');
		$table.jqGrid('setCellValue', selectedRowId,"fromSource",'');
		objCustEnableDisableSelectionType();
	}

	objCustParamMapGrid_adjustMapValueResultList(mapTypeDesc,selectedRowId);
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to set the value of DYN_PARAM_TYPE and DYN_ELEM_IDENTIFIER and Description
 * 
 * @returns
 */
function objCustomizationParamMapGrid_dynParamTypeChanged()
{
	var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
	var mapTypeDesc = selectedRowObject["dynParamTypeDesc"];
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DYN_PARAM_TYPE",mapTypeDesc);
	$table.jqGrid('setCellValue', selectedRowId,"sysParamGlobalActArgMapVO.DYN_ELEM_IDENTIFIER",'');
	$table.jqGrid('setCellValue', selectedRowId,"dynElemDescription",'');
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to display save confirmation dialog and perform operation 
 * 
 * @param methodName 
 * @returns boolean isMsgDisplayed
 */
function objCustParamMapGrid_confirmationToSave(methodName)
{
	var isMsgDisplayed = false;
	if(objCustElem_showConfirmDialog())
	{
		var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
		if(isNotNullAndNotUndefined($table) && $table.length > 0)
		{
			var records = $table.jqGrid('getGridParam', 'records');
			var getChangedRowData = $table.jqGrid('getChangedRowData');
			if(records > 0 && isNotEmptyString(getChangedRowData))
			{
				isMsgDisplayed = true;
				$("#objCust_confirmDialog_"+custScrPageRef).val(false)
				var checkRequiredCells = $table.jqGrid('checkRequiredCells');
				if(!checkRequiredCells)
				{
					$("#info_dialog").css('display','none');
				}
				_showConfirmMsg((typeof Confirm_Save_Process_key != undefined) ? Confirm_Save_Process_key: "Confirm Save Process?", confirm_msg_title,
					function(yesNo)
					{
						if (yesNo)
						{
							objCustElem_valuesBeforeChange();
							if(checkRequiredCells)
							{
								saveCustActivitiesOnColumn();
							}
							else
							{
								$("#info_dialog").css('display','block');
							}
						}
						else
						{
							if(!checkRequiredCells)
							{
								$("#info_dialog").css('display','block');
								$("#info_dialog").find("#closedialog").click();
							}
							objCustParamMapGrid_remove();
							if(isNotEmptyString(methodName))
							{
								window[methodName]();
							}
						}
						$("#objCust_confirmDialog_"+custScrPageRef).val(true);
					},
				"yesNo");
			}
			else
			{
				objCustParamMapGrid_remove();
			}
		}
	}
	return isMsgDisplayed;
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to set the previous value of grid columns when update row
 * 
 * @returns
 */
function objCustElem_valuesBeforeChange()
{
	var gridRow = objCustElem_ParamSelRowData();
	if(isNotNullAndNotUndefined(gridRow))
	{
		var gridId = "ObjCustElementActivityGrid_Id_" + custScrPageRef;
		var $table = $("#" + gridId);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
		var ind = $table.jqGrid("getInd", selectedRowId, true);
		if(gridRow.rowId == selectedRowId && $(ind).attr("editable") == "1")
		{
			$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.ACTIVITY_ID", gridRow.globalActivityId);
			$table.jqGrid('setCellValue', selectedRowId, "sysParamElemActivitiesVO.DESCRIPTION", gridRow.operationDesc);
			if(startsWith(selectedRowId, "new_"))
			{
				$table.jqGrid('setCellValue', selectedRowId, "gridColumnName", gridRow.gridColumnName);
				$table.jqGrid('setCellValue', selectedRowId, "gridColumnNameDesc", gridRow.gridColumnName);
			}
		}
		else
		{
			$table.jqGrid('restoreRow', selectedRowId);
		}
		$table.jqGrid('setSelection', gridRow.rowId, true);
	}
	$("#objCust_confirmDialog_"+custScrPageRef).val(true);
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to save the records of Grid "Custom Activity on Columns" 
 * and "Parameters Custom Activity on Columns" 
 * 
 * @returns
 */
function saveCustActivitiesOnColumn()
{
	var objDisplayId = $("#objectDisplayID").val();
	/**
	 * validate objDisplayId if null or empty then save the full customization dialog
	 * otherwise save grid data of "Custom Activity on Columns" and "Parameters Custom Activity on Columns" if exists
	 */
	if(isNullOrUndefined(objDisplayId) || isEmptyString(objDisplayId))
	{
		$("#fieldCust_saveBtn").click();
	}
	else if($('#ObjCustElementActivityGrid_Id_' + custScrPageRef).length > 0)
	{
		var theForm = 'custCO.sysParamObjDisplayVO.PROG_REF=' + custScrPageRef;
		theForm += '&custCO.cutomizationPROG_REF=' + custScrPageRef;
		theForm += '&custCO.appName=' + $("#fldcust_appName_" + custScrPageRef).val();
		theForm += '&custCO.sysParamObjDisplayVO.OBJECT_ID=' + $("#objectId").val();
		theForm += '&custCO.sysParamObjDisplayVO.OBJECT_TYPE=' + $("#objectType").val();
		theForm += '&custCO.sysParamObjDisplayVO.OBJ_DISPLAY_ID=' + objDisplayId;

		var $table = $("#ObjCustElementActivityGrid_Id_" + custScrPageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		selectedRowObject = $table.jqGrid('getRowData', selectedRowId);
		var checkRequiredCells = $table.jqGrid('checkRequiredCells');
		if(checkRequiredCells)
		{
			var jsonOpUpdates = $table.jqGrid('getAllRows',false);
			theForm += '&custCO.customizationCO.objCustomElementActivitiesGridUpdate=' + encodeURIComponent(jsonOpUpdates);
		}
		else
		{
			_showProgressBar(false);
			return; 
		}

		//In case of parameters for custom activity on column get grid json and append, to submit
		if($('#ObjCustParamMapGrid_Id_' + custScrPageRef).length > 0 && selectedRowObject!=null && selectedRowObject["sysParamElemActivitiesVO.ACTIVITY_TYPE"] == '6' )
		{
			var $table = $("#ObjCustParamMapGrid_Id_" + custScrPageRef);
			var checkRequiredCells = $table.jqGrid('checkRequiredCells');
			if(checkRequiredCells)
			{	
				var jsonOpUpdates = $table.jqGrid('getAllRows',false);
				theForm += '&custCO.customizationCO.objCustParamMapGridUpdate=' + encodeURIComponent(jsonOpUpdates);
			}
			else
			{
				_showProgressBar(false);
				return; 
			}
		}

		$.ajax({
			 url: jQuery.contextPath+"/path/objectCustomization/objectCustomizationMain_updateCustActivityOnColumn",
	         type:"post",
			 dataType:"json",
			 data: theForm,
			 success: function(data)
	 		 {
				 if(typeof data["_error"] == "undefined" || data["_error"] == null)
		 		 {
					 $('#ObjCustElementActivityGrid_Id_' + custScrPageRef).trigger("reloadGrid");
					 objCustParamMapGrid_remove();
					 _showErrorMsg(record_was_Updated_Successfully_key,info_msg_title);
		 		 }
	 			 _showProgressBar(false);
		 	 }
		});
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to remove the parameter Grid
 *  
 * @returns
 */
function objCustParamMapGrid_remove()
{
	var $table = $('#objcustElem_parmaMapGrid_' + custScrPageRef);
	if(isNotNullAndNotUndefined($table) && $table.length > 0)
	{
		$table.html('');
	}
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to get Parameter Selected Row Data
 * 
 * @returns JSON gridRowData
 */
function objCustElem_ParamSelRowData()
{
	var gridRowData;
	var objCustGridRow = $("#objCust_gridRow_"+custScrPageRef);
	if(isNotNullAndNotUndefined(objCustGridRow))
	{
		var gridRowJson = objCustGridRow.val();
		if(isNotEmptyString(gridRowJson))
		{
			gridRowData = JSON.parse(gridRowJson);
		}
	}
	return gridRowData;
}
/**
 * [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements
 * @createdBy Sajjad Soomro 
 * @description this function is used to take decision to show confirm dialog or not.
 * 
 * @returns boolean true/false
 */
function objCustElem_showConfirmDialog()
{
	var showDialog = $("#objCust_confirmDialog_"+custScrPageRef).val();
	if(isNotNullAndNotUndefined(showDialog) && (showDialog == true || showDialog == "true"))
	{
		return true;
	}
	return false;
}