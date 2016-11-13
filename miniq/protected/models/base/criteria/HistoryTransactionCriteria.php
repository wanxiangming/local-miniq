<?php
	include_once("protected/models/util/TodayBeginTime.php");
	
	class HistoryTransactionCriteria implements MQCriteria{
		private $criteria;

		public function __construct($tableIdAry){
			$beginTime=new TodayBeginTime();
			$this->criteria=new CDbCriteria();
			$this->criteria->order="time DESC";
			$this->criteria->addCondition("time<".$beginTime->getMStamp());
			$this->criteria->addInCondition("tableId",$tableIdAry);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}