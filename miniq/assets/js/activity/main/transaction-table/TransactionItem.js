

minclude("PopoverButton");
minclude("TextTranslator");
minclude("Div");
/**
 *	对transaction的show操作并不会改变它的可见性，
 * 
 * TransactionItem(TransactionDataStructure)
 * 		show()
 * 		hide()
 *
 * 		onClick(CALL_BACK())
 *
 * 		getTransactionId()
 * 		getTransactionTime()
 * 		getTransactionContent()
 * 		getSource()
 * 		getPath()
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
				e_click();
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
			var title=transaction.sourceSTR();
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

		TransactionItem.getPath=function(){
			return transaction.pathSTR();
		}

		TransactionItem.getSource=function(){
			return transaction.sourceSTR();
		}

		TransactionItem.onClick=function(CALL_BACK){
			e_click=CALL_BACK;
		}

		return TransactionItem;
	}
}

