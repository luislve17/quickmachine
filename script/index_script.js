$(document).ready(function(){
    $("#title").click(function(){
        window.location.href = "index.php";
    });

    var inic_reg_flag = false;
    $("#inic_reg").click(function(){
        if(!inic_reg_flag){
            $(this).text('Iniciar sesión');
            $("#index_card").fadeOut(function() {
                $(this).html("<h3 id='login_title'>REGISTRO</h3>").fadeIn();
            });

            $('#enter_button').fadeOut(function(){
                $(this).html("REGISTRARSE").fadeIn();
            });

            $('#cat_btn').toggle(300);

            inic_reg_flag = true;
        } else {
            $(this).text('Regístrate');
            $("#index_card").fadeOut(function() {
                $(this).html("<h3 id='login_title'>INICIAR SESIÓN</h3>").fadeIn();
            });

            $('#enter_button').fadeOut(function(){
                $(this).html("ENTRAR").fadeIn();
            });

            $('#cat_btn').toggle(300);

            inic_reg_flag = false;
        }
    });

    var cat_showing = "Categoría"
    var id = -1;
    $("#cat_btn").click(function(){
        if((id == 2)||(id == -1)){
            $(this).text("Free");
        } else if(id == 0) {
            $(this).text("Regular");
        } else if(id == 1) {
            $(this).text("Premium");
        }
        id = (id + 1)%3;
        console.log(id);
    })

    $("#enter_button").click(function(){
        if(!inic_reg_flag){
            try_login();
        } else {
            try_register();
        }
    });

    $("#username_input, #pass_input").on('keyup', function (e) {
        if (e.keyCode == 13) { // Para ENTER
            if(!inic_reg_flag){
                try_login();
            } else {
                try_register();
            }
        }
    });

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

    function try_register(){
        var usr = $("#username_input").val().trim();
        var pass = $("#pass_input").val().trim();
        var log_error = $('#error_notif');

        if(usr == ""){
            log_error.html('<strong>Error: </strong>Ingrese nombre de usuario');
            log_error.fadeIn(300).delay(600).fadeOut(300);
        } else if(pass == "") {
            log_error.html('<strong>Error: </strong>Ingrese contraseña');
            log_error.fadeIn(300).delay(600).fadeOut(300);
        } else if (id == -1){
            log_error.html('<strong>Error: </strong>Escoja una categoría');
            log_error.fadeIn(300).delay(600).fadeOut(300);
        } else {
            switch (id) {
                case 0:
                    cat = "Free";
                    break;
                case 1:
                    cat = "Regular";
                    break;
                case 2:
                    cat = "Premium";
                    break;
            }

            $.ajax({
                type: "POST",
                url: "register.php",
                data: {
                    username: usr,
                    password: pass,
                    category: cat
                },
                success: function(html){
                    if(html == 1){
                        log_error.removeClass().addClass("alert alert-success");
                        log_error.html('<strong>Feed: </strong>Usuario creado con éxito');
                        log_error.fadeIn(300).delay(600).fadeOut(300, function(){
                            log_error.removeClass().addClass("alert alert-danger");
                        });
                    } else {
                        log_error.html('<strong>Error: </strong>Usuario ya existente');
                        log_error.fadeIn(300).delay(600).fadeOut(300);
                    }
                }
            });
        }
    }
})
