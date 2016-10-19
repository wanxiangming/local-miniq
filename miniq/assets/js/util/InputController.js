

/**
 * InputController(input,maxLength)
 * 		onChange(CALL_BACK())
 * 		verify()	验证输入框中的内容是否符合长度要求.......，符合返回true，不符合返回false
 * 		setContent()	设置输入框内容
 * 		getContent()	
 * 		getRemainLength()	获取输入框合法输入内容所剩长度
 * 		empty()		清空输入框内容
 */
var InputController={
	creatNew:function(INPUT,MAX_LENGTH){
		var InputController={};

		var input=INPUT;
		var CONTENT_LENGTH_MAX=MAX_LENGTH;
		var CONTENT_LENGTH_MIN=1;
		var e_change=function(CONTENT,REMAIN_LENGTH){};
		(function(){
			input.bind("input propertychange",function(){
				e_change(getContent(),getRemainLength());
			});
		})();

		InputController.getRemainLength=function(){
			return getRemainLength();
		}

		function getRemainLength(){
			return CONTENT_LENGTH_MAX-getLength();
		}

		InputController.verify=function(){
			return thisVerify();
		}

		function thisVerify(){
			if(CONTENT_LENGTH_MIN<=getLength() && getLength()<=CONTENT_LENGTH_MAX){
				return true;
			}
			else{
				return false;
			}
		}

		function getLength(){
			return Number(getContent().length);
		}

		InputController.getContent=function(){
			return getContent();
		}

		function getContent(){
			return input.val();
		}

		InputController.onChange=function(CALL_BACK){
			e_change=CALL_BACK;
		}

		InputController.setContent=function(CONTENT){
			input.val(CONTENT);
		}

		InputController.empty=function(){
			input.val("");
		}

		return InputController;
	}
}

var BacklogContentInputController={
	creatNew:function(INPUT){
		var BacklogContentInputController=InputController.creatNew(INPUT);
		return BacklogContentInputController;
	}
}


/**
 * NameInputController()
 */
var NameInputController={
	creatNew:function(INPUT){
		var NameInputController=InputController.creatNew(INPUT);

		var CONTENT_LENGTH_MAX=12;
		var CONTENT_LENGTH_MIN=1;

		NameInputController.verify=function(){
			return thisVerify();
		}

		function thisVerify(){
			if(CONTENT_LENGTH_MIN<=getLength() && getLength()<=CONTENT_LENGTH_MAX){
				return true;
			}
			else{
				return false;
			}
		}

		function getLength(){
			return Number(getContent().length);
		}

		function getContent(){
			return INPUT.val();
		}

		return NameInputController;
	}
}