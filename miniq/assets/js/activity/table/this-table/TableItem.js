minclude("DropDownListItem");
minclude("Div");
minclude("DropDownItemButton");
minclude("Span");
minclude("TableItemInheritEdit");

/**
 * TableItem(tableId,tableName,isCreator,isPublic,isAttention)
 * 		getUI()
 * 		show()
 * 		hide()
 * 		onChangeName(CALL_BACK(tableName))	//返回Deferred对象
 * 		onDeprecated(CALL_BACK())	//返回Deferred对象
 * 		onCancelAttention(CALL_BACK())	//返回Deferred对象
 * 		onOpen(CALL_BACK())			//返回Deferred对象
 * 		onInherit(CALL_BACK(tableId,parentTableId))		//返回Deferred对象
 * 		onSearch(CALL_BACK(tableId))		//返回Deferred对象,并携带tableId,tableName,isPublic信息,
 * 											如果已经继承了该表，则reject 1
 * 											如果查无此表，或此表是私有的则reject 2
 * 											自我继承 reject 3
 * 		onOpenFollowerList(CALL_BACK)	//当用户打开了关注者列表的时候，你可以做一些事情
 * 											
 */
var TableItem={
	creatNew:function(TABLE_ID,TABLE_NAME,IS_CREATOR,IS_PUBLIC,IS_ATTENTION){
		var TableItem={};

		var logNameInpChangeNickName=$("#log_name_inp_changeNickName");
		var createInpParentChangeNickName=$("#create_inp_parent_changeNickName");
		var changeNickNameSaveBtn=$("#changeNickName_save_btn");
		var changeNickNameModal=$("#changeNickName_modal");
		var checkActionBtn=$("#checkAction_btn");
		var checkActionModal=$("#checkAction_Modal");
		var checkActionContent=$("#checkAction_Content");
		var tableId=TABLE_ID;
		var tableName=TABLE_NAME;
		var isCreator=IS_CREATOR;
		var isPublic=IS_PUBLIC;
		var isAttention=IS_ATTENTION;
		var div=Div.creatNew();
		var tableItemInheritEdit=TableItemInheritEdit.creatNew();
		var e_changName=function(TABLE_NAME){return $.Deferred();};
		var e_deprecated=function(){return $.Deferred();};
		var e_cancelAttention=function(){return $.Deferred();};
		var e_open=function(){return $.Deferred();};
		var e_inherit=function(TABLE_ID){return $.Deferred();};
		var e_searchTable=function(TABLE_ID){return $.Deferred();};
		var e_openFollowerList=function(){};

		(function(){
			var dropDownListItem=null;
			if(isCreator){
				dropDownListItem=DropDownListItem.creatNew(true,"<span class=\"glyphicon glyphicon-cog\"></span>","alltime");
				dropDownListItem.addDropDownMenu(getChangeTableNameBtn());
				dropDownListItem.addDropDownMenu(getDeprecatedBtn());
				dropDownListItem.addDropDownMenu(getInheritBtn());
				dropDownListItem.addDropDownMenu(getOpenFollowerListBtn());
				if(!isPublic){
					dropDownListItem.addDropDownMenu(getOpenTableBtn());
				}
			}
			else if(isAttention){
				dropDownListItem.addDropDownMenu(getCancelAttentionBtn());
			}
			else{
				dropDownListItem=DropDownListItem.creatNew(false,"","");
			}

			var tableNameScope=Div.creatNew();
			tableNameScope.html(tableName+" ("+tableId+") "+"("+(IS_PUBLIC==true? "公开的":"私有的")+") ");
			spanOfBelong(IS_CREATOR,IS_ATTENTION).appendTo(tableNameScope.ui);
			dropDownListItem.appendContent(tableNameScope.ui);
			dropDownListItem.appendTo(div.ui);

			tableItemInheritEdit.onSearch(function(TABLE_ID){
				var def=e_searchTable(TABLE_ID);
				return def;
			});
			tableItemInheritEdit.onInherit(function(TABLE_ID){
				var def=e_inherit(tableId,TABLE_ID);
				def.done(function(){

				});
				return def;
			});
		})();

		function spanOfBelong(IS_CREATOR,IS_ATTENTION){
			var span=Span.creatNew();
			span.setAttribute("aria-hidden",true);
			span.setAttribute("data-toggle","tooltip");
			span.setAttribute("data-placement","right");
			if(IS_CREATOR){
				span.addClass('glyphicon glyphicon-user');
				span.setAttribute("data-original-title","自建");
				span.ui.tooltip();
				return span.ui;
			}
			else if(IS_ATTENTION){
				span.addClass('glyphicon glyphicon-eye-open');
				span.setAttribute("data-original-title","关注");
				span.ui.tooltip();
				return span.ui;
			}
			return span.ui;
		}

		function getChangeTableNameBtn(){
			var btn=DropDownItemButton.creatNew();
			btn.html("修改名称");
			btn.onClickListener(function(){
				logNameInpChangeNickName.val(tableName);
				changeNickNameSaveBtn.unbind().bind("click",function(){
					if(logNameInpChangeNickName.val().length>12 || logNameInpChangeNickName.val().length==0){
						createInpParentChangeNickName.addClass("has-error");
					}
					else{
						e_changName(logNameInpChangeNickName.val());
					}
				});
				changeNickNameModal.modal('show');
			});

			return btn;
		}

		function getDeprecatedBtn(){
			var btn=DropDownItemButton.creatNew();
			btn.html("弃用此表");
			btn.onClickListener(function(){
				checkActionContent.html("您确定要弃用\""+tableName+"\"吗？");
				checkActionBtn.unbind().bind("click",function(){
					e_deprecated();
				});
				checkActionModal.modal("show");
			});

			return btn;
		}

		function getCancelAttentionBtn(){
			var btn=DropDownItemButton.creatNew();
			btn.html("取消关注");
			btn.onClickListener(function(){
				checkActionContent.html("您确定要取消关注\""+tableName+"\"吗？");
				checkActionBtn.unbind().bind("click",function(){
					e_cancelAttention();
				});
				checkActionModal.modal("show");
			});
			return btn;
		}

		function getOpenTableBtn(){
			var btn=DropDownItemButton.creatNew();
			btn.html("公开此表");
			btn.onClickListener(function(){
				checkActionContent.html("您确定要公开\""+tableName+"\"吗？(公开后将无法再设为私有)");
				checkActionBtn.unbind().bind("click",function(){
					e_open();
				});
				checkActionModal.modal("show");
			});
			return btn;
		}

		function getInheritBtn(){
			var btn=DropDownItemButton.creatNew();
			btn.html("继承其他表");
			btn.onClickListener(function(){
				tableItemInheritEdit.show();
			});
			return btn;
		}

		function getOpenFollowerListBtn(){
			var btn=DropDownItemButton.creatNew();
			btn.html("关注者&管理者");
			btn.onClickListener(function(){
				e_openFollowerList();
			});
			return btn;
		}


		TableItem.getUI=function(){
			return div.ui;
		}

		TableItem.show=function(){
			div.removeClass('hide');
		}

		TableItem.hide=function(){
			div.addClass('hide');
		}

		TableItem.onOpen=function(CALL_BACK){
			e_open=CALL_BACK;
		}

		TableItem.onChangeName=function(CALL_BACK){
			e_changName=CALL_BACK;
		}

		TableItem.onDeprecated=function(CALL_BACK){
			e_deprecated=CALL_BACK;
		}

		TableItem.onInherit=function(CALL_BACK){
			e_inherit=CALL_BACK;
		}

		TableItem.onSearch=function(CALL_BACK){
			e_searchTable=CALL_BACK;
		}

		TableItem.onCancelAttention=function(CALL_BACK){
			e_cancelAttention=CALL_BACK;
		}

		TableItem.onOpenFollowerList=function(CALL_BACK){
			e_openFollowerList=CALL_BACK;
		}

		return TableItem;
	}
}




