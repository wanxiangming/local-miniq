<?php
	
	class ChildAndParentTableIdCriteria implements MQCriteria{
		private $criteria;

		public function __construct($childTableId,$parentTableId){
			$this->criteria=new CDbCriteria();
			$this->criteria->condition="childTableId=:childTableId && parentTableId=:parentTableId";
			$this->criteria->params=array(':childTableId'=>$childTableId,':parentTableId'=>$parentTableId);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}