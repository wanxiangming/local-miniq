
var Internet={
	creatNew:function(URL,TYPE,DATA){
		var Internet={};

		var internetDataType="json";
		var internetAsync=true;
		var internetType=TYPE.toUpperCase();
		var internetData=internetType=="GET" ? DATA : JSON.stringify(DATA);
		var internetUrl=URL;
		var successCallBackFunction=function(data){return false};
		var errorCallBackFunction=function(XMLHttpRequest, textStatus, errorThrown){return false};

		Internet.launch=function(){
			$.ajax({
				url:internetUrl,
				dataType:internetDataType,
				async:internetAsync,
				data:internetData,
				type:internetType,
				
				success:function(data){
					successCallBackFunction(data);
				},

				error:function(XMLHttpRequest, textStatus, errorThrown){
					errorCallBackFunction(XMLHttpRequest,textStatus,errorThrown);
				}
			});
		}

		Internet.onSuccessLisenter=function(CALL_BACK_SUCCESS){
			successCallBackFunction=CALL_BACK_SUCCESS;
		}

		Internet.onErrorLisenter=function(CALL_BACK_SUCCESS){
			errorCallBackFunction=CALL_BACK_SUCCESS;
		}

		return Internet;
	}
}

var LoginCheck={
	creatNew:function(OPEN_ID){
		var LoginCheck=Internet.creatNew(LOGIN_CHECK,"GET",{"openId":OPEN_ID});
		return LoginCheck;
	}
}

var SetCookie={
	creatNew:function(OPEN_ID){
		var SetCookie=Internet.creatNew(SET_COOKIE,"GET",{"openId":OPEN_ID});
		return SetCookie;
	}
}

var DelCookie={
	creatNew:function(OPEN_ID){
		var DelCookie=Internet.creatNew(DEL_COOKIE,"GET",{});
		return DelCookie;
	}
}

var CheckCookie={
	creatNew:function(){
		var CheckCookie=Internet.creatNew(CHECK_COOKIE,"GET",{});
		return CheckCookie;
	}
}

var ChangeNickName={
	creatNew:function(OPEN_ID,NICK_NAME){
		var ChangeNickName=Internet.creatNew(CHANGE_NICK_NAME,"POST",{"openId":OPEN_ID,"nickName":NICK_NAME});
		return ChangeNickName;
	}
}

var AlterUserInfo={
	creatNew:function(NICK_NAME){
		var AlterUserInfo=Internet.creatNew(ALTER_USER_INFO,"POST",{"nickName":NICK_NAME});
		return AlterUserInfo;
	}
}

var GetLogTableList={
	creatNew:function(){
		var GetLogTableList=Internet.creatNew(GET_LOG_TABLE_LIST,"GET",{});
		return GetLogTableList;
	}
}

var GetAttentionTableInfo={
	creatNew:function(){
		var GetAttentionTableInfo=Internet.creatNew(GET_ATTENTION_TBABLE_INFO,"GET",{});
		return GetAttentionTableInfo;
	}
}

var GetFollowerList={
	creatNew:function(TABLE_ID){
		var GetFollowerList=Internet.creatNew(GET_FOLLOWER_LIST,"GET",{"tableId":TABLE_ID});
		return GetFollowerList;
	}
}

var GetTableInfo={
	creatNew:function(TABLE_ID){
		var GetTableInfo=Internet.creatNew(GET_TABLE_INFO,"GET",{"tableId":TABLE_ID});
		return GetTableInfo;
	}
}

var GetTransactionByTimeAry={
	creatNew:function(TIMEARY){
		var GetTransactionByTimeAry=Internet.creatNew(GET_TRANSACTION_BY_TIMEARY,"POST",{"time":TIMEARY});
		return GetTransactionByTimeAry;
	}
}

var GetTransaction={
	creatNew:function(TABLE_ID_ARY){
		var GetTransaction=Internet.creatNew(GET_TRANSACTION,"POST",{"tableIdAry":TABLE_ID_ARY});
		return GetTransaction;
	}
}

var GetHistoryTransaction={
	creatNew:function(TABLE_ID_ARY,PAGE){
		var GetHistoryTransaction=Internet.creatNew(GET_HISTORY_TRANSACTION,"POST",{"tableIdAry":TABLE_ID_ARY,"page":PAGE});
		return GetHistoryTransaction;
	}
}

var CreateTransaction={
	creatNew:function(TABLE_ID,TIME,CONTENT){
		var CreateTransaction=Internet.creatNew(CREATE_LOG_TRANSACTION,"POST",{"tableId":TABLE_ID,"time":TIME,"content":CONTENT});
		return CreateTransaction;
	}
}

var ChangeLogTransaction={
	creatNew:function(LOG_TRANSACTION_ID,TIME,CONTENT){
		var ChangeLogTransaction=Internet.creatNew(CHANGE_LOG_TRANSACTION,"POST",{"transactionId":LOG_TRANSACTION_ID,"time":TIME,"content":CONTENT});
		return ChangeLogTransaction;
	}
}

var DeleteTransaction={
	creatNew:function(LOG_TRANSACTION_ID){
		var DeleteTransaction=Internet.creatNew(DELETE_LOG_TRANSACTION,"GET",{"logTransactionId":LOG_TRANSACTION_ID});
		return DeleteTransaction;
	}
}

var BatchAddTransaction={
	creatNew:function(TRANSACTION_ARY){
		var BatchAddTransaction=Internet.creatNew(BATCH_ADD_TRANSACTION,"POST",{"transactionAry":TRANSACTION_ARY});
		return BatchAddTransaction;
	}
}

var SearchTableByTableId={
	creatNew:function(TABLE_ID){
		var SearchTableByTableId=Internet.creatNew(SEARCH_TABLE_BY_TABLE_ID,"GET",{"tableId":TABLE_ID});
		return SearchTableByTableId;
	}
}

var CreateLogTable={
	creatNew:function(LOG_TABLE_NAME){
		var CreateLogTable=Internet.creatNew(CREATE_LOG_TABLE,"POST",{"logTableName":LOG_TABLE_NAME});
		return CreateLogTable;
	}
}

var ChangeTableName={
	creatNew:function(TABLE_ID,NICK_NAME){
		var ChangeTableName=Internet.creatNew(CHANGE_TABLE_NAME,"POST",{"tableId":TABLE_ID,"nickName":NICK_NAME});
		return ChangeTableName;
	}
}

var DeprecatedTable={
	creatNew:function(TABLE_ID){
		var DeprecatedTable=Internet.creatNew(DEPRECATED_TABLE,"GET",{"tableId":TABLE_ID});
		return DeprecatedTable;
	}
}

var CancelAttention={
	creatNew:function(TABLE_ID){
		var CancelAttention=Internet.creatNew(CANCEL_ATTENTION,"GET",{"tableId":TABLE_ID});
		return CancelAttention;
	}
}

var PayAttentionToLogTable={
	creatNew:function(TABLE_ID){
		var PayAttentionToLogTable=Internet.creatNew(PAY_ATTENTION_TO_TABLE,"GET",{"tableId":TABLE_ID});
		return PayAttentionToLogTable;
	}
}

var OpenTheTable={
	creatNew:function(TABLE_ID){
		var OpenTheTable=Internet.creatNew(OPEN_THE_TABLE,"GET",{"tableId":TABLE_ID});
		return OpenTheTable;
	}
}

var Inherit={
	creatNew:function(TABLE_ID,PARENT_TABLE_ID){
		var Inherit=Internet.creatNew(INHERIT,"GET",{"tableId":TABLE_ID,"parentTableId":PARENT_TABLE_ID});
		return Inherit;
	}
}

var RelieveInherit={
	creatNew:function(TABLE_ID,PARENT_TABLE_ID){
		var RelieveInherit=Internet.creatNew(RELIEVE_INHERIT,"GET",{"tableId":TABLE_ID,"parentTableId":PARENT_TABLE_ID});
		return RelieveInherit;
	}
}

var AddManager={
	creatNew:function(FOLLOWER_ID,TABLE_ID){
		var AddManager=Internet.creatNew(ADD_MANAGER,"GET",{"tableId":TABLE_ID,"followerId":FOLLOWER_ID});
		return AddManager;
	}
}

var RepealManager={
	creatNew:function(FOLLOWER_ID,TABLE_ID){
		var RepealManager=Internet.creatNew(REPEAL_MANAGER,"GET",{"tableId":TABLE_ID,"followerId":FOLLOWER_ID});
		return RepealManager;
	}
}

