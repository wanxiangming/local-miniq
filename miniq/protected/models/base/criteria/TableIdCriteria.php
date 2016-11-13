<?php
	
	/**
	 * TableIdCriteria(int tableId)
	 */
	class TableIdCriteria implements MQCriteria{
		private $criteria;

		public function __construct($tableId){
			$criteria=new CDbCriteria();
			$criteria->order='id asc';
			$criteria->condition='tableId=:tableId';
			$criteria->params=array(':tableId'=>$tableId);
		}

		public function getCriteria(){
			return $this->criteria;
		}
	}