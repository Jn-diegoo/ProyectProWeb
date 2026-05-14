const REPORT_STORAGE_KEY = 'patitas_reportes';

function getStoredReports() {
    const raw = localStorage.getItem(REPORT_STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveStoredReports(reports) {
    localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(reports));
}

function formatDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function renderReports() {
    const reports = getStoredReports();
    const list = document.getElementById('report-list');
    const noReports = document.getElementById('no-reports');

    if (!list || !noReports) return;

    list.innerHTML = '';

    if (reports.length === 0) {
        noReports.style.display = 'block';
        return;
    }

    noReports.style.display = 'none';

    reports.slice().reverse().forEach(report => {
        const card = document.createElement('article');
        card.className = 'report-card';
        card.innerHTML = `
            <h3>${report.nombre || 'Mascota sin nombre'}</h3>
            <p class="report-meta"><strong>Tipo:</strong> ${report.tipo || 'No especificado'} • <strong>Ubicación:</strong> ${report.ubicacion || 'No especificada'} • <strong>Fecha:</strong> ${formatDate(report.fecha)}</p>
            <p><strong>Raza:</strong> ${report.raza || 'No especificada'}</p>
            <p><strong>Edad aproximada:</strong> ${report.edad || 'No especificada'}</p>
            <p><strong>Detalles:</strong> ${report.detalles || 'Sin detalles adicionales.'}</p>
            <p><strong>País:</strong> ${report.pais || 'No especificado'}</p>
            <p><strong>Ciudad:</strong> ${report.ciudad || 'No especificada'}</p>
            <p><strong>Contacto:</strong> ${report.dueno || '-'} | ${report.telefono || '-'} | ${report.email || '-'}</p>
        `;
        list.appendChild(card);
    });
}

function handleReportSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const report = {
        tipo: form['tipo-mascota'].value,
        nombre: form['nombre-mascota'].value,
        raza: form.raza.value,
        color: form.color.value,
        edad: form.edad.value,
        fecha: form['fecha-perdida'].value,
        ubicacion: form.ubicacion.value,
        pais: form['pais-perdida'].value,
        detalles: form.detalles.value,
        dueno: form['nombre-dueno'].value,
        telefono: form.telefono.value,
        email: form.email.value,
        ciudad: form.ciudad.value,
        creado: new Date().toISOString()
    };

    const reports = getStoredReports();
    reports.push(report);
    saveStoredReports(reports);
    alert('Reporte guardado correctamente. Serás redirigido a la página de reportes.');
    window.location.href = '../pages/reportes.html';
}

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-form');
    if (form) {
        form.addEventListener('submit', handleReportSubmit);
    }
    if (document.getElementById('report-list')) {
        renderReports();
    }
});
