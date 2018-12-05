$(document).ready(function () {
    $("#dlg-wrapper").hide();
    $("#dlg-box").hide();

    $("#dlg-footer button").click(function () {
        $("#dlg-wrapper").fadeOut();
        $("#dlg-box").hide();
    });

    $(".order-btn").click(function () {
        const price = Math.floor(Math.random() * 24) + 8
        $("#price").html(price)
        const weight = $("#weight").val()
        if (weight < 0.1) {
            alert("Weight should be equal or more than 0.1")
        } else {
            $("#dlg-wrapper").fadeIn();
            $("#dlg-box").fadeIn();
        }
    });

    $('.menu').click(function () {
        // $('.adm-nav .dropdown').toggle();
    })

    $('.menu').on('click', function () {
        $('.dropdown').toggle()
    })
});