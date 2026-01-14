// AUTO AUDIO
document.addEventListener("click",()=>{
  const a=document.getElementById("bgAudio");
  if(a)a.play().catch(()=>{});
},{once:true});

// AI
function toggleAI(){
  const box=document.getElementById("aiBox");
  box.style.display=box.style.display==="block"?"none":"block";
}
function aiAnswer(n){
  const r=document.getElementById("aiResult");
  if(n===1)r.innerText="WN HOST (Disamarkan)";
  if(n===2)r.innerText="@WAN_HOST";
  if(n===3)r.innerText="Dibuat Selasa, 13 Januari 2026";
}

// DRAG AI
let offX,offY;
function dragAI(e){
  const box=document.getElementById("aiBox");
  offX=e.clientX-box.offsetLeft;
  offY=e.clientY-box.offsetTop;
  document.onmousemove=(ev)=>{
    box.style.left=ev.clientX-offX+"px";
    box.style.top=ev.clientY-offY+"px";
  };
  document.onmouseup=()=>document.onmousemove=null;
}

// INTERNET
function checkInternet(){
  const b=document.getElementById("internetBox");
  if(navigator.onLine){
    b.innerHTML="✅ INTERNET AKTIF<br>Koneksi stabil";
    setTimeout(()=>b.innerHTML="",4000);
  }else{
    b.innerHTML="❌ INTERNET OFF";
  }
}

// IP SCAN
function scanIP(){
  fetch("https://ipapi.co/json/")
  .then(r=>r.json())
  .then(d=>{
    ipResult.textContent=
`IP: ${d.ip}
Kota: ${d.city}
Negara: ${d.country_name}
ISP: ${d.org}
Platform: ${navigator.platform}
UserAgent: ${navigator.userAgent}`;
  });
}

// DDOS DEMO
function startDDOS(){
  const box=document.getElementById("ddosBox");
  box.innerHTML=`
  <video src="https://files.catbox.moe/3vx2gq.mp4" autoplay loop muted width="100%"></video>
  <p>⚠ DDOS ATTACK DALAM PROSES ⚠<br>SERVER TARGET OVERLOAD</p>
  <button onclick="location.href='index.html'">EXIT</button>`;
}

function openTelegram(){
  window.open("https://t.me/WAN_HOST","_blank");
}