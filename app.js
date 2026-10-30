'use strict';

const $ = id => document.getElementById(id);
// Language settings: saved locally, no network or account required.
let language = (() => { try { return localStorage.getItem('freeMeditations-language') === 'en' ? 'en' : 'es'; } catch { return 'es'; } })();
const enCategories = {
 equilibrio:['Natural balance','Equal time for inhaling and exhaling. Find a comfortable rhythm.'],
 calma:['Deep calm','Longer exhalations to gently slow your breathing.'],
 enfoque:['Pause and focus','Mindful holds and pauses between cycles.'],
 energia:['Gentle energy','Inhale a little longer than you exhale.'],
 personal:['My breathing exercises','Your rhythms saved in this browser.']
};
const enPrograms = {
 '3030':['Gentle start','A simple, short rhythm.'], '5050':['Serene breathing','A natural, symmetrical pace.'], '7070':['Slow rhythm','More time for each breath.'],
 '4060':['Gentle calm','A slightly longer exhale.'], '5070':['Release tension','Let the air out slowly.'], '4070':['Peaceful exhale','Focus on the end of each cycle.'],
 '5080':['Unwind','More room to relax as you exhale.'], '4080':['Slow exhale','Exhale twice as long as you inhale.'], '50100':['Extended calm','A long exhale, only if comfortable.'],
 '5250':['Mindful pause','Hold briefly after inhaling.'], '4480':['Focus and calm','Hold gently before a slow exhale.'], '4780':['4 · 7 · 8 rhythm','Extended hold; never force your breath.'],
 '4444':['Box breathing','Four steady, equal phases.'], '6066':['Rest after exhaling','Pause after you breathe out.'], '6040':['Active breathing','A slightly longer inhale.']
};
const enStatic = {".hero .eyebrow": "YOUR SPACE OF CALM", ".hero h1": "A moment<br>to <em>breathe.</em>", ".hero-copy > p": "Let nature accompany you. Find your rhythm with a visual guide, relaxing music, and gentle sounds that mark each transition.", "#featuredStart": "Start breathing", "#customOpen": "Create my rhythm", ".hero-note": "No rush. Your way.", ".center-orb span": "inhale<br><small>exhale</small>", ".floating-note": "Follow your own rhythm", ".section-heading .eyebrow": "EXPLORE YOUR RHYTHMS", "#programsHeading": "Guided breathing<span class=\"punctuation\">.</span>", ".section-heading p": "Choose a breathing pattern to begin.", "#customOpenSecond": "Customize timings", "#backHome": "← Back to exercises", ".session-header .eyebrow": "YOUR PRESENT MOMENT", ".stage-top span:first-child": "BREATHING GUIDE", ".chart-footer": "<span>INHALE ↗</span><span>HOLD ─</span><span>EXHALE ↘</span><span>REST ─</span>", ".time-stats .stat-kicker:first-child": "TIME", ".time-stats > div:nth-child(2) .stat-kicker": "BREATHS", ".duration-setting label": "DURATION", ".sound-bar > span": "SOUNDS", ".sound-bar label:first-of-type": "Music ", ".sound-bar label:last-of-type": "Bowl ", ".session-footnote": "Breathe at a comfortable pace. Holding your breath and long exhalations are optional: stop if you feel discomfort.", ".dialog-header .eyebrow": "MAKE IT YOURS", "#customTitle": "Your own rhythm<span class=\"punctuation\">.</span>", ".custom-form > p:first-of-type": "Set each phase duration in seconds. Enter 0 to skip a phase.", ".name-field": "Exercise name ", ".custom-grid label:nth-child(1)": "Inhale", ".custom-grid label:nth-child(2)": "Hold", ".custom-grid label:nth-child(3)": "Exhale", ".custom-grid label:nth-child(4)": "Rest", ".custom-grid label:nth-child(1) .field-tip": "The line rises", ".custom-grid label:nth-child(2) .field-tip": "Line stays up", ".custom-grid label:nth-child(3) .field-tip": "The line falls", ".custom-grid label:nth-child(4) .field-tip": "Line stays down", "#saveCustom": "Save rhythm", ".dialog-actions button[type=submit]": "Start", ".dialog-hint": "Saved rhythms appear on your home screen in this browser.", ".footer span:last-child": "Breathe gently. If you feel dizzy or uncomfortable, return to your natural rhythm."};
const spanishHTML = {};
const uiText = {
 musicOn:['Música activada','Music on'],musicOff:['Música desactivada','Music off'],bellOn:['Cuenco activado','Bowl on'],bellOff:['Cuenco desactivado','Bowl off'],voiceOn:['Voz activada','Voice on'],voiceOff:['Voz desactivada','Voice off'],
 ready:['LISTO PARA EMPEZAR','READY TO BEGIN'], breathing:['RESPIRANDO','BREATHING'], paused:['EN PAUSA','PAUSED'],finished:['SESIÓN FINALIZADA','SESSION COMPLETE'],
 start:['Comenzar','Start'],pause:['Pausar','Pause'],resume:['Continuar','Resume'],repeat:['Repetir','Repeat'],prepare:['Prepárate','Get ready'],done:['Muy bien hecho','Well done'],
 seconds:['segundos','seconds'],cycle:['CICLO','CYCLE'],inhale:['Inhala','Inhale'],hold:['Sostén','Hold'],exhale:['Exhala','Exhale'],rest:['Descansa','Rest'],
 inhaleShort:['INHALA','INHALE'],holdShort:['SOSTÉN','HOLD'],exhaleShort:['EXHALA','EXHALE'],restShort:['PAUSA','REST'],
 personal:['Personalizado','Custom'],rhythm:['ritmo','rhythm'],rhythms:['ritmos','rhythms'],cycleUnit:['s / ciclo','s / cycle'],
 defaultDesc:['Respira a tu ritmo.','Breathe at your own pace.'],sessionDesc:['Sigue la línea y respira a tu ritmo.','Follow the line and breathe at your own pace.'],
 customDesc:['Un ejercicio de respiración diseñado por ti.','A breathing exercise designed by you.'],customDefault:['Mi respiración','My breathing'],
 errorRange:['Los tiempos deben estar entre 0 y 60 segundos.','Durations must be between 0 and 60 seconds.'],errorBreath:['Inhalar y exhalar deben durar más de 0 segundos.','Inhale and exhale must be longer than 0 seconds.']
};
const t = key => uiText[key]?.[language === 'en' ? 1 : 0] ?? key;
function translatedCategory(group) { return language === 'en' ? (enCategories[group.id] || [group.nombre,group.descripcion]) : [group.nombre,group.descripcion]; }
function translatedProgram(p) { return language === 'en' && enPrograms[p.id] ? enPrograms[p.id] : [p.nombre,p.descripcion]; }
function translatePage() {
 document.documentElement.lang = language;
 document.title = language === 'en' ? 'FreeBreathing — A moment to breathe' : 'FreeBreathing — Un momento para respirar';
 for (const [selector, english] of Object.entries(enStatic)) {
  const el = document.querySelector(selector); if (!el) continue;
  if (!(selector in spanishHTML)) spanishHTML[selector] = el.innerHTML;
  if (selector === '.name-field' || selector.startsWith('.custom-grid label:nth-child(') && !selector.includes('.field-tip') || selector.startsWith('.sound-bar label')) {
   const first = [...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);
   if (first) { if (!first._es) first._es=first.textContent; first.textContent=language==='en'?english:first._es; }
  } else if (selector === '#featuredStart' || selector === '#customOpen' || selector === '#customOpenSecond' || selector === '#backHome' || selector === '#saveCustom' || selector === '.dialog-actions button[type=submit]') {
   const first=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE); if(first){if(!first._es)first._es=first.textContent;first.textContent=language==='en'?english+' ':first._es;}
  } else { el.innerHTML = language === 'en' ? english : spanishHTML[selector]; }
 }
 $('langEs').classList.toggle('is-active',language==='es'); $('langEn').classList.toggle('is-active',language==='en');
 $('langEs').setAttribute('aria-pressed',String(language==='es')); $('langEn').setAttribute('aria-pressed',String(language==='en'));
 $('musicToggleLabel').textContent=t(musicEnabled?'musicOn':'musicOff');
 $('bellToggleLabel').textContent=t(bellEnabled?'bellOn':'bellOff');
 $('voiceToggleLabel').textContent=t(voiceEnabled?'voiceOn':'voiceOff');
 $('musicToggle').title=language==='en'?'Toggle music':'Activar o desactivar la música';
 $('bellToggle').title=language==='en'?'Toggle singing bowl':'Activar o desactivar las campanadas';
 $('voiceToggle').title=language==='en'?'Toggle spoken guidance':'Activar o desactivar la guía de voz';
 $('customName').placeholder=t('customDefault');
 if ($('customName').value === 'Mi respiración' || $('customName').value === 'My breathing') $('customName').value=t('customDefault');
 $('phaseUnit').textContent=t('seconds');
 if (selected) { const [name,desc]=translatedProgram(selected);$('sessionTitle').textContent=name;$('sessionDescription').textContent=desc||t('sessionDesc');renderSequence(selected); }
 if (!hasStarted) resetDisplay(); else if (isPlaying) { $('sessionStatus').textContent=t('breathing');setPlayButton(t('pause'),'Ⅱ'); } else { $('sessionStatus').textContent=t('paused');setPlayButton(t('resume'),'▶'); }
 renderGroups();
}
function setLanguage(next) { stopSpeech();language=next;try{localStorage.setItem('freeMeditations-language',next);}catch{}translatePage(); }

const phases = [
  { key: 'inhalar', label: 'Inhala', short: 'INHALA' },
  { key: 'sostener', label: 'Sostén', short: 'SOSTÉN' },
  { key: 'exhalar', label: 'Exhala', short: 'EXHALA' },
  { key: 'pausa', label: 'Descansa', short: 'PAUSA' }
];

// Configuración de respaldo para abrir index.html directamente sin un servidor.
// Con un servidor local, programas.json tiene prioridad.
const defaultData = {"categorias":[{"id":"equilibrio","nombre":"Equilibrio natural","descripcion":"El mismo tiempo para inhalar y exhalar. Ideal para encontrar un ritmo cómodo.","icono":"balance"},{"id":"calma","nombre":"Calma profunda","descripcion":"Exhalaciones más largas para ralentizar el ritmo suavemente.","icono":"moon"},{"id":"enfoque","nombre":"Pausa y concentración","descripcion":"Con retenciones conscientes o pausas entre ciclos.","icono":"focus"},{"id":"energia","nombre":"Activación suave","descripcion":"Una inhalación más larga que la exhalación.","icono":"sun"}],"programas":[{"id":"3030","nombre":"Inicio ligero","categoria":"equilibrio","descripcion":"Un ritmo sencillo y breve.","inhalar":3,"sostener":0,"exhalar":3,"pausa":0},{"id":"5050","nombre":"Respiración serena","categoria":"equilibrio","descripcion":"Una cadencia natural y simétrica.","inhalar":5,"sostener":0,"exhalar":5,"pausa":0},{"id":"7070","nombre":"Ritmo pausado","categoria":"equilibrio","descripcion":"Más tiempo en cada respiración.","inhalar":7,"sostener":0,"exhalar":7,"pausa":0},{"id":"4060","nombre":"Calma suave","categoria":"calma","descripcion":"Una exhalación ligeramente más extensa.","inhalar":4,"sostener":0,"exhalar":6,"pausa":0},{"id":"5070","nombre":"Soltar tensión","categoria":"calma","descripcion":"Deja que el aire salga despacio.","inhalar":5,"sostener":0,"exhalar":7,"pausa":0},{"id":"4070","nombre":"Exhalación tranquila","categoria":"calma","descripcion":"Respira con atención al final de cada ciclo.","inhalar":4,"sostener":0,"exhalar":7,"pausa":0},{"id":"5080","nombre":"Desconexión","categoria":"calma","descripcion":"Más espacio para relajarte al exhalar.","inhalar":5,"sostener":0,"exhalar":8,"pausa":0},{"id":"4080","nombre":"Exhalación lenta","categoria":"calma","descripcion":"Exhala durante el doble de la inhalación.","inhalar":4,"sostener":0,"exhalar":8,"pausa":0},{"id":"50100","nombre":"Calma extendida","categoria":"calma","descripcion":"Una exhalación larga, solo si te resulta cómoda.","inhalar":5,"sostener":0,"exhalar":10,"pausa":0},{"id":"5250","nombre":"Pausa consciente","categoria":"enfoque","descripcion":"Un instante para sostener después de inhalar.","inhalar":5,"sostener":2,"exhalar":5,"pausa":0},{"id":"4480","nombre":"Atención y calma","categoria":"enfoque","descripcion":"Sostén suavemente antes de una exhalación lenta.","inhalar":4,"sostener":4,"exhalar":8,"pausa":0},{"id":"4780","nombre":"Ritmo 4 · 7 · 8","categoria":"enfoque","descripcion":"Retención prolongada; no fuerces la respiración.","inhalar":4,"sostener":7,"exhalar":8,"pausa":0},{"id":"4444","nombre":"Respiración cuadrada","categoria":"enfoque","descripcion":"Cuatro fases iguales y constantes.","inhalar":4,"sostener":4,"exhalar":4,"pausa":4},{"id":"6066","nombre":"Pausa al soltar","categoria":"enfoque","descripcion":"Descansa brevemente tras exhalar.","inhalar":6,"sostener":0,"exhalar":6,"pausa":6},{"id":"6040","nombre":"Respiración activa","categoria":"energia","descripcion":"Una inspiración ligeramente más larga.","inhalar":6,"sostener":0,"exhalar":4,"pausa":0}]};
let catalogue = defaultData;
let customPrograms = readStoredPrograms();
let selected = null;
let isPlaying = false;
let hasStarted = false;
let elapsedBefore = 0;
let playStartedAt = 0;
let currentPhaseToken = '';
let lastAnnouncedCycle = 0;
let raf = null;
let musicEnabled = true;
let bellEnabled = true;
let voiceEnabled = true;
let activeBells = [];
let bellSample = new Audio('assets/cuenco.mp3');
bellSample.preload = 'auto';
const music = $('ambientAudio');
const durationInput = $('sessionDuration');
const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

function sessionMaxSeconds() {
  const minutes = Number(durationInput.value);
  return minutes > 0 ? minutes * 60 : 0;
}
function phaseKeyByIndex(index) {
  return ['inhale', 'hold', 'exhale', 'rest'][index] || 'inhale';
}
function speakPhase(index) {
  if (!speechSupported || !voiceEnabled) return;
  const spoken = language === 'en'
    ? ['Inhale', 'Hold', 'Exhale', 'Rest']
    : ['Inhala', 'Aguanta', 'Exhala', 'Pausa'];
  const message = spoken[index] || spoken[0];
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(language === 'en' ? 'en' : 'es'));
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
function stopSpeech() {
  if (speechSupported) window.speechSynthesis.cancel();
}
if (speechSupported) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

function readStoredPrograms() {
  try {
    const data = JSON.parse(localStorage.getItem('freeMeditations-programas') || '[]');
    if (!Array.isArray(data)) return [];
    return data.filter(isValidProgram).slice(0, 40);
  } catch { return []; }
}
function isValidProgram(p) {
  return p && typeof p.nombre === 'string' && p.nombre.trim().length > 0 &&
    phases.every(x => Number.isFinite(Number(p[x.key])) && Number(p[x.key]) >= 0 && Number(p[x.key]) <= 60) &&
    Number(p.inhalar) > 0 && Number(p.exhalar) > 0;
}
function pattern(p) { return phases.map(x => Number(p[x.key])).join(' · '); }
function loopTime(p) { return phases.reduce((sum, x) => sum + Number(p[x.key]), 0); }
function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function createCard(p, categoryName) {
  const card = make('button', 'program-card');
  card.type = 'button';
  card.setAttribute('aria-label', `${t('start')} ${translatedProgram(p)[0]}, ${pattern(p)}`);
  const top = make('div', 'card-top');
  top.append(make('span', 'card-type', categoryName), make('span', 'card-arrow', '↗'));
  const heading = make('div');
  heading.append(make('h4', 'card-name', translatedProgram(p)[0]), make('p', 'card-description', translatedProgram(p)[1] || t('defaultDesc')));
  const bottom = make('div', 'card-bottom');
  bottom.append(make('span', 'card-pattern', pattern(p)), make('span', 'card-time', `${loopTime(p)} ${t('cycleUnit')}`));
  card.append(top, heading, bottom);
  card.addEventListener('click', () => openSession(p, true));
  return card;
}
function renderGroups() {
  const target = $('programGroups');
  target.replaceChildren();
  const categories = [...catalogue.categorias];
  if (customPrograms.length) categories.push({ id:'personal', nombre:'Mis ejercicios', descripcion:'Tus ritmos guardados en este navegador.' });
  for (const group of categories) {
    const all = group.id === 'personal' ? customPrograms : catalogue.programas.filter(p => p.categoria === group.id);
    if (!all.length) continue;
    const section = make('section', 'program-group');
    section.id = `grupo-${group.id}`;
    const heading = make('div', 'group-heading');
    const description = make('div');
    const [groupName,groupDesc]=translatedCategory(group);
    description.append(make('h3', '', groupName), make('p', '', groupDesc || ''));
    heading.append(description, make('span', 'group-count', `${all.length} ${t(all.length === 1 ? 'rhythm' : 'rhythms')}`));
    const cards = make('div', 'cards');
    all.forEach(p => cards.append(createCard(p, group.id === 'personal' ? t('personal') : translatedCategory(group)[0])));
    section.append(heading, cards);
    target.append(section);
  }
}
async function loadCatalogue() {
  try {
    const response = await fetch('./programas.json', { cache:'no-store' });
    if (!response.ok) throw new Error('No se puede cargar el JSON');
    const json = await response.json();
    if (!Array.isArray(json.programas) || !Array.isArray(json.categorias)) throw new Error('JSON incompleto');
    const valid = json.programas.filter(isValidProgram);
    if (valid.length === 0) throw new Error('JSON sin programas válidos');
    catalogue = { categorias:json.categorias, programas:valid };
  } catch (error) {
    // Las páginas abiertas con file:// no pueden cargar fetch en ciertos navegadores.
    // Los 15 patrones integrados se muestran igualmente.
    console.info('Usando programas integrados; con un servidor local se lee programas.json.', error.message);
  }
  renderGroups();
}
function setView(which) {
  const session = which === 'session';
  $('sessionView').classList.toggle('is-hidden', !session);
  $('homeView').classList.toggle('is-hidden', session);
  $('sessionView').setAttribute('aria-hidden', String(!session));
  $('homeView').setAttribute('aria-hidden', String(session));
  window.scrollTo({ top:0, behavior:'instant' });
}
// Infinite, progressive breathing trail: the present draws the line while old
// strokes naturally fade behind it. Cycle-to-cycle changes are deliberately subtle.
const GRAPH_LEFT = 30;
const GRAPH_WIDTH = 940;
const GRAPH_WINDOW_SECONDS = 34;
const GRAPH_FOLLOW_SECONDS = 21;
const SVG_NS = 'http://www.w3.org/2000/svg';
const trailGroup = document.createElementNS(SVG_NS, 'g');
trailGroup.id = 'runnerTrails';
$('breathChart').insertBefore(trailGroup, $('chartMarkerHalo'));
const calmPalette = ['#f3dbbc', '#cde1d0', '#d2d9f0', '#e4d4e8', '#c8e0de', '#f0dec6'];

function graphLevels(cycle) {
  // Gentle variation in each full breathing pattern, without changing timing.
  const shift = Math.sin(cycle * 1.17) * 11;
  return { top: 36 + shift, bottom: 283 };
}
function graphY(time) {
  if (!selected) return 283;
  const total = loopTime(selected);
  const cycle = Math.max(0, Math.floor(Math.max(0, time) / total));
  let position = Math.max(0, time) - cycle * total;
  const {top, bottom} = graphLevels(cycle);
  const rise = Number(selected.inhalar);
  const hold = Number(selected.sostener);
  const fall = Number(selected.exhalar);
  // Continuous ease-in/out gives rounded, tranquil transitions.
  const ease = value => { const u = Math.max(0, Math.min(1, value)); return u*u*(3-2*u); };
  if (position < rise) return bottom + (top - bottom) * ease(position / rise);
  position -= rise;
  if (position < hold) return top;
  position -= hold;
  if (position < fall) return top + (bottom - top) * ease(position / fall);
  return bottom;
}
function drawGraph() { renderRunner(0); }
function renderRunner(elapsedSeconds) {
  if (!selected) return;
  const max = sessionMaxSeconds();
  const now = Math.max(0, Math.min(elapsedSeconds, max || Infinity));
  const start = Math.max(0, now - GRAPH_WINDOW_SECONDS);
  const viewStart = Math.max(0, now - GRAPH_FOLLOW_SECONDS);
  const x = time => GRAPH_LEFT + (time - viewStart) / GRAPH_WINDOW_SECONDS * GRAPH_WIDTH;
  const cycleLength = loopTime(selected);
  const fragment = document.createDocumentFragment();
  const segmentDuration = 1.5;
  // Only draw the visible past. Older segments fade out rather than being cut abruptly.
  for (let t = start; t < now - .001; t += segmentDuration) {
    const end = Math.min(now, t + segmentDuration);
    let d = '';
    const samples = Math.max(2, Math.ceil((end - t) / .12));
    for (let i=0; i<=samples; i++) {
      const sec = t + (end - t) * i / samples;
      d += `${i===0?'M':'L'}${x(sec).toFixed(2)} ${graphY(sec).toFixed(2)} `;
    }
    const age = now - (t + end) / 2;
    const freshness = Math.max(0, Math.min(1, 1 - age / GRAPH_WINDOW_SECONDS));
    const opacity = Math.pow(freshness, 2.3);
    const color = calmPalette[Math.floor(((t + end)/2) / cycleLength) % calmPalette.length];
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', (3 + 2.3 * freshness).toFixed(2));
    path.setAttribute('stroke-opacity', (opacity * .95).toFixed(3));
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    fragment.appendChild(path);
  }
  trailGroup.replaceChildren(fragment);
  // The original static full-width paths are deliberately hidden.
  $('chartPath').setAttribute('d','');
  $('chartGlow').setAttribute('d','');
  $('chartFill').setAttribute('d','');
  const markerX = Math.max(GRAPH_LEFT, Math.min(GRAPH_LEFT + GRAPH_WIDTH, x(now)));
  const markerY = graphY(now);
  $('chartMarker').setAttribute('cx', markerX.toFixed(2));
  $('chartMarker').setAttribute('cy', markerY.toFixed(2));
  $('chartMarkerHalo').setAttribute('cx', markerX.toFixed(2));
  $('chartMarkerHalo').setAttribute('cy', markerY.toFixed(2));
}
function updateMarker() { renderRunner(0); }
function updateCycleTint(cycle) {
  const color = calmPalette[cycle % calmPalette.length];
  $('chartMarker').setAttribute('fill',color);
  $('chartMarkerHalo').setAttribute('fill',color);
  $('breathChart').style.setProperty('--cycle-color',color);
}
function renderSequence(p) {
  const sequence = $('sequence');
  sequence.replaceChildren();
  phases.forEach(ph => {
    const secs = Number(p[ph.key]);
    if (secs > 0) sequence.append(make('span', '', `${t(['inhaleShort','holdShort','exhaleShort','restShort'][phases.indexOf(ph)])} ${secs}s`));
  });
}
function openSession(p, autoplay = false) {
  stopSession();
  selected = p;
  $('sessionTitle').textContent = translatedProgram(p)[0];
  $('sessionDescription').textContent = translatedProgram(p)[1] || t('sessionDesc');
  renderSequence(p);
  drawGraph(p);
  resetDisplay();
  setView('session');
  if (autoplay) startSession();
}
function resetDisplay() {
  $('phaseLabel').textContent = t('prepare');
  $('phaseSeconds').textContent = '—';
  $('phaseUnit').textContent = t('seconds');
  $('stageCycle').textContent = `${t('cycle')} 01`;
  $('cycleCount').textContent = '0';
  $('elapsedTime').textContent = '00:00';
  $('sessionStatus').textContent = t('ready');
  setPlayButton(t('start'), '▶');
  renderRunner(0);
}
function setPlayButton(label, icon) {
  $('playPause').firstChild.textContent = `${label} `;
  $('playIcon').textContent = icon;
}
function startMusic() {
  if (!musicEnabled || !isPlaying) return;
  music.volume = Number($('musicVolume').value) / 100;
  music.play().catch(() => {
    // La política de audio del navegador puede requerir un toque adicional.
  });
}
function stopBells() {
  for (const audio of activeBells) { audio.pause(); audio.currentTime = 0; }
  activeBells = [];
}
function playBell(multiplier = 1) {
  if (!bellEnabled || Number($('bellVolume').value) <= 0) return;
  const sound = bellSample.cloneNode(true);
  sound.volume = Math.min(1, Number($('bellVolume').value) / 100 * multiplier);
  sound.preload = 'auto';
  if (activeBells.length >= 3) {
    const oldest = activeBells.shift();
    oldest.pause();
  }
  activeBells.push(sound);
  sound.addEventListener('ended', () => { activeBells = activeBells.filter(a => a !== sound); }, { once:true });
  sound.play().catch(() => { activeBells = activeBells.filter(a => a !== sound); });
}
function getMoment(elapsed) {
  const total = loopTime(selected);
  const cycle = Math.floor(elapsed / total);
  let position = elapsed - cycle * total;
  for (let i=0; i<phases.length; i++) {
    const length = Number(selected[phases[i].key]);
    if (length <= 0) continue;
    if (position < length || i === 3) {
      const amount = Math.min(1, Math.max(0, position / length));
      const height = i===0 ? amount : i===1 ? 1 : i===2 ? 1-amount : 0;
      return { cycle, index:i, phaseTime:position, remaining:Math.max(0, length-position), height, positionInCycle:elapsed - cycle*total };
    }
    position -= length;
  }
  return { cycle, index:2, phaseTime:0, remaining:0, height:0, positionInCycle:0 };
}
function renderTick(seconds, announce = false) {
  const m = getMoment(seconds);
  const max = sessionMaxSeconds();
  const phase = phases[m.index];
  $('phaseLabel').textContent = t(['inhale','hold','exhale','rest'][m.index]);
  $('phaseSeconds').textContent = String(Math.ceil(m.remaining - 0.000001));
  $('stageCycle').textContent = `${t('cycle')} ${String(m.cycle + 1).padStart(2, '0')}`;
  $('cycleCount').textContent = String(m.cycle);
  $('elapsedTime').textContent = formatTime(seconds);
  renderRunner(seconds);
  updateCycleTint(m.cycle);
  const token = `${m.cycle}:${m.index}`;
  if (announce && token !== currentPhaseToken) {
    // A single soft bowl chime when a WHOLE breathing pattern finishes.
    // No chime between inhale / hold / exhale / rest.
    if (m.cycle > 0 && m.cycle !== lastAnnouncedCycle) {
      lastAnnouncedCycle = m.cycle;
      playBell(0.55);
    }
    currentPhaseToken = token;
    speakPhase(m.index);
  }
}
function animation(now) {
  if (!isPlaying) return;
  const seconds = elapsedBefore + (now - playStartedAt) / 1000;
  const max = Number(durationInput.value) * 60;
  if (max > 0 && seconds >= max) {
    elapsedBefore = max;
    renderTick(max - 0.0001, false);
    finishSession();
    return;
  }
  renderTick(seconds, true);
  raf = requestAnimationFrame(animation);
}
function startSession() {
  if (!selected || isPlaying) return;
  if (!hasStarted) {
    elapsedBefore = 0;
    currentPhaseToken = '';
    lastAnnouncedCycle = 0;
    hasStarted = true;
    playBell();
    renderTick(0, true);
  }
  isPlaying = true;
  playStartedAt = performance.now();
  $('sessionStatus').textContent = t('breathing');
  setPlayButton(t('pause'), 'Ⅱ');
  startMusic();
  raf = requestAnimationFrame(animation);
}
function pauseSession() {
  if (!isPlaying) return;
  elapsedBefore += (performance.now() - playStartedAt) / 1000;
  isPlaying = false;
  cancelAnimationFrame(raf);
  music.pause();
  stopBells();
  stopSpeech();
  $('sessionStatus').textContent = t('paused');
  setPlayButton(t('resume'), '▶');
}
function stopSession() {
  if (raf !== null) cancelAnimationFrame(raf);
  raf = null;
  isPlaying = false;
  hasStarted = false;
  elapsedBefore = 0;
  currentPhaseToken = '';
  lastAnnouncedCycle = 0;
  music.pause();
  stopBells();
  stopSpeech();
}
function finishSession() {
  stopSession();
  if (selected) renderRunner(sessionMaxSeconds() || 0);
  playBell();
  playBell();
  playBell();
  $('phaseLabel').textContent = t('done');
  $('phaseSeconds').textContent = '✓';
  $('phaseUnit').textContent = '';
  $('sessionStatus').textContent = t('finished');
  setPlayButton(t('repeat'), '↻');
}
function goHome() { stopSession(); setView('home'); }
function openCustomDialog() {
  $('customError').textContent = '';
  $('customDialog').showModal();
}
function readCustom() {
  const vals = ['customInhale','customHold','customExhale','customRest'].map(id => Number($(id).value));
  if (vals.some((v,i) => !Number.isFinite(v) || v < 0 || v > 60 || $(`custom${['Inhale','Hold','Exhale','Rest'][i]}`).value.trim() === '')) {
    throw new Error(t('errorRange'));
  }
  if (vals[0] <= 0 || vals[2] <= 0) throw new Error(t('errorBreath'));
  const name = $('customName').value.trim() || t('customDefault');
  return { id:`personal-${Date.now()}`,nombre:name,categoria:'personal',descripcion:t('customDesc'),inhalar:vals[0],sostener:vals[1],exhalar:vals[2],pausa:vals[3] };
}
function handleCustom(save) {
  try {
    const p = readCustom();
    $('customError').textContent = '';
    if (save) {
      customPrograms.push(p);
      customPrograms = customPrograms.slice(-40);
      try { localStorage.setItem('freeMeditations-programas', JSON.stringify(customPrograms)); } catch {}
      renderGroups();
      $('customDialog').close();
      $('grupo-personal')?.scrollIntoView({ behavior:'smooth',block:'center' });
    } else {
      $('customDialog').close();
      openSession(p, true);
    }
  } catch (error) { $('customError').textContent = error.message; }
}

$('featuredStart').addEventListener('click', () => openSession(catalogue.programas.find(p => p.id==='5050') || catalogue.programas[0], true));
$('homeLogo').addEventListener('click', goHome);
$('backHome').addEventListener('click', goHome);
$('playPause').addEventListener('click', () => { if (isPlaying) pauseSession(); else startSession(); });
$('restartButton').addEventListener('click', () => { stopSession(); resetDisplay(); });
durationInput.addEventListener('change', () => {
  if (!selected) return;
  const seconds = isPlaying ? elapsedBefore + (performance.now() - playStartedAt) / 1000 : elapsedBefore;
  const max = sessionMaxSeconds();
  if (max && seconds >= max) {
    finishSession();
    return;
  }
  if (hasStarted) renderTick(seconds, false); else resetDisplay();
});
$('musicToggle').addEventListener('click', () => {
  musicEnabled = !musicEnabled;
  $('musicToggle').setAttribute('aria-pressed', String(musicEnabled));
  $('musicToggleLabel').textContent = t(musicEnabled ? 'musicOn' : 'musicOff');
  if (musicEnabled) startMusic(); else music.pause();
});
$('bellToggle').addEventListener('click', () => {
  bellEnabled = !bellEnabled;
  $('bellToggle').setAttribute('aria-pressed', String(bellEnabled));
  $('bellToggleLabel').textContent = t(bellEnabled ? 'bellOn' : 'bellOff');
  if (!bellEnabled) stopBells();
});
$('voiceToggle').addEventListener('click', () => {
  voiceEnabled = !voiceEnabled;
  $('voiceToggle').setAttribute('aria-pressed', String(voiceEnabled));
  $('voiceToggleLabel').textContent = t(voiceEnabled ? 'voiceOn' : 'voiceOff');
  if (!voiceEnabled) stopSpeech();
});
$('musicVolume').addEventListener('input', () => { music.volume = Number($('musicVolume').value) / 100; });
$('bellVolume').addEventListener('input', () => { for (const audio of activeBells) audio.volume = Number($('bellVolume').value) / 100; });
$('customOpen').addEventListener('click', openCustomDialog);
$('customOpenSecond').addEventListener('click', openCustomDialog);
$('customClose').addEventListener('click', () => $('customDialog').close());
$('customForm').addEventListener('submit', e => { e.preventDefault(); handleCustom(false); });
$('saveCustom').addEventListener('click', () => handleCustom(true));
// Pausamos el ejercicio si la pestaña queda oculta, para que no haya saltos de tiempo al volver.
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseSession(); });
window.addEventListener('pagehide', () => { music.pause(); stopBells(); stopSpeech(); });
loadCatalogue();

$('langEs').addEventListener('click',()=>setLanguage('es'));
$('langEn').addEventListener('click',()=>setLanguage('en'));
translatePage();
