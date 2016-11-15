<?php
	
	/**
	 * find()	//return boolean
	 */
	class FCLink{
		private $criteria;

		public function __construct($userId,$tableId){
			$MQcriteria=new UserIdAndTableIdCriteria($userId,$tableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function find(){
			$result=MysqlLink::model()->find($this->criteria);
			if($result == NULL){
				return false;
			}
			else{
				return true;
			}
		}
	}