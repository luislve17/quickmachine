$(document).ready(function(){
    $("#username_input, #pass_input").on('keyup', function (e) {
        if (e.keyCode == 13) { // Para ENTER
            try_login();
        }
    });

    $("#title").click(function(){
        window.location.href = "index.php";
    });

    $("#enter_button").click(function(){try_login();});

    function try_login(){
        var usr = $("#username_input").val().trim();
        var pass = $("#pass_input").val().trim();
        var log_error = $('#error_notif');

        if(usr == ""){
            log_error.html('<strong>Error: </strong>Ingrese nombre de usuario');
            log_error.fadeIn(300).delay(600).fadeOut(300);
        } else if(pass == "") {
            log_error.html('<strong>Error: </strong>Ingrese contraseña');
            log_error.fadeIn(300).delay(600).fadeOut(300);
        } else {
            $.ajax({
                type: "POST",
                url: "verify.php",
                data: {
                    username: usr,
                    password: pass
                },
                success: function(html){
                    if(html == 1){
                        window.location.href = "menu.php";
                    } else {
                        log_error.html('<strong>Error: </strong>Usuario no encontrado');
                        log_error.fadeIn(300).delay(600).fadeOut(300);
                    }
                }
            });
        }
    }
})
