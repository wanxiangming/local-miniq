

minclude("DaylogManager");
minclude("AttentionTableAryManager");
minclude("CreateTransactionModal");
minclude("ChangeTransactionModal");
minclude("MPagination");
minclude("HistoryItem");
minclude("HistoryPage");
minclude("HistoryPageManager");
minclude("Table");
minclude("AttentionTable");
minclude("Transaction");
minclude("TransactionDataStructure");
minclude("InputController");

var changeTransactionModal;

function host(){
	var transactionItemAry=[];

	var createTransactionModal=$("#create_transaction_modal")
	var createTransactionModalContentTextarea=$("#create_log_modal_content_input");
	var createTransactionIC=InputController.creatNew(createTransactionModalContentTextarea,1000);
	var addTransactionBtn=$("#addTransactionBtn");
	addTransactionBtn.attr("data-toggle","modal");
	addTransactionBtn.attr("data-target","#create_transaction_modal");
	addTransactionBtn.bind("click",function(){
		createTransactionIC.empty();
	});

	var createTime=new Date();
	var createTransactionModalCreateBtn=$("#create_log_modal_create_btn");
	var createTransactionModalTableSelect=$("#create_log_modal_tableSelect");
	createTransactionModalCreateBtn.bind("click",function(){	//when the modal open,it will to alter action of create button
		if(createTransactionIC.verify()){
			var content=createTransactionIC.getContent();
			var time=createTime.getTime();
			var tableId=createTransactionModalTableSelect.val();
			var createTransactionNET=CreateTransaction.creatNew(tableId,time,content);
			createTransactionNET.onSuccessLisenter(function(data){
				if(data > 0){
					var transaction=Transaction.creatNew();
					transaction.setTransactionId(data);
					transaction.setTableId(tableId);
					transaction.setContent(content);
					transaction.setTime(time);
					var transactionItem=TransactionItem.creatNew(TransactionDataStructure.creatNew(attentionTableAry,transaction));
					transactionItemAry.push(transactionItem);
					daylogManager.clear();
					$.each(transactionItemAry,function(index, el) {
						daylogManager.addTransactionItem(el);
					});
					daylogManager.refreshUI();
					createTransactionModal.modal('hide');
				}
			});
			createTransactionNET.launch();
		}
		else{
			//do nothing if varification failed 
		}
	});

	var createTransactionModalcontentRow=$("#create_transaction_content_row");
	var createTransactionModalContentLength=$("#transaction_create_input_length");
	createTransactionIC.onChange(function(){
		if(createTransactionIC.verify()){
			contentOk(createTransactionModalcontentRow);
		}
		else{
			contentError(createTransactionModalcontentRow);
		}
	});

	var timePicker=$("#timePicker");
	timePicker.datetimepicker({
		startDate:createTime,
		autoclose:true,
		todayBtn:true,
		todayHighlight:true,
		language:'zh-CN',
		format:'yyyy-mm-dd hh:ii'
	});
	timePicker.datetimepicker("update",createTime);
	timePicker.on("changeDate",function(ev){
		createTime=ev.date;
	});

	function contentOk(ELEMENT){
		ELEMENT.removeClass('has-error');
	}

	function contentError(ELEMENT){
		ELEMENT.addClass('has-error');
	}






	var transactionInfoModal=$("#transaction_info_modal");
	var transactionSourceNode=$("#transaction_info_modal_source");
	var transactionPath=$("#transaction_info_modal_path");
	var transactionTime=$("#transaction_info_modal_time");
	var transactionContent=$("#transaction_info_modal_content");
	var withdrawalBtn=$("#transaction_info_modal_withdrawal");
	function initTransactionInfoModal(SOURCE_NODE_NAME,PATH,TIME,CONTENT,IS_SHOW_WITHDRAWAL_BTN){
		transactionSourceNode.html(SOURCE_NODE_NAME);
		transactionPath.html(PATH);
		var date=new Date(TIME);
		var year=date.getFullYear();
		var month=date.getMoth()+1;
		var dateD=date.getDate();
		var hour=date.getHour();
		var minute=date.getMinute();
		transactionTime.html(year+"-"+month+"-"+dateD+"  "+hour+":"+minute);
		transactionContent.html(CONTENT);
		if(IS_SHOW_WITHDRAWAL_BTN){
			withdrawalBtn.removeClass('hide');
		}
		else{
			withdrawalBtn.addClass('hide');
		}
	}




	changeTransactionModal=ChangeTransactionModal.creatNew();









	console.log(tableInheritLinkAry);
	console.log(attentionTableAryNET);
	var attentionTableAryManager=AttentionTableAryManager.creatNew();
	$.each(attentionTableAryNET,function(index, el) {
		var attentionTable=AttentionTable.creatNew();
		attentionTable.setTableId(el.tableId);
		attentionTable.setTableName(el.tableName);
		attentionTable.setIsManager(el.isManager);
		$.each(el.inheritTableAry,function(ind, value) {
			var table=Table.creatNew();
			table.setTableId(value.tableId);
			table.setTableName(value.tableName);
			attentionTable.addParentTable(table);
		});
		attentionTable.setInheritAry(tableInheritLinkAry[index]);

		attentionTableAryManager.addAttentionTable(attentionTable);
	});

	var attentionTableAry=attentionTableAryManager.getAttentionTableAry();
	$.each(attentionTableAry,function(index,value){
		if(value.isManager()){
			createTransactionModalTableSelect.append("<option value="+value.getTableId()+">"+value.getTableName()+"</option>");
		}
	});

	var mainTable=$("#mainTable");
	var daylogManager=DaylogManager.creatNew(mainTable);

	// daylogManager.whatINeed(function(TIME_ARY){
	// 	var def=$.Deferred();
		var allTableIdAry=attentionTableAryManager.getAllTableIdAry();
		var getTransaction=GetTransaction.creatNew(allTableIdAry);
		getTransaction.onSuccessLisenter(function(DATA){
			$.each(DATA,function(index, el) {
				var transaction=Transaction.creatNew();
				transaction.setTransactionId(el.id);
				transaction.setTableId(el.tableId);
				transaction.setContent(el.content);
				transaction.setTime(el.time);
				var transactionItem=TransactionItem.creatNew(TransactionDataStructure.creatNew(attentionTableAry,transaction));
				transactionItem.setAttribute("data-toggle","modal");
				transactionItem.setAttribute("data-target","#transaction_info_modal");
				transactionItem.onClick(function(IS_MANAGER){
					if(transactionItem.isDirectAttention()){
						var source=transactionItem
					}
					// initTransactionInfoModal(transactionItem.);
				});
				transactionItemAry.push(transactionItem);
				daylogManager.addTransactionItem(transactionItem);
			});
			daylogManager.refreshUI();
		});
		getTransaction.launch();
	// 	return def;
	// });
	// daylogManager.onCreate(function(TABLE_ID,CONTENT,TIME){
	// 	var def=$.Deferred();
	// 	var createLogTransaction=CreateLogTransaction.creatNew(TABLE_ID,TIME,CONTENT);
	// 	createLogTransaction.onSuccessLisenter(function(data){
	// 		var transaction=Transaction.creatNew();
	// 		transaction.setTransactionId(data);
	// 		transaction.setTableId(TABLE_ID);
	// 		transaction.setContent(CONTENT);
	// 		transaction.setTime(TIME);
	// 		def.resolve(TransactionDataStructure.creatNew(attentionTableAry,transaction));
	// 	});
	// 	createLogTransaction.onErrorLisenter(function(){
	// 		def.reject();
	// 	});
	// 	createLogTransaction.launch();
	// 	return def;
	// });
	// daylogManager.onChange(function(TRANSACTION_ID,CONTENT,TIME){
	// 	var def=$.Deferred();
	// 	var changeLogTransaction=ChangeLogTransaction.creatNew(TRANSACTION_ID,TIME,CONTENT);
	// 	changeLogTransaction.onSuccessLisenter(function(data){
	// 		if(data == 0){
	// 			def.resolve();
	// 		}
	// 	});
	// 	changeLogTransaction.onErrorLisenter(function(){
	// 		def.reject();
	// 	});
	// 	changeLogTransaction.launch();
	// 	return def;
	// });
	// daylogManager.onDelete(function(TRANSACTION_ID){
	// 	var def=$.Deferred();
	// 	var deleteLogTransaction=DeleteLogTransaction.creatNew(TRANSACTION_ID);
	// 	deleteLogTransaction.onSuccessLisenter(function(data){
	// 		if(data == 0){
	// 			def.resolve();
	// 		}
	// 	});
	// 	deleteLogTransaction.onErrorLisenter(function(){
	// 		def.reject();
	// 	});
	// 	deleteLogTransaction.launch();
	// 	return def;
	// });

	var pagination=$("#pagination");
	var historyList=$("#history-list");
	if(0 < historyCountOfTransaction){
		var historyPageManager=HistoryPageManager.creatNew();
		var mPagination=MPagination.creatNew(pagination,historyCountOfTransaction,20);
		var getHistoryTransaction=GetHistoryTransaction.creatNew(attentionTableAryManager.getAllTableIdAry(),1);
		getHistoryTransaction.onSuccessLisenter(function(data){
			var historyPage=makeHistoryPage(attentionTableAry,data,1);
			historyPage.appendTo(historyList);
			historyPageManager.addPage(historyPage);
		});
		getHistoryTransaction.launch();

		mPagination.onPageChange(function(PAGES){
			console.log(PAGES);
			if(historyPageManager.isPageExist(PAGES)){
				$.each(historyPageManager.getPageAry(),function(index, el) {
					el.hide();
				}); 
				historyPageManager.getPage(PAGES).show();
			}
			else{
				var getHistoryTransactionNET=GetHistoryTransaction.creatNew(attentionTableAryManager.getAllTableIdAry(),PAGES);
				getHistoryTransactionNET.onSuccessLisenter(function(data){
					$.each(historyPageManager.getPageAry(),function(index, el) {
						el.hide();
					}); 
					var historyPage=makeHistoryPage(attentionTableAry,data,PAGES);
					historyPage.appendTo(historyList);
					historyPageManager.addPage(historyPage);
				});
				getHistoryTransactionNET.launch();
			}
		});
	}
}

function makeHistoryPage(ATTENTION_TABLE_ARY,DATA,PAGES){
	var historyPage=HistoryPage.creatNew(PAGES);
	$.each(DATA,function(index, el) {
		var transaction=Transaction.creatNew();
		transaction.setTransactionId(el.id);
		transaction.setTableId(el.tableId);
		transaction.setContent(el.content);
		transaction.setTime(el.time);
		var transactionDataStructure=TransactionDataStructure.creatNew(ATTENTION_TABLE_ARY,transaction);
		var historyItem=HistoryItem.creatNew(transactionDataStructure);
		historyPage.addHistoryItem(historyItem);
	});
	return historyPage;
}


var TransactionModal={
	creatNew:function(){
		var TransactionModal={};

		TransactionModal.hourBind=function(HOUR,HOUR_UP,HOUR_DOWN){
			HOUR_UP.bind("click",function(){
				HOUR.html(hourUp(HOUR.html()));
			});
			HOUR_DOWN.bind("click",function(){
				HOUR.html(hourDown(HOUR.html()));
			});
		}

		TransactionModal.minuteBind=function(MINUTE,MINUTE_UP,MINUTE_DOWN){
			MINUTE_UP.bind("click",function(){
				MINUTE.html(minuteUp(MINUTE.html()));
			});
			MINUTE_DOWN.bind("click",function(){
				MINUTE.html(minuteDown(MINUTE.html()));
			});
		}

		function hourUp(HOUR){
			HOUR=Number(HOUR);
			if(HOUR < 23)
				return HOUR+1;
			else
				return HOUR;
		}

		function hourDown(HOUR){
			HOUR=Number(HOUR);
			if(HOUR > 0)
				return HOUR-1;
			else 
				return HOUR;
		}

		function minuteUp(MINUTE){
			var MINUTE=Number(MINUTE);
			if(MINUTE < 50)
				return MINUTE+10;
			else
				return MINUTE;
		}

		function minuteDown(MINUTE){
			var MINUTE=Number(MINUTE);
			if(MINUTE > 0)
				return MINUTE-10;
			else
				return MINUTE;
		}
		
		return TransactionModal;
	}
}



























