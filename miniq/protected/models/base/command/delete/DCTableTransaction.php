<?php
	// include_once("protected/models/mq-db-criteria/IDCriteria.php");

	/**
	 * DCTableTransaction(int transactionId)
	 */
	class DCTableTransaction implements DeleteCommand{
		private $criteria;

		public function __construct($transactionId){
			$MQcriteria=new IDCriteria($transactionId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return MysqlTable::model()->delete($this->criteria);
		}
	}