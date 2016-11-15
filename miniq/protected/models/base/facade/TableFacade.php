<?php
	/**
	 * TableFacade(string openId or int userId)
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
		private $userId=NULL;
		private $tableOperater=NULL;
		private $tableFinder=NULL;

		public function __construct($userId){
			$this->userId=$userId;
			$this->tableOperater=new TableOperateSystem($userId);
			$this->tableFinder=new TableFindSystem();
		}

		public function createTable($tableName){
			return $this->tableOperater->createTable($tableName);
		}

		public function destroyTable($tableId){
			return $this->tableOperater->destroyTable($tableId);
		}

		public function openTable($tableId){
			return $this->tableOperater->openTable($tableId);
		}

		public function addManager($tableId,$managerId){
			return $this->tableOperater->addManager($tableId,$managerId);
		}

		public function removeManager($tableId,$managerId){
			return $this->tableOperater->removeManager($tableId,$managerId);
		}

		public function buildEntrance($tableId,$entranceTableId){
			return $this->tableOperater->buildEntrance($tableId,$entranceTableId);
		}

		public function breakEntrance($tableId,$entranceTableId){
			return $this->tableOperater->breakEntrance($tableId,$entranceTableId);
		}

		public function getTable($tableId){
			return $this->tableFinder->getTable($tableId);
		}

		public function getAllAssociationUser($tableId){
			return $this->tableFinder->getAllAssociationUser($tableId);
		}

		public function getAllAssociationTable(){
			return $this->tableFinder->getAllAssociationTable($this->userId);
		}

		public function getAllTopTable($tableId){
			return $this->tableFinder->getAllTopTable($tableId);
		}

		public function getAllEntranceTable($tableId){
			return $this->tableFinder->getAllEntranceTable($tableId);
		}

		public function getEntranceChain($tableId){
			return $this->tableFinder->getEntranceChain($tableId);
		}

		public function getAllExportTable($tableId){
			return $this->tableFinder->getAllExportTable($tableId);
		}
	}