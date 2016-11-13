<?php
	// include_once(MODELS_BASE_COMMAND_FIND."FCUser.php");
	// include_once(MODELS_BASE_COMMAND_CHANGE."CCUserName.php");

	/**
	 * createNewUser(string openId)	//return int
	 * changeUserName(String openId or int id,string name)	//return boolean
	 * getUserInfo(int userId or string openId)	//return UserInfo of null
	 */
	class UserFacade{

		/**
		 * 创建新用户,同时创建其初始节点
		 * @param  [string] $openId
		 * @return [int]  新用户id，新建失败返回-1
		 */
		public function createNewUser($openId){
			if(isset($openId)){
				$fcUser=new FCUser($openId);
				if($fcUser == NULL){
					$icUser=new ICUser($openId);
					$userId=$icUser->execute();
					if($userId > 0){
						$icTable=new ICTable($openId,"我的节点");
						$tableId=$icTable->execute();
						if($tableId > 0){
							$icTableLink=new ICTableLink($openId,$tableId);
							$icTableLink->execute();
						}
					}
					return $userId;
				}
				else
					return -1;
			}
			else
				return -1;
		}

		/**
		 * 修改用户名
		 * @param  [int userId or string openId] $userId [description]
		 * @param  [string] $name   [description]
		 * @return [boolean]        
		 */
		public function changeUserName($userId,$name){
			$fcUser=new FCUser($userId);
			$userInfo=$fcUser->find();
			$ccUserName=new CCUserName($userInfo->getUserId(),$name);
			return $ccUserName->execute();
		}

		/**
		 * 从数据库获取用户信息
		 * @param  [int userId or string openId] $userId [description]
		 * @return [type]         [description]
		 */
		public function getUserInfo($userId){
			$fcUser=new FCUser($userId);
			return $fcUser->find();
		}
	}