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

## 🧪 Laboratorio 3: avance y pruebas

### Commit exacto del avance corregido
El avance corregido de la aplicación quedó registrado en el commit:

**235a93f71ccb7ffb38403543f2a38f4f15368026**

Este commit incluye el control del tiempo, el ocultamiento de resultados al cambiar opciones, el uso de imágenes locales y el resumen de las selecciones.

### Opciones probadas y recomendación obtenida

- **Feliz + Película + 30 min:** se obtuvo **Piper (6 min)**.
- **Tranquilo + Serie + 30 min:** se obtuvo una serie de **30 min o menos**.
- **Triste + Música + 30 min:** se obtuvo una opción musical de **30 min o menos**.
- **Feliz + Película + 2 horas o más:** se obtuvo una película del catálogo que entra en el tiempo disponible.

Las recomendaciones se eligen al azar, por lo que pueden cambiar al repetir la misma prueba. Lo importante es que nunca se muestra una recomendación que supere el tiempo seleccionado.

### Correcciones realizadas antes de entregar Proyecto 1

- El tiempo ahora se respeta de forma estricta: 30 minutos significa máximo 30 minutos y 60 minutos significa máximo 60 minutos.
- Al cambiar cualquier opción, el resultado anterior se oculta para evitar confusión.
- Los bloques de resultado y mensajes permanecen ocultos hasta que son necesarios.
- Las imágenes de las recomendaciones ahora se cargan únicamente desde `static/images/`, dentro del repositorio.
- El resultado muestra un resumen del **ánimo, tipo de contenido y tiempo** elegidos.
