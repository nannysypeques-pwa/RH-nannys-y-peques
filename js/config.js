// ============================================================
// Nannys y Peques - Configuración Global del Sistema de Reclutamiento
// ============================================================

const CONFIG = {
    // ⚠️ IMPORTANTE: Actualiza esta URL después de redesplegar el Apps Script
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycby8s2Hk6cnxb0OXJcMtw4su29Vehy52hp1OQzQ5nw9Kvtqc-IkiI_JbPIlHs1S_sNs/exec',

    CIUDADES: ['Puebla', 'Xalapa', 'Querétaro', 'CDMX'],

    CIUDAD_EMOJI: {
        'Puebla': '🏛️',
        'Xalapa': '☕',
        'Querétaro': '🌸',
        'CDMX': '🌆'
    },

    ESTADO_CONFIG: {
        'pendiente': { label: 'Pendiente', emoji: '⏳', cls: 'badge-pendiente' },
        'aceptado': { label: 'Sigue el proceso', emoji: '✅', cls: 'badge-aceptado' },
        'capacitada': { label: 'Aceptadas', emoji: '⭐', cls: 'badge-aceptada' },
        'rechazado': { label: 'Rechazada', emoji: '❌', cls: 'badge-rechazado' },
        'whatsapp': { label: 'WhatsApp', emoji: '💬', cls: 'badge-whatsapp' }
    },

    STORAGE_KEY: 'nannys_rh_session',

    WHATSAPP_MSG: '¡Hola! Te contactamos de Nannys y Peques para continuar con tu proceso de selección. 🌷'
};

// ============================================================
// UTILIDADES GLOBALES
// ============================================================

/** Llama al backend (GET) */
async function apiGet(params) {
    const url = new URL(CONFIG.APPS_SCRIPT_URL);
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const res = await fetch(url.toString());
    return res.json();
}

/** Llama al backend (POST con form-urlencoded para evitar CORS preflight) */
async function apiPost(payload) {
    const body = new URLSearchParams();
    body.append('data', JSON.stringify(payload));

    const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
    });
    return res.json();
}

/** Obtiene sesión guardada */
function getSession() {
    try {
        const raw = sessionStorage.getItem(CONFIG.STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

/** Guarda sesión */
function saveSession(user) {
    sessionStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(user));
}

/** Cierra sesión */
function logout() {
    sessionStorage.removeItem(CONFIG.STORAGE_KEY);
}

/** Genera badge HTML para un estado */
function badgeHtml(estado) {
    const cfg = CONFIG.ESTADO_CONFIG[estado] || CONFIG.ESTADO_CONFIG['pendiente'];
    return `<span class="badge ${cfg.cls}">${cfg.emoji} ${cfg.label}</span>`;
}

/** Formatea teléfono para WhatsApp (México +52) */
function formatWAPhone(tel) {
    const digits = tel.replace(/\D/g, '');
    if (digits.length === 10) return '521' + digits;
    if (digits.length === 12 && digits.startsWith('52')) return digits;
    return digits;
}

/** Muestra alerta temporal */
function showAlert(containerId, message, type = 'error', durationMs = 5000) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<div class="alert alert-${type}">
    <span>${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
    <span>${message}</span>
  </div>`;
    if (durationMs > 0) {
        setTimeout(() => { container.innerHTML = ''; }, durationMs);
    }
}
