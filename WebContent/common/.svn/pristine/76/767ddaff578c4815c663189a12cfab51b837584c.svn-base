(function( $, window, document, undefined ) {

    var KanbanBoard = {
        init: function( options, elem ) {
            var self = this;
            self.elem = elem;
            self.$elem = $( elem );
            self.option = $.extend( {}, $.fn.kanbanboard.options, options );
            self.initializeKanbanBoard();
        },
      
        initializeKanbanBoard: function() {
        	var params = {};
        	var self = this;
        	params["_pageRef"] = self.option._pageRef;
        	$.ajax({
        		url : self.option.href,
        		type : "post",
        		data : params,
        		success : function(data)
        		{
        			self.option.rowModels = data.rowModels;
        			self.option.kanbanModelsTemplate = data.kanbanModelsTemplate;
        			self.option.itemIdList = data.itemIdList;
        			self.option.newItemUrl = data.addOrRemoveItem.newItemUrl;
        			self.option.newItemPopupUrl = data.addOrRemoveItem.newItemPopupUrl;
        			self.option.newItemButtonLabel = data.addOrRemoveItem.newItemButtonLabel;
        			self.option.popupButtonLabel = data.addOrRemoveItem.popupButtonLabel;
        			self.option.newItemPopupTitle = data.addOrRemoveItem.newItemPopupTitle;
        			self.option.newItemLayoutTitle = data.addOrRemoveItem.newItemLayoutTitle;
        			self.option.addNewItem = data.addOrRemoveItem.addNewItem
        			self.option.deleteItem = data.addOrRemoveItem.deleteItem
        			self.option.headerDetails = data.headerDetails;
        			
        			params["id"] = self.option.id;
        			params["rowModelsJSON"] = JSON.stringify(data.rowModels);
        			params["headerDetailsJSON"] = JSON.stringify(data.headerDetails);
        			
        			var url = jQuery.contextPath+"/path/kanbanboard/KanbanBoardBase_loadKanbanBoardAction"
        			self.$elem.load(url,params,function() {
        				$(function() {
        					if(self.option.itemClickListener !=null && self.option.itemClickListener!=undefined) {
        						$("#"+self.elem.id+" .collapsible .title_items").bind("click", function(event) {
        							eval(self.option.itemClickListener)(event);
        						});
        						$("#"+self.elem.id+" .content .parent").bind("click", function(event) {
        							eval(self.option.itemClickListener)(event);
        						});
        					}
        					if(self.option.enableDragAndDrop == "true") {
        						var headerDet = self.option.headerDetails;
        						for (var i = 0; i < headerDet.length; i++) {
        							var connectedForDnD = " ";
    								if(headerDet[i].enableDragAndDrop==true) {
    									var connectedColumns = headerDet[i].connectedColumns;
        								if(connectedColumns==undefined) {
        									connectedForDnD = connectedForDnD+".items."+headerDet[i].id+",";
        								}
        								else {
        									var connectedColumnList = connectedColumns.split(",");
        									for(var j=0;j<connectedColumnList.length;j++) {
        										connectedForDnD = connectedForDnD+".items."+connectedColumnList[j]+",";
        									}
        								}
        								if(connectedForDnD.charAt(connectedForDnD.length-1) == ",")
        									connectedForDnD = connectedForDnD.slice(0, -1);
        								$("#"+self.elem.id+" .items."+headerDet[i].id).sortable({
        									connectWith : self.elem.id+connectedForDnD,
        									start : function(event, ui) {
        										ui.item.toggleClass("highlight");
        									},
        									stop : function(event, ui) {
        										ui.item.toggleClass("highlight");
        										if(self.option.dragAndDropEvent !=null && self.option.dragAndDropEvent!=undefined) {
        											eval(self.option.dragAndDropEvent)(event, ui.item);
        										}
        									}
        								});
        								$("#"+self.elem.id+" .items").disableSelection();
        							}
	        					}
        					}
        					if(self.option.enableExpandCollapse == "true") {
        						$("#"+self.elem.id+" .collapsible").bind("click", function(event) {
        							this.classList.toggle("active");
        							var content = this.nextElementSibling;
        							if (content.style.display === "block") {
        								content.style.display = "none";
        								$(this).find(".title_items .title_item #title_icon")
        										.addClass("ui-icon-triangle-1-e")
        										.removeClass("ui-icon-triangle-1-s");
        							} else {
        								content.style.display = "block";
        								$(this).find(".title_items .title_item #title_icon")
        										.addClass("ui-icon-triangle-1-s")
        										.removeClass("ui-icon-triangle-1-e");
        								if(self.option.expandCollapseEvent !=null && self.option.expandCollapseEvent!=undefined) {
        									eval(self.option.expandCollapseEvent)(event);
        								}
        							}
        						});
        					}
        					else {
        						var collapsibleLayouts = $("#"+self.elem.id+" .collapsible");
        						for(var i=0;i<collapsibleLayouts.length;i++) {
        							var content = collapsibleLayouts[i].nextElementSibling;
        							content.style.display = "block";
        						}
        					}
        				});
        			});
        		}});
        },
        
        returnkanbanBoardUpdatedValues : function(id) {
        	self = this;
        	var rowModelClone = self.option.kanbanModelsTemplate; 
        	var itemIds = self.option.itemIdList;
        	var initialIdMap = self.option.initialIdMap;
			var kanbanUpdatedColumns = new Array();
        	for (var i = 0; i < rowModelClone.length; i++)
        	{
				var kanbanUpdatedItems = new Array();
        		for (var j = 0; j < rowModelClone[i]['columnModels'].length; j++)
        			{
        				var children = self.getKanbanBoardItem(id, i, j).children;
        				var hasChange = self.kanbanBoardHasChange(self.getKanbanBoardItem(id, i, j).id, initialIdMap);
        				if(hasChange) 
        					{
        						var itemList = new Array();
        						for(var x=0;x<children.length;x++) {
        							var item = new Array();
        							for(var y=0;y<itemIds.length;y++) {
        								var selectedItem = $(self.getKanbanBoardItem(id,i, j).children[x]).find("#"+itemIds[y]);
        								if(selectedItem.length == 1) {
        									item.push({"id":itemIds[y],"value":selectedItem.text()});
        								}	
        							}
        							itemList.push(item);
        						}
        						if(itemList.length>0) {
        							kanbanUpdatedItems.push({"itemModels" : itemList,
        								"columnHeader" : rowModelClone[i]['columnModels'][j]["columnHeader"],
        								"columnName" : rowModelClone[i]['columnModels'][j]["columnName"]});
        						}
        					}
        			}
				if(kanbanUpdatedItems.length>0)
					kanbanUpdatedColumns.push({"columnModels":kanbanUpdatedItems});
        	}
        	return JSON.stringify(kanbanUpdatedColumns);
        },
        
        returnkanbanBoardAllItemValues : function(id) {
        	self = this;
        	var rowModelClone = self.option.kanbanModelsTemplate; 
        	var itemIds = self.option.itemIdList;
        	var initialIdMap = self.option.initialIdMap;
			var kanbanUpdatedColumns = new Array();
        	for (var i = 0; i < rowModelClone.length; i++)
        	{
				var kanbanUpdatedItems = new Array();
        		for (var j = 0; j < rowModelClone[i]['columnModels'].length; j++)
        			{
        				var children = self.getKanbanBoardItem(id, i, j).children;
						var itemList = new Array();
						for(var x=0;x<children.length;x++) {
							var item = new Array();
							for(var y=0;y<itemIds.length;y++) {
								var selectedItem = $(self.getKanbanBoardItem(id,i, j).children[x]).find("#"+itemIds[y]);
								if(selectedItem.length == 1) {
									item.push({"id":itemIds[y],"value":selectedItem.text()});
								}	
							}
							itemList.push(item);
						}
						if(itemList.length>0) {
							kanbanUpdatedItems.push({"itemModels" : itemList,
								"columnHeader" : rowModelClone[i]['columnModels'][j]["columnHeader"],
								"columnName" : rowModelClone[i]['columnModels'][j]["columnName"]});
						}
        			}
				if(kanbanUpdatedItems.length>0)
					kanbanUpdatedColumns.push({"columnModels":kanbanUpdatedItems});
        	}
        	return JSON.stringify(kanbanUpdatedColumns);
        },
        
        getKanbanBoardItem : function(id, row, column, item) {
        	column = (column*2)+1;
        	var kanbanLayouts = $("#"+id+" .collapsible");
        	return kanbanLayouts[row].nextElementSibling.children[column].children[item];
        },
        
        getKanbanBoardItem : function(id, row, column) {
        	column = (column*2)+1;
        	var kanbanLayouts = $("#"+id+" .collapsible");
        	return kanbanLayouts[row].nextElementSibling.children[column];
        },

        kanbanBoardHasChange : function(parentId, initialIdMap) {
        	var currentchildList = $("#"+parentId).children();
        	var initialChildList = initialIdMap[parentId];
        	if(initialChildList.length!=currentchildList.length)
        		return true;
        	var currentchildIdList = [];
        	for (var i = 0; i < currentchildList.length; i++) {
        		currentchildIdList.push(currentchildList[i].id);
        	}

        	for(var i = 0;i<initialChildList.length;i++) {
        		if(initialChildList[i] != currentchildIdList[i])
        			return true;
        	}
        	return false
        },
        
        kanbanBoardAddNewItem : function(id, parentId) {
        	var self = this;
        	var mySrc = jQuery.contextPath + self.option.newItemPopupUrl;
        	var popupButtonLabel = self.option.popupButtonLabel;
        	var arg = {};
        	arg['_pageRef'] = _pageRef;
        	_showProgressBar(true);
    		var theForm = $("#"+id);
    		var	dialogDiv = $("<div id='"+id+"_NewItemDialog'> <form id = '"+id+"_NewItemDialogForm'></form></div>");
    		dialogDiv.insertAfter(theForm); 
        	dialogOptions = {
        			modal	: true,
        			title	: self.option.newItemPopupTitle,
        			buttons : {
        				"Add" : {"text":popupButtonLabel,
        						"click":function()
        							{
        								var arg = $("#"+id+"_NewItemDialogForm").serializeForm();
        								arg = arg+"&_pageRef="+_pageRef
        								var addItemUrl = jQuery.contextPath+self.option.newItemUrl;
        								if(self.option.newItemNumber == undefined)
        									self.option.newItemNumber = 0;
        								var newItemNo = parseInt(self.option.newItemNumber)+1;
        								self.option.newItemNumber = newItemNo;
        								var newItemId = "newItem"+newItemNo+"_"+_pageRef+"";
        								var newItemDiv = $("<div id="+newItemId+" class ='list items_cell parent ui-state-default'></div>");
        								$("#"+parentId).append(newItemDiv);
        								newItemDiv.load(addItemUrl, arg);
        								self.applyContextClickListener(newItemId, parentId, id)
										$("#"+id+"_NewItemDialog").dialog('destroy');
										$("#"+id+"_NewItemDialog").remove();

        							}
        						}
        					}
        		};
        		$("#"+id+"_NewItemDialog").dialog(dialogOptions);
        		$("#"+id+"_NewItemDialog").dialog("open");
        	    $("#"+id+"_NewItemDialogForm").load(mySrc, arg);
        		_showProgressBar(false);
        },

        initKanbanBoard : function(idArg, dragAndDropEventArg, expandCollapseEventArg, enableDragAndDropArg, 
        		enableExpandCollapseArg, _pageRefArg, itemClickListenerArg, hrefArg) {
    		$('#'+idArg).kanbanboard({
    			id 						: idArg,
    			dragAndDropEvent 		: dragAndDropEventArg,
    			expandCollapseEvent 	: expandCollapseEventArg,
    			enableDragAndDrop 		: enableDragAndDropArg,
    			enableExpandCollapse 	: enableExpandCollapseArg,
    			_pageRef 				: _pageRefArg,
    			itemClickListener 		: itemClickListenerArg,
    			href 					: hrefArg,
    		});
        },

        initiallizeKanbanBoardComponent : function() {
        	var rowInd;
        	var colInd;
        	var itemModelInd;
        	var events = [];
        	var self = this;
        	var componentId = self.option.id;
        	var rowModelsObj = self.option.rowModels; 
        	var kanbanBoardItemIdMap = {};
        	var addOrRemoveitemEnabled = false;
        	var newItemPopupUrl = self.option.newItemPopupUrl;
        	var newItemUrl = self.option.newItemUrl;
        	if(newItemUrl != "undefined" && newItemPopupUrl != "undefined")
        	{
        		addOrRemoveitemEnabled = true;
            	$.struts2_jquery.require( "jquery.contextMenu.js",null,jQuery.contextPath +"/common/jquery/js/base/"); 
        	}
        	$.each(rowModelsObj, function( rowIndex, row) {
        		var columnModels = row['columnModels'];
        		rowInd = rowIndex;
        		$.each(columnModels, function( colIndex, col) {
        			colInd = colIndex;
        			var itemModels = col['itemModels'];
        			var kanbanBoardItemIdList = [];
        			$.each(itemModels, function( itemModelIndex, itemModel) {
        				itemModelInd = itemModelIndex;
        				var itemUrl = jQuery.contextPath+itemModel['itemUrl'];
        				var itemArgMap = itemModel['itemArguments'];
        				var params = {};
        				params['_pageRef'] = _pageRef;
        				$.each(itemArgMap, function( variable, value) {
        					params[variable] = value;
        				});
        				var itemId = componentId+"_"+rowInd+"_"+colInd+"_"+itemModelInd;
        				var parentId = componentId+"_"+rowInd+"_"+colInd;
        				$("#"+itemId).load(itemUrl, params);
        				if(addOrRemoveitemEnabled == true) {
        					self.applyContextClickListener(itemId,parentId, componentId);
        				}
        				kanbanBoardItemIdList.push(componentId+"_"+rowInd+"_"+colInd+"_"+itemModelInd);
        			});
        			kanbanBoardItemIdMap[componentId+"_"+rowInd+"_"+colInd] =  kanbanBoardItemIdList;
        			var colHeader = col['columnHeader'];
        			if(events.includes(colHeader)==false) {
        				events.push(colHeader);
        				var colHeader = document.getElementsByClassName("listener_"+colHeader);
        				for (var i = 0; i < colHeader.length; i++) {
        				  colHeader[i].addEventListener("click", function() {
        				var columnElements = document.getElementsByClassName(this.id);
        				for (var i = 0; i < columnElements.length; i++) {
        					if(columnElements[i].style.display == "none") {
        						columnElements[i].style.display = "block";
        					}
        					else {
        						columnElements[i].style.display = "none";
        					}
        				}});
        			}}
        		});
        	});
        	self.option.initialIdMap = kanbanBoardItemIdMap;
        },
        
        getTitleContentFromColumnId : function(columndId) {
        	return $("#"+columndId+"_Title .title_content")
        },
        
        applyContextClickListener : function(itemId, parentId, componentId){
        	var self = this;
            $("#"+itemId).contextMenu('kanbanBoardContextMenu',{
            	addNewItem:
                {
                  click: function(element) {
                	  self.kanbanBoardAddNewItem(componentId, parentId)
                  }
                 ,menuTitleTrans:self.option.addNewItem
                },
            	deleteItem:
                {
                  click: function(element) {
                	  var parent = element[0].parentElement;
                	  parent.removeChild(element[0]);
                  }
                 ,menuTitleTrans:self.option.deleteItem
                }

            });
        },
    };

    $.fn.kanbanboard = function( options ) {
        if ($.isPlainObject( options )) {
            return this.each(function() {
                var kanbanBoardObj = Object.create( KanbanBoard );
                kanbanBoardObj.init( options, this );
                $(this).data('kanbanBoardObj', kanbanBoardObj);
            });
        } else if ( typeof options === 'string' && options.indexOf('_') !== 0 ) {
            var kanbanBoardObj = $(this).data('kanbanBoardObj');
            if(kanbanBoardObj == undefined) {
            	kanbanBoardObj = Object.create( KanbanBoard );
            }
            var method = kanbanBoardObj[options];
            return method.apply(kanbanBoardObj, $.makeArray(arguments).slice(1));
        }
    };

    $.fn.kanbanboard.options = {
			enableDragAndDrop:false,
			enableExpandCollapse:false,
			initialIdMap : {},
			newItemNumber : 0
    };

}) ( jQuery, window, document );
