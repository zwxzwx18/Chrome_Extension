var mouse=0;//鼠标的状态
var mx, my;
var i=0;
var t;

function timedCount()
{
if(mouse)
{
mx[i]=event.clientX;
my[i]=event.clientY;
i=i+1;
t=setTimeout("timedCount()",100);
}
else
clearTimeout(t);
}

function mousedown()
{
if(event.button==2)
{mouse=1;
mx[0]=event.clientX;
my[0]=event.clientY;
i=1;
setTimeout("timedCount()",100);}
}

function mouseup()
{
if(mouse)
{mouse=0;
mx[i]=event.clientX;
my[i]=event.clientY;}
}

window.onmousedown=mousedown;
window.onmouseup=mouseup;

a=document.createElement('div');
a.style.backgroundColor="red";
a.style.height="5px";
a.style.width="5px";
