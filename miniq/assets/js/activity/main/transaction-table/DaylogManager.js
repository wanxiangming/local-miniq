

minclude("Daylog");
minclude("MDate");
minclude("Div");
/**
 * DaylogManager(SCOPE)
 * 		addTransactionItem(TransactionItem transactionItem)
 * 		removeTransactionItem(int TransactionId)
 * 		refreshUI()		//让DaylogMangaer根据TransactionItem数据自动调整UI
 * 		rewind()		//重置显示区间
 */
var DaylogManager={
	creatNew:function(SCOPE){
		var DaylogManager={};

		var div=Div.creatNew();
		var daylogScopeAry=[];
		var daylogAry=[];
		var firstScopeNum=1;
		var lastScopeNum=6;
		var transactionItemAryAry=[];

		(function(){

		})();

		DaylogManager.rewind=function(){
			firstScopeNum=1;
			lastScopeNum=6;
		}

		//使daylogManager根据transactionItemAryAry自动调整UI
		DaylogManager.refreshUI=function(){
			sortDaylog();

			div=Div.creatNew();
			div.addClass('panel-body');
			div.appendTo(SCOPE);
			$.each(daylogAry,function(index,value){
				var logScope=Div.creatNew();
				logScope.setAttribute("style","height:280px;overflow-y: auto;");
				logScope.addClass("col-xs-2 correction-clear-col-xs-padding");
				logScope.appendTo(div.ui);
				daylogScopeAry.push(logScope);
				value.appendTo(logScope.ui);
			});
			changeDaylogScopeVisibility();
			if(6 < daylogScopeAry.length){
				SCOPE.unbind().bind('mousewheel',function(event,delta){
					var dl=delta > 0 ? false:true;
					if(dl){
						next();
					}
					else{
						last();
					}
					return false;
				});
			}
		}

		DaylogManager.clear=function(){
			daylogScopeAry=[];
			daylogAry=[];
			div.addClass('hide');
		}

		function next(){
			if(lastScopeNum < daylogScopeAry.length){
				firstScopeNum++;
				lastScopeNum++;
				changeDaylogScopeVisibility();
			}
		}

		function last(){
			if(1 < firstScopeNum){
				firstScopeNum--;
				lastScopeNum--;
				changeDaylogScopeVisibility();
			}
		}

		DaylogManager.addTransactionItem=function(TRANSACTION_ITEM){
			var isExist=false;
			var mDate=MDate.creatNew(TRANSACTION_ITEM.getTransactionTime());
			$.each(daylogAry,function(index, el) {
				if(el.getDayFlag() == mDate.getDayFlag()){
					el.addTransaction(TRANSACTION_ITEM);
					isExist=true;
				}
			});
			if(!isExist){
				var daylog=Daylog.creatNew(mDate.getDayFlag());
				daylog.addTransaction(TRANSACTION_ITEM);
				daylogAry.push(daylog);
			}
		}

		function changeDaylogScopeVisibility(){
			var index=1;
			$.each(daylogScopeAry,function(ind, el) {
				if(firstScopeNum <= index && index <= lastScopeNum){
					el.removeClass('hide');
				}
				else{
					el.addClass('hide');
				}
				index++;
			});
		}

		function sortDaylog(){
			daylogAry.sort(function(valueA,valueB){
				if(valueA.getDayFlag() <= valueB.getDayFlag()){
					return -1;
				}
				else{
					return 1;
				}
			});
		}

		// DaylogManager.addTransactionItem=function(TRANSACTION_ITEM){
		// 	var isExist=false;
		// 	$.each(transactionItemAryAry,function(index, el) {
		// 		if(el[0].getTransactionTime() == TRANSACTION_ITEM.getTransactionTime()){
		// 			el.push(TRANSACTION_ITEM);
		// 			isExist=true;
		// 		}
		// 	});
		// 	if(!isExist){
		// 		var transactionItemAry=[];
		// 		transactionItemAry.push(TRANSACTION_ITEM);
		// 		transactionItemAryAry.push(transactionItemAry);
		// 	}
		// }

		return DaylogManager;
	}
}