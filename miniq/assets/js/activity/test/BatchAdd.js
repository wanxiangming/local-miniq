
minclude("InputController");
minclude("Alerts");
minclude("LoaderPiano");

function host(){
	var tableSelect=$("#tableSelect");
	var beginWeekSelect=$("#beginWeek");
	var endWeekSelect=$("#endWeek");
	var weekdaySelect=$("#weekdaySelect");
	var hourSelect=$("#hourSelect");
	var minuteSelect=$("#minuteSelect");
	var contentInput=$("#contentInput");
	var submitBtn=$("#submitBtn");
	var alertScope=$("#alertScope");

	var loaderPiano=LoaderPiano.creatNew();
	loaderPiano.hide();
	loaderPiano.appendTo(alertScope);

	var inputController=InputController.creatNew(contentInput,1000);

	tableSelect.bind("change",function(){
		console.log(getSelectedVal($(this)));
	});

	beginWeekSelect.bind("change",function(event) {
		console.log(getSelectedVal($(this)));
	});

	endWeekSelect.bind("change",function(event) {
		console.log(getSelectedVal($(this)));
	});

	weekdaySelect.bind("change",function(){
		console.log(getSelectedVal($(this)));
	});

	hourSelect.bind("change",function(){
		console.log(getSelectedVal($(this)));
	});

	minuteSelect.bind("change",function(){
		console.log(getSelectedVal($(this)));
	});

	//这里做好一个关于transaction的数组，发送到服务器，服务器遍历数组将数据插入数据库
	submitBtn.bind("click",submitBtnAbled);

	function submitBtnAbled(){
		if(getSelectedVal(beginWeekSelect) <= getSelectedVal(endWeekSelect)  &&  inputController.verify()){
			var date=new Date();
			date.setFullYear(2016,7,29);
			date.setHours(getSelectedVal(hourSelect));
			date.setMinutes(getSelectedVal(minuteSelect));
			date.setSeconds(0);
			date.setMilliseconds(0);
			date.setDate(date.getDate()+(getSelectedVal(weekdaySelect)-1)+(getSelectedVal(beginWeekSelect)-1)*7);

			var transactionAry=[];
			for(var i=0; i<(getSelectedVal(endWeekSelect)-getSelectedVal(beginWeekSelect)+1); i++){
				//设置transaction数据
				console.log(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" 星期"+date.getDay()+" 时间"+date.getHours()+":"+date.getMinutes());
				var time=date.getTime();
				var content=inputController.getContent();
				var tableId=getSelectedVal(tableSelect);
				transactionAry.push({
					"tableId":tableId,
					"content":content,
					"time":time
				});

				date.setDate(date.getDate()+7);
			}
			console.log(transactionAry);
			var batchAddNET=BatchAddTransaction.creatNew(transactionAry);
			batchAddNET.onSuccessLisenter(function(data){
				loaderPiano.hide();
				Alerts.creatNew(true,"数据提交成功",alertScope);
				submitBtn.unbind().bind("click",submitBtnAbled);
				submitBtn.removeClass("disabled");
			});
			batchAddNET.launch();
			submitBtn.addClass("disabled");
			submitBtn.unbind().bind("click",function(){});
			loaderPiano.show();
		}
		else{
			//结束周比开始周小，无效的数据
		}
	}

	function setSelectedVal(SELECTOR,VAL){
		SELECTOR.children("option[value="+VAL+"]").attr("selected",true);
	}

	function getSelectedVal(SELECTOR){
		return Number(SELECTOR.children('option:selected').val());
	}
}

