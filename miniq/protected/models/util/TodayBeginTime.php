<?php
	class TodayBeginTime{
		private $time;

		public function __construct(){
			$this->time=new DateTime();
			$this->time->setTime(0,0,0);
		}

		public function getMStamp(){
			return $this->time->getTimestamp()*1000;
		}

		public function getStamp(){
			return $this->time->getTimestamp();
		}
	}