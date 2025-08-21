// Inicializar AOS (Animate On Scroll)
AOS.init();

// Función para manejar el menú hamburguesa
jQuery('document').ready(function($) {
    var menuBtn = $('.menu-icon');
    var menu = $('.nav');
    var isMenuOpen = false;

    // Toggle del menú
    menuBtn.click(function() {
        if (isMenuOpen) {
            menu.removeClass('mostrar');
            isMenuOpen = false;
        } else {
            menu.addClass('mostrar');
            isMenuOpen = true;
        }
    });

    // Cerrar menú al hacer click en un enlace
    $('.nav ul li a').click(function() {
        if (window.innerWidth <= 768) {
            menu.removeClass('mostrar');
            isMenuOpen = false;
        }
    });

    // Cerrar menú al hacer click fuera de él
    $(document).click(function(event) {
        if (!$(event.target).closest('.header').length && isMenuOpen) {
            menu.removeClass('mostrar');
            isMenuOpen = false;
        }
    });

    // Manejar resize de ventana
    $(window).resize(function() {
        if (window.innerWidth > 768) {
            menu.removeClass('mostrar');
            isMenuOpen = false;
        }
    });
});

// Verificar que el DOM esté listo
$(document).ready(function() {
    console.log("El DOM está listo");
    
    // Crear tabla de GPUs si existe el contenedor
    crearTablaGPUs();
    
    // Configurar botones "Leer más"
    setupLeerMas();
});

// Función para mostrar fecha y hora
const alertarHora = () => {
    let hora = new Date();
    Swal.fire({
        title: 'Fecha y Hora Actual',
        text: hora.toLocaleString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#68bbe3'
    });
};

// Array de productos GPU
const productos = [
    { modelo: "GeForce 1660 Ti", hasrate: "28.00 Mh/s", ganancia: "4.77$usd en 24hs" },
    { modelo: "GeForce 1070", hasrate: "26.00 Mh/s", ganancia: "4.27$usd en 24hs" },
    { modelo: "Radeon RX 580 8GB", hasrate: "30.50 Mh/s", ganancia: "5.09$usd en 24hs" },
    { modelo: "GeForce RTX 2080", hasrate: "40.10 Mh/s", ganancia: "6.72$usd en 24hs" },
    { modelo: "Radeon RX 5600 XT", hasrate: "40.50 Mh/s", ganancia: "6.91$usd en 24hs" },
    { modelo: "GeForce RTX 2080 Ti", hasrate: "55.20 Mh/s", ganancia: "9.35$usd en 24hs" },
    { modelo: "GeForce RTX 3060 Ti", hasrate: "58.10 Mh/s", ganancia: "10.11$usd en 24hs" },
    { modelo: "Radeon VII", hasrate: "93.00 Mh/s", ganancia: "16.03$usd en 24hs" },
    { modelo: "GeForce RTX 3090", hasrate: "114.0 Mh/s", ganancia: "19.42$usd en 24hs" }
];

// Crear tabla de GPUs
function crearTablaGPUs() {
    const tablaContainer = document.getElementById("tablaGpus");
    if (!tablaContainer) return;

    let mi_tabla = document.createElement("table");
    mi_tabla.setAttribute("class", "table table-striped table-dark");
    
    // Crear header de la tabla
    let mi_tabla_head = document.createElement("thead");
    let mi_fila_head = document.createElement("tr");
    let headers = ["Modelo GPU", "Hash Rate", "Ganancia Estimada"];
    
    headers.forEach(headerText => {
        let mi_celda_head = document.createElement("th");
        mi_celda_head.innerText = headerText;
        mi_fila_head.appendChild(mi_celda_head);
    });
    
    mi_tabla_head.appendChild(mi_fila_head);
    mi_tabla.appendChild(mi_tabla_head);
    
    let mi_tabla_body = document.createElement("tbody");

    productos.forEach(producto => {
        let mi_fila = document.createElement("tr");
        
        let mi_celda = document.createElement("td");
        mi_celda.innerText = producto.modelo;
        mi_fila.appendChild(mi_celda);
        
        let mi_celda2 = document.createElement("td");
        mi_celda2.innerText = producto.hasrate;
        mi_fila.appendChild(mi_celda2);
        
        let mi_celda3 = document.createElement("td");
        mi_celda3.innerHTML = `<b>$${producto.ganancia}</b>`;
        mi_fila.appendChild(mi_celda3);
        
        mi_tabla_body.appendChild(mi_fila);
    });

    mi_tabla.appendChild(mi_tabla_body);
    tablaContainer.appendChild(mi_tabla);
}

// Función para manejar los botones "Leer más"
function setupLeerMas() {
    const botones = document.querySelectorAll('.btnVerMas');
    
    botones.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            const textoCompleto = document.querySelector(index === 0 ? '.textoQueEsMinar' : '.textoRentabilidad');
            
            if (textoCompleto) {
                if (textoCompleto.style.display === 'none' || !textoCompleto.style.display) {
                    textoCompleto.style.display = 'block';
                    boton.textContent = 'Leer menos';
                    textoCompleto.scrollIntoView({ behavior: 'smooth' });
                } else {
                    textoCompleto.style.display = 'none';
                    boton.textContent = 'Leer más';
                }
            }
        });
    });
}

