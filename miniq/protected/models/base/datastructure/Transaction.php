<?php
	/**
	 * Transaction()
	 * 		setId(int id)
	 * 		setTableId(int tableId)
	 * 		setContent(String content)
	 * 		setTime(long time)
	 * 
	 * 		getId()			//return int transactionId
	 * 		getTableId()	//return int tableId
	 * 		getContent()	//return String content
	 * 		getTime()		//return long time
	 */

	class Transaction{
		protected $id;
		protected $tableId;
		protected $content;
		protected $time; 

		public function __construct(){
			
		}

		public function setId($id){
			$this->id=$id;
		}

		public function getId(){
			return $this->id;
		}

		public function setTableId($tableId){
			$this->tableId=$tableId;
		}

		public function getTableId(){
			return $this->tableId;
		}

		public function setContent($content){
			$this->content=$content;
		}

		public function getContent(){
			return $this->content;
		}

		public function setTime($time){
			$this->time=$time;
		}

		public function getTime(){
			return $this->time;
		}
	}

