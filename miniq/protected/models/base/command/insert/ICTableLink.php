<?php
	/**
	 * ICTableLink(String userId,int tableId)
	 */
	class ICTableLink implements InsertCommand{
		private $userId;
		private $tableId;

		public function __construct($userId,$tableId){
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