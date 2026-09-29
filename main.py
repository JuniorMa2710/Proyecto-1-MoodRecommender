print("=== MoodRecommender ===")
print("Vamos a encontrar una recomendación según tu estado de ánimo.")

print("\n¿Cómo te sientes?")
print("1. Feliz")
print("2. Triste")
print("3. Con energía")
print("4. Quiero concentrarme")

opcion = input("Elige una opción (1-4): ")

if opcion == "1":
    print("\nTe recomendamos una película de comedia o aventura.")
elif opcion == "2":
    print("\nTe recomendamos una película tranquila y reconfortante.")
elif opcion == "3":
    print("\nTe recomendamos una película de acción o aventura.")
elif opcion == "4":
    print("\nTe recomendamos música instrumental para concentrarte.")
else:
    print("\nNo reconocí esa opción. Intenta con un número del 1 al 4.")

print("\n¡Gracias por usar MoodRecommender!")