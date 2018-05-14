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
		var _this = this
		this.el.onmousedown = function(ev){
			document.onmousemove = function(ev){
				
			}
			document.onmouseup = function(ev){
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
		
	}
}
