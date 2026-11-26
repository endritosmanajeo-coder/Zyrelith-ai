const $=id=>document.getElementById(id);
const KEY="zyrelith_settings_v1", CHAT="zyrelith_chat_v1", MEM="zyrelith_memory_v1";
let messages=JSON.parse(localStorage.getItem(CHAT)||"[]");
function render(){ $("messages").innerHTML=""; for(const m of messages){const d=document.createElement("div");d.className="bubble "+m.role;d.textContent=m.text;$("messages").appendChild(d)} $("messages").scrollTop=$("messages").scrollHeight;}
function settings(){return JSON.parse(localStorage.getItem(KEY)||"{}")}
function saveSettings(){localStorage.setItem(KEY,JSON.stringify({apiKey:$("apiKey").value.trim(),model:$("model").value}));$("settings").close()}
$("settingsBtn").onclick=()=>{const s=settings();$("apiKey").value=s.apiKey||"";$("model").value=s.model||"gemini-3.5-flash-lite";$("settings").showModal()};
$("saveSettings").onclick=saveSettings;
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab,.panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");$(b.dataset.tab).classList.add("active")});
async function send(text){const s=settings();if(!s.apiKey){$("settings").showModal();alert("Add your Gemini API key in Settings first.");return}messages.push({role:"user",text});localStorage.setItem(CHAT,JSON.stringify(messages));render();$("prompt").value="";$("sendBtn").disabled=true;
try{const memory=localStorage.getItem(MEM)||"";const contents=messages.slice(-16).map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.text}]}));let body={system_instruction:{parts:[{text:"You are ZYRELITH AI, a helpful and honest all-purpose assistant. Use this user-provided memory when relevant: "+memory}]},contents,generationConfig:{temperature:.7,maxOutputTokens:1200}};if($("searchToggle").checked)body.tools=[{google_search:{}}];
const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${s.model}:generateContent?key=${encodeURIComponent(s.apiKey)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const data=await r.json();if(!r.ok)throw Error(data.error?.message||"API request failed");const answer=(data.candidates?.[0]?.content?.parts||[]).map(p=>p.text||"").join("").trim()||"No answer returned.";messages.push({role:"assistant",text:answer});}
catch(e){messages.push({role:"assistant",text:"I couldn't reach the AI service: "+e.message})}
localStorage.setItem(CHAT,JSON.stringify(messages));render();$("sendBtn").disabled=false}
$("chatForm").onsubmit=e=>{e.preventDefault();const t=$("prompt").value.trim();if(t)send(t)};
$("clearBtn").onclick=()=>{if(confirm("Clear this device's chat history?")){messages=[];localStorage.removeItem(CHAT);render()}};
$("saveMemory").onclick=()=>{localStorage.setItem(MEM,$("memoryText").value);$("memoryStatus").textContent="Memory saved on this device."};
$("memoryText").value=localStorage.getItem(MEM)||"";
$("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(messages,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="zyrelith-chat.json";a.click();URL.revokeObjectURL(a.href)};
$("voiceBtn").onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert("Speech recognition is not supported in this browser. Try Chrome on Android or use your keyboard microphone.");return}const rec=new SR();rec.lang=navigator.language||"en-US";rec.onresult=e=>$("prompt").value=e.results[0][0].transcript;rec.start()};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();
