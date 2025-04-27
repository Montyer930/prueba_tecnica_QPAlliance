# Inventario Frontend - Prueba Técnica QPAlliance

Este proyecto corresponde a la parte **Frontend** del sistema de gestión de inventarios desarrollado para la prueba técnica de QPAlliance.

Está construido en HTML, CSS (Bootstrap 5) y JavaScript Vanilla, consumiendo la API REST construida en Spring Boot.

---

## 📚 Descripción

Este frontend permite:

- Registrar nuevos productos en el inventario.
- Editar productos existentes.
- Eliminar productos con confirmación.
- Visualizar productos resaltados si su stock actual es menor que el stock mínimo (alerta de bajo stock).
- Mostrar mensajes de éxito o error mediante SweetAlert2.
- Utilizar un diseño limpio y responsivo gracias a Bootstrap 5.

---

## 🛠 Tecnologías utilizadas

- HTML5
- CSS3 (Bootstrap 5.3.2)
- JavaScript Vanilla (ES6+)
- SweetAlert2 (para alertas modernas)

---

## 🚀 Instalación y ejecución

1. Clonar o descargar este repositorio:

```bash
git clone https://github.com/Montyer930/prueba_tecnica_QPAlliance/tree/main/Frontend
```
2. Abrir el archivo index.html en un navegador.

Recomendado: Usar extensión Live Server en VS Code para mejor experiencia:

Instala "Live Server" en Visual Studio Code.

Click derecho sobre index.html ➔ "Open with Live Server".

La aplicación estará disponible en:

```
http://localhost:5500
```

## ⚙️ Configuración del backend
Importante: Para que el frontend funcione correctamente, asegúrate que el backend esté ejecutándose en:
```
http://localhost:8080
```
y que los endpoints de la API estén accesibles, incluyendo:

GET /products

POST /products

PUT /products/{id}

DELETE /products/{id}

## 🎨 Características principales
Formulario para crear o actualizar productos.

Edición automática al seleccionar un producto.

Confirmación antes de eliminar productos.

Alertas visuales para errores o confirmaciones.

Resaltado automático de productos en alerta de stock (fondo rojo).

Loader de carga mientras se consulta el inventario.

