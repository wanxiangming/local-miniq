
minclude("Li");

// var DropDownItemButton={
// 	creatNew:function(){
// 		var DropDownItemButton=Button.creatNew();

// 		DropDownItemButton.addClass("form-control btn btn-default correction-dropdown-btn-css");

// 		return DropDownItemButton;
// 	}
// }


var DropDownItemButton={
	creatNew:function(){
		var DropDownItemButton=Li.creatNew();

		DropDownItemButton.addClass("form-control btn btn-default correction-dropdown-btn-css");

		DropDownItemButton.onClickListener=function(CALL_BACK){
			DropDownItemButton.ui.bind("click",function(ev){
				CALL_BACK($(this),ev);
			});
		}

		return DropDownItemButton;
	}
}






