$(".textoQueEsMinar").hide();

$(".textoOculto1").click(function() {
    $(".textoQueEsMinar").fadeToggle(1200, function() {
        if ($(".textoOculto1").html() == "Leer más.") {
            $(".textoOculto1").html("Leer menos.");
        } else {
            $(".textoOculto1").html("Leer más.");
        }
    });
});

$(".textoRentabilidad").hide();

$(".textoOculto2").click(function() {
    $(".textoRentabilidad").fadeToggle(1200, function() {
        if ($(".textoOculto2").html() == "Leer más.") {
            $(".textoOculto2").html("Leer menos.");
        } else {
            $(".textoOculto2").html("Leer más.");
        }
    });
});