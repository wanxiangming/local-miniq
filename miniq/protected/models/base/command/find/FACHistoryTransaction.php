<?php
	// include_once("protected/models/mq-db-criteria/HistoryTransactionCriteria.php");
	// include_once("protected/models/mq-db-datastructure/transaction/Transaction.php");

	/**
	 * FACHistoryTransaction(array tableIdAry,int pageSize)
	 * 		findAllByPage(int currentPage)
	 * 		count()	//int count of history transaction
	 */
	class FACHistoryTransaction{
		private $criteria;
		private $count;

		public function __construct($tableIdAry){
			$MQcriteria=new HistoryTransactionCriteria($tableIdAry);
			$this->criteria=$MQcriteria->getCriteria();
			$this->count=MysqlTransaction::model()->count($this->criteria);
		}

		public function count(){
			return $this->count;
		}

		public function findAllByPage($pageSize,$currentPage){
			$pages=new CPagination($this->count);
			$pages->pageSize=$pageSize;
			$pages->CurrentPage=(int)$currentPage-1;
			$pages->applyLimit($this->criteria);
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