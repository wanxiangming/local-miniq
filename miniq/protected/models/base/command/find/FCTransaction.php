<?php

	/**
	 * FCTransaction(int transactionId)
	 * 		find()	//return Transaction of null
	 */
	class FCTransaction{
		private $criteria;

		public function __construct($transactionId){
			$MQcriteria=new IDCriteria($transactionId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function find(){
			$result=MysqlTransaction::model()->find($this->criteria);
			if($result == NULL){
				return NULL;
			}
			else{
				$transaction=new Transaction();
				$transaction->setId($result->id);
				$transaction->setTableId($result->tableId);
				$transaction->setContent($result->content);
				$transaction->setTime($result->time);
				return $transaction;
			}
		}
	}