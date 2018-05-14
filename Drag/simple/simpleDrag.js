function Drag(obj){
	this.el = document.querySelector(obj.el)
	this.init()
}

Drag.prototype = {
	init:function(){
		var self = this
		this.el.onmousedown = function(ev){
			var oringinX = ev.clientX - self.el.offsetLeft
			var oringinY = ev.clientY - self.el.offsetTop
			document.onmousemove = function(ev){
				self.el.style.top = ev.clientY - oringinY + 'px'
				self.el.style.left = ev.clientX - oringinX + 'px'
			}
			document.onmouseup = function(ev) {
	          var ev = ev || window.event;
	          document.onmousemove = null;
	          document.onmouseup = null;
	        }
		}
	}
}
