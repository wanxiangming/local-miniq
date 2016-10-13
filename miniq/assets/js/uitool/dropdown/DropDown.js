document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/div/Div.js"+'">' + '</script>');
document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/button/Button.js"+'">' + '</script>');
document.write('<script' + ' type="text/javascript" src="'+"assets/js/uitool/ul/Ul.js"+'">' + '</script>');


/**
 * DropDown(Html)
 * 		appendTo()
 * 		addMenuItem()
 * 		openMenu()
 * 		closeMenu()
 * 		show()
 * 		hide()
 */

var DropDown={
	creatNew:function(BTN_HTML){
		var DropDown={};

		var div=Div.creatNew();
		var dropDownBtn=Button.creatNew();
		var ul=Ul.creatNew();

		div.addClass("dropdown");

		dropDownBtn.addClass("btn btn-default dropdown-toggle correction-cancel-border");
		dropDownBtn.setAttribute("type","button");
		dropDownBtn.setAttribute("data-toggle","dropdown");
		dropDownBtn.setAttribute("aria-haspopup","true");
		dropDownBtn.setAttribute("aria-expanded","false");
		dropDownBtn.html(BTN_HTML);

		ul.addClass("dropdown-menu correction-dropdown-menu-padding correction-cancel-border");
		ul.setAttribute("role","menu");

		dropDownBtn.appendTo(div.ui);
		ul.appendTo(div.ui);

		DropDown.appendTo=function(SCOP){
			div.appendTo(SCOP);
		}

		DropDown.addMenuItem=function(ITME){
			ITME.appendTo(ul.ui);
		}

		DropDown.show=function(){
			dropDownBtn.removeClass('hide');
		}

		DropDown.hide=function(){
			dropDownBtn.addClass('hide');
		}

		DropDown.openMenu=function(){
			div.addClass('open');
		}

		DropDown.closeMenu=function(){
			div.removeClass('open');
		}

		return DropDown;
	}
}




var DropDownItemButton={
	creatNew:function(){
		var DropDownItemButton=Button.creatNew();

		DropDownItemButton.addClass("form-control btn btn-default correction-dropdown-btn-css");

		return DropDownItemButton;
	}
}























