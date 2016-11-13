<?php
	/**
	 * getCriteria()	//return CDbCriteria
	 */
	interface MQCriteria{
		public function getCriteria();
	}

	/**
	 * execute()	//return boolean
	 */
	interface ChangeCommand{
		public function execute();
	}

	/**
	 * execute()	//return boolean
	 */
	interface DeleteCommand{
		public function execute();
	}

	/**
	 * execute()	//return int ,the number of rows deleted
	 */
	interface DeleteAllCommand{
		public function execute();
	}

	/**
	 * execute()	//return int id or -1 when insert false
	 */
	interface InsertCommand{
		public function execute();
	}