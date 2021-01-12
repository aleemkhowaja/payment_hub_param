<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %> 

<html>
	<head>
   		<title> <ps:text name="audit.report" /> </title>
	</head>
	<body>
		<div id="auditReportDiv"> 	
		    <psjg:grid
		    	id="auditActionsGrid_Id" 
		    	caption="%{getText('audit.report')}"
    	        href="%{auditActionUrl}" 
                dataType="json"
		    	pager="true" 
				filter="true"
		    	gridModel="gridModel" 
		    	rowNum="5" 
		    	rowList="5,10,15,20"
		        viewrecords="true" 
		        navigator="true" 
		        height="150"
		        altRows="true"
		        navigatorRefresh="false"
		        navigatorSearch="true"
		        navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
		        navigatorAdd="false"
		        navigatorEdit="false"
		        navigatorDelete="false"
		        shrinkToFit="false"
		        autowidth="false"
		        width="625"
		        hidegrid="false">
		        
		        <psjg:gridColumn name="ACTION_DATE" width="120" title="%{getText('actionDate')}" index="ACTION_DATE" colType="date" editable="false" sortable="true" search="true" id="actionDate" sorttype="date" searchType="date" formatter="date" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"/>
		        <psjg:gridColumn name="ACTION_TYPE" width="120" title="%{getText('actionType')}" index="ACTION_TYPE" colType="text" editable="false" sortable="true" search="true" id="actionType"  formatter="actionTypeAuditFormatter"/>
		        <psjg:gridColumn name="USER_ID" width="120" title="%{getText('userId')}" index="USER_ID" colType="text" editable="false" sortable="true" search="true" id="userId" />
		        <psjg:gridColumn name="USER_NAME" width="120" title="%{getText('User_Name__key')}" index="USER_NAME" colType="text" editable="false" sortable="true" search="true" id="userName" />
		        <psjg:gridColumn name="MACHINE_ID"  width="120" title="%{getText('machineId')}" index="MACHINE_ID" colType="text" editable="false" sortable="true" search="true" id="machineId" />
		        <psjg:gridColumn name="APP_NAME"  title="%{getText('appName')}" hidden="true" index="APP_NAME" colType="text" editable="false" id="appName" />
		        <psjg:gridColumn name="PROG_REF"  title="%{getText('progRef')}" hidden="true" index="PROG_REF" colType="text" editable="false" id="progRef" />
		        <psjg:gridColumn name="TRX_NBR"  title="%{getText('trxNbr')}" hidden="true" index="TRX_NBR"  colType="text" editable="false" id="trxNbr" />
		        <psjg:gridColumn name="ACTION_DATE_MS"  title="%{getText('actionDate')}" hidden="true" index="ACTION_DATE_MS"  colType="number" editable="false" id="actionDateMs" />
		        <psjg:gridColumn name="ACTION_TYPE_HIDDEN"  title="%{getText('actionType')}" hidden="true" index="ACTION_TYPE_HIDDEN"  colType="text" editable="false" id="actionTypeHidden" />
			</psjg:grid>	
		</div>
		<br />
		<br />
		<div id="auditReportDtlDiv" > 	
		   <ps:include value="AuditReportDetails.jsp"></ps:include>
		</div>
		
	</body>	
	<script type="text/javascript">
		$(document).ready(function() 
		{ 
			auditReport_onDocReady();
		});
		
		function gridSorting()
		{
			$("#auditActionsDetailsGrid_Id").jqGrid('sortGrid',"FIELD_NAME",true,"asc")
		}
		$.subscribe("reSortGrid",function(){
			$.unsubscribe("reSortGrid")
		  window.setTimeout(gridSorting,0);
		})

	</script>
		
</html>
