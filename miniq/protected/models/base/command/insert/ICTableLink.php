<?php
	/**
	 * ICTableLink(int tableId,String userId)
	 */
	class ICTableLink implements InsertCommand{
		private $userId;
		private $tableId;

		public function __construct($tableId,$userId){
			$this->userId=$userId;
			$this->tableId=$tableId;
		}

		public function execute(){
			$model=new MysqlLink();
			$model->userId=$this->userId;
			$model->tableId=$this->tableId; 
			if($model->save()){
				return $model->id;
			}
			else{
				return -1;
			}
		}
	}