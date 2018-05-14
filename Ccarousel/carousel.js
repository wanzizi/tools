function Carousel(obj){
	//传入的是字符串还是dom
	this.el = typeof obj.el === 'string' ? document.querySelector(obj.el) : obj.el
	if(!this.el){
		console.error('找不到容器，请检查传入的el是否有误')
		return
	}
	this.width = obj.width || '100%'
	this.height = obj.height || '100%'
	this.init()
}

Carousel.prototype = {
	init:function(){
		this.carouselDom = this.el.querySelector('[carousel-item]')
		this.initCarouselDomStyle()
		this.initChildrenStyle()
	},
	initCarouselDomStyle(){
		this.carouselDom.style.position = 'relative'
		this.carouselDom.style.overflow = 'hidden'
		this.carouselDom.style.width = this.width
		this.carouselDom.style.height = this.height
	},
	initChildrenStyle(){
		var carouselChildren = this.carouselDom.childNodes
		this.carouselChilds = []
		var self = this
		carouselChildren.forEach(function(item){
			if(item.nodeType === 1){ //获取dom设置样式
				self.carouselChilds.push(item)
				item.style.position = 'absolute'
				item.style.top = 0
				item.style.left = 0
				item.style.display = 'none'
				item.style.width = self.width
				item.style.height = self.height
				item.style.transition = 'all 0.5s'
				item.style['-moz-transition'] = 'all 0.5s'
				item.style['-webkit-transition'] = 'all 0.5s'
				item.style['-o-transition'] = 'all 0.5s'
			}
		})
		this.carouselChilds[0].style.display = 'block'
	}
}
