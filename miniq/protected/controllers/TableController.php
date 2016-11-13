<?php
	include_once("protected/controllers/my-controller/MiniqController.php");
	
	class TableController extends MiniqController{
		
		public function actionTableInfo(){
			$this->render('TableInfo');
		}

		public function actionTableManage(){
			$this->render('TableManage');
		}
	}