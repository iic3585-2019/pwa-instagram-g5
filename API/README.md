# PWA - "Instagram" Back-end

## Requisitos
- Ruby (Idealmente mediante rvm)
- Node

## Instrucciones para levantar la api

Antes de partir recuerde levantar la base de datos

1. Instale las dependencias mediante el comando
```
bundle install
```
2. Cree la base de datos, las tablas y pueblelas ejecutando los siguientes comandos
```
rake db:create
rake db:migrate
rake db:seed
```
3. Finalmente levante el servidor con el siguiente comando
```
rails s -b 0.0.0.0
```

**Recomendación:** Entre al directorio mediante una consola para que así rvm tome la versión de ruby y el gemset.
