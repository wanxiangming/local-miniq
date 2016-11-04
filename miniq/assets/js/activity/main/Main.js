

minclude("DaylogManager");
minclude("AttentionTableAryManager");
minclude("MPagination");
minclude("HistoryItem");
minclude("HistoryPage");
minclude("HistoryPageManager");
minclude("Table");
minclude("AttentionTable");
minclude("Transaction");
minclude("TransactionDataStructure");
minclude("InputController");
minclude("TextTranslator");
minclude("TransactionItem");
minclude("TimeSameTransactionItem");
minclude("LoaderPiano");
minclude("InputControl");


function host(){

	// console.log(tableInheritLinkAry);
	// console.log(attentionTableAryNET);
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
	var allTableIdAry=attentionTableAryManager.getAllTableIdAry();

	//--------------------------------------------------------------------------------------------



	var timeSameTransactionModal=$("#time_same_transaction_modal");
	var transactionScope=$("#time_same_transaction_scope");
	

	var mainTable=$("#mainTable");
	var daylogManager=DaylogManager.creatNew(mainTable);
	var getTransaction=GetTransaction.creatNew(allTableIdAry);
	var transactionItemAryAry=[];
	getTransaction.onSuccessLisenter(function(DATA){
		$.each(DATA,function(index, el) {
			var transactionItem=createTransactionItem(el.id,el.tableId,el.content,el.time);
			insertTransactionItem(transactionItem);
		});
		refreshDaylogManager();
	});
	getTransaction.launch();




	var timePicker=$("#timePicker");
	var createTransactionModal=$("#create_transaction_modal")
	var createTransactionModalContentTextarea=$("#create_log_modal_content_input");
	var createTransactionModalTableSelect=$("#create_log_modal_tableSelect");
	var createTransactionModalcontentRow=$("#create_transaction_content_row");
	var createTransactionModalContentLength=$("#transaction_create_input_length");	//todo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	var createTransactionModalCreateBtn=$("#create_log_modal_create_btn");
	var addTransactionBtn=$("#addTransactionBtn");
	var createTime=new Date();
	var createTransactionIC=InputController.creatNew(createTransactionModalContentTextarea,1000);
	addTransactionBtn.attr("data-toggle","modal");
	addTransactionBtn.attr("data-target","#create_transaction_modal");
	addTransactionBtn.bind("click",function(){
		createTransactionIC.empty();
	});

	$.each(attentionTableAry,function(index,value){
		if(value.isManager()){
			createTransactionModalTableSelect.append("<option value="+value.getTableId()+">"+value.getTableName()+"</option>");
		}
	});
	createTransactionModalCreateBtn.bind("click",function(){
		if(createTransactionIC.verify()){
			var content=createTransactionIC.getContent();
			var time=createTime.getTime();
			var tableId=createTransactionModalTableSelect.val();
			var createTransactionNET=CreateTransaction.creatNew(tableId,time,content);
			createTransactionNET.onSuccessLisenter(function(data){
				if(data > 0){
					var transactionItem=createTransactionItem(data,tableId,content,time);
					insertTransactionItem(transactionItem);
					refreshDaylogManager();
					createTransactionModal.modal('hide');
				}
			});
			createTransactionNET.launch();
		}
		else{
			//do nothing if varification failed 
		}
	});

	createTransactionIC.onChange(function(){
		if(createTransactionIC.verify()){
			contentOk(createTransactionModalcontentRow);
		}
		else{
			contentError(createTransactionModalcontentRow);
		}
	});

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

	function refreshDaylogManager(){
		daylogManager.clear();
		$.each(transactionItemAryAry,function(index, el) {
			if(el.length > 1){
				var timeSameTransactionItem=TimeSameTransactionItem.creatNew(el);
				timeSameTransactionItem.setAttribute("data-toggle","modal");
				timeSameTransactionItem.setAttribute("data-target","#time_same_transaction_modal");
				timeSameTransactionItem.onClick(function(){
					$.each(el,function(index, vel) {
						vel.show();
						vel.appendTo(transactionScope);
					});
					timeSameTransactionModal.on("hidden.bs.modal",function(){
						$.each(el,function(index, vel) {
							vel.hide();
						});
					});
				});
				daylogManager.addTransactionItem(timeSameTransactionItem);
			}
			else{
				daylogManager.addTransactionItem(el[0]);
			}
		});
		daylogManager.refreshUI();
	}

	function insertTransactionItem(transactionItem){
		var isExist=false;
		$.each(transactionItemAryAry,function(index, el) {
			if(el[0].getTransactionTime() == transactionItem.getTransactionTime()){
				el.push(transactionItem);
				isExist=true;
			}
		});
		if(!isExist){
			var transactionItemAry=[];
			transactionItemAry.push(transactionItem);
			transactionItemAryAry.push(transactionItemAry);
		}
	}

	function removeTransactionItem(TRANSACTION_ID){
		var aryAry=[];
		$.each(transactionItemAryAry,function(index, el) {
			var ary=[];
			$.each(el,function(ind, vel) {
				if(vel.getTransactionId() != TRANSACTION_ID){
					ary.push(vel);
				}
			});
			if(ary.length>0){
				aryAry.push(ary);
			}
		});
		transactionItemAryAry=aryAry;
	}


	function createTransactionItem(ID,TABLE_ID,CONTENT,TIME){
		var transaction=Transaction.creatNew();
		transaction.setTransactionId(ID);
		transaction.setTableId(TABLE_ID);
		transaction.setContent(CONTENT);
		transaction.setTime(TIME);
		var transactionDataStructure=TransactionDataStructure.creatNew(attentionTableAry,transaction);
		var transactionItem=TransactionItem.creatNew(transactionDataStructure);
		transactionItem.setAttribute("data-toggle","modal");
		transactionItem.setAttribute("data-target","#transaction_info_modal");
		transactionItem.onClick(function(){
			initTransactionInfoModal(ID,transactionDataStructure.sourceSTR(),transactionDataStructure.pathSTR(),TIME,CONTENT,transactionDataStructure.isManager());
		});
		return transactionItem;
	}


	var e_withdrawal=function(){};
	var confirmBtn=$("#checkAction_btn");
	var confirmModal=$("#checkAction_Modal");
	var confirmModalLoaderScope=$("#confirmModalLoaderScope");
	var confirmLoader=LoaderPiano.creatNew();
	confirmLoader.hide();
	confirmLoader.appendTo(confirmModalLoaderScope);
	confirmBtn.bind("click",function(){
		e_withdrawal();
	});
	function initTransactionInfoModal(ID,SOURCE_NODE_NAME,PATH,TIME,CONTENT,IS_SHOW_WITHDRAWAL_BTN){
		// console.log(TIME);
		var transactionInfoModal=$("#transaction_info_modal");
		
		var transactionSourceNode=$("#transaction_info_modal_source");
		var transactionPath=$("#transaction_info_modal_path");
		var transactionTime=$("#transaction_info_modal_time");
		var transactionContent=$("#transaction_info_modal_content");
		var withdrawalBtn=$("#transaction_info_modal_withdrawal");

		transactionSourceNode.html(SOURCE_NODE_NAME);
		transactionPath.html(PATH);
		var date=new Date(Number(TIME));
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var dateD=date.getDate();
		var hour=date.getHours();
		var minute=date.getMinutes();
		transactionTime.html(year+"-"+month+"-"+dateD+"  "+hour+":"+minute);
		transactionContent.html(TextTranslator.creatNew().encodeText(CONTENT));
		if(IS_SHOW_WITHDRAWAL_BTN){
			//初始化撤销按钮
			e_withdrawal=function(){
				var deleteTransaction=DeleteTransaction.creatNew(ID);
				deleteTransaction.onSuccessLisenter(function(data){
					if(data==0){
						confirmLoader.hide();
						confirmModal.modal("hide");
						transactionInfoModal.modal('hide');
						removeTransactionItem(ID);
						refreshDaylogManager();
					}
				});
				deleteTransaction.launch();
				confirmLoader.show();
			}
			withdrawalBtn.removeClass('hide');
		}
		else{
			withdrawalBtn.addClass('hide');
		}
	}












	var pagination=$("#pagination");
	var historyList=$("#history-list");
	if(0 < historyCountOfTransaction){
		var historyPageManager=HistoryPageManager.creatNew();
		var mPagination=MPagination.creatNew(pagination,historyCountOfTransaction,20);
		var getHistoryTransaction=GetHistoryTransaction.creatNew(allTableIdAry,1);
		getHistoryTransaction.onSuccessLisenter(function(data){
			var historyPage=makeHistoryPage(data,1);
			historyPage.appendTo(historyList);
			historyPageManager.addPage(historyPage);
		});
		getHistoryTransaction.launch();

		mPagination.onPageChange(function(PAGES){
			// console.log(PAGES);
			if(historyPageManager.isPageExist(PAGES)){
				$.each(historyPageManager.getPageAry(),function(index, el) {
					el.hide();
				}); 
				historyPageManager.getPage(PAGES).show();
			}
			else{
				var getHistoryTransactionNET=GetHistoryTransaction.creatNew(allTableIdAry,PAGES);
				getHistoryTransactionNET.onSuccessLisenter(function(data){
					$.each(historyPageManager.getPageAry(),function(index, el) {
						el.hide();
					}); 
					var historyPage=makeHistoryPage(data,PAGES);
					historyPage.appendTo(historyList);
					historyPageManager.addPage(historyPage);
				});
				getHistoryTransactionNET.launch();
			}
		});
	}

	function makeHistoryPage(DATA,PAGES){
		var historyPage=HistoryPage.creatNew(PAGES);
		$.each(DATA,function(index, el) {
			var transaction=Transaction.creatNew();
			transaction.setTransactionId(el.id);
			transaction.setTableId(el.tableId);
			transaction.setContent(el.content);
			transaction.setTime(el.time);
			var transactionDataStructure=TransactionDataStructure.creatNew(attentionTableAry,transaction);
			var historyItem=HistoryItem.creatNew(transactionDataStructure);
			historyItem.setAttribute("data-toggle","modal");
			historyItem.setAttribute("data-target","#transaction_info_modal");
			historyItem.ui.bind("click",function(){
				initTransactionInfoModal(el.id,transactionDataStructure.sourceSTR(),transactionDataStructure.pathSTR(),el.time,el.content,false);
			});
			historyPage.addHistoryItem(historyItem);
		});
		return historyPage;
	}








	var filter=$("#filterInput");
	var inputController=InputController.creatNew(filter,20);
	inputController.onChange(function(){
		var content=inputController.getContent();
		var str=/\*(.+)|\^(.+)/;
		var resultAry=content.match(str);
		console.log(resultAry);
		console.log("节点名称是："+resultAry[1]);
	});
}






















	// daylogManager.whatINeed(function(TIME_ARY){
	// 	var def=$.Deferred();
	// 	
	// 	
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



