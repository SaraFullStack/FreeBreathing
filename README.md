# FreeBreathing

Web de respiración guiada en HTML, CSS y JavaScript sin frameworks. 

https://butterfly-dreams.itch.io/freebreathing

## Cómo abrir

- **Fácil:** abre `index.html` en el navegador. Los 15 patrones integrados se muestran aunque `fetch` no pueda leer archivos locales.
- **Recomendado para editar el JSON:** abre esta carpeta con VS Code + Live Server, o ejecuta `python -m http.server 8000` dentro de `FreeBreathing` y visita `http://localhost:8000`.

## Editar meditaciones

Edita `programas.json` para cambiar los ritmos y sus categorías. Cada programa contiene:

```json
{
  "id": "nuevo",
  "nombre": "Mi meditación",
  "categoria": "equilibrio",
  "descripcion": "Una frase corta",
  "inhalar": 5,
  "sostener": 0,
  "exhalar": 7,
  "pausa": 0
}
```

Los números representan segundos en el orden **inhalar – sostener – exhalar – pausa**. Una fase con 0 segundos se omite; inhalar y exhalar deben ser mayores que 0. El sitio usa `programas.json` como fuente al abrirlo mediante un servidor. Para abrirlo directamente con `file://`, se usa la copia de respaldo integrada en `app.js`.

También puedes pulsar **Crear mi ritmo** y guardar tus patrones personales en el almacenamiento local del navegador.

## Audio y vídeo

- `assets/naturaleza.mp4`: fondo en bucle, silenciado.
- `assets/ambiente.mp3`: música ambiental en bucle durante la sesión.
- `assets/cuenco.mp3`: sonido de cuenco al empezar cada fase que tenga duración distinta de cero.
- `assets/poster.jpg`: imagen que se muestra antes de reproducirse el vídeo.

Por las restricciones de los navegadores, la música y el cuenco comienzan cuando se pulsa un botón para iniciar una sesión. Los controles de sonido permiten silenciar cada pista y ajustar sus volúmenes. La sesión se pausa si cambias de pestaña.

No requiere conexión a internet para funcionar; las fuentes externas son opcionales y hay fuentes de sistema como alternativa.


## Idiomas / Languages
Usa los botones ES y EN de la cabecera. El idioma se guarda en el navegador. / Use the ES and EN buttons in the header. Your preference is saved locally.

Portada para itch.io: `assets/portada-itch.png`.


## Runner de respiración y voz
La gráfica avanza continuamente como una cinta sin fin: el punto sigue los ciclos de inhalar, sostener, exhalar y descansar. El patrón se desplaza lentamente hasta que termina la duración seleccionada; con «Sin límite», continúa indefinidamente.
La voz usa `speechSynthesis` del navegador para anunciar cada fase en ES/EN y puede desactivarse con el botón **Voz / Voice**. La disponibilidad de voces depende del navegador y el sistema.
El cuenco suena únicamente al comenzar y finalizar la sesión.
Enlace a Butterfly Dreams: https://butterfly-dreams.itch.io/
