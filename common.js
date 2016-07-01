
navigator.appVersion // 获取浏览器版本


/**
 * html5 地理位置定位
 */
function location(callback){
	 var data={};
	 if(!navigator.geolocation){
			 alert("不支持位置定位");
	 }else {
			 navigator.geolocation.getCurrentPosition(function(pos){
					 data = {
						 latitude : pos.coords.latitude,
						 longitude : pos.coords.longitude
					 }
					 callback(data);
			 });
	 }
}


/**
 * 获取宽和高
 */

 Javascript版本:

 网页可见区域宽： document.body.clientWidth
 网页可见区域高： document.body.clientHeight
 网页可见区域宽： document.body.offsetWidth (包括边线的宽)
 网页可见区域高： document.body.offsetHeight (包括边线的高)
 网页正文全文宽： document.body.scrollWidth
 网页正文全文高： document.body.scrollHeight
 网页被卷去的高： document.body.scrollTop
 网页被卷去的左： document.body.scrollLeft
 网页正文部分上： window.screenTop
 网页正文部分左： window.screenLeft
 屏幕分辨率的高： window.screen.height
 屏幕分辨率的宽： window.screen.width
 屏幕可用工作区高度： window.screen.availHeight
 屏幕可用工作区宽度： window.screen.availWidth

JQuery版本:

$(window).height() //浏览器当前窗口可视区域高度
$(document).height() //浏览器当前窗口文档的高度
$(document.body).height()//浏览器当前窗口文档body的高度
$(document.body).outerHeight(true)//浏览器当前窗口文档body的总高度 包括border padding margin

$(window).width() //浏览器当前窗口可视区域宽度
$(document).width()//浏览器当前窗口文档对象宽度
$(document.body).width()//浏览器当前窗口文档body的宽度
$(document.body).outerWidth(true)//浏览器当前窗口文档body的总宽度 包括border padding margin


/**
 * Class搜索
 * [node] 搜索起点
 * [classname] 搜索的类名
 */
function getElementsByClassName(node,classname){
	if(node.getElementsByClassName){
		return node.getElementsByClassName(classname);
	}else{
		var results = new Array();
		var elems = node.getElementsByTagName("*");
		for (var i=0;i<elems.length;i++){
			if (elems[i].className.indexOf(classname) != -1){
				results[results.length]=elems[i];
			}
		}
		return results;
	}
}


/**
 * 页面加载多函数的处理方法
 */
 function addLoadEvent(func) {
	 var oldonload = window.onload;
	 if(typeof window.onload != 'function'){
		 window.onload = func;
	 }else{
		 window.onload = function(){
			 oldonload();
			 func();
		 }
	 }
 }

 /**
  * 插入某节点之后
  * [newElement] 要插入的新节点
  * [targetElement] 目标节点
  */
 function insertAfter(newElement,targetElement){
	 var parent = targetElement.parentNode;
	 if(parent.lastChild = targetElement){
		 parent.appendChild(newElement);
	 }else{
		 parent.insertBefore(newElement.targetElement.nextSibling);
	 }
 }


/**
 * 兼容老浏览器Object.create
 */
var objectCreate = function (arg) {
	if(!arg){return {};}
	function obj(){};
	obj.prototype = arg;
	return new obj;
};
Object.create = Object.create || objectCreate;


/**
 * js数组去重方法 1
 */
Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}
var arr = [112,112,34,'你好',112,112,34,'你好','str','str1'];
alert(arr.unique3());

/**
 * indexOf 老浏览器兼容
 */
var indexOf = [].indexOf ?
    function(arr, item) {
      return arr.indexOf(item)
    } :
    function indexOf(arr, item) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          return i
        }
      }
      return -1
    }

/**
 * 判断横竖屏
 */
function hengshuping(){
  if(window.orientation==180||window.orientation==0){
        alert("竖屏状态！");
   }
if(window.orientation==90||window.orientation==-90){
        alert("横屏状态！");
    }
 }
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

/**
 * 判断是否是从主屏幕图标进入的网站
 */
if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion) && window.orientation==90||window.orientation==-90) {

 }

/**
 * 正则验证字符串是否有重复字符
 */
	 function isIsogram(str) {
	  return !/^.*(.).*\1/i.test(str);
	 }
  // 不区分大小写
	function isIsogram2(str) {
	  var strs = str.toLowerCase();
	    return !/^.*(.).*\1/i.test(str);
	}

/**
 *  Javascript组件的基本结构
 */
(function(window, undefined) {
    function JsClassName(cfg) {
        var config = cfg || {};
        this.get = function(n) {
            return config[n];
        }
        this.set = function(n, v) {
            config[n] = v;
        }
        this.init();
    }
    JsClassName.prototype = {
        init: function(){},
        otherMethod: function(){}
    };
    window.JsClassName = window.JsClassName || JsClassName;
})(window);


/**
* 判断数组
*/
function isArrayFn(value){
  if (typeof Array.isArray === "function") {
      return Array.isArray(value);
  }else{
      return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}

/**
 *  获取url指定参数
 */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
