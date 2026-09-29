import random

print("=== MoodRecommender ===")
print("Encuentra una recomendación según tu estado de ánimo y el tiempo que tengas.")

recomendaciones = {
    "1": {
        "nombre": "Feliz",
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
    "2": {
        "nombre": "Triste",
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
    "3": {
        "nombre": "Con energía",
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
    "4": {
        "nombre": "Quiero concentrarme",
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

print("\n¿Cómo te sientes?")
print("1. Feliz")
print("2. Triste")
print("3. Con energía")
print("4. Quiero concentrarme")

opcion = input("Elige una opción (1-4): ")

print("\n¿Cuánto tiempo tienes?")
print("1. 30 minutos")
print("2. 1 hora")
print("3. 2 horas o más")

tiempo = input("Elige una opción (1-3): ")

print("\n¿Qué quieres recibir?")
print("1. Película")
print("2. Serie")
print("3. Música")

tipo = input("Elige una opción (1-3): ")

tipos = {
    "1": "peliculas",
    "2": "series",
    "3": "musica"
}

if opcion in recomendaciones and tipo in tipos:
    categoria = tipos[tipo]
    opciones = recomendaciones[opcion][categoria]

    if tiempo == "1":
        opciones_disponibles = [item for item in opciones if item["duracion"] <= 30]
    elif tiempo == "2":
        opciones_disponibles = [item for item in opciones if item["duracion"] <= 60]
    elif tiempo == "3":
        opciones_disponibles = opciones
    else:
        opciones_disponibles = []

    if opciones_disponibles:
        recomendacion = random.choice(opciones_disponibles)

        print("\n🎯 === TU RECOMENDACIÓN ===")
        print("Título:", recomendacion["titulo"])
        print("Duración aproximada:", recomendacion["duracion"], "minutos")
        print("Estado de ánimo:", recomendaciones[opcion]["nombre"])

        if tipo == "1":
            print("🎬 Tipo: Película")
        elif tipo == "2":
            print("📺 Tipo: Serie")
        else:
            print("🎵 Tipo: Música")

        print("\n¡Disfruta tu recomendación!")
    else:
        print("\n😕 No encontramos una recomendación que entre en el tiempo que tienes.")
        print("Prueba con más tiempo disponible.")
else:
    print("\n❌ Una de las opciones no es válida.")

print("\n¡Gracias por usar MoodRecommender!")