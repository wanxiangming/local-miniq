<?php
	// include_once("protected/models/mq-db-criteria/FutureTransactionCriteria.php");
	// include_once("protected/models/mq-db-datastructure/transaction/Transaction.php");

	/**
	 * FACFutureTransaction(array tableIdAry)
	 * 		findAll()	//return array of Transaction
	 */
	class FACFutureTransaction{
		private $criteria;

		public function __construct($tableIdAry){
			$MQcriteria=new FutureTransactionCriteria($tableIdAry);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function findAll(){
			$result=MysqlTransaction::model()->findAll($this->criteria);
			$transactionAry=array();
			foreach ($result as $key => $value) {
				$transaction=new Transaction();
				$transaction->setId($value->id);
				$transaction->setTableId($value->tableId);
				$transaction->setContent($value->content);
				$transaction->setTime($value->time);
				$transactionAry[]=$transaction;
			}
			return $transactionAry;
		}
	}