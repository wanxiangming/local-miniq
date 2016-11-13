<?php
	// include_once("protected/models/mq-db-criteria/IDCriteria.php");
	// include_once("protected/models/mq-db-datastructure/table/TableInfo.php");

	/**
	 * FCTable(int tableId)
	 * 		find()	//return Table
	 */
	class FCTable{
		public function __construct($tableId){
			$MQcriteria=new IDCriteria($tableId);
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function find(){
			$result=MysqlTable::model()->find($this->criteria);
			if($result == NULL){
				return NULL;
			}
			else{
				$tableInfo=new Table();
				$tableInfo->setTableId($result->id);
				$tableInfo->setTableName($result->tableName);
				$tableInfo->setCreatorId($result->creatorId);
				$tableInfo->setCreateTime($result->createTime);
				$tableInfo->setVisibilityState($result->visibilityState);
				return $tableInfo;
			}
		}
	}