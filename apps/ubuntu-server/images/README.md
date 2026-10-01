# Capturas de Ubuntu Server en VirtualBox

Los 11 SVG son placeholders, no capturas reales. Cada etiqueta `<img>` del tutorial tiene un comentario con el nombre previsto de la imagen y un pie que explica qué capturar.

## Sustitución

1. Guarda la captura en esta carpeta con el nombre PNG de la tabla. También puedes usar JPG o WebP si cambias la extensión del enlace.
2. En `../index.html`, cambia el `src` de la etiqueta `<img>` correspondiente de `.svg` a `.png`.
3. Actualiza el `alt`, quitando «Captura pendiente», y ajusta `width` y `height` a las dimensiones reales. El CSS mantiene la proporción.
4. Comprueba que las opciones y los resultados se leen bien. Oculta datos personales y nunca incluyas contraseñas.

| Archivo | Qué debe mostrar |
| --- | --- |
| `01-nueva-maquina.png` | Nombre, ISO, Ubuntu de 64 bits e instalación manual. |
| `02a-hardware.png` | Hardware del asistente: 4096 MB, 2 CPU y EFI activado. |
| `02b-disco-vdi.png` | Disco del asistente: VDI nuevo de 25 GB, reserva de tamaño completo desactivada. |
| `02c-red-nat.png` | Después de crear la VM: Adaptador 1 habilitado, NAT y Cable conectado. |
| `03-teclado.png` | Distribución y variante del teclado. |
| `04-red-dhcp.png` | Interfaz de red con una IPv4 obtenida por DHCP. |
| `05-almacenamiento.png` | Disco y particiones con sus puntos de montaje, antes de confirmar. |
| `06-perfil.png` | Servidor ubuntu-practica y usuario usuario, sin mostrar la contraseña. |
| `07-instalacion-completa.png` | Instalación terminada y opción de reiniciar. |
| `08-primer-acceso.png` | Consola tras iniciar sesión. |
| `09-comprobaciones.png` | Resultados de hostname, ip -br address y systemctl --failed. |

No hace falta una captura de la página de descarga. Las capturas corresponden a Ubuntu Server 26.04 LTS; los textos pueden variar según la revisión y el idioma del instalador.
