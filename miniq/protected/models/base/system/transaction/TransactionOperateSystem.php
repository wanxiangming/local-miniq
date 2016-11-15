<?php

	/**
	 * TransactionOperateSystem(int userId or string openId)
	 * 		createTransaction(int tableId,long time,string content)		//return int transaction ID
	 * 		destroyTransaction(int transactionId)						//return boolean
	 */
	class TransactionOperateSystem{
		private $userId=NULL;
		private $openId=NULL;
		private $isUserExist=false;

		public function __construct($userId){
			$icUser=new ICUser($userId);
			$userInfo=$icUser->find();
			if($userInfo != NULL){
				$this->isUserExist=true;
				$this->userId=$userInfo->getUserId();
				$this->openId=$userInfo->getOpenId();
			}
		}

		public function createTransaction($tableId,$time,$content){
			if($this->checkPermission($tableId)){
				$icTransaction=new ICTableTransaction($tableId,$time,$content);
				return $icTransaction->execute();
			}
			else{
				return -1;
			}
		}

		public function destroyTransaction($transactionId){
			//找出transaction，取得它的tableId，查看操作权限，执行删除
			$fcTransaction=new FCTransaction($transactionId);
			$transaction=$fcTransaction->find();
			if($transaction != NULL){
				$tableId=$transaction->getTableId();
				if($this->checkPermission($tableId)){
					$dcTransaction=new DCTableTransaction($transactionId);
					return $dcTransaction->execute();
				}
				else{
					return false;
				}
			}
			else{
				return false;
			}
		}

		private function checkPermission($tableId){
			if($this->isUserExist){
				$fcLink=new FCLink($this->openId,$tableId);
				return $fcLink->find();
			}
			else{
				return false;
			}
		}
	}