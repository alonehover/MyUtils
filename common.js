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