# Plan de pruebas funcionales — Prototipo Equinoccio Sol & Energía

## 1. Objetivo del plan de pruebas

Validar el funcionamiento del prototipo web Equinoccio Sol & Energía en un entorno simulado, verificando navegación, visualización de indicadores energéticos, simulación de telemetría IoT, generación de alertas, registro de incidencias, consulta de fichas técnicas por nodo, analítica y exportación de evidencias.

El propósito de estas pruebas es demostrar que el prototipo integra los componentes principales de la solución y cumple con una validación funcional de nivel académico TRL5.

## 2. Alcance

Las pruebas se realizan sobre un prototipo desarrollado en HTML, CSS y JavaScript, ejecutado en navegador web. El sistema no se conecta a sensores físicos reales; utiliza datos simulados para representar variables energéticas de un sistema solar modular.

## 3. Entorno de prueba

| Elemento | Descripción |
|---|---|
| Aplicación | Equinoccio Sol & Energía |
| Tipo de prototipo | Web funcional simulado |
| Tecnologías | HTML5, CSS3, JavaScript |
| Navegador | Google Chrome / Microsoft Edge |
| Datos | Simulación de telemetría IoT |
| Hardware físico | No aplica en esta fase |
| Nivel TRL | TRL5 académico en entorno simulado |

## 4. Matriz de pruebas funcionales

| ID | Caso de prueba | Procedimiento | Resultado esperado | Estado |
|---|---|---|---|---|
| PF-01 | Navegación entre módulos | Hacer clic en Inicio, Monitoreo, Alertas, Nodos, Analítica, IoT Lab y TRL5 | El sistema cambia de vista sin recargar la página y mantiene la interfaz estable | Aprobado |
| PF-02 | Visualización del dashboard | Abrir el módulo de Monitoreo | Se muestran generación, consumo, voltaje, temperatura, batería, salud del sistema y sincronización | Aprobado |
| PF-03 | Actualización de telemetría | Presionar el botón de actualización o simulación | Los valores energéticos cambian dinámicamente y se actualizan las gráficas | Aprobado |
| PF-04 | Simulación de evento | Presionar el botón “Simular evento” | El sistema genera una notificación y actualiza el estado operativo | Aprobado |
| PF-05 | Centro de alertas | Ingresar al módulo Alertas | Se visualizan alertas clasificadas según prioridad y contexto operativo | Aprobado |
| PF-06 | Disparo de alerta crítica | Presionar el botón de alerta crítica | Se genera una alerta de alto nivel y se evidencia respuesta del sistema | Aprobado |
| PF-07 | Registro de incidencia | Completar el formulario de reporte de fallas | La incidencia queda registrada en la bandeja de eventos del prototipo | Aprobado |
| PF-08 | Vista de nodos/dispositivos | Abrir el módulo Nodos | Se visualizan nodos simulados, estado operativo, batería, señal, generación, consumo y sincronización | Aprobado |
| PF-09 | Ficha técnica por nodo | Presionar “Ver detalle” o hacer clic sobre un nodo del mapa | Se abre una ficha con métricas, diagnóstico, historial, especificación técnica y acción sugerida | Aprobado |
| PF-10 | Analítica energética | Abrir el módulo Analítica | Se muestran comparativos de generación, demanda, impacto y prioridades operativas | Aprobado |
| PF-11 | IoT Lab | Abrir el módulo IoT Lab | Se observa el flujo simulado Sensor → Gateway → API → Dashboard y feed de telemetría | Aprobado |
| PF-12 | Pausar/reanudar feed IoT | Usar el botón de control del feed | La terminal de telemetría se detiene y reanuda correctamente | Aprobado |
| PF-13 | Exportación de reporte | Presionar “Exportar reporte” | Se descarga un archivo JSON con estado operativo, alertas y nodos monitoreados | Aprobado |
| PF-14 | Responsividad | Abrir el prototipo en escritorio y pantalla reducida | La interfaz se adapta conservando navegación y lectura de información | Aprobado |
| PF-15 | Validación TRL5 | Revisar la sección TRL5 | Se presenta justificación de madurez tecnológica, alcance funcional y evidencia de pruebas | Aprobado |

## 5. Resultados obtenidos

Las pruebas funcionales permitieron verificar que el prototipo cumple con los módulos principales definidos para la solución: visualización de indicadores energéticos, simulación de variables IoT, generación de alertas operativas, registro de incidencias, consulta de nodos simulados, fichas técnicas por nodo, análisis de generación y demanda, exportación de reporte operativo y presentación de evidencia de validación funcional.

## 6. Relación con TRL5

El prototipo se considera alineado con TRL5 académico porque integra los componentes principales de la solución en un entorno relevante simulado. La validación no se realiza con hardware solar real, pero sí permite comprobar la lógica funcional de la plataforma: interfaz, simulación de datos, reglas de alerta, visualización de indicadores, fichas técnicas de nodos y trazabilidad básica de eventos.

## 7. Limitaciones de la prueba

- No existe conexión con sensores físicos reales.
- Los datos energéticos son simulados.
- No se implementa autenticación real de usuarios.
- No se usa backend ni base de datos persistente.
- La validación corresponde a entorno académico simulado.

## 8. Conclusión del plan de pruebas

El prototipo Equinoccio Sol & Energía superó las pruebas funcionales definidas para la Fase 4. La solución demuestra una integración funcional de monitoreo energético, telemetría simulada, alertas, nodos, fichas técnicas, analítica y evidencia de validación, cumpliendo con el enfoque de prototipo funcional TRL5 en ambiente simulado.
