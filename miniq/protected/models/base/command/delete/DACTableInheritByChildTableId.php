<?php
	// include_once(MODELS_BASE_CRITERIA."ChildTableIdCriteria.php");

	class DACTableInheritByChildTableId implements DeleteAllCommand{
		private $criteria;

		public function __construct($childTableId){
			$MQcriteria=new ChildTableIdCriteria($childTableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function execute(){
			return MysqlTableInherit::model()->deleteAll($this->criteria);
		}
	}
