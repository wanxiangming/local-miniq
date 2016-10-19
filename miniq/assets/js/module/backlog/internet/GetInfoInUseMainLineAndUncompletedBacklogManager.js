
/**
 * GetInfoInUseMainLineAndUncompletedBacklogManager()
 * 		launch()
 * 		isMainLineExist()
 * 		getMainLineId()
 * 		getMainLineContent()
 * 		getBacklogAry()
 * 		onQuestError(CALL_BACK())
 * 		onQuestSuccess(CALL_BACK())
 */
var GetInfoInUseMainLineAndUncompletedBacklogManager={
	creatNew:function(){
		var GetInfoInUseMainLineAndUncompletedBacklogManager={};

		var isMainLineExist=false;
		var mainLineId=0;	//当backlog不是任何主线的任务，那么它才会是0，但此时isMaingLine数据段也是0
		var mainLineContent="";
		var backlogAry=[];
		var e_questSuccess=function(){};
		var e_questError=function(){};

		GetInfoInUseMainLineAndUncompletedBacklogManager.launch=function(){
			var getInfoInUseMainLineAndUncompletedBacklog=GetInfoInUseMainLineAndUncompletedBacklog.creatNew();
			getInfoInUseMainLineAndUncompletedBacklog.onSuccessLisenter(function(data){
				var mId=data['mainLine'].id;	//如果服务器没有查询到相关数据，则返回的数组是空数组
				if(typeof(mId) != "undefined"){
					isMainLineExist=true;
					mainLineId=Number(mId);
					mainLineContent=data['mainLine'].content;
					$.each(data['backlogAry'],function(index, el) {
						var backlog=Backlog.creatNew();
						backlog.setId(el.id);
						backlog.setContent(el.content);
						backlog.setIsRecent(transformNumToBoolean(el.isRecent));
						if(transformNumToBoolean(el.isMainLine)){
							backlog.setIsMainLine((Number(el.mainLineId)==mainLineId ? true:false));
						}
						else{
							backlog.setIsMainLine(false);
						}
						backlogAry.push(backlog);
					});
				}
				e_questSuccess();
			});
			getInfoInUseMainLineAndUncompletedBacklog.onErrorLisenter(function(){
				e_questError();
			});
			getInfoInUseMainLineAndUncompletedBacklog.launch();
		}

		function transformNumToBoolean(NUM){
			return NUM==1 ? true:false;
		}

		GetInfoInUseMainLineAndUncompletedBacklogManager.onQuestSuccess=function(CALL_BACK){
			e_questSuccess=CALL_BACK;
		}

		GetInfoInUseMainLineAndUncompletedBacklogManager.onQuestError=function(CALL_BACK){
			e_questError=CALL_BACK;
		}

		GetInfoInUseMainLineAndUncompletedBacklogManager.getMainLineId=function(){
			return mainLineId;
		}

		GetInfoInUseMainLineAndUncompletedBacklogManager.getMainLineContent=function(){
			return mainLineContent;
		}

		GetInfoInUseMainLineAndUncompletedBacklogManager.isMainLineExist=function(){
			return isMainLineExist;
		}

		GetInfoInUseMainLineAndUncompletedBacklogManager.getBacklogAry=function(){
			return backlogAry;
		}


		return GetInfoInUseMainLineAndUncompletedBacklogManager;
	}
}
