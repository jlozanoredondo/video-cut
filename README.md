# Video Cut

Video Cut es una herramienta web que permite a los usuarios subir un video y seleccionar un segmento específico del video para cortar y guardar. Utiliza la librería FFmpeg en el servidor para realizar el corte del video, y React en el frontend para la interactividad y visualización.

## Funcionalidades

1. **Subida de video**: Los usuarios pueden subir un archivo de video desde su equipo.
2. **Selección de rango de tiempo**: Una vez que el video se ha subido, se muestra un slider que permite seleccionar un rango de tiempo. El rango de tiempo seleccionado es el segmento que se cortará del video original.
3. **Corte de video**: Al hacer clic en el botón "Cut", el segmento seleccionado se corta del video original y se guarda en el servidor.

## Instalación

Para instalar y ejecutar Video Cut en tu propio equipo, sigue estos pasos:

1. **Clonar el repositorio**: Clona este repositorio a tu equipo local utilizando `git clone`.

2. **Instalar las dependencias del servidor**: Navega hasta el directorio del servidor (py-video-cut) y ejecuta `pip install -r requirements.txt`.

3. **Instalar las dependencias del cliente**: Navega hasta el directorio del cliente (react-video-cut) y ejecuta `npm install`.

4. **Iniciar el servidor**: Desde el directorio del servidor, ejecuta `python app.py`.

5. **Iniciar el cliente**: Desde el directorio del cliente, ejecuta `npm start`.

¡Ahora deberías poder acceder a la aplicación en tu navegador en `localhost:3000` (o la dirección que se muestra en la consola)!
