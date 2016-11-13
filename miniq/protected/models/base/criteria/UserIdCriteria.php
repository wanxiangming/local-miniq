<?php
	
	class UserIdCriteria implements MQCriteria{
		private $criteria;

		public function __construct($userId){
			$this->criteria=new CDbCriteria();
			$this->criteria->order='id asc';
			$this->criteria->condition='userId=:userId';
			$this->criteria->params=array(':userId'=>$userId);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}