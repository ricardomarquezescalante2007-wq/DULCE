# Álbum de recuerdos para Dulce

Sitio web estático creado para celebrar los 19 años de Dulce Liseth Sánchez Santana. Incluye un libro interactivo con dedicatorias, fotografías, videos y una playlist de Spotify.

## Cómo abrirlo

Abre `index.html` en un navegador web. No se requiere instalar dependencias ni ejecutar un proceso de compilación.

Para editar el proyecto, abre la carpeta completa en Visual Studio Code y modifica los archivos del proyecto.

## Controles

- Usa **Anterior** y **Siguiente** para cambiar de página.
- También puedes hacer clic en el libro, deslizar en una pantalla táctil o usar las flechas izquierda y derecha del teclado.
- El botón **Música** muestra u oculta la playlist de Spotify.
- Los videos se reproducen en silencio y en bucle al llegar a la página correspondiente. La reproducción de Spotify requiere conexión a internet.

## Archivos

```text
index.html   Contenido y estructura del álbum
styles.css   Diseño adaptable a computadora y celular
script.js    Cambio de páginas, controles y reproducción de medios
fotos/       Fotografías JPEG del álbum
videos/      Videos MP4 del álbum
```

### Fotografías

Las imágenes actuales están en `fotos/`:

- `portada.jpeg`
- `portada-amistad.jpeg`
- `infancia-retrato.jpeg`
- `infancia-vestido.jpeg`
- `amistad-parque-01.jpeg`
- `amistad-parque-02.jpeg`
- `actual-retrato.jpeg`
- `actual-parque.jpeg`
- `cumple-recuerdo.jpeg`

### Videos

Los videos actuales están en `videos/`:

- `recuerdo-compartido.mp4`
- `risas-amigas.mp4`
- `aventura-especial.mp4`
- `dia-especial.mp4`
- `celebracion-juntas.mp4`
- `alegria-compartida.mp4`
- `recuerdo-inolvidable.mp4`

## Reemplazar o agregar medios

Para reemplazar una foto o un video, conserva el nombre y la extensión del archivo para que el álbum siga encontrándolo. Si cambias un nombre o agregas un medio, actualiza también su ruta y texto alternativo o descripción en `index.html`.

Las fuentes tipográficas y la playlist de Spotify se cargan desde internet; el resto del álbum y sus medios se encuentran en las carpetas del proyecto.
