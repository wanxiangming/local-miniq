<?php
	
	/**
	 * OpenIdCriteria(String openId)
	 */
	class OpenIdCriteria implements MQCriteria{
		private $criteria;

		public function __construct($OPEN_ID){
			$this->criteria=new CDbCriteria();
			$this->criteria->condition='openId=:openId';
			$this->criteria->params=array(':openId'=>$OPEN_ID);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}