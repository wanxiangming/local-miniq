
minclude("MDate");
minclude("Div");
minclude("Button");
// minclude("CreateTransactionModal");
/**
 * 有两种显示模式，一种是显示年月日，一种是星期和日期
 * 它会根据日期自动调整自己的样式（也就是显示“今天”）
 * 
 * DateItem(dayFlag)
 * 		changeUiToYMD()
 * 		changeUiToDD()
 */
var DateItem={
	creatNew:function(DAY_FLAG){
		var DateItem=Div.creatNew();

		var dayFlag=DAY_FLAG;
		var theMDate=MDate.creatNew(DAY_FLAG);
		var dateBtn=Button.creatNew();
		(function(){
			initDateBtn();
		})();

		function initDateBtn(){
			dateBtn.addClass("btn text-center col-xs-12");
			dateBtn.appendTo(DateItem.ui);
			if(isToday()){
				dateBtn.addClass("btn-primary");
			}
			else{
				dateBtn.addClass("btn-activity-main-dateBtn");
			}
			changeUiToYMD();
		}

		function isToday(){
			var todayFlag=MDate.creatNew(new Date()).getDayFlag();
			return dayFlag == todayFlag;
		}

		DateItem.changeUiToDD=function(){
			changeUiToDD();
		}

		function changeUiToDD(){
			dateBtn.html(theMDate.getChineseDay()+"&nbsp;&nbsp;&nbsp;"+theMDate.getDate());
		}

		DateItem.changeUiToYMD=function(){
			changeUiToYMD();
		}

		function changeUiToYMD(){
			dateBtn.html(theMDate.getFullYear()+"-"+(theMDate.getMonth()+1)+"-"+theMDate.getDate()+"&nbsp;&nbsp;&nbsp;&nbsp;"+getChineseDay(theMDate.getDay()));
		}

		function getChineseDay(NUM){
			switch(NUM){
				case 1:
					return "一";
				case 2:
					return "二";
				case 3:
					return "三";
				case 4:
					return "四";
				case 5:
					return "五";
				case 6:
					return "六";
				case 0:
					return "日";
			}
		}

		return DateItem;
	}
}
