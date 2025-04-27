# Respuestas Conceptuales - Prueba Técnica QPAlliance

## 1. Diseño y Arquitectura

Para diseñar un sistema tipo MRP modular y escalable, utilizaría los siguientes enfoques:

- **Arquitectura en capas**:  
  Separando claramente la capa de presentación (API), capa de servicios (lógica de negocio) y capa de acceso a datos (persistencia). Esto facilita mantenimiento y escalabilidad.

- **Principios SOLID**:  
  Asegurando que cada módulo tenga una única responsabilidad y que el sistema sea fácilmente extensible.

- **Uso de microservicios a futuro**:  
  Para módulos como predicción de demanda o reportes BI, recomendaría que sean servicios independientes que consuman la información del MRP principal a través de APIs REST o colas de mensajes (por ejemplo, usando Kafka).

- **Patrón de diseño recomendado**:  
  - **DTOs** para comunicación limpia entre capas.
  - **Repository Pattern** para acceso a datos.
  - **Service Layer Pattern** para la lógica de negocio.

Esto garantizaría una estructura limpia, mantenible y preparada para crecer conforme se agreguen nuevas funcionalidades.

---

## 2. Gestión de Datos y Eficiencia

Para asegurar un rendimiento óptimo en un sistema que maneje miles de productos y transacciones diarias, aplicaría las siguientes estrategias:

- **Uso de índices en base de datos**:  
  Crear índices en campos consultados frecuentemente como `codigo`, `stockActual` y `stockMinimo`.

- **Consultas optimizadas**:  
  Utilizar solo los datos necesarios en cada consulta, evitando el uso de `SELECT *`.

- **Paginación**:  
  Implementar paginación en las respuestas de endpoints que devuelvan listas largas (`GET /products`) para no saturar el cliente ni el servidor.

- **Caching**:  
  Implementar mecanismos de caché (como Redis) para almacenar datos de consultas frecuentes (por ejemplo, productos en alerta).

- **Validaciones a nivel de DTO**:  
  Validar datos entrantes en la capa de API antes de pasar a la lógica de negocio, reduciendo carga innecesaria en la base de datos.

- **Monitoreo y métricas**:  
  Configurar herramientas de monitoreo como Prometheus + Grafana para observar el rendimiento y detectar cuellos de botella.

---

## 3. Lógica de Programación

Función en Java para retornar el primer número que no se repite en una lista:

```java
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Utils {

    public static Integer primerNoRepetido(List<Integer> numeros) {
        Map<Integer, Integer> contador = new HashMap<>();

        for (Integer numero : numeros) {
            contador.put(numero, contador.getOrDefault(numero, 0) + 1);
        }

        for (Integer numero : numeros) {
            if (contador.get(numero) == 1) {
                return numero;
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