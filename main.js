/* interactions for Rassvet site */
function toggleMenu(){
  const nav = document.getElementById('nav');
  if(!nav) return;
  if(getComputedStyle(nav).display === 'flex'){ nav.style.display='none'; }
  else{ nav.style.display='flex'; nav.style.flexDirection='column'; }
}
document.getElementById('menuBtn')?.addEventListener('click', toggleMenu);

/* Quiz */
function nextStep(n){
  document.getElementById('step'+n).classList.remove('active');
  document.getElementById('step'+(n+1)).classList.add('active');
}
function prevStep(n){
  document.getElementById('step'+n).classList.remove('active');
  document.getElementById('step'+(n-1)).classList.add('active');
}
function sendQuiz(){
  const name = document.getElementById('q_name').value.trim();
  const phone = document.getElementById('q_phone').value.trim();
  const region = document.getElementById('q_region').value;
  const budget = document.getElementById('q_budget').value;
  if(!region || !budget || !name || !phone){ alert('Пожалуйста заполните все поля'); return; }
  const msg = encodeURIComponent(`Заявка от Рассвет — Имя: ${name} Тел: ${phone} Район: ${region} Бюджет: ${budget}`);
  window.open('https://wa.me/79855765769?text='+msg,'_blank');
  document.getElementById('hiddenPlans').style.display='block';
  alert('Спасибо! Готовим подбор, пришлём в WhatsApp.');
}

/* Request plan */
function requestPlan(project){
  const msg = encodeURIComponent(`Прошу прислать планировки по проекту: ${project}. Контакт:`);
  window.open('https://wa.me/79855765769?text='+msg,'_blank');
}

/* Mortgage calc */
function calcMortgage(){
  const price = Number(document.getElementById('m_price').value);
  const down = Number(document.getElementById('m_down').value);
  const years = Number(document.getElementById('m_years').value);
  const annual = Number(document.getElementById('m_rate').value)/100;
  if(!price || !years || annual<=0){ alert('Проверьте введенные данные'); return; }
  const loan = price - (isNaN(down)?0:down);
  const months = years*12;
  const monthlyRate = annual/12;
  const monthly = loan * (monthlyRate / (1 - Math.pow(1+monthlyRate, -months)));
  const overpay = monthly*months - loan;
  document.getElementById('mort_month').innerText = 'Ежемесячный платёж: ' + Math.round(monthly).toLocaleString('ru-RU') + ' ₽';
  document.getElementById('mort_over').innerText = 'Примерная переплата: ' + Math.round(overpay).toLocaleString('ru-RU') + ' ₽';
  document.getElementById('mortResult').style.display='block';
  document.getElementById('mort_whatsapp').href = 'https://wa.me/79855765769?text=' + encodeURIComponent('Прошу подбор ипотечной программы. Примерный платёж: ' + Math.round(monthly).toLocaleString('ru-RU') + ' ₽. Контакт: ');
}
