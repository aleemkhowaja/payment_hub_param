/**
 * @Auther:Raed Saad
 * @Date:MARCH 2018
 * @Team: PEMTS JAVA Team.
 * @copyright: PathSolution 2018
 * @User Story: USER STORY #653853  WSDL explorer
 * @Description: Tree Sub Grid JS function
 **/

/**
 * @Descritpion: Executed when grid loads
 */
function webServiceExplorerOnGridCompleteFn(event, data) {
	var gridId = data.id;
	var grid = $("#" + gridId);
	var ids = grid.jqGrid('getDataIDs');
	var gridParam = grid.jqGrid('getGridParam', 'colModel');
	applyWebServiceExplorerDefaultFunctionality(event, data);
	var gridSelectorName = data.id;
	var grid = $("#" + gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');

	/*when loading configs from lookup*/
	try {
		var isFromLoad = $("#serviceDataId_" + _pageRef).val();
		if (undefined != isFromLoad && null != isFromLoad && isFromLoad.length > 0) {
			loadSubGridData(grid, ids);
		}
	} catch (e) {
		console.log(e);
	}

	/*adding event on row select event */
	/*
	try {
		gridRowOnClickEvent(gridSelectorName);
	} catch (e) {
		console.log("error in gridRowOnClickEvent");
	}
	*/
}

/**
 * @description function to apply default functionality on web service explorer
 * @param event
 * @param data
 * @returns
 */
function applyWebServiceExplorerDefaultFunctionality(event, data) {
	try {
		$('td').removeClass("path-subgrd-hdr");
	} catch (e) {
		console.log(e);
	}
	var formId = "webServiceGuiGridForm_" + _pageRef;
	var listOfHiddenFields = document.createElement('div');
	var gridSelectorName = data.id;
	hideGridSearchToolBar(gridSelectorName);
	var grid = $("#" + gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');
	var wsdlUrl = grid.jqGrid('getCell', ids[0], 'wsdlUrl');
	var nameSpaceUri = grid.jqGrid('getCell', ids[0], 'nameSpaceUri');
	$("#wsdlUrl_" + _pageRef).val(wsdlUrl);
	$("#nameSpaceUri_" + _pageRef).val(nameSpaceUri);
	for (var i = 0; i < ids.length; i++) {
		var rowid = ids[i];
		var columnId = grid.jqGrid('getCell', rowid, 'gridColumnID');
		var fieldType = grid.jqGrid('getCell', rowid, 'fieldType');
		var fName = grid.jqGrid('getCell', rowid, 'fieldName');
		var mandatory = grid.jqGrid('getCell', rowid, 'mandatory');
		var restriction = grid.jqGrid('getCell', rowid, 'restriction');
		var idArr = columnId.split("_concat_");
		var idArrLength = idArr.length;
		var rowId = rowid;
		if (idArr[0] == "1")
		{
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "false");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");
			/* dynamically create a hidden field having id field_pageRef */
			var fId = fName + "_" + _pageRef;
			var fName = fName;
			var fValue = columnId;
			var purpose = "checkbox";
			var hField = returnHiddenField(fId, fName, fValue,purpose);
			listOfHiddenFields.appendChild(hField);
		} else {
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "false");
		}
		var loadedVal = grid.jqGrid('getCell', rowid, 'value');
		if ("" != loadedVal && undefined != loadedVal && null != loadedVal) {
			//grid.jqGrid('setSelection',rowid, true);		
			updateSelectOption(rowid);
		}
		if (mandatory == 'mandatory') {
			$('#' + rowid).attr('mandatory', 'true');
			// $("#" + rowid).css({ 'color': 'red', 'font-size': '12px','font-style':'italic','font-weight':'bold'});
			$("#" + rowid).css({
				'color' : 'red',
				'font-weight' : 'bold'
			});
		} else {
			$('#' + rowid).attr('mandatory', 'false');
		}
		if (idArr[idArrLength - 1] == "null" || idArr[idArrLength - 1] == "0" || idArr[idArrLength - 1] == "") {
			$('#' + rowid).children("td.sgcollapsed").unbind().html("");
			$('#' + rowid).attr('hasSubGrid', 'false');
		//grid.jqGrid("setCellRequired", rowid,'value',true);
		} 
		else {
			var parentRowId = rowid;
			var gridExpand = "0";
			var hField = rowid + "_subGrid_" + _pageRef;
			$('#' + rowid).children("td.sgcollapsed").unbind().html(""); // unbind the orignial subgrid event
			$('#' + rowid).children("td.sgcollapsed").append('<span id="icon_' + rowid + '_' + _pageRef + '" onclick = "loadSubGridEvent(event,' + rowid + ')"  class="ui-icon ui-icon-plus"></span>');
			$('#' + rowid).attr('hasSubGrid', 'true');
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");
			var $tr = $("#" + rowid);
			var $cbox = $tr.find('input:first');
			$cbox.attr('onclick', 'checkBoxEvent(' + rowid + ',\'subgrid\')');
			/* dynamically create a hidden field having id field_pageRef */
			var fId = rowid + "_subGrid_" + _pageRef;
			var fName = rowid + "_subGrid_" + _pageRef;
			var fValue = gridExpand;
			var purpose = "checkbox";
			var hField = returnHiddenField(fId, fName, fValue,purpose);
			listOfHiddenFields.appendChild(hField);
		}
		if ("HashMap" == checkForType(fieldType)) {
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'mappingField', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");
			$('#' + rowid).attr('hasSubGrid', 'true');
			var gridExpand = "0";
			$('#' + rowid).children("td.sgcollapsed").unbind().html("");
			$('#' + rowid).children("td.sgcollapsed").append('<span id="icon_' + rowid + '_' + _pageRef + '" onclick = "loadDynamicSubGrid(' + rowid + ',\'HashMap\')"  class="ui-icon ui-icon-plus"></span>');
			var fId = rowid + "_subGrid_" + _pageRef;
			var fName = rowid + "_subGrid_" + _pageRef;
			var fValue = gridExpand;
			var purpose = "checkbox";
			var hField = returnHiddenField(fId, fName, fValue,purpose);
			listOfHiddenFields.appendChild(hField);
		} 
		else if ("List" == checkForType(fieldType) || "List<Object>" == checkForType(fieldType)) {
			var typeToPass = checkForType(fieldType);
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");
			var gridExpand = "0";
			$('#' + rowid).children("td.sgcollapsed").unbind().html("");
			$('#' + rowid).children("td.sgcollapsed").append('<span id="icon_' + rowid + '_' + _pageRef + '" onclick = "loadDynamicSubGrid(' + rowid + ',\'' + typeToPass + '\')"  class="ui-icon ui-icon-plus"></span>');
			//$("#webServiceGuiGridForm_"+_pageRef).append('<input type="hidden" id="'+rowid+"_subGrid_"+_pageRef+'" name="'+rowid+"_subGrid_"+_pageRef+'" value="'+gridExpand+'" />');   	
			$('#' + rowid).attr('hasSubGrid', 'true');
			var $tr = $("#" + rowid);
			var $cbox = $tr.find('input:first');
			$cbox.attr('onclick', 'checkBoxEvent(' + grid + ',' + $tr + ',' + $cbox + ',' + typeToPass + ')');
			var fId = rowid + "_subGrid_" + _pageRef;
			var fName = rowid + "_subGrid_" + _pageRef;
			var fValue = gridExpand;
			var purpose = "checkbox";
			var hField = returnHiddenField(fId, fName, fValue,purpose);
			listOfHiddenFields.appendChild(hField);
		}
	}
	createHiddenFields(formId, listOfHiddenFields);
	resizeGrids();
}

/**
 * 
 * @param $grid
 * @param $tr
 * @param arg
 * @returns
 */
function checkBoxEvent(rowObj, arg) 
{
	var rowid = rowObj.id;
	var lstGrids = returnParentGridsList(rowid);
	var mainGridSelectorID = lstGrids[lstGrids.length - 1].id;
	var $cbox = $("#" + rowid).find('input:first');
	var listOfHiddenFields = document.createElement('div');
	var lst = returnParentGridsList(rowid);
	var parentGridId = lst[0].id;
	var gridId = getGridIdFromRow(rowid);
	var grid = $("#" + gridId);
	var fieldType = grid.jqGrid('getCell', rowid, 'fieldType');
	if ("List" == checkForType(fieldType) || "List<Object>" == checkForType(fieldType))
	{
		return;
	}
	var parentRowId = returnSubGridRowParentRowId(rowid);
	var gridId;
	var parentGrid;
	var fieldType;
	var typeToPass;
	if (null != parentRowId && undefined != parentRowId) 
	{
		gridId = getGridIdFromRow(parentRowId);
		parentGrid = $("#" + gridId);
		fieldType = parentGrid.jqGrid('getCell', parentRowId, 'fieldType');
		typeToPass = checkForType(fieldType);
	}
	var subGridSelector = parentGridId.replace("_table", +"");
	subGridSelector = subGridSelector + "_" + rowid + "_table";
	if(!hasSubGrid(rowid))
	{
		var subGridId = getSubGridIdFromParentRowId(rowid);
		loadSubGridEvent(null, rowObj,undefined);
	}
	else{
		if ($cbox.prop("checked"))
		{
			var fId;
			if (null != parentRowId && undefined != parentRowId && ("List" != typeToPass || "List<Object>" != typeToPass))
				{
				fId = "checkbox_event_triggered_" + mainGridSelectorID + "_" + rowid + "_table_" + _pageRef;
			} 
			else {
				fId = "checkbox_event_triggered_" + subGridSelector + "_" + _pageRef;
			}
			var fName = 'checkbox_event_triggered';
			var fValue = 'true';
			var formId = 'webServiceGuiGridForm_' + _pageRef;
			var hField = null;

			if ($("#" + fId).length > 0)
			{
				$("#" + fId).val('true');
			} 
			else {
				hField = returnHiddenField(fId, fName, fValue);
				listOfHiddenFields.appendChild(hField);
				createHiddenFields(formId, listOfHiddenFields);
				if ("" == $("#" + fId).val() || undefined == $("#" + fId).val()) {
					$("#" + fId).val("true");
				}
			}
			var subGridId = getSubGridIdFromParentRowId(rowid);
			showSubGridByParentRowId(rowid);
			checkUcheckGridOrSubGrid(subGridId);
		}
		else{
			var fId;
			if (null != parentRowId && undefined != parentRowId && ("List" != typeToPass || "List<Object>" != typeToPass))
				{
				fId = "checkbox_event_triggered_" + mainGridSelectorID + "_" + rowid + "_table_" + _pageRef;
			} 
			else {
				fId = "checkbox_event_triggered_" + subGridSelector + "_" + _pageRef;
			}
			var fName = 'checkbox_event_triggered';
			var fValue = 'true';
			var formId = 'webServiceGuiGridForm_' + _pageRef;
			var hField = null;

			if ($("#" + fId).length > 0)
			{
				$("#" + fId).val('false');
			} 
			else {
				hField = returnHiddenField(fId, fName, fValue);
				listOfHiddenFields.appendChild(hField);
				createHiddenFields(formId, listOfHiddenFields);
				if ("" == $("#" + fId).val() || undefined == $("#" + fId).val()) {
					$("#" + fId).val("false");
				}
			}
			var subGridId = getSubGridIdFromParentRowId(rowid);
			hideSubGridByParentRowId(rowid);
			checkUcheckGridOrSubGrid(subGridId);
		}	
	}
}


function triggerCheckBoxEvent(rowObj)
{
	alert(rowObj);
}

function NEW_PENDING_applyWebServiceExplorerDefaultFunctionality(event, data) {
	try {
		$('td').removeClass("path-subgrd-hdr");
	} catch (e) {
		console.log(e);
	}
	var formId = "webServiceGuiGridForm_" + _pageRef;
	var listOfHiddenFields = document.createElement('div');
	var gridSelectorName = data.id;
	hideGridSearchToolBar(gridSelectorName);
	var grid = $("#" + gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');
	var wsdlUrl = grid.jqGrid('getCell', ids[0], 'wsdlUrl');
	var nameSpaceUri = grid.jqGrid('getCell', ids[0], 'nameSpaceUri');

	$("#wsdlUrl_" + _pageRef).val(wsdlUrl);
	$("#nameSpaceUri_" + _pageRef).val(nameSpaceUri);
	for (var i = 0; i < ids.length; i++) {
		var rowid = ids[i];
		var columnId = grid.jqGrid('getCell', rowid, 'gridColumnID');
		var fieldType = grid.jqGrid('getCell', rowid, 'fieldType');
		var fName = grid.jqGrid('getCell', rowid, 'fieldName');
		var mandatory = grid.jqGrid('getCell', rowid, 'mandatory');
		var restriction = grid.jqGrid('getCell', rowid, 'restriction');
		var idArr = columnId.split("_concat_");
		var idArrLength = idArr.length;

		if (idArr[0] == "1") {
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "false");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");

			/* dynamically create a hidden field having id field_pageRef */
			var fId = fName + "_" + _pageRef;
			var fName = fName;
			var fValue = columnId;
			var hField = returnHiddenField(fId, fName, fValue);
			listOfHiddenFields.appendChild(hField);
		} else {
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "false");
		}

		var loadedVal = grid.jqGrid('getCell', rowid, 'value');
		if ("" != loadedVal && undefined != loadedVal && null != loadedVal) {
			updateSelectOption(rowid);
		}

		if (idArr[idArrLength - 1] == "null" || idArr[idArrLength - 1] == "0" || idArr[idArrLength - 1] == "") {
			//$('#' + rowid).children("td.sgcollapsed").unbind().html("");
			createEmptySubGridExpandColumn(gridSelectorName, rowid);
		//grid.jqGrid("setCellRequired", rowid,'value',true);
		} else {
			//	$('#' + rowid).find('input[type=checkbox]').prop('checked',true);
			var parentRowId = rowid;
			var gridExpand = "0";
			var hField = rowid + "_subGrid_" + _pageRef;
			//		    	$('#' + rowid).children("td.sgcollapsed").unbind().html(""); // unbind the orignial subgrid event
			//		    	$('#' + rowid).children("td.sgcollapsed").append('<span id="icon_'+rowid+'_'+_pageRef+'" onclick = "loadSubGridEvent('+rowid+')"  class="ui-icon ui-icon-plus"></span>');    	    		

			createHasSubGridColumn(gridSelectorName, rowid, 'loadSubGridEvent');
			/* dynamically create a hidden field having id field_pageRef */

			//	$("#webServiceGuiGridForm_"+_pageRef).append('<input type="hidden" id="'+rowid+"_subGrid_"+_pageRef+'" name="'+rowid+"_subGrid_"+_pageRef+'" value="'+gridExpand+'" />');

			var fId = rowid + "_subGrid_" + _pageRef;
			var fName = rowid + "_subGrid_" + _pageRef;
			var fValue = gridExpand;
			var hField = returnHiddenField(fId, fName, fValue);
			listOfHiddenFields.appendChild(hField);

			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'mappingValue', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");
		}
		if ("HashMap" == checkForType(fieldType)) {
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'mappingValue', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");
			var gridExpand = "0";
			var typeToPass = "HashMap";
			//$('#' + rowid).children("td.sgcollapsed").unbind().html("");
			//	$('#' + rowid).children("td.sgcollapsed").append('<span id="icon_'+rowid+'_'+_pageRef+'" onclick = "loadDynamicSubGrid('+rowid+',\'HashMap\')"  class="ui-icon ui-icon-plus"></span>');    	    		

			createHasSubGridColumn(gridSelectorName, rowid, 'loadDynamicSubGrid', typeToPass);

			var fId = rowid + "_subGrid_" + _pageRef;
			var fName = rowid + "_subGrid_" + _pageRef;
			var fValue = gridExpand;
			var hField = returnHiddenField(fId, fName, fValue);
			listOfHiddenFields.appendChild(hField);
		} else if ("List" == checkForType(fieldType) || "List<Object>" == checkForType(fieldType)) {
			var typeToPass = checkForType(fieldType);
			grid.jqGrid('setCellReadOnly', rowid, 'restriction', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'mappingValue', "true");
			grid.jqGrid('setCellReadOnly', rowid, 'value', "true");
			var gridExpand = "0";
			//$('#' + rowid).children("td.sgcollapsed").unbind().html("");
			//$('#' + rowid).children("td.sgcollapsed").append('<span id="icon_'+rowid+'_'+_pageRef+'" onclick = "loadDynamicSubGrid('+rowid+',\''+typeToPass+'\')"  class="ui-icon ui-icon-plus"></span>');    	    		
			createHasSubGridColumn(gridSelectorName, rowid, 'loadDynamicSubGrid', typeToPass);

			var fId = rowid + "_subGrid_" + _pageRef;
			var fName = rowid + "_subGrid_" + _pageRef;
			var fValue = gridExpand;
			var hField = returnHiddenField(fId, fName, fValue);
			listOfHiddenFields.appendChild(hField);
		}
	}
	createHiddenFields(formId, listOfHiddenFields);
}

/**
 * @Description: used incase of HashGrid and List Grid
 * @param grid
 * @param ids
 * @returns
 */
function loadSubGridData(grid, ids) {
	var rowObj = null;
	$.each(ids, function(i, v) {
		rowObj = $("#" + v)[0]
		var fieldType = grid.jqGrid('getCell', v, 'fieldType');
		var loadSubGrid = grid.jqGrid('getCell', v, 'loadSubGrid');
		var type = null;
		if (loadSubGrid == "1") {
			type = checkForType(fieldType);
			checkUcheckGridOrSubGrid(v);
			if (type == "HashMap") {
				loadDynamicSubGrid(rowObj, 'HashMap');
			} else if (type == "List") {
				loadDynamicSubGrid(rowObj, 'List');
			} else if (type == "List<Object>") {
				loadDynamicSubGrid(rowObj, 'List<Object>');				
			} else if (!isNonPrimativeDataType(fieldType)) {
				//Case Of Object
				loadSubGridEvent(null, rowObj,undefined);
			}
		}
	});
}

/**
 * Sub Grid event function
 * */
function loadSubGridEvent(event, rowObj, fn) {
	var mainGridActionRef = $("#webServiceExplorerGrid_" + _pageRef).val();
	var subGridActionRef = $("#webServiceExplorerSubGrid_" + _pageRef).val();
	var screenNameSpace = $("#webServiceExplorerScreenNameSpace_" + _pageRef).val();
	var screenName = $("#webServiceExplorerScreenName_" + _pageRef).val();
	var parentRowId = rowObj.id;
	var parentGridId = null;
	var currentGrid = null;
	var currentGridParentTr = null; // tr that contains the subgrid
	if (undefined == parentRowId) {
		rowObj = rowObj[rowObj.length - 1];
	}
	parentRowId = rowObj.id;
	if(rowObj.offsetParent != null)
	{
		parentGridId = rowObj.offsetParent.id;
	}
	else{
		parentGridId = getGridIdFromRow(parentRowId);
	}
	var hFSelector = parentRowId + "_subGrid_" + _pageRef;
	var closed = $("#" + hFSelector).val();
	var iconId = "icon_" + parentRowId + "_" + _pageRef;
	var parentGrid = $("#" + parentGridId);
	var currentGridSelector = parentGridId.replace("_table", +"");
	currentGridSelector = currentGridSelector + "_" + parentRowId + "_table";
	currentGrid = $("#" + currentGridSelector);
	var dynamicIdPathSubGrid = returnGridId() + "_" + parentRowId + "_table";
	var columnId = $("#" + parentGridId).jqGrid('getCell', parentRowId, 'gridColumnID');
	currentGridParentTr = $("#" + parentGridId).next();
	var serviceDataID = $("#serviceDataId_" + _pageRef).val();
	
	//applyGridColoring(parentGrid,currentGrid);
	var mappingId = "";
	if(undefined != $("#pwsMappingId_"+_pageRef).val())
	{
		mappingId = $("#pwsMappingId_"+_pageRef).val();
	}
	var fId = "checkbox_event_triggered_" + parentRowId + "_" + _pageRef;
	var gridParam = {
		"webServiceExplorerCO.parentGridId": parentGridId,
		"webServiceExplorerCO.parentRowId" : parentRowId,
		"webServiceExplorerCO.requestType" : "Request",
		"webServiceExplorerCO.applicationName" : $("#application_name_desc_" + _pageRef).val(),
		"webServiceExplorerCO.webServiceName" : $("#webservice_name_desc_" + _pageRef).val(),
		"webServiceExplorerCO.operationName" : $("#operation_name_lkp_desc_" + _pageRef).val(),
		"webServiceExplorerCO.requestResponseCO.gridColumnID" : columnId,
		"webServiceExplorerCO.gridColumnIDField" : columnId,
		"webServiceExplorerCO.screenName" : screenName,
		"webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" : $("#serviceDataId_" + _pageRef).val(),
		"webServiceExplorerCO.mappingID" : mappingId,
		"_pageRef" : _pageRef
	}
	try{
		var parentListRowId = returnListSubGridParentRow(rowObj.id);
		var gd = returnGridObjectFromRowId(parentListRowId[0].id);
		var ft = gd.jqGrid('getCell', parentListRowId[0].id, 'fieldType');
		var fieldT  = returnGridObjectFromRowId(rowObj.id).jqGrid('getCell', rowObj.id, 'fieldType');
		var parentListFieldName = gd.jqGrid('getCell', parentListRowId[0].id, 'fieldName');
		var loadSubGridFlag =gd.jqGrid('getCell', parentListRowId[0].id, 'loadSubGrid');		
		if(((undefined != ft && includes(ft,'List')) || (!isNonPrimativeDataType(fieldT)))&&(undefined != loadSubGridFlag && "1" == loadSubGridFlag))
		{
			loadSubGridFlag =  true;
			var reqType = "List";
			gridParam = {
					"webServiceExplorerCO.parentGridId": parentGridId,
					"webServiceExplorerCO.parentRowId" : parentRowId,
					"webServiceExplorerCO.requestType" : "Request",
					"webServiceExplorerCO.applicationName" : $("#application_name_desc_" + _pageRef).val(),
					"webServiceExplorerCO.webServiceName" : $("#webservice_name_desc_" + _pageRef).val(),
					"webServiceExplorerCO.operationName" : $("#operation_name_lkp_desc_" + _pageRef).val(),
					"webServiceExplorerCO.requestResponseCO.gridColumnID" : columnId,
					"webServiceExplorerCO.gridColumnIDField" : columnId,
					"webServiceExplorerCO.screenName" : screenName,
					"webServiceExplorerCO.loadConfig" : loadSubGridFlag,
					"webServiceExplorerCO.reqType" : reqType,
					"webServiceExplorerCO.parentListFieldName" : parentListFieldName,
					"webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" : $("#serviceDataId_" + _pageRef).val(),
					"webServiceExplorerCO.mappingID" : mappingId,
					"_pageRef" : _pageRef
				}
		}
	}
	catch(e)
	{
		
	}
	var fIdVal = $("#" + fId).val();
	if (undefined == closed || closed == "0") {
		$("#" + hFSelector).val("1"); // to indicate that the sub grid is opened		
		//		if(undefined != currentGridParentTr.attr('style'))
		//		{
		//			currentGridParentTr.removeAttr("style");
		//			return;
		//		}
		var loadSrc = null;
		if (undefined != screenNameSpace && undefined != subGridActionRef) {
			loadSrc = jQuery.contextPath + screenNameSpace + subGridActionRef;
		} else {
			loadSrc = jQuery.contextPath + "/path/common/WebserviceExplorer/WebServiceExplorerList_loadSubGridFn";
		}
		if (isHiddenGrid(parentRowId)) {
			showSubGridByParentRowId(parentRowId);
		} 
		else {
			$("#" + iconId).switchClass("ui-icon-plus", "ui-icon-minus", 0, "easeInOutQuad");
			$.ajax({
				url : loadSrc,
				type : "post",
				dataType : "html",
				data : gridParam,
				success : function(data) {
					while ("ui-subgrid" == $("#" + parentRowId).next('tr').attr('class')) {
						$("#" + parentRowId).next('tr').remove();
					}
					$(data).insertAfter("#" + parentRowId);
				//parentGrid.jqGrid('setSelection',parentRowId, true);
				//updateSelectOption(parentRowId);
				}
			}).done(function(result) {
				if (hasSubGrid(parentRowId)) {
					var subGridId = getSubGridIdFromParentRowId(parentRowId);
					removeGridHeader(subGridId);
				}
				if (null != fn && undefined != fn && typeof (fn) == "function") {
					fn();
				}
			}
			);
		}
		
	} 
	else{
		hideSubGridByParentRowId(parentRowId);
		$("#" + iconId).switchClass("ui-icon-minus", "ui-icon-plus", 0, "easeInOutQuad");
		$("#" + hFSelector).val("0"); // to indicate that the sub grid is closed
	}
//	else if (undefined != fIdVal && fIdVal != 'true') 
//	{
//		//$("#"+parentRowId).next().remove();
//		hideSubGridByParentRowId(parentRowId);
//		$("#" + iconId).switchClass("ui-icon-minus", "ui-icon-plus", 0, "easeInOutQuad");
//		$("#" + hFSelector).val("0"); // to indicate that the sub grid is closed
//	//	parentGrid.jqGrid('lection',parentRowId, false);			
//	}
//	if (null != event) {
//		event.stopPropagation();
//	}
}

/**
 * @author Raed Saad
 * function attached to a row containing type HashMap/ list / or any other type inorder to load subgrid
 * 
 * variable can be a predefined string or a url
 * */
function loadDynamicSubGrid(rowObj, variable, fn) {
	var parentId = rowObj.id;
	var parentGridId = null;
	if (undefined == parentId) {
		rowObj = rowObj[rowObj.length - 1];
	}
	parentId = rowObj.id;
	if(null != rowObj.offsetParent && undefined != rowObj.offsetParent)
	{
		parentGridId = rowObj.offsetParent.id;
	}
	else{
		parentGridId = getGridIdFromRow(parentId)
	}
	var hFSelector = parentId + "_subGrid_" + _pageRef;
	var closed = $("#" + hFSelector).val();
	var iconId = "icon_" + parentId + "_" + _pageRef;
	var parentGrid = $("#" + parentGridId);
	var dynamicIdPathSubGrid = returnGridId() + "_" + parentId + "_table";
	var fieldName = $("#" + parentGridId).jqGrid('getCell', parentId, 'fieldName');
	var columnId = $("#" + parentGridId).jqGrid('getCell', parentId, 'gridColumnID');
	var fieldType = $("#" + parentGridId).jqGrid('getCell', parentId, 'fieldType');
	var loadOnce =  $("#" + parentGridId).jqGrid('getCell', parentId, 'loadSubGrid');
	var orgiFieldType = fieldType;
	var type1 = fieldType;
	type1 = type1.replace("List<", "");
	type1 = type1.replace(">", "");
	var fieldType = type1;
	var flatNewId;
	var mainGridActionRef = $("#webServiceExplorerGrid_" + _pageRef).val();
	var subGridActionRef = $("#webServiceExplorerSubGrid_" + _pageRef).val();
	var lstSubGridActionRef = $("#webServiceExplorerListGrid_"+_pageRef).val();
	var screenNameSpace = $("#webServiceExplorerScreenNameSpace_" + _pageRef).val();
	var screenName = $("#webServiceExplorerScreenName_" + _pageRef).val();
	var mappingId = $("#mappingId_" +_pageRef).val();
//	if(undefined != loadOnce && ""!= loadOnce && "1" == loadOnce)
//	{
//		loadOnce = true;
//	}
	var gridParam = {
		"webServiceExplorerCO.parentRowId" : parentId,
		"webServiceExplorerCO.requestType" : "Request",
		"webServiceExplorerCO.applicationName" : $("#application_name_desc_" + _pageRef).val(),
		"webServiceExplorerCO.webServiceName" : $("#webservice_name_desc_" + _pageRef).val(),
		"webServiceExplorerCO.operationName" : $("#operation_name_lkp_desc_" + _pageRef).val(),
		"webServiceExplorerCO.requestResponseCO.gridColumnID" : columnId,
		"webServiceExplorerCO.requestResponseCO.fieldType" : fieldType,
		"webServiceExplorerCO.gridColumnIDField" : columnId,
		"webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" : $("#serviceDataId_" + _pageRef).val(),
		"_pageRef" : _pageRef
	}
	var loadSrc = null;
	if (isValidURL(variable)) {
		loadSrc = variable;
	} 
	else if (variable == "HashMap") {
		loadSrc = jQuery.contextPath + "/path/common/WebserviceExplorer/WebServiceExplorerList_loadHashMapSubGridFn";
		dynamicIdPathSubGrid = returnGridId() + "_" + parentId + "_HashMap_table";
		gridParam = {
			"webServiceExplorerCO.parentRowId" : parentId,
			"webServiceExplorerCO.mainGridId" : returnGridId(),
			"webServiceExplorerCO.dynamicGridId" : dynamicIdPathSubGrid,
			"webServiceExplorerCO.parentRowId" : parentId,
			"webServiceExplorerCO.requestResponseCO.fieldName" : fieldName,
			"webServiceExplorerCO.requestResponseCO.fieldType" : fieldType,
			"webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" : $("#serviceDataId_" + _pageRef).val(),
			"_pageRef" : _pageRef
		}
	}
	else if (variable == "List") {
		if (undefined != screenNameSpace && undefined != lstSubGridActionRef) {
			loadSrc = jQuery.contextPath + screenNameSpace + lstSubGridActionRef;
		} 
		else {
			loadSrc = jQuery.contextPath + "/path/common/WebserviceExplorer/WebServiceExplorerList_loadListSubGridFn";
		}
		dynamicIdPathSubGrid = returnGridId() + "_" + parentId + "_List_table";
		gridParam = {
			"webServiceExplorerCO.parentRowId" : parentId,
			"webServiceExplorerCO.requestType" : "Request",
			"webServiceExplorerCO.applicationName" : $("#application_name_desc_" + _pageRef).val(),
			"webServiceExplorerCO.webServiceName" : $("#webservice_name_desc_" + _pageRef).val(),
			"webServiceExplorerCO.operationName" : $("#operation_name_lkp_desc_" + _pageRef).val(),
			"webServiceExplorerCO.requestResponseCO.gridColumnID" : columnId,
			"webServiceExplorerCO.gridColumnIDField" : columnId,
			"webServiceExplorerCO.requestResponseCO.ID" : parentId + "_1",
			"webServiceExplorerCO.requestResponseCO.fieldType" : type1,
			"webServiceExplorerCO.selectedFieldType" : flatNewId,
			"webServiceExplorerCO.fieldType" : type1,		
			"webServiceExplorerCO.mainGridId" : returnGridId(),
			"webServiceExplorerCO.dynamicGridId" : dynamicIdPathSubGrid,
			"webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" : $("#serviceDataId_" + _pageRef).val(),
			"_pageRef" : _pageRef
		}
	} 
	else if (variable == "List<Object>") {
		var listId;
		if (undefined != parentId) {
			listId = parentId.replace("_" + _pageRef, "");
		}
		x = includes(listId,"_response");
		if(x)
		{
			listId = listId.replace("_"+_pageRef+"_response","");
			listId = listId.replace("_"+_pageRef,"");
			listId = listId.replace("_response","");
			var t = fieldType.replace("List<", "");
			t = type1.replace(">", "");
			var newId;
			if(includes(listId,"_"))
			{
				listId = listId.split("_");
				newId = listId[listId.length - 1];
				flatNewId = newId;
				//newId = newId +"_" + t +"_"+_pageRef;			
			}
			else{
				newId = listId;
				flatNewId = newId;
				//newId = newId + "_" + _pageRef+"_response"+"_"+ t +"_"+ _pageRef;
			}
		}
		else{
			listId = listId.split("_");
			var newId = "";
			if (fieldName == listId[listId.length - 1]) {
				listId[listId.length - 1] = type1;
				$.each(listId, function(i, v) {
					newId = newId + v + "_";
				});
			}
			newId = newId.substring(0, newId.length - 1);
			flatNewId = newId;
		}
		if (undefined != screenNameSpace && undefined != lstSubGridActionRef) {
			loadSrc = jQuery.contextPath + screenNameSpace + lstSubGridActionRef;
		} 
		else {
			loadSrc = jQuery.contextPath + "/path/common/WebserviceExplorer/WebServiceExplorerList_loadListSubGridFn";
		}
		dynamicIdPathSubGrid = returnGridId() + "_" + parentId + "_List_table";
		var type1 = fieldType.replace("List<", "");
		type1 = type1.replace(">", "");
		gridParam = {
			"webServiceExplorerCO.parentRowId" : parentId,
			"webServiceExplorerCO.requestType" : "Request",
			"webServiceExplorerCO.applicationName" : $("#application_name_desc_" + _pageRef).val(),
			"webServiceExplorerCO.webServiceName" : $("#webservice_name_desc_" + _pageRef).val(),
			"webServiceExplorerCO.operationName" : $("#operation_name_lkp_desc_" + _pageRef).val(),
			"webServiceExplorerCO.requestResponseCO.gridColumnID" : columnId,
			"webServiceExplorerCO.gridColumnIDField" : columnId,
			"webServiceExplorerCO.requestResponseCO.ID" : flatNewId + "_1",
			"webServiceExplorerCO.requestResponseCO.fieldType" : type1,
			"webServiceExplorerCO.selectedFieldType" : flatNewId,
			"webServiceExplorerCO.fieldType" : type1,
			"webServiceExplorerCO.parameterName" : fieldName,
			"webServiceExplorerCO.parameterType" : orgiFieldType,
			"webServiceExplorerCO.loadConfig" : loadOnce,
			"webServiceExplorerCO.mainGridId" : returnGridId(),
			"webServiceExplorerCO.dynamicGridId" : dynamicIdPathSubGrid,
			"webServiceExplorerCO.mappingID" : mappingId,
			"webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" : $("#serviceDataId_" + _pageRef).val(),
			"_pageRef" : _pageRef
		}
	}
	if (undefined == closed || closed == "0") {
		$("#" + hFSelector).val("1"); // to indicate that the sub grid is opened
		$("#" + iconId).switchClass("ui-icon-plus", "ui-icon-minus", 0, "easeInOutQuad");
		if (hasSubGrid(parentId)) {
			showSubGridByParentRowId(parentId);
		} else {
			$.ajax({
				url : loadSrc,
				type : "post",
				dataType : "html",
				data : gridParam,
				success : function(data) {
					while ("ui-subgrid" == $("#" + parentId).next('tr').attr('class')) {
						$("#" + parentId).next('tr').remove();
					}
					$(data).insertAfter("#" + parentId);
				}
			}).done(function(result) {
				if (null != fn && undefined != fn && typeof (fn) == "function") {
					fn();
				}
			}
			);
		}
	} else {
		//$("#"+parentId).next().remove();
		hideSubGridByParentRowId(parentId);
		$("#" + iconId).switchClass("ui-icon-minus", "ui-icon-plus", 0, "easeInOutQuad");
		$("#" + hFSelector).val("0"); // to indicate that the sub grid is closed
	//parentGrid.jqGrid('setSelection',parentId, false);
	}
}

function checkGrid(id)
{
	if(id != undefined)
	{
		$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
		$("#" + id).find("tr.jqgrow").attr('aria-selected', 'true');
		$("#" + id).find("tr.jqgrow").find('input.cbox').prop("checked", true);
	}
}

function unCheckGrid(id)
{
	if(undefined != id)
	{
		$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr');
		$("#" + id).find("tr.jqgrow").attr('aria-selected', 'false');
		$("#" + id).find("tr.jqgrow").find('input.cbox').prop('checked', false);
	}
}


/**
 * @autho Raed Saad
 * function called when selecting a row in the main grid
 * */
function onRowSelTopic(rowObj) {
	var gridSelectorName = rowObj.target.id;
	//	var grid = $("#"+gridSelectorName);	
	var rowId = rowObj.originalEvent.id
	var gridId = getGridIdFromRow(rowId);
	grid = $("#" + gridId);
	var isMandatory = null;
	var id = null;
	var idArr = null;
	var idArrLength = null;
	try {
		isMandatory = grid.jqGrid('getCell', rowId, 'mandatory');
		id = grid.jqGrid('getCell', rowId, 'gridColumnID');
		idArr = id.split("_concat_");
		idArrLength = idArr.length;
	} catch (e) {
		console.log(e);
	}
	/*Incase we have the mapping fields options*/
	//    var mappingFields = $("#webServiceExplorerMappingParams_"+_pageRef).val();    
	//    if(null == mappingFields || "" == mappingFields || undefined == mappingFields)
	//    {
	//    	grid.jqGrid('setCellReadOnly', rowId, 'mappingValue',"true");    	
	//    }
	//    else{
	//		grid.jqGrid("setCellRequired", rowId,'value',false);
	//	    grid.jqGrid('setCellReadOnly', rowId, 'value',"true");
	//    }
	if (idArr[0] == "1") {
		grid.jqGrid('setCellReadOnly', rowId, 'restriction', "false");
	} else {
		grid.jqGrid('setCellReadOnly', rowId, 'restriction', "true");
	}
	if (isMandatory == "mandatory") {
		//grid.jqGrid("setCellRequired", rowId,'value',true);
	}
//$("#"+gId).jqGrid('setCellReadOnly', rowId, 'restriction',"true");
}

/**
 * @autor Raed Saad
 * function to serialize form data and pass it to action 
 * */
function serializeSubGridData(data) {
	//	var serializedForm = $("#webServiceGuiDefFormId_"+_pageRef).serializeForm();
	var parentRowID = data._parentRowId;
	data["webServiceExplorerCO.requestResponseCO.gridColumnID"] = $("#" + parentRowID + "_" + _pageRef).val();
	var rowId = $('#' + returnGridId()).jqGrid('getGridParam', 'selrow');
	var myObject = $('#' + returnGridId()).jqGrid('getRowData', rowId);
	return data;
}

/**
 * @Description function to add a row to a certain grid or subgrid
 * @note incase multiselect and subgrid + event are disabled, then  var $tds = $td3;
 * @param grid
 * @param parentRowid
 * @note not used
 * @returns
 */
function addGridRow(grid, parentRowid) {
	var gridId = "webServiceGuiTbl_Id_WSDLGUIMT_" + parentRowid + "_List_table"
	var seqNum = $("#" + gridId + " >tbody >tr").length;
	var rowid = parentRowid + "_" + seqNum;
	var describedby1 = 'webServiceGuiTbl_Id_WSDLGUIMT_' + parentRowid + '_List_table_cb';
	var id = 'jqg_webServiceGuiTbl_Id_WSDLGUIMT_' + parentRowid + '_List_table_' + rowid;
	var name = 'jqg_webServiceGuiTbl_Id_WSDLGUIMT_' + parentRowid + '_List_table_' + rowid;
	var span_id = 'icon_' + rowid + '_' + _pageRef;
	var hiddenFieldId = rowid + '_subGrid_' + _pageRef;
	var hiddenFieldName = rowid + '_subGrid_' + _pageRef;
	var rowObj = $("#" + rowid);
	var describedBy2 = 'webServiceGuiTbl_Id_WSDLGUIMT_' + parentRowid + '_List_table_subgrid';
	var gridExpand = "0";
	var $tr = '<tr id="' + rowid + '" role="row" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr">';
	var $c_tr = '</tr>';
	var $td1 = '<td role="gridcell" style="text-align:center;width: 20px;" class="undefined path-subgrd-hdr" tdlabel="" aria-describedby="' + describedby1 + '">'
		+
		'<input role="checkbox" type="checkbox" id="' + id + '" class="cbox" name="' + name + '"> </td>';
	var $td2 = '<td role="gridcell" aria-describedby="' + describedBy2 + '" class="ui-sgcollapsed path-subgrd-hdr sgcollapsed" style="" tdlabel="">'
		+
		'<span id="' + span_id + '" onclick = "loadSubGridEvent(' + rowObj + ')"  class="ui-icon ui-icon-plus"></span>'
		+
		'<input type="hidden" id="' + hiddenFieldId + '" name="' + hiddenFieldName + '" value="' + gridExpand + '" />'
		+
		'</td>';
	var $td3 = '<td role="gridcell" style="display:none;" class="undefined path-subgrd-hdr" title="' + rowid + '" tdlabel="ID" aria-describedby="webServiceGuiTbl_Id_WSDLGUIMT_lstTfaRequest_List_table_ID">' + rowid + '</td>';
	var $tds = $td1 + $td2 + $td3;
	$("#" + parentRowid + "_" + (seqNum - 1) + " >td").each(function(i, v) {
		if (i > 2) {
			$tds = $tds + v.outerHTML;
		}
	}
	);
	var $gridRow = $tr + $tds + $c_tr;
	//var html = $.parseHTML( $tds );
	var n = seqNum - 1;
	$($gridRow).insertAfter("#" + parentRowid + "_" + n);
}

/**
 * @description function to check if a certain row has a sub grid
 * @param gridId
 * @returns
 */
function hasSubGrid(rowId) {
	var $tr = $("#" + rowId).next('tr.jqgrow');
	if ($tr.length == 0) {
		$tr = $("#" + rowId).next('tr.ui-subgrid');
		if ($tr.length > 0) {
			return true;
		}
	}
	return false;
}

/**
 * @description function to check if a row is a part of a subgrid
 * @param gridId
 * @returns
 */
function hashParent(rowId)
{
	var id = returnSubGridRowParentRowId(rowId);
	if(undefined != id && id != "")
	{
		return true;
	}
	return false;
}

/**
 * @description function to check if a sub grid is loaded 
 * @param rowId
 * @returns
 */
function isSubGridLoaded(rowid) {
	$("#" + rowid).next().children();
	$tr = $("#" + rowid);
	if ($tr.next().children().find('table.ui-jqgrid-btable').length > 1) {
		return true;
	}
	return false;
}

/**
 * @description function to check if a sub grid is hidden 
 * @param parentRowId
 * @returns
 */
function isHiddenGrid(parentRowId)
{
	var x = $("#"+parentRowId).next('tr.ui-subgrid').css('display');
	if(x == "none")
	{
		return true;
	}
	return false;
}

/**
 * @description function to check if a row is selected 
 * @param rowId
 * @returns
 */
function isRowSelected(rowId)
{
	var x = $("#"+rowId).attr('aria-selected');
	if(x == true || x == 'true')
	{
		return true;
	}
	else
	{
		return false;
	}
}



/**
 * 
 * @param parentRowId
 * @description get the subgrid id for a specific row
 * @returns
 */
function getSubGridIdFromParentRowId(parentRowId) {
	//var subGridId = $("#"+parentRowId).next('tr.ui-subgrid').children('td.subgrid-data').children('div.ui-jqgrid')[0].id;
	var subGridId;
	if (hasSubGrid(parentRowId)) {
		subGridId = $("#" + parentRowId).next('tr.ui-subgrid').find('table.ui-jqgrid-btable').attr('id');
		subGridId = subGridId.replace("gbox_", "");
	}
	return subGridId;
}

/**
 * @Description returns grid ID from row ID
 * @param rowId
 * @returns
 */
function getGridIdFromRow(rowId) {
	var gridId = null;
	var $t = $("#" + rowId).parents('table.ui-jqgrid-btable');
	if ($t.length > 0) {
		gridId = $t[0].id;
	}
	return gridId;
}

/**
 * @Description returns an array list of parent grids
 * @param gridId
 * @returns
 */
function returnParentGridsList(gridId) {
	var gridList = null;
	gridList = $("#" + gridId).parents('table.ui-jqgrid-btable');
	return gridList;
}

/**
 * @description returns the list of parent grids except the main grid
 * @param gridId
 * @returns
 */
function returnListParentSubGrids(gridId) {
	var $parentSubGridList = $("#" + gridId).parents('tr.ui-subgrid')
	return $parentSubGridList;
}

/**
 * @description returns the list of parent rows for all parents of the nested sub grid
 * @param id
 * @returns
 */
function returnListSubGridParentRow(id) {
	var $grids = returnListParentSubGrids(id);
	var $ltr = $grids.prev('tr.jqgrow');
	return $ltr;
}

/**
 * 
 * @param rowId
 * @description return parent row id of a subgrid row
 * @returns
 */
function returnSubGridRowParentRowId(rowId) {
	var id = null;
	//id = $("#"+rowId).parents('tr.ui-subgrid').prev()[0].id;
	id = $("#" + rowId).parents('tr.ui-subgrid').prev().attr('id');
	return id;
}

/**
 * 
 * @param colId
 * @description function to return the row id for a certain column based on column id
 * @returns
 */
function returnRowIdFromColumnId(colId) {
	if (null != colId && undefined != colId) {
		//var rowId = $("#"+colId).parents('tr')[0].id;
		var rowId = $("#" + colId).parents('tr').attr('id');
		return rowId;
	}
}

/**
 * @description return grid last selected row id
 * @param gridId
 * @returns
 */
function returnGridLastSelectedRow(gridId) {
	var grid = $("#" + gridId);
	var lastSelectedRowId = grid.attr('lastselectedrow');
	return lastSelectedRowId;
}

/**
 * @param rowId
 * @description function to return grid object for a certain column based on column id
 * @returns
 */
function returnGridObjectFromRowId(rowId)
{
	var gId = getGridIdFromRow(rowId);
	return $("#"+gId);
}

/**
 * @param columnId
 * @description function to return grid object for a certain column based on column id
 * @returns
 */
function returnGridObjectFromColumnId(columnId)
{
	var rowId = returnRowIdFromColumnId(columnId);
	var gid = getGridIdFromRow(rowId);
	return $("#"+gid);
}

/**
 *  @param gridId
 *  @description function to return the parent grid id of a sub grid
 *  @return grid id
 */
function returnParentGrid(gridId)
{
	var listOfGrids = returnParentGridsList(gridId);
	if(undefined != listOfGrids && listOfGrids.length == 1)
	{
		return listOfGrids.attr('id');
	}
	else if(undefined != listOfGrids && listOfGrids.length>1)
	{
		return listOfGrids[listOfGrids.length-1].id;
//		return listOfGrids[0].id;
	}
}

/**
 *  @param gridId
 *  @description function to return the a sub grid parent row
 *  @return row id
 */
function returnGridParentRowId(gridId)
{
	return $("#"+gridId).parents('tr.ui-subgrid').prev('tr').attr('id');
}

function gridIdFromColumnId(columnId)
{
	var rowId = returnRowIdFromColumnId(columnId);
	getGridIdFromRow(rowId);
}

/**
 * @description delete subgrid
 * @param rowId
 * @returns
 */
function deleteRowSubGridByParentRowId(rowId) {
	$("#" + rowId).next('tr.ui-subgrid').remove();
}

/**
 * 
 * @param rowId
 * @returns
 */
function returnLastHierarchicalSelectRow(rowId) {
	var id = rowId;
	var subGridId = null;
	try {
		if (hasSubGrid(id)) {
			subGridId = getSubGridIdFromParentRowId(rowId);
			id = null;
			id = $('#' + subGridId).jqGrid('getGridParam', 'selrow');
			id = returnLastHierarchicalSelectRow(id);
		}
	} catch (e) {}
	return id;
}

/**
 * @Description function to delete a grid row
 * @param rowId
 * @returns
 */
function deleteGridRow(rowId) {
	var gridId = null;
	var grid = null;
	var selector = null;
	gridId = getGridIdFromRow(rowId);
	grid = $("#" + gridId);
	selector = 'tr#' + rowId;
	grid.find(selector).remove();
}

/**
 * @description hide sub grid by passing parent row id
 * @param parentRowId
 * @returns
 */
function hideSubGridByParentRowId(parentRowId) {
	$("#" + parentRowId).next('tr.ui-subgrid').hide();
	var iconId = "icon_" + parentRowId + "_" + _pageRef;
	var hFieldId = parentRowId + "_subGrid_" + _pageRef;
	$("#" + iconId).switchClass("ui-icon-minus", "ui-icon-plus", 0, "easeInOutQuad");
	$("#" + hFieldId).val("0")
}

/**
 * @description show sub grid by passing parent row id
 * @param parentRowId
 * @returns
 */
function showSubGridByParentRowId(parentRowId) {
	$("#" + parentRowId).next('tr.ui-subgrid').show();
	var iconId = "icon_" + parentRowId + "_" + _pageRef;
	var hFieldId = parentRowId + "_subGrid_" + _pageRef;
	$("#" + hFieldId).val("1"); // to indicate that the sub grid is opened
	$("#" + iconId).switchClass("ui-icon-plus", "ui-icon-minus", 0, "easeInOutQuad");
}

/**
 * @description function to unbind sub grid for a specific row
 * @param rowid
 * @returns
 */
function unbindSubGrid(rowid) {
	if ($('#' + rowid).length > 0 && $('#' + rowid).children("td.sgcollapsed").length > 0) {
		$('#' + rowid).children("td.sgcollapsed").unbind().html("");
	}
}

/**
 * 
 * @param gridId
 * @returns
 */
function removeLastHighlightedRow(gridId) {
	var lastGridRow = $("#" + gridId).find('tr:last');
	if (lastGridRow.length > 0) {
		$("#" + gridId).find('tr:last').removeClass("ui-state-highlight");
	}
}

/**
 * @description function to hide grid the header
 * @param gridId
 * @returns
 */
function hideGridHeader(gridId) {
	var gview = "#gview_";
	var id = gview + gridId;
	//	$(id).children()[1].remove();
	$(id).children('div.ui-jqgrid-hdiv').hide();
}

/**
 * @description function to remove the grid header containing titles
 * @param gridId
 * @returns
 */
function removeGridHeader(gridId) {
	if ($("#" + gridId).parent().find('.ui-jqgrid-hdiv').length > 0) {
		$("#" + gridId).parent().find('.ui-jqgrid-hdiv').remove();
	} else {
		var gview = "#gview_";
		var id = gview + gridId;
		//	$(id).children()[1].remove();
		$(id).children('div.ui-jqgrid-hdiv').remove();
	}
}

/**
 * @description function to remove grid search toolbar
 * @param gridId
 * @returns
 */
function removeGridSearchToolBar(gridId) {
	try {
		var gview = "#gview_";
		var id = gview + gridId;
		$(id).children('div.ui-jqgrid-hdiv').children('div.ui-jqgrid-hbox').children('table.ui-jqgrid-htable').children('thead').children('tr.ui-search-toolbar').remove();
	} catch (e) {
		console.log("exceptin in removeGridSearchToolBar");
		console.log(e);
	}
}

/**
 * @description function to remove form fields
 * @param formId
 * @returns
 */
function resetWebserviceExplorerFormCache(formId)
{
	$("#"+formId+">input[purpose*='checkbox']").attr("value","0");
}

/**
 * @description function to re order grid selected rows based on their position in the grid
 * @param grid
 * @param selected
 * @returns
 */
function reOrderSelectedRows(grid, selected) {
	var selData = [];
	var allRows = grid.jqGrid('getDataIDs');
	for (var i = 0; i < allRows.length; i++) {
		for (var j = 0; j < selected.length; j++) {
			if (allRows[i] == selected[j]) {
				selData.push(allRows[i]);
			}
		}
	}
	return selData;
}

/**
 * 
 * @param gridId
 * @returns
 */
function hideGridSearchToolBar(gridId) {
	try {
		var gview = "#gview_";
		var id = gview + gridId;
		$(id).children('div.ui-jqgrid-hdiv').children('div.ui-jqgrid-hbox').children('table.ui-jqgrid-htable').children('thead').children('tr.ui-search-toolbar').hide();
	} catch (e) {
		console.log("exception in hideGridSearchToolBar");
		console.log(e);
	}
}

/**
 * @description hides all grid checkboxes
 * @param gridId
 * @returns
 */
function hideGridCheckBox(gridId) {
	$("#" + gridId).jqGrid('hideCol', 'cb');
}

/**
 * @description show a grid checkbox incase it was hidden
 * @param gridId
 * @returns
 */
function showGridCheckBox(gridId) {
	$("#" + gridId).jqGrid('showHideCol', 'cb');
}

/**
 * @description function to select a row i
 * @param rowid
 * @returns
 */
function updateSelectOption(rowid,option) {
	if(undefined == option)
	{
		var isSelected = $("#" + rowid).attr('aria-selected');
		if ("true" != isSelected && true != isSelected) {
			var gridId = getGridIdFromRow(rowid);
			$("#" + gridId).jqGrid('setSelection', rowid, true);
		}
	}
	else{
		var gridId = getGridIdFromRow(rowid);
		$("#" + gridId).jqGrid('setSelection', rowid, option);
	}
}

/**
 * 
 * @param caption
 * @param gridId
 * @returns
 */
function updateGridCaption(caption, gridId) {
	if (null != gridId && undefined != gridId) {
		$("#" + gridId + _pageRef).find('span.ui-jqgrid-title').html(caption);
	} else {
		$("#webservice_gui_" + _pageRef).find('span.ui-jqgrid-title').html(caption);
	}
}

/**
 * 
 * @param formId
 * @param lstOfHiddenFields
 * @returns
 */
function createHiddenFields(formId, lstOfHiddenFields) {
	if (lstOfHiddenFields.hasChildNodes()) {
		$(lstOfHiddenFields.childNodes).appendTo($('#' + formId));
	}
}

/**
 * 
 * @param id
 * @param name
 * @param value
 * @returns
 */
function returnHiddenField(id, name, value,purpose) {
	var inputFieldObj = {};
	inputFieldObj["id"] = id;
	inputFieldObj["type"] = "hidden";
	inputFieldObj["name"] = name;
	inputFieldObj["purpose"] = purpose;
	inputFieldObj["value"] = value;
	$input = returnInputField(inputFieldObj);
	return $input;
}

/**
 * @description creates grid multi select header
 * @returns
 */
function createGridMultiSelectCheckBoxHeader(gridId) {
	var $MainCheckBox = document.createElement('div');
	$MainCheckBox.setAttribute('id', 'jqgh_' + gridId + '_cb');
	var inputFieldObj = {};
	inputFieldObj["id"] = gridId + '_cb';
	inputFieldObj["type"] = 'th';
	inputFieldObj["role"] = 'columnheader';
	inputFieldObj["style"] = 'width: 25px;';
	inputFieldObj["class"] = 'ui-state-default ui-th-column ui-th-ltr';
	var $th = returnTableColumn(inputFieldObj);
	var inputFieldObj1 = {};
	inputFieldObj1["role"] = 'checkbox';
	inputFieldObj1["type"] = 'checkbox';
	inputFieldObj1["id"] = "cb_" + gridId;
	inputFieldObj1["class"] = 'cbox'
	var $input = returnInputField(inputFieldObj1);
	$MainCheckBox.appendChild($input);
	$th.appendChild($MainCheckBox);

	var inputFieldObjIndex = {};
	inputFieldObjIndex["role"] = "gridcell";
	inputFieldObjIndex["style"] = "height:0px;width:25px;";
	var $index = returnTableColumn(inputFieldObjIndex);
	$($index).insertBefore("#" + gridId + " tr.jqgfirstrow td:first");
	$($th).insertBefore("#gview_" + gridId + " div.ui-jqgrid-hdiv table.ui-jqgrid-htable th:first");
}

/**
 * @description returns grid multi select checkbox
 * @returns
 */
function createGridMultiSelectCheckBox(gridId, rowid) {
	var inputFieldObj = {};
	inputFieldObj["id"] = "td_cb_" + rowid;
	inputFieldObj["role"] = 'gridcell';
	inputFieldObj["style"] = 'text-align:center;width: 20px;'
	inputFieldObj["class"] = 'undefined';
	inputFieldObj["tdlabel"] = '';
	inputFieldObj["ariaDescribedby"] = gridId + '_cb';
	var $td = returnTableColumn(inputFieldObj);
	var inputFieldObj1 = {};
	inputFieldObj1["role"] = 'checkbox';
	inputFieldObj1["type"] = 'checkbox';
	inputFieldObj1["id"] = "jqg_" + gridId;
	inputFieldObj1["name"] = "jqg_" + gridId;
	inputFieldObj1["class"] = 'cbox';
	inputFieldObj1["onclick"] = "checkBoxEvent(" + rowid + ",'subgrid')";
	inputFieldObj1["ariaDescribedby"] = gridId + '_cb';
	var $input = returnInputField(inputFieldObj1);
	$td.appendChild($input);
	$($td).insertBefore("#" + rowid + " td:first");
}

/**
 * @description
 * @param gridId
 * @returns
 */
function createSubGridHeader(gridId) {
	var subGridHeaderId = gridId + '_subgrid';

	var inputFieldHeaderObj = {};
	inputFieldHeaderObj["id"] = subGridHeaderId;
	inputFieldHeaderObj["role"] = 'columnheader';
	inputFieldHeaderObj["style"] = 'width: 25px;';
	inputFieldHeaderObj["class"] = 'ui-state-default ui-th-column ui-th-ltr';
	$th = returnTableHeaderColumn(inputFieldHeaderObj);

	var divId = 'jqgh_' + subGridHeaderId;
	var inputFieldDivObject = {};
	inputFieldDivObject["id"] = divId;
	var $div = returnDiv(inputFieldDivObject);

	var inputFieldSpanObject = {};
	inputFieldSpanObject["class"] = "s-ico";
	inputFieldSpanObject["style"] = "display:none";
	var $span = returnSpan(inputFieldSpanObject);

	inputFieldSpanObject = {};
	inputFieldSpanObject["sort"] = "asc";
	inputFieldSpanObject["class"] = "ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr";
	var $span1 = returnSpan(inputFieldSpanObject);

	inputFieldSpanObject["sort"] = "desc";
	inputFieldSpanObject["class"] = "ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr";
	var $span2 = returnSpan(inputFieldSpanObject);

	$span.appendChild($span1);
	$span.appendChild($span2);
	$div.appendChild($span);
	$th.appendChild($div);
	var x = gridId + "_cb";

	var inputFieldObjIndex = {};
	inputFieldObjIndex["role"] = "gridcell";
	inputFieldObjIndex["style"] = "height:0px;width:25px;";
	var $index = returnTableColumn(inputFieldObjIndex);
	$($index).insertBefore("#" + gridId + " tr.jqgfirstrow td:first");

	if (x == $("#gview_" + gridId + " div.ui-jqgrid-hdiv table.ui-jqgrid-htable th:first").attr('id')) {
		$($th).insertAfter("#gview_" + gridId + " div.ui-jqgrid-hdiv table.ui-jqgrid-htable th:first");
	} else {
		$($th).insertBefore("#gview_" + gridId + " div.ui-jqgrid-hdiv table.ui-jqgrid-htable th:first");
	}
}

/**
 * @description function to create sub grid expandable icon
 * @param gridId
 * @param rowid
 * @returns
 */
function createSubGridIcon(gridId, rowid) {
	var spanId = 'icon_' + rowid + '_' + _pageRef;
	var ariaDescribedBy = gridId + '_subgrid';
	var inputFieldObj = {};
	inputFieldObj["role"] = "gridcell";
	inputFieldObj["ariaDescribedby"] = ariaDescribedBy;
	inputFieldObj["class"] = "ui-sgcollapsed sgcollapsed";
	inputFieldObj["style"] = "width: 25px;";
	inputFieldObj["tdlabel"] = "";
	var $td = returnTableColumn(inputFieldObj);

	var iconId = "icon_" + rowid + _pageRef;
	var inputFieldSpanObject = {};
	inputFieldSpanObject["id"] = spanId;
	inputFieldSpanObject["class"] = "ui-icon ui-icon-plus";
	var $span = returnSpan(inputFieldSpanObject);
	$td.appendChild($span);
	var x = gridId + "_cb";
	if (x == $("#" + rowid + " td:first").attr("aria-describedby")) {
		$($td).insertAfter("#" + rowid + " td:first");
	} else {
		$($td).insertBefore("#" + rowid + " td:first");
	}
}

/**
 * @description function to create Empty subgrid column field
 * @param gridId
 * @param rowid
 * @returns
 */
function createEmptySubGridColumn(gridId, rowid) {
	var ariaDescribedBy = gridId + '_subgrid';
	var inputFieldObj = {};
	inputFieldObj["role"] = "gridcell";
	inputFieldObj["ariaDescribedby"] = ariaDescribedBy;
	inputFieldObj["class"] = "ui-sgcollapsed sgcollapsed";
	inputFieldObj["style"] = "width: 25px;";
	inputFieldObj["tdlabel"] = "";
	var $td = returnTableColumn(inputFieldObj);
	if (x == $("#" + rowid + " td:first").attr("aria-describedby")) {
		$($td).insertAfter("#" + rowid + " td:first");
	} else {
		$($td).insertBefore("#" + rowid + " td:first");
	}
}

/**
 * @description function to update the selection options
 * @param rowObj columnName and list of data
 */
function updateSelectionOptions(rowObj,columnName,list)
{
	var gridId = rowObj.currentTarget.id;
	var selectId = undefined;
	var rowId = undefined;
	var fieldName = "test";
//	if(undefined != gridId && includes(gridId,_response))
//	{
//		selectId = fieldName+"_"+_pageRef+"_response_"+columnName;
//		$("#"+selectId).children().first().remove();
//		$("#"+selectId).prepend('<option selected="selected"></option>');
//		$.each(list,function(i,v)
//		{
//			$("#"+selectId).prepend('<option value="'+fieldName+'"> '+fieldName+' </option>');
//		}	
//		);
//	}
//	else{
//		rowId = rowObj.originalEvent.id;
//		selectId = rowId+"_"+columnName;
//		$("#"+selectId).children().first().remove();
//		$("#"+selectId).prepend('<option selected="selected"></option>');
//		$.each(list,function(i,v)
//		{
//			$("#"+selectId).prepend('<option></option>').val(fieldName).html(fieldName)
//		}	
//		);
//	}
}
/**
 * 
 * @param inputFieldObj
 * @returns
 */
function returnInputField(inputFieldObj) {
	var $input = document.createElement('input');
	$input = returnHTMLCommonAttributes(inputFieldObj, $input);
	return $input;
}

/**
 * @description function to create a table header
 * @param inputFieldObj
 * @returns
 */
function returnTableHeaderColumn(inputFieldObj) {
	inputFieldObj["type"] = 'th';
	var $th = returnTableColumn(inputFieldObj);
	return $th;
}

/**
 * @description function to dynamically create table column
 * @param inputFieldObj
 * @returns
 */
function returnTableColumn(inputFieldObj) {
	var $td;
	if (undefined != inputFieldObj.type) {
		//here the type is td
		$td = document.createElement(inputFieldObj.type);
	} else {
		$td = document.createElement('td');
	}
	$td = returnHTMLCommonAttributes(inputFieldObj, $td);
	return $td;
}

/**
 * 
 * @param inputFieldObj
 * @returns
 */
function returnTableRow(inputFieldObj) {
	var $tr = document.createElement('tr');
	$tr.setAttribute('id', inputFieldObj.id);
	return $tr;
}

/**
 * @description function that returns span attribute
 * @param inputFieldObj
 * @returns
 */
function returnSpan(inputFieldObj) {
	var $span = document.createElement('span');
	$span = returnHTMLCommonAttributes(inputFieldObj, $span);
	return $span;
}

/**
 * @description funtion that returns a div element
 * @param inputFieldObj
 * @returns
 */
function returnDiv(inputFieldObj) {
	var $div = document.createElement('div');
	$div = returnHTMLCommonAttributes(inputFieldObj, $div);
	return $div;
}

/**
 * @description DOM Common attributes
 * @param inputFieldObj
 * @param $element
 * @returns
 */
/*
    inputFieldObj{
 	id:id,
 	class:class,
 	type:type,
 	role:role,
 	name:name,
 	value:value,
 	style:style,
 	tdlabel:tdlabel,
 	ariaDescribedby:ariaDescribedby,
 	sort:sort,
 	onclick:onclick
 */
function returnHTMLCommonAttributes(inputFieldObj, $element) {
	if (undefined != inputFieldObj.id) {
		$element.setAttribute('id', inputFieldObj.id);
	}
	if (undefined != inputFieldObj.type) {
		$element.setAttribute('type', inputFieldObj.type);
	}
	if (undefined != inputFieldObj.class) {
		$element.setAttribute('class', inputFieldObj.class);
	}
	if (undefined != inputFieldObj.role) {
		$element.setAttribute('role', inputFieldObj.role);
	}
	if (undefined != inputFieldObj.style) {
		$element.setAttribute('style', inputFieldObj.style);
	}
	if (undefined != inputFieldObj.tdlabel) {
		$element.setAttribute('tdlabel', inputFieldObj.tdlabel);
	}
	if (undefined != inputFieldObj.ariaDescribedby) {
		$element.setAttribute('aria-describedby', inputFieldObj.ariaDescribedby);
	}
	if (undefined != inputFieldObj.sort) {
		$element.setAttribute('sort', inputFieldObj.sort);
	}
	if (undefined != inputFieldObj.value) {
		$element.setAttribute('value', inputFieldObj.value);
	}
	if (undefined != inputFieldObj.purpose) {
		$element.setAttribute('purpose', inputFieldObj.purpose);
	}
	return $element;
}

/**
 * @description function to show or hide a grid based on grid id
 * @param gridId
 * @returns
 */
function webServiceExplorer_showHideGrid(gridId) {
	var grid = $("#" + gridId);
	if (grid.size() > 0) {
		try {
			var captionDiv = grid[0].grid.cDiv;
			$("a.ui-jqgrid-titlebar-close", captionDiv).click();
		} catch (e) {
			console.log("exception in webServiceExplorer_showHideGrid ToolBar");
			console.log(gridId + "does not reference a grid");
		}
	} else {
		alert("Grid with Id " + gridId + " not defined.")
	}
}

/**
 * @description function to check and uncheck a grid or subgrid
 * @param id 
 * @note if the input id is a row id then we will check uncheck all the subGrid rows
 * if the input id is grid id then we will check uncheck all the grid rows
 * @returns
 */
function checkUcheckGridOrSubGrid(id) {
	if ($("#" + id).hasClass('jqgrow')) {
		var $tr = $("#" + id)
		var gridId = getSubGridIdFromParentRowId(id);
		if (true != $tr.find('input.cbox').prop('checked')) {
			$tr.attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
			$tr.attr('aria-selected', 'true');
			$tr.find('input.cbox').prop('checked', true);
		} else {
			$tr.attr('class', 'ui-widget-content jqgrow ui-row-ltr');
			$tr.attr('aria-selected', 'false');
			$tr.find('input.cbox').prop('checked', false);
		}
	} else if ($("#" + id).hasClass('ui-jqgrid-btable')) {
		if (undefined != $('#cb_' + id).prop('checked') && true != $('#cb_' + id).prop('checked')) {
			$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr');
			$("#" + id).find("tr.jqgrow").attr('aria-selected', 'false');
			$("#" + id).find("tr.jqgrow").find('input.cbox').prop('checked', false);
		} else if (undefined != $('#cb_' + id).prop('checked') && true == $('#cb_' + id).prop('checked')) {
			$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
			$("#" + id).find("tr.jqgrow").attr('aria-selected', 'true');
			$("#" + id).find("tr.jqgrow").find('input.cbox').prop("checked", true);
		} else if (undefined == $('#cb_' + id).prop('checked')) { //incase grid header is removed
			var listParentRows = returnListSubGridParentRow(id);
			var lenRows = listParentRows.length;
			var directParentRow = listParentRows[0];
			var rootParentRow = listParentRows[lenRows - 1]
			var rootParentRowId = rootParentRow.id;
			var gId = getGridIdFromRow(rootParentRowId);
			var g = $("#" + gId);
			var fieldType = g.jqGrid('getCell', rootParentRowId, 'fieldType');
			var type = checkForType(fieldType);
			if ("List" == type || "List<Object>" == type) {
				if (true == $('#' + directParentRow.id + ' input.cbox').prop('checked')) {
					$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
					$("#" + id).find("tr.jqgrow").attr('aria-selected', 'true');
					$("#" + id).find("tr.jqgrow").find('input.cbox').prop("checked", true);
					return;
				} else {
					$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr');
					$("#" + id).find("tr.jqgrow").attr('aria-selected', 'false');
					$("#" + id).find("tr.jqgrow").find('input.cbox').prop('checked', false);
					return;
				}
			}

			if (true != $('#' + rootParentRowId + ' input.cbox').prop('checked')) {
				$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr');
				$("#" + id).find("tr.jqgrow").attr('aria-selected', 'false');
				$("#" + id).find("tr.jqgrow").find('input.cbox').prop('checked', false);
			} else {
				$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
				$("#" + id).find("tr.jqgrow").attr('aria-selected', 'true');
				$("#" + id).find("tr.jqgrow").find('input.cbox').prop("checked", true);
			}
		}
	}
}

/**
 * @description function to check
 * @param id 
 * @note if the input id is a row id then we will check uncheck all the subGrid rows
 * if the input id is grid id then we will check uncheck all the grid rows
 * @returns
 */
function checkGridOrSubGrid(id) {
	if ($("#" + id).hasClass('jqgrow')) {
		var $tr = $("#" + id)
		var gridId = getSubGridIdFromParentRowId(id);
		if (true != $tr.find('input.cbox').prop('checked')) {
			$tr.attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
			$tr.attr('aria-selected', 'true');
			$tr.find('input.cbox').prop('checked', true);
		}
	} 
	else if ($("#" + id).hasClass('ui-jqgrid-btable')) 
	{
		 if (undefined != $('#cb_' + id).prop('checked') && true == $('#cb_' + id).prop('checked')) {
			$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
			$("#" + id).find("tr.jqgrow").attr('aria-selected', 'true');
			$("#" + id).find("tr.jqgrow").find('input.cbox').prop("checked", true);
		  } 
		 else if (undefined == $('#cb_' + id).prop('checked')) { //incase grid header is removed
			var listParentRows = returnListSubGridParentRow(id);
			var lenRows = listParentRows.length;
			var directParentRow = listParentRows[0];
			var rootParentRow = listParentRows[lenRows - 1]
			var rootParentRowId = rootParentRow.id;
			var gId = getGridIdFromRow(rootParentRowId);
			var g = $("#" + gId);
			var fieldType = g.jqGrid('getCell', rootParentRowId, 'fieldType');
			var type = checkForType(fieldType);
			if ("List" == type || "List<Object>" == type) {
				if (true == $('#' + directParentRow.id + ' input.cbox').prop('checked')) {
					$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
					$("#" + id).find("tr.jqgrow").attr('aria-selected', 'true');
					$("#" + id).find("tr.jqgrow").find('input.cbox').prop("checked", true);
					return;
				}
			}
			if(!(true != $('#' + rootParentRowId + ' input.cbox').prop('checked'))){
				$("#" + id).find("tr.jqgrow").attr('class', 'ui-widget-content jqgrow ui-row-ltr ui-state-highlight');
				$("#" + id).find("tr.jqgrow").attr('aria-selected', 'true');
				$("#" + id).find("tr.jqgrow").find('input.cbox').prop("checked", true);
			}
		}
	}
}


/**
 * @description this function will load all the selected rows in a grid and a subgrid
 * @returns
 */
function getAllSelectedRows() {
	var selRows = [];
	var $cboxs = $('input.cbox');
	var rowid = null;
	$.each($cboxs, function(i, v) {
		if ($(v).is(':checked')) {
			rowid = returnRowIdFromColumnId(v.id);
			selRows.push(rowid);
		}
	});
	return selRows;
}

/**
 * @description this function will load all the rows related to the defined grid only
 * @param gridId
 * @returns
 */
function getGridSelectedRows(gridId) {
	gridId = gridId.replace('#', '');
	var grid = $("#" + gridId);
	var $tr = grid.children().children();
	var selRows = [];
	$.each($tr, function(i, v) {
		if ($(v).find('input.cbox').is(':checked') && !$(v).hasClass('ui-subgrid')) {
			selRows.push(v.id);
		}
	});
	return selRows;
}

/**
 * @description returns rows having subgrid flag true only for the passed grid id and not for the subgrid
 * @param gridId
 * @returns
 */
function returnGridRowsThatHaveSubGridFlagTrue(gridId) {
	var $trs = $("#" + gridId).children().children();
	var $rows = [];
	$.each($trs, function(i, v) {
		if ($(v).attr('hasSubGrid') == 'true') {
			$rows.push(v.id);
		}
	});
	return $rows;
}

/**
 * @description returns all the grid rows that are of type vo
 * @param gridId
 * @returns
 */
function returnAllGridRowsThatHaveSubGridFlagTrue(gridId) {
	gridId = gridId.replace('#', '');
	var $trs = $("#" + gridId).find("tr[hasSubGrid = 'true']");
	return $trs;
}

/**
 * @description return all grid mandatory fields
 * @param gridId
 * @returns
 */
function returnGridMandatoryFields(gridId) {
	var $trs = $("#" + gridId).children().children();
	var $mandatory = [];
	$.each($trs, function(i, v) {
		if ($(v).attr('mandatory') == 'true') {
			$mandatory.push(v.id);
		}
	});
	return $mandatory;
}

/**
 * @description function to return all grids and subgrids mandatory fields
 * @param gridId
 * @returns
 */
function returnAllGridAndSubMandatoryFields(gridId) {
	var $trs = $("#" + gridId).find("tr[mandatory = 'true']");
	return $trs;
}

/**
 * @description return all grid rows
 * @param gridId or parent row id
 * @returns
 */
function returnAllSubGridRows(id) {
	var $tr = $("#" + id + '.jqgrow');
	var $grid = $("#" + id + '.ui-jqgrid-btable');
	var $trs = null;
	if ($tr.length > 0) {
		var gridId = getSubGridIdFromParentRowId(rowid);
		$trs = $("#" + gridId).find('tr.jqgrow');
	} else if ($grid.length > 0) {
		$trs = $("#" + id).find('tr.jqgrow');
	}
	return $trs;
}

/**
 * @Description apply new coloring
 * @param parentGrid
 * @param subGrid
 * @returns
 */
function applyGridColoring(parentGrid, subGrid) {
	var colors = parentGrid.find('td').css("background-color");
	colors = colors.replace("rgb(", "").replace("rgba(", "").replace(")", "");
	var colorVal = colors.split(",");
	newColorVal = calculateValue(colorVal[0], 5);
	var subGridColor = "rgb(" + newColorVal + "," + newColorVal + "," + newColorVal + ")";
	subGrid.find('td').css("background-color", subGridColor);
}

/**
 * @description disable on row select event which triggers function checkOrUncheckRow
 * @param gridId
 * @returns
 */
function diableGridOnClickEvent(gridId) {
	gridId = gridId.replace('#', '');
//	$("#"+gridId).before($("#"+gridId)[0].grid.hDiv).unbind();	
}

/**
 * @description function to add an event on row select
 * @param gridId
 * @returns
 */
function gridRowOnClickEvent(gridId) {
	gridId = gridId.replace('#', '');
	$("#" + gridId).before($("#" + gridId)[0].grid.hDiv).click(function(e) {
		rowSelect(e, gridId);
	}
	);
	if (returnGridId() != gridId && returnGridId() + "_response" != gridId) {
		removeGridHeader(gridId);
	}
}

/**
 * 
 * @param e
 * @returns
 */
function rowSelect(e, gridId) {
	var $td = e.target;
	var $tr = $($td, gridId.rows).closest("tr.jqgrow");
	//$("#"+gridId).jqGrid('editRow',$tr[0].id,true);
	if ($tr.length != 0) {
		var rowid = $tr.attr('id');
		var grid = $("#" + gridId);
		var fieldType = grid.jqGrid('getCell', rowid, 'fieldType');
		if ("false" != fieldType && false != fieldType) {
			var type = checkForType(fieldType);
			if ($tr.attr('hassubgrid') == "true" && (type != "HashMap" && type != "List" && type != "List<Object>")) {
				checkBoxEvent($tr[0], 'subgrid');
			} else {
				var rowid = $tr.attr('id');
				var parentRowid;
				if (undefined != rowid) {
					parentRowid = returnSubGridRowParentRowId(rowid);
					if (false == $("#" + parentRowid).find('input.cbox').prop('checked')) {
						checkUcheckGridOrSubGrid(parentRowid);
					}
				}
			}
		} else {
			if (hasSubGrid(rowid)) {
				var gI = getGridIdFromRow(rowid);
				var g = $("#" + gI);
				var fT = g.jqGrid('getCell', rowid, 'fieldType');
				var t = checkForType(fT);
				if (t != "HashMap" && t != "List" && t != "List<Object>") {
					checkBoxEvent($("#" + rowid)[0], 'subgrid');
				}
			}
		}
	}
}

/**
 * 
 * @param ID
 * @param fieldName
 * @param fieldType
 * @param restriction
 * @param value
 * @param list
 * @param map
 * @param reqResCO can be list of json objects
 * @param lstInReqRes
 * @returns
 */
function returnJSONStringObject(ID, fieldName, fieldType, restriction, value, list, map, reqResCO, lstInReqRes) {
	var params = {};
	params["ID"] = ID;
	params["fieldName"] = fieldName;
	params["fieldType"] = fieldType;
	params["restriction"] = restriction;
	params["nillable"] = "false"; //static
	params["value"] = value;
	params["list"] = list;
	params["map"] = map;
	params["reqResCO"] = reqResCO;
	params["lstInReqRes"] = lstInReqRes;
	var stringifiedJSON = JSON.stringify(params);
	return stringifiedJSON;
}

/**
 * @description this function will return true if a grid has rows
 * @param id
 * @returns
 */
function hasSubGridRows(rowid) {
	var gridId = getSubGridIdFromParentRowId(rowid);
	var $trs = returnAllSubGridRows(gridId);
	if ($trs.length > 0) {
		return true;
	}
	return false;
}

/**
 * @description function to check if a grid is expanded based on expanded flag
 * @note when a row is expanded it is not necessary that the data are loaded
 * @param rowid
 * @returns
 */
function isSubGridExpanded(rowid) {
	if ($("#" + rowid).hasClass('jqgrow')) {
		var hField = rowid + "_subGrid_" + _pageRef;
		if ('1' == $("#" + hField).val()) {
			return true;
		}
	} else if ($("#" + rowid).hasClass('ui-jqgrid-btable')) {
		alert('isSubGridExpanded takes row id as an argument and not grid id')
	}
	return false;
}

/**
 * @Description Calculate new value
 * @param number
 * @param percentage
 * @returns
 */
function calculateValue(number, percentage) {
	if (0 == number) {
		number = 242;
	}
	var val = Math.ceil((number * percentage) / 100);
	return (number - val);
}

/**
 * @description function to return main grid id
 */
function returnGridId() {
	var gridId = $("#webServiceExplorerMainGridIds_" + _pageRef).val();
	if (gridId == "" || gridId == null || gridId == undefined) {
		return "webServiceGuiTbl_Id_" + _pageRef;
	} else {
		return gridId;
	}
}

function includes(container, value) 
{
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}

/**
 * function to return the select id in a grid row
 */
function returnSelectIdForGridRow(trSelector, columnName, index) {
	var selects = $("#" + trSelector).find('select');
	if (selects.length == 0) {
		var id = undefined;
		if (undefined == columnName) {
			id = _pageRef + "_mappingField";
		} else {
			id = _pageRef + "_" + columnName;
		}
		var selector = $("#" + trSelector + ">td[aria-describedby*='" + id + "']").selector;
		if (undefined != selector && selector.length > 0) {
			return selector;
		}
		return;
	}
	if (undefined == index && selects.length > 1) {
		return selects[0].selector;
	} else if (undefined != index && selects.length > 1) {
		return selects[index].selector;
	}
	return selects.selector;
}

/**
 * function to return a grid row select value 
 */
function returnSelectValue(trSelector, columnName) {
	return $(returnSelectIdForGridRow(trSelector, columnName)).text();
}

/**
 * make subgrid rows read only
 */
function applyReadOnlyForSubGrid(parentRowId, parentFilterFields, readOnlyFields) {
	var subGridId = getSubGridIdFromParentRowId(parentRowId);
	if (undefined != subGridId) {
		var subGrid = $("#" + subGridId);
		var subGridRowsIds = subGrid.jqGrid('getDataIDs');

		var ar = undefined;

		if (parentRowId != undefined) {
			ar = parentRowId.split("_");
		}
		if (ar != undefined && ar.length > 2 && ar[2] == 'response') {
			var x = parentRowId.split("_");
			$.each(parentFilterFields, function(i, v) {
				if (x[0] == v) {
					$.each(subGridRowsIds, function(i, v) {
						$.each(readOnlyFields, function(i1, v1) {
							$("#" + subGridId).jqGrid('setCellReadOnly', v, v1, "true");
						}
						);
					}
					);
				}
			});
		}
	}
}

/**
 * function to fix grid row plus minus icon 
 * fixGridPlusMinusIcons()
 * 
("{rowId:IconID}")
 * json str consiting of row id and icon id
 */
function fixGridPlusMinusIcons(jsonStrVar)
{
	var jsonStr = undefined;
	if(undefined != jsonStrVar)
	{
		jsonStr = jsonStrVar;
	}
	else
	{
		jsonStr= $("#icon_"+_pageRef).val(); 
	}
	var obj = undefined;
	var iconId = undefined;
	var hFSelector = undefined;
	var closed = undefined; 
	if(jsonStr.length!=0 && undefined != jsonStr)
	{
		obj = JSON.parse(jsonStr);
		for (x in obj) 
		{
			hFSelector = x + "_subGrid_" + _pageRef;
			closed = $("#" + hFSelector).val();
			iconId = obj[x];
//			if( hasSubGrid(x))
//			{
//				$("#" + iconId).switchClass("ui-icon-minus", "ui-icon-plus", 0, "easeInOutQuad");
//			}
//			else{
//				$("#" + iconId).switchClass("ui-icon-plus", "ui-icon-minus", 0, "easeInOutQuad");
//			}
			$("#" + iconId).switchClass("ui-icon-plus", "ui-icon-minus", 0, "easeInOutQuad");
		}
		$("#icon_"+_pageRef).val("");
	}
}

function fixGridSize(gridId)
{
	var reqGridParentWidth = $('#gbox_' + gridId).parent().width();
	var width = undefined;
	
    $('#' + gridId).jqGrid("setGridWidth",width);
	fixGridPlusMinusIcons();
}

