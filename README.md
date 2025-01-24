# web-ecommerce

## Prerequisitos

- Angular (18)
- Stripe
- Boostrab
## Configuracion

El proyecto esta desarrollado en arquitectura de front standalone e implementa `Angular 18` 

## Estructura de Proyecto

| Modulo                                         | Contenido                                                                                                                                                                               |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **app.component.ts**				 | Archivo principal de arranque  del proyecto
| **app.component.html**				 | Archivo html principal
| **main.ts**                                    | módulo raíz de la aplicación  y enrutador                                                                                                                                                        
**environment.ts**                          | Archivo de variables de entorno |                                                                     
**package.json**                          | Archivo de Dependencias del proyecto

## Dependencias con otros aplicativos
| Satelite		                       | RECURSO                 | Tipo de recurso                                   |Estructura de la solicitud       |
| ------------------------------------ | -----------------------| --------------------------------------------------| --------------------------------|
| **ms-productos**             	   |http://localhost:8080    | SERVICIO REST  						     			    | JSON REQUEST|   
| **ms-ordenes**             	   |http://localhost:8081     | SERVICIO REST                  |JSON REQUEST|	
| **ms-facturacion**             	   |http://localhost:8082     | SERVICIO REST                  |JSON REQUEST|						                                                          




## Despliegue de aplicacion

Se desplega en S3, o cualquier sitio web.

| DIST             | Puerto | Build                                     | Run                                             |
| --------------------- | ------ | ----------------------------------------- | ----------------------------------------------- |
| **web-ecommerce**| NA   | ./ng build --prod      | ng-serve -o embebido                            |

## Demo
https://e-commerce.dirsio.mx/

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](https://www.dirsio.mx/)

![Logo](https://web-dirsio.s3.us-west-1.amazonaws.com/favicon.ico)
