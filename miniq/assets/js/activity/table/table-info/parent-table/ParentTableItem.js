

minclude("Div");
minclude("DropDownListItem");
minclude("DropDownItemButton");
/**
 * href=http://www.miniq.site/?r=Table/TableInfo&tableId=
 * 
 * ParentTableItem(tableName,parentTableId,parentTableName,editPermission)
 * 		show()
 * 		hide()
 * 		getUI()
 * 		onRelieveInherit(CALL_BACK(parentTableId))
 */
var ParentTableItem={
	creatNew:function(TABLE_NAME,PARENT_TABLE_ID,PARENT_TABLE_NAME,EDIT_PERMISSION){
		var ParentTableItem={};


		var checkActionBtn=$("#checkAction_btn");
		var checkActionModal=$("#checkAction_Modal");
		var checkActionContent=$("#checkAction_Content");
		var div=Div.creatNew();
		var e_relieveInherit=function(parentTableId){};
		(function(){
			var tableNameDiv=Div.creatNew();
			tableNameDiv.html(TABLE_NAME+"  <<  "+"<a href=\""+MINIQ_URL+"Table/TableInfo&tableId="+PARENT_TABLE_ID+"\">"+PARENT_TABLE_NAME+" ("+PARENT_TABLE_ID+")</a>");

			var dropDownListItem=DropDownListItem.creatNew(EDIT_PERMISSION,"<span class=\"glyphicon glyphicon-cog\"></span>","mousein");
			dropDownListItem.addDropDownMenu(makeRelieveInheritBtn());
			dropDownListItem.appendContent(tableNameDiv.ui);
			dropDownListItem.appendTo(div.ui);
		})();

		function makeRelieveInheritBtn(){
			var dropDownItem=DropDownItemButton.creatNew();
			dropDownItem.html("解除继承");
			dropDownItem.onClickListener(function(){
				checkActionContent.html("您确定要解除与\""+PARENT_TABLE_NAME+"\"的继承关系吗？");
				checkActionBtn.unbind().bind("click",function(){
					e_relieveInherit(PARENT_TABLE_ID);
				});
				checkActionModal.modal("show");
			});
			return dropDownItem;
		}

		ParentTableItem.onRelieveInherit=function(CALL_BACK){
			e_relieveInherit=CALL_BACK;
		}

		ParentTableItem.getUI=function(){
			return div.ui;
		}

		ParentTableItem.show=function(){
			div.removeClass('hide');
		}

		ParentTableItem.hide=function(){
			div.addClass('hide');
		}

		return ParentTableItem;
	}
}



