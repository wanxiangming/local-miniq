

minclude("Table");
/**
 *	parentTableAry
 *	isManager 	//这个数据在服务器上判断，我们仅告诉服务器我们的openId，服务器去查询link表，然后用是否是管理员，是否是该表创建者来决定isManager字段
 *	tableAnotherName
 * 
 * AttentionTable()
 * 		setIsManager(boolean)
 * 		isManager()				//manager要弃用，因为以后凡是attention的table，就是manager
 *
 * 		setInheritAry(array inheritAry)	//inherit是一个以子表为key，父表为value的数组
 * 		setParentTableAry(Table_Ary)
 * 		
 * 		addParentTable(Table)
 * 		parentTableIterator(CALL_BACL(Table))	//父表的迭代器
 * 		findParentTable(int tableId)	//有则返回Table对象，没有返回null
 * 		entrance(int tableId)			//有则返回Table对象，没有返回null,用tableId去InheritAry中找，
 *
 *
 * 		来自父：
 * 		setTableId(id)
 * 		getTableId()
 * 		setTableName(tableName)
 * 		getTableName()
 */
var AttentionTable={
	creatNew:function(){
		var AttentionTable=Table.creatNew();

		var parentTableAry=[];
		var isManager;
		var inheritAry;

		AttentionTable.setIsManager=function(BOOLEAN){
			isManager=BOOLEAN;
		}

		AttentionTable.setInheritAry=function(INHERIT_ARY){
			inheritAry=INHERIT_ARY;
		}

		AttentionTable.isManager=function(){
			return true;
		}

		AttentionTable.setParentTableAry=function(PARENT_TABLE_ARY){
			parentTableAry=PARENT_TABLE_ARY;
		}

		AttentionTable.addParentTable=function(TABLE){
			parentTableAry.push(TABLE);
		}

		AttentionTable.parentTableIterator=function(CALL_BACL){
			$.each(parentTableAry,function(index, el) {
				CALL_BACL(el);
			});
		}

		AttentionTable.findParentTable=function(TABLE_ID){
			return findParentTable(TABLE_ID);
		}

		AttentionTable.entrance=function(TABLE_ID){
			var tableId=Number(TABLE_ID);
			if(tableId == AttentionTable.getTableId()){	//如果该tableId就是这个attentionTable的ID，说明不存在入口，此时应该返回null
				return null;
			}
			else{
				var key=true;
				var result;
				while(key){
					result=findKey(tableId);
					if(result == AttentionTable.getTableId()){
						//tableId是入口
						key=false;
					}
					else{
						tableId=result;
					}
				}
				//用tableId去找到table
				return findParentTable(tableId);
			}	
		}

		function findParentTable(TABLE_ID){
			var table=null;
			$.each(parentTableAry,function(index, el) {
				if(el.getTableId() == TABLE_ID){
					table=el;
				}
			});
			return table;
		}

		function findKey(VALUE){
			var key=null;
			$.each(inheritAry,function(index, el) {
				if(el[1] == VALUE){
					key=el[0];
				}
			});
			
			return key;
		}

		return AttentionTable;
	}
}
