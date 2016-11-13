<?php
	/**
	 * 实现了InsertCommand接口的用户信息插入指令
	 * ICUser(String openId)
	 */
	class ICUser implements InsertCommand{
		private $openId=null;

		public function __construct($openId){
			$this->openId=$openId;
		}

		public function execute(){
			$model=new MysqlUser();
			$model->openId=$this->openId;
			$model->nickName=substr($this->openId,0,6);
			$model->registerTime=time();
			if($model->save()){
				return $model->id;
			}
			else{
				return -1;
			}
		}
	}
