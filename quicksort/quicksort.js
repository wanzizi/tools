function quicksort(arr){
	if(arr.length <= 1){
		return arr
	}
//	 ~~(arr.length / 2) 按位非运算符:改变运算数的符号并减去1
	var middle = Math.floor(arr.length/2)
	var moddleItem = arr.splice(middle,1)

	var left = [],
		right = []
	arr.forEach(function(t){
		if(t < moddleItem[0]){
			left.push(t)
		}else{
			right.push(t)
		}
	})
	return quicksort(left).concat(moddleItem,quicksort(right))
}

console.time("arrSort")
var count = 2000;
var arr = [];
for(var i=0; i<count; i++){
	arr.push(Math.floor(Math.random() * count));
}
quicksort(arr)
console.timeEnd("arrSort");

//function quickSort(a) {
//return a.length <= 1 ? a : quickSort(a.slice(1).filter(item => item <= a[0])).concat(a[0], quickSort(a.slice(1).filter(item => item > a[0])));
//}