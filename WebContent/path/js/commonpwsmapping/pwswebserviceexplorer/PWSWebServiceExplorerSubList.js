function pwsWebServiceExplorerOnSubGridComplete(event,data)
{
	applyWebServiceExplorerSubGridDefaultFunctionality(event,data);
	var gridId = data.id;
	var g = $("#"+gridId);
	var formId = "webServiceGuiGridForm_"+_pageRef;
	var gridSelectorName = data.id;
	var grid = $("#"+gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');
	loadSubGridData(grid,ids);
	var ids = grid.jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) 
	{
		var checkVal = grid.jqGrid('getCell', ids[i], 'checkGridRow');
		var value = grid.jqGrid('getCell', ids[i], 'value');
		if ("" != checkVal && undefined != checkVal && null != checkVal) 
		{
			updateSelectOption(ids[i]);
		}
		else if(("" == checkVal || undefined == checkVal || null == checkVal) && ("" != value && undefined != value && null != value))
		{
			updateSelectOption(ids[i],false);
		}		
	}
//	handleGridCheckBox(gridId);
}

function handleGridCheckBox(gridId)
{
	try{
	var parentGrid = returnParentGrid(gridId);
	var parentRowId = returnGridParentRowId(gridId);
	if(undefined != parentGrid && undefined != parentRowId && isRowSelected(parentRowId) && isSubGridExpanded(parentRowId))
	{
		checkGrid(gridId);
	}
	}
	catch(e)
	{
		console.log(e);
	}
}

function onPwsExplorerSubGridRowSelect(rowObj)
{
	onSubGridRowSelTopic(rowObj);
	$("#validation_dialog_"+_pageRef).val("1");
	var fieldType = grid.jqGrid('getCell', rowObj.originalEvent.id, 'fieldType');
    var val = grid.jqGrid('getCell',rowObj.originalEvent.id,'value');
    var parentRowId = returnSubGridRowParentRowId(rowObj.originalEvent.id);   
    var parentGridId = getGridIdFromRow(parentRowId);
    var selRowIds = $("#"+parentGridId).jqGrid("getGridParam", "selarrrow");    
    var fieldName = grid.jqGrid('getCell', rowObj.originalEvent.id, 'fieldName');
    var gridId = rowObj.currentTarget.id;
    var selectId = undefined;
    var hasRestriction = grid.jqGrid('getCell', rowObj.originalEvent.id, 'hasRestriction');
    var x;
    var y;
    for (x in selRowIds)
    {
    	if(selRowIds[x] == parentRowId)
    	{
    		y = selRowIds[x];
    	}
    }
    if(y != parentRowId)
    {
    	$("#"+parentGridId).jqGrid('setSelection',parentRowId, true);   
    }
    
//	if(undefined != gridId && gridId.includes("_response"))
//	{
//		selectId = fieldName+"_"+_pageRef+"_response_mappingField";
//		$("#"+selectId).children().first().remove();
//		$("#"+selectId).prepend('<option value="'+fieldName+'"> '+fieldName+' </option>');
//	}
//	else{
//		rowId = rowObj.originalEvent.id;
//		selectId = rowId+"_mappingField";
//		$("#"+selectId).children().first().remove();
//		$("#"+selectId).prepend('<option value="'+fieldName+'"> '+fieldName+' </option>');
//		//$("#"+selectId).prepend('<option></option>').val(fieldName).html(fieldName)
//	}
//	
//	if(hasRestriction == "1")
//	{
//		var list = undefined;
//		var params = {};
//		var url = jQuery.contextPath+"/path/common/WebserviceExplorer/WebServiceExplorerMaint_fillRestrictions";
//		var zList = undefined;
//		var zId = undefined;
//		var zValue = undefined;
//	//	updateSelectionOptions(rowObj,"restriction",list);
//		list = webServiceExplorer_loadCombo(url, zList, zId, zValue,params
//		function()
//		{
//			var gridId = rowObj.currentTarget.id;
//			var selectId = undefined;
//			var rowId = undefined;
//			var fieldName = "test";
//			if(undefined != gridId && includes(gridId,_response))
//			{
//				selectId = fieldName+"_"+_pageRef+"_response_"+columnName;
//				$("#"+selectId).children().first().remove();
//				$("#"+selectId).prepend('<option selected="selected"></option>');
//				$.each(list,function(i,v)
//				{
//					$("#"+selectId).prepend('<option value="'+fieldName+'"> '+fieldName+' </option>');
//				}	
//				);
//			}
//			else{
//				rowId = rowObj.originalEvent.id;
//				selectId = rowId+"_"+columnName;
//				$("#"+selectId).children().first().remove();
//				$("#"+selectId).prepend('<option selected="selected"></option>');
//				$.each(list,function(i,v)
//				{
//					$("#"+selectId).prepend('<option></option>').val(fieldName).html(fieldName)
//				}	
//				);
//			}
//		}
//		);
}