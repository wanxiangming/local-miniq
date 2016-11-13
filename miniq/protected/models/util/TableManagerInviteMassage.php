<?php
	/**
	 * TableManagerInviteMassage()
	 * 		insert(int inviterUserId,int inviteeUserId,int tableId)	//return the ID of row
	 * 		
	 * 		changeToRead(int massageId)
	 * 		countOfUnreadByInviteeUserId(int inviteeUserId)	//被邀请者未读数据数
	 *
	 * 		deleteById(int massageId)
	 *
	 * 		find(int inviterUserId,int inviteeUserId,int tableId)	//return array of column or NULL
	 * 		findAllByInviteeUserId(int inviteeUserId)			//通过被邀请者ID查询数据,返回array
	 */
	class TableManagerInviteMassage{
		public function __construct(){

		}

		public function insert($inviterUserId,$inviteeUserId,$tableId){
			$modal=new ManagerInviteMassage();
			$modal->inviterUserId=$inviterUserId;
			$modal->inviteeUserId=$inviteeUserId;
			$modal->tableId=$tableId;
			$modal->invitationTime=time()*1000;
			$modal->save();
			return $modal->attributes['id'];
		}

		public function changeToRead($massageId){
			$result=$this->findById($massageId);
			if($result != NULL){
				$result->isRead=1;
				$result->save();
			}
		}

		public function deleteById($massageId){
			$result=$this->findById($massageId);
			if($result != NULL){
				$result->delete();
			}
		}

		private function findById($id){
			$criteria=new CDbCriteria();
			$criteria->condition='id=:id';
			$criteria->params=array(':id'=>$id);
			return ManagerInviteMassage::model()->find($criteria);
		}

		public function countOfUnreadByInviteeUserId($inviteeUserId){
			$criteria=new CDbCriteria();
			$criteria->condition='inviteeUserId=:inviteeUserId && isRead=:isRead';
			$criteria->params=array(':inviteeUserId'=>$inviteeUserId,':isRead'=>0);
			return ManagerInviteMassage::model()->count($criteria);
		}

		public function find($inviterUserId,$inviteeUserId,$tableId){
			$criteria=new CDbCriteria();
			$criteria->condition='inviterUserId=:inviterUserId && inviteeUserId=:inviteeUserId && tableId:=tableId';
			$criteria->params=array(':inviterUserId'=>$inviterUserId,':inviteeUserId'=>$inviteeUserId,':tableId'=>$tableId);
			$result=ManagerInviteMassage::model()->find($criteria);
			if($result != NULL){
				return $this->toArray($result);
			}
			else{
				return NULL;
			}
		}

		public function findAllByInviteeUserId($inviteeUserId){
			$criteria=new CDbCriteria();
			$criteria->condition='inviteeUserId=:inviteeUserId';
			$criteria->params=array(':inviteeUserId'=>$inviteeUserId);
			$resultAry=ManagerInviteMassage::model()->findAll($criteria);
			$massageAry=array();
			if(!empty($resultAry)){
				foreach ($resultAry as $key => $value) {
					$massageAry[]=$this->toArray($value);
				}
			}
			return $massageAry;
		}

		private function toArray($findResult){
			$massage=array();
			$massage['id']=$findResult->id;
			$massage['inviterUserId']=$findResult->inviterUserId;
			$massage['inviteeUserId']=$findResult->inviteeUserId;
			$massage['tableId']=$findResult->tableId;
			$massage['isRead']=$findResult->isRead;
			$massage['invitationTime']=$findResult->invitationTime;
			return $massage;
		}
	}