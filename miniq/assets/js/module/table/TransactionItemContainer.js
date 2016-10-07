document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/div/Div.js"+'">' + '</script>');
document.write('<script' + ' type="text/javascript" src="'+"assets/js/module/table/TimeSameTransactionItem.js"+'">' + '</script>');
/**
 *	它会根据自己所持有的transactionItem的可见性来改变自己的样子（也就是在transactionItem和timeSameTransaction之间切换，甚至在所有Item不可见的情况下隐藏自己）
 * 
 * TransactionItemContainer(time)
 * 		show()	//它会变成可见的，并返回给你一个元素节点
 * 		hide()
 * 		getTime()
 * 		addTransactionItem(TransactionItem)
 * 		removeTransactionItem(transactionId)
 * 		refreshUI()	//当TransactionItem的可见性发生了变化时，你可以调用这个函数，告诉它刷新UI
 * 					它会根据TransactionItem的可见性决定自己是一个TransactionItem还是一个TimeSameTransactionItem，或者是隐藏的
 */
var TransactionItemContainer={
	creatNew:function(TIME){
		var TransactionItemContainer={};

		var div=Div.creatNew();
		var transactionItemAry=[];
		var time=TIME;
		var timeSameTransactionItem;

		TransactionItemContainer.show=function(){
			show();
			return div.ui;
		}

		function show(){
			div.removeClass('hide');
		}

		TransactionItemContainer.hide=function(){
			hide();
		}

		function hide(){
			div.addClass('hide');
		}

		TransactionItemContainer.getTime=function(){
			return time;
		}

		TransactionItemContainer.addTransactionItem=function(TRANSACTION_ITEM){
			transactionItemAry.push(TRANSACTION_ITEM);
			hideChild();
			refreshUI();
		}

		TransactionItemContainer.removeTransactionItem=function(TRANSACTION_ITEM_ID){
			hideChild();
			transactionItemAry=$.grep(transactionItemAry,function(value,index){
				if(value.getTransactionId() == TRANSACTION_ITEM_ID){
					return false;
				}
				else{
					return true;
				}
			});
			refreshUI();
		}

		TransactionItemContainer.refreshUI=function(){
			hideChild();
			refreshUI();
		}

		//它会根据各个TransactionItem的可见性来设置自己的UI
		function refreshUI(){
			var visibleItemAry=[];
			$.each(transactionItemAry,function(index, el) {
				if(el.isVisible()){
					visibleItemAry.push(el);
				}
			});
			if(visibleItemAry.length > 1){
				timeSameTransactionItem=TimeSameTransactionItem.creatNew(time,visibleItemAry);
				timeSameTransactionItem.show().appendTo(div.ui);
				show();
			}
			else if(visibleItemAry.length == 1){
				visibleItemAry[0].show().appendTo(div.ui);
				show();
			}
			else{
				hide();
			}
		}

		function hideChild(){
			if(timeSameTransactionItem != null){
				timeSameTransactionItem.hide();
			}
			$.each(transactionItemAry,function(index, el) {
				el.hide();
			});
		}


		return TransactionItemContainer;
	}
}
