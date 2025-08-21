$(document).ready(function() {
    const APIURL = "https://jsonplaceholder.typicode.com/posts";

    $("fieldset").append('<button id="btn1" class="formulario2">Enviar</button>');
    $("#btn1").click(() => {
        $.ajax({
          method: "POST",
          url: APIURL,
      })
      
        Swal.fire({
            title: 'Estás seguro de querer enviarlo?',
            text: "No te olvides de revisar tus datos!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Bien!',
                'Su consulta fue enviada correctamente!',
                'success'
              ) } else {
                 Swal.fire (
                'Listo',
                'Esperamos su consulta.',
                'info' )
              }
            })
    });
});

let form = document.getElementById("form");
form.addEventListener("submit", validarform);


let campoEdad = document.getElementById("edad");
function validarform(e) {
    e.preventDefault();
    if (isNaN(campoEdad.value)) {
        Swal.fire({
            icon: 'error',
            text: 'NO PUSISTE UNA EDAD VÁLIDA!',
          })
        console.log ("El usuario a ingresado letras en la zona de edad");
    }
}
