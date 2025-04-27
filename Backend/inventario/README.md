# Inventario API - Prueba Técnica QPAlliance

Proyecto desarrollado como parte de la prueba técnica para el cargo de Programador Full Stack en QPAlliance.

## 📚 Descripción

Este proyecto es una API REST construida con Java Spring Boot para la gestión básica de inventarios dentro de un sistema MRP.

Incluye funcionalidades para:

- Crear productos.
- Listar todos los productos registrados.
- Listar productos cuyo stock actual esté por debajo del stock mínimo.

## 🚀 Tecnologías utilizadas

- Java 17
- Spring Boot 3.4.5
- Spring Data JPA
- H2 Database (Base de datos en memoria)
- Maven
- Lombok

## ⚙️ Instalación y ejecución

### Prerrequisitos

- Tener instalado Java 17
- Tener instalado Maven
- Tener configurado WSL (en caso de usar Linux desde Windows)

### Pasos para correr el proyecto

1. Clona el repositorio o descarga el proyecto.
2. Desde la terminal, navega al directorio raíz del proyecto.
3. Ejecuta el siguiente comando para construir sin correr tests:

```bash
mvn clean install
```

4. Luego corre la aplicación con el siguiente comando:

```bash
mvn spring-boot:run
```
5. La API estará disponible en:

```
http://localhost:8080
```

## 💾 Acceso a la consola H2 (base de datos)

La consola de H2 está disponible en:

```
http://localhost:8080/h2-console
```

Credenciales:
- JDBC URL: `jdbc:h2:mem:inventario`
- Usuario: `sa`
- Contraseña: (dejar en blanco)

## 📌 Endpoints disponibles 
| Método | Endpoint                | Descripción                                         |
|--------|-------------------------|-----------------------------------------------------|
| GET    | /products               | Obtiene la lista de todos los productos             |
| POST   | /products               | Crea un nuevo producto                              |
| GET    | /products/bajo-stock    | Obtiene la lista de productos con stock bajo        |

Ejemplo de uso de los endpoints:

### Crear un nuevo producto

```bash
curl -X POST http://localhost:8080/products
```
```json
{
  "codigo": "P001",
  "nombre": "Producto Prueba",
  "stockActual": 10,
  "stockMinimo": 5
}
```

### Obtener todos los productos

```bash
curl -X GET http://localhost:8080/products
```
### Respuesta esperada

```json
[
  {
    "id": 1,
    "nombre": "P001",
    "descripcion": "Producto Prueba",
    "stockActual": 10,
    "stockMinimo": 5
  },
  {
    "id": 2,
    "nombre": "Producto A",
    "descripcion": "Producto Prueba",
    "stockActual": 10,
    "stockMinimo": 20
  }
]
```

### Obtener productos con stock bajo

```bash
curl -X GET http://localhost:8080/products/alerts
```
### Respuesta esperada

```json
[
  {
    "id": 1,
    "nombre": "Producto A",
    "descripcion": "Producto Prueba",
    "stockActual": 10,
    "stockMinimo": 20
  }
]