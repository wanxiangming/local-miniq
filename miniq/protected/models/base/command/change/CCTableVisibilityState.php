<?php
	/**
	 * CCTableVisibilityState(int tableId,int visibilityState)
	 */
	class CCTableVisibilityState implements ChangeCommand{
		private $criteria;
		private $visibilityState;

		public function __construct($tableId,$VISIBILITY_STATE){
			$MQcriteria=new IDCriteria($tableId);
			$this->criteria=$MQcriteria->getCriteria();
			$this->visibilityState=$VISIBILITY_STATE;
		}

		public function execute(){
			$result=MysqlTable::model()->find($this->criteria);
			if($result == NULL){
				return false;
			}
			else{
				$result->visibilityState=$this->visibilityState;
				if($result->update()){
					return true;
				}
				else{
					return false;
				}
			}
		}
	}