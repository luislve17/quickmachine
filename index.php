<?php
    session_start();
    if (isset($_SESSION["logged_user"])) {
        header("Location: menu.php");
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Quick Machine ~ Servicio de visualización de data online</title>
        <script src="script/jquery-3.3.1.min.js"></script>
        <script src="script/index_script.js"></script>
        <script src="script/bootstrap.min.js"></script>
        <link rel="stylesheet" type"text/css" href="style/bootstrap.min.css"/>
        <link rel="stylesheet" type"text/css" href="style/style.css"/>
    </head>
    <body>
        <div id="title">
            <div id="title_back"></div>
            <h1 id="title_text">QUICK MACHINE</h1>
            <div id="title_logo"></div>
            <img id="title_icon" src="assets/icon_title.png" alt="icon_img">
        </div>

        <div class='card' id='login_card'>
            <div class="card-header">
                <h3 id='login_title'>INICIAR SESIÓN</h3>
            </div>
            <div class="card-body text-center">
                <form id="login_form">
                    <input id="username_input" type="text" placeholder="Nombre de usuario" autofocus/>
                    <br />
                    <input id="pass_input" type="password" placeholder="Contraseña"/>
                    <br />
                    <a href="#" style="font-size: 13px">¿Olvidaste tu contraseña?</a>
                    <br />
                    <button id="enter_button" type="button" class="btn btn-primary">ENTRAR</button>
                    <div class="alert alert-danger" id="error_notif"></div>
                </form>
            </div>
        </div>
    </body>
</html>
