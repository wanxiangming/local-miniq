
//UrlMap
// {urlName:"",url:""},
// minclude("");
var UrlMap={};

UrlMap.js="assets/js/";

UrlMap.uitool=UrlMap.js+"uitool/";
UrlMap.util=UrlMap.js+"util/";

UrlMap.activity=UrlMap.js+"activity/";
	UrlMap.activity_main=UrlMap.activity+"main/";
		UrlMap.activity_main_transaction_table=UrlMap.activity_main+"transaction-table/";

	UrlMap.activity_table=UrlMap.activity+"table/";
		UrlMap.activity_table_table_info=UrlMap.activity_table+"table-info/";
		UrlMap.activity_table_table_manage=UrlMap.activity_table+"table-manage/";

	UrlMap.activity_user=UrlMap.activity+"user/";

UrlMap.module=UrlMap.js+"module/";

UrlMap.map=[
	//uitool/
	{urlName:"Div",url:UrlMap.uitool+"div/Div.js"},
		{urlName:"FadeDiv",url:UrlMap.uitool+"div/subclass/fade-div/FadeDiv.js"},

	{urlName:"Button",url:UrlMap.uitool+"button/Button.js"},
	{urlName:"PopoverButton",url:UrlMap.uitool+"button/PopoverButton.js"},
	{urlName:"Span",url:UrlMap.uitool+"span/Span.js"},
	{urlName:"DropDownListItem",url:UrlMap.uitool+"listitem/DropDownListItem.js"},
	{urlName:"DropDown",url:UrlMap.uitool+"dropdown/DropDown.js"},
	{urlName:"DropDownItemButton",url:UrlMap.uitool+"dropdown/DropDownItemButton.js"},
	{urlName:"Li",url:UrlMap.uitool+"li/Li.js"},
	{urlName:"LoaderPiano",url:UrlMap.uitool+"loader/LoaderPiano.js"},
	{urlName:"Alerts",url:UrlMap.uitool+"alerts/Alerts.js"},
	{urlName:"Dl",url:UrlMap.uitool+"dl/Dl.js"},
	{urlName:"Ui",url:UrlMap.uitool+"Ui.js"},
	{urlName:"Ul",url:UrlMap.uitool+"ul/Ul.js"},

	//util/
	{urlName:"MDate",url:UrlMap.util+"MDate.js"},
	{urlName:"TextTranslator",url:UrlMap.util+"TextTranslator.js"},
	{urlName:"InputController",url:UrlMap.util+"InputController.js"},

	//activity/table/table-info/
	{urlName:"ParentTableItem",url:UrlMap.activity_table_table_info+"parent-table/ParentTableItem.js"},
	{urlName:"ChildTableItem",url:UrlMap.activity_table_table_info+"child-table/ChildTableItem.js"},
	{urlName:"FollowerDataStructure",url:UrlMap.activity_table_table_info+"data-structure/FollowerDataStructure.js"},
	{urlName:"TableInfoDataStructure",url:UrlMap.activity_table_table_info+"data-structure/TableInfoDataStructure.js"},
	{urlName:"FollowerItem",url:UrlMap.activity_table_table_info+"follower/FollowerItem.js"},
	{urlName:"FollowerItemAryIterator",url:UrlMap.activity_table_table_info+"follower/FollowerItemAryIterator.js"},
	{urlName:"FollowerItemFilter",url:UrlMap.activity_table_table_info+"follower/FollowerItemFilter.js"},
	{urlName:"GetTableInfoNET",url:UrlMap.activity_table_table_info+"internet/GetTableInfoNET.js"},
	{urlName:"InheritSearchResult",url:UrlMap.activity_table_table_info+"this-table/InheritSearchResult.js"},
	{urlName:"TableItem",url:UrlMap.activity_table_table_info+"this-table/TableItem.js"},
	{urlName:"TableItemInheritEdit",url:UrlMap.activity_table_table_info+"this-table/TableItemInheritEdit.js"},

	//activity/table/table-manage/


	//activity/mian/transaction-table/
	{urlName:"DaylogManager",url:UrlMap.activity_main_transaction_table+"DaylogManager.js"},
	{urlName:"Daylog",url:UrlMap.activity_main_transaction_table+"Daylog.js"},
	{urlName:"DateItem",url:UrlMap.activity_main_transaction_table+"DateItem.js"},
	{urlName:"TransactionItem",url:UrlMap.activity_main_transaction_table+"TransactionItem.js"},
	{urlName:"TransactionItemContainer",url:UrlMap.activity_main_transaction_table+"TransactionItemContainer.js"},
	{urlName:"TimeSameTransactionItem",url:UrlMap.activity_main_transaction_table+"TimeSameTransactionItem.js"},
	{urlName:"Table",url:UrlMap.activity_main_transaction_table+"datastructure/Table.js"},
	{urlName:"AttentionTable",url:UrlMap.activity_main_transaction_table+"datastructure/AttentionTable.js"},
	{urlName:"Transaction",url:UrlMap.activity_main_transaction_table+"datastructure/Transaction.js"},
	{urlName:"TransactionDataStructure",url:UrlMap.activity_main_transaction_table+"datastructure/TransactionDataStructure.js"},
	{urlName:"CreateTransactionModal",url:UrlMap.activity_main_transaction_table+"modal/CreateTransactionModal.js"},
	{urlName:"TimeSameTransactionModal",url:UrlMap.activity_main_transaction_table+"modal/TimeSameTransactionModal.js"},
	{urlName:"ChangeTransactionModal",url:UrlMap.activity_main_transaction_table+"modal/ChangeTransactionModal.js"},
	{urlName:"AttentionTableInfoManager",url:UrlMap.activity_main_transaction_table+"internet/AttentionTableInfoManager.js"},
	{urlName:"AttentionTableAryManager",url:UrlMap.activity_main_transaction_table+"datastructure/AttentionTableAryManager.js"}

	//activity/user/
	// {urlName:"",url:UrlMap.activity_user+""},

	//activity/main/
	// {urlName:"",url:UrlMap.activity_main+""},
	
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

UrlMap.mapFlag=[];


/**
 * minclude(ObjName)
 */
function minclude(OBJ_NAME){
	var url=UrlMap.getUrl(OBJ_NAME);
	if(url != null  &&  $.inArray(url,UrlMap.mapFlag) < 0){
		UrlMap.mapFlag.push(url);
		console.log(url);
		document.write('<script' + ' type="text/javascript" src="'+url+'">' + '</script>');
	}
}

