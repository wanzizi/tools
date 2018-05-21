//https://segmentfault.com/a/1190000004620352#articleHeader0

//广度优先遍历
//从上到下,从左到右遍历
//模拟队列:先进先出
var levelOrderTraversal = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }

  var que = []
  que.push(node)
  while(que.length !== 0) {
    node = que.shift()
    console.log(node.value)
    if(node.left) que.push(node.left)
    if(node.right) que.push(node.right)
  }
}


//深度优先遍历
//二叉树的递归遍历主要分三种 --
//先（根）序遍历：根左右
//中（根）序遍历：左根右
//后（根）序遍历：左右根
//就是根是哪里访问的就是什么序,左右顺序不变
var preOrder = function (node) {
  if (node) {
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}

var inOrder = function (node) {
  if (node) {
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
  }
}	

var postOrder = function (node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.value);
  }
}

//非递归深度优先遍历
//模拟栈:先进后出
var preOrderUnRecur = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }
  var stack = []
  stack.push(node)
  while(stack.length !== 0) {
    node = stack.pop()
    console.log(node.value)    
    if(node.right) stack.push(node.right)
    if(node.left) stack.push(node.left)
  }
}

