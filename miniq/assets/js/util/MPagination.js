

/**
 * MPagination(Element element,int totalItems,int itemsPerPage)
 * 		onPageChange(CALL_BACK(int pages,Event event))
 */

var MPagination={
	creatNew:function(ELEMENT,TOTAL_ITEMS,ITEMS_PER_PAGE){
		var MPagination={};

		var paginationScope=ELEMENT;
		var totalItems=TOTAL_ITEMS;
		var itemsPerPage=ITEMS_PER_PAGE;
		var totalPages=Math.ceil(TOTAL_ITEMS/ITEMS_PER_PAGE);
		var e_pageChange=function(PAGES){};

		(function(){
			paginationScope.twbsPagination({
				totalPages:totalPages,
				visiblePages:10,
				nextClass:"hide",
				prevClass:"hide",
				firstClass:"hide",
				lastClass:"hide",
				onPageClick:function(EVENT,PAGES){
					e_pageChange(PAGES);
				}
			});
		})();

		MPagination.onPageChange=function(CALL_BACK){
			e_pageChange=CALL_BACK;
		}

		return MPagination;
	}
}


