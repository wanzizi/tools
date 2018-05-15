function Drag(obj){
	//传入的是字符串还是dom
	this.el = typeof obj.el === 'string' ? document.querySelector(obj.el) : obj.el
	if(!this.el){
		console.error('找不到容器，请检查传入的el是否有误')
		return
	}
	this.init()
}

Drag.prototype = {
	init:function(){
		this.el.style.position = 'relative'
		var _this = this
		var childs = this.el.getElementsByTagName('li')
		var liHeight = childs[0].offsetHeight
		for(var i=0;i<childs.length;i++){
			drag(childs[i])
			function drag(item){
				item.onmousedown = function(ev){
					var ev = ev || event
					var oringinX = ev.clientX - ev.target.offsetLeft
					var oringinY = ev.clientY - ev.target.offsetTop
					
					var blank = document.createElement('li')
					blank.style.visibility = 'hidden'
					blank.style.height = liHeight
					_this.el.insertBefore(blank,ev.target.nextSibling)
					
					ev.target.style.position = 'absolute'
					ev.target.style.width = '100%'
					ev.target.style.border = '2px dashed #ccc'
					ev.target.style.backgroundColor = '#f5f5f5'
					
					document.onmousemove = function(ev){
						index = Math.ceil((ev.clientY - _this.el.offsetTop)/liHeight - 1)
						_this.el.insertBefore(blank,childs[index])
						
						ev.target.style.top = ev.clientY - oringinY + 'px'
						ev.target.style.left = ev.clientX - oringinX + 'px'
					}
					document.onmouseup = function(ev){
						_this.el.insertBefore(ev.target,blank)
						ev.target.removeAttribute('style')
						_this.el.removeChild(blank);
						document.onmousemove = null;
						document.onmouseup = null;
					}
				}
			}
		}
	}
}
