
<?php
	/**
	 * Table()
	 * 		setTableId(int $tableId)
	 *   	setTableName(String $tableName)
	 * 		setVisibilityState(int visibilityState)
	 *		setCreatorId(mixed creatorId)
	 *		setCreatorTime(long $createTime)
	 * 	
	 * 		getCreatorId()
	 * 		getCreateTime()
	 * 		getVisibilityState()
	 * 		getTableId()
	 * 		getTableName()
	 */
	class Table{
		protected $tableId;
		protected $tableName;
		protected $creatorId;
		protected $createTime;
		protected $visibilityState;

		public function __construct(){

		}

		public function setTableId($tableId){
			$this->tableId=(int)$tableId;
		}

		public function getTableId(){
			return $this->tableId;
		}

		public function setTableName($tableName){
			$this->tableName=$tableName;
		}

		public function getTableName(){
			return $this->tableName;
		}

		public function setCreatorId($creatorId){
			$this->creatorId=$creatorId;
		}

		public function getCreatorId(){
			return $this->creatorId;
		}

		public function setCreatorTime($createTime){
			$this->createTime=$createTime;
		}

		public function getCreateTime(){
			return $this->createTime;
		}

		public function setVisibilityState($visibilityState){
			$this->visibilityState=$visibilityState;
		}

		public function getVisibilityState(){
			return $this->visibilityState;
		}
	}


	/**
	 * TablePort()
	 * 		addParentTable(Table table)
	 * 		addChildTable(Table table)
	 * 		getParentTableAry()		//return array of Table
	 * 		getChildTableAry()		//return array of Table
	 *
	 * 		methods inherited form class Table
	 * 			setTableId(int $tableId)
	 *   		setTableName(String $tableName)
	 *     		setVisibilityState(int visibilityState)
	 *       	setCreatorId(mixed creatorId)
	 *        	setCreatorTime(long $createTime)
	 * 	
	 * 			getCreatorId()
	 *    		getCreateTime()
	 *      	getVisibilityState()
	 *       	getTableId()
	 *        	getTableName()
	 * 			
	 */
	class TablePort extends Table{
		private $childTableAry=array();
		private $parentTableAry=array();

		public function __construct(){

		}

		public function addChildTable($childTable){
			$this->childTableAry[]=$childTable;
		}

		public function getChildTableAry(){
			return $this->childTableAry;
		}

		public function addParentTable($parentTable){
			$this->parentTableAry[]=$parentTable;
		}

		public function getParentTableAry(){
			return $this->parentTableAry;
		}
	}


	/**
	 * TableEntrance()
	 * 		addEntranceTable(Table $table)
	 * 		getEntranceTableAry()	//返回Table对象数组
	 * 
	 */
	class TableEntrance extends Table{
		private $entranceTableAry=array();

		public function __construct(){

		}

		public function addEntranceTable($Obj_Table){
			$this->entranceTableAry[]=$Obj_Table;
		}

		public function getEntranceTableAry(){
			return $this->entranceTableAry;
		}
	}