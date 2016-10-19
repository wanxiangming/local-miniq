<script language="javascript" type="text/javascript" src="<?php echo JS_URL; ?>activity/main/BatchAdd.js"></script>
<link type="text/css" rel="stylesheet" href="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/icheck/skins/flat/_all.css"/>
<script language="javascript" type="text/javascript" src="<?php echo FRONT_OPEN_SOURCE_URL; ?>bootstrap/icheck/icheck.min.js"></script>

<div class="container clearfix" >
  <div class="row col-xs-offset-2 col-xs-8">
      <form class="form-horizontal">

        <div class="row col-xs-12">
          <label class="control-label col-xs-2">起始时间点</label>
          <div class="col-xs-10">
            <div class="form-group ">
                <div style="position:relative">
                  <div id="mainTimePicker" class="input-group date form_date text-center" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                    <input id="timePickerInput" style="text-align: center;border: 2px solid #ccc;/*background: rgb(33, 102, 140);color: white;*/" class="form-control" size="16" type="text" value="" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                  </div>
                  <div id="tipScope" style="position:absolute;top:0px;width:100%;z-index:3"></div>
                </div>
            </div>
          </div>
        </div>

        <div class="row col-xs-12">
          <label class="control-label col-xs-2">表</label>
          <div class="col-xs-10">
            <select class="form-control">
              <?php 
                //select的内容可以用php直接获取
                //echo <option value="" ></option>;
              ?>
            </select>
          </div>
        </div>

        <div class="row col-xs-12" style="margin-top: 20px">
          <label class="control-label col-xs-2">开始周</label>
          <div class="col-xs-10">
            <select class="form-control">
              <?php 
                for($i=1; $i<=18; $i++){
                  echo "<option value=".$i.">第".$i."周</option>";
                }
              ?>
            </select>
          </div>
        </div>

        <div class="row col-xs-12" style="margin-top: 20px">
          <label class="control-label col-xs-2">结束周</label>
          <div class="col-xs-10">
            <select class="form-control">
              <?php 
                for($i=1; $i<=18; $i++){
                  echo "<option value=".$i.">第".$i."周</option>";
                }
              ?>
            </select>
          </div>
        </div>

        <div class="row col-xs-12" style="margin-top: 20px">
          <label class="control-label col-xs-2">时间</label>
          <div class="col-xs-5">
            <select class="form-control">
              <?php 
               
                  echo "<option value>8</option>";
                
              ?>
            </select>
          </div>
          <div class="col-xs-5">
            <select class="form-control">
              <?php 
                
                  echo "<option value>20</option>";
                
              ?>
            </select>
          </div>
        </div>

        <div class="row col-xs-12" style="margin-top: 20px">
          <label class="control-label col-xs-2">内容</label>
          <div class="col-xs-10">
            <textarea type="text" style="width:260;overflow-y:visible;resize:none;font-size:15px;" rows="15" cols="80" ></textarea>
          </div>
        </div>

      </form>

       <!--  <div class="col-xs-1 dropdown">
          <button class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">工作日</button>
        </div> -->
  </div>
</div>

