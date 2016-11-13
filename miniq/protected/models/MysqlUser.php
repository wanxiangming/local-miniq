<?php

	class MysqlUser extends CActiveRecord{  
	
		public static function model($className=__CLASS__){  
			return parent::model($className);  
		}  
		
		public function tableName(){  
			return '{{user}}';  
		} 

		public function rules(){
			return array(
					array('nickName','length','min'=>1,'max'=>12,'allowEmpty'=>true)
			);
		}
	} 