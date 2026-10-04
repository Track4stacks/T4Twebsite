'use strict';
function initializeTheme(root=document){
  root.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
}
initializeTheme();document.addEventListener('shopify:section:load',e=>initializeTheme(e.target));
