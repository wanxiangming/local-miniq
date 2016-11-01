
minclude("DateItem");
minclude("TransactionItem");
minclude("TransactionItemContainer");
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
		var transactionItemContainerAry=[];
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
			addItemToContainer(TRANSACTION_ITEM,TRANSACTION_ITEM.getTransactionTime());
		}

		function refreshContainerUI(){
			$.each(transactionItemContainerAry,function(index, el) {
				el.refreshUI();
			});
		}

		function addItemToContainer(TRANSACTION_ITEM,TIME){
			var isExist=false;
			$.each(transactionItemContainerAry,function(index, el) {
				if(el.getTime() == TIME){
					el.addTransactionItem(TRANSACTION_ITEM);
					isExist=true;
				}
			});
			if(!isExist){
				var transactionItemContainer=TransactionItemContainer.creatNew(TIME);
				transactionItemContainer.addTransactionItem(TRANSACTION_ITEM);
				transactionItemContainerAry.push(transactionItemContainer);
				sortContainer();
				$.each(transactionItemContainerAry,function(index, el) {
					el.show().appendTo(transactionScope.ui);
				});
			}
		}

		function sortContainer(){
			transactionItemContainerAry.sort(function(valueA,valueB){
				if(valueA.getTime() <= valueB.getTime()){
					return -1;
				}
				else{
					return 1;
				}
			});
		}

		function isTransactionItemContainerExist(TIME){
			var isExist=false;
			$.each(transactionItemContainerAry,function(index, el) {
				if(el.getTime() == TIME){
					isExist=true;
				}
			});
			return isExist;
		}

		return Daylog;
	}
}

