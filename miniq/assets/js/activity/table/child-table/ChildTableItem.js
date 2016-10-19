
minclude("DropDownListItem");
minclude("Div");
/**
 * ChildTableItem()
 * 		getUI()
 * 		show()
 * 		hide()
 * 		onClickSettingBtn()
 */
var ChildTableItem={
	creatNew:function(TABLE_NAME,CHILD_TABLE_ID,CHILD_TABLE_NAME,EDIT_PERMISSION){
		var ChildTableItem={};

		var div=Div.creatNew();
		var settingBtn=Div.creatNew();
		var e_clickSettingBtn=function(){};

		(function(){
			var dropDownListItem=DropDownListItem.creatNew(false,"<span class=\"glyphicon glyphicon-cog\"></span>","mousein");
			var tableNameDiv=Div.creatNew();
			tableNameDiv.html("<a href=\""+MINIQ_URL+"Table/TableInfo&tableId="+CHILD_TABLE_ID+"\">"+CHILD_TABLE_NAME+" ("+CHILD_TABLE_ID+")</a>"+"  <<  "+TABLE_NAME);
			dropDownListItem.appendContent(tableNameDiv.ui);
			dropDownListItem.appendTo(div.ui);	
		})();

		ChildTableItem.getUI=function(){
			return div.ui;
		}

		ChildTableItem.show=function(){
			div.removeClass('hide');
		}

		ChildTableItem.hide=function(){
			div.addClass('hide');
		}

		ChildTableItem.onRelieve=function(CALL_BACK){
			e_clickSettingBtn=CALL_BACK;
		}

		return ChildTableItem;
	}
}















