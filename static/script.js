const steps=[...document.querySelectorAll(".step")];
const progressBar=document.getElementById("progress-bar");
const stepLabel=document.getElementById("step-label");
const progressPercent=document.getElementById("progress-percent");
let currentStep=0;

function updateStep(){
  steps.forEach((step,index)=>step.classList.toggle("active",index===currentStep));
  const number=currentStep+1;
  const percent=Math.round((number/steps.length)*100);
  progressBar.style.width=percent+"%";
  stepLabel.textContent=`Paso ${number} de ${steps.length}`;
  progressPercent.textContent=percent+"%";
}
function selectedInStep(){
  return steps[currentStep].querySelector('input[type="radio"]:checked');
}
function goNext(){
  if(!selectedInStep()){
    steps[currentStep].classList.add("shake");
    setTimeout(()=>steps[currentStep].classList.remove("shake"),350);
    return;
  }
  if(currentStep<steps.length-1){
    currentStep++;
    updateStep();
    window.scrollTo({top:document.querySelector(".card").offsetTop-25,behavior:"smooth"});
  }
}
function goBack(){
  if(currentStep>0){
    currentStep--;
    updateStep();
    window.scrollTo({top:document.querySelector(".card").offsetTop-25,behavior:"smooth"});
  }
}
document.querySelectorAll(".next-btn").forEach(btn=>btn.addEventListener("click",goNext));
document.querySelectorAll(".back-btn").forEach(btn=>btn.addEventListener("click",goBack));
document.querySelectorAll(".option").forEach(option=>option.addEventListener("click",()=>option.scrollIntoView({block:"nearest",behavior:"smooth"})));
document.getElementById("recommendation-form").addEventListener("submit",event=>{
  const allRequired=["animo","tipo","tiempo"];
  const complete=allRequired.every(name=>document.querySelector(`input[name="${name}"]:checked`));
  if(!complete){
    event.preventDefault();
    currentStep=allRequired.findIndex(name=>!document.querySelector(`input[name="${name}"]:checked`));
    updateStep();
  }
});
updateStep();
