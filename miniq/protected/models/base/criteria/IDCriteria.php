<?php

	/**
	 * include_once("protected/models/mq-db-criteria/IDCriteria.php");
	 */
	class IDCriteria implements MQCriteria{
		private $criteria=null;

		public function __construct($ID){
			$this->criteria=new CDbCriteria();
			$this->criteria->condition='id=:id';
			$this->criteria->params=array(':id'=>$ID);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}