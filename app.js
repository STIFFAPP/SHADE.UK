
const menu=document.querySelector('.menu'),nav=document.querySelector('header nav');
if(menu&&nav){
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

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
    location.href=`configure.html?p=${encodeURIComponent(key)}`;
  });
});

const offers=document.querySelector('.offers');
if(offers&&!offers.querySelector('.offer-actions')){
  const actions=document.createElement('div');
  actions.className='offer-actions';
  actions.innerHTML='<a class="cta" href="configure.html">Get my indicative price</a><a class="ghost" href="#quote">Book free site survey</a>';
  offers.appendChild(actions);
}


// Make the whole product card clickable to its detailed product page.
document.querySelectorAll('.product[data-product]').forEach(card=>{
  const openProduct=()=>{ location.href='product.html?p='+encodeURIComponent(card.dataset.product); };
  card.addEventListener('click',e=>{
    if(e.target.closest('button,a,input,select,textarea,label')) return;
    openProduct();
  });
  card.addEventListener('keydown',e=>{
    if((e.key==='Enter'||e.key===' ') && !e.target.closest('button,a,input,select,textarea,label')){
      e.preventDefault(); openProduct();
    }
  });
});
