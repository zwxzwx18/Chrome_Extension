$(function(){
  $('#paste').click(function(){pasteSelection();});
});
$(function(){
  $('#find').click(function(){findword();});
});
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
