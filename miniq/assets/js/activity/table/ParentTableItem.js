
document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/div/Div.js"+'">' + '</script>');
document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/button/Button.js"+'">' + '</script>');

/**
 *	它有两种形态，一种是正常的继承关系展示，还有一种是编辑模式,两个模式只需要一个隐藏，一个显示，就能实现切换功能
 * 
 * ParentTableItem(childTable,parentTable,editPermission)
 * 		show()
 * 		hide()
 * 		getUI()
 * 		onRelieveInherit()
 */
var ParentTableItem={
	creatNew:function(CHILD_TABLE,PARENT_TABLE,EDIT_PERMISSION){
		var ParentTableItem={};

		var childTable=CHILD_TABLE;
		var parentTable=PARENT_TABLE;
		var div=Div.creatNew();
		var parentTableItemDisplay=ParentTableItemDisplay.creatNew(childTable.getTableName(),parentTable.getTableId(),parentTable.getTableName(),EDIT_PERMISSION);
		var e_relieveInherit=function(){};
		(function(){
			parentTableItemDisplay.getUI().appendTo(div.ui);
			parentTableItemDisplay.show();
			parentTableItemDisplay.onRelieveInherit(function(PARENT_TABLE_ID){
				e_relieveInherit(PARENT_TABLE_ID);
			});
		})();

		ParentTableItem.getUI=function(){
			return div.ui;
		}

		ParentTableItem.show=function(){
			div.removeClass('hide');
		}

		ParentTableItem.hide=function(){
			div.addClass('hide');
		}

		ParentTableItem.onRelieveInherit=function(CALL_BACK){
			e_relieveInherit=CALL_BACK;
		}

		return ParentTableItem;
	}
}



/**
 * href=http://www.miniq.site/?r=Table/TableInfo&tableId=
 * 
 * ParentTableItemDisplay(tableName,parentTableId,parentTableName,editPermission)
 * 		show()
 * 		hide()
 * 		getUI()
 * 		onRelieveInherit(CALL_BACK(parentTableId))
 */
var ParentTableItemDisplay={
	creatNew:function(TABLE_NAME,PARENT_TABLE_ID,PARENT_TABLE_NAME,EDIT_PERMISSION){
		var ParentTableItemDisplay={};


		var checkActionBtn=$("#checkAction_btn");
		var checkActionModal=$("#checkAction_Modal");
		var checkActionContent=$("#checkAction_Content");
		var div=Div.creatNew();
		var settingBtnDiv=Div.creatNew();
		var settingBtn=DropDown.creatNew("<span class=\"glyphicon glyphicon-cog\"></span>");
		var e_relieveInherit=function(parentTableId){};
		(function(){
			div.addClass("row correction-row-css deep-background-on-hover col-xs-12");
			div.setAttribute("style","padding-top:6px;padding-bottom:6px;");
			div.ui.mouseenter(function(event) {
				settingBtn.show();
			});
			div.ui.mouseleave(function(event) {
				settingBtn.hide();
				settingBtn.closeMenu();
			});

			var tableNameDiv=Div.creatNew();
			tableNameDiv.addClass('col-xs-10');
			tableNameDiv.html(TABLE_NAME+"  <<  "+"<a href=\"http://localhost/?r=Table/TableInfo&tableId="+PARENT_TABLE_ID+"\">"+PARENT_TABLE_NAME+" ("+PARENT_TABLE_ID+")</a>");
			tableNameDiv.appendTo(div.ui);

			settingBtnDiv.addClass('col-xs-2');
			settingBtnDiv.setAttribute("style","padding-top:0px;padding-bottom:0px;");
			settingBtn.hide();
			settingBtn.appendTo(settingBtnDiv.ui);
			settingBtn.addMenuItem(makeRelieveInheritBtn());
			if(EDIT_PERMISSION){
				settingBtnDiv.appendTo(div.ui);
			}		
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
			return dropDownItem.ui;
		}

		ParentTableItemDisplay.onRelieveInherit=function(CALL_BACK){
			e_relieveInherit=CALL_BACK;
		}

		ParentTableItemDisplay.getUI=function(){
			return div.ui;
		}

		ParentTableItemDisplay.show=function(){
			div.removeClass('hide');
		}

		ParentTableItemDisplay.hide=function(){
			div.addClass('hide');
		}

		return ParentTableItemDisplay;
	}
}


/**
 * ParentTableItemEdit()
 * 		show()
 * 		hide()
 * 		onClickRelieveBtn()
 */




