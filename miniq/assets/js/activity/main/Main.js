
minclude("MDate");
minclude("TextTranslator");
minclude("Div");
minclude("Button");
minclude("InputController");
minclude("DaylogManager");
minclude("AttentionTableInfoManager");
minclude("CreateTransactionModal");
minclude("ChangeTransactionModal");

var createTransactionModal=null;
var changeTransactionModal=null;

function host(){
	var mainTable=$("#mainTable");
	createTransactionModal=CreateTransactionModal.creatNew();
	changeTransactionModal=ChangeTransactionModal.creatNew();

	var changeModal=TransactionModal.creatNew();
	var changeTransactionModalHourUpBtn=$("#change_log_modal_hour_up_btn");
	var changeTransactionModalHourDownBtn=$("#change_log_modal_hour_down_btn");
	var changeTransactionModalMinuteUpBtn=$("#change_log_modal_minute_up_btn");
	var changeTransactionModalMinuteDownBtn=$("#change_log_modal_minute_down_btn");
	var changeTransactionModalHour=$("#change_log_modal_hour");
	var changeTransactionModalMinute=$("#change_log_modal_minute");
	changeModal.hourBind(changeTransactionModalHour,changeTransactionModalHourDownBtn,changeTransactionModalHourUpBtn);
	changeModal.minuteBind(changeTransactionModalMinute,changeTransactionModalMinuteDownBtn,changeTransactionModalMinuteUpBtn);


	var createModal=TransactionModal.creatNew();
	var createTransactionModalTableSelect=$("#create_log_modal_tableSelect");
	var createTransactionModalHourUpBtn=$("#create_log_modal_hour_up_btn");
	var createTransactionModalHourDownBtn=$("#create_log_modal_hour_down_btn");
	var createTransactionModalMinuteUpBtn=$("#create_log_modal_minute_up_btn");
	var createTransactionModalMinuteDownBtn=$("#create_log_modal_minute_down_btn");
	var createTransactionModalHour=$("#create_log_modal_hour");
	var createTransactionModalMinute=$("#create_log_modal_minute");
	createModal.hourBind(createTransactionModalHour,createTransactionModalHourDownBtn,createTransactionModalHourUpBtn);
	createModal.minuteBind(createTransactionModalMinute,createTransactionModalMinuteDownBtn,createTransactionModalMinuteUpBtn);

	var attentionTableInfoManager=AttentionTableInfoManager.creatNew();
	attentionTableInfoManager.onSuccess(function(){
		var attentionTableAry=attentionTableInfoManager.getAttentionTableAry();
		$.each(attentionTableAry,function(index,value){
			if(value.isManager()){
				createTransactionModalTableSelect.append("<option value="+value.getTableId()+">"+value.getTableName()+"</option>");
			}
		});

		var daylogManager=DaylogManager.creatNew(mainTable);
		daylogManager.whatINeed(function(TIME_ARY){
			var def=$.Deferred();
			var allTableIdAry=attentionTableInfoManager.getAllTableIdAry();
			var getTransaction=GetTransaction.creatNew(allTableIdAry,TIME_ARY);
			getTransaction.onSuccessLisenter(function(DATA){
				var transactionDataStructureAry=[];
				$.each(DATA,function(index, el) {
					var transaction=Transaction.creatNew();
					transaction.setTransactionId(el.id);
					transaction.setTableId(el.tableId);
					transaction.setContent(el.content);
					transaction.setTime(el.time);
					transactionDataStructureAry.push(TransactionDataStructure.creatNew(attentionTableAry,transaction));

				});
				def.resolve(transactionDataStructureAry);
			});
			getTransaction.launch();
			return def;
		});
		daylogManager.onCreate(function(TABLE_ID,CONTENT,TIME){
			var def=$.Deferred();
			var createLogTransaction=CreateLogTransaction.creatNew(TABLE_ID,TIME,CONTENT);
			createLogTransaction.onSuccessLisenter(function(data){
				var transaction=Transaction.creatNew();
				transaction.setTransactionId(data);
				transaction.setTableId(TABLE_ID);
				transaction.setContent(CONTENT);
				transaction.setTime(TIME);
				def.resolve(TransactionDataStructure.creatNew(attentionTableAry,transaction));
			});
			createLogTransaction.onErrorLisenter(function(){
				def.reject();
			});
			createLogTransaction.launch();
			return def;
		});
		daylogManager.onChange(function(TRANSACTION_ID,CONTENT,TIME){
			var def=$.Deferred();
			var changeLogTransaction=ChangeLogTransaction.creatNew(TRANSACTION_ID,TIME,CONTENT);
			changeLogTransaction.onSuccessLisenter(function(data){
				if(data == 0){
					def.resolve();
				}
			});
			changeLogTransaction.onErrorLisenter(function(){
				def.reject();
			});
			changeLogTransaction.launch();
			return def;
		});
		daylogManager.onDelete(function(TRANSACTION_ID){
			var def=$.Deferred();
			var deleteLogTransaction=DeleteLogTransaction.creatNew(TRANSACTION_ID);
			deleteLogTransaction.onSuccessLisenter(function(data){
				if(data == 0){
					def.resolve();
				}
			});
			deleteLogTransaction.onErrorLisenter(function(){
				def.reject();
			});
			deleteLogTransaction.launch();
			return def;
		});
	});
	attentionTableInfoManager.launch();

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



























