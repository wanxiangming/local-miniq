<?php
	
	/**
	 * 
	 * TableOperateSystem(string openId or int userId)
	 * 		createTable(string tableName)	//return int
	 * 		destroyTable(int tableId)		//return boolean
	 *
	 * 		openTable(int tableId)	//return boolean
	 *
	 * 		addManager(int tableId,int or string managerId)
	 * 		removeManager(int tableId,int or string managerId)
	 *
	 * 		buildEntrance(int tableId,int entranceTableId)		//return boolean
	 * 		breakEntrance(int tableId,int entranceTableId)		//return boolean
	 */
	class TableOperateSystem{
		private $openId=NULL;
		private $userId=NULL;
		private $isUserExist=false;

		public function __construct($userId){
			$userInfo=$this->getUserInfo($userId);
			if($userInfo != NULL){
				$this->openId=$userInfo->getOpenId();
				$this->userId=$userInfo->getUserId();
				return $this->isUserExist=true;
			}
		}

		/**
		 * 创建新表(节点)
		 * @param  [string] $openId    [description]
		 * @param  [string] $tableName [description]
		 * @return [int]   创建成功返回新table的ID，失败返回-1
		 */
		public function createTable($tableName){
			if($this->isUserExist){
				$icTable=new ICTable($this->openId,$tableName);
				$tableId=$icTable->execute();
				if($tableId > 0){
					$icTableLink=new ICTableLink($this->openId,$tableId);
					if($icTableLink->execute() > 0){
						return $tableId;
					}
					else{
						return -1;
					}
				}
				else{
					return -1;
				}
			}
			else{
				return -1;
			}
		}

		public function destroyTable($tableId){
			if($this->getPermission($tableId)){
				//该用户有权删除该table
				// 1，将该表的继承链移除，包括它和父表的继承关系，以及它和子表的继承关系
				// 2，删除该表所有transaction
				// 3，将所有用户从该表的link名单中移除
				// 4，将该表的Table数据移除
				$dacTableInheritByChildTableId=new DACTableInheritByChildTableId($tableId);
				$dacTableInheritByChildTableId->execute();
				$dacTableInheritByParentTableId=new DACTableInheritByParentTableId($tableId);
				$dacTableInheritByParentTableId->execute();

				$dacTableTransactionByTableId=new DACTableTransactionByTableId($tableId);
				$dacTableTransactionByTableId->execute();

				$dacTableLinkByTableId=new DACTableLinkByTableId($tableId);
				$dacTableLinkByTableId->execute();

				$dcTable=new DCTable($tableId);
				return $dcTable->execute();
			}
			else{
				//该用户无权删除该table
				return false;
			}
		}

		public function openTable($tableId){
			if($this->getPermission($tableId)){
				$ccTableVisibilityState=new CCTableVisibilityState($tableId,1);
				return $ccTableVisibilityState->execute();
			}
			else{
				return false;
			}
		}

		public function addManager($tableId,$managerId){
			if($this->getPermission($tableId)){
				$userInfo=$this->getUserInfo($managerId);
				$openId=$userInfo->getOpenId();
				$fcLink=new FCLink($openId,$tableId);
				if(!$fcLink->find()){
					$icTableLink=new ICTableLink($tableId,$openId);
					if($icTableLink->execute() > 0){
						return true;
					}
					else{
						return false;
					}
				}
				else{
					return false;
				}
			}
			else{
				return false;
			}
		}

		//有权移除管理员的有两种情况
		//1，你是该表创建者
		//2，你是该管理员
		public function removeManager($tableId,$managerId){
			$userInfo=$this->getUserInfo($managerId);
			if($this->getPermission($tableId) || $userInfo->getOpenId() == $this->openId){
				$dcTableLink=new DCTableLink($userInfo->getOpenId(),$tableId);
				return $dcTableLink->execute();
			}
			else{
				return false;
			}
		}

		public function buildEntrance($tableId,$entranceTableId){
			if($this->getPermission($tableId)){
				$icTableInherit=new ICTableInherit($tableId,$entranceTableId);
				if($icTableInherit->execute() > 0){
					return true;
				}
				else{
					return false;
				}
			}
			else{
				return false;
			}
		}

		public function breakEntrance($tableId,$entranceTableId){
			if($this->getPermission($tableId)){
				$dcTableInherit=new DCTableInherit($tableId,$entranceTableId);
				return $dcTableInherit->execute();
			}
			else{
				return false;
			}
		}

		//params id (int id or string openId)
		private function getUserInfo($id){
			$fcUser=new FCUser($id);
			return $fcUser->find();
		}

		//验证你是否对该表具有表结构操作权
		private function getPermission($tableId){
			if($this->isUserExist){
				$table=$this->getTable($tableId);
				if($table != NULL){
					if($this->openId == $table->getCreatorId()){
						return true;
					}
					else{
						return false;
					}
				}
				else{
					return flase;
				}
			}
			else{
				return false;
			}
		}
	}