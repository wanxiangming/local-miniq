<?php
	define('MODELS_BASE', "protected/models/base/");

		define('MODELS_BASE_DATESTRUCTURE', MODELS_BASE."datastructure/");

		define('MODELS_BASE_COMMAND', MODELS_BASE."command/");
			define('MODELS_BASE_COMMAND_FIND', MODELS_BASE_COMMAND."find/");
			define('MODELS_BASE_COMMAND_CHANGE', MODELS_BASE_COMMAND."change/");
			define('MODELS_BASE_COMMAND_DELETE', MODELS_BASE_COMMAND."delete/");
			define('MODELS_BASE_COMMAND_INSERT', MODELS_BASE_COMMAND."insert/");

		define('MODELS_BASE_CRITERIA', MODELS_BASE."criteria/");

		define('MODELS_BASE_FACADE', MODELS_BASE."facade/");

	include_once(MODELS_BASE."interfaces.php");

	// include_once(MODELS_BASE_DATESTRUCTURE."Table.php");
	// include_once(MODELS_BASE_DATESTRUCTURE."User.php");
	// include_once(MODELS_BASE_DATESTRUCTURE."Transaction.php");

	class Inclu{
		public function __construct(){

		}

		public function inclu($path){
			$dir_handle=opendir($path);
			while($file=readdir($dir_handle)) {
				if($file != "."  &&  $file != ".."){
					$filePath=$path."/".$file;
					if(is_dir($filePath)){
						$this->inclu($filePath);
					}
					else{
						$pathParts=pathinfo($filePath);
						if($pathParts['extension'] == "php"){
							include_once($filePath);
							// echo $filePath."</br>";
						}
					}
				}
				
			}
			closedir($dir_handle);
		}
	}

	$incl=new Inclu();
	$incl->inclu(MODELS_BASE);
