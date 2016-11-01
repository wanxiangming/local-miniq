
/**
 * Inherit(int tableId,int parentTableId)
 * 		getTableId()
 * 		getParentTableId()
 */

var Inherit={
	creatNew:function(TABLE_ID,PARENT_TABLE_ID){
		var Inherit={};

		var tableId=Number(TABLE_ID);
		var parentTableId=Number(PARENT_TABLE_ID);

		Inherit.getTableId=function(){
			return tableId;
		}

		Inherit.getParentTableId=function(){
			return parentTableId;
		}

		return Inherit;
	}
}
