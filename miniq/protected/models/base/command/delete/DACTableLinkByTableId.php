<?php

	class DACTableLinkByTableId implements DeleteAllCommand{
		private $criteria;

		public function __construct($tableId){
			$MQcriteria=new TableIdCriteria($tableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return TableLink::model()->deleteAll($this->criteria);
		}
	}