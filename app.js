const money=n=>"£"+Math.round(n).toLocaleString("en-GB");
const system=document.getElementById("system"), total=document.getElementById("total");
function calc(){
 let n=Number(system.value);
 n+=Number(document.getElementById("frame").value);
 if(document.getElementById("lights").checked)n+=350;
 if(document.getElementById("graphics").checked)n+=450;
 if(document.getElementById("screen").checked)n+=300;
 total.textContent=money(n)+(Number(system.value)>=4500 && system.selectedIndex>=4 ? "+" : "");
}
["system","frame","lights","graphics","screen"].forEach(id=>document.getElementById(id).addEventListener("change",calc));
document.querySelectorAll("[data-system]").forEach(btn=>btn.addEventListener("click",()=>{
 const val=btn.dataset.price;
 [...system.options].forEach(o=>{if(o.value===val)system.value=val});
 calc(); document.getElementById("quote").scrollIntoView({behavior:"smooth"});
}));
document.getElementById("survey").addEventListener("click",()=>alert("Website demo: connect this form to your email/CRM before launch."));
document.querySelector(".menu").addEventListener("click",()=>alert("Mobile navigation can be connected when the final domain/contact details are added."));
calc();