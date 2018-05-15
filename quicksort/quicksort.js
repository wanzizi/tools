function quicksort(arr){
	if(arr.length <= 1){
		return arr
	}
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
//	console.log(moddleItem,left,right)
	return quicksort(left).concat(moddleItem,quicksort(right))
}

var thisArr = [27,90,88,65,32,47,78]
console.log(quicksort(thisArr))

