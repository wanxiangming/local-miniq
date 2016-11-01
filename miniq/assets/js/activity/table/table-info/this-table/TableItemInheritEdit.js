

minclude("Div");
minclude("InheritSearchResult");
/**
 * TableItemInheritEdit()
 * 		getUI()
 * 		show()
 * 		hide()
 * 		onInherit(CALL_BACK(tableId))	//返回Deferred对象
 * 		onSearch(CALL_BACK(tableId))	//返回Deferred对象，并携带tableId,tableName,isPublic信息
 * 										如果已经继承了该表，则reject 1
* 										如果查无此表，或此表是私有的则reject 2
* 										自我继承 reject 3
 */
var TableItemInheritEdit={
	creatNew:function(){
		var TableItemInheritEdit={};

		var inheritScope=$("#inheritSearch");
		var searchInput=$("#search_input");
		var searchBtn=$("#search_button");
		var searchResultScope=$("#searchResult");
		var e_seach=function(TABLE_ID){return $.Deferred();};
		var e_inherit=function(TABLE_ID){return $.Deferred();};

		(function(){
			searchInput.keydown(function(e){
				clearSearchScope();
				if(e.keyCode == 13){
					var def=e_seach(searchInput.val());
					def.done(function(TABLE_ID,TABLE_NAME,IS_PUBLIC){
						makeSearchResultItem(TABLE_ID,TABLE_NAME,IS_PUBLIC).appendTo(searchResultScope);
					});
					def.fail(function(ERROR_CODE){
						makeSearchFailedItem(ERROR_CODE).appendTo(searchResultScope);
					});
				}
			});

			searchBtn.on("click",function(){
				clearSearchScope();
				var def=e_seach(searchInput.val());
				def.done(function(TABLE_ID,TABLE_NAME,IS_PUBLIC){
					makeSearchResultItem(TABLE_ID,TABLE_NAME,IS_PUBLIC).appendTo(searchResultScope);
				});
				def.fail(function(ERROR_CODE){
					makeSearchFailedItem(ERROR_CODE).appendTo(searchResultScope);
				});
			});
		})();

		function makeSearchFailedItem(ERROR_CODE){
			var div=Div.creatNew();
			div.addClass('text-danger col-xs-12');
			div.setAttribute("style","padding-top:15px;padding-left:13px;padding-right:0px");
			if(ERROR_CODE == 1){
				div.html("管道已存在");
			}
			else if(ERROR_CODE == 2){
				div.html("查无此节点，或此节点为私有");
			}
			else if(ERROR_CODE == 3){
				div.html("管道无效");
			}
			return div.ui;
		}

		function makeSearchResultItem(TABLE_ID,TABLE_NAME,IS_PUBLIC){
			var inheritSearchResult=InheritSearchResult.creatNew(TABLE_ID,TABLE_NAME,IS_PUBLIC);
			inheritSearchResult.onInherit(function(T_ID){
				return e_inherit(T_ID);
			});
			return inheritSearchResult.getUI();
		}

		function clearSearchScope(){
			searchResultScope.empty();
		}

		TableItemInheritEdit.show=function(){
			inheritScope.removeClass('hide');
		}

		TableItemInheritEdit.hide=function(){
			inheritScope.addClass('hide');
		}

		TableItemInheritEdit.onInherit=function(CALL_BACK){
			e_inherit=CALL_BACK;
		}

		TableItemInheritEdit.onSearch=function(CALL_BACK){
			e_seach=CALL_BACK;
		}

		return TableItemInheritEdit;
	}
}