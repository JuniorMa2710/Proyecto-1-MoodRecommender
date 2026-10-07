const catalog={
  peliculas:window.movieCatalog||[],
  series:window.seriesCatalog||[],
  musica:window.musicCatalog||[]
};

const byMood={feliz:{peliculas:[],series:[],musica:[]},tranquilo:{peliculas:[],series:[],musica:[]},energia:{peliculas:[],series:[],musica:[]},triste:{peliculas:[],series:[],musica:[]}};
Object.entries(catalog).forEach(([tipo,items])=>{
  items.forEach(item=>{
    if(byMood[item[3]]?.[tipo]) byMood[item[3]][tipo].push(item);
  });
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
  triste:"Una opción emotiva o reconfortante para acompañarte y levantarte el ánimo."
};

const moodLabels={feliz:"😊 Feliz",tranquilo:"🌙 Tranquilo",energia:"⚡ Con energía",triste:"😔 Triste"};
const typeLabels={peliculas:"🎬 Película",series:"📺 Serie",musica:"🎵 Música"};
const timeLabels={30:"⏱ Hasta 30 min",60:"🕐 Hasta 60 min",all:"🕑 2 horas o más"};

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

function hideResult(){
  result.hidden=true;
  message.hidden=true;
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

function targetMinutes(tiempo){
  if(tiempo==="30") return 30;
  if(tiempo==="60") return 60;
  return 120;
}

function buildMusicSession(items,tiempo){
  const target=targetMinutes(tiempo);
  const pool=[...items].sort(()=>Math.random()-.5);
  const tracks=[];
  let total=0;

  for(const item of pool){
    if(total>=target*.9) break;
    if(total+Number(item[1])<=target+10){
      tracks.push(item);
      total+=Number(item[1]);
    }
  }

  // Si el catálogo no alcanza el objetivo, completa la sesión repitiendo
  // canciones solo después de haber usado las disponibles.
  let index=0;
  while(tracks.length && total<target*.85 && index<pool.length*4){
    const item=pool[index%pool.length];
    if(total+Number(item[1])<=target+10){
      tracks.push(item);
      total+=Number(item[1]);
    }
    index++;
  }

  if(!tracks.length) return null;
  const names=tracks.slice(0,5).map(item=>item[0].split(" - ")[0]);
  return [
    "Playlist "+moodLabels[selected("animo")?.value].replace(/^\S+\s/,"")+" · "+total+" min",
    total,
    tracks.length+" canciones · "+names.join(", ")+(tracks.length>5?"…":""),
    selected("animo")?.value
  ];
}

function buildSeriesSession(items,tiempo){
  const target=targetMinutes(tiempo);
  const plans=items.map(item=>{
    const episode=Number(item[1]);
    let count=Math.max(1,Math.round(target/episode));
    if(tiempo!=="all") count=Math.max(1,Math.floor(target/episode));
    const total=episode*count;
    const distance=Math.abs(target-total);
    return {item,count,total,distance};
  }).filter(plan=>tiempo==="all" ? plan.total>=90 : plan.total<=target);

  if(!plans.length) return null;
  plans.sort((a,b)=>a.distance-b.distance);
  const bestDistance=plans[0].distance;
  const best=plans.filter(plan=>plan.distance<=bestDistance+10);
  const plan=best[Math.floor(Math.random()*best.length)];
  return [
    plan.item[0],
    plan.total,
    plan.count+" episodio"+(plan.count===1?"":"s")+" · "+plan.item[2],
    plan.item[3]
  ];
}

function movieCandidates(items,tiempo){
  if(tiempo==="30") return items.filter(item=>Number(item[1])<=30);
  if(tiempo==="60"){
    const close=items.filter(item=>Number(item[1])>30 && Number(item[1])<=60);
    return close.length ? close : items.filter(item=>Number(item[1])<=60);
  }
  // Para 2 h o más prioriza largometrajes que aprovechen el tiempo.
  const long=items.filter(item=>Number(item[1])>=90);
  return long.length ? long : items;
}

function getCandidates(excludeLast){
  const animo=selected("animo")?.value;
  const tipo=selected("tipo")?.value;
  const tiempo=selected("tiempo")?.value;
  if(!animo||!tipo||!tiempo) return [];

  let candidates=byMood[animo][tipo];

  if(tipo==="peliculas"){
    candidates=movieCandidates(candidates,tiempo);
  }else if(tipo==="series"){
    const session=buildSeriesSession(candidates,tiempo);
    candidates=session?[session]:[];
  }else if(tipo==="musica"){
    const session=buildMusicSession(candidates,tiempo);
    candidates=session?[session]:[];
  }

  if(excludeLast && candidates.length>1 && lastRecommendationTitle){
    const withoutLast=candidates.filter(item=>item[0]!==lastRecommendationTitle);
    if(withoutLast.length) candidates=withoutLast;
  }

  return candidates;
}

function escapeSvgText(text){
  return String(text).replace(/[&<>"']/g,char=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"
  })[char]);
}

function wrapPosterTitle(title,maxLength=18){
  const words=String(title).split(" ");
  const lines=[];
  let line="";
  words.forEach(word=>{
    const test=(line+" "+word).trim();
    if(test.length>maxLength && line){
      lines.push(line);
      line=word;
    }else{
      line=test;
    }
  });
  if(line) lines.push(line);
  return lines.slice(0,4);
}

function posterPalette(title,tipo){
  const palettes={
    peliculas:[["#24113f","#6f2dbd"],["#0f2027","#2c5364"],["#3b0d11","#9b2226"],["#14213d","#fca311"]],
    series:[["#102542","#1b998b"],["#1f1c2c","#928dab"],["#172a3a","#09bc8a"],["#2d1e2f","#e84855"]],
    musica:[["#240046","#9d4edd"],["#001219","#0a9396"],["#3d0c11","#e85d04"],["#1b263b","#778da9"]]
  };
  let hash=0;
  for(const char of title) hash=(hash*31+char.charCodeAt(0))>>>0;
  const list=palettes[tipo]||palettes.peliculas;
  return list[hash%list.length];
}

function loadRecommendationImage(item,tipo){
  const image=document.getElementById("result-image");
  const [start,end]=posterPalette(item[0],tipo);
  const icon=tipo==="peliculas"?"🎬":tipo==="series"?"📺":"🎵";
  const label=tipo==="peliculas"?"PELÍCULA":tipo==="series"?"SERIE":"MÚSICA";
  const lines=wrapPosterTitle(item[0]);
  const titleSvg=lines.map((line,index)=>
    '<text x="50%" y="'+(255+index*42)+'" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="30" font-weight="800">'+escapeSvgText(line)+'</text>'
  ).join("");
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">'+
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+start+'"/><stop offset="1" stop-color="'+end+'"/></linearGradient></defs>'+
    '<rect width="600" height="900" rx="28" fill="url(#g)"/>'+
    '<circle cx="300" cy="135" r="74" fill="white" fill-opacity=".10"/>'+
    '<text x="300" y="165" text-anchor="middle" font-size="76">'+icon+'</text>'+
    '<text x="300" y="205" text-anchor="middle" fill="white" fill-opacity=".72" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="4">'+label+'</text>'+
    titleSvg+
    '<line x1="90" y1="470" x2="510" y2="470" stroke="white" stroke-opacity=".22"/>'+
    '<text x="300" y="525" text-anchor="middle" fill="white" fill-opacity=".88" font-family="Arial,sans-serif" font-size="21">'+escapeSvgText(item[2])+'</text>'+
    '<text x="300" y="570" text-anchor="middle" fill="white" fill-opacity=".65" font-family="Arial,sans-serif" font-size="18">'+escapeSvgText(item[1])+' min</text>'+
    '<text x="300" y="815" text-anchor="middle" fill="white" fill-opacity=".42" font-family="Arial,sans-serif" font-size="16" letter-spacing="3">MOODRECOMMENDER</text>'+
    '</svg>';
  image.src="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg);
  image.alt="Imagen de "+item[0];
}

function descriptionFor(item,animo,tipo){
  const kind=tipo==="peliculas"?"para ver":tipo==="series"?"para empezar a ver":"para escuchar";
  return moodText[animo]+" Una propuesta "+kind+" de género "+item[2]+".";
}

function showSelectionSummary(animo,tipo,tiempo){
  document.getElementById("summary-mood").textContent=moodLabels[animo];
  document.getElementById("summary-type").textContent=typeLabels[tipo];
  document.getElementById("summary-time").textContent=timeLabels[tiempo];
}

function recommend(isAnother){
  const animo=selected("animo")?.value;
  const tipo=selected("tipo")?.value;
  const tiempo=selected("tiempo")?.value;
  if(!animo||!tipo||!tiempo) return;

  const options=getCandidates(isAnother);

  if(!options.length){
    const limit=tiempo==="30"?"30 minutos":tiempo==="60"?"60 minutos":"2 horas o más";
    document.getElementById("message-text").textContent=
      "No encontramos una opción de "+typeLabels[tipo]+" adecuada para aprovechar "+limit+" con este ánimo. Prueba otro tipo de contenido o tiempo.";
    message.hidden=false;
    result.hidden=true;
    return;
  }

  const item=options[Math.floor(Math.random()*options.length)];
  lastRecommendationTitle=item[0];

  document.getElementById("result-type").textContent=typeLabels[tipo].replace(/^\S+\s/,"");
  document.getElementById("result-title").textContent=item[0];
  document.getElementById("result-duration").textContent=item[1];
  document.getElementById("result-genre").textContent=item[2];
  document.getElementById("result-description").textContent=descriptionFor(item,animo,tipo);
  showSelectionSummary(animo,tipo,tiempo);
  loadRecommendationImage(item,tipo);

  message.hidden=true;
  result.hidden=false;
  result.scrollIntoView({behavior:"smooth",block:"start"});
}

function restart(){
  form.reset();
  lastRecommendationTitle=null;
  hideResult();
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

document.querySelectorAll('input[type="radio"]').forEach(input=>{
  input.addEventListener("change",()=>{
    lastRecommendationTitle=null;
    hideResult();
  });
});

document.querySelectorAll(".option").forEach(option=>{
  option.addEventListener("click",()=>option.scrollIntoView({block:"nearest",behavior:"smooth"}));
});

updateStep();