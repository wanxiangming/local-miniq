<?php
	// include_once("protected/models/mq-db-criteria/UserIdCriteria.php");

	/**
	 * FACTableIdByUserIdFromTableLink(mixed userId)
	 * 		findALL()	//array array of tableId
	 */
	class FACTableIdByUserIdFromTableLink{
		private $criteria;

		public function __construct($userId){
			$MQcriteria=new UserIdCriteria($userId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function findALL(){
			$result=MysqlLink::model()->findAll($this->criteria);
			$ary=array();
			foreach ($result as $key => $value) {
				$ary[]=$value->tableId;
			}
			return $ary;
		}
	}