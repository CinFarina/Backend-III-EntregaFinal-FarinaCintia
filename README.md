# Backend-III-EntregaFinal-FarinaCintia

Proyecto final de Backend III basado en AdoptMe.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Faker
- Swagger
- Mocha / Chai / Supertest
- Docker

---

## Documentación (Swagger)

- **Users**  
  http://localhost:8080/api/docs/users

- **Adoptions**  
  http://localhost:8080/api/docs/adoptions

---

## Tests funcionales

Se desarrollaron tests funcionales para los endpoints del módulo **Adoptions**.

Para ejecutarlos:

```bash
npm test

---

## Docker

⚠️ **Nota**

Debido a restricciones del sistema (WSL2 / Docker Desktop bloqueado por políticas del equipo),
no fue posible construir y subir la imagen a Docker Hub desde el entorno local.

Sin embargo:

- El proyecto incluye un **Dockerfile funcional**
- La imagen puede construirse correctamente desde cualquier entorno con Docker habilitado ejecutando:

```bash
docker build -t backend3-entrega-final .
