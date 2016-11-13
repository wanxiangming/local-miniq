<?php
	// include_once("protected/models/mq-db-criteria/TableIdCriteria.php");

	class DACTableTransactionByTableId implements DeleteAllCommand{
		private $criteria;

		public function __construct($tableId){
			$MQcriteria=new TableIdCriteria($tableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return MysqlTransaction::model()->deleteAll($this->criteria);
		}
	}