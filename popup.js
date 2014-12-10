$(function(){
  $('#paste').click(function(){pasteSelection();});
});
$(function(){
  $('#find').click(function(){findword();});
});
$(function(){
  $('#user').click(function(){user_click();});
});
$(function(){
  $('#debug').click(function(){debug_click();});
});
function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return 0; 
}
function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}

function user_click() {
    delCookie("state");
    setCookie("state",0);
    chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
    function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "user"}, 
    function(response){})})
}
window.onload=function(){
var selects = document.getElementsByName("mode");
for (var i=0; i<selects.length; i++){  
    if (i==getCookie("state")) {  
        selects[i].checked=true;  
        break;  
    }  
} 
}

function debug_click() {
    delCookie("state");
    setCookie("state",1);
    chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
    function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "debug"}, 
    function(response){})})
}

function pasteSelection() {

  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var text = document.getElementById('text'); 
      text.innerHTML = response.data;
    });
  });
}
function findword() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
  function(tab){
    var content=document.getElementById('test');
    chrome.tabs.sendMessage(tab[0].id, {word: content.value}, 
	function(response){
	  var target=document.getElementById('text')
	  //if(response.data=="1") target.value=content.value + "yes";
	  //else target.value=content.value + "no" ;
	  target.value=response.data;
	  //if(target.value=="L") chrome.tabs.history.go(-1)
	  });
  });
}
