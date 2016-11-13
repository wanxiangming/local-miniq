<?php
	
	/**
	 * FACParentTableIdFromTableInherit(int childTableId)
	 * 		findAll()	//return array of parent table ID
	 */
	class FACParentTableIdFromTableInherit{
		private $criteria;

		public function __construct($childTableId){
			$MQcriteria=new ChildTableIdCriteria($childTableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function findAll(){
			$result=MysqlTableInherit::model()->findAll($this->criteria);
			$ary=array();
			foreach ($result as $key => $value) {
				$ary[]=$value->parentTableId;
			}
			return $ary;
		}
	}