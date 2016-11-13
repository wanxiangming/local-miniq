<?php
	// include_once("protected/models/mq-db-criteria/TableIdCriteria");

	/**
	 * FACUserIdByTableIdFromTableLink(int tableId)
	 * 		findAll()	//return array array of userId
	 */
	class FACUserIdByTableIdFromTableLink{
		private $criteria;

		public function __construct($tableId){
			$MQcriteria=new TableIdCriteria($tableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function findAll(){
			$result=MysqlLink::model()->findAll($this->criteria);
			$ary=array();
			foreach ($result as $key => $value) {
				$ary[]=$value->userId;
			}
			return $ary;
		}
	}