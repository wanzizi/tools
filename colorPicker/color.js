function Color(opt){
	for(var attr in opt){
		this[attr] = opt[attr]
	}
	this.init()	
}

Color.prototype.init = function(){
	this.moveHueSlider()
	this.moveMainSlider()

//	初始颜色
	this.rgbHueObj = this.getHeight(0)
	this.setMainColor()
	this.hueSliderTop = 0
	this.getMainPosition()
}

//hueslider里的鼠标事件
Color.prototype.moveHueSlider = function(){
	var isDrug = false
	var startY = 0
	var _this = this
	document.querySelector('#J_hue_bar').onclick = function(ev){
//		根据是否有移动来区分点击事件和拖拽事件
		if(ev.offsetY===startY){			
			_this.getHuePosition(ev)
		}
	}
	
	document.querySelector('#J_hue_bar').onmousedown = function(ev){
		startY = ev.offsetY
		isDrug=true
	}
	document.querySelector('#J_hue_bar').onmousemove = function(ev){
		if(isDrug && ev.target.id==='J_hue_bar'){	
			_this.getHuePosition(ev)
		}
	}
	document.querySelector('#J_hue_bar').onmouseup = function(ev){
		isDrug=false
	}
}

//获取hueslider鼠标的位置
Color.prototype.getHuePosition=function(ev){
	let sliderHei = document.querySelector('#J_hue_slider').offsetHeight
	let top = 0
	if(ev.offsetY > 0 && (sliderHei + ev.offsetY) < this.height){
		top = ev.offsetY
	}else if((sliderHei + ev.offsetY) >= this.height){
		top = this.height - sliderHei
	}
	document.querySelector('#J_hue_slider').style.top = top + 'px'
	this.hueSliderTop = top
	
	this.rgbHueObj = this.getHeight(top)
	this.setMainColor()
	this.getMainPosition()
}

//给colormain设置背景颜色
Color.prototype.setMainColor = function(){
	document.querySelector('#J_color_main').style.backgroundColor = 'rgb('+this.rgbHueObj.r+','+this.rgbHueObj.g+','+this.rgbHueObj.b+')'
}

//获取hueSlider鼠标在哪个H区间
Color.prototype.getHeight = function(top){
	var oneHeight = this.height/6
	var d=0
	var rgbObj = {
		r:0,
		g:0,
		b:0
	}
	switch (true){
		case (top<oneHeight*1):
			d = (top/oneHeight)*255;
			rgbObj = {
				r:255,
				g:0,
				b:Math.round(d)
			}
			break;
		case (top>=oneHeight*1 && top<oneHeight*2):
			d = 255 - ((top-oneHeight)/oneHeight)*255;
			rgbObj = {
				r:Math.round(d),
				g:0,
				b:255
			}
			break;
		case (top>=oneHeight*2 && top<oneHeight*3):
			d = ((top-2*oneHeight)/oneHeight)*255;
			rgbObj = {
				r:0,
				g:Math.round(d),
				b:255
			}
			break;
		case (top>=oneHeight*3 && top<oneHeight*4):
			d = 255-((top-3*oneHeight)/oneHeight)*255;
			rgbObj = {
				r:0,
				g:255,
				b:Math.round(d)
			}
			break;
		case (top>=oneHeight*4 && top<oneHeight*5):
			d = ((top-oneHeight*4)/oneHeight)*255;
			rgbObj = {
				r:Math.round(d),
				g:255,
				b:0
			}
			break;
		default:
			d = 255 - ((top-oneHeight*5)/oneHeight)*255;
			rgbObj = {
				r:255,
				g:Math.round(d),
				b:0
			}
	}
	return rgbObj;
}

//colormain鼠标事件
Color.prototype.moveMainSlider = function(){
	var isDrug = false
	var startY = 0
	var _this = this
	document.querySelector('#J_color_main').onclick = function(ev){
//		根据是否有移动来区分点击事件和拖拽事件
		if(ev.offsetY===startY){			
			_this.getMainPosition(ev)
		}
	}
	
	document.querySelector('#J_color_main').onmousedown = function(ev){
		startY = ev.offsetY
		isDrug=true
	}
	document.querySelector('#J_color_main').onmousemove = function(ev){
		if(isDrug && ev.target.id==='J_color_main'){	
			_this.getMainPosition(ev)
		}
	}
	document.querySelector('#J_color_main').onmouseup = function(ev){
		isDrug=false
	}
}

Color.prototype.getMainPosition = function(ev){
	var offsetX = (ev&&ev.offsetX) || document.querySelector('#J_main_slider').offsetLeft
	var offsetY = (ev&&ev.offsetY) || document.querySelector('#J_main_slider').offsetTop
	document.querySelector('#J_main_slider').style.top = offsetY + 'px'
	document.querySelector('#J_main_slider').style.left = offsetX + 'px'

	var H = 0,S = 0,V = 0
	// 1是约数，360，100，100分别是h，s，v的最大值
	H = Math.round(360*(1 - this.hueSliderTop/this.height))
	S = Math.round(100*(offsetX/document.querySelector('#J_color_main').offsetWidth))
	V = Math.round(100*(1-offsetY/this.height))
	this.rgbObj = this.hsvTorgb(H/360,S/100,V/100)
	this.getHSV({
		h:H,
		s:S,
		v:V
	})
	// console.log(this.rgbObj)
	this.getRGB(this.rgbObj)
}

//HSB(V)转换为RGB，0<=H<1，0<=S,V<=1
Color.prototype.hsvTorgb = function(H, S, V){
	var R, G, B;
    if (S == 0){
        R = G = B = V;
    }else{
        var _H = H * 6;
        if (_H == 6){
            _H = 0;
        }
        var i = Math.floor(_H);
        var v1 = V*(1 - S);
        var v2 = V*(1 - S*(_H - i ));
        var v3 = V*(1 - S*(1 - (_H - i)));
        if (i == 0){
            R = V;
            G = v3;
            B = v1;
        }else if(i == 1){
            R = v2;
            G = V;
            B = v1;
        }else if(i == 2){
            R = v1;
            G = V;
            B = v3;
        }else if(i == 3){
            R = v1;
            G = v2;
            B = V;
        }else if(i == 4){
            R = v3;
            G = v1;
            B = V;
        }else{
            R = V;
            G = v1;
            B = v2; 
        }
    }
    return {r: Math.round(R*255), g: Math.round(G*255), b: Math.round(B*255)};
}

Color.prototype.rgbTohsv = function (R,G,B){
	var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}
