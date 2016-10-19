<?php
	
	class MainController extends Controller{
		public $defaultAction = 'Main';
		public function actionMain(){
			$this->render('Main');
		}
		
		public function actionBatchAdd(){
			$this->render('BatchAdd');
		}
		
		public function actionScheduleManager(){
			$this->render('ScheduleManager');
		}
	}