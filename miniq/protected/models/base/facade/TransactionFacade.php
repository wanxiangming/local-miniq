<?php

	/**
	 * TransactionFacade(int userId or string openId)
	 * 		createTransaction(int tableId,long time,string content)		//return int transaction ID
	 * 		destroyTransaction()										//return boolean
	 *
	 * 		getHistoryTransactionCount()							//return int
	 * 		getHistoryTransactionByPage(int pageSize,int page)		//return array of Transaction
	 * 		getAllFutureTransaction(array tableIdAry)				//return array of Transaction
	 */
	class TransactionFacade{
		private $transactionFinder=NULL;
		private $transactionOperater=NULL;
		private $userId=NULL;

		public function __construct($userId){
			$this->userId=$userId;
			$this->transactionOperater=new TransactionOperateSystem($userId);
		}

		public function createTransaction($tableId,$time,$content){
			return $this->transactionOperater->createTransaction($tableId,$time,$content);
		}

		public function destroyTransaction($transactionId){
			return $this->transactionOperater->destroyTransaction($transactionId);
		}

		public function getHistoryTransactionCount(){
			return $this->makeTransactionFinder()->getHistoryTransactionCount();
		}

		public function getHistoryTransactionByPage($pageSize,$currentPage){
			return $this->makeTransactionFinder()->getHistoryTransactionByPage($pageSize,$currentPage);
		}

		public function getAllFutureTransaction(){
			return $this->makeTransactionFinder()->getAllFutureTransaction();
		}

		private function makeTransactionFinder(){
			$tableFinder=new TableFindSystem();
			$tableAry=$tableFinder->getAllAssociationTable($this->userId);
			$tableIdAry=array();
			foreach ($tableAry as $key => $value) {
				$tableIdAry[]=$value->getTableId();
				$topTableAry=$tableFinder->getAllTopTable($value->getTableId());
				foreach ($topTableAry as $k => $val) {
					$tableIdAry[]=$val->getTableId();
				}
			}
			return new TransactionFindSystem(array_unique($tableIdAry));
		}
	}