// Small UI repair layer for the current homepage markup.
const uiFixes=document.createElement('style');
uiFixes.textContent=`
.product button{width:100%;border:0;border-radius:999px;padding:13px 20px;background:var(--ink);color:#fff;font:inherit;font-weight:800;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}.product button:hover{transform:translateY(-1px);box-shadow:0 8px 22px #13201920;background:#203b2b}.product button:focus-visible{outline:3px solid var(--acid);outline-offset:3px}.offer-grid article{border:1px solid transparent;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.offer-grid article:hover{transform:translateY(-3px);box-shadow:0 16px 38px #13201910;border-color:#d8ded9}.offer-grid article>span{display:inline-flex;width:34px;height:34px;align-items:center;justify-content:center;border-radius:50%;background:var(--sage);font-size:11px;font-weight:900}.offer-grid .offer-featured{background:var(--ink);color:#fff}.offer-grid .offer-featured>span{background:var(--acid);color:var(--ink)}.offer-grid .offer-featured p{color:#c3cec7}.offer-actions{display:flex;gap:12px;align-items:center;margin-top:28px;flex-wrap:wrap}.offers .sectionhead{margin-bottom:32px}@media(max-width:600px){.offer-actions{display:grid;grid-template-columns:1fr}.offer-actions a{text-align:center}.product button{padding:14px 18px}}
`;
document.head.appendChild(uiFixes);

const menu=document.querySelector('.menu'),nav=document.querySelector('header nav');
if(menu&&nav){
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

// Product-card buttons: open the correct configurator model instead of doing nothing.
const productKeys={
  'SHADE ONE':'one',
  'SHADE ONE+':'one-plus',
  'SHADE CUSTOM':'custom',
  'SHADE DUO':'duo',
  'SHADE FLEET':'fleet',
  'SHADE PLAY / CARE':'play-care'
};
document.querySelectorAll('[data-system]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const key=productKeys[btn.dataset.system]||'one';
    window.location.href=`configure.html?p=${encodeURIComponent(key)}`;
  });
});

// Make the launch-offers section clearer and give it a proper next action.
const offers=document.querySelector('.offers');
if(offers){
  const cards=offers.querySelectorAll('.offer-grid article');
  if(cards[0]) cards[0].classList.add('offer-featured');
  if(!offers.querySelector('.offer-actions')){
    const actions=document.createElement('div');
    actions.className='offer-actions';
    actions.innerHTML='<a class="cta" href="configure.html">Get my indicative price</a><a class="ghost" href="#quote">Book free site survey</a>';
    offers.appendChild(actions);
  }
}

// Resilient product-image fallback: if an HD WebP is unavailable or corrupt,
// automatically use the matching PNG asset so the site never shows broken images.
function ensureProductImage(img){
  if(!img||img.tagName!=='IMG')return;
  const src=img.getAttribute('src')||'';
  if(!src.includes('_hd.webp'))return;
  const fallback=src.replace('_hd.webp','.png');
  const swap=()=>{if(img.getAttribute('src')!==fallback)img.setAttribute('src',fallback)};
  img.addEventListener('error',swap,{once:true});
  if(img.complete&&img.naturalWidth===0)swap();
}
document.querySelectorAll('img').forEach(ensureProductImage);
const imageObserver=new MutationObserver(records=>records.forEach(record=>{
  if(record.type==='attributes')ensureProductImage(record.target);
  record.addedNodes&&record.addedNodes.forEach(node=>{
    if(node.nodeType===1){
      if(node.tagName==='IMG')ensureProductImage(node);
      node.querySelectorAll&&node.querySelectorAll('img').forEach(ensureProductImage);
    }
  });
}));
imageObserver.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});