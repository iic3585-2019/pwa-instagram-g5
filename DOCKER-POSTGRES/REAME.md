# Base de datos postgres

## Requisitos
- docker
- docker-compose

## Instrucciones para levantar la base de datos
1. Levante el contenedor docker con el siguiente comando
```
docker-compose up
```

Cuando termine de ocupar la base de datos, baje el contenedor docker apretando `CTRL+C` en la terminal en donde ejecutó el up o ejecute el siguiente comando (en el directorio de la BD)
```
docker-compose stop
```