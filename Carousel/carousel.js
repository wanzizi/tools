function Carousel(obj){
	//传入的是字符串还是dom
	this.el = typeof obj.el === 'string' ? document.querySelector(obj.el) : obj.el
	if(!this.el){
		console.error('找不到容器，请检查传入的el是否有误')
		return
	}
	this.width = obj.width || '100%'
	this.height = obj.height || '100%'
	this.timeSplit = obj.timeSplit || 500
	this.isAuto = obj.isAuto
	this.init()
}

Carousel.prototype = {
	init:function(){
		this.carouselDom = this.el.querySelector('[carousel-item]')
		
		this.initCarouselDomStyle()
		this.initChildrenStyle()
		this.initDots()
		this.initArrows()
		
		if(this.isAuto){			
			this.initAuto()
		}
	},
	initCarouselDomStyle(){
		this.el.style.position = 'relative'
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
				item.className += ' carousel-item'
				item.style.display = 'none'
				item.style.width = self.width
				item.style.height = self.height
			}
		})
		this.activeIndex = 0
		this.carouselChilds[this.activeIndex].style.display = 'block'
	},
	showActive(){
		this.dots.forEach(function(item){
			item.className = item.className.replace('active','')
		})
		this.dots[this.activeIndex].className += ' active'
		this.carouselChilds.forEach(function(item){
			item.style.display = 'none'
		})
		this.carouselChilds[this.activeIndex].style.display = 'block'
		this.carouselChilds[this.activeIndex].style.left = '100px'
		this.carouselChilds[this.activeIndex].style.left = '0'
	},
	initDots(){
		var ul = document.createElement('ul')
		ul.className = 'dot-list'
		this.dots = []
		var self = this
		this.carouselChilds.forEach(function(item,i){
			var li = document.createElement(li)
			li.className = 'dot-item'
			if(i === 0){
				li.className += ' active'
			}
			li.onclick = function(){
				self.activeIndex = i
				self.showActive()
			}
			ul.appendChild(li)
			self.dots.push(li)
		})
		this.el.appendChild(ul)
	},
	initArrows(){
		var self = this
		var leftA = document.createElement('a')
		leftA.className = 'arrow arrow-left'
		leftA.innerHTML = '&lt;'
		leftA.onclick = function(){			
			self.clickArrow(-1)
		}
		
		var rightA = document.createElement('a')
		rightA.className = 'arrow arrow-right'
		rightA.innerHTML = '&gt;'
		rightA.onclick =function(){			
			self.clickArrow(1)
		}
		
		this.el.appendChild(leftA)
		this.el.appendChild(rightA)
	},
	initAuto(){
		var self = this
		this.time = setInterval(function(){
			self.clickArrow(1)
		},this.timeSplit)
	},
	clickArrow(num){
		var activeIndex = this.activeIndex + num
		var max = this.carouselChilds.length - 1
		
		if(activeIndex < 0){
			activeIndex = max
		}else if(activeIndex > max){
			activeIndex = 0
		}
		this.activeIndex = activeIndex
		this.showActive()
	}
}
