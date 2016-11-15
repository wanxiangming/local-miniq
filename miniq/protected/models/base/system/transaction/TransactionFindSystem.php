<?php

	/**
	 * TransactionFindSystem(array tableIdAry)
	 * 		getHistoryTransactionCount()								//return int
	 * 		getHistoryTransactionByPage(int pageSize,int currentPage)	//return array of Transaction
	 * 		getAllFutureTransaction()									//return array of Transaction
	 */
	class TransactionFindSystem{
		private $tableIdAry;

		public function __construct($tableIdAry){
			$this->tableIdAry=$tableIdAry;
		}

		public function getHistoryTransactionCount(){
			$facHistoryTransaction=new FACHistoryTransaction($this->tableIdAry);
			return $facHistoryTransaction->count();
		}

		public function getHistoryTransactionByPage($pageSize,$currentPage){
			$facHistoryTransaction=new FACHistoryTransaction($this->tableIdAry);
			return $facHistoryTransaction->findAllByPage($pageSize,$currentPage);
		}

		public function getAllFutureTransaction(){
			$fac=new FACFutureTransaction($this->tableIdAry);
			return $fac->findAll();
		}
	}