# Desarrollo Apps Entrega Final

## Consigna
- Preparar la estructura base de un proyecto móvil utilizando React Native.
- Construir los componentes, su lógica y aplicar el manejo de estado de la aplicación.
- Utilizar interfaces del dispositivo y sus permisos correspondientes
- Implementar capacidad offline utilizando herramientas de la nube.
- Crear una compilación móvil para Android y disponer el APK en tu móvil.

### Aspectos a incluir
- Lista optimizada y componentes reutilizables.
- Navegación.
- Manejo de estado.
- Conexión con API.
- Interfaz de dispositivo (ejemplo: location, cámara, galería de fotos).
- Persistencia de datos.
- Configuración de publicación (ícono, splash, y permisos)


## Implementacion

### Descripcion
Se trata de una app de tiendas veganas, donde el usuario se puede registrar, buscar y agregar tiendas veganas. Esta app la estamos desarrollando con una amiga que esta haviendo el curso de UX/UI pero aun no a avanzado lo suficiente, por lo que el diseno en general y la funcionalidad no estan desarrollados. Simplemente complete esta parte de forma de poder cumplir con los requisitos de la entrega final.

### Caracterisiticas
Almacenamiento local SQLite y en la nube Firebase-Realtime
En el almacenamiento local se guarda la informacion de usuario y en la nube la informacion de tiendas y todos los usuarios registrados.
#### INICIO
Se verifica se hay usuario almacenado localmente, si es asi se compara con los datos de usuario almacenados en Firebase, y si coinciden se "loguea" el usuario.
Si no hay usuario almacenado localmente o no coinciden los datos, se piden los mismos para loguearse.
#### BUSCADOR
Aqui se muestra la lista de tiendas almacenadas en firestore (no se ha implementado almacenamiento para fotos en la nube). No estan implementadas las funciones de Buscar, Filtrar u Ordenar.
#### NUEVO
Aqui se registra una nueva tienda con la posibilidad de tomar un foto o utilizar una almacenada en el dispositivo.
### PERFIL
Aqui se registra un nuevo usuario. Se verfifica que el email no este refistrado en firebase.