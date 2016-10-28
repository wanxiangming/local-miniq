<?php
	include_once("protected/models/database/MiniqDB.php");

	class MainController extends Controller{
		public $defaultAction = 'Main';
		public function actionMain(){
			// $criteria=new CDbCriteria();
			// $criteria->order=
			// $criteria->condition='tableId=:tableId';
			// $criteria->params=array(':tableId'=>1040);
			// $count=MysqlTransaction::model()->count($criteria);
			// $pages=new CPagination($count);
			// $pages->pageSize=3;
			// // $pages->CurrentPage=2;
			// $pages->applyLimit($criteria);
			// $categoryInfo=MysqlTransaction::model()->findAll($criteria);
			// foreach ($categoryInfo as $key => $value) {
			// 	print_r($value->content);
			// }
			//$attentionTableInfo=Yii::app()->runController('MysqlTable/GetAttentonTableInfo');
			//print_r(json_encode($attentionTableInfo));
			

			$openId=Yii::app()->request->cookies['openId']->value;
			$attentionTableAry=array();
			$miniqDB=new MiniqDB();
			foreach ($miniqDB->getAttentionTableAry($openId) as $key => $value) {
				$attentionTable=array();
				$attentionTable['tableId']=$value->getTableId();
				$attentionTable['tableName']=$value->getTableName();
				$attentionTable['isManager']=$value->isManager();

				$inheritTableAry=array();
				foreach ($value->getInheritTableAry() as $key => $value) {
					$inheritTable=array();
					$inheritTable['tableId']=$value->getTableId();
					$inheritTable['tableName']=$value->getTableName();
					$inheritTableAry[]=$inheritTable;
				}
				$attentionTable['inheritTableAry']=$inheritTableAry;
				$attentionTableAry[]=$attentionTable;
			}

			$this->render('Main',array('attentionTableAry'=>$attentionTableAry));
		}
	}