const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('open')));

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
const imageObserver=new MutationObserver(records=>records.forEach(record=>{if(record.type==='attributes')ensureProductImage(record.target);record.addedNodes&&record.addedNodes.forEach(node=>{if(node.nodeType===1){if(node.tagName==='IMG')ensureProductImage(node);node.querySelectorAll&&node.querySelectorAll('img').forEach(ensureProductImage)}})}));
imageObserver.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});