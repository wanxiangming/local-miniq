<?php
	// include_once(MODELS_BASE_CRITERIA."protected/models/mq-db-criteria/ParentTableIdCriteria.php");

	/**
	 * FACChildTableIdFromTableInherit(int parentTableId)
	 * 		findAll()	//return array of childTableId
	 */
	class FACChildTableIdFromTableInherit{
		private $criteria;

		public function __construct($parentTableId){
			$MQcriteria=new ParentTableIdCriteria($parentTableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function findAll(){
			$result=MysqlTableInherit::model()->findAll($this->criteria);
			$ary=array();
			foreach ($result as $key => $value) {
				$ary[]=$value->childTableId;
			}
			return $ary;
		}
	}