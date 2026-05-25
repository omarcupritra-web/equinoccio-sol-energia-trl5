const state = {
  generation: 4.25,
  consumption: 2.81,
  battery: 87,
  autonomy: 16,
  voltage: 24.8,
  temperature: 30.9,
  health: 94,
  co2: 528,
  incidents: 3,
  feedRunning: true,
  lastSync: 'Inicial',
};

const nodes = [
  {
    id: 'A12', name: 'Nodo A12', location: 'La Guajira · Ranchería', status: 'operativo', battery: 87, signal: 95,
    generation: 4.25, consumption: 2.81, voltage: 24.8, temperature: 30.9, sync: '09:41 p. m.', controller: 'MPPT-40A', priority: 'Normal',
    diagnosis: 'Operación estable. La generación supera el consumo y la señal de telemetría se encuentra dentro del rango esperado.',
    action: 'Mantener monitoreo rutinario y programar revisión preventiva mensual.',
    history: ['Sincronización correcta del gateway.', 'Balance energético positivo.', 'No se registran alertas críticas.']
  },
  {
    id: 'B07', name: 'Nodo B07', location: 'La Guajira · Huerta solar', status: 'atencion', battery: 22, signal: 72,
    generation: 2.12, consumption: 3.36, voltage: 22.9, temperature: 35.4, sync: '09:39 p. m.', controller: 'MPPT-30A', priority: 'Alta',
    diagnosis: 'Batería por debajo del umbral seguro y consumo superior a la generación. Requiere reducción de cargas no críticas.',
    action: 'Revisar banco de baterías, priorizar cargas esenciales y validar estado del controlador.',
    history: ['Alerta de batería baja.', 'Latencia moderada en telemetría.', 'Recomendación de restricción de consumo.']
  },
  {
    id: 'C19', name: 'Nodo C19', location: 'Perímetro productivo', status: 'operativo', battery: 78, signal: 90,
    generation: 3.88, consumption: 2.44, voltage: 24.5, temperature: 31.6, sync: '09:40 p. m.', controller: 'MPPT-40A', priority: 'Normal',
    diagnosis: 'Sistema estable con margen suficiente para operación productiva durante ventana solar.',
    action: 'Habilitar cargas productivas en horario de alta radiación y mantener seguimiento de consumo.',
    history: ['Generación estable.', 'Señal dentro de rango.', 'Consumo nocturno bajo.']
  },
  {
    id: 'D03', name: 'Nodo D03', location: 'Bombeo y respaldo', status: 'operativo', battery: 64, signal: 88,
    generation: 3.35, consumption: 2.68, voltage: 24.1, temperature: 32.8, sync: '09:38 p. m.', controller: 'MPPT-30A', priority: 'Media',
    diagnosis: 'Operación estable, aunque con menor reserva de batería frente a los demás nodos.',
    action: 'Evitar cargas de bombeo fuera de horario solar y revisar autonomía al cierre del día.',
    history: ['Bombeo activado en ventana solar.', 'Batería en rango medio.', 'Sin novedad crítica.']
  }
];

let alerts = [
  { type: 'critical', title: 'Batería en umbral crítico', detail: 'Nodo B07 cae por debajo del 22%. Se recomienda reducir carga no esencial.', time: 'Hace 2 min', scope: 'Nodo B07' },
  { type: 'warning', title: 'Latencia de telemetría elevada', detail: 'Paquetes tardíos detectados en el gateway del sector norte.', time: 'Hace 11 min', scope: 'Gateway G-2' },
  { type: 'info', title: 'Ventana óptima de carga productiva', detail: 'Radiación alta y demanda estable. Se puede activar bombeo o refrigeración.', time: 'Hace 19 min', scope: 'Zona principal' },
];

const sensors = [
  { name: 'Irradiancia', value: '861 W/m²', trend: '+6%' },
  { name: 'SOC batería', value: '87%', trend: '-2%' },
  { name: 'Voltaje DC', value: '24.8 V', trend: '+0.3%' },
  { name: 'Corriente', value: '13.8 A', trend: '+4%' },
  { name: 'Carga AC', value: '2.81 kWh', trend: 'Estable' },
  { name: 'Temperatura', value: '30.9 °C', trend: '-1.2%' },
];

const dailySolar = [0.6, 0.8, 1.2, 1.8, 2.6, 3.7, 4.8, 6.2, 5.1, 6.4, 5.2, 6.1, 4.9, 4.4, 3.6, 2.7, 1.6, 0.7];
const dailyDemand = [0.4, 0.6, 0.8, 1.1, 1.6, 2.1, 2.4, 3.0, 2.7, 3.5, 4.2, 3.8, 3.2, 2.5, 2.0, 1.5, 1.0, 0.5];
const weeklySolar = [28, 31, 26, 35, 37, 39, 33];
const weeklyDemand = [21, 22, 24, 24, 27, 28, 25];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function safe(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function nowLabel() {
  return new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function setActiveView(viewId) {
  $$('.nav-item').forEach((button) => button.classList.toggle('active', button.dataset.view === viewId));
  $$('.view').forEach((view) => view.classList.toggle('active', view.id === viewId));
  const active = document.getElementById(viewId);
  $('#viewTitle').textContent = active.dataset.title || 'Equinoccio';
  $('#viewKicker').textContent = active.dataset.kicker || 'Prototipo funcional TRL5';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  requestAnimationFrame(drawCharts);
}

function updateDerivedState() {
  const balance = state.generation - state.consumption;
  const balanceScore = Math.max(0, Math.min(100, 72 + balance * 7));
  const tempScore = Math.max(0, Math.min(100, 100 - Math.max(0, state.temperature - 32) * 8));
  state.health = Math.round(state.battery * 0.44 + balanceScore * 0.36 + tempScore * 0.2);
  state.autonomy = Math.max(4, Math.min(18, state.battery / 5.4 + balance * 1.8));
}

function setText(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text;
}

function renderStats() {
  updateDerivedState();
  const balance = state.generation - state.consumption;
  const status = state.health >= 80 ? 'Operativo' : state.health >= 60 ? 'Preventivo' : 'Crítico';
  const statusText = state.health >= 80 ? 'Normal' : state.health >= 60 ? 'Revisión preventiva' : 'Intervención recomendada';

  setText('batteryPercent', `${Math.round(state.battery)}%`);
  setText('railAutonomy', `${state.autonomy.toFixed(0)} h`);
  setText('railSync', state.lastSync === 'Inicial' ? 'Inicial' : state.lastSync.slice(0, 5));
  setText('clockLabel', state.lastSync === 'Inicial' ? 'Sync inicial' : state.lastSync);
  setText('homeGeneration', `${state.generation.toFixed(2)} kWh`);
  setText('homeConsumption', `${state.consumption.toFixed(2)} kWh`);
  setText('homeBattery', `${Math.round(state.battery)}%`);
  setText('metricGeneration', `${state.generation.toFixed(2)} kWh`);
  setText('metricConsumption', `${state.consumption.toFixed(2)} kWh`);
  setText('metricBattery', `${Math.round(state.battery)}%`);
  setText('metricAutonomy', `Autonomía: ${state.autonomy.toFixed(0)} h`);
  setText('metricState', status);
  setText('metricHealthText', statusText);
  setText('balanceValue', `${balance >= 0 ? '+' : ''}${balance.toFixed(2)} kWh`);
  setText('balanceLabel', balance >= 0 ? 'Excedente' : 'Déficit operativo');
  setText('balanceGen', `${state.generation.toFixed(2)} kWh`);
  setText('balanceCon', `${state.consumption.toFixed(2)} kWh`);
  setText('autonomyValue', `${state.autonomy.toFixed(0)} h`);
  setText('co2Value', `${Math.round(state.co2)} kg CO₂`);

  const circumference = 2 * Math.PI * 48;
  const ring = $('#batteryRing');
  if (ring) {
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference * (1 - state.battery / 100)}`;
  }
  const bar = $('#balanceBar');
  if (bar) bar.style.width = `${Math.max(15, Math.min(96, 50 + balance * 16))}%`;
}

function renderAlerts() {
  const html = alerts.map((alert) => `
    <article class="alert-item ${alert.type === 'critical' ? 'critical' : alert.type === 'warning' ? 'warning' : ''}">
      <div class="alert-icon">${alert.type === 'critical' ? '!' : alert.type === 'warning' ? '⚠' : 'i'}</div>
      <div class="alert-copy">
        <strong>${safe(alert.title)}</strong>
        <p>${safe(alert.detail)}</p>
      </div>
      <div class="alert-meta">
        <span>${safe(alert.scope)}</span>
        <small>${safe(alert.time)}</small>
      </div>
    </article>
  `).join('');
  $('#alertsList').innerHTML = html;
}

function renderNodes() {
  $('#nodeList').innerHTML = nodes.map((node) => `
    <article class="node-card">
      <div class="node-card-head">
        <div>
          <h4>${safe(node.name)}</h4>
          <span>${safe(node.location)}</span>
          <div class="node-tags">
            <span class="tag ${node.status === 'operativo' ? 'ok' : 'warn'}">${node.status === 'operativo' ? 'Operativo' : 'Atención'}</span>
            <span class="tag">Batería ${node.battery}%</span>
            <span class="tag">Señal ${node.signal}/100</span>
          </div>
        </div>
        <span class="status-chip ${node.status === 'operativo' ? 'online' : 'danger'}">${node.priority}</span>
      </div>
      <div class="node-mini">
        <div><small>Generación</small><strong>${node.generation.toFixed(2)} kWh</strong></div>
        <div><small>Consumo</small><strong>${node.consumption.toFixed(2)} kWh</strong></div>
        <div><small>Última sync</small><strong>${node.sync}</strong></div>
      </div>
      <button class="secondary-btn" data-open-node="${node.id}">Ver detalle</button>
    </article>
  `).join('');

  $$('[data-open-node]').forEach((button) => {
    button.addEventListener('click', () => openNodeModal(button.dataset.openNode));
  });
}

function renderSensors() {
  $('#sensorGrid').innerHTML = sensors.map((sensor) => `
    <article class="sensor-card">
      <span>${safe(sensor.name)}</span>
      <strong>${safe(sensor.value)}</strong>
      <small>${safe(sensor.trend)}</small>
    </article>
  `).join('');
}

function openNodeModal(id) {
  const node = nodes.find((item) => item.id === id);
  if (!node) return;
  setText('modalTitle', node.name);
  setText('modalLocation', node.location);
  const status = $('#modalStatus');
  status.textContent = node.status === 'operativo' ? 'Operativo' : 'Atención';
  status.className = `status-chip ${node.status === 'operativo' ? 'online' : 'danger'}`;
  $('#modalMetrics').innerHTML = [
    ['Batería', `${node.battery}%`],
    ['Señal', `${node.signal}/100`],
    ['Generación', `${node.generation.toFixed(2)} kWh`],
    ['Consumo', `${node.consumption.toFixed(2)} kWh`],
    ['Voltaje', `${node.voltage.toFixed(1)} V`],
    ['Temperatura', `${node.temperature.toFixed(1)} °C`],
    ['Controlador', node.controller],
    ['Prioridad', node.priority],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${safe(value)}</strong></div>`).join('');
  setText('modalDiagnosis', node.diagnosis);
  setText('modalAction', node.action);
  $('#modalHistory').innerHTML = node.history.map((entry) => `<li>${safe(entry)}</li>`).join('');
  $('#nodeModal').classList.add('open');
  $('#nodeModal').setAttribute('aria-hidden', 'false');
}

function closeModal() {
  $('#nodeModal').classList.remove('open');
  $('#nodeModal').setAttribute('aria-hidden', 'true');
}

function drawLineChart(canvasId, a, b, labels) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(360, parent.clientWidth - 20);
  const height = 310;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const pad = { top: 20, right: 20, bottom: 32, left: 34 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(...a, ...b) + 1;

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(width - pad.right, y); ctx.stroke();
  }

  function point(value, index, data) {
    const x = pad.left + (chartW / (data.length - 1)) * index;
    const y = pad.top + chartH - (value / max) * chartH;
    return [x, y];
  }

  function draw(data, stroke, fill) {
    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    gradient.addColorStop(0, fill);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    data.forEach((value, index) => {
      const [x, y] = point(value, index, data);
      if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.shadowColor = stroke; ctx.shadowBlur = 10; ctx.stroke(); ctx.shadowBlur = 0;
    const last = point(data[data.length - 1], data.length - 1, data);
    const first = point(data[0], 0, data);
    ctx.lineTo(last[0], pad.top + chartH); ctx.lineTo(first[0], pad.top + chartH); ctx.closePath(); ctx.fillStyle = gradient; ctx.fill();
  }

  draw(a, '#39db75', 'rgba(57,219,117,0.16)');
  draw(b, '#f4b62a', 'rgba(244,182,42,0.13)');

  ctx.fillStyle = 'rgba(210,225,230,0.72)';
  ctx.font = '12px Inter';
  labels.forEach((label, index) => {
    const x = pad.left + (chartW / (labels.length - 1)) * index;
    ctx.fillText(label, x - 10, height - 10);
  });
}

function drawCharts() {
  drawLineChart('dailyChart', dailySolar, dailyDemand, ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']);
  drawLineChart('weeklyChart', weeklySolar, weeklyDemand, ['L', 'M', 'M', 'J', 'V', 'S', 'D']);
}

function drift() {
  return Math.random() * 0.8 - 0.4;
}

function refreshSimulation(forceCritical = false) {
  state.generation = Math.max(1.8, Math.min(7.2, state.generation + drift()));
  state.consumption = Math.max(1.4, Math.min(4.9, state.consumption + drift()));
  state.battery = Math.max(18, Math.min(98, Math.round(state.battery + drift() * 7)));
  state.voltage = Math.max(22.2, Math.min(26.6, state.voltage + drift() * 0.45));
  state.temperature = Math.max(24, Math.min(39, state.temperature + drift() * 1.4));
  state.co2 += Math.random() * 2.4;
  state.lastSync = nowLabel();
  sensors[1].value = `${state.battery}%`;
  sensors[2].value = `${state.voltage.toFixed(1)} V`;
  sensors[4].value = `${state.consumption.toFixed(2)} kWh`;
  sensors[5].value = `${state.temperature.toFixed(1)} °C`;

  if (forceCritical) {
    alerts.unshift({ type: 'critical', title: 'Evento crítico simulado', detail: 'Se generó una condición de riesgo para validar la respuesta del sistema.', time: 'Ahora', scope: 'Prueba funcional' });
    state.incidents += 1;
    toast('Alerta crítica simulada', 'El sistema registró un evento crítico para validación funcional.');
  } else {
    toast('Telemetría actualizada', 'Los indicadores energéticos fueron recalculados en entorno simulado.');
  }

  renderAll();
}

function addTelemetryLine() {
  if (!state.feedRunning) return;
  const messages = [
    `SOC batería=<strong>${Math.round(state.battery)}%</strong> | gateway=G-2 | latencia=128ms`,
    `irradiancia=<strong>${(820 + Math.random() * 90).toFixed(0)} W/m²</strong> | tendencia=estable`,
    `consumo=<strong>${state.consumption.toFixed(2)} kWh</strong> | nodo=A12 | checksum=OK`,
    `voltaje DC=<strong>${state.voltage.toFixed(2)} V</strong> | controlador=MPPT`,
    `paquetes=<strong>${(88 + Math.random() * 10).toFixed(0)}</strong> | pérdida=0.4% | sync=OK`,
  ];
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = `[${nowLabel()}] ${messages[Math.floor(Math.random() * messages.length)]}`;
  $('#telemetryFeed').prepend(line);
  while ($('#telemetryFeed').children.length > 11) $('#telemetryFeed').lastElementChild.remove();
}

function buildReport() {
  return {
    proyecto: 'Equinoccio Sol & Energía',
    version: 'TRL5-academico-fase5-3.0',
    fechaGeneracion: new Date().toISOString(),
    resumen: {
      generacionKwh: Number(state.generation.toFixed(2)),
      consumoKwh: Number(state.consumption.toFixed(2)),
      balanceKwh: Number((state.generation - state.consumption).toFixed(2)),
      bateriaPorcentaje: Math.round(state.battery),
      autonomiaHoras: Number(state.autonomy.toFixed(1)),
      voltaje: Number(state.voltage.toFixed(2)),
      temperatura: Number(state.temperature.toFixed(1)),
      saludSistema: state.health,
    },
    nodos: nodes.map((node) => ({ id: node.id, estado: node.status, bateria: node.battery, senal: node.signal, prioridad: node.priority })),
    pruebasFuncionales: ['Navegación', 'Dashboard', 'Alertas', 'Nodos con ficha técnica', 'Analítica', 'Investigación piloto', 'IoT Lab', 'TRL5', 'Evidencias Fase 5', 'Exportación JSON'],
    validacionPiloto: {
      participantes: 20,
      tipo: 'Consolidado académico anonimizado',
      prioridades: ['Visualización de batería', 'Alertas tempranas', 'Panel integrado', 'Acceso móvil', 'Historial de consumo']
    },
    evidencias: {
      github: 'https://github.com/omarcupritra-web/equinoccio-sol-energia-trl5',
      pages: 'https://omarcupritra-web.github.io/equinoccio-sol-energia-trl5/',
      video: 'https://youtu.be/KGusOUIP1GE',
      articuloIEEE: 'doc/ARTICULO_IEEE_BORRADOR.md'
    },
  };
}

function exportReport() {
  const blob = new Blob([JSON.stringify(buildReport(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reporte-equinoccio-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast('Reporte exportado', 'Se descargó la evidencia JSON del estado operativo simulado.');
}

function toast(title, text) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<strong>${safe(title)}</strong><p>${safe(text)}</p>`;
  $('#toastStack').prepend(el);
  setTimeout(() => el.remove(), 4200);
}

function wireEvents() {
  $$('.nav-item').forEach((button) => button.addEventListener('click', () => setActiveView(button.dataset.view)));
  $$('.jump').forEach((button) => button.addEventListener('click', () => setActiveView(button.dataset.target)));
  $('#simulateBtn').addEventListener('click', () => refreshSimulation(true));
  $('#refreshBtn').addEventListener('click', () => refreshSimulation(false));
  $('#exportBtn').addEventListener('click', exportReport);
  $('#criticalBtn').addEventListener('click', () => refreshSimulation(true));
  $('#toggleFeedBtn').addEventListener('click', (event) => {
    state.feedRunning = !state.feedRunning;
    event.target.textContent = state.feedRunning ? 'Pausar feed' : 'Reanudar feed';
    toast(state.feedRunning ? 'Feed reanudado' : 'Feed pausado', 'Control de telemetría simulado aplicado correctamente.');
  });
  $('#incidentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    alerts.unshift({
      type: 'warning',
      title: `Incidencia reportada: ${data.get('type')}`,
      detail: data.get('detail'),
      time: 'Ahora',
      scope: data.get('location'),
    });
    state.incidents += 1;
    renderAlerts();
    event.target.reset();
    toast('Incidencia registrada', 'El evento quedó en la bandeja de alertas del prototipo.');
  });
  $$('.node-point').forEach((button) => button.addEventListener('click', () => openNodeModal(button.dataset.node)));
  $$('[data-close="modal"]').forEach((node) => node.addEventListener('click', closeModal));
  window.addEventListener('resize', drawCharts);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
}

function renderAll() {
  renderStats();
  renderAlerts();
  renderNodes();
  renderSensors();
  drawCharts();
}

wireEvents();
renderAll();
setInterval(addTelemetryLine, 1600);
setInterval(() => { state.lastSync = nowLabel(); renderStats(); }, 12000);
