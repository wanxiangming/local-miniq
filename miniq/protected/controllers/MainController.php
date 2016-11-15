<?php
	include_once("protected/controllers/my-controller/MiniqController.php");
	// include_once("protected/models/database/MiniqDB.php");
	include_once("protected/models/util/Cookie.php");

	class MainController extends MiniqController{
		public $defaultAction = 'Main';
		
		public function actionMain(){
			$cookie=new Cookie();
			$openId=$cookie->getAccount();
			$attentionTableAry=array();
			$inheritTableLinkAry=array();
			// $miniqDB=new MiniqDB();
			$tableIdAry=array();
			$tableFacade=new TableFacade($openId);
			foreach ($tableFacade->getAllAssociationTable($openId) as $key => $value) {
				$attentionTable=array();
				$attentionTable['tableId']=$value->getTableId();
				$attentionTable['tableName']=$value->getTableName();
				$attentionTable['isManager']=true;
				$tableIdAry[]=$value->getTableId();

				$inheritTableLink=$tableFacade->getEntranceChain($value->getTableId());
				$inheritTableLinkAry[]=$inheritTableLink;

				$inheritTableAry=array();
				foreach ($tableFacade->getAllTopTable($value->getTableId()) as $key => $val) {
					$inheritTable=array();
					$inheritTable['tableId']=$val->getTableId();
					$inheritTable['tableName']=$val->getTableName();
					$inheritTableAry[]=$inheritTable;
					$tableIdAry[]=$val->getTableId();
				}
				$attentionTable['inheritTableAry']=$inheritTableAry;
				$attentionTableAry[]=$attentionTable;
			}

			$facHistoryTransaction=new FACHistoryTransaction($tableIdAry,20);
			$historyCountOfTransaction=$facHistoryTransaction->count();

			$this->render('Main',array('attentionTableAry'=>$attentionTableAry,'historyCountOfTransaction'=>$historyCountOfTransaction,'tableInheritLinkAry'=>$inheritTableLinkAry));
		}
	}