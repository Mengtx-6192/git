/*
 获取文本内容的兼容处理-----innerText/textContent
 * */

/*获取任意对象内部文本*/
function getInnerText(element) {
	if(typeof element.innerText === "string") {
		return element.innerText;
	} else {
		return element.textContent; // 只支持ie8+
	}
}

/*设置任意对象的内部文本*/
function setInnerText(element, content) {
	if(typeof element.innerText === "string") {
		element.innerText = content;
	} else {
		element.textContent = content; // 只支持ie8+
	}
}

/*获取下一个兄弟元素的兼容函数*/
function getNextElement(element) {
	if(element.nextElementSibling) {
		return element.nextElementSibling;
	} else {
		var next = element.nextSibling;
		while(next && next.nodeType !== 1) {
			next = next.nextSibling;
		}
		return next;
	}
}

/*获取上一个兄弟元素的兼容函数*/
function getPreviousElement(element) {
	if(element.previousElementSibling) {
		return element.previousElementSibling;
	} else {
		var prev = element.previousSibling;
		while(prev && prev.previousSibling !== 1) {
			prev = prev.previousSibling;
		}
		return prev;
	}
}

/**动画函数封装，调用此函数可使指定盒子按照设定定时器时间以10px的速度移动
 * Created by 11578 on 2017/4/28.
 */
function animate_over(obj, json, fn) { //json {attr: target}   (多个属性用逗号隔开)
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for(var k in json) {
			var leader = parseInt(getStyle_over(obj, k)) || 0;
			var target = json[k];
			var step = (target - leader) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			leader = leader + step;
			obj.style[k] = leader + "px";
			if(leader !== target) {
				flag = false;
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 15);
}

function getStyle_over(obj, attr) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(obj, null)[attr];
	} else {
		return obj.currentStyle[attr];
	}
}
/*------------------------------------------------------------------------------------*/
/* window.onscroll = function(){
 console.log(scroll().top);
 }*/

/*function scroll(){
 var scrollTop = window.pageYoffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
 var scrollLeft = window.pageXoffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
 var o = {};
 o.top = scrollTop;
 o.left = scrollLeft;
 return o;
 }*/

//scroll 精简版
function scroll() {
	return {
		top: window.pageYoffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
		left: window.pageXoffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
	};
}

/*------------------------------------------------------------------------------------*/

/*
 * client 获取当前网页可视区的宽度或高度
 * */
function client() {
	return {
		width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
		height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
	};
}
/*------------------------------------------------------------------------------------*/

/*
 *
 * 阻止冒泡的兼容写法
 * */
function proPagation(event) {
	var event = event || window.event;
	if(event.stopPropagation()) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
}
/*------------------------------------------------------------------------------------*/

/*
 * 获取造成事件冒泡的源
 * */
// function targetSrcelement(target, event) {
// 	var target = event.target || event.srcElement;
// }
/*------------------------------------------------------------------------------------*/

/*
 *添加事件的兼容方法
 * */
function addEvent(element, eventName, listener) {
	if(element.addEventListener) {
		element.addEventListener(eventName, listener, false);
	} else if(element.attachEvent) {
		element.attachEvent("on" + eventName, listener)
	} else {
		element["on" + eventName] = listener;
	}
}
/*------------------------------------------------------------------------------------*/

//cookie函数封装
function getCookie(key) {
	//返回值    字符串/对象
	var strCookie = document.cookie;
	if (!strCookie) {
		return null;
	}
	var arrCookie = strCookie.split(';');
	//	使用正则处理 'k=v'的字符串
	var r = /(.+)=(.+)/;
	for(var i = 0; i < arrCookie.length; i++) {
		var cookie = arrCookie[i];
		var m = r.exec(cookie);
		//tmp[ m[1] ] = m[2]; //需要考虑decodeURI()处理中文
		tem[m[1]] = decodeURI(m[2])
		return key ? tmp[key] : tmp;
	}
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/