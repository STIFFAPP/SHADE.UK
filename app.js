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