<?php
	include_once("protected/models/util/TableTransaction.php");
	include_once("protected/models/util/TableLink.php");
	include_once("protected/models/util/TableTable.php");

	class MysqlTransactionController extends Controller{

		public function actionGetTransactionByTimeAry(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			$openId=Yii::app()->request->cookies['openId']->value;

			$intervalDay=1;
			$tableAry=array();
			$tableResult=$this->getTableInfo($openId);
			$tableTransaction=new TableTransaction();
			
			if($tableResult != NULL){
				foreach ($tableResult as $tableKey => $tableValue) {
					$transactionAry=array();
					foreach ($obj->time as $timeKey => $timeValue) {
						$transactionResult=$tableTransaction->getInfoByTableIdAndTime($tableValue['tableId'],$timeValue,$intervalDay);
						if($transactionResult != NULL){
							$transactionAry[]=$transactionResult;
						}
					}
					$tableValue['transactionInfo']=$transactionAry;
					$tableAry[]=$tableValue;
				}
				print_r(json_encode($tableAry));
			}
			else{
				print_r(0);	//该用户tableLink没有记录
			}
			
		}

		private function getTableInfo($openId){
			$ary=array();
			$tableLink=new TableLink();
			$linkResult=$tableLink->getAllByUserId($openId);
			if($linkResult != NULL){
				$tableTable=new TableTable();
				foreach ($linkResult as $key => $value) {
					$tableId=$value['tableId'];
					$tableResult=$tableTable->getById($tableId);
					if($tableResult != NULL){
						$value['creatorId']=$tableResult['creatorId'];
						$value['tableState']=$tableResult['tableState'];
					}
					$ary[]=$value;
				}
				return $ary;
			}
			else{
				return NULL;	//该用户没有关注任何日志时返回NULL
			}
		}

		/**
		 * 根据用户ID，找到他所关注的表，然后找到该表的所有父表，从这些表中取出对应时段的信息，组合成数据返回给客户端
		 *  {
  			"userId": "67EB8F9DA303F184014F9268D8294156", 
  			"tableId": "1024", 
   			"anotherName": "自动化2013级", 
  			"creatorId": "67EB8F9DA303F184014F9268D8294156", 
   			"tableState": "1", 
   			"transactionInfo": [
  			    [
    			    {
   			       		"id": "60", 
    			      	"content": "华宇（大连）信息服务有限公司
									宣讲时间：14:00
									宣讲地点：大学生活动中心207宣讲厅
									招聘需求：软件工程师、需求工程师、需求分析师、测试工程师
									专业需求：计算机、信息管理与信息系统、法学等相关专业
								", 
    			      	"time": "1475992800000"
    			    }
    			  ]
    			]
 			}
		 * @return [type] [description]
		 */
		public function actionGetTransaction(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			$openId=Yii::app()->request->cookies['openId']->value;


		}

		public function actionAddTransaction(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);

			$tableTransaction=new TableTransaction();
			print_r($tableTransaction->insertOneData($obj->tableId,$obj->time,$obj->content));
		}

		public function actionChangeTransaction(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);

			$tableTransaction=new TableTransaction();
			$tableTransaction->changeOneData($obj->transactionId,$obj->time,$obj->content);
			print_r(0);
		}

		public function actionDeleteTransaction(){
			$logTransactionId=$_GET['logTransactionId'];

			$tableTransaction=new TableTransaction();
			$tableTransaction->deleteOneData($logTransactionId);
			print_r(0);
		}
	}












