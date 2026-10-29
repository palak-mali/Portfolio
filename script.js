(function(){
var root=document.documentElement,tb=document.getElementById('theme');
tb.onclick=function(){var dark=getComputedStyle(root).colorScheme==='dark';root.setAttribute('data-theme',dark?'light':'dark')};
/* typing roles */
var roles=['AI/ML student','Microsoft Student Ambassador','Club Lead','Researcher','Hackathon builder','IEEE member'],ri=0,ci=0,del=false,el=document.getElementById('type');
function tick(){var w=roles[ri];el.textContent=w.slice(0,ci);
if(!del&&ci<w.length){ci++;setTimeout(tick,70)}else if(!del){del=true;setTimeout(tick,1300)}else if(ci>0){ci--;setTimeout(tick,35)}else{del=false;ri=(ri+1)%roles.length;setTimeout(tick,250)}}
if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=roles[0]}else tick();
/* network canvas */
var cv=document.getElementById('net'),cx=cv.getContext('2d'),P=[],m={x:-999,y:-999},W,H,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function size(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;var n=Math.min(90,Math.floor(W*H/14000));P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4})}
size();addEventListener('resize',size);
function pt(e){var r=cv.getBoundingClientRect(),t=e.touches?e.touches[0]:e;m.x=t.clientX-r.left;m.y=t.clientY-r.top}
addEventListener('mousemove',pt);addEventListener('touchmove',pt,{passive:true});
function draw(){var s=getComputedStyle(root),a=s.getPropertyValue('--accent').trim(),g=s.getPropertyValue('--mint').trim();
cx.clearRect(0,0,W,H);
for(var i=0;i<P.length;i++){var p=P[i];
if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
var dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<120&&d>0){p.x+=dx/d*1.6;p.y+=dy/d*1.6}}
for(var j=i+1;j<P.length;j++){var q=P[j],dd=Math.hypot(p.x-q.x,p.y-q.y);
if(dd<130){cx.globalAlpha=(1-dd/130)*.45;cx.strokeStyle=a;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
var dm=Math.hypot(p.x-m.x,p.y-m.y);
if(dm<170){cx.globalAlpha=(1-dm/170)*.8;cx.strokeStyle=g;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke()}
cx.globalAlpha=.9;cx.fillStyle=dm<170?g:a;cx.beginPath();cx.arc(p.x,p.y,2.4,0,6.3);cx.fill()}
cx.globalAlpha=1;requestAnimationFrame(draw)}
draw();
/* project cards */
document.querySelectorAll('.card button').forEach(function(b){b.onclick=function(){var c=b.parentNode,o=c.dataset.open==='true';c.dataset.open=!o;b.setAttribute('aria-expanded',!o)}});
/* skill filter */
var tabs=document.querySelectorAll('.tab'),items=document.querySelectorAll('.sk div');
tabs.forEach(function(t){t.onclick=function(){tabs.forEach(function(x){x.setAttribute('aria-pressed',x===t)});
items.forEach(function(i){i.classList.toggle('off',t.dataset.f!=='all'&&i.dataset.c!==t.dataset.f)})}});
/* count-up */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);
var el=e.target,end=parseFloat(el.dataset.count),dec=+el.dataset.dec||0,t0=null;
function f(t){if(!t0)t0=t;var k=Math.min((t-t0)/1100,1);el.textContent=(end*(reduce?1:k)).toFixed(dec);if(k<1&&!reduce)requestAnimationFrame(f);else el.textContent=end.toFixed(dec)}
requestAnimationFrame(f)})},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(function(n){io.observe(n)});
var lb=document.getElementById('lb');
document.querySelectorAll('.cert').forEach(function(c){c.onclick=function(){lb.firstChild.src=c.querySelector('img').src;lb.hidden=false}});
lb.onclick=function(){lb.hidden=true};addEventListener('keydown',function(e){if(e.key==='Escape')lb.hidden=true});
})();
