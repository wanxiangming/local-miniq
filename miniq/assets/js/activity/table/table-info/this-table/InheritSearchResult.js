

minclude("Div");

/**
 *	如果对方是私有表，那么我们可以请求继承，如果是公开表，我们可以直接继承
 *	现在时间有限，我们仅让它能继承公开表，也就是说私有表我们给予用户说明，并且不提供继承操作
 * 
 * InheritSearchResult(tableId,tableName,isPublic)
 * 		getUI()
 * 		onInherit(CALL_BACK(tableId))	//返回Deferred对象
 */
var InheritSearchResult={
	creatNew:function(TABLE_ID,TABLE_NAME,IS_PUBLIC){
		var InheritSearchResult={};

		var tableId=TABLE_ID;
		var tableName=TABLE_NAME;
		var isPublic=IS_PUBLIC;
		var div=Div.creatNew();
		var errorTipDiv=Div.creatNew();
		var e_inherit=function(TABLE_ID){};

		(function(){
			div.addClass('col-xs-12');	
			div.setAttribute("style","padding-top:15px;padding-left:0px;padding-right:0px");

			if(isPublic){
				var visibilityState="公开的";
			}
			else{
				var visibilityState="私有的";
			}
			var tableInfoDiv=Div.creatNew();
			tableInfoDiv.setAttribute("style","padding-top:6px;");
			tableInfoDiv.addClass('col-xs-8');
			tableInfoDiv.html("<a href=\"http://localhost/?r=Table/TableInfo&tableId="+tableId+"\">"+tableName+"("+visibilityState+")</a>");
			tableInfoDiv.appendTo(div.ui);

			if(IS_PUBLIC){
				var inheritBtn=Div.creatNew();
				inheritBtn.addClass('col-xs-2 btn');
				inheritBtn.setAttribute("style","color: cornflowerblue;");
				inheritBtn.html("继承");
				inheritBtn.appendTo(div.ui);
				inheritBtn.ui.bind("click",function(){
					var def=e_inherit(tableId);
					errorTipDiv.html("");
					def.fail(function(ERROR_CODE){
						if(ERROR_CODE == -1){
							errorTipDiv.html("未知的错误");
						}
						else if(ERROR_CODE == -2){
							errorTipDiv.html("已继承该表");
						}
						else if(ERROR_CODE == -3){
							errorTipDiv.html("循环继承错误，</br>\""+tableName+"\"存在于您的子表链上，您无法继承它");
						}
					});
				});
			}

			errorTipDiv.addClass('col-xs-12 text-danger');
			errorTipDiv.appendTo(div.ui);
		})();

		InheritSearchResult.getUI=function(){
			return div.ui;
		}

		InheritSearchResult.onInherit=function(CALL_BACK){
			e_inherit=CALL_BACK;
		}

		return InheritSearchResult;
	}
}
