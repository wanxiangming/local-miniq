<?php /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head> 
	<title>MiniQ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
	<meta name="language" content="en" />
    <meta property="qc:admins" content="1422662147651611631457" />
    <link rel="icon" href="<?php echo IMAGE_URL; ?>icon/MiniQ32x32.png" />
   
    <!-- qq互联 -->
   <!--  <script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101305771" data-redirecturi="http://www.miniq.site/" charset="utf-8"></script> -->

    <!-- jquery -->
    <script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>jquery/jquery-2.1.4.js"></script>
    <script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>jquery/jquery.json-2.4.js"></script>

    <!-- bootstrap -->
    <script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js" ></script>
    <link type="text/css" rel="stylesheet" href="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/bootstrap-3.3.5-dist/css/bootstrap.min.css"/>
    
    <!-- animate -->
    <link type="text/css" rel="stylesheet" href="<?php echo FRONT_OPEN_SOURCE_URL; ?>animate/animate.min.css"/>

    <!-- loader piano -->
    <link type="text/css" rel="stylesheet" href="<?php echo CSS_URL; ?>loader_piano.css"/>

    
    <script language="javascript" type="text/javascript" src="<?php echo JS_URL; ?>internet/Url.js"></script> 
    <script language="javascript" type="text/javascript" src="<?php echo JS_URL; ?>internet/UrlMap.js"></script> 
    <script language="javascript" type="text/javascript" src="<?php echo JS_URL; ?>internet/Internet.js"></script> 
    <script language="javascript" type="text/javascript" src="<?php echo JS_URL; ?>activity/Main.js"></script> 
    <link type="text/css" rel="stylesheet" href="<?php echo CSS_URL; ?>main.css"/>
</head>

<body text-align:center style="background: #ededed">

<?php
    //程序能走到这里，说明该用户已经登录了，account cookie是存在的
    include_once("protected/models/database/MiniqDB.php");
    include_once("protected/models/util/Cookie.php");

    $cookie=new Cookie();
    $account=$cookie->getAccount();
    

    $miniqDB=new MiniqDB();
    $userInfo=$miniqDB->getUserInfo($account);
    $userName=$userInfo->getUserName(); //获取用户名

    //在这里获取用户的个人消息
?>
    
<div class="row correction-row-css" style="background:rgb(33, 102, 140)">
    <div class="col-xs-offset-3 col-xs-1 text-center" style="font-size:24px;color:#FFFFFF;">MiniQueue</div>

    <div class="col-xs-offset-4 col-xs-4 text-left row form-inline" id="userInfo">
    	<a href="<?php echo SITE_URL;?>?r=Main/Main" class="btn btn-defualt white"><span class="glyphicon glyphicon-home"></span></a>
        <a id="nickName" type="button" href="<?php echo SITE_URL;?>?r=User/AccountSetting" data-toggle="tooltip" data-placement="bottom" title="<?php echo $userName; ?>" class="btn btn-defualt white"><span class="glyphicon glyphicon-user"></span></a>
        <a id="scheduleManagerBtn" href="<?php echo SITE_URL;?>?r=Table/TableManage" data-toggle="tooltip" data-placement="bottom" title="节点管理" class="btn btn-defualt white" ><span class="glyphicon glyphicon-th"></span></a>
        <div class="btn btn-defualt white" data-toggle="modal"  data-target="#joinUsModal">join us</div>
    </div>  
</div>

<div class="modal fade" id="joinUsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body row">
        <div class="col-xs-offset-2 col-xs-9">Miniq将提供一种把信息分类化，结构化，层次化的构建方案</div>
        <div class="col-xs-offset-2 col-xs-9">在这里，信息不再是平坦的</div>
        <div class="col-xs-offset-2 col-xs-9">它们将被计算机以光速传递到人类社会的不同层次</div>
        <div class="col-xs-offset-2 col-xs-9">如果你相信我们的信念</div>
        <div class="col-xs-offset-2 col-xs-9">如果你热爱编程</div>
        <div class="col-xs-offset-2 col-xs-9">如果你熟悉JavaScript，jquery，bootstrap</div>
        <div class="col-xs-offset-2 col-xs-9">如果你熟悉php，yii</div>
        <div class="col-xs-offset-2 col-xs-9">如果你是IOS，ANDROID程序员</div>
        <div class="col-xs-offset-2 col-xs-9">如果你愿意在一片不同的天地燃烧自己</div>
        <div class="col-xs-offset-2 col-xs-9">miniqueue@foxmail.com</div>
      </div>
    </div>
  </div>
</div>


<?php 
    header("Content-Type:text/html;   charset=utf-8");
    echo $content; 
?>

</body>
</html>
