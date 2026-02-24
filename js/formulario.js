// ============================================================
// Nannys y Peques - Lógica del Formulario de Postulación
// js/formulario.js
// ============================================================

// ─── Tipos de experiencia genérica ───────────────────────────
const GENERIC_EXPS = [
    { id: 'escuela', label: 'Escuelas', emoji: '📚' },
    { id: 'servicio_social', label: 'Servicio social', emoji: '🤝' },
    { id: 'practica_prof', label: 'Práctica profesional', emoji: '📝' },
    { id: 'voluntariado', label: 'Voluntariado', emoji: '💚' },
    { id: 'campamentos', label: 'Campamentos / cursos de verano', emoji: '⛺' },
    { id: 'clases_particulares', label: 'Clases particulares / tareas', emoji: '📖' },
    { id: 'hospitalaria', label: 'Área hospitalaria / rehabilitación', emoji: '🏥' }
];

// ─── Utilidades ───────────────────────────────────────────────
const show = id => { const e = document.getElementById(id); if (e) e.style.display = 'block'; };
const hide = id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; };
const val = id => { const e = document.getElementById(id); return e ? e.value.trim() : ''; };
const radio = name => { const e = document.querySelector(`[name="${name}"]:checked`); return e ? e.value : ''; };
const checks = (name) => [...document.querySelectorAll(`[name="${name}"]:checked`)].map(e => e.value).join(', ');

// ─── Generar sub-sección genérica de experiencia ─────────────
function buildGenericSub(exp) {
    const d = document.createElement('div');
    d.id = `sub-${exp.id}`;
    d.className = 'sub-block blue cond';
    d.style.display = 'none';
    d.innerHTML = `
    <p style="font-weight:800;font-size:.82rem;color:var(--blue-400);margin-bottom:.8rem">${exp.emoji} ${exp.label}</p>
    <div class="form-group">
      <label class="form-label">¿Cuentas con referencias? <span class="req">*</span></label>
      <div class="radio-group">
        <div class="radio-pill"><input type="radio" name="${exp.id}_ref" id="${exp.id}_ref_no" value="No"><label for="${exp.id}_ref_no">❌ No</label></div>
        <div class="radio-pill"><input type="radio" name="${exp.id}_ref" id="${exp.id}_ref_si" value="Sí"><label for="${exp.id}_ref_si">✅ Sí</label></div>
      </div>
    </div>
    <div class="sub-block green cond" id="${exp.id}_ref_tipos">
      <div class="form-group mb-1">
        <label class="form-label" style="font-size:.8rem">Tipo de referencias: <span class="req">*</span></label>
        <div class="radio-group">
          <div class="check-pill"><input type="checkbox" name="${exp.id}_ref_tipo" id="${exp.id}_rt_a" value="Cartas de recomendación"><label for="${exp.id}_rt_a">📄 Cartas</label></div>
          <div class="check-pill"><input type="checkbox" name="${exp.id}_ref_tipo" id="${exp.id}_rt_b" value="Números jefe/supervisor"><label for="${exp.id}_rt_b">📞 Números</label></div>
          <div class="check-pill"><input type="checkbox" name="${exp.id}_ref_tipo" id="${exp.id}_rt_c" value="Otro"><label for="${exp.id}_rt_c">🔹 Otro</label></div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label" for="${exp.id}_rango">¿Con qué rango de edad trabajaste? <span class="req">*</span></label>
      <input class="form-control" type="text" id="${exp.id}_rango" placeholder="Ej. 3-6 años, lactantes, etc.">
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label class="form-label" for="${exp.id}_actividades">¿Cuáles eran tus actividades principales? <span class="req">*</span></label>
      <textarea class="form-control" id="${exp.id}_actividades" rows="2" placeholder="Describe tus actividades..."></textarea>
    </div>`;
    document.getElementById('generic-exp-subs').appendChild(d);

    // Reference radio listener
    document.querySelectorAll(`[name="${exp.id}_ref"]`).forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Sí') show(`${exp.id}_ref_tipos`);
            else hide(`${exp.id}_ref_tipos`);
        });
    });
}

// ─── Generar bloque de familia (niñera particular) ────────────
function buildFamiliaBlock(n) {
    const div = document.createElement('div');
    div.className = 'family-block';
    div.id = `familia-block-${n}`;
    div.innerHTML = `
    <div class="fb-title">🏠 Familia ${n}</div>
    <div class="fg2">
      <div class="form-group">
        <label class="form-label" for="f${n}_anio">Período (año de inicio y fin) <span class="req">*</span></label>
      <input class="form-control" type="text" id="f${n}_anio" placeholder="Ej. 2019 al 2022">
      </div>
      <div class="form-group">
      <label class="form-label" for="f${n}_horarios">Días y horarios <span class="req">*</span></label>
      <input class="form-control" type="text" id="f${n}_horarios" placeholder="Ej. L-V 8am-2pm">
      </div>
    </div>
    <div class="fg2">
      <div class="form-group">
        <label class="form-label" for="f${n}_edades">Edad o edades de los peques <span class="req">*</span></label>
        <input class="form-control" type="text" id="f${n}_edades" placeholder="Ej. 6 meses y 3 años">
      </div>
      <div class="form-group">
        <label class="form-label">¿Tienes el teléfono de mamá o papá? <span class="req">*</span></label>
        <div class="radio-group">
          <div class="radio-pill"><input type="radio" name="f${n}_tiene_tel" id="f${n}_tel_no" value="No"><label for="f${n}_tel_no">❌ No</label></div>
          <div class="radio-pill"><input type="radio" name="f${n}_tiene_tel" id="f${n}_tel_si" value="Sí"><label for="f${n}_tel_si">✅ Sí</label></div>
        </div>
      </div>
    </div>
    <div class="sub-block green cond" id="f${n}_tel_block">
      <div class="form-group mb-1">
        <label class="form-label" for="f${n}_telefono">Teléfono de mamá o papá <span class="req">*</span></label>
        <input class="form-control" type="tel" id="f${n}_telefono" placeholder="10 dígitos">
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label class="form-label" for="f${n}_resp">¿Cuáles eran tus responsabilidades? <span class="req">*</span></label>
      <textarea class="form-control" id="f${n}_resp" rows="2" placeholder="Describe tus responsabilidades con esta familia..."></textarea>
    </div>`;
    document.getElementById('familia-blocks-container').appendChild(div);

    document.querySelectorAll(`[name="f${n}_tiene_tel"]`).forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Sí') show(`f${n}_tel_block`);
            else hide(`f${n}_tel_block`);
        });
    });
}

// ─── Barra de progreso ────────────────────────────────────────
const SENTINELS = ['nombre', 'grado_estudios', 'disponibilidad', 'tiempo_trabajo'];

function updateProgress() {
    let done = 0;
    // Sentinel 1: nombre
    if (val('nombre')) done++;
    // Sentinel 2: grado
    if (radio('grado_estudios')) done++;
    // Sentinel 3: zona
    const ciudad = val('ciudad-input');
    if (ciudad === 'Puebla') {
        if (radio('zona_ciudad')) done++;
    } else if (ciudad === 'Querétaro') {
        if (radio('zona_ciudad_qro')) done++;
    } else if (ciudad === 'Xalapa') {
        if (radio('zona_ciudad_xal')) done++;
    } else if (ciudad === 'CDMX') {
        if (radio('zona_ciudad_cdmx')) done++;
    } else {
        if (val('zona_libre')) done++;
    }
    // Sentinel 4: disponibilidad
    if (radio('disponibilidad')) done++;
    // Sentinel 5: al menos una experiencia
    if (document.querySelector('#exp-checkboxes input:checked')) done++;
    // Sentinel 6: tiempo_trabajo
    if (val('tiempo_trabajo')) done++;
    // Sentinel 7: email
    if (val('email') && val('email').includes('@')) done++;

    const pct = Math.round((done / 7) * 100);
    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('progress-pct').textContent = pct + '%';
}

// ─── Máscara de Teléfono (XXX XXX XXXX) ──────────────────────
function setupPhoneMask(id) {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Solo números
        if (value.length > 10) value = value.slice(0, 10);

        let formatted = '';
        if (value.length > 0) {
            formatted = value.slice(0, 3);
            if (value.length > 3) {
                formatted += ' ' + value.slice(3, 6);
            }
            if (value.length > 6) {
                formatted += ' ' + value.slice(6, 10);
            }
        }
        e.target.value = formatted;
    });
}

// ─── Verificar Registro Previo (LocalStorage) ─────────────────
function checkPreviousRegistration() {
    if (localStorage.getItem('nannys_postulacion_enviada')) {
        const formHdr = document.getElementById('form-header');
        const formWrap = document.getElementById('form-wrapper');
        if (formHdr) formHdr.style.display = 'none';
        if (formWrap) {
            formWrap.querySelectorAll('form, [style*="linear-gradient"]').forEach(el => el.style.display = 'none');
            const regScreen = document.getElementById('already-registered-screen');
            if (regScreen) regScreen.classList.remove('hidden');
        }
        return true;
    }
    return false;
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Ciudad desde URL
    const params = new URLSearchParams(window.location.search);
    const ciudad = params.get('ciudad') || '';
    document.getElementById('ciudad-input').value = ciudad;

    const chip = document.getElementById('city-chip');
    const emoji = CONFIG.CIUDAD_EMOJI[ciudad] || '📍';
    if (chip) chip.textContent = `${emoji} ${ciudad}`;
    document.title = `Nannys y Peques · Postulación ${ciudad}`;

    // Verificar si ya se registró
    if (checkPreviousRegistration()) return;

    // Máscaras de teléfono
    setupPhoneMask('tel_principal');
    setupPhoneMask('tel_alternativo');

    // Zona adaptada por ciudad
    if (ciudad === 'Puebla') {
        show('zona-puebla-section');
    } else if (ciudad === 'Querétaro') {
        show('zona-qro-section');
    } else if (ciudad === 'Xalapa') {
        show('zona-xal-section');
    } else if (ciudad === 'CDMX') {
        show('zona-cdmx-section');
    } else {
        show('zona-libre-section');
    }

    // Generar sub-secciones genéricas de experiencia
    GENERIC_EXPS.forEach(buildGenericSub);

    // ── Grado de estudios ──
    document.querySelectorAll('[name="grado_estudios"]').forEach(el => {
        el.addEventListener('change', function () {
            ['sub-tecnico', 'sub-licenciatura', 'sub-otra-licenciatura', 'sub-maestria', 'sub-estudiando'].forEach(hide);
            if (this.value === 'Técnico profesional') show('sub-tecnico');
            else if (this.value === 'Licenciatura enfocada al desarrollo infantil') show('sub-licenciatura');
            else if (this.value === 'Otra licenciatura') show('sub-otra-licenciatura');
            else if (this.value === 'Maestría') show('sub-maestria');
            else if (this.value === 'Actualmente estudiando') show('sub-estudiando');
            updateProgress();
        });
    });

    // ── En prácticas ──
    document.querySelectorAll('[name="en_practicas"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Sí') show('sub-practicas');
            else hide('sub-practicas');
        });
    });

    document.querySelectorAll('[name="practicas_pequenitos"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Sí') show('sub-practicas-detalle');
            else hide('sub-practicas-detalle');
        });
    });

    // ── Zona otra (Puebla) ──
    document.querySelectorAll('[name="zona_ciudad"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Otra') show('sub-zona-otra');
            else hide('sub-zona-otra');
            updateProgress();
        });
    });

    // ── Zona otra (Querétaro) ──
    document.querySelectorAll('[name="zona_ciudad_qro"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Otra') show('sub-zona-otra-qro');
            else hide('sub-zona-otra-qro');
            updateProgress();
        });
    });

    // ── Zona otra (Xalapa) ──
    document.querySelectorAll('[name="zona_ciudad_xal"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Otra') show('sub-zona-otra-xal');
            else hide('sub-zona-otra-xal');
            updateProgress();
        });
    });

    // ── Zona otra (CDMX) ──
    document.querySelectorAll('[name="zona_ciudad_cdmx"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Otra') show('sub-zona-otra-cdmx');
            else hide('sub-zona-otra-cdmx');
            updateProgress();
        });
    });

    // ── Disponibilidad ──
    document.querySelectorAll('[name="disponibilidad"]').forEach(el => {
        el.addEventListener('change', () => {
            const horarioNeeded = ['Lunes a viernes MEDIO DÍA MAÑANAS', 'Lunes a viernes MEDIO DÍA TARDES', 'FINES DE SEMANA', 'Otro horario'];
            if (horarioNeeded.includes(el.value)) show('sub-disp-horario');
            else hide('sub-disp-horario');
            updateProgress();
        });
    });

    // ── Checkboxes de experiencia ──
    ['familia', 'ninera', 'guarderia', ...GENERIC_EXPS.map(e => e.id)].forEach(type => {
        const cb = document.getElementById(`cb-${type === 'clases_particulares' ? 'clases' : type === 'servicio_social' ? 'servicio_social' : type === 'practica_prof' ? 'practica_prof' : type}`);
        if (!cb) return;
        cb.addEventListener('change', () => {
            const subId = type === 'familia' ? null : `sub-${type}`;
            if (subId) {
                if (cb.checked) show(subId);
                else hide(subId);
            }
            updateProgress();
        });
    });

    // Fix: register all exp checkboxes correctly
    document.querySelectorAll('#exp-checkboxes input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const subId = `sub-${cb.value}`;
            if (document.getElementById(subId)) {
                if (cb.checked) show(subId);
                else hide(subId);
            }
            updateProgress();
        });
    });

    // ── Número de familias ──
    document.getElementById('ninera_num_familias').addEventListener('change', function () {
        const n = parseInt(this.value) || 0;
        const container = document.getElementById('familia-blocks-container');
        container.innerHTML = '';
        for (let i = 1; i <= Math.min(n, 5); i++) buildFamiliaBlock(i);
    });

    // ── Guarderías: referencia ──
    document.querySelectorAll('[name="guarderia_ref"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Sí') show('sub-guarderia-ref-tipo');
            else hide('sub-guarderia-ref-tipo');
        });
    });

    // ── Guarderías: rango de edad ──
    ['grango-l', 'grango-m', 'grango-p'].forEach((cbId, idx) => {
        const subIds = ['sub-guarderia-lactantes', 'sub-guarderia-maternal', 'sub-guarderia-preescolar'];
        const cb = document.getElementById(cbId);
        if (cb) cb.addEventListener('change', () => {
            if (cb.checked) show(subIds[idx]);
            else hide(subIds[idx]);
        });
    });

    // ── Otras agencias ──
    document.querySelectorAll('[name="otras_agencias"]').forEach(el => {
        el.addEventListener('change', () => {
            if (el.value === 'Sí') show('sub-agencias');
            else hide('sub-agencias');
            updateProgress();
        });
    });

    // ── Progreso general ──
    document.getElementById('candidata-form').addEventListener('input', updateProgress);
    document.getElementById('candidata-form').addEventListener('change', updateProgress);

    // ── SUBMIT ──
    document.getElementById('candidata-form').addEventListener('submit', handleSubmit);
});

// ─── Recopilar datos ─────────────────────────────────────────
function collectFormData() {
    const ciudad = val('ciudad-input');

    // Grado detalle
    const grado = radio('grado_estudios');
    let gradoDetalle = '';
    if (grado === 'Técnico profesional') gradoDetalle = val('tecnico_cual');
    else if (grado === 'Licenciatura enfocada al desarrollo infantil') gradoDetalle = val('licenciatura_tipo');
    else if (grado === 'Otra licenciatura') gradoDetalle = val('otra_licenciatura_cual');
    else if (grado === 'Maestría') gradoDetalle = val('maestria_cual');

    // Zona
    let zonaCiudad = '';
    if (ciudad === 'Puebla') {
        zonaCiudad = radio('zona_ciudad');
        if (zonaCiudad === 'Otra') zonaCiudad = 'Otra: ' + val('zona_otra_cual');
    } else if (ciudad === 'Querétaro') {
        zonaCiudad = radio('zona_ciudad_qro');
        if (zonaCiudad === 'Otra') zonaCiudad = 'Otra: ' + val('zona_otra_cual_qro');
    } else if (ciudad === 'Xalapa') {
        zonaCiudad = radio('zona_ciudad_xal');
        if (zonaCiudad === 'Otra') zonaCiudad = 'Otra: ' + val('zona_otra_cual_xal');
    } else if (ciudad === 'CDMX') {
        zonaCiudad = radio('zona_ciudad_cdmx');
        if (zonaCiudad === 'Otra') zonaCiudad = 'Otra: ' + val('zona_otra_cual_cdmx');
    } else {
        zonaCiudad = val('zona_libre');
    }

    // Disponibilidad
    const disp = radio('disponibilidad');
    const dispDetalle = val('disp_horario_detalle');

    // Familias (niñera particular)
    const numFamilias = val('ninera_num_familias');
    let familiasDetalle = '';
    if (numFamilias) {
        const n = Math.min(parseInt(numFamilias) || 0, 5);
        const bloques = [];
        for (let i = 1; i <= n; i++) {
            const tieneTel = radio(`f${i}_tiene_tel`);
            bloques.push(`FAMILIA ${i}: Período: ${val(`f${i}_anio`)} | Días/horarios: ${val(`f${i}_horarios`)} | Edades: ${val(`f${i}_edades`)} | Tel: ${tieneTel === 'Sí' ? val(`f${i}_telefono`) : 'No'} | Resp: ${val(`f${i}_resp`)}`);
        }
        familiasDetalle = bloques.join('\n');
    }

    // Guarderías
    const guarderiaRangos = checks('guarderia_rango');
    let guarderiaDetalles = '';
    if (document.getElementById('grango-l')?.checked) {
        guarderiaDetalles += `LACTANTES: Edad: ${val('g_l_edad')} | Act: ${checks('g_l_act')} | ${val('g_l_actividades')}\n`;
    }
    if (document.getElementById('grango-m')?.checked) {
        guarderiaDetalles += `MATERNAL: Edad: ${val('g_m_edad')} | Act: ${checks('g_m_act')} | ${val('g_m_actividades')}\n`;
    }
    if (document.getElementById('grango-p')?.checked) {
        guarderiaDetalles += `PREESCOLAR: Edad: ${val('g_p_edad')} | Act: ${checks('g_p_act')} | ${val('g_p_actividades')}`;
    }

    // Experiencias genéricas
    const genericData = {};
    GENERIC_EXPS.forEach(exp => {
        const cb = document.querySelector(`#cb-${exp.id}, #cb-clases`);
        const checked = document.getElementById(`cb-${exp.id}`)?.checked ||
            (exp.id === 'clases_particulares' && document.getElementById('cb-clases')?.checked);
        genericData[`exp_${exp.id}`] = checked ? 'Sí' : 'No';
        genericData[`${exp.id}_referencias`] = radio(`${exp.id}_ref`);
        genericData[`${exp.id}_ref_tipos`] = checks(`${exp.id}_ref_tipo`);
        genericData[`${exp.id}_rango`] = val(`${exp.id}_rango`);
        genericData[`${exp.id}_actividades`] = val(`${exp.id}_actividades`);
    });

    return {
        action: 'submitForm',
        ciudad,
        nombre: val('nombre'),
        email: val('email'),
        edad: val('edad'),
        telefono_principal: val('tel_principal'),
        telefono_alternativo: val('tel_alternativo'),
        grado_estudios: grado,
        grado_detalle: gradoDetalle,
        actualmente_estudiando: grado === 'Actualmente estudiando' ? 'Sí' : 'No',
        estudiando_que: val('estudiando_que'),
        estudiando_semestre: val('estudiando_semestre'),
        estudiando_horarios: val('estudiando_horarios'),
        en_practicas: radio('en_practicas'),
        practicas_pequenitos: radio('practicas_pequenitos'),
        practicas_donde: val('practicas_donde'),
        practicas_fechas: val('practicas_fechas'),
        practicas_horarios: val('practicas_horarios'),
        zona_ciudad: zonaCiudad,
        disponibilidad: disp,
        disponibilidad_horario_detalle: dispDetalle,
        exp_familia_propia: document.getElementById('cb-familia')?.checked ? 'Sí' : 'No',
        exp_ninera_particular: document.getElementById('cb-ninera')?.checked ? 'Sí' : 'No',
        ninera_num_familias: numFamilias,
        ninera_familias_detalle: familiasDetalle,
        exp_guarderia: document.getElementById('cb-guarderia')?.checked ? 'Sí' : 'No',
        guarderia_referencias: radio('guarderia_ref'),
        guarderia_tipo_referencias: checks('guarderia_ref_tipo'),
        guarderia_anio_tiempo: val('guarderia_anio'),
        guarderia_rangos_edad: guarderiaRangos,
        guarderia_detalles: guarderiaDetalles,
        ...genericData,
        tiempo_trabajo: val('tiempo_trabajo'),
        otras_agencias: radio('otras_agencias'),
        nombre_agencia: val('nombre_agencia'),
        referencias_agencia: radio('ref_agencia')
    };
}

// ─── Submit ──────────────────────────────────────────────────
async function handleSubmit(e) {
    e.preventDefault();
    const ciudad = val('ciudad-input');
    const btn = document.getElementById('submit-btn');

    // Validaciones mínimas
    const nombre = val('nombre');
    const email = val('email');
    const tel = val('tel_principal');
    if (!nombre) { showAlert('alert-container', 'Por favor ingresa tu nombre completo.'); scrollToTop(); return; }
    if (!email || !email.includes('@')) { showAlert('alert-container', 'Ingresa un correo electrónico válido.'); scrollToTop(); return; }
    if (!tel || tel.replace(/\D/g, '').length < 10) { showAlert('alert-container', 'Ingresa un teléfono válido de 10 dígitos.'); scrollToTop(); return; }
    if (!radio('grado_estudios')) { showAlert('alert-container', 'Selecciona tu grado de estudios.'); scrollToTop(); return; }

    // Validar zona
    if (ciudad === 'Puebla') {
        if (!radio('zona_ciudad')) { showAlert('alert-container', 'Selecciona tu zona de ubicación.'); scrollToTop(); return; }
    } else if (ciudad === 'Querétaro') {
        if (!radio('zona_ciudad_qro')) { showAlert('alert-container', 'Selecciona tu zona de ubicación.'); scrollToTop(); return; }
    } else if (ciudad === 'Xalapa') {
        if (!radio('zona_ciudad_xal')) { showAlert('alert-container', 'Selecciona tu zona de ubicación.'); scrollToTop(); return; }
    } else if (ciudad === 'CDMX') {
        if (!radio('zona_ciudad_cdmx')) { showAlert('alert-container', 'Selecciona tu zona de ubicación.'); scrollToTop(); return; }
    } else {
        if (!val('zona_libre')) { showAlert('alert-container', 'Ingresa tu zona o colonia de ubicación.'); scrollToTop(); return; }
    }

    if (!radio('disponibilidad')) { showAlert('alert-container', 'Selecciona tu disponibilidad.'); scrollToTop(); return; }
    if (!document.querySelector('#exp-checkboxes input:checked')) { showAlert('alert-container', 'Selecciona al menos un tipo de experiencia con peques.'); scrollToTop(); return; }
    if (!val('tiempo_trabajo')) { showAlert('alert-container', 'Selecciona el tiempo que deseas trabajar con nosotras.'); scrollToTop(); return; }

    // Validar bloques de familia si niñera particular está seleccionada
    if (document.getElementById('cb-ninera')?.checked) {
        const numFam = parseInt(val('ninera_num_familias')) || 0;
        if (!numFam) {
            showAlert('alert-container', 'Indica con cuántas familias has trabajado como niñera particular.');
            scrollToTop(); return;
        }
        for (let i = 1; i <= Math.min(numFam, 5); i++) {
            if (!val(`f${i}_anio`) || !val(`f${i}_horarios`) || !val(`f${i}_edades`) || !val(`f${i}_resp`)) {
                showAlert('alert-container', `Por favor completa toda la información obligatoria de la Familia ${i}.`);
                document.getElementById(`familia-block-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            const tieneTel = radio(`f${i}_tiene_tel`);
            if (!tieneTel) {
                showAlert('alert-container', `Indica si tienes el teléfono de mamá o papá de la Familia ${i}.`);
                document.getElementById(`familia-block-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            if (tieneTel === 'Sí' && !val(`f${i}_telefono`)) {
                showAlert('alert-container', `Por favor ingresa el teléfono de la Familia ${i}.`);
                document.getElementById(`familia-block-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }
    }

    // Validar Guardería si está seleccionada
    if (document.getElementById('cb-guarderia')?.checked) {
        if (!radio('guarderia_ref')) { showAlert('alert-container', 'Indica si tienes referencias de la guardería.'); scrollToTop(); return; }
        if (radio('guarderia_ref') === 'Sí' && !document.querySelector('[name="guarderia_ref_tipo"]:checked')) {
            showAlert('alert-container', 'Selecciona al menos un tipo de referencia de la guardería.'); scrollToTop(); return;
        }
        if (!val('guarderia_anio')) { showAlert('alert-container', 'Indica el año y tiempo que estuviste en la guardería.'); scrollToTop(); return; }
        const rangos = document.querySelectorAll('[name="guarderia_rango"]:checked');
        if (rangos.length === 0) { showAlert('alert-container', 'Selecciona al menos un rango de edad en la guardería.'); scrollToTop(); return; }

        // Lactantes detalles
        if (document.getElementById('grango-l')?.checked) {
            if (!val('g_l_edad') || !val('g_l_actividades') || !document.querySelector('[name="g_l_act"]:checked')) {
                showAlert('alert-container', 'Completa los detalles de Lactantes en la guardería.'); scrollToTop(); return;
            }
        }
        // Maternal detalles
        if (document.getElementById('grango-m')?.checked) {
            if (!val('g_m_edad') || !val('g_m_actividades') || !document.querySelector('[name="g_m_act"]:checked')) {
                showAlert('alert-container', 'Completa los detalles de Maternal en la guardería.'); scrollToTop(); return;
            }
        }
        // Preescolar detalles
        if (document.getElementById('grango-p')?.checked) {
            if (!val('g_p_edad') || !val('g_p_actividades') || !document.querySelector('[name="g_p_act"]:checked')) {
                showAlert('alert-container', 'Completa los detalles de Preescolar en la guardería.'); scrollToTop(); return;
            }
        }
    }

    // Validar Experiencias Genéricas
    for (const exp of GENERIC_EXPS) {
        const cbId = exp.id === 'clases_particulares' ? 'cb-clases' : `cb-${exp.id}`;
        const cb = document.getElementById(cbId);
        if (cb && cb.checked) {
            if (!radio(`${exp.id}_ref`)) { showAlert('alert-container', `Indica si tienes referencias para ${exp.label}.`); scrollToTop(); return; }
            if (radio(`${exp.id}_ref`) === 'Sí' && !document.querySelector(`[name="${exp.id}_ref_tipo"]:checked`)) {
                showAlert('alert-container', `Selecciona al menos un tipo de referencia para ${exp.label}.`); scrollToTop(); return;
            }
            if (!val(`${exp.id}_rango`)) { showAlert('alert-container', `Ingresa el rango de edad para ${exp.label}.`); scrollToTop(); return; }
            if (!val(`${exp.id}_actividades`)) { showAlert('alert-container', `Describe tus actividades en ${exp.label}.`); scrollToTop(); return; }
        }
    }

    btn.disabled = true;
    btn.innerHTML = `<span class="spinner" style="width:20px;height:20px;border-width:3px"></span> Enviando...`;

    try {
        const payload = collectFormData();
        const result = await apiPost(payload);

        if (result.success) {
            // Guardar en LocalStorage para evitar duplicados en este navegador
            localStorage.setItem('nannys_postulacion_enviada', 'true');

            document.getElementById('form-header').style.display = 'none';
            document.getElementById('form-wrapper').querySelector('form').style.display = 'none';
            document.querySelector('[style*="linear-gradient(135deg,var(--pink-50)"]')?.remove();
            document.getElementById('success-screen').classList.remove('hidden');
            document.getElementById('nombre-confirmacion').textContent = nombre.split(' ')[0];
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Error amigable para duplicados (o cualquier otro error del backend)
            showAlert('alert-container', result.message || 'Ocurrió un error. Intenta de nuevo.');
            scrollToTop();
            btn.disabled = false;
            btn.innerHTML = `<span>Enviar mi postulación</span> <span>💕</span>`;
        }
    } catch (err) {
        showAlert('alert-container', 'Error de conexión. Verifica tu internet e intenta de nuevo.');
        scrollToTop();
        btn.disabled = false;
        btn.innerHTML = `<span>Enviar mi postulación</span> <span>💕</span>`;
    }
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
