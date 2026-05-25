# Equinoccio Sol & Energía — Prototipo funcional TRL5

Prototipo web de alta fidelidad para el monitoreo inteligente de sistemas solares modulares en zonas rurales colombianas. La solución simula telemetría IoT y permite visualizar indicadores energéticos, alertas operativas, nodos solares, analítica, validación investigativa, evidencia documental y soporte para sustentación de Fase 5.

## Objetivo

Demostrar, en entorno simulado, una solución informática orientada a apoyar la gestión operativa de sistemas solares modulares mediante tablero de control, alertas tempranas, fichas técnicas por nodo, trazabilidad básica de eventos, validación piloto académica y evidencia funcional asociada al nivel TRL5.

## Tecnologías

- HTML5
- CSS3 responsivo
- JavaScript vanilla
- Canvas API para gráficas
- GitHub y GitHub Pages
- Ejecución local o publicación web estática

## Funcionalidades principales

1. Pantalla de presentación del proyecto con identidad visual institucional y energética.
2. Dashboard de generación, consumo, batería, voltaje, temperatura, salud del sistema y balance energético.
3. Simulación de datos IoT con actualización dinámica.
4. Centro de alertas con generación de eventos críticos.
5. Registro de incidencias operativas.
6. Vista de nodos solares simulados con ficha técnica ampliada por nodo.
7. Analítica semanal de generación vs demanda.
8. Sección de investigación con muestra de 20 participantes, tabulación, diagnóstico y relación con requerimientos.
9. IoT Lab con ruta de datos Sensor → Gateway → API → Dashboard.
10. Sección TRL5 con matriz resumida de pruebas.
11. Sección de evidencias para Fase 5: GitHub, GitHub Pages, video, plan de pruebas, guion y artículo IEEE.
12. Exportación de reporte operativo en formato JSON.

## Enlaces principales

- Repositorio GitHub: https://github.com/omarcupritra-web/equinoccio-sol-energia-trl5
- Prototipo publicado: https://omarcupritra-web.github.io/equinoccio-sol-energia-trl5/
- Video demostrativo: https://youtu.be/KGusOUIP1GE

## Cómo ejecutar

Opción rápida:

```bash
# Abrir directamente
index.html
```

Opción recomendada con servidor local:

```bash
python -m http.server 5500
```

Luego abrir en el navegador:

```text
http://localhost:5500
```

## Estructura

```text
equinoccio-sol-energia-trl5/
├── index.html
├── styles.css
├── script.js
├── README.md
├── README.txt
├── .nojekyll
└── doc/
    ├── ARTICULO_IEEE_BORRADOR.md
    ├── EVIDENCIAS_FASE5.md
    ├── GUION_VIDEO.md
    ├── MATRIZ_VALIDACION_PILOTO.csv
    └── PLAN_PRUEBAS.md
```

## Relación con TRL5

El prototipo se clasifica como TRL5 académico porque integra los componentes principales de la solución en un entorno relevante simulado: interfaz web, reglas de alertas, visualización energética, simulación de telemetría IoT, gestión de nodos, historial básico de eventos, evidencia investigativa piloto, pruebas funcionales documentadas y despliegue público.

## Alcance académico

La validación usa datos simulados y un consolidado piloto académico anonimizado. No se afirma conexión con hardware físico real ni aplicación de campo definitiva. El objetivo es demostrar integración funcional y preparación para una futura evolución con sensores, backend, base de datos e implementación rural real.

## Autor académico

Omar Alexis Cupitra Roldán  
Universidad Nacional Abierta y a Distancia — UNAD  
Ingeniería de Sistemas  
Curso: Proyecto de grado — 202016907
