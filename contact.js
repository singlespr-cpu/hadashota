(()=>{
  const $=(s)=>document.querySelector(s),form=$("#standaloneContactForm"),status=$("#standaloneContactStatus"),button=$("#standaloneContactSubmit");
  if(!form)return;
  const topicEl=$("#standaloneContactTopic"),messageEl=$("#standaloneContactMessage");
  try{
    const q=new URLSearchParams(location.search),topic=String(q.get("topic")||"").trim(),ref=String(q.get("ref")||"").trim().slice(0,1000),context=String(q.get("context")||"").trim().slice(0,180),type=String(q.get("type")||"").trim().slice(0,60);
    if(topic&&topicEl&&[...topicEl.options].some((o)=>o.value===topic||o.textContent===topic))topicEl.value=topic;
    if(messageEl&&(ref||context||type)&&!messageEl.value){
      const rows=[type?`סוג פנייה: ${type}`:"",context?`כותרת/הקשר: ${context}`:"",ref?`קישור רלוונטי: ${ref}`:"","","נא לפרט כאן מה דורש תיקון/הסרה ומה הקשר שלכם לזכות או למידע:"].filter((x,i,a)=>x||i===a.length-2);
      messageEl.value=rows.join("\n").slice(0,1200);
    }
  }catch{}
  const setStatus=(text,state="")=>{status.textContent=text||"";if(state)status.dataset.state=state;else delete status.dataset.state};
  form.addEventListener("submit",async event=>{event.preventDefault();setStatus("");if(!form.checkValidity()){form.reportValidity();setStatus("נא להשלים את כל שדות החובה ולוודא שכתובת האימייל תקינה.","error");return}const data=new FormData(form),name=String(data.get("name")||"").trim(),phone=String(data.get("phone")||"").trim(),email=String(data.get("email")||"").trim(),topic=String(data.get("topic")||"כללי").trim()||"כללי",message=String(data.get("message")||"").trim();if(name.length<2||phone.replace(/\D/g,"").length<5||!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)||message.length<2){setStatus("נא לבדוק שם, טלפון, אימייל והודעה ולנסות שוב.","error");return}button.disabled=true;button.textContent="שולח…";try{const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({name,phone,email,topic,message,source:"contact-page"})});const d=await r.json().catch(()=>({}));if(!r.ok||d?.ok===false)throw new Error(d?.error||"השליחה נכשלה");form.reset();setStatus("פנייתך התקבלה בהצלחה ✓","success")}catch(error){setStatus(String(error?.message||"השליחה נכשלה. נסו שוב בעוד רגע."),"error")}finally{button.disabled=false;button.textContent="שליחת הודעה"}});
})();
