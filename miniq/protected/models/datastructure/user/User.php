<?php
	/**
	 * User(int $userId,String $userName)
	 * 		getUserId()
	 * 		getUserName()
	 */

	class User{
		protected $userId;
		protected $userName;

		public function __construct($userId,$userName){
			$this->userId=(int)$userId;
			$this->userName=$userName;
		}

		public function getUserId(){
			return $this->userId;
		}

		public function getUserName(){
			return $this->userName;
		}
	}

