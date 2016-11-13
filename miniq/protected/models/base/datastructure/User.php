<?php
	/**
	 * User()
	 * 		getUserId()
	 * 		getUserName()
	 *
	 * 		setUserId(int id)
	 * 		setUserName(String name)
	 */

	class User{
		protected $userId;
		protected $userName;

		public function __construct(){

		}

		public function setUserId($userId){
			$this->userId=$userId;
		}

		public function getUserId(){
			return $this->userId;
		}

		public function setUserName($userName){
			$this->userName=$userName;
		}

		public function getUserName(){
			return $this->userName;
		}
	}


	/**
	 * UserInfo()
	 * 		getOpenId()
	 * 		getEmail()
	 * 		getRegisterTime()
	 *
	 * 		setOpenId(String $openId)
	 * 		setEmail(String $email)
	 * 		setRegisterTime(long $registerTime)
	 *
	 * 		methods inherited from class User
	 * 		 	getUserId()
	 * 		  	getUserName()
	 *
	 * 			setUserId()
	 * 		  	setUserName()
	 */
	class UserInfo extends User{
		private $openId;
		private $registerTime;
		private $email;

		public function __construct(){
			parent::__construct();
		}

		public function setOpenId($openId){
			$this->openId=$openId;
		}

		public function getOpenId(){
			return $this->openId;
		}

		public function setEmail($email){
			$this->email=$email;
		}

		public function getEmail(){
			return $this->email;
		}

		public function setRegisterTime($registerTime){
			$this->registerTime=$registerTime;
		}

		public function getRegisterTime(){
			return $this->registerTime;
		}
	}


	/**
	 * TableFollower(int $userId,String $userName,boolean $isManager,boolean $isCreator)
	 * 		isManager()
	 * 		isCreator()
	 *
	 * 		methods inherited from class User
	 * 			getUserId()
	 * 		 	getUserName()
	 */

	// class TableFollower extends User{
	// 	private $isManager;
	// 	private $isCreator;

	// 	public function __construct($userId,$userName,$isManager,$isCreator){
	// 		parent::__construct($userId,$userName);
	// 		$this->isManager=(boolean)$isManager;
	// 		$this->isCreator=(boolean)$isCreator;
	// 	}

	// 	public function isManager(){
	// 		return $this->isManager;
	// 	}

	// 	public function isCreator(){
	// 		return $this->isCreator;
	// 	}
	// }
