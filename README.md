# MoodRecommender 🎬🎵📺

MoodRecommender es una página web interactiva que recomienda películas, series o música según tu estado de ánimo y el tiempo disponible.

## 🌐 Versión pública

La página está preparada para publicarse con **GitHub Pages** y quedar disponible mediante un enlace HTTPS:

**https://juniorma2710.github.io/Proyecto-1-MoodRecommender/**

La web pública es completamente estática: funciona con HTML, CSS y JavaScript, así que los visitantes no necesitan Codespaces, Python ni iniciar sesión en GitHub.

## 🧠 Cómo funciona

1. El usuario elige cómo se siente.
2. Elige entre película, serie o música.
3. Elige cuánto tiempo tiene.
4. JavaScript filtra las opciones.
5. Se muestra una recomendación aleatoria con título, género, duración, descripción e imagen.

## 📁 Archivos principales

- `index.html`: página pública.
- `static/style.css`: diseño moderno y responsive.
- `static/site.js`: lógica de recomendaciones e interacción.
- `static/images/`: ilustraciones de películas, series y música.
- `app.py`: versión Python/Flask para seguir aprendiendo backend.
- `main.py`: versión inicial de consola.
- `.github/workflows/pages.yml`: despliegue automático con GitHub Pages.

## 🛠️ Publicación

El repositorio incluye un workflow de GitHub Actions que publica el contenido estático en GitHub Pages cada vez que se actualiza la rama `main`.

Para la cuenta gratuita, el repositorio debe ser público para usar GitHub Pages.