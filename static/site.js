const catalog={
  peliculas:window.movieCatalog||[],
  series:window.seriesCatalog||[],
  musica:window.musicCatalog||[]
};

const byMood={feliz:{peliculas:[],series:[],musica:[]},tranquilo:{peliculas:[],series:[],musica:[]},energia:{peliculas:[],series:[],musica:[]},concentrarme:{peliculas:[],series:[],musica:[]}};
Object.entries(catalog).forEach(([tipo,items])=>{
  items.forEach(item=>byMood[item[3]][tipo].push(item));
});

const steps=[...document.querySelectorAll(".step")];
const form=document.getElementById("recommendation-form");
const progressBar=document.getElementById("progress-bar");
const stepLabel=document.getElementById("step-label");
const progressPercent=document.getElementById("progress-percent");
const result=document.getElementById("result");
const message=document.getElementById("message");
const againBtn=document.getElementById("again-btn");
let currentStep=0;
let lastRecommendationTitle=null;

const moodText={
  feliz:"Una opción alegre y entretenida para disfrutar el momento.",
  tranquilo:"Una opción relajada y reconfortante para desconectarte.",
  energia:"Una opción con ritmo y energía para mantenerte activo.",
  concentrarme:"Una opción ideal para acompañar una vibra tranquila y enfocada."
};

function updateStep(){
  steps.forEach((step,i)=>step.classList.toggle("active",i===currentStep));
  const number=currentStep+1;
  const percent=Math.round(number/steps.length*100);
  progressBar.style.width=percent+"%";
  stepLabel.textContent="Paso "+number+" de "+steps.length;
  progressPercent.textContent=percent+"%";
}

function selected(name){
  return document.querySelector('input[name="'+name+'"]:checked');
}

function next(){
  const names=["animo","tipo","tiempo"];
  if(!selected(names[currentStep])){
    steps[currentStep].classList.add("shake");
    setTimeout(()=>steps[currentStep].classList.remove("shake"),350);
    return;
  }
  if(currentStep<steps.length-1){
    currentStep++;
    updateStep();
    window.scrollTo({top:form.offsetTop-25,behavior:"smooth"});
  }
}

function back(){
  if(currentStep>0){
    currentStep--;
    updateStep();
    window.scrollTo({top:form.offsetTop-25,behavior:"smooth"});
  }
}

function filterByTime(items,tipo,tiempo){
  if(tiempo==="all") return items;
  if(tipo==="peliculas"){
    if(tiempo==="30") return items.filter(item=>item[1]<=110);
    if(tiempo==="60") return items.filter(item=>item[1]<=130);
  }
  if(tiempo==="30") return items.filter(item=>item[1]<=30);
  if(tiempo==="60") return items.filter(item=>item[1]<=60);
  return items;
}

function getCandidates(excludeLast){
  const animo=selected("animo")?.value;
  const tipo=selected("tipo")?.value;
  const tiempo=selected("tiempo")?.value;
  if(!animo||!tipo||!tiempo) return [];

  let candidates=filterByTime(byMood[animo][tipo],tipo,tiempo);

  if(candidates.length<2){
    const wider=filterByTime(catalog[tipo],tipo,tiempo);
    if(wider.length>=2) candidates=wider;
  }

  if(excludeLast && candidates.length>1 && lastRecommendationTitle){
    const withoutLast=candidates.filter(item=>item[0]!==lastRecommendationTitle);
    if(withoutLast.length) candidates=withoutLast;
  }

  return candidates;
}

function descriptionFor(item,animo,tipo){
  const kind=tipo==="peliculas"?"para ver":tipo==="series"?"para empezar a ver":"para escuchar";
  return moodText[animo]+" Una propuesta "+kind+" de género "+item[2]+".";
}

function recommend(isAnother){
  const animo=selected("animo")?.value;
  const tipo=selected("tipo")?.value;
  const tiempo=selected("tiempo")?.value;
  if(!animo||!tipo||!tiempo) return;

  const options=getCandidates(isAnother);

  if(!options.length){
    document.getElementById("message-text").textContent=
      tipo==="peliculas"
        ?"Con el tiempo elegido no encontramos una película completa que encaje. Prueba con 2 horas o más."
        :"No encontramos algo que encaje con ese tiempo. Prueba con más tiempo disponible.";
    message.hidden=false;
    result.hidden=true;
    return;
  }

  const item=options[Math.floor(Math.random()*options.length)];
  lastRecommendationTitle=item[0];

  document.getElementById("result-type").textContent=tipo==="peliculas"?"Película":tipo==="series"?"Serie":"Música";
  document.getElementById("result-title").textContent=item[0];
  document.getElementById("result-duration").textContent=item[1];
  document.getElementById("result-genre").textContent=item[2];
  document.getElementById("result-description").textContent=descriptionFor(item,animo,tipo);
  document.getElementById("result-image").src="static/images/"+(tipo==="peliculas"?"movie.svg":tipo==="series"?"series.svg":"music.svg");
  document.getElementById("result-image").alt=item[0];

  againBtn.textContent="🎲 Sí, dame otra";
  message.hidden=true;
  result.hidden=false;
  result.scrollIntoView({behavior:"smooth",block:"start"});
}

function restart(){
  form.reset();
  lastRecommendationTitle=null;
  result.hidden=true;
  message.hidden=true;
  currentStep=0;
  updateStep();
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".next-btn").forEach(btn=>btn.addEventListener("click",next));
document.querySelectorAll(".back-btn").forEach(btn=>btn.addEventListener("click",back));

form.addEventListener("submit",event=>{
  event.preventDefault();
  lastRecommendationTitle=null;
  recommend(false);
});

againBtn.addEventListener("click",()=>recommend(true));
document.getElementById("restart-btn")?.addEventListener("click",restart);

document.querySelectorAll(".option").forEach(option=>{
  option.addEventListener("click",()=>option.scrollIntoView({block:"nearest",behavior:"smooth"}));
});

updateStep();
