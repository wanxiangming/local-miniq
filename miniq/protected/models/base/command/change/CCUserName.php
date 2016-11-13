<?php
	/**
	 * CCUserName(int userId,String nickName)
	 */
	class CCUserName implements ChangeCommand{
		private $criteria;
		private $nickName;

		public function __construct($userId,$nickName){
			$MQcriteria=new IDCriteria($userId);
			$this->criteria=$MQcriteria->getCriteria();
			$this->nickName=$nickName;
		}

		public function execute(){
			$result=MysqlUser::model()->find($this->criteria);
			if($result == NULL){
				return false;
			}
			else{
				$result->nickName=$this->nickName;
				if($result->update()){
					return true;
				}
				else{
					return false;
				}
			}
		}
	}