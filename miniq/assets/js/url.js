
// {urlName:"",url:""},
// minclude("");
var UrlMap={};

UrlMap.js="assets/js/";

UrlMap.uitool=UrlMap.js+"uitool/";
UrlMap.util=UrlMap.js+"util/";

UrlMap.activity=UrlMap.js+"activity/";
UrlMap.activity_main=UrlMap.activity+"main/";
UrlMap.activity_table=UrlMap.activity+"table/";
UrlMap.activity_user=UrlMap.activity+"user/";

UrlMap.module=UrlMap.js+"module/";
UrlMap.module_table=UrlMap.module+"table/";

UrlMap.map=[
	//uitool/
	{urlName:"Div",url:UrlMap.uitool+"div/Div.js"},
	{urlName:"Button",url:UrlMap.uitool+"button/Button.js"},
	{urlName:"PopoverButton",url:UrlMap.uitool+"button/PopoverButton.js"},
	{urlName:"Span",url:UrlMap.uitool+"span/Span.js"},
	{urlName:"DropDownListItem",url:UrlMap.uitool+"listitem/DropDownListItem.js"},
	{urlName:"DropDown",url:UrlMap.uitool+"dropdown/DropDown.js"},
	{urlName:"DropDownItemButton",url:UrlMap.uitool+"dropdown/DropDownItemButton.js"},
	{urlName:"Li",url:UrlMap.uitool+"li/Li.js"},
	{urlName:"LoaderPiano",url:UrlMap.uitool+"loader/LoaderPiano.js"},

	//util/
	{urlName:"MDate",url:UrlMap.util+"MDate.js"},
	{urlName:"TextTranslator",url:UrlMap.util+"TextTranslator.js"},
	{urlName:"InputController",url:UrlMap.util+"InputController.js"},

	//activity/table/
	{urlName:"TableInfo",url:UrlMap.activity_table+"TableInfo.js"},
	{urlName:"ParentTableItem",url:UrlMap.activity_table+"parent-table/ParentTableItem.js"},
	{urlName:"ChildTableItem",url:UrlMap.activity_table+"child-table/ChildTableItem.js"},
	{urlName:"FollowerDataStructure",url:UrlMap.activity_table+"data-structure/FollowerDataStructure.js"},
	{urlName:"TableInfoDataStructure",url:UrlMap.activity_table+"data-structure/TableInfoDataStructure.js"},
	{urlName:"FollowerItem",url:UrlMap.activity_table+"follower/FollowerItem.js"},
	{urlName:"FollowerItemAryIterator",url:UrlMap.activity_table+"follower/FollowerItemAryIterator.js"},
	{urlName:"FollowerItemFilter",url:UrlMap.activity_table+"follower/FollowerItemFilter.js"},
	{urlName:"GetTableInfoNET",url:UrlMap.activity_table+"internet/GetTableInfoNET.js"},
	{urlName:"InheritSearchResult",url:UrlMap.activity_table+"this-table/InheritSearchResult.js"},
	{urlName:"TableItem",url:UrlMap.activity_table+"this-table/TableItem.js"},
	{urlName:"TableItemInheritEdit",url:UrlMap.activity_table+"this-table/TableItemInheritEdit.js"},

	//activity/user/
	// {urlName:"",url:UrlMap.activity_user+""},

	//activity/main/
	// {urlName:"",url:UrlMap.activity_main+""},
	
	//module/table/
	{urlName:"DaylogManager",url:UrlMap.module_table+"DaylogManager.js"},
	{urlName:"Daylog",url:UrlMap.module_table+"Daylog.js"},
	{urlName:"DateItem",url:UrlMap.module_table+"DateItem.js"},
	{urlName:"TransactionItem",url:UrlMap.module_table+"TransactionItem.js"},
	{urlName:"TransactionItemContainer",url:UrlMap.module_table+"TransactionItemContainer.js"},
	{urlName:"TimeSameTransactionItem",url:UrlMap.module_table+"TimeSameTransactionItem.js"},
	{urlName:"Table",url:UrlMap.module_table+"datastructure/Table.js"},
	{urlName:"AttentionTable",url:UrlMap.module_table+"datastructure/AttentionTable.js"},
	{urlName:"Transaction",url:UrlMap.module_table+"datastructure/Transaction.js"},
	{urlName:"TransactionDataStructure",url:UrlMap.module_table+"datastructure/TransactionDataStructure.js"},
	{urlName:"CreateTransactionModal",url:UrlMap.module_table+"modal/CreateTransactionModal.js"},
	{urlName:"TimeSameTransactionModal",url:UrlMap.module_table+"modal/TimeSameTransactionModal.js"},
	{urlName:"ChangeTransactionModal",url:UrlMap.module_table+"modal/ChangeTransactionModal.js"},
	{urlName:"AttentionTableInfoManager",url:UrlMap.module_table+"internet/AttentionTableInfoManager.js"}
];

UrlMap.getUrl=function(MAP_NAME){
	var url=null;
	$.each(UrlMap.map,function(index, el) {
		if(el.urlName == MAP_NAME){
			url=el.url;
		}
	});
	return url;
}


/**
 * minclude(ObjName)
 */
function minclude(OBJ_NAME){
	var url=UrlMap.getUrl(OBJ_NAME);
	if(url != null){
		document.write('<script' + ' type="text/javascript" src="'+url+'">' + '</script>');
	}
}










