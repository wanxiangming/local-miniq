<?php
	/**
	 * ICTableInherit(int childTableId,int parentTableId)
	 */
	class ICTableInherit implements InsertCommand{
		private $childTableId;
		private $parentTableId;

		public function __construct($childTableId,$parentTableId){
			$this->childTableId=$childTableId;
			$this->parentTableId=$parentTableId;
		}

		public function execute(){
			$model=new MysqlTableInherit();
			$model->childTableId=$childTableId;
			$model->parentTableId=$parentTableId;
			if($model->save()){
				return $model->id;
			}
			else{
				return -1;
			}
		}
	}