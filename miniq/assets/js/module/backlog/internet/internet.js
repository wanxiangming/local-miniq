

//---------------------------------------------------与待办事项相关--------------------------------------------------------
//弃用
//
//
//
var AddMainLine={
	creatNew:function(CONTENT){
		var AddMainLine=Internet.creatNew(ADD_MAIN_LINE,"POST",{"content":CONTENT});
		return AddMainLine;
	}
}

var GetInfoInUseMainLineAndUncompletedBacklog={
	creatNew:function(){
		var GetInfoInUseMainLineAndUncompletedBacklog=Internet.creatNew(GET_INFO_IN_USE_MAIN_LINE_AND_UNCOMPLETED_BACKLOG,"GET",{});
		return GetInfoInUseMainLineAndUncompletedBacklog;
	}
}

var AddBacklog={
	creatNew:function(IN_USE_MIAN_LINE_ID,CONTENT,IS_MIAN_LINE,IS_RECENT){
		var AddBacklog=Internet.creatNew(ADD_BACKLOG,"POST",{"inUseMainLineId":IN_USE_MIAN_LINE_ID,"content":CONTENT,"isMainLine":IS_MIAN_LINE,"isRecent":IS_RECENT});
		return AddBacklog;
	}
}

var RemoveBacklog={
	creatNew:function(BACKLOG_ID){
		var RemoveBacklog=Internet.creatNew(REMOVE_BACKLOG,"GET",{"backlogId":BACKLOG_ID});
		return RemoveBacklog;
	}
}

var ChangeBacklog={
	creatNew:function(IN_USE_MIAN_LINE_ID,BACKLOG_ID,CONTENT,IS_MIAN_LINE,IS_RECENT){
		var ChangeBacklog=Internet.creatNew(CHANGE_BACKLOG,"POST",{"inUseMainLineId":IN_USE_MIAN_LINE_ID,"backlogId":BACKLOG_ID,"content":CONTENT,"isMainLine":IS_MIAN_LINE,"isRecent":IS_RECENT});
		return ChangeBacklog;
	}
}

var CompleteBacklog={
	creatNew:function(BACKLOG_ID){
		var CompleteBacklog=Internet.creatNew(COMPLETE_BACKLOG,"GET",{"backlogId":BACKLOG_ID});
		return CompleteBacklog;
	}
}
