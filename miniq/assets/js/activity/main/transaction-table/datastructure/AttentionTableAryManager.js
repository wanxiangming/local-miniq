

minclude("Table");
minclude("AttentionTable");
/**
 * AttentionTableAryManager()
 * 		addAttentionTable(AttentionTable)
 * 		getAllTableIdAry()		//返回的是你关注的表以及这些表的所有父表的tableId数组
 * 		getAttentionTableAry()	//返回的是AttetionTable对象的数组
 */
var AttentionTableAryManager={
	creatNew:function(){
		var AttentionTableAryManager={};

		var attentionTableAry=[];
		var allTableIdAry=[];

		(function(){

		})();

		AttentionTableAryManager.addAttentionTable=function(ATTENTION_TABLE){
			attentionTableAry.push(ATTENTION_TABLE);
			addTableId(ATTENTION_TABLE.getTableId());
			ATTENTION_TABLE.parentTableIterator(function(TABLE){
				addTableId(TABLE.getTableId());
			});
		}

		function addTableId(TABLE_ID){
			if($.inArray(TABLE_ID,allTableIdAry) < 0){
				allTableIdAry.push(TABLE_ID);
			}
		}

		AttentionTableAryManager.getAllTableIdAry=function(){
			return allTableIdAry;
		}

		AttentionTableAryManager.getAttentionTableAry=function(){
			return attentionTableAry;
		}


		return AttentionTableAryManager;
	}
}