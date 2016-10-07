document.write('<script' + ' type="text/javascript" src="'+"assets/js/util/MDate.js"+'">' + '</script>');
document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/div/Div.js"+'">' + '</script>');
document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/button/Button.js"+'">' + '</script>');
document.write('<script' + ' type="text/javascript" src="'+"assets/js/module/modal/TimeSameTransactionModal.js"+'">' + '</script>');
/**
 * 
 * TimeSameTransactionItem(time)
 * 		show()	//它会变成可见的，并返回给你一个元素节点
 * 		hide()
 */
var TimeSameTransactionItem={
	creatNew:function(TIME,TRANSACTION_ITEM_ARY){
		var TimeSameTransactionItem={};

		var div=Div.creatNew();
		var mDate=MDate.creatNew(TIME);
		var btn=null;
		var transactionItemAry=TRANSACTION_ITEM_ARY;

		(function(){
			btn=PopoverButton.creatNew("hover",popverHtml(),"",popverContent());
			btn.appendTo(div.ui);
			btn.onClickListener(function(){
				
			});
		})();

		function popverContent(){
			var content="";
			$.each(transactionItemAry,function(index, el) {
				if(el.isDirectAttention()){
					content+="<strong>"+el.getChildTableName()+"</strong></br>";
				}
				else{
					content+="<strong>"+el.getChildTableName()+" << "+el.getParentTableName()+"</strong></br>";
				}
				if(el.getTransactionContent().length > 100){
					content+=el.getTransactionContent().substring(0,101)+"……";
				}
				else{
					content+=el.getTransactionContent();
				}
				content+="</br></br>"
			});
			return content;
		}

		function popverHtml(){
			return mDate.getHours()+":"+mDate.getMinutes()+"&nbsp&nbsp"+transactionItemAry.length+"个事件";
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
