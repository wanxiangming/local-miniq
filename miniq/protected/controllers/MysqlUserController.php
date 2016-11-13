<?php
	include_once("protected/models/util/Cookie.php");


	class MysqlUserController extends Controller{
		
		//没有用户新建用户 并建立cookie
		public function actionLoginCheck(){
			$openId=$_GET['openId'];

			$userFacade=new UserFacade();
			$userInfo=$userFacade->getUserInfo($openId);
			if($userInfo == NULL){
				if($userFacade->createNewUser($openId) > 0){
					$cookie=new Cookie();
					$cookie->setAccount($openId);
					print_r(300);
				}
			}
			else{
				$result=array();
				$result['id']=$userInfo->getUserId();
				$result['nickName']=$userInfo->getUserName();
				$result['openId']=$userInfo->getOpenId();
				$result['email']=$userInfo->getEmail();
				$result['registerTime']=$userInfo->getRegisterTime();
				print_r(json_encode($result));

				$cookie=new Cookie();
				$cookie->setAccount($openId);
			}

		}

		public function actionChangeNickName(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			$nickName=$obj->nickName;
			$openId=$obj->openId;

			$userFacade=new UserFacade();
			$userFacade->changeUserName($openId,$nickName);

			print_r(0);
		}

		public function actionAlterUserInfo(){
			$cookie=new Cookie();
			$openId=$cookie->getAccount();
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			
			$userFacade=new UserFacade();
			$userFacade->changeUserName($openId,$obj->nickName);

			print_r(0);
		}
	}
