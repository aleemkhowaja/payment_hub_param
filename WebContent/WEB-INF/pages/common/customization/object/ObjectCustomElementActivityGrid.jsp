<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:hidden id="objCust_gridRow_${_pageRef}"/>
<ps:set name="fill_mandatory_key_id" value="%{getEscText('trans_mand_key')}"/>
<ps:set name="noeditablecols_add_key_id"                value="%{getEscText('noeditablecols_add_key')}"/>
<script type="text/javascript">
	var fill_mandatory_key = '<ps:property value="fill_mandatory_key_id" escapeHtml="false" escapeJavaScript="true"/>';
	var noeditablecols_add_key = '<ps:property value="noeditablecols_add_key_id" escapeHtml="false" escapeJavaScript="true"/>';
</script>

<ps:url id="objCustElementActivityGridUrl" action="CustomElementActivity_loadElementActivityList" namespace="/path/customization" escapeAmp="false">
	<ps:param name="sysParamElemActivitiesVO.APP_NAME" value="custCO.appName"/>
 	<ps:param name="sysParamElemActivitiesVO.PROG_REF" value="custCO.screenDispVO.PROG_REF"/>
 	<ps:param name="_pageRef" value="%{_pageRef}"/>
 	<ps:param name="sysParamElemActivitiesVO.OBJ_DISPLAY_ID" value="%{objectDisplayID}"/>
 	<ps:param name="fromObjDisplay" value="%{fromObjDisplay}"/>
 	<ps:param name="objColumnActivity" value="true"/>
</ps:url>

<psjg:grid id="ObjCustElementActivityGrid_Id_${_pageRef}"
	dataType="json"
	href="%{objCustElementActivityGridUrl}"
	caption="%{getText('custom_activity_columns_key')}"
	hiddengrid="false"
	pager="true"
	pagerButtons="false"
	altRows="false"
	filter="true"
	gridModel="gridModel"
	viewrecords="false"
	navigator="true"
	height="120"
	navigatorRefresh="true"
	navigatorEdit="false"
	navigatorSearch="false"
	navigatorAdd="true"
	navigatorDelete="true"
	sortable="true"
	editinline="true"
	ondblclick="objCustElem_LoadDynScrnParamMapGrid()"
	addfunc="objCustElem_addRow"
	delfunc="objCustElem_deleteRow"
	onEditInlineBeforeTopics="objCustElem_onRowSelTopic"
	editurl="dummy"
	shrinkToFit="false"
	onGridCompleteTopics="objCustElem_completeTopics">

	<psjg:gridColumn id="objCustElem_activity_enable_yn_${_pageRef}"
		name="sysParamElemActivitiesVO.ACTIVITY_ENABLE_YN" index="ACTIVITY_ENABLE_YN"
		title="%{getText('enable_key')}"
		colType="checkbox"
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true"
		search="true"
		width="50"
		resizable="true"
		editoptions="{checked:'1', value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) { objCustElem_traceChange(event)}}]}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"/>

	<psjg:gridColumn id="objCustElem_gridColumnNameDesc_${_pageRef}" 
		name="gridColumnNameDesc" index="gridColumnNameDesc"
		title="%{getText('col_name_key')}" editable="true" loadOnce="false"
		sortable="false" edittype="select" colType="select" 
		editoptions="{value:function() {  return objCustElem_loadGridColumnNamesCombo(true)}
		,dataEvents: [{ type: 'change', fn: function() {objCustElem_GridColNamesComboChanged() } }]}"
		search="false" required="true" />

	<psjg:gridColumn id="objCustElem_gridColumnName_${_pageRef}"
		name="gridColumnName" title="" index="gridColumnName"
		 colType="text" sortable="false" hidden="true" />

	<psjg:gridColumn id="objCustElem_activityTypeDesc_${_pageRef}" 
		name="activityDescription" index="activityDescription"
		title="%{getText('activity_type_key')}" editable="true" loadOnce="false"
		sortable="true" edittype="select" colType="select" 
		editoptions="{value:function() {  return objCustElem_customLoadCombo('${pageContext.request.contextPath}/path/customization/CustomElementActivity_loadActivityTypeSelect','activityTypeCmbList', 'code', 'descValue');}
		,dataEvents: [{ type: 'change', fn: function() { objCustElem_CheckActivityIdVisibility() } }]}"
		search="true" required="true" />

	<psjg:gridColumn id="objCustElem_activityType_${_pageRef}"
		name="sysParamElemActivitiesVO.ACTIVITY_TYPE" title="%{getText('Description_key')}"
		colType="text" editable="false" hidden="true" index="ACTIVITY_TYPE"/>

	<psjg:gridColumn id="objCustElem_activityId_${_pageRef}" colType="liveSearch"
		name="sysParamElemActivitiesVO.ACTIVITY_ID" index="ACTIVITY_ID"
		title="%{getText('activity_id_key')}" editable="true" sortable="true"
		search="true" reConstruct="true" 
		paramList="criteria.actionType:sysParamElemActivitiesVO.ACTIVITY_TYPE,criteria.currAppName:sysParamElemActivitiesVO.APP_NAME,criteria.progRef:customizationMaintForm_${_pageRef}_custCO_cutomizationPROG_REF"
		dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructButtonActivityLookup"
		resultList="sysParamBtnCustVO.BTN_ID:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,sysParamBtnCustVO.DESCRIPTION:sysParamElemActivitiesVO.DESCRIPTION"
		dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByButtonActivityId"
		params="customActionParamCO.operationId:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,customActionParamCO.operationType:sysParamElemActivitiesVO.ACTIVITY_TYPE,customActionParamCO.appName:sysParamElemActivitiesVO.APP_NAME,customActionParamCO.progRef:customizationMaintForm_${_pageRef}_custCO_cutomizationPROG_REF"
		dependency="buttonCustomizationCO.customActionParamCO.operationId:sysParamElemActivitiesVO.ACTIVITY_ID_lookuptxt,buttonCustomizationCO.operationDesc:sysParamElemActivitiesVO.DESCRIPTION"
		afterDepEvent="objCustElem_afterActivityIdChange" />

	<psjg:gridColumn id="objCustElem_activityIdDesc_${_pageRef}"
		name="sysParamElemActivitiesVO.DESCRIPTION" title="%{getText('Description_key')}" index="DESCRIPTION"
		colType="text" editable="false" />

	<psjg:gridColumn id="objCustElem_PROCEED_ON_FAIL_${_pageRef}" 
		name="sysParamElemActivitiesVO.PROCEED_ON_FAIL" index="PROCEED_ON_FAIL"
		title="%{getText('proceed_on_fail_key')}" 
		colType="checkbox" 
		edittype="checkbox"
		formatter="checkbox"
		editable="true"
		sortable="true" 
		search="true" 
		width="50" 
		resizable="true"
		editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) { objCustElem_traceChange(event)}}]}"
		align="center"
		searchoptions="{sopt:['eq']}"
		formatoptions="{disabled:false}"/>

	<psjg:gridColumn id="objCustElem_proceedOnExpression_${_pageRef}" name="sysParamElemActivitiesVO.PROCEED_ON_EXPRESSION" title="%{getText('proceed_on_expression_key')}" 
		index="PROCEED_ON_EXPRESSION" colType="text" resizable="true" sortable="false" 
		search="false"  edittype="textarea" width ="300" editoptions="{rows:'3',maxlength:'1000'}" editable="true"/>

	<psjg:gridColumn id="objCustElem_screenWidth_${_pageRef}" name="sysParamElemActivitiesVO.SCREEN_WIDTH" title="%{getText('screen_width_key')}" 
		index="SCREEN_WIDTH" colType="number" editable="true"   editoptions="{ maxlength:'4'}"/>

	<psjg:gridColumn id="objCustElem_screenHeight_${_pageRef}" name="sysParamElemActivitiesVO.SCREEN_HEIGHT" title="%{getText('screen_height_key')}" 
		index="SCREEN_HEIGHT" colType="number" editable="true" editoptions="{ maxlength:'4'}"/>

	<psjg:gridColumn id="objCustElem_screenTitle_${_pageRef}" name="sysParamElemActivitiesVO.SCREEN_TITLE" title="%{getText('screen_title_key')}" 
		index="SCREEN_TITLE" colType="text" editable="true" />

	<psjg:gridColumn id="objCustElem_expressionTags_${_pageRef}" name="autoCompleteTags" title="" colType="text" hidden="true" index="autoCompleteTags"/>

	<psjg:gridColumn id="objCustElem_pageRef_${_pageRef}" name="pageRef" title="" colType="text" hidden="true" index="pageRef"/>

	<psjg:gridColumn id="objCustElem_sequenceId_${_pageRef}" name="sysParamElemActivitiesVO.SEQUENCE_ID" title=""
		index="SEQUENCE_ID" colType="number" hidden="true"/>

	<psjg:gridColumn id="objCustElem_fldIdentifier_${_pageRef}" name="sysParamElemActivitiesVO.FLD_IDENTIFIER" title="" 
		index="FLD_IDENTIFIER" colType="number" hidden="true"/>

	<psjg:gridColumn id="objCustElem_appName_${_pageRef}" name="sysParamElemActivitiesVO.APP_NAME" title="" 
		index="APP_NAME" colType="text" hidden="true"/>

	<psjg:gridColumn id="objCustElem_progRef_${_pageRef}" name="sysParamElemActivitiesVO.PROG_REF" title="" 
		index="PROG_REF" colType="text" hidden="true"/>

</psjg:grid>

<script type="text/javascript">
	$.subscribe("objCustElem_onRowSelTopic",function(rowObj){objCustElem_onRowSelTopic(rowObj);});
	$.subscribe("objCustElem_completeTopics",function(rowObj){objCustElem_completeTopics(rowObj);});
</script>