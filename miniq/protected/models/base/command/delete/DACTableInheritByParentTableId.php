<?php

	class DACTableInheritByParentTableId implements DeleteAllCommand{
		private $criteria;

		public function __construct($parentTableId){
			$MQcriteria=new ParentTableIdCriteria($parentTableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return MysqlTableInherit::model()->deleteAll($this->criteria);
		}
	}