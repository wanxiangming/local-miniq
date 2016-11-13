<?php
	// include_once("protected/models/mq-db-criteria/ChildAndParentTableIdCriteria");

	/**
	 * DCTableInherit(int childTableId,int parentTableId)
	 */
	class DCTableInherit implements DeleteCommand{
		private $criteria;

		public function __construct($childTableId,$parentTableId){
			$MQcriteria=new ChildAndParentTableIdCriteria($childTableId,$parentTableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return MysqlTableInherit::model()->delete($this->criteria);
		}
	}