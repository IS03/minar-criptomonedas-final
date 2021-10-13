AOS.init();

jQuery ('document').ready(function($) {

    var menuBtn = $ ('.menu-icon'),
        menu = $ ('.nav ul');

    menuBtn.click (function() {
        if (menu.hasClass ('mostrar') ) {
            menu.removeClass ('mostrar');
        } else {
            menu.addClass ('mostrar');            
        }
    });
});


$( document ).ready(function() 
{
   console.log( "El DOM esta listo" );
});

$("#boton").prepend("<button class='btn botonHora' onclick='alertarHora();'>Ver fecha y hora</button>");

const alertarHora = () => {
    let hora = new Date();
    Swal.fire(
        'La fecha y hora es:',
        hora.toLocaleString(),
        'info'
    )
}


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

let mi_tabla = document.createElement("table");
mi_tabla.setAttribute("class", "table table-striped table-dark");
let mi_tabla_body = document.createElement("tbody");


for (const producto of productos) {
    let mi_fila = document.createElement("tr");
    let mi_celda = document.createElement("td");
    mi_celda.innerText = producto.modelo;
    mi_fila.appendChild(mi_celda);
    let mi_celda2 = document.createElement("td");
    mi_celda2.innerText = producto.hasrate;
    mi_fila.appendChild(mi_celda2);
    let mi_celda3 = document.createElement("td");
    mi_celda3.innerHTML = `<b>$ ${producto.ganancia}</b>`;
    mi_fila.appendChild(mi_celda3);
    //terminamos de armar la fila
    mi_tabla_body.appendChild(mi_fila);
}

mi_tabla.appendChild(mi_tabla_body);
document.getElementById("tablaGpus").appendChild(mi_tabla);

