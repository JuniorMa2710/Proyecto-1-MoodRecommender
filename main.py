print("=== MoodRecommender ===")
print("Vamos a encontrar una recomendación según tu estado de ánimo y el tiempo que tengas.")

recomendaciones = {
    "1": ["Una película de comedia", "Una película de aventura"],
    "2": ["Una película tranquila", "Una película reconfortante"],
    "3": ["Una película de acción", "Una película de aventura"],
    "4": ["Música instrumental", "Una película documental"]
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

if opcion in recomendaciones:
    print("\nTu recomendación es:", recomendaciones[opcion][0])

    if tiempo == "1":
        print("⏱️ Tienes poco tiempo, así que busca algo corto.")
    elif tiempo == "2":
        print("⏱️ Tienes alrededor de una hora, puedes ver algo de duración media.")
    elif tiempo == "3":
        print("⏱️ Tienes bastante tiempo, puedes disfrutar de algo más largo.")
    else:
        print("No reconocí la opción de tiempo.")
else:
    print("\nNo reconocí esa opción de ánimo.")

print("\n¡Gracias por usar MoodRecommender!")