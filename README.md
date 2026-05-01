# Equinoccio Sol & Energía — Prototipo funcional TRL5

Prototipo web de alta fidelidad para el monitoreo inteligente de sistemas solares modulares en zonas rurales colombianas. La solución simula telemetría IoT y permite visualizar indicadores energéticos, alertas operativas, nodos solares, analítica y evidencia de validación funcional TRL5.

## Objetivo

Demostrar, en entorno simulado, una solución informática orientada a apoyar la gestión operativa de sistemas solares modulares mediante tablero de control, alertas tempranas, fichas técnicas por nodo y trazabilidad básica de eventos.

## Tecnologías

- HTML5
- CSS3 responsivo
- JavaScript vanilla
- Canvas API para gráficas
- Ejecución local o publicación en GitHub Pages

## Funcionalidades principales

1. Pantalla de presentación del proyecto con identidad visual institucional y energética.
2. Dashboard de generación, consumo, batería, voltaje, temperatura, salud del sistema y balance energético.
3. Simulación de datos IoT con actualización dinámica.
4. Centro de alertas con generación de eventos críticos.
5. Registro de incidencias operativas.
6. Vista de nodos solares simulados con ficha técnica ampliada por nodo.
7. Analítica semanal de generación vs demanda.
8. IoT Lab con ruta de datos Sensor → Gateway → API → Dashboard.
9. Sección de validación TRL5 con matriz resumida de pruebas.
10. Exportación de reporte operativo en formato JSON.

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
    ├── GUION_VIDEO.md
    └── PLAN_PRUEBAS.md
```

## Relación con TRL5

El prototipo se clasifica como TRL5 académico porque integra los componentes principales de la solución en un entorno relevante simulado: interfaz web, reglas de alertas, visualización energética, simulación de telemetría IoT, gestión de nodos, historial básico de eventos y pruebas funcionales documentadas.

## Despliegue sugerido en GitHub Pages

1. Crear o abrir el repositorio en GitHub.
2. Subir todos los archivos de esta carpeta en la raíz del repositorio.
3. Entrar a `Settings > Pages`.
4. Seleccionar `Deploy from a branch`.
5. Seleccionar rama `main` y carpeta `/root`.
6. Guardar y copiar el enlace público generado.

## Autor académico

Omar Alexis Cupitra Roldán  
Universidad Nacional Abierta y a Distancia — UNAD  
Ingeniería de Sistemas  
Curso: Proyecto de grado — 202016907
