/**
 * Calculadora de Tasa de Cambio COP = Bs
 * Script principal con toda la lógica de la aplicación
 */

/**
 * Actualiza la tabla de conversiones basándose en las tasas ingresadas
 */
function actualizarTabla() {
    const tasaPesos = parseFloat(document.getElementById('tasaPesos').value) || 14;
    const tasaDolar = parseFloat(document.getElementById('tasaDolar').value) || 207.89;

    // Actualizar valores en la previsualización
    document.getElementById('tasaNumero').textContent = tasaPesos;
    document.getElementById('tasaDolarDisplay').textContent = tasaDolar.toFixed(2);

    // Valores de pesos a convertir
    const pesos = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    const tbody = document.getElementById('tablaBody');
    tbody.innerHTML = '';

    // Generar filas de conversión
    pesos.forEach(peso => {
        const bs = (peso / tasaPesos).toFixed(2);
        const bcv = (peso / (tasaPesos * tasaDolar)).toFixed(2);

        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${peso.toLocaleString('es-CO')}</td><td>${bs}</td><td>${bcv}</td>`;
        tbody.appendChild(tr);
    });

    // Fila final en verde (equivalente de 1 USD)
    const trFinal = document.createElement('tr');
    trFinal.className = 'total-row';

    const unDolarEnPesos = (tasaPesos * tasaDolar).toFixed(0);
    const unDolarEnBs = tasaDolar.toFixed(2);

    trFinal.innerHTML = `<td>${unDolarEnPesos.toLocaleString('es-CO')}</td><td>${unDolarEnBs}</td><td>1.00</td>`;
    tbody.appendChild(trFinal);
}

/**
 * Convierte una imagen a Data URL
 */
function imageToDataURL(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
}

/**
 * Genera y descarga una imagen PNG de la tabla de conversiones
 */
async function descargarImagen() {
    const elemento = document.getElementById('preview');

    // Verificar que html2canvas esté disponible
    if (typeof html2canvas === 'undefined') {
        alert('Error: La librería html2canvas no se ha cargado correctamente.');
        return;
    }

    try {
        // Obtener todas las imágenes del elemento
        const images = elemento.querySelectorAll('img');
        const originalSources = new Map();

        // Convertir cada imagen a data URL para evitar tainted canvas
        for (const img of images) {
            try {
                // Guardar la fuente original
                originalSources.set(img, img.src);

                // Convertir a data URL
                const dataURL = imageToDataURL(img);
                img.src = dataURL;
            } catch (e) {
                console.warn('No se pudo convertir imagen:', e);
            }
        }

        // Esperar un momento para que las imágenes se actualicen
        await new Promise(resolve => setTimeout(resolve, 100));

        // Generar el canvas
        const canvas = await html2canvas(elemento, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            useCORS: false,
            allowTaint: false
        });

        // Restaurar las fuentes originales
        for (const [img, originalSrc] of originalSources) {
            img.src = originalSrc;
        }

        // Descargar la imagen
        const link = document.createElement('a');
        link.download = `tasa-cambio-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        console.log('✅ Imagen generada exitosamente');

    } catch (error) {
        console.error('❌ Error al generar imagen:', error);
        alert('Error al generar la imagen.\n\n' +
            'Si estás abriendo el archivo directamente (file://), ' +
            'ejecuta el servidor con: python server.py\n\n' +
            'Detalles: ' + error.message);
    }
}

/**
 * Comparte la imagen generada (actualmente solo descarga)
 */
async function compartirImagen() {
    // Por ahora solo descarga la imagen
    // Se puede implementar Web Share API en el futuro
    descargarImagen();
}

// ===================================
// PERSISTENCIA DE DATOS
// ===================================

/**
 * Guarda los valores actuales en localStorage
 */
function guardarValores() {
    const tasaPesos = document.getElementById('tasaPesos').value;
    const tasaDolar = document.getElementById('tasaDolar').value;
    
    localStorage.setItem('tasaPesos', tasaPesos);
    localStorage.setItem('tasaDolar', tasaDolar);
}

/**
 * Carga los valores guardados del localStorage
 */
function cargarValores() {
    const tasaPesos = localStorage.getItem('tasaPesos');
    const tasaDolar = localStorage.getItem('tasaDolar');
    
    if (tasaPesos) {
        document.getElementById('tasaPesos').value = tasaPesos;
    }
    
    if (tasaDolar) {
        document.getElementById('tasaDolar').value = tasaDolar;
    }
}

// ===================================
// INICIALIZACIÓN
// ===================================

// Event listeners para actualización en tiempo real y guardado
document.getElementById('tasaPesos').addEventListener('input', () => {
    actualizarTabla();
    guardarValores();
});

document.getElementById('tasaDolar').addEventListener('input', () => {
    actualizarTabla();
    guardarValores();
});

// Inicializar la tabla al cargar la página
cargarValores();
actualizarTabla();
