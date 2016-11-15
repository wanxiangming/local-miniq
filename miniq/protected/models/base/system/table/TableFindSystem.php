<?php
	/**
	 * TableFindSystem()
	 * 		getTable(int tableId)				//return Table
	 * 		getAllAssociationUser(int tableId)	//return array of User ，所有link了该表的用户组成的数组
	 * 		getAllAssociationTable(int or string userId)	//return array of Table ，该用户的所有link表组成的数组
	 * 		getAllTopTable(int tableId)			//return array of Table ，该表的上层结构树上的所有表组成的数组
	 * 		getAllEntranceTable(int tableId)	//return array of Table ，该表的所有直接入口表所组成的数组
	 * 		getAllExportTable(int tableId)		//return array of Table ，该表的所有直接出口表所组成的数组
	 * 		getEntranceChain(int tableId)		//return array
	 */
	class TableFindSystem{
		
		public function __construct(){

		}

		public function getTable($tableId){
			$fcTable=new FCTable($tableId);
			return $fcTable->find();
		}

		public function getAllAssociationUser($tableId){
			$facUserIdByTableIdFromTableLink=new FACUserIdByTableIdFromTableLink($tableId);
			$userIdAry=$facUserIdByTableIdFromTableLink->findAll();
			$userAry=array();
			foreach ($userIdAry as $key => $value) {
				$userAry[]=$this->getUserInfo($value);
			}
			return $userAry;
		}

		public function getAllAssociationTable($userId){
			$userInfo=$this->getUserInfo($userId);
			$facTableIdByUserIdFromTableLink=new FACTableIdByUserIdFromTableLink($userInfo->getOpenId());
			$tableIdAry=$facTableIdByUserIdFromTableLink->findAll();
			$tableAry=array();
			foreach ($tableIdAry as $key => $value) {
				$tableAry[]=$this->getTable($value);
			}
			return $tableAry;
		}

		//params id (int id or string openId)
		private function getUserInfo($id){
			$fcUser=new FCUser($id);
			return $fcUser->find();
		}

		public function getAllTopTable($tableId){
			return $this->turnToTable($this->getAllTopTableId($tableId));
		}

		private function getAllTopTableId($tableId){
			$resultAry=$this->getAllEntranceTableId($tableId);
			foreach ($resultAry as $key => $value) {
				$resultAry=array_merge($resultAry,$this->getAllTopTableId($value));
			}
			return array_unique($resultAry);
		}

		public function getAllEntranceTable($tableId){
			return $this->turnToTable($this->getAllEntranceTableId($tableId));
		}

		public function getEntranceChain($tableId){
			$entranceChain=$this->getEntranceCouple($tableId);
			foreach ($entranceChain as $key => $value) {
				$entranceChain=array_merge($entranceChain,$this->getEntranceChain($value[1]));
			}
			return $entranceChain;
		}

		private function getEntranceCouple($tableId){
			$entranceTableIdAry=$this->getAllEntranceTableId($tableId);
			$coupleAry=array();
			foreach ($entranceTableIdAry as $key => $value) {
				$couple=array();
				$couple[]=$tableId;
				$couple[]=$value;
				$coupleAry[]=$couple;
			}
			return $coupleAry;
		}

		private function getAllEntranceTableId($tableId){
			$facParentTableIdFromTableInherit=new FACParentTableIdFromTableInherit($tableId);
			return $facParentTableIdFromTableInherit->findAll();
		}

		public function getAllExportTable($tableId){
			return $this->turnToTable($this->getAllExportTableId($tableId));
		}

		private function getAllExportTableId($tableId){
			$facChildTableIdFromTableInherit=new FACChildTableIdFromTableInherit($tableId);
			return $facChildTableIdFromTableInherit->findAll();
		}

		private function turnToTable($tableIdAry){
			$tableAry=array();
			foreach ($tableIdAry as $key => $value) {
				$tableAry[]=$this->getTable($value);
			}
			return $tableAry;
		}
	}