# Respuestas Prueba Técnica - QPAlliance

## 1. Diseño y Arquitectura

**Pregunta:**  
¿Cómo diseñarías un sistema tipo MRP modular y escalable que permita añadir funcionalidades como predicción de demanda o reportes BI en el futuro? ¿Qué patrón(s) o arquitectura usarías y por qué?

**Respuesta:**  
Diseñaría el sistema bajo una arquitectura **modular basada en microservicios** o, inicialmente, una **arquitectura hexagonal** (puertos y adaptadores) si el sistema empieza monolítico.

- **Microservicios** permitirían escalar de manera independiente módulos como inventario, producción, pedidos o reportes BI.
- **Arquitectura Hexagonal** permitiría separar la lógica de negocio del acceso a datos, facilitando futuras integraciones (por ejemplo, un motor de predicción de demanda o una plataforma de BI).

Adicionalmente, utilizaría principios **SOLID** y patrones como **Factory**, **Repository** y **Service Layer** para mantener un código limpio, desacoplado y fácil de extender.

---

## 2. Gestión de Datos y Eficiencia

**Pregunta:**  
Supón que el sistema MRP debe manejar miles de productos y transacciones por día. ¿Qué estrategias de diseño y herramientas aplicarías para asegurar un rendimiento óptimo en consultas, validaciones y alertas relacionadas con el inventario?

**Respuesta:**  
Implementaría varias estrategias:

- **Índices en bases de datos** en columnas críticas como `codigo`, `stockActual` y `stockMinimo`.
- **Consultas optimizadas** mediante Spring Data JPA, limitando la carga de datos innecesarios (paginación y filtros).
- **Cacheo selectivo** usando herramientas como **Spring Cache** o **Redis** para consultas de lectura frecuente (por ejemplo, productos con alertas de stock).
- **Validaciones eficientes** a nivel de base de datos (constraints) y a nivel de aplicación (DTOs con anotaciones de validación).
- **Asincronía** para procesos pesados usando `@Async` en Spring.
- **Monitoreo** del rendimiento en producción mediante herramientas como **Actuator** y **Prometheus/Grafana**.

---

## 3. Lógica de Programación

**Pregunta:**  
Escribe una función en el lenguaje que prefieras que reciba una lista de números enteros y retorne el primer número que no se repite.

**Respuesta en Java:**

```java
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PrimerNoRepetido {

    public static Integer encontrarPrimerNoRepetido(List<Integer> numeros) {
        Map<Integer, Integer> contador = new HashMap<>();

        for (Integer num : numeros) {
            contador.put(num, contador.getOrDefault(num, 0) + 1);
        }

        for (Integer num : numeros) {
            if (contador.get(num) == 1) {
                return num;
            }
        }
        
        return null;
    }
}
```
## Ejemplo de uso:
```java
List<Integer> lista = Arrays.asList(4, 5, 1, 2, 0, 4, 1, 0);
System.out.println(Utils.primerNoRepetido(lista)); // Resultado: 5
```