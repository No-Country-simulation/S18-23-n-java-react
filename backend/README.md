# Backend Project

## Descripción

Este es el proyecto backend de la aplicación, que utiliza Spring Boot para construir la api .

## Requisitos
- Java 17
- Spring Boot
- MySQL

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/No-Country-simulation/S18-23-n-java-react.git

2. Navega a la carpeta del backend:
   ```bash
   cd backend/rentify
   
3. Instala las dependencias:
   ```bash
   ./mvnw install

## API Endpoints
1. Obtener lista de features.
   Método: **GET**
   Endpoint: /feature
   Descripción: Devuelve una lista de todas la features registradas en la base de datos.
   Response:
   [
      {
       "id": 1,
       "name": "Full Kitchen"
     },
     {
       "id": 2,
       "name": "Pet-Friendly"
     }
   ]

2. Obtener una feature específica.
   Método: **GET**
   Endpoint: /feature/{id_feature]
   Descripción: Devuelve una feature específica.
   Response:
   {
       "id": 1,
       "name": "Full Kitchen"
   }
