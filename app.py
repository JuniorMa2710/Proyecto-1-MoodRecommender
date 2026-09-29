from flask import Flask, render_template, request
import random

app = Flask(__name__)

recomendaciones = {
    "feliz": {
        "peliculas": [
            {"titulo": "Spider-Man: Into the Spider-Verse", "duracion": 117},
            {"titulo": "Jumanji: Welcome to the Jungle", "duracion": 119},
            {"titulo": "The Lego Movie", "duracion": 100}
        ],
        "series": [
            {"titulo": "Brooklyn Nine-Nine", "duracion": 22},
            {"titulo": "The Good Place", "duracion": 22},
            {"titulo": "Modern Family", "duracion": 22}
        ],
        "musica": [
            {"titulo": "Don't Stop Me Now - Queen", "duracion": 4},
            {"titulo": "Happy - Pharrell Williams", "duracion": 4},
            {"titulo": "Good Life - OneRepublic", "duracion": 4}
        ]
    },
    "triste": {
        "peliculas": [
            {"titulo": "Paddington 2", "duracion": 103},
            {"titulo": "The Secret Life of Walter Mitty", "duracion": 114},
            {"titulo": "About Time", "duracion": 123}
        ],
        "series": [
            {"titulo": "Ted Lasso", "duracion": 30},
            {"titulo": "Anne with an E", "duracion": 47},
            {"titulo": "Atypical", "duracion": 35}
        ],
        "musica": [
            {"titulo": "Here Comes the Sun - The Beatles", "duracion": 3},
            {"titulo": "Viva La Vida - Coldplay", "duracion": 4},
            {"titulo": "Three Little Birds - Bob Marley", "duracion": 3}
        ]
    },
    "energia": {
        "peliculas": [
            {"titulo": "Top Gun: Maverick", "duracion": 131},
            {"titulo": "Guardians of the Galaxy", "duracion": 121},
            {"titulo": "Baby Driver", "duracion": 113}
        ],
        "series": [
            {"titulo": "Cobra Kai", "duracion": 35},
            {"titulo": "The Umbrella Academy", "duracion": 50},
            {"titulo": "Stranger Things", "duracion": 50}
        ],
        "musica": [
            {"titulo": "Believer - Imagine Dragons", "duracion": 3},
            {"titulo": "Thunderstruck - AC/DC", "duracion": 5},
            {"titulo": "Can't Hold Us - Macklemore & Ryan Lewis", "duracion": 4}
        ]
    },
    "concentrarme": {
        "peliculas": [
            {"titulo": "The Social Network", "duracion": 120},
            {"titulo": "Hidden Figures", "duracion": 127},
            {"titulo": "The Martian", "duracion": 144}
        ],
        "series": [
            {"titulo": "Cosmos", "duracion": 45},
            {"titulo": "Our Planet", "duracion": 50},
            {"titulo": "Abstract: The Art of Design", "duracion": 45}
        ],
        "musica": [
            {"titulo": "Lo-fi Beats", "duracion": 60},
            {"titulo": "Peaceful Piano", "duracion": 60},
            {"titulo": "Deep Focus", "duracion": 60}
        ]
    }
}

limites_tiempo = {
    "30": 30,
    "60": 60,
    "120": 120
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
        limite = limites_tiempo.get(tiempo)

        if opciones and limite:
            disponibles = [
                item for item in opciones
                if item["duracion"] <= limite
            ]

            if disponibles:
                recomendacion = random.choice(disponibles)
            else:
                mensaje = "No encontramos algo que entre en ese tiempo. Prueba con más tiempo disponible."
        else:
            mensaje = "Completa todas las opciones para recibir una recomendación."

    return render_template(
        "index.html",
        recomendacion=recomendacion,
        mensaje=mensaje
    )

if __name__ == "__main__":
    app.run(debug=True)
