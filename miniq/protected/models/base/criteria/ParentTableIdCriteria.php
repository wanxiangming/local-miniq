<?php
	
	/**
	 * InheriteParentTableIdCriteria(int parentTableId)
	 */
	class InheriteParentTableIdCriteria implements MQCriteria{
		private $criteria;

		public function __construct($parentTableId){
			$this->criteria=new CDbCriteria();
			$this->criteria->condition="parentTableId=:parentTableId";
			$this->criteria->params=array(':parentTableId'=>$parentTableId);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}
