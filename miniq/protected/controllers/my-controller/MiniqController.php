<?php

	include_once("protected/models/util/Cookie.php");

	class MiniqController extends Controller{

		public function __construct($id,$module){
			parent::__construct($id,$module);
			
			$cookie=new Cookie();
			if(!$cookie->isSetAccount()){
				$this->redirect(array('Login/Login'));
			}
		}
	}