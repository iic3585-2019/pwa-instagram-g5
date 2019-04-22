# Tarea 4: Progressive web apps, "Instagram"

## Integrantes
- Francisco Olivares
- Gabriel Valenzuela

## Instrucciones para correr el código

1. Instale las dependencias del proyecto con
```
npm install
```
2. Levante la base de datos en la carpeta `DOCKER-POSTGRES` con el comando
```
docker-compose up
```
3. Levante la api de la carpeta `API` con el comando (*)
```
rails s -b 0.0.0.0
``` 
4. Finalmente hostee el servidor de development
```
npm run start
```

(*) **Importante** vea las instrucciones sobre cómo levantar y poblar la base de datos en el `README.md` de `API`

## El problema

Implementar un ejemplo de aplicación web progresiva (PWA), tal que:

- Tenga comportamiento offline
- Se pueda instalar en el dispositivo
- Tenga notificaciones push.

En particular el ejemplo de web es un "clon" de instagram. Este clon cumple con las siguientes carácteristicas/funcionalidades:

- 2 usuarios iniciales
- Cada usuario puede hacer posts (con una imágen estática)
- API Rails que entrega y crea los posts
- Se muestran los últimos posts recibidos si no hay conexión
- Se puede instalar la aplicación en el dispositivo.
- Cuando se publica un post, los demás usuarios reciben una notificación.
