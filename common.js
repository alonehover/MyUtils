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