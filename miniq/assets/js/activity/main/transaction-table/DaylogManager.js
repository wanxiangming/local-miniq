

minclude("Daylog");
minclude("MDate");
/**
 * DaylogManager(SCOPE)
 * 		clear()			//清除所有的daylog和transaction
 * 		addTransactionItem(TransactionItem transactionItem)
 * 		refreshUI()		//根据add进来的transactionItem布置UI,并重置滑动的头和尾
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

		(function(){

		})();

		DaylogManager.rewind=function(){
			firstScopeNum=1;
			lastScopeNum=6;
		}

		DaylogManager.refreshUI=function(){
			div=Div.creatNew();
			div.addClass('panel-body');
			div.appendTo(SCOPE);
			sortDaylog();
			$.each(daylogAry,function(index,value){
				var logScope=Div.creatNew();
				logScope.setAttribute("style","height:280px;overflow-y: auto;");
				logScope.addClass("col-xs-2");
				logScope.appendTo(div.ui);
				daylogScopeAry.push(logScope);
				value.appendTo(logScope.ui);
			});
			changeDaylogScopeVisibility();
			if(6 < daylogScopeAry.length){
				SCOPE.unbind().bind('mousewheel',scrollMainTable);
			}
		}
		
		function scrollMainTable(event,delta){
			var dl=delta > 0 ? false:true;
			if(dl){
				next();
			}
			else{
				last();
			}
			return false;
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

		DaylogManager.clear=function(){
			daylogScopeAry=[];
			daylogAry=[];
			div.addClass('hide');
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

		return DaylogManager;
	}
}