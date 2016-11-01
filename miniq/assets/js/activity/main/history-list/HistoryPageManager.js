
/**
 * HistoryPageManager()
 * 		isPageExist(int page)	//return boolean
 * 		addPage(HistoryPage historyPage)
 * 		getPage(int page)		//return HistoryPage
 * 		getPageAry()			//return array of HistoryPage
 */
var HistoryPageManager={
	creatNew:function(){
		var HistoryPageManager={};

		var historyPageAry=[];

		HistoryPageManager.isPageExist=function(PAGE){
			var isPageExist=false;
			$.each(historyPageAry,function(index, el) {
				if(el.getPage() == PAGE){
					isPageExist=true;
				}
			});
			return isPageExist;
		}

		HistoryPageManager.addPage=function(HISTORY_PAGE){
			historyPageAry.push(HISTORY_PAGE);
		}

		HistoryPageManager.getPage=function(PAGE){
			var historyPage=null;
			$.each(historyPageAry,function(index, el) {
				if(el.getPage() == PAGE){
					historyPage=el;
				}
			});
			return historyPage;
		}

		HistoryPageManager.getPageAry=function(){
			return historyPageAry;
		}

		return HistoryPageManager;
	}
}

