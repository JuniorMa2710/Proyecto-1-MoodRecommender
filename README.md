# MoodRecommender 🎬🎵📺

MoodRecommender es un proyecto de Python que recomienda películas, series o música según el estado de ánimo y el tiempo disponible.

## Versiones

### 🐍 Consola
El archivo `main.py` contiene la primera versión del proyecto para practicar:

- `print()`
- `input()`
- Variables
- `if / elif / else`
- Listas
- Diccionarios
- `random`

### 🌐 Página web
La versión web usa **Flask** y está formada por:

- `app.py`: lógica de Python y servidor web.
- `templates/index.html`: interfaz de la página.
- `static/style.css`: diseño visual.
- `requirements.txt`: dependencia necesaria.

## Cómo ejecutar la página en Codespaces

Primero instala Flask:

```bash
pip install -r requirements.txt
```

Después ejecuta:

```bash
python app.py
```

Codespaces debería mostrar un aviso para abrir el puerto de la aplicación. Selecciona **Open in Browser**.

La aplicación se ejecuta normalmente en el puerto **5000**.

## Próximos pasos

- Agregar imágenes para las recomendaciones.
- Mostrar una descripción de cada película, serie o canción.
- Mejorar el diseño.
- Agregar más estados de ánimo.
- Crear recomendaciones más personalizadas.
