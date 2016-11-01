

minclude("Div");
/**
 * HistoryPage(int page)
 * 		getPage()
 * 		addHistoryItem(HistoryItem historyItem)
 * 		show()
 * 		hide()
 */
var HistoryPage={
	creatNew:function(PAGE){
		var HistoryPage=Div.creatNew();

		var leftPage=Div.creatNew();
		var rightPage=Div.creatNew();
		var page=PAGE;
		var itemNum=0;

		(function(){
			leftPage.addClass('col-xs-6');
			leftPage.appendTo(HistoryPage.ui)
			rightPage.addClass('col-xs-6');
			rightPage.appendTo(HistoryPage.ui)
			HistoryPage.addClass('col-xs-12');
		})();

		HistoryPage.addHistoryItem=function(HISTORY_ITEM){
			if(itemNum < 10){
				HISTORY_ITEM.appendTo(leftPage.ui);
			}
			else{
				HISTORY_ITEM.appendTo(rightPage.ui);
			}
			itemNum++;
		}

		HistoryPage.show=function(){
			HistoryPage.removeClass('hide');
		}

		HistoryPage.hide=function(){
			HistoryPage.addClass('hide');
		}

		HistoryPage.getPage=function(){
			return page;
		}

		return HistoryPage;
	}
}
