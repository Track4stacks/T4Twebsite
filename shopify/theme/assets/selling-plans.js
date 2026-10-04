'use strict';
(()=>{
function initialize(root=document){root.querySelectorAll('[data-product-section]').forEach(section=>{
 if(section.dataset.initialized)return;section.dataset.initialized='true';
 const variants=JSON.parse(section.querySelector('[data-variant-data]').textContent);
 const variantSelect=section.querySelector('[data-variant-select]'), planSelect=section.querySelector('[data-plan-select]');
 const optionSelects=[...section.querySelectorAll('[data-option-index]')];
 section.querySelector('[data-option-selects]').hidden=false;section.querySelector('[data-variant-fallback]').hidden=true;
 const initial=variants.find(x=>String(x.id)===variantSelect.value);if(initial)optionSelects.forEach((el,i)=>el.value=initial.options[i]);
 const only=section.dataset.subscriptionOnly==='true';const button=section.querySelector('[data-add-button]');
 function updatePrice(){
  const v=variants.find(x=>String(x.id)===variantSelect.value);if(!v){button.disabled=true;return;}
  const plan=v.plans.find(x=>String(x.id)===planSelect.value);
  section.querySelector('[data-product-price]').textContent=plan?plan.price:v.price;
  const note=section.querySelector('[data-plan-note]');note.hidden=!plan;note.textContent=plan?[plan.name,plan.description].filter(Boolean).join('\n'):'';
  const missing=only&&!plan;button.disabled=!v.available||missing;button.textContent=v.available?'Add to cart':'Sold out';
  section.querySelector('[data-product-error]').textContent=missing?'This membership is not available for online purchase yet. Please contact us.':'';
 }
 function updateVariant(){
  const v=variants.find(x=>String(x.id)===variantSelect.value);if(!v){button.disabled=true;return;}
  const previous=planSelect.value;planSelect.replaceChildren();
  if(!only)planSelect.add(new Option('One-time purchase',''));
  v.plans.forEach(p=>planSelect.add(new Option(`${p.name} — ${p.price}`,String(p.id))));
  if([...planSelect.options].some(o=>o.value===previous))planSelect.value=previous;
  else if(only&&v.plans.length)planSelect.value=String(v.plans[0].id);
  section.querySelector('[data-plan-field]').hidden=v.plans.length===0;
  updatePrice();
 }
 optionSelects.forEach(select=>select.addEventListener('change',()=>{const selected=optionSelects.map(x=>x.value);const matched=variants.find(v=>v.options.every((value,i)=>value===selected[i]));if(!matched){button.disabled=true;section.querySelector('[data-product-error]').textContent='This combination is not available.';variantSelect.value='';return;}variantSelect.value=String(matched.id);updateVariant();}));
 variantSelect.addEventListener('change',updateVariant);planSelect.addEventListener('change',updatePrice);
 section.querySelector('form').addEventListener('submit',event=>{updatePrice();if(button.disabled){event.preventDefault();section.querySelector('[data-product-error]').focus();}});
 updatePrice();
});}
initialize();if(!window.t4tSellingPlansBound){document.addEventListener('shopify:section:load',e=>initialize(e.target));window.t4tSellingPlansBound=true;}
})();
