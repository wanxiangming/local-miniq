<?php
	include_once("protected/models/util/TableTable.php");
	include_once("protected/models/util/TableLink.php");
	include_once("protected/models/util/TableUser.php");
	include_once("protected/models/util/TableTransaction.php");
	include_once("protected/models/util/TableTableInherit.php");

	class MysqlTableController extends Controller{

		public function actionCreateLogTable(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			$creatorId=Yii::app()->request->cookies['openId']->value;

			$tableTable=new TableTable();
			$tableId=$tableTable->insertOneData($creatorId,$obj->logTableName);

			$tableLink=new TableLink();
			$tableLink->insertOneData($creatorId,$tableId,$obj->logTableName);
			print_r(0);		//表示创建成功
		}

		/*
		[
		  {
		    "userId": "67EB8F9DA303F184014F9268D8294156", 
		    "tableId": "100009", 
		    "anotherName": "34070202班", 
		    "creatorId": "67EB8F9DA303F184014F9268D8294156", 
		    "tableState": "1"
		  }
		]
		 */
		public function actionGetLogTableList(){
			$openId=Yii::app()->request->cookies['openId']->value;
			
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
						$value['visibilityState']=$tableResult['visibilityState'];
					}
					$ary[]=$value;
				}
				print_r(json_encode($ary));
			}
			else{
				print_r(0);	//0表示该用户未使用任何日程表
			}
		}

		public function actionChangeLogTableName(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			$openId=Yii::app()->request->cookies['openId']->value;

			$tableTable=new TableTable();
			if($tableTable->changeTableName($obj->tableId,$obj->nickName)){
				$tableLink=new TableLink();
				if($tableLink->changeAnotherName($openId,$obj->tableId,$obj->nickName)){
					print_r(0);	//0表示数据操作成功
				}
				else{
					print_r(1);	//1表示anotherName修改失败
				}
			}
			else{
				print_r(2);	//2表示tableName修改失败
			}
		}

		public function actionChangeLogTableAnotherName(){
			$json=file_get_contents("php://input");
			$obj=json_decode($json);
			$openId=Yii::app()->request->cookies['openId']->value;

			$tableLink=new TableLink();
			if($tableLink->changeAnotherName($openId,$obj->tableId,$obj->nickName)){
				print_r(0);	//0表示数据操作成功
			}
			else{
				print_r(1);	//1表示anotherName修改失败
			}
		}

		public function actionDeprecatedLogTable(){
			$openId=Yii::app()->request->cookies['openId']->value;
			$tableId=$_GET['tableId'];

			$tableTable=new TableTable();
			if($tableTable->changeTableState($tableId)){
				$tableLink=new TableLink();
				if($tableLink->deleteOne($openId,$tableId)){
					print_r(0);	//0表示操作成功
				}
				else{
					print_r(1);	//1表示tablelink数据删除失败
				}
			}
			else{
				print_r(2);//2表示tablestate修改失败
			}
		}

		public function actionCancelAttention(){
			$openId=Yii::app()->request->cookies['openId']->value;
			$tableId=$_GET['tableId'];

			$tableLink=new TableLink();
			if($tableLink->deleteOne($openId,$tableId)){
				print_r(0);	//0表示操作成功
			}
			else{
				print_r(1);	//1表示tablelink数据删除失败
			}
		}

		public function actionPayAttention(){
			$openId=Yii::app()->request->cookies['openId']->value;
			$tableId=$_GET['tableId'];

			$tableTable=new TableTable();
			$tableResult=$tableTable->getById($tableId);
			if($tableResult != NULL){
				$tableLink=new TableLink();
				$tableLink->insertOneData($openId,$tableId,$tableResult['tableName']);
				print_r(1);	//1表示关注成功
			}
			else{
				print_r(0);	//2表示关注失败，不存在该日程表
			}
		}

		public function actionSearchTableByTableId(){
			$tableId=$_GET['tableId'];
			$openId=Yii::app()->request->cookies['openId']->value;

			$tableTable=new TableTable();
			$tableResult=$tableTable->getById($tableId);
			if($tableResult!=NULL && $tableResult['visibilityState']!=0){
				$tableLink=new TableLink();
				if($tableLink->isExist($openId,$tableId)){
					$tableResult['isAttention']=1;	//已关注
				}
				else{
					$tableResult['isAttention']=0;
				}
				
				if($tableResult['creatorId'] == $openId){
					$tableResult['isMine']=1;
				}
				else{
					$tableResult['isMine']=0;
				}
				print_r(json_encode($tableResult));
			}
			else{
				print_r(0);	//没有这张日程表或者该日程表是私有的，都返回0
			}
		}

		public function actionOpenTheTable(){
			$tableId=$_GET['tableId'];

			$tableTable=new TableTable();
			if($tableTable->changeTableVisibilityState($tableId)){
				print_r(0);	//修改成功返回0
			}
			else{
				print_r(1);
			}
		}

		/**
		 * actionInherit()
		 * 添加新的继承关系
		 * @return [int] [添加成功返回1，失败返回0]
		 */
		public function actionInherit(){
			$childTableId=$_GET['childTableId'];
			$parentTableId=$_GET['parentTableId'];

			$tableInherit=new TableTableInherit();
			print_r($tableInherit->add($childTableId,$parentTableId));
		}

		/**
		 * actionRemoveInherit() 
		 * 移除特定一个继承关系
		 * @return [int] [成功返回真，失败返回假]
		 */
		public function actionRemoveInherit(){
			$childTableId=$_GET['childTableId'];
			$parentTableId=$_GET['parentTableId'];

			$tableInherit=new TableTableInherit();
			if($tableInherit->remove($childTableId,$parentTableId)){
				print_r(1);
			}
			else{
				print_r(0);
			}
		}

		/**
		 * actionGetAllParentTableId()
		 * 获取某表继承结构上层的结构链
		 * @return [type] [description]
		 */
		public function actionGetParentInheritLink(){
			$childTableId=$_GET['childTableId'];

			$ary=array();
			$tableInherit=new TableTableInherit();
			$this->getAllParentTableId($tableInherit,$childTableId,$ary);

			print_r(json_encode($ary));
		}

		//
		private function getAllParentTableId($db,$childTableId,&$ary){
			$parentTableIdAry=array();
			$result=$this->getParentTableId($db,$childTableId);
			foreach ($result as $key => $value) {
				$noEndAry=$ary;
				array_pop($noEndAry);
				$parentTableIdAry[$key]=array_merge($noEndAry,$value);
				$this->getAllParentTableId($db,end($value),$parentTableIdAry[$key]);
			}
			if(!empty($parentTableIdAry)){
				$ary=$parentTableIdAry;
			}
			
			// $result=$this->getParentTableId($db,$childTableId);
		}

		private function getParentInheritLink($db,$childTableId){
			$result=$this->getParentTableId($db,$childTableId);
			foreach ($result as $key => $value) {
				
			}
		}

		//查询某子表的父表
		//结果形如[[1,3],[1,5]]
		private function getParentTableId($db,$childTableId){
			$result=$db->getParentTableId($childTableId);
			$parentTableIdAry=array();
			if(!empty($result)){
				foreach ($result as $key => $value) {
					$ary=array();
					$ary[]=$childTableId;
					$ary[]=$value;
					$parentTableIdAry[]=$ary;
				}
			}
			return $parentTableIdAry;
		}

		public function actionGetAllParentTableId(){
			$childTableId=$_GET['childTableId'];

			$tableInherit=new TableTableInherit();
			print_r($tableInherit->getAllParentTableId($childTableId));
		}

		public function actionGetAllChildTableId(){
			$parentTableId=$_GET['parentTableId'];

			$tableInherit=new TableTableInherit();
			print_r($tableInherit->getAllChildTableId($parentTableId));
		}
	}

	