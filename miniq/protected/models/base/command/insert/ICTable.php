<?php
	/**
	 * ICTable(String creatorId,String tableName)
	 */
	class ICTable implements InsertCommand{
		private $creatorId;
		private $tableName;

		public function __construct($creatorId,$tableName){
			$this->creatorId=$creatorId;
			$this->tableName=$tableName;
		}

		public function execute(){
			$model=new MysqlTable();
			$model->creatorId=$this->creatorId;
			$model->tableName=$this->tableName;
			$model->createTime=time();
			if($model->save()){
				return $model->id;
			}
			else{
				return -1;
			}
		}
	}