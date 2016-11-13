<?php
	
	/**
	 * UserIdAndTableIdCriteria(int userId,int tableId)
	 */
	class UserIdAndTableIdCriteria implements MQCriteria{
		private $criteria;

		public function __construct($userId,$tableId){
			$this->criteria=new CDbCriteria();
			$this->criteria->condition='userId=:userId && tableId=:tableId';
			$this->criteria->params=array(':userId'=>$userId,':tableId'=>$tableId);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}