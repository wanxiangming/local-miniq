
minclude("MDate");
minclude("Div");
minclude("PopoverButton");
minclude("TextTranslator");
/**
 * 
 * TimeSameTransactionItem(array TransactionItem)
 * 		show()	//它会变成可见的，并返回给你一个元素节点
 * 		hide()
 * 		onClick(CALL_BACK())
 * 		getTransactionTime()
 */
var TimeSameTransactionItem={
	creatNew:function(TRANSACTION_ITEM_ARY){
		var TimeSameTransactionItem=Div.creatNew();

		var transactionItemAry=TRANSACTION_ITEM_ARY;
		var mDate;
		var btn=null;
		var e_click=function(){};
		(function(){
			$.each(transactionItemAry,function(index, el) {
				mDate=MDate.creatNew(el.getTransactionTime());
			});

			btn=PopoverButton.creatNew("hover",popverHtml(),"",popverContent());
			btn.appendTo(TimeSameTransactionItem.ui);
			btn.onClickListener(function(){
				e_click();
			});
		})();

		function popverContent(){
			var textTranslator=TextTranslator.creatNew();
			var content="";
			$.each(transactionItemAry,function(index, el) {
				if(index!=0){
					content+="</br>";
				}
				content+="<strong>"+el.getSource()+"</strong></br>";
				if(el.getTransactionContent().length > 100){
					content+=textTranslator.encodeText(el.getTransactionContent()).substring(0,101)+"……";
				}
				else{
					content+=textTranslator.encodeText(el.getTransactionContent());
				}
				content+="</br>";
			});
			return content;
		}

		function popverHtml(){
			return mDate.getHours()+":"+mDate.getMinutes()+"&nbsp&nbsp"+"<span class=badge>"+transactionItemAry.length+"</span>";
		}

		TimeSameTransactionItem.show=function(){
			show();
		}

		function show(){
			TimeSameTransactionItem.removeClass('hide');
		}

		TimeSameTransactionItem.hide=function(){
			hide();
		}

		function hide(){
			TimeSameTransactionItem.addClass('hide');
		}

		TimeSameTransactionItem.onClick=function(CALL_BACK){
			e_click=CALL_BACK;
		}

		TimeSameTransactionItem.getTransactionTime=function(){
			return transactionItemAry[0].getTransactionTime();
		}

		return TimeSameTransactionItem;
	}
}
