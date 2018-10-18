function Calendar(obj){
    this.el = typeof obj.el === 'string' ? document.querySelector(obj.el) : (this.isDom(obj.el)?obj.el:'')
	if(!this.el){
        console.error('找不到容器，请检查传入的el是否有误')
		return
    }
    for(let attr in obj){
        if(attr !=='el'){
            this[attr] = obj[attr]
        }
    }
    this.separator = this.separator || '-' 
    this.init()
}

Calendar.prototype = {
    isDom:function(el){
        if( typeof HTMLElement === 'object' ) {
            return el instanceof HTMLElement;
        }else{
            return el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string';
        }
    },
    init:function(){
    	this.el.innerHTML = `
    		<div class="cn-canlendar-box">
				<input class="cn-canlendar-input" type="text" id="J_cn_canlandar_input">
				<div id="J_cn_canlandar_container" class="cn-canlendar-container" style="display:none"></div>
    		</div>
		`
//  	style="top: ${this.el.offsetTop + this.el.offsetHeight + 40}px; left: ${this.el.offsetLeft}px;"

		document.querySelector('#J_cn_canlandar_input').onfocus = this.toggleInput.bind(this,true)

        this.initDate()
        this.initheader()
        this.initWeek()
        this.initDaysBody()
        this.initDays()
    },
    toggleInput(status){
    	document.querySelector('#J_cn_canlandar_container').style.display = status?'block':'none'
    },
    initDate:function(){
        let getDate = this.date ? new Date(this.date) : new Date()
        try{
            if(!(getDate instanceof Date)){
                getDate = new Date()
                throw 'date请传入可被转换的日期格式，现转换出错，定位到今日'
            }
        }   
        catch(err){
            console.error(err)
        }
//      初始化时候的值
		let today = new Date()
		this.todayObj = {
			date: today,
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
		}
        this.dateObj = {
            date: getDate,
            year: getDate.getFullYear(),
            month: getDate.getMonth() + 1,
            day: getDate.getDate(),
            week: getDate.getDay(),
        }
//      用于记录往前往后时当前展示的年月
        this.currentObj = {
        	month:this.dateObj.month,
        	year:this.dateObj.year
        }
    },
    initheader:function(){
    	document.querySelector('#J_cn_canlandar_container').innerHTML = `
    		<div class="header">
    			<span id="J_current_date_display">${this.currentObj.year}年${this.currentObj.month}月</span>
    			<span class="header-arrow left" id="J_left_arrow"></span>
    			<span class="header-arrow right" id="J_right_arrow"></span>
    		</div>
    	`
    	document.querySelector('#J_left_arrow').onclick = this.clickLeft.bind(this)
    	document.querySelector('#J_right_arrow').onclick = this.clickRight.bind(this)
    },
    updateCurrentDisplay(){
    	document.querySelector('#J_current_date_display').innerHTML = `${this.currentObj.year}年${this.currentObj.month}月`
    },
    clickLeft:function(){
    	if(this.currentObj.month>1){
    		this.currentObj.month = this.currentObj.month - 1
    	}else{
    		this.currentObj.year = this.currentObj.year - 1
    		this.currentObj.month = 12
    	}
    	this.initDays()
    },
    clickRight:function(){
    	if(this.currentObj.month<12){
    		this.currentObj.month = this.currentObj.month + 1
    	}else{
    		this.currentObj.year = this.currentObj.year + 1
    		this.currentObj.month = 1
    	}
    	this.initDays()
    },
    initWeek:function(){
        this.weekList = ['日','一','二','三','四','五','六']
        this.weekHead = document.createElement('ul')
        this.weekHead.className = 'week-list'
        this.weekList.forEach(t=>{
        	this.weekHead.innerHTML += `<li class="week-item">${t}</li>`
        })
        document.querySelector('#J_cn_canlandar_container').appendChild(this.weekHead)
    },
    initDaysBody:function(){
    	this.dateBox = document.createElement('div')
        this.dateBox.className = 'date-box'
        document.querySelector('#J_cn_canlandar_container').appendChild(this.dateBox)
    },
    initDays:function(){
    	this.dateBox.innerHTML = ''
    	this.updateCurrentDisplay()
    	let currentYear = this.currentObj.year
    	let currentMonth = this.currentObj.month
    	
    	const weekLen = this.weekList.length

        let firstDay = new Date(currentYear, (currentMonth - 1), 1);
        let firstDayObj = {
        	week:firstDay.getDay(),
        	day:firstDay.getDate()
        };
        let lastMonthLastDay = new Date(currentYear, (currentMonth - 1), 0);
        let lastMonthLastDayObj = {
        	week:lastMonthLastDay.getDay(),
        	day:lastMonthLastDay.getDate()
        }
        let lastDay = new Date(currentYear, currentMonth, 0);
        let lastDayObj = {
        	week:lastDay.getDay(),
        	day:lastDay.getDate()
        }
       	
       	let weekNum = Math.ceil((lastDayObj.day - (weekLen-firstDayObj.week + 1))/weekLen) + 1
       
       	for(let i=0;i<weekNum;i++){
       		let line = document.createElement('ul')
       		line.className = 'week-list'
       		let startDay = weekLen - firstDayObj.week + 1

       		for(let j=0;j<weekLen;j++){
       			let normalDay = startDay + j + (i-1)*7
   				let lineDate = document.createElement('li')
	       		lineDate.className = 'week-item'
       			if(i===0){
		       		if(j<firstDayObj.week){
		       			lineDate.innerHTML = lastMonthLastDayObj.day - (firstDayObj.week - j) + 1
		       			lineDate.className += ' disabled'
		       		}else{
		       			lineDate.innerHTML =  firstDayObj.day + (j - firstDayObj.week)      			
		       		}
       			}else if(i<weekNum-1){
       				lineDate.innerHTML = normalDay
       			}else{
       				if(normalDay <= lastDayObj.day){
       					lineDate.innerHTML = normalDay
       				}else{
       					lineDate.innerHTML = j-lastDayObj.week
       					lineDate.className += ' disabled'
       				}
       			}
       			if(this.todayObj.year === currentYear && this.todayObj.month === currentMonth && this.todayObj.day === parseInt(lineDate.innerHTML)) {
       				lineDate.className += ' today'
       			}
       			let _this = this
       			lineDate.onclick = function(){
       				let thisValue = parseInt(this.innerHTML)
       				if(this.className.indexOf('disabled')>-1){
       					if(thisValue<weekLen){
//     						下个月的日期    	
							_this.clickRight()
       					}else{
//     						上个月的日期
							_this.clickLeft()
       					}
       				}else{
       					let formatDate = currentYear+_this.separator+add0(currentMonth)+_this.separator+add0(thisValue)
	       				_this.clickDate({
	       					day:thisValue,
	       					month:currentMonth,
	       					year:currentYear,
	       					thisDate:new Date(currentYear,(currentMonth-1),thisValue),
							formatDate:formatDate
	       				})
	       				document.querySelector('#J_cn_canlandar_input').value = formatDate
	       				_this.toggleInput(false)
       				}
       			}
       			line.appendChild(lineDate)
       		}
       		this.dateBox.appendChild(line)
       	}
    }
}


function add0(num){
	return parseInt(num) < 10 ? '0'+num : num
}
