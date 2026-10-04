'use strict';
// Review-only frontend. Never generates real availability, submits customer data,
// creates appointments, collects card details, or charges customers.
const serviceOptions = {
  1: {count:1, price:60, duration:30, title:'A little solo time.'},
  2: {count:2, price:80, duration:30, title:'Better with a buddy.'},
  3: {count:3, price:95, duration:30, title:'The happy little pack.'},
  4: {count:4, price:120, duration:60, title:'The whole happy crew.'}
};
const $ = selector => document.querySelector(selector);
const state = {step:0, count:1, date:null, time:null, week:0, purchase:"once", plan:"stride", billingWeeks:4, sprint:2};
const membershipRates={1:{trot:60,stride:55,sprint:50},2:{trot:80,stride:75,sprint:70},3:{trot:95,stride:90,sprint:85},4:{trot:120,stride:115,sprint:110}};
function membership(){ const frequency=state.plan==="trot"?0.5:state.plan==="stride"?1:state.sprint; const rate=membershipRates[state.count][state.plan];return {name:({trot:'Biweekly',stride:'Weekly',sprint:'Twice a week'})[state.plan],rate,visits:frequency*4,total:rate*frequency*state.billingWeeks,cadence:state.billingWeeks===1?"every week":`every ${state.billingWeeks} weeks`}; }
const todayParts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const part = type => todayParts.find(p => p.type === type).value;
const firstDay = new Date(`${part('year')}-${part('month')}-${part('day')}T12:00:00Z`);
firstDay.setUTCDate(firstDay.getUTCDate()+1);
const longDate = iso => new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(`${iso}T12:00:00Z`));
const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
function updateSummary(){
  const s = serviceOptions[state.count];
  $('#summary-service').textContent=s.title;
  $('#summary-dogs').textContent=`${s.count} ${s.count===1?'dog':'dogs'} · ${s.duration} minutes`;
  const m=membership();const recurring=state.purchase==='membership';
  $('#summary-price').textContent=recurring?money(m.total):money(s.price);
  if(recurring){$('#summary-service').textContent=`${m.name} membership`;$('#summary-dogs').textContent=`${s.count} ${s.count===1?'dog':'dogs'} · ${m.cadence}`;}
  $('.membership-options').hidden=!recurring;
  $('#membership-total').textContent=`${money(m.total)} ${m.cadence}`;$('#membership-detail').textContent=`${m.visits} visits per 4-week period · ${money(m.rate)} per household visit · before applicable taxes`;
  $('#renewal-consent').checked=false;
  $('#summary-date').textContent=state.date&&state.time?`${longDate(state.date)} · ${state.time} · Austin time (example)`:'Choose a day and time next.';
}
function renderDogs(){
  const target=$('#dog-fields');
  const previous=[...target.querySelectorAll('input')].map(x=>x.value);
  target.replaceChildren();
  for(let i=0;i<state.count;i++){
    const label=document.createElement('label');label.textContent=`Dog ${i+1}’s name`;
    const input=document.createElement('input');input.name=`dog${i+1}`;input.required=true;input.maxLength=80;input.autocomplete='off';input.placeholder='Their favorite name';input.value=previous[i]||'';label.append(input);target.append(label);
  }
}
function setStep(step){
  state.step=step;
  document.querySelectorAll('.step').forEach((el,i)=>el.hidden=i!==step);
  document.querySelectorAll('.progress li').forEach((el,i)=>{if(i===step)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');el.classList.toggle('complete',i<step);});
  const heading=$(`.step[data-step="${step}"] h2`);heading.tabIndex=-1;heading.focus({preventScroll:true});$('.booking-card').scrollIntoView({behavior:'auto',block:'start'});
}
function renderDates(){
  const container=$('#date-options');container.querySelectorAll('button').forEach(b=>b.remove());
  const weekStart=new Date(firstDay);weekStart.setUTCDate(weekStart.getUTCDate()+state.week*7);
  $('#month-label').textContent=new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric',timeZone:'UTC'}).format(weekStart);
  $('#previous-week').disabled=state.week===0;$('#next-week').disabled=state.week===7;
  for(let i=0;i<7;i++){
    const d=new Date(weekStart);d.setUTCDate(d.getUTCDate()+i);const iso=d.toISOString().slice(0,10);
    const b=document.createElement('button');b.type='button';b.className='date-option';b.setAttribute('aria-label',`${longDate(iso)}, example date`);b.setAttribute('aria-pressed',String(state.date===iso));
    const day=document.createElement('span');day.textContent=new Intl.DateTimeFormat('en-US',{weekday:'short',timeZone:'UTC'}).format(d);
    const num=document.createElement('strong');num.textContent=d.getUTCDate();b.append(day,num);b.addEventListener('click',()=>{state.date=iso;state.time=null;$('#time-error').textContent='';renderDates();renderTimes();updateSummary();});container.append(b);
  }
}
function renderTimes(){
  const target=$('#time-options');target.querySelectorAll('button,p').forEach(x=>x.remove());
  if(!state.date){const p=document.createElement('p');p.className='hint';p.textContent='Choose a date to preview the time selector.';target.append(p);return;}
  const weekday=new Date(`${state.date}T12:00:00Z`).getUTCDay();
  const times=weekday===0||weekday===6?['8:30 AM','10:00 AM','11:30 AM','2:00 PM','4:30 PM','6:00 PM']:['4:30 PM','5:15 PM','6:00 PM','6:45 PM','7:30 PM','8:15 PM'];
  for(const time of times){const b=document.createElement('button');b.type='button';b.className='time-option';b.textContent=time;b.setAttribute('aria-pressed',String(state.time===time));b.setAttribute('aria-label',`${time}, example time`);b.addEventListener('click',()=>{state.time=time;$('#time-error').textContent='';renderTimes();updateSummary();});target.append(b);}
}
function review(){
  const f=$('#details-form');const values=new FormData(f);
  $('#review-dogs').textContent=Array.from({length:state.count},(_,i)=>values.get(`dog${i+1}`)).join(', ');
  $('#review-when').textContent=`${longDate(state.date)} at ${state.time}, Austin time · example`;
  $('#review-address').textContent=`${values.get('address')}, ${values.get('city')}, TX ${values.get('zip')}`;
  $('#review-email').textContent=values.get('email');const m=membership();const recurring=state.purchase==='membership';$('#review-total').textContent=money(recurring?m.total:serviceOptions[state.count].price);$('#review-total-label').textContent=recurring?`Recurring charge · ${m.cadence}`:'Session price';$('#renewal-review').hidden=!recurring;$('#renewal-copy').textContent=`${m.name} · ${money(m.total)} ${m.cadence}, before applicable taxes.`;$('#renewal-sessions').textContent=`${m.visits} household visits per four-week period. The selected date is the first example visit; recurring dates must be arranged separately.`;$('#renewal-consent-copy').textContent=`I understand this example shows an automatic charge of ${money(m.total)} ${m.cadence}.`;$('#renewal-consent').checked=false;setStep(3);
}
document.querySelectorAll('[name="purchase"]').forEach(input=>input.addEventListener('change',()=>{state.purchase=input.value;updateSummary();}));
$('[name="membership-plan"]').addEventListener('change',e=>{state.plan=e.target.value;updateSummary();});
document.querySelectorAll('[name="service"]').forEach(input=>input.addEventListener('change',()=>{state.count=Number(input.value);updateSummary();renderDogs();}));
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{
  if(state.step===1&&(!state.date||!state.time)){const err=$('#time-error');err.textContent='Choose an example date and time to continue.';return;}
  setStep(state.step+1);
}));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>setStep(Math.max(0,state.step-1))));
$('#previous-week').addEventListener('click',()=>{if(state.week>0){state.week--;renderDates();}});
$('#next-week').addEventListener('click',()=>{if(state.week<7){state.week++;renderDates();}});
$('#details-form').addEventListener('submit',event=>{event.preventDefault();if(event.currentTarget.reportValidity())review();});
$('#sample-details').addEventListener('click',()=>{
  const f=$('#details-form');const sample={customerName:'Jamie Example',email:'jamie@example.com',phone:'(512) 555-0123',address:'123 Example Lane',city:'Austin',zip:'78701'};
  for(const [key,value]of Object.entries(sample))f.elements.namedItem(key).value=value;
  const dogs=['Biscuit','Scout','Maple','Finn'];for(let i=0;i<state.count;i++)f.elements.namedItem(`dog${i+1}`).value=dogs[i];f.elements.namedItem('area').checked=true;
});
$('#restart').addEventListener('click',()=>{$('#details-form').reset();state.date=null;state.time=null;state.week=0;state.count=1;state.purchase='once';$('[name="purchase"][value="once"]').checked=true;$('[name="service"][value="1"]').checked=true;renderDates();renderTimes();renderDogs();updateSummary();setStep(0);});
renderDogs();renderDates();renderTimes();updateSummary();
