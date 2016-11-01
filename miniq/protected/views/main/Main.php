
<script language="javascript" type="text/javascript" src="<?php echo JS_URL; ?>activity/main/Main.js"></script>

<!-- jquery -->
<script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>jquery/jquery.mousewheel.min.js"></script>

<!-- pagination -->
<script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>jquery/pagination/jquery.twbsPagination.min.js"></script>

<!-- icheck -->
<!-- <link type="text/css" rel="stylesheet" href="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/icheck/skins/flat/_all.css"/> -->
<!-- <script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/icheck/icheck.min.js"></script> -->

<!-- bootstrap timepicker -->
<script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js" charset="UTF-8"></script>
<script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>
<script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.fr.js" charset="UTF-8"></script>
<link type="text/css" rel="stylesheet" href="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css"/>


<script type="text/javascript">
  <?php 
    echo "var attentionTableAryNET=".json_encode($attentionTableAry).";";
    echo "var tableInheritLinkAry=".json_encode($tableInheritLinkAry).";";
    echo "var historyCountOfTransaction=".$historyCountOfTransaction.";";
  ?>
</script>



<div class="container-fluid clearfix" style="">
    <div id="dynamicExpansionArea" class="container row"></div>


    <div id="backlogBoxRow" class="row form-inline col-xs-12 correction-row-css"  style="">
      
    </div> 

    <div id="table" class="row text-center col-xs-12" style="margin-top:30px;">
        <div class="col-xs-5"></div>
        <div class="col-xs-2 text-left">
          <div id="addTransactionBtn" class="col-xs-2 btn btn-default"><span class="glyphicon glyphicon-plus"></span></div>
          <div class="col-xs-10">
            <input id="filterInput" type="" name="" class="form-control input-sm" >
          </div>
        </div>
       <!--  <div class="col-xs-1">
          
        </div> -->
       <!--  <div class="col-xs-5 text-right"  style="padding-top:15px">
          <div id="loaderScope" style="position: absolute;right: 10px;padding-top: 5px;"></div>
        </div> -->

        
        <!-- <div class="col-xs-8"></div> -->
    </div> 
   
    <div class="row col-xs-12 correction-row-css" style="margin-top: 8px">
        <div class="col-xs-1"></div>
        <div id="mainTable" class="row form-inline col-xs-10 correction-row-css panel panel-primary" style="height: 310px">
        
        </div>
    </div>   

    <div class="row col-xs-12">
      <div id="history-list" class="col-xs-offset-2 col-xs-8"></div>
      <div class="col-xs-12 text-center">
        <div id="pagination" class="pagination "></div>
      </div>
    </div>     
</div>

<div class="modal fade" id="create_transaction_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">发布通告</h4>
      </div>
      <div class="modal-body">

		  <form class="form-horizontal">
		    <fieldset>
          <div class="row correction-row-css">
              <label class="control-label col-xs-2" for="input01">节点</label>
              <div class="col-xs-5 correction-clear-col-xs-padding">
                <select id="create_log_modal_tableSelect" class="form-control"></select>
              </div>
          </div>
          
          <div class="row correction-row-css" style="margin-top:25px">
              <label class="control-label col-xs-2" for="input01">时间</label>
              <div class="col-xs-6 correction-clear-col-xs-padding">
                <div class="form-group col-xs-12">
                    <div style="position:relative">
                      <div id="timePicker" class="input-group date form_date text-center" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                        <input id="timePickerInput" style="text-align: center;border: 2px solid #ccc;/*background: rgb(33, 102, 140);color: white;*/" class="form-control" size="16" type="text" value="" readonly>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                      </div>
                      <div id="tipScope" style="position:absolute;top:0px;width:100%;z-index:3"></div>
                    </div>
                </div>
              </div>
          </div>

          <div id="create_transaction_content_row" class="row correction-row-css form-inline" style="margin-top:20px;position:relative;">
            <label class="control-label col-xs-2" for="input01">内容</label>
            <textarea  id="create_log_modal_content_input" type="text" class="col-xs-8"  style="width:260;overflow-y:visible;resize:none;font-size:15px;" rows="15" cols="54" ></textarea>
            <div id="transaction_create_input_length" class="col-xs-2 control-label" style="position:absolute;right:0px;bottom:0px;text-align:left;">1000字</div>
          </div>
		   		
		    </fieldset>
		  </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button id="create_log_modal_create_btn" type="button" class="btn btn-primary">创建</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="time_same_transaction_modal" tabindex="-1" role="dialog" aria-labelledby="checkForAction">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <fieldset>
          <div id="time_same_transaction_scope"></div>
        </fieldset>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="transaction_info_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">通告详情</h4>
      </div>
      <div class="modal-body">

      <form class="form-horizontal">
        <fieldset>
          <div class="row correction-row-css">
              <label class="control-label col-xs-2" for="input01">消息源</label>
              <div id="transaction_info_modal_source" class="col-xs-5 correction-clear-col-xs-padding"></div>
          </div>

          <div class="row correction-row-css">
              <label class="control-label col-xs-2" for="input01">路径</label>
              <div id="transaction_info_modal_path" class="col-xs-5 correction-clear-col-xs-padding"></div>
          </div>
          
          <div class="row correction-row-css form-inline">
              <label class="control-label col-xs-2" for="input01">时间</label>
              <div id="transaction_info_modal_time" class="col-xs-10"></div>
          </div>

          <div id="change_transaction_content_row" class="row correction-row-css form-inline" style="margin-top:20px;position:relative;">
            <label class="control-label col-xs-2" for="input01">内容</label>
            <div id="transaction_info_modal_content"></div>
          </div>
          
        </fieldset>
      </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button id="transaction_info_modal_withdrawal" type="button" class="btn btn-danger" data-toggle="modal" data-target="#checkAction_Modal">撤销</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="checkAction_Modal" tabindex="-1" role="dialog" aria-labelledby="checkForAction">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel_changeNickName">操作确认</h4>
      </div>
      <div class="modal-body">
		  <form class="form-horizontal">
		    <fieldset>
		   		<div id="create_inp_parent_changeNickName" class="control-group row ">
		          <label class="control-label col-xs-4" for="input01">您确定要删除该事务吗？</label>
		        </div>
		    </fieldset>
		  </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button id="checkAction_btn" type="button" class="btn btn-primary">确定</button>
      </div>
    </div>
  </div>
</div>

