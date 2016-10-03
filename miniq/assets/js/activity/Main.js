
openId="";
accessToken="";


$(document).ready(function(){
	var paras={};
	var nickNameDiv=$("#nickName");
	var logOutBtn=$("#logoutBtn");

	$("[data-toggle='popover']").popover();
	$('[data-toggle="tooltip"]').tooltip();

	logOutBtn.click(function(){
		var delCookie=DelCookie.creatNew();
		delCookie.onSuccessLisenter(function(){
			QC.Login.signOut();
			window.location.href="?r=Login/Login";
		});
		delCookie.launch();
	});

	// if(QC.Login.check()){
	// 	QC.Login.getMe(function(OPENG_ID,ACCESS_TOKEN){
	// 		openId=OPENG_ID;
	// 		accessToken=ACCESS_TOKEN;

	// 		QC.api("get_user_info",paras).success(function(s){
	// 			var nickName=s.data.nickname;

	// 			var loginCheck=LoginCheck.creatNew(openId);
	// 			loginCheck.onSuccessLisenter(function(data){
	// 				if(data == 300){	//用户首次注册的返回值
	// 					var changeNickName=ChangeNickName.creatNew(OPENG_ID,nickName);
	// 					changeNickName.onSuccessLisenter(function(data){});
	// 					changeNickName.launch();
	// 				}
	// 				else{	//用户已经注册过的返回值
						
	// 				}
	// 				nickNameDiv.attr("data-original-title",nickName);
	// 				host();	//非常重要！！我们是从这里开始调用各个页面自己的js内容的
	// 			});
	// 			loginCheck.launch();
	// 		});
			
	// 	});
	// }
	// else{
	// 	window.location.href="?r=Login/Login";
	// }

	var checkCookie=CheckCookie.creatNew();
	checkCookie.onSuccessLisenter(function(data){
		if(data == 1){
			host();
			QC.api("get_user_info",paras).success(function(s){
				var nickName=s.data.nickname;
				nickNameDiv.attr("data-original-title",nickName);
			});
		}
		else{	//这里面是没有cookie的情况
			if(QC.Login.check()){
				QC.Login.getMe(function(OPENG_ID,ACCESS_TOKEN){
					QC.api("get_user_info",paras).success(function(s){
						var nickName=s.data.nickname;
						var loginCheck=LoginCheck.creatNew(OPENG_ID);
						loginCheck.onSuccessLisenter(function(data){
							if(data == 300){	//用户首次注册的返回值
								var changeNickName=ChangeNickName.creatNew(OPENG_ID,nickName);
								changeNickName.onSuccessLisenter(function(data){});
								changeNickName.launch();
							}
							else{	//用户已经注册过的返回值
								
							}
							nickNameDiv.attr("data-original-title",nickName);

							var setCookie=SetCookie.creatNew(OPENG_ID);
							setCookie.onSuccessLisenter(function(data){
								if(data == 1){
									host();	//非常重要！！我们是从这里开始调用各个页面自己的js内容的
								}
							});
							setCookie.launch();
						});
						loginCheck.launch();
					});

				});
			}
			else{
				window.location.href="?r=Login/Login";
			}
		}
	});
	checkCookie.launch();
});


