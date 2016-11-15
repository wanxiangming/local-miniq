<?php

	/**
	 * UserFindSystem()
	 * 		getUserInfo(int userId or string openId)	//return UserInfo of null
	 */
	class UserFindSystem{
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