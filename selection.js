/*chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection")
    sendResponse({data: window.getSelection().toString()});
  else
    sendResponse({}); // snub them.
});*/

var mouse=0;//mouse state
var mx=new Array(), my=new Array();
var N=0;
var ff=getCookie("ff");
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
var t;
//var k;
var mousex=0, mousey=0;
document.oncontextmenu=false; 

function timedCount()
{if(mouse==1)
{mx[N]=mousex;
my[N]=mousey;
var x=parseInt(mx[N]);
var y=parseInt(my[N]);
var d=document.getElementById("canvas");
var context=d.getContext("2d");
context.strokeStyle="#df4b26";
context.lineJoin="round";
context.lineWidth=5;
context.beginPath();
context.moveTo(mx[N-1], my[N-1]);
context.lineTo(x, y);
context.closePath();
context.stroke();
N=N+1;
t=setTimeout("timedCount()",100);
}}

function mouseup()
{
if(mouse==1)
{mouse=0;
clearTimeout(t);
mousex=0; mousey=0;
var d=document.getElementById("canvas");
if(d!=null) d.parentNode.removeChild(d);
ff=getCookie("ff");
if(ff==0){
var i, j;
    for(i=0; i<N-1; i++)//eliminate the close points
    {
        if(mx[i]==0&&mx[i+1]==0) break;
        if((my[i+1]-my[i])*(my[i+1]-my[i])+(mx[i+1]-mx[i])*(mx[i+1]-mx[i])<=10)
        {
            for(j=i+1; j<N; j++)
            {
                mx[j]=mx[j+1];
                my[j]=my[j+1];
            }
            N--;
        }
    }
	var previous0=new Array();
	var previous1=new Array();
	for (i=0;i<N-1;i++)
	  previous0[i]=0;
	previous0[0]=0;
    var count=1;
    var flag=0;
    var k, tmp;
    for(i=0; i<N-1; i++)
    {
        k=(my[i+1]-my[i])/(mx[i+1]-mx[i]);
        tmp=Math.atan(k);
        j=count-1;
        flag=0;
		if(j>0 && Math.abs(tmp-previous0[j])<0.3018)
        {
            previous0[j]=(previous0[j]*previous1[j]+tmp)/(previous1[j]+1);
            previous1[j]=previous1[j]+1;
            flag=1;
            //sendResponse({data: "888"});
        }
        else 
        {if(previous0[j] && Math.abs(tmp-previous0[j])<0.3018)
        {
            previous0[j]=(previous0[j]*previous1[j]+tmp)/(previous1[j]+1);
            previous1[j]=previous1[j]+1;
            //sendResponse({data: "888"});
            flag=1;
            //break;
        }}
        if(flag==0)
        {
            previous1[count]=1;
            previous0[count]=tmp;
            count=count+1;
        }
    }
    tmp=count;
    for(i=1;i<tmp;i++)
    {
        if(previous1[i]<3) //sendResponse({data: i});
        count=count-1;
    }
	count=count-1;
	//if(count=='3') sendResponse({data: count});
    if(count=='3') {history.go(1);sendResponse({data: "triangle"});}
    else
    {if(count=='4') {
    sendResponse({data: "rectangular"});}//need some function for rectangular
    else {if(count=='2') {history.go(-1);sendResponse({data: "L"});}
    else {if(count=='1') {history.go(0);sendResponse({data: "line"});}
	}}}
}}}


function mousemove(){
mousex=event.clientX;
mousey=event.clientY;
}

window.onmousedown=function(event) {
  if(event.button==1)
  {mouse=1;
  mx[0]=event.clientX;
  my[0]=event.clientY;
  var x=parseInt(mx[0]);
  var y=parseInt(my[0]);
  N=1;
  var d=document.createElement("canvas");
  d.id="canvas";
  d.width=window.innerWidth;
  d.height=window.innerHeight;
  d.style.visibility="visible";
  d.style.position="fixed";//change here
  d.style.top=0 + "px";
  d.style.left=0 + "px";
  d.style.zIndex=1000;//change here
  document.body.appendChild(d);
  //var context=d.getContext("2d");
  //context.strokeStyle="#df4b26";
  //context.lineJoin="round";
  //context.lineWidth=5;
  //context.beginPath();
  //context.moveTo(event.clientX,event.clientY);
  //context.lineTo(400,400);
  //context.closePath();
  //context.stroke();
  setTimeout("timedCount()",100);}
};

window.onmouseup=mouseup;
window.onmousemove=mousemove;

function exhibit(request, sender, sendResponse) {
    var i, j;
    for(i=0; i<N-1; i++)//eliminate the close points
    {
        if(mx[i]==0&&mx[i+1]==0) break;
        if((my[i+1]-my[i])*(my[i+1]-my[i])+(mx[i+1]-mx[i])*(mx[i+1]-mx[i])<=10)
        {
            for(j=i+1; j<N; j++)
            {
                mx[j]=mx[j+1];
                my[j]=my[j+1];
            }
            N--;
        }
    }
	//sendResponse({data: N});
	var previous0=new Array();
	var previous1=new Array();
	for (i=0;i<N-1;i++)
	  previous0[i]=0;
	previous0[0]=0;
    var count=1;
    var flag=0;
    var k, tmp;
    for(i=0; i<N-1; i++)
    {
        k=(my[i+1]-my[i])/(mx[i+1]-mx[i]);
        tmp=Math.atan(k);
        j=count-1;
        flag=0;
		if(j>0 && Math.abs(tmp-previous0[j])<0.3018)
        {
            previous0[j]=(previous0[j]*previous1[j]+tmp)/(previous1[j]+1);
            previous1[j]=previous1[j]+1;
            flag=1;
        }
        else 
        {if(previous0[j] && Math.abs(tmp-previous0[j])<0.3018)
        {
            previous0[j]=(previous0[j]*previous1[j]+tmp)/(previous1[j]+1);
            previous1[j]=previous1[j]+1;
            flag=1;
            //break;
        }}
		//j=j-1;
		//if(j<0) break;}
        if(flag==0)
        {
            previous1[count]=1;
            previous0[count]=tmp;
            count=count+1;
        }
    }
    tmp=count;
    //sendResponse({data: count});
    for(i=1;i<tmp;i++)
    {
        if(previous1[i]<3) //sendResponse({data: i});
        count=count-1;
    }
	count=count-1;
	//if(count=='3') sendResponse({data: count});
    if(count=='3') {history.go(1);sendResponse({data: "triangle"});}
    else
    {if(count=='4') {
    //window.external.addFavorite(window.document.head.title,window.location.href);//for IE
    //window.sidebar.addPanel('xx', 'http://www.baidu.com', "");
    //chrome.bookmarks.create({title: 'xx', url: 'http://www.baidu.com'});
    sendResponse({data: "rectangular"});}//need some function for rectangular
    else {if(count=='2') {history.go(-1);sendResponse({data: "L"});}
    else {if(count=='1') {history.go(0);sendResponse({data: "line"});}
	else 
	  sendResponse({data: count});}}}
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {//for debug mode, since it will show if it recognized correctly
  if (request.method == "debug") {delCookie("ff");setCookie("ff",1);}//after we go to different website, it still remain the same
  if (request.method == "user") {delCookie("ff");setCookie("ff",0);}
  if (request.method == "getSelection")
    sendResponse({data: window.getSelection().toString()});
  else {if(request.word=="")
    //sendResponse({data: "0"});
	{exhibit(request, sender, sendResponse);}
  else{
    var len=request.word.toString().length;
	var num=0;
	//var m=document.getElementsByTagName("p");
	var i;
	//for (i=0; i<m.length; i++)
	//{m[i].style.color="red";}
	var m=document.body.innerText;//get the words in body，innerHTML included <p>, <div>
	//m=m.toString();
	//m.style.color="red";
	var text=window.getSelection().toString();
	var flag=m.indexOf(request.word);
	if(flag==-1) sendResponse({data: 0});
	else{
	  while(1){
	  flag=m.indexOf(request.word);
	  m=m.substring(flag+len);
	  if(flag==-1)
	  {sendResponse({data: num});break;}
	  num=num+1;
	  }}
	}}
});


