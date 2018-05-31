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
        <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>
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
                    <input id="username_input" type="text" placeholder="Nombre de usuario" style="padding:10px" autofocus/>
                    <input id="pass_input" type="password" placeholder="Contraseña"/>
                    <div id="cat" style="padding:0; margin-up:10px; display:none">
                        <label class="col-form-label" id="cat_label">Categoría <i class="fas fa-caret-right"></i></label>
                        <select id="cat_combo" style="width:170px;height:45px">
                            <option value="Premium">Premium</option>
                            <option value="Regular">Regular</option>
                            <option value="Free">Free</option>
                        </select>
                    </div>
                    <button id="enter_button" type="button" class="btn btn-primary" style="display:block">ENTRAR</button>
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
