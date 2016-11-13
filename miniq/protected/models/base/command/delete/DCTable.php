<?php
	// include_once("protected/models/mq-db-criteria/IDCriteria");
	
	/**
	 * DeleteTableCommand(int tableId)
	 */
	class DCTable implements DeleteCommand{
		private $criteria;

		public function __construct($tableId){
			$MQcriteria=new IDCriteria($tableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return MysqlTable::model()->delete($this->criteria);
		}
	}