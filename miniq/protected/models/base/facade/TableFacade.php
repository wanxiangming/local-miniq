<?php
	/**
	 * 除了get...方法，其他方法在执行前都需要确认用户的操作权限，如果不符合就不执行业务处理
	 * 
	 * TableFacade(string openId or int userId)
	 * 		createTable(string tableName)	//return int
	 * 		destroyTable(int tableId)		//return boolean
	 *
	 * 		openTable(int tableId)	//return boolean
	 *
	 * 		addManager(int tableId,int managerId)
	 * 		removeManager(int tableId,int managerId)
	 *
	 * 		buildEntrance(int tableId,int entranceTableId)		//return boolean
	 * 		breakEntrance(int tableId,int entranceTableId)		//return boolean
	 *
	 * 		getTable(int tableId)				//return Table
	 * 		getAllAssociationUser(int tableId)	//return array of User ，所有link了该表的用户组成的数组
	 * 		getAllAssociationTable()			//return array of Table ，该用户的所有link表组成的数组
	 * 		getAllTopTable(int tableId)			//return array of Table ，该表的上层结构树上的所有表组成的数组
	 * 		getAllEntranceTable(int tableId)	//return array of Table ，该表的所有直接入口表所组成的数组
	 * 		getAllExportTable(int tableId)		//return array of Table ，该表的所有直接出口表所组成的数组
	 * 		getEntranceChain(int tableId)		//return array
	 */
	class TableFacade{
		private $openId=NULL;
		private $userId=NULL;
		private $isUserExist=false;

		public function __construct($userId){
			$fcUser=new FCUser($userId);
			$userInfo=$fcUser->find();
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

		public function getAllEntranceTable(){
			$linkTableAry=array();
		}
	}