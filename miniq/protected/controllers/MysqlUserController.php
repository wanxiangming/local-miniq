<?php
	include_once("protected/models/database/MiniqDB.php");

	class MysqlUserController extends Controller{
		
		public function actionLoginCheck(){
			$openId=$_GET['openId'];

			$miniqDB=new MiniqDB();
			if($miniqDB->isUserExist($openId)){
				$userInfo=$miniqDB->getUserInfo($openId);
				$result=array();
				$result['id']=$userInfo->getUserId();
				$result['nickName']=$userInfo->getUserName();
				$result['openId']=$userInfo->getOpenId();
				$result['email']=$userInfo->getEmail();
				$result['registerTime']=$userInfo->getRegisterTime();
				print_r(json_encode($result));
			}
			else{
				$miniqDB->insertUser($openId);
				print_r(300);	//如果该用户是第一次注册，则向前端发送300
			}
		}

		public function actionChangeNickName(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			$nickName=$obj->nickName;
			$openId=$obj->openId;

			$miniqDB=new MiniqDB();
			$miniqDB->changeUserName($openId,$nickName);

			print_r(0);
		}

		public function actionAlterUserInfo(){
			$openId=Yii::app()->request->cookies['openId']->value;
			$json=file_get_contents("php://input");
			$obj=json_decode($json);

			$miniqDB=new MiniqDB();
			$miniqDB->changeUserName($openId,$obj->nickName);

			print_r(0);
		}
	}
