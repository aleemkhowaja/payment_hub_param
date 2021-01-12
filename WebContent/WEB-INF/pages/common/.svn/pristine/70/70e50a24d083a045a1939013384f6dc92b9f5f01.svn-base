<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %> 

				<ps:url id="loadAuditDetailsURL" escapeAmp="false"	action="audit_loadAuditActionDetails"	namespace="/path/audit">
						<ps:param name="appName" value="appName"/>
						<ps:param name="progRef" value="progRef"/>
						<ps:param name="trxNbr" value="trxNbr"/>
						<ps:param name="actionDateMs" value="actionDateMs"/>
						<ps:param name="actionDate" value="actionDate"/>
					</ps:url>
		    <psjg:grid
		    	id="auditActionsDetailsGrid_Id" 
		    	href="%{loadAuditDetailsURL}" 
    	        loadonce="true"
    	        dataType="json"
        		pager="true"
		    	caption="%{getText('audit.reportDtl')}"
		        sortable="true"
				filter="true"
		    	gridModel="gridModel" 
		        viewrecords="true" 
		        altRows="true"
		        height="200"
		        navigatorRefresh="false" 
		        sortname="FIELD_NAME"
		        sortorder="desc"
		        navigatorSearch="false"
		        onCompleteTopics="reSortGrid" 
		        shrinkToFit="false"
		        autowidth="false"
		        width="625">
		        
		        <psjg:gridColumn id="addFieldType" width="120" name="additionalFieldByTypeDesc" title="%{getText('add_field_type_key')}" index="additionalFieldByTypeDesc" colType="text" editable="false" sortable="true" search="true" searchoptions="{sopt:['cn']}"/>
		        <psjg:gridColumn id="fieldName" name="FIELD_NAME" title="%{getText('fieldName')}" index="FIELD_NAME" colType="text" editable="false" sortable="true" search="true" searchoptions="{sopt:['cn']}"/>
		        <psjg:gridColumn id="oldValue" width="120" name="OLD_VALUE" title="%{getText('oldValue')}" index="OLD_VALUE" colType="text" editable="false" sortable="true" search="true" searchoptions="{sopt:['cn']}"/>
		        <psjg:gridColumn id="newValue" width="120" name="NEW_VALUE" title="%{getText('newValue')}" index="NEW_VALUE" colType="text" editable="false" sortable="true" search="true" searchoptions="{sopt:['cn']}"/>
		        <psjg:gridColumn id="modificationDate" width="120" name="ACTION_DATE" title="%{getText('modificationDate')}" index="ACTION_DATE" colType="date" editable="false" sortable="true" sorttype="date" searchType="date"  search="true" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"/>
		        <psjg:gridColumn id="runningDate" width="120" name="RUNNING_DATE" title="%{getText('runningDate')}"  index="RUNNING_DATE" colType="date" editable="false" sortable="true" sorttype="date" searchType="date"  search="true" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"/>
			</psjg:grid>				

		
