const data = {
  feliz: {
    peliculas: [
      ["Spider-Man: Into the Spider-Verse",117,"Animación · Acción","Una aventura visualmente increíble con humor, energía y una historia que celebra ser diferente.","movie.svg"],
      ["Jumanji: Welcome to the Jungle",119,"Aventura · Comedia","Un grupo de amigos entra en un videojuego lleno de retos, acción y momentos muy divertidos.","movie.svg"],
      ["The Lego Movie",100,"Animación · Comedia","Una aventura divertida y creativa que mezcla humor, acción y mucha imaginación.","movie.svg"]
    ],
    series: [
      ["Brooklyn Nine-Nine",22,"Comedia · Sitcom","Una comisaría llena de personajes carismáticos, bromas y situaciones absurdamente divertidas.","series.svg"],
      ["The Good Place",22,"Comedia · Fantasía","Una serie ingeniosa que mezcla humor, amistad y preguntas interesantes sobre cómo vivir mejor.","series.svg"],
      ["Modern Family",22,"Comedia · Familiar","Tres familias muy diferentes atraviesan situaciones cotidianas con muchísimo humor.","series.svg"]
    ],
    musica: [
      ["Don't Stop Me Now - Queen",4,"Rock · Energética","Un clásico lleno de energía para levantar el ánimo y cantar a todo volumen.","music.svg"],
      ["Happy - Pharrell Williams",4,"Pop · Feel-good","Una canción alegre y positiva perfecta para acompañar un buen momento.","music.svg"],
      ["Good Life - OneRepublic",4,"Pop · Feel-good","Una vibra optimista para disfrutar el momento y desconectarte un rato.","music.svg"]
    ]
  },
  tranquilo: {
    peliculas: [
      ["Paddington 2",103,"Aventura · Familiar","Una historia cálida y reconfortante con humor, amistad y un protagonista encantador.","movie.svg"],
      ["The Secret Life of Walter Mitty",114,"Aventura · Drama","Una historia inspiradora sobre salir de la rutina y empezar a vivir nuevas experiencias.","movie.svg"],
      ["About Time",123,"Drama · Fantasía","Una película emotiva sobre el tiempo, la familia y apreciar los pequeños momentos.","movie.svg"]
    ],
    series: [
      ["Ted Lasso",30,"Comedia · Deportes","Optimismo, amistad y deporte en una serie que combina humor con momentos emotivos.","series.svg"],
      ["Anne with an E",47,"Drama · Coming-of-age","Una joven imaginativa enfrenta cambios, amistades y desafíos mientras encuentra su lugar.","series.svg"],
      ["Atypical",35,"Comedia · Drama","Una historia familiar y cercana sobre crecer, encontrar independencia y entender a los demás.","series.svg"]
    ],
    musica: [
      ["Here Comes the Sun - The Beatles",3,"Rock · Clásica","Una canción luminosa y tranquila para cambiar poco a poco el ambiente.","music.svg"],
      ["Viva La Vida - Coldplay",4,"Alternative · Rock","Melodía épica y reflexiva para acompañar un momento de calma.","music.svg"],
      ["Three Little Birds - Bob Marley",3,"Reggae · Relax","Una vibra tranquila que transmite calma y buena energía.","music.svg"]
    ]
  },
  energia: {
    peliculas: [
      ["Top Gun: Maverick",131,"Acción · Drama","Aviones, velocidad y grandes escenas de acción para una sesión intensa.","movie.svg"],
      ["Guardians of the Galaxy",121,"Acción · Ciencia ficción","Superhéroes, humor, música y una aventura espacial con muchísimo ritmo.","movie.svg"],
      ["Baby Driver",113,"Acción · Thriller","Persecuciones y una banda sonora increíble que convierten cada escena en un videoclip.","movie.svg"]
    ],
    series: [
      ["Cobra Kai",35,"Acción · Comedia","Rivalidades, artes marciales y mucha energía en cada episodio.","series.svg"],
      ["The Umbrella Academy",50,"Acción · Fantasía","Una familia disfuncional de héroes intenta evitar catástrofes mientras descubre secretos.","series.svg"],
      ["Stranger Things",50,"Ciencia ficción · Aventura","Misterio, aventura y una amenaza sobrenatural que mantiene el ritmo alto.","series.svg"]
    ],
    musica: [
      ["Believer - Imagine Dragons",3,"Rock · Pop","Percusión potente y una energía intensa para activarte.","music.svg"],
      ["Thunderstruck - AC/DC",5,"Hard Rock","Guitarras y energía pura para subir el volumen.","music.svg"],
      ["Can't Hold Us - Macklemore & Ryan Lewis",4,"Hip-hop · Pop","Ritmo rápido y una sensación de impulso para mantenerte en movimiento.","music.svg"]
    ]
  },
  concentrarme: {
    peliculas: [
      ["The Social Network",120,"Drama · Tecnología","Una historia de ambición, tecnología y emprendimiento contada con un ritmo muy preciso.","movie.svg"],
      ["Hidden Figures",127,"Drama · Historia","Una historia inspiradora sobre talento, ciencia y perseverancia.","movie.svg"],
      ["The Martian",144,"Ciencia ficción · Aventura","Ingenio, ciencia y supervivencia en una misión espacial llena de problemas por resolver.","movie.svg"]
    ],
    series: [
      ["Cosmos",45,"Documental · Ciencia","Una exploración visual del universo y de las grandes preguntas de la ciencia.","series.svg"],
      ["Our Planet",50,"Documental · Naturaleza","Imágenes impresionantes de la naturaleza acompañadas de historias sobre nuestro planeta.","series.svg"],
      ["Abstract: The Art of Design",45,"Documental · Diseño","Creatividad, diseño y procesos de trabajo contados desde diferentes disciplinas.","series.svg"]
    ],
    musica: [
      ["Lo-fi Beats",60,"Lo-fi · Instrumental","Ritmos suaves pensados para estudiar, leer o trabajar sin distraerte.","music.svg"],
      ["Peaceful Piano",60,"Piano · Instrumental","Piano tranquilo para crear un ambiente calmado y concentrado.","music.svg"],
      ["Deep Focus",60,"Ambient · Instrumental","Sonidos ambientales para acompañar sesiones largas de concentración.","music.svg"]
    ]
  }
};

const steps = [...document.querySelectorAll(".step")];
const form = document.getElementById("recommendation-form");
const progressBar = document.getElementById("progress-bar");
const stepLabel = document.getElementById("step-label");
const progressPercent = document.getElementById("progress-percent");
const result = document.getElementById("result");
const message = document.getElementById("message");
let currentStep = 0;

function updateStep() {
  steps.forEach((step, i) => step.classList.toggle("active", i === currentStep));
  const number = currentStep + 1;
  const percent = Math.round((number / steps.length) * 100);
  progressBar.style.width = percent + "%";
  stepLabel.textContent = `Paso ${number} de ${steps.length}`;
  progressPercent.textContent = percent + "%";
}

function selected(name) {
  return document.querySelector(`input[name="${name}"]:checked`);
}

function next() {
  if (!selected(["animo","tipo","tiempo"][currentStep])) {
    steps[currentStep].classList.add("shake");
    setTimeout(() => steps[currentStep].classList.remove("shake"), 350);
    return;
  }
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStep();
    window.scrollTo({ top: form.offsetTop - 25, behavior: "smooth" });
  }
}

function back() {
  if (currentStep > 0) {
    currentStep--;
    updateStep();
    window.scrollTo({ top: form.offsetTop - 25, behavior: "smooth" });
  }
}

function recommend() {
  const animo = selected("animo")?.value;
  const tipo = selected("tipo")?.value;
  const tiempo = selected("tiempo")?.value;

  if (!animo || !tipo || !tiempo) return;

  let options = data[animo][tipo];
  if (tiempo === "30") options = options.filter(item => item[1] <= 30);
  if (tiempo === "60") options = options.filter(item => item[1] <= 60);

  if (!options.length) {
    document.getElementById("message-text").textContent = "No encontramos algo que encaje con ese tiempo. Prueba con más tiempo disponible.";
    message.hidden = false;
    result.hidden = true;
    return;
  }

  const item = options[Math.floor(Math.random() * options.length)];
  const [title, duration, genre, description, image] = item;

  document.getElementById("result-type").textContent = tipo === "peliculas" ? "Película" : tipo === "series" ? "Serie" : "Música";
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-duration").textContent = duration;
  document.getElementById("result-genre").textContent = genre;
  document.getElementById("result-description").textContent = description;
  document.getElementById("result-image").src = "static/images/" + image;
  document.getElementById("result-image").alt = title;

  message.hidden = true;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".next-btn").forEach(btn => btn.addEventListener("click", next));
document.querySelectorAll(".back-btn").forEach(btn => btn.addEventListener("click", back));
form.addEventListener("submit", e => { e.preventDefault(); recommend(); });
document.getElementById("again-btn").addEventListener("click", recommend);
document.querySelectorAll(".option").forEach(option => option.addEventListener("click", () => option.scrollIntoView({block:"nearest",behavior:"smooth"})));

updateStep();
