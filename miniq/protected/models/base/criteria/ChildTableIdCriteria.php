<?php
	
	class InheriteChildTableIdCriteria implements MQCriteria{
		private $criteria;

		public function __construct($childTableId){
			$this->criteria=new CDbCriteria();
			$this->criteria->condition="childTableId=:childTableId";
			$this->criteria->params=array(':childTableId'=>$childTableId);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}
