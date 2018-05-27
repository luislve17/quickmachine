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

        <div>
            <div class="trans_rect"></div>
            <img class="index_img" src="assets/machine-learning.jpg" alt="">
        </div>

        <div class='card' id='login_card'>
            <div class="card-header" id="index_card">
                <h3 id='login_title'>INICIAR SESIÓN</h3>
            </div>
            <div class="card-body text-left">
                <form id="login_form">
                    <div class="input-group mb-3" style="margin:0; padding:0">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary" type="button" style="display:none" id="cat_btn">Categoría</button>
                        </div>
                        <input id="username_input" type="text" placeholder="Nombre de usuario" style="padding:10px" autofocus/>
                    </div>
                    <input id="pass_input" type="password" placeholder="Contraseña"/>
                    <br/>
                    <button id="enter_button" type="button" class="btn btn-primary">ENTRAR</button>
                    <div style="padding:0;margin:0;text-align:right;margin-top:10px">
                        <a href="#" style="font-size: 13px">¿Olvidaste tu contraseña?</a>
                        <br />
                        <div class="ps_link" id="inic_reg">Regístrate</div>
                        <br />
                    </div>
                    <div class="alert alert-danger" id="error_notif"></div>
                </form>
            </div>
        </div>
    </body>
</html>
