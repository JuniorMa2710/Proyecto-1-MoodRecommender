from flask import Flask, render_template, request
import random

app = Flask(__name__)

recomendaciones = {
    "feliz": {
        "nombre": "Feliz",
        "peliculas": [
            {"titulo": "Spider-Man: Into the Spider-Verse", "duracion": 117, "genero": "Animación · Acción", "descripcion": "Una aventura visualmente increíble con humor, energía y una historia que celebra ser diferente.", "imagen": "movie.svg"},
            {"titulo": "Jumanji: Welcome to the Jungle", "duracion": 119, "genero": "Aventura · Comedia", "descripcion": "Un grupo de amigos entra en un videojuego lleno de retos, acción y momentos muy divertidos.", "imagen": "movie.svg"},
            {"titulo": "The Lego Movie", "duracion": 100, "genero": "Animación · Comedia", "descripcion": "Una aventura divertida y creativa que mezcla humor, acción y mucha imaginación.", "imagen": "movie.svg"}
        ],
        "series": [
            {"titulo": "Brooklyn Nine-Nine", "duracion": 22, "genero": "Comedia · Sitcom", "descripcion": "Una comisaría llena de personajes carismáticos, bromas y situaciones absurdamente divertidas.", "imagen": "series.svg"},
            {"titulo": "The Good Place", "duracion": 22, "genero": "Comedia · Fantasía", "descripcion": "Una serie ingeniosa que mezcla humor, amistad y preguntas interesantes sobre cómo vivir mejor.", "imagen": "series.svg"},
            {"titulo": "Modern Family", "duracion": 22, "genero": "Comedia · Familiar", "descripcion": "Tres familias muy diferentes atraviesan situaciones cotidianas con muchísimo humor.", "imagen": "series.svg"}
        ],
        "musica": [
            {"titulo": "Don't Stop Me Now - Queen", "duracion": 4, "genero": "Rock · Energética", "descripcion": "Un clásico lleno de energía para levantar el ánimo y cantar a todo volumen.", "imagen": "music.svg"},
            {"titulo": "Happy - Pharrell Williams", "duracion": 4, "genero": "Pop · Feel-good", "descripcion": "Una canción alegre y positiva perfecta para acompañar un buen momento.", "imagen": "music.svg"},
            {"titulo": "Good Life - OneRepublic", "duracion": 4, "genero": "Pop · Feel-good", "descripcion": "Una vibra optimista para disfrutar el momento y desconectarte un rato.", "imagen": "music.svg"}
        ]
    },
    "triste": {
        "nombre": "Tranquilo / triste",
        "peliculas": [
            {"titulo": "Paddington 2", "duracion": 103, "genero": "Aventura · Familiar", "descripcion": "Una historia cálida y reconfortante con humor, amistad y un protagonista encantador.", "imagen": "movie.svg"},
            {"titulo": "The Secret Life of Walter Mitty", "duracion": 114, "genero": "Aventura · Drama", "descripcion": "Una historia inspiradora sobre salir de la rutina y empezar a vivir nuevas experiencias.", "imagen": "movie.svg"},
            {"titulo": "About Time", "duracion": 123, "genero": "Romance · Drama", "descripcion": "Una película emotiva sobre el tiempo, la familia y apreciar los pequeños momentos.", "imagen": "movie.svg"}
        ],
        "series": [
            {"titulo": "Ted Lasso", "duracion": 30, "genero": "Comedia · Deportes", "descripcion": "Optimismo, amistad y deporte en una serie que combina humor con momentos emotivos.", "imagen": "series.svg"},
            {"titulo": "Anne with an E", "duracion": 47, "genero": "Drama · Coming-of-age", "descripcion": "Una joven imaginativa enfrenta cambios, amistades y desafíos mientras encuentra su lugar.", "imagen": "series.svg"},
            {"titulo": "Atypical", "duracion": 35, "genero": "Comedia · Drama", "descripcion": "Una historia familiar y cercana sobre crecer, encontrar independencia y entender a los demás.", "imagen": "series.svg"}
        ],
        "musica": [
            {"titulo": "Here Comes the Sun - The Beatles", "duracion": 3, "genero": "Rock · Clásica", "descripcion": "Una canción luminosa y tranquila para cambiar poco a poco el ambiente.", "imagen": "music.svg"},
            {"titulo": "Viva La Vida - Coldplay", "duracion": 4, "genero": "Alternative · Rock", "descripcion": "Melodía épica y reflexiva para acompañar un momento de calma.", "imagen": "music.svg"},
            {"titulo": "Three Little Birds - Bob Marley", "duracion": 3, "genero": "Reggae · Relax", "descripcion": "Una vibra tranquila que transmite calma y buena energía.", "imagen": "music.svg"}
        ]
    },
    "energia": {
        "nombre": "Con energía",
        "peliculas": [
            {"titulo": "Top Gun: Maverick", "duracion": 131, "genero": "Acción · Drama", "descripcion": "Aviones, velocidad y grandes escenas de acción para una sesión intensa.", "imagen": "movie.svg"},
            {"titulo": "Guardians of the Galaxy", "duracion": 121, "genero": "Acción · Ciencia ficción", "descripcion": "Superhéroes, humor, música y una aventura espacial con muchísimo ritmo.", "imagen": "movie.svg"},
            {"titulo": "Baby Driver", "duracion": 113, "genero": "Acción · Thriller", "descripcion": "Persecuciones y una banda sonora increíble que convierten cada escena en un videoclip.", "imagen": "movie.svg"}
        ],
        "series": [
            {"titulo": "Cobra Kai", "duracion": 35, "genero": "Acción · Comedia", "descripcion": "Rivalidades, artes marciales y mucha energía en cada episodio.", "imagen": "series.svg"},
            {"titulo": "The Umbrella Academy", "duracion": 50, "genero": "Acción · Fantasía", "descripcion": "Una familia disfuncional de héroes intenta evitar catástrofes mientras descubre secretos.", "imagen": "series.svg"},
            {"titulo": "Stranger Things", "duracion": 50, "genero": "Ciencia ficción · Aventura", "descripcion": "Misterio, aventura y una amenaza sobrenatural que mantiene el ritmo alto.", "imagen": "series.svg"}
        ],
        "musica": [
            {"titulo": "Believer - Imagine Dragons", "duracion": 3, "genero": "Rock · Pop", "descripcion": "Percusión potente y una energía intensa para activarte.", "imagen": "music.svg"},
            {"titulo": "Thunderstruck - AC/DC", "duracion": 5, "genero": "Hard Rock", "descripcion": "Guitarras y energía pura para subir el volumen.", "imagen": "music.svg"},
            {"titulo": "Can't Hold Us - Macklemore & Ryan Lewis", "duracion": 4, "genero": "Hip-hop · Pop", "descripcion": "Ritmo rápido y una sensación de impulso para mantenerte en movimiento.", "imagen": "music.svg"}
        ]
    },
    "concentrarme": {
        "nombre": "Quiero concentrarme",
        "peliculas": [
            {"titulo": "The Social Network", "duracion": 120, "genero": "Drama · Tecnología", "descripcion": "Una historia de ambición, tecnología y emprendimiento contada con un ritmo muy preciso.", "imagen": "movie.svg"},
            {"titulo": "Hidden Figures", "duracion": 127, "genero": "Drama · Historia", "descripcion": "Una historia inspiradora sobre talento, ciencia y perseverancia.", "imagen": "movie.svg"},
            {"titulo": "The Martian", "duracion": 144, "genero": "Ciencia ficción · Aventura", "descripcion": "Ingenio, ciencia y supervivencia en una misión espacial llena de problemas por resolver.", "imagen": "movie.svg"}
        ],
        "series": [
            {"titulo": "Cosmos", "duracion": 45, "genero": "Documental · Ciencia", "descripcion": "Una exploración visual del universo y de las grandes preguntas de la ciencia.", "imagen": "series.svg"},
            {"titulo": "Our Planet", "duracion": 50, "genero": "Documental · Naturaleza", "descripcion": "Imágenes impresionantes de la naturaleza acompañadas de historias sobre nuestro planeta.", "imagen": "series.svg"},
            {"titulo": "Abstract: The Art of Design", "duracion": 45, "genero": "Documental · Diseño", "descripcion": "Creatividad, diseño y procesos de trabajo contados desde diferentes disciplinas.", "imagen": "series.svg"}
        ],
        "musica": [
            {"titulo": "Lo-fi Beats", "duracion": 60, "genero": "Lo-fi · Instrumental", "descripcion": "Ritmos suaves pensados para estudiar, leer o trabajar sin distraerte.", "imagen": "music.svg"},
            {"titulo": "Peaceful Piano", "duracion": 60, "genero": "Piano · Instrumental", "descripcion": "Piano tranquilo para crear un ambiente calmado y concentrado.", "imagen": "music.svg"},
            {"titulo": "Deep Focus", "duracion": 60, "genero": "Ambient · Instrumental", "descripcion": "Sonidos ambientales para acompañar sesiones largas de concentración.", "imagen": "music.svg"}
        ]
    }
}

@app.route("/", methods=["GET", "POST"])
def index():
    recomendacion = None
    mensaje = None

    if request.method == "POST":
        animo = request.form.get("animo")
        tipo = request.form.get("tipo")
        tiempo = request.form.get("tiempo")
        opciones = recomendaciones.get(animo, {}).get(tipo, [])

        if tiempo == "30":
            opciones_disponibles = [item for item in opciones if item["duracion"] <= 30]
        elif tiempo == "60":
            opciones_disponibles = [item for item in opciones if item["duracion"] <= 60]
        elif tiempo == "all":
            opciones_disponibles = opciones
        else:
            opciones_disponibles = []

        if opciones_disponibles:
            recomendacion = random.choice(opciones_disponibles)
            recomendacion["tipo"] = {
                "peliculas": "Película",
                "series": "Serie",
                "musica": "Música"
            }.get(tipo, "Recomendación")
        else:
            mensaje = "No encontramos algo que encaje con ese tiempo. Prueba con más tiempo disponible."

    return render_template("index.html", recomendacion=recomendacion, mensaje=mensaje)

if __name__ == "__main__":
    app.run(debug=True)
