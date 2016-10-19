minclude("MDate");
/**
 * ChangeTransactionModal()
 * 		bindModal(BUTTON)
 * 		initBeforeShow(time,content,tableName)
 * 		onChange(CALL_BACK(content,time))
 * 		onDelete(CALL_BACK())
 * 		show()
 *   	hide()
 */
var ChangeTransactionModal={
	creatNew:function(){
		var ChangeTransactionModal={};

		var changeTransactionModal=$("#change_log_transaction_modal");
		var changeTransactionModalTableName=$("#change_log_transaction_modal_tableName");
		var changeTransactionModalHour=$("#change_log_modal_hour");
		var changeTransactionModalMinute=$("#change_log_modal_minute");
		var changeTransactionModalContentTextarea=$("#change_log_modal_content_input");
		var changeTransactionModalChangeBtn=$("#change_log_modal_change_btn");
		var changeTransactionModalDeleteBtn=$("#change_log_modal_delete_btn");
		var changeTransactionModalDeleteCheckModalConfirmBtn=$("#checkAction_btn");
		var changeTransactionModalActionConfirmModal=$("#checkAction_Modal");
		var contentRow=$("#change_transaction_content_row");
		var changeTransactionModalContentLength=$("#transaction_change_input_length");
		var inputController=InputController.creatNew(changeTransactionModalContentTextarea,1000);
		var mDate;
		var content;

		var e_change=function(CONTENT,TIME){return $.Deferred();};
		var e_delete=function(){return $.Deferred();};
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

			changeTransactionModal.on("hidden.bs.modal",function(e){
				inputController.empty();
			});
		})();

		function contentOk(){
			contentRow.removeClass('has-error');
		}

		function contentError(){
			contentRow.addClass('has-error');
		}

		ChangeTransactionModal.initBeforeShow=function(TIME,CONTENT,TABLE_NAME){
			mDate=MDate.creatNew(TIME);
			content=CONTENT;
			changeTransactionModalHour.html(mDate.getHours());
			changeTransactionModalMinute.html(mDate.getMinutes());
			changeTransactionModalTableName.val(TABLE_NAME);
			inputController.setContent(content);
			setContentTextareaLengthHtml(inputController.getRemainLength());

			changeTransactionModalChangeBtn.unbind().bind('click',function(){
				mDate.setHours(changeTransactionModalHour.html());
				mDate.setMinutes(changeTransactionModalMinute.html());
				if(inputController.verify()){
					e_change(inputController.getContent(),mDate.getTime());
				}
				else{
					// do nothing if varification failed
				}
			});

			changeTransactionModalDeleteCheckModalConfirmBtn.unbind().bind('click',function(){
				var def=e_delete();
				def.done(function(){
					changeTransactionModalActionConfirmModal.modal("hide");
				});
			});
		}

		function setContentTextareaLengthHtml(REMAIN_LENGTH){
			changeTransactionModalContentLength.html(REMAIN_LENGTH+"字");
		}

		ChangeTransactionModal.bindModal=function(BUTTON){
			BUTTON.attr("data-toggle","modal");
			BUTTON.attr("data-target","#change_log_transaction_modal");
		}

		ChangeTransactionModal.onChange=function(CALL_BACK){
			e_change=CALL_BACK;
		}

		ChangeTransactionModal.onDelete=function(CALL_BACK){
			e_delete=CALL_BACK;
		}

		ChangeTransactionModal.show=function(){
			changeTransactionModal.modal("show");
		}

		ChangeTransactionModal.hide=function(){
			changeTransactionModal.modal("hide");
		}

		return ChangeTransactionModal;
	}
}
