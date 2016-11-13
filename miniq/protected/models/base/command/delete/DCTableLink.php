<?php
	// include_once("protected/models/mq-db-criteria/UserIdAndTableIdCriteria");

	/**
	 * DCTableLink(int userId,int tableId)
	 */
	class DCTableLink implements DeleteCommand{
		private $criteria;

		public function __construct($userId,$tableId){
			$MQcriteria=new UserIdAndTableIdCriteria($userId,$tableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return MysqlLink::model()->delete($this->criteria);
		}
	}