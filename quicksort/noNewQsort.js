//不创建新数组的快排
function quicksort(){
	this.swap = function(p1,p2){
		if(p1 === p2){
			return
		}
		var temp = this[p1]
		this[p1] = this[p2]
		this[p2] = temp
	}
	
	this.getPosition = function(start, end){
		if((end - start) <= 1){ //数组长度小于1就停止排序
			return
		}
		var storeIndex = start
		var pivot = this[end]
		for(var i = start;i<end;i++){
			if(this[i] <= pivot){
				this.swap(i,storeIndex)
				storeIndex++
			}
		}
		this.swap(storeIndex,end)
		
		this.getPosition(storeIndex,end)
		this.getPosition(start,(storeIndex-1))
	}
	
	this.getPosition(0,(this.length - 1))
	
	return this
}

console.time("noArrsort");
var count = 2000;
var arr = [];
for(var i=0; i<count; i++){
	arr.push(Math.floor(Math.random() * count));
}
var afterSortArr = quicksort.call(arr)
//console.log(JSON.stringify(afterSortArr))
console.timeEnd("noArrsort");
