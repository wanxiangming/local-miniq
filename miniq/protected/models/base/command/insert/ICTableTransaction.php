<?php
	/**
	 * ICTableTransaction(int tableId,long time,String content)
	 */
	class ICTableTransaction implements InsertCommand{
		private $tableId;
		private $time;
		private $content;

		public function __construct($tableId,$time,$content){
			$this->tableId=$tableId;
			$this->time=$time;
			$this->content=$content;
		}

		public function execute(){
			$model=new MysqlTransaction();
			$model->tableId=$this->tableId;
			$model->time=$this->time;
			$model->content=$this->content;
			if($model->save()){
				return $model->id;
			}
			else{
				return -1;
			}
		}
	}