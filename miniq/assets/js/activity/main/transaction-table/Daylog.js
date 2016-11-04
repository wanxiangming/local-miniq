
minclude("DateItem");
minclude("Div");
/**
 * 每一个Daylog都有一个DayFlag，是它的唯一标识
 * 
 * 它维护两个池，一个是TransactionItem池，一个是TransacctionItemContainer池，
 * TransactionItem触发onChange的时候，它把TransactionItem从原 TransacctionItemContainer中移除，然后根据其time，看是否已存在time一样
 * 的TransacctionItemContainer，存在则add给它，不存在则创建一个新的TransacctionItemContainer，并add给它
 * 
 * 它持有当天的所有TransactionItem，并相应他们的on……事件
 * 
 * Daylog(DayFlag)
 * 		addTransaction(TransactionItem transactionItem)	//
 * 		getDayFlag()	//获取它的唯一标识
 * 		
 */
var Daylog={
	creatNew:function(DAY_FLAG){
		var Daylog=Div.creatNew();
		
		// var div=Div.creatNew();
		var dateScope=Div.creatNew();
		var transactionScope=Div.creatNew();
		var isVisible=true;
		var dayFlag=Number(DAY_FLAG);
		var dateItem=DateItem.creatNew(dayFlag);
		var transactionItemAry=[];
		(function(){
			dateScope.appendTo(Daylog.ui);
			transactionScope.appendTo(Daylog.ui);
			dateItem.appendTo(dateScope.ui);
		})();

		Daylog.getDayFlag=function(){
			return dayFlag;
		}

		Daylog.addTransaction=function(TRANSACTION_ITEM){
			transactionItemAry.push(TRANSACTION_ITEM);
			sortItem();
			$.each(transactionItemAry,function(index, el) {
				el.hide();
				el.appendTo(transactionScope.ui);
				el.show();
			});
		}

		function sortItem(){
			transactionItemAry.sort(function(valueA,valueB){
				if(valueA.getTransactionTime() <= valueB.getTransactionTime()){
					return -1;
				}
				else{
					return 1;
				}
			});
		}

		return Daylog;
	}
}

