

minclude("Div");
/**
 * HistoryItem(TransactionDataStructure transactionDataStructure)
 * 		onClick(CALL_BACK(TransactionDataStructure transactionDataStructure))
 */
var HistoryItem={
	creatNew:function(TRANSACTION_DATA_STRUCTURE){
		var HistoryItem=Div.creatNew();

		var transactionDataStructure=TRANSACTION_DATA_STRUCTURE;
		var contentDiv=Div.creatNew();
		var timeDiv=Div.creatNew();
		var e_click=function(TransactionDataStructure){};

		(function(){
			HistoryItem.addClass('col-xs-12 btn deep-background-on-hover');
			HistoryItem.ui.bind("click",function(){
				e_click(transactionDataStructure);
			});

			contentDiv.addClass('col-xs-10 text-left');
			contentDiv.html(transactionDataStructure.getFirstRowContent());
			contentDiv.appendTo(HistoryItem.ui);

			timeDiv.addClass('col-xs-2 text-right');
			timeDiv.setAttribute("style","color:darkgrey");
			timeDiv.html(getTimeString());
			timeDiv.appendTo(HistoryItem.ui);
		})();

		function getTimeString(){
			var string="";
			var date=new Date(transactionDataStructure.getTime());
			var thatYear=date.getFullYear();
			var thatMonth=date.getMonth()+1;
			var thatDate=date.getDate();

			// var todayDate=new Date();
			// var thisYear=todayDate.getFullYear();
			// var thisMonth=todayDate.getMonth();
			// var thisDate=todayDate.getDate();
			
			// if(thatYear < thisYear){
			// 	string+=thatYear+"-"+thatMonth+"-"+thatDate;
			// }
			// else if(thatMonth < thisMonth){
			// 	// string+=thatMonth+"-"+thatDate;
			// 	string+=thatYear+"-"+thatMonth+"-"+thatDate;
			// }
			// else{
			// 	string+=thatDate+" 日";
			// }
			string+=thatYear+"-"+thatMonth+"-"+thatDate;
			return string;
		}

		HistoryItem.onClick=function(CALL_BACK){
			e_click=CALL_BACK;
		}

		return HistoryItem;
	}
}

