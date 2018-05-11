function Page(obj){
	//传入的是字符串还是dom
	this.el = typeof obj.el === 'string' ? document.querySelector(obj.el) : obj.el
	if(!this.el){
		console.error('找不到容器，请检查传入的el是否有误')
		return
	}
	this.pages = obj.pages
	this.jump = obj.jump
	this.init()
}

Page.prototype = {
	init(){
		this.pageNums = {
			pageNum:Math.ceil(pages.count/pages.pageSize), //总页数
			splitNum:3 //超过5页就显示省略号
		}
		this.pageStrs = {
			ellipsisStr: '<li><a class="ellipsis">...</a><li>',
			firstStr: '<li><a id="J_first">&lt;</a></li>',
			lastStr: '<li><a id="J_last">&gt;</a></li>'
		}
		var str = this.pageStrs.firstStr
		if(this.pageNums.pageNum === 1){
			str += this.getPageItem(1)
		}else if(this.pageNums.pageNum <= this.pageNums.splitNum){
			str += this.getPageItems(this.pageNums.pageNum)
		}else{
			str += this.renderPage()
		}
		str += this.pageStrs.lastStr
		
		this.el.innerHTML = str
		
		document.querySelector('#J_first').setAttribute("disabled", "disabled");
		if(this.pageNums.pageNum === 1){
			document.querySelector('#J_last').setAttribute("disabled", "disabled");
		}
		
		document.querySelectorAll('.js-page-item')[0].className += ' active'
		this.renderPageClick()
	},
	renderPageClick(){
		var self = this
		document.querySelector('#J_first').onclick = function(){
			self.goForward.call(self,this)
		}
		document.querySelector('#J_last').onclick = function(){
			self.goNext.call(self,this)
		}
		document.querySelectorAll('.js-page-item').forEach(function(item){
			item.onclick = function(){
				self.goToPage.call(self,this)
			}
		})
	},
	renderPage(){
		return this.getPageItems(this.pageNums.splitNum) + this.pageStrs.ellipsisStr + this.getPageItem(this.pageNums.pageNum)
	},
	reRenderPage(ev,activeIndex){
		var str = this.pageStrs.firstStr	
		
		var ellipsisStr = this.getPageItem(1) + this.pageStrs.ellipsisStr
		if(activeIndex <= this.pageNums.splitNum){
			str += this.renderPage()
		}else if(activeIndex <= (this.pageNums.pageNum - this.pageNums.splitNum)){	
			str += ellipsisStr + this.getPageItems((activeIndex+1),(activeIndex-2)) + this.pageStrs.ellipsisStr
			str += this.getPageItem(this.pageNums.pageNum)
		}else{
			str += ellipsisStr + this.getPageItems(this.pageNums.pageNum,(this.pageNums.pageNum-3))
		}
		
		str += this.pageStrs.lastStr
		
		this.el.innerHTML = str
		var nowEv = ''
		if(activeIndex <= this.pageNums.splitNum){
			nowEv = ev
		}else if(activeIndex <= (this.pageNums.pageNum - this.pageNums.splitNum)){	
			nowEv = document.querySelectorAll('.js-page-item')[this.pageNums.splitNum-1]
		}else{
			var length = document.querySelectorAll('.js-page-item').length
			nowEv = document.querySelectorAll('.js-page-item')[length - (this.pageNums.pageNum - activeIndex) - 1]
		}
		this.pageChange(nowEv)
		this.renderPageClick()
	},
	getPageItem(index){
		return '<li><a class="js-page-item" data-page='+index+'>'+index+'</a></li>'
	},
	getPageItems(max,mix){
		var thisMix = (mix && (mix > 0)) ? mix : 0
		var thisMax = (max && (max <= this.pageNums.pageNum)) ? max : this.pageNums.pageNum
		let str = ''
		for(var i=thisMix;i<thisMax;i++){
			str += this.getPageItem((i+1))
		}
		return str
	},
	goToPage(ev){
		var current = parseInt(ev.getAttribute('data-page'))
		this.reRenderPage(ev,current)
	},
	goForward(ev){
		var current = document.querySelector('.js-page-item.active').getAttribute('data-page')
		if(current > 1){
			var nowEv = document.querySelectorAll('.js-page-item')[current-1-1]
			if((current-1) >= this.pageNums.splitNum){
				this.reRenderPage(nowEv,(parseInt(current) - 1))
			}else{				
				this.pageChange(nowEv)
			}
		}
	},
	goNext(ev){
		var current = document.querySelector('.js-page-item.active').getAttribute('data-page')
		if(current < this.pageNums.pageNum){
			var nowEv = document.querySelectorAll('.js-page-item')[current]
			if(current >= this.pageNums.splitNum){
				this.reRenderPage(nowEv,(parseInt(current) + 1))
			}else{				
				this.pageChange(nowEv)
			}
		}
	},
	pageChange(ev){
		var current = 0
		document.querySelectorAll('.js-page-item').forEach(function(item,i){
			if(ev.getAttribute('data-page') === item.getAttribute('data-page')){
				ev = item
				ev.className = 'js-page-item active'
				current = parseInt(ev.getAttribute('data-page'))
			}else{
				item.className = 'js-page-item'
			}
		})
		if(ev){				
			if(ev.getAttribute('data-page') <= 1){
				document.querySelector('#J_first').setAttribute("disabled", "disabled");
			}else{
				document.querySelector('#J_first').removeAttribute("disabled");
			}
			if(ev.getAttribute('data-page') >= this.pageNums.pageNum){
				document.querySelector('#J_last').setAttribute("disabled", "disabled");
			}else{
				document.querySelector('#J_last').removeAttribute("disabled");
			}
			this.jump(current)
		}
	}
}
