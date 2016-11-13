<?php
	// include_once(MODELS_BASE_CRITERIA."IDCriteria.php");
	// include_once(MODELS_BASE_CRITERIA."OpenIdCriteria.php");

	/**
	 * FCUserByOpenId(String openId or int id)
	 * 		find()	//return UserInfo
	 */
	class FCUser{
		private $result;
		private $criteria;

		public function __construct($id){
			if(is_integer($id)){
				$MQcriteria=new IDCriteria($id);
			}
			else{
				$MQcriteria=new OpenIdCriteria($id);
			}
			$this->criteria=$MQcriteria->getCriteria();
		}

		public function find(){
			$this->result=MysqlUser::model()->find($this->criteria);
			if($this->result == NULL){
				return NULL;
			}
			else{
				$userInfo=new UserInfo();
				$userInfo->setUserId($this->result->id);
				$userInfo->setUserName($this->result->nickName);
				$userInfo->setOpenId($this->result->openId);
				$userInfo->setEmail($this->result->email);
				$userInfo->setRegisterTime($this->result->registerTime);
				return $userInfo;
			}
		}
	}

