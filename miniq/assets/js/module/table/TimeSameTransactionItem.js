
minclude("MDate");
minclude("Div");
minclude("Button");
minclude("TimeSameTransactionModal");
minclude("PopoverButton");
minclude("TextTranslator");
/**
 * 
 * TimeSameTransactionItem(time)
 * 		show()	//它会变成可见的，并返回给你一个元素节点
 * 		hide()
 * 		addItem()
 * 		removeItem()
 * 		refreshUI()
 */
var TimeSameTransactionItem={
	creatNew:function(TIME,TRANSACTION_ITEM_ARY){
		var TimeSameTransactionItem={};

		var div=Div.creatNew();
		var mDate=MDate.creatNew(TIME);
		var btn=null;
		var modal=null;
		var transactionItemAry=[];

		(function(){
			btn=PopoverButton.creatNew("hover","","","");
			modal=TimeSameTransactionModal.creatNew();
			modal.bindModal(btn.ui);
			btn.appendTo(div.ui);
			btn.onClickListener(function(){
				modal.initBeforeShow(transactionItemAry);
			});
		})();

		TimeSameTransactionItem.addItem=function(TRANSACTION_ITEM){
			transactionItemAry.push(TRANSACTION_ITEM);
			refreshPopver();
		}

		TimeSameTransactionItem.removeItem=function(TRANSACTION_ITEM_ID){
			transactionItemAry=$.grep(transactionItemAry,function(val,index){
				if(val.getTransactionId() == TRANSACTION_ITEM_ID){
					return false;
				}
				else{
					return true;
				}
			});
			refreshPopver();
		}

		TimeSameTransactionItem.refreshUI=function(){
			refreshPopver();
		}

		function refreshPopver(){
			if(transactionItemAry.length < 2){
				modal.hide();
				hide();
			}
			else{
				btn.changeHtml(popverHtml(transactionItemAry));
				btn.changeContent(popverContent(transactionItemAry));
				show();
			}
		}

		function popverContent(TRANSACTION_ITEM_ARY){
			var textTranslator=TextTranslator.creatNew();
			var content="";
			$.each(TRANSACTION_ITEM_ARY,function(index, el) {
				content+="</br>";
				if(el.isDirectAttention()){
					content+="<strong>"+el.getChildTableName()+"</strong></br>";
				}
				else{
					content+="<strong>"+el.getChildTableName()+" << "+el.getParentTableName()+"</strong></br>";
				}
				if(el.getTransactionContent().length > 100){
					content+=textTranslator.encodeText(el.getTransactionContent()).substring(0,101)+"……";
				}
				else{
					content+=textTranslator.encodeText(el.getTransactionContent());
				}
				content+="</br>";
			});
			content+="</br>";
			return content;
		}

		function popverHtml(TRANSACTION_ITEM_ARY){
			return mDate.getHours()+":"+mDate.getMinutes()+"&nbsp&nbsp"+"<span class=badge>"+TRANSACTION_ITEM_ARY.length+"</span>";
		}

		TimeSameTransactionItem.show=function(){
			show();
			return div.ui;
		}

		function show(){
			div.removeClass('hide');
		}

		TimeSameTransactionItem.hide=function(){
			hide();
		}

		function hide(){
			div.addClass('hide');
		}

		return TimeSameTransactionItem;
	}
}
