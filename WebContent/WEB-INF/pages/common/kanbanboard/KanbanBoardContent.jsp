<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="ptt" uri="/path-toolbar-tags"%>
<ps:if test="isRTL == true">
	<link href="<ps:url value='/common/style/kanbanboard/kanban-board-rtl.css' />" rel="stylesheet" type="text/css">
</ps:if>
<ps:else>
	<link href="<ps:url value='/common/style/kanbanboard/kanban-board-ltr.css' />" rel="stylesheet" type="text/css">
</ps:else>
<link href="<ps:url value='/common/style/kanbanboard/kanban-board-styles.css' />" rel="stylesheet" type="text/css">
<div class = "fit-content-height">
	<table class="full-height">
		<tr>
		   <td>
			   <div class="ui-state-default">
					<div>
						<div class="collapsible_header">
							<ps:iterator var="headerDet" value = "headerDetails" status="idStatus">
								<div id ="${headerDet.id}" style="display : none" class="${headerDet.id} hidden_column listener_${headerDet.id} title_items ui-state-active">
									<div class ="ui-state-active"> 
										<span class ="ui-icon ui-icon-triangle-1-e minmax"></span>
									</div>
								</div>
								<div id ="${headerDet.id}" class="${headerDet.id} listener_${headerDet.id} title_items ui-state-active">
									<div id ="${headerDet.id}" class="title_item ui-state-active" style="display : block"> 
										<span class ="ui-icon ui-icon-triangle-1-s minmax"> </span>
										<span> ${headerDet.title}</span>
									</div>
								</div>
							</ps:iterator>		
						</div>	
					</div>
					<ps:iterator var="rowVal" value = "rowModels" status="rowStat">
						<div>
							<div class="collapsible">
								<ps:iterator var="colVal" value = "#rowVal.columnModels" status="colStat">
									<div  style="display : none" class="${colVal.columnHeader} hidden_column title_items ui-state-default"> 
										<div class="items">
											<span class ="ui-icon ui-icon-triangle-1-e minmax"> </span>
										</div>
									</div>
									<div id="${id}_${rowStat.index}_${colStat.index}_Title" class="${colVal.columnHeader} title_items ui-state-default">
										<div class="title_item" style="display : block"> 
											<span id="title_icon" class ="ui-icon ui-icon-triangle-1-e minmax" style="display : block"> </span>
											<div class = "title_content">
												<span>${colVal.columnName}</span>
											</div>
										</div>
									</div>	
								</ps:iterator>
							</div>
							<div class="content">
								<ps:iterator var="colVal" value = "#rowVal.columnModels" status="colStat">
									<div class="items_hidden hidden_column ${colVal.columnHeader}" style="display : none">
										<div class="items items_cell_hidden"></div>
									</div>	
								    <div id="${id}_${rowStat.index}_${colStat.index}" class="items ${colVal.columnHeader} ui-state-default" style="display : block">
										<ps:iterator var = "item" value = "itemModels" status="itemStat">
											<div id="${id}_${rowStat.index}_${colStat.index}_${itemStat.index}" class ="list items_cell parent ui-state-default">
											</div>	
										</ps:iterator>
									</div>
								</ps:iterator>
							</div>
						</div>	
					</ps:iterator>
				</div>
			</td>
		</tr>
	</table>
</div>	
<script type="text/javascript">
	$(document).ready( function() {
		$('#${id}').kanbanboard("initiallizeKanbanBoardComponent");
	});
</script>