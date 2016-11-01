

minclude("PopoverButton");
minclude("TextTranslator");
minclude("Div");
minclude("Button");
/**
 *	对transaction的show操作并不会改变它的可见性，
 * 
 * TransactionItem(TransactionDataStructure)
 * 		show()
 * 		hide()
 *
 * 		onClick()
 *
 * 		getTransactionId()
 * 		getTransactionTime()
 * 		getTransactionContent()
 * 		getSourceNodeName()
 * 		getSourceNodeId()
 * 		getPathString()
 * 		getChildTableName()
 * 		getChildTableId()
 * 		getParentTableName()
 * 		getParentTableId()
 * 		
 * 		isDirectAttention()
 */		
var TransactionItem={
	creatNew:function(TRANSACTION_DATA_STRUCTURE){
		var TransactionItem=Div.creatNew();

		var transaction=TRANSACTION_DATA_STRUCTURE;
		var isVisible=true;
		var textTranslator=TextTranslator.creatNew();
		var e_click=function(IS_MANAGER){};
		(function(){
			var btn=PopoverButton.creatNew("hover",popverHtml(),popverTitle(),popverContent());
			btn.onClickListener(function(){
				e_click(transaction.isManager());
			});
			btn.appendTo(TransactionItem.ui);
			TransactionItem.addClass('clear-fix');
		})();

		function popverHtml(){
			var content="";
			var transactionContent=transaction.getContent();
			var reg=/(.)+/;
			var stringAry=transactionContent.match(reg);
			if(stringAry != null){
				content=stringAry[0];
			}
			return content;
		}

		function popverContent(){
			var time=new Date(transaction.getTime());
			var content="<strong>"+time.getHours()+":"+time.getMinutes()+"</strong>"+"<br/>"+textTranslator.encodeText(transaction.getContent());
			return content;
		}

		function popverTitle(){
			var title="";
			if(transaction.isDirectAttention()){
				title="<strong>"+transaction.getChildTableName()+"</strong>";
			}
			else{
				title="<strong>"+transaction.getChildTableName()+" << "+transaction.getParentTableName()+"</strong>";
			}
			return title;
		}

		TransactionItem.show=function(){
			showItem();
		}

		function showItem(){
			TransactionItem.removeClass('hide');
		}

		TransactionItem.hide=function(){
			hideItem();
		}

		function hideItem(){
			TransactionItem.addClass("hide");
		}

		TransactionItem.getTransactionId=function(){
			return transaction.getTransactionId();
		}

		TransactionItem.getTransactionTime=function(){
			return transaction.getTime();
		}

		TransactionItem.getTransactionContent=function(){
			return transaction.getContent();
		}

		TransactionItem.getSourceNodeId=function(){
			return transaction.getTableId();
		}

		TransactionItem.getSourceNodeName=function(){
			if(transaction.isDirectAttention()){
				return 
			}
		}

		TransactionItem.isDirectAttention=function(){
			return transaction.isDirectAttention();
		}

		TransactionItem.getChildTableId=function(){
			return transaction.getChildTableId();
		}

		TransactionItem.getChildTableName=function(){
			return transaction.getChildTableName();
		}

		TransactionItem.getParentTableId=function(){
			return transaction.getParentTableId();
		}

		TransactionItem.getParentTableName=function(){
			return transaction.getParentTableName();
		}

		TransactionItem.onClick=function(CALL_BACK){
			e_click=CALL_BACK;
		}

		return TransactionItem;
	}
}

