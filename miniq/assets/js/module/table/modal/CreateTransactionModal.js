minclude("MDate");
minclude("InputController");
/**
 * 它的table选择列表在获取服务器数据的时候初始化
 * 
 * CreateTransactionModal()
 * 		bindModal(button)
 * 		initBeforeShow(beginTimeOfToday)
 * 		onModalhide()
 * 		onCreate(CALL_BACK(tableId,content,time))	//当transaction被创建时，你可以做一些事情，返回Deferred对象
 * 		show()
 * 		hide()
 */
var CreateTransactionModal={
	creatNew:function(){
		var CreateTransactionModal={};

		var createTransactionModal=$("#create_log_transaction_modal");
		var createTransactionModalTableSelect=$("#create_log_modal_tableSelect");
		var createTransactionModalHourUpBtn=$("#create_log_modal_hour_up_btn");
		var createTransactionModalHourDownBtn=$("#create_log_modal_hour_down_btn");
		var createTransactionModalMinuteUpBtn=$("#create_log_modal_minute_up_btn");
		var createTransactionModalMinuteDownBtn=$("#create_log_modal_minute_down_btn");
		var createTransactionModalHour=$("#create_log_modal_hour");
		var createTransactionModalMinute=$("#create_log_modal_minute");
		var createTransactionModalContentTextarea=$("#create_log_modal_content_input");
		var createTransactionModalContentLength=$("#transaction_create_input_length");
		var createTransactionModalCreateBtn=$("#create_log_modal_create_btn");
		var contentRow=$("#create_transaction_content_row");
		var inputController=InputController.creatNew(createTransactionModalContentTextarea,1000);

		var e_create=function(TABLE_ID,CONTENT,TIME){return $.Deferred();};
		var e_onModalHide=function(){};

		(function(){
			inputController.onChange(function(){
				setContentTextareaLengthHtml(inputController.getRemainLength());
				if(inputController.verify()){
					contentOk();
				}
				else{
					contentError();
				}
			});

			createTransactionModal.on("hidden.bs.modal",function(e){
				inputController.empty();
				e_onModalHide();
			});
		})();

		function contentOk(){
			contentRow.removeClass('has-error');
		}

		function contentError(){
			contentRow.addClass('has-error');
		}

		function setContentTextareaLengthHtml(REMAIN_LENGTH){
			createTransactionModalContentLength.html(REMAIN_LENGTH+"字");
		}


		CreateTransactionModal.initBeforeShow=function(BEGINNING_TIME_OF_TODAY){
			createTransactionModalCreateBtn.unbind().bind("click",function(){	//when the modal open,it will to alter action of create button
				var tableId=createTransactionModalTableSelect.val();
				var content=createTransactionModalContentTextarea.val();
				var hour=createTransactionModalHour.html();
				var minute=createTransactionModalMinute.html();
				var mDate=MDate.creatNew(BEGINNING_TIME_OF_TODAY);
				mDate.setHours(hour);
				mDate.setMinutes(minute);
				var transactionTime=mDate.getTime();

				if(inputController.verify()){
					var def=e_create(tableId,content,transactionTime);
					def.done(function(){
						closeModal();
					});
				}
				else{
					//do nothing if varification failed 
				}
			});
		}

		CreateTransactionModal.onModalhide=function(CALL_BACK){
			e_onModalHide=CALL_BACK;
		}

		CreateTransactionModal.hide=function(){
			closeModal();
		}

		function closeModal(){
			createTransactionModal.modal('hide');
		}

		CreateTransactionModal.show=function(){
			openModal();
		}

		function openModal(){
			createTransactionModal.modal('show');
		}

		CreateTransactionModal.onCreate=function(CALL_BACK){
			e_create=CALL_BACK;
		}

		CreateTransactionModal.bindModal=function(BUTTON){
			BUTTON.attr("data-toggle","modal");
			BUTTON.attr("data-target","#create_log_transaction_modal");
		}

		return CreateTransactionModal;
	}
}
