<?php

	/**
	 * MysqlTableController()
	 * 		actionCreateLogTable()
	 * 		actionGetLogTableList()
	 * 		actionGetAttentonTableInfo()
	 * 		actionChangeLogTableName()
	 * 		actionChangeLogTableAnotherName()
	 * 		actionDeprecatedLogTable()
	 * 		actionCancelAttention()
	 * 		actionPayAttention()
	 * 		actionSearchTableByTableId()
	 * 		actionOpenTheTable()
	 * 		actionInherit()
	 * 		actionRemoveInherit()
	 * 		actionGetParentInheritLink()
	 * 		actionGetAllParentTableId()
	 * 		actionGetAllChildTableId()
			actionRemoveAll()
	 */

	include_once("protected/models/util/TableTable.php");
	include_once("protected/models/util/TableLink.php");
	include_once("protected/models/util/TableUser.php");
	include_once("protected/models/util/TableTransaction.php");
	include_once("protected/models/util/TableTableInherit.php");
	include_once("protected/models/util/TableTableManagerGroup.php");

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

		/**
			$tableInherit=new TableTableInherit();
			print_r($tableInherit->getAllParentTableId($childTableId));

		 *	查询该用户的所有关注表，及这些表的所有父表
		 *	tableId
		 *	tableName
		 *	isManager
		 *	inheritTableAry
		 *		tableId
		 *		tableName
		 *	
		 * actionGetAttentonTableInfo()	//需要openId
		 * 
		 */
		public function actionGetAttentonTableInfo(){
			$openId=Yii::app()->request->cookies['openId']->value;

			$tableLink=new TableLink();
			$linkResult=$tableLink->getAllByUserId($openId);
			if($linkResult != NULL){
				$result=array();
				$tableTable=new TableTable();
				$tableMangerGroup=new TableTableManagerGroup();
				$tableInherit=new TableTableInherit();

				foreach ($linkResult as $key => $value) {
					$info=array();
					$tableId=$value['tableId'];

					$tableResult=$tableTable->getById($tableId);
					if($tableResult != NULL){

						$info['tableId']=$tableId;
						$info['tableName']=$tableResult['tableName'];

						if($tableResult['creatorId'] == $openId  ||  $tableMangerGroup->isManager($openId,$tableId)){
							$info['isManager']=1;
						}
						else{
							$info['isManager']=0;
						}

						$allParentTableIdAry=$tableInherit->getAllParentTableId($tableId);
						$parentTableInfoAry=array();
						foreach ($allParentTableIdAry as $k => $parentTableId) {
							$ary=array();
							$parentTableInfo=$tableTable->getById($parentTableId);
							$ary['tableId']=$parentTableInfo['id'];
							$ary['tableName']=$parentTableInfo['tableName'];
							$parentTableInfoAry[]=$ary;
						}
						$info['parentTableInfoAry']=$parentTableInfoAry;
					}
					$result[]=$info;
				}

				print_r(json_encode($result));
			}
			else{
				print_r(0);
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

		/**
		 *	当用户弃用某表的时候
		 *		1，将该用户从该表的link名单中移除（这个用户其实也就是该表的creator）
		 *		2，将该表的继承链移除，包括它和父表的继承关系，以及它和子表的继承关系
		 *		3，移除该表的所有管理员
		 *		4，修改该标的TableState
		 *
		 * 	弃用操作，不会影响那些仅仅直接关注了该表的用户，他们仍然能接受到数据，但因为该表没有了管理员，所以该表的内容将没有人有权限修改。
		 * 	并且该表的信息不会再出现在其他表的继承结构中
		 * 
		 * actionDeprecatedLogTable()
		 * @return [type] [description]
		 */
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
		 * actionGetParentInheritLink()
		 * @return [type] [description]
		 */
		public function actionGetParentInheritLink(){
			$childTableId=$_GET['childTableId'];

			$tableInherit=new TableTableInherit();
			$result=$this->getParentInheritLink($tableInherit,$childTableId);

			print_r(json_encode($result));
		}

		private function getParentInheritLink($db,$childTableId){
			$result=$this->getParentTableId($db,$childTableId);
			foreach ($result as $key => $value) {
				$result=array_merge($result,$this->getParentInheritLink($db,$value[$childTableId]));
			}
			return $result;
		}

		//查询某子表的父表
		private function getParentTableId($db,$childTableId){
			$result=$db->getParentTableId($childTableId);
			$parentTableIdAry=array();
			if(!empty($result)){
				foreach ($result as $key => $value) {
					$ary=array();
					$ary[$childTableId]=$value;
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

		public function actionRemoveAll(){
			$parentTableId=$_GET['parentTableId'];

			$tableInherit=new TableTableInherit();
			$tableInherit->removeAllAsChildTable($parentTableId);
		}
	}
