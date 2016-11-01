<?php
	include_once("protected/models/database/MiniqDB.php");

	class MainController extends Controller{
		public $defaultAction = 'Main';
		public function actionMain(){
			$openId=Yii::app()->request->cookies['openId']->value;
			$attentionTableAry=array();
			$inheritTableLinkAry=array();
			$miniqDB=new MiniqDB();
			$tableIdAry=array();
			foreach ($miniqDB->getAttentionTableAry($openId) as $key => $value) {
				$attentionTable=array();
				$attentionTable['tableId']=$value->getTableId();
				$attentionTable['tableName']=$value->getTableName();
				$attentionTable['isManager']=$value->isManager();
				$tableIdAry[]=$value->getTableId();

				$inheritTableLink=$miniqDB->getInheritLink($value->getTableId());
				$inheritTableLinkAry[]=$inheritTableLink;

				$inheritTableAry=array();
				foreach ($value->getInheritTableAry() as $key => $val) {
					$inheritTable=array();
					$inheritTable['tableId']=$val->getTableId();
					$inheritTable['tableName']=$val->getTableName();
					$inheritTableAry[]=$inheritTable;
					$tableIdAry[]=$val->getTableId();
				}
				$attentionTable['inheritTableAry']=$inheritTableAry;
				$attentionTableAry[]=$attentionTable;
			}

			$historyCountOfTransaction=$miniqDB->getHistoryCountOfTransaction($tableIdAry);

			$this->render('Main',array('attentionTableAry'=>$attentionTableAry,'historyCountOfTransaction'=>$historyCountOfTransaction,'tableInheritLinkAry'=>$inheritTableLinkAry));
		}
	}