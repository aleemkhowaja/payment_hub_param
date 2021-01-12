<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden name="screenId"  value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId" value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="queryData" value="${criteria.queryData}"></ps:hidden>
<ps:hidden name="elementType" value="${criteria.elementType}"></ps:hidden>
<ps:hidden name="tableDatasource" value="${dynScreenQueryCO.tableDatasource}"></ps:hidden>
<ps:form useHiddenProps="true" id="queryDataFormId" namespace="/path/screenGenerator" title = "Retreival Condition">
	<table>
	 <ps:if test="%{@com.path.bo.common.ConstantsCommon@ELEMENT_TYPE_GRID.equals(criteria.elementType)}">
	 	<ps:if test="%{@com.path.bo.common.ConstantsCommon@PROPERTY_CODE_RETRIEVALCONDITION.equals(criteria.elementProperty)}">
	  	 <tr> 
	  	 	<td>
		        <ps:label  id="lbl_queryTable" key="Query_key">
		        </ps:label>
		        <ps:if test="%{criteria.tableName!='null' && criteria.tableName!=''}">
		        <span name="spn_query">: SELECT * FROM ${criteria.tableName} WHERE</span>
		        </ps:if>
		     </td>
		      </tr>
		      <tr> 
		     <td>
		        <ps:label  id="lbl_retreivalCondition"  key="retrieval_condition_key">
		        </ps:label>
		     </td>
		     </tr>
		 </tr>
	  	 </ps:if>
	  	 <ps:else>
	  	 <tr> 
		     <td colspan="4">
		        <ps:label id="lbl_query" for="querySynthax" key="Query_key">
		        </ps:label>
		     </td>
		 </tr>
		</ps:else> 
	 </ps:if> 
	 <ps:else>
		 <tr>
		     <td>
		        <ps:label id="lbl_columnCode" for="queryColumnCode" key="columncode_key">
		        </ps:label>
		     </td>
		     <td>
		        <ps:textfield id="queryColumnCode" name="dynScreenQueryCO.columnCode" required="true">
		        </ps:textfield>
		     </td>
		 </tr>
		 <tr>
		     <td>
		        <ps:label id="lbl_columnDesc" for="queryColumnDesc" key="columndesc_key">
		        </ps:label>
		     </td>
		     <td>
		        <ps:textfield id="queryColumnDesc" name="dynScreenQueryCO.columnDesc" required="true">
		        </ps:textfield>
		     </td>
		 </tr>
	 </ps:else>
	  <tr>
	    <td colspan="4">
		    <ps:textarea id="querySynthax"
		                 name="dynScreenQueryCO.querySynthax"
		                 required="true"
		                 cols="120" 
		                 rows="10"></ps:textarea>
	    </td>
	  </tr>
		<ps:if
			test="%{@com.path.bo.common.ConstantsCommon@ELEMENT_TYPE_LIVESEARCH.equals(criteria.elementType)}">
			<ps:url id="lookupDescGridURL" action="generatorMaint_loadGridAddLookupDescription" namespace="/path/screenGenerator" escapeAmp="false">
				<ps:param name="addLkpDesc" value="%{dynScreenQueryCO.addLkpDesc}"/>
			</ps:url>
			<tr>
			<td>
		        <ps:label id="lbl_addLookupDesc" for="lookupDescGrid_Id" key="add_lookup_desc_key">
		        </ps:label>
		     </td>
		     </tr>
		     <tr >
		     <td  colspan="4">
			<psjg:grid id="lookupDescGrid_Id" dataType="json"
				href="%{lookupDescGridURL}" caption="" pager="false" sortable="true"
				filter="true" gridModel="gridModel" viewrecords="false"
				navigator="true" navigatorDelete="true" navigatorEdit="false"
				navigatorRefresh="true" navigatorAdd="true" navigatorSearch="false"
				editurl=" " editinline="true" altRows="true"
				addfunc="screenGeneratorProp_addLookupDescGrid"
				delfunc="screenGeneratorProp_deleteLookupDescGrid" 
				hiddengrid="false" height="120" shrinkToFit="false">

				<psjg:gridColumn id="DESC_COLUMN" name="DESC_COLUMN" 
					title="%{getText('Description_key')}" index="DESC_COLUMN"
					colType="text" hidden="false" editable="true" />

				<psjg:gridColumn id="ELEMENT_ID" name="ELEMENT_ID" 
					title="%{getText('Element_id_key')}" index="ELEMENT_ID" colType="text" hidden="false"
					editable="true" />

			</psjg:grid>
			  </td>
	  </tr>
		</ps:if>
	</table>
</ps:form>

<script>
  var queryExpTags = screenGeneratorProp_returnAllElementsIdsForGrid(false); 
  apply_auto_complete("querySynthax",queryExpTags);
</script>
