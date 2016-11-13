<?php
	include_once("protected/models/util/TableUser.php");
	include_once("protected/models/util/Cookie.php");
	include_once("protected/controllers/my-controller/MiniqController.php");

	class UserController extends MiniqController{

		public function actionAccountSetting(){
			$cookie=new Cookie();
			$openId=$cookie->getAccount();
			$mysqlUser=new TableUser($openId);
			$userInfoAry=$mysqlUser->getUserInfo();
			$this->render('AccountSetting',array('userInfoAry'=>$userInfoAry));
		}

		public function actionPasonalMassage(){
			$cookie=new Cookie();
		}
	}
