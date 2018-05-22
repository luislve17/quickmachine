<?php
    session_start();
    if (!isset($_SESSION["logged_user"])) {
        header("Location: index.php");
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Quick Machine ~ Servicio de visualización de data online</title>
        <script src="script/jquery-3.3.1.min.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>
        <script>
            var current_username = "<?php echo $_SESSION["logged_user"]; ?>";
            var current_category = "<?php echo $_SESSION["logged_cat"]; ?>";
        </script>
        <script src="script/menu_script.js"></script>
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
            <a href="logout.php" class="logout_link">Salir</a>
        </div>

        <div class='rounded-0' id='menu_card'>
            <div class="card-header">
                <h4 id='menu_title'></h4>
            </div>
            <ul class="list-group" id="main_menu">
            </ul>
        </div>

        <div id="content">
            <div id="breadcrums"><i class="fas fa-map-marker-alt"></i><a href="#"> Menu</a><hr /></div>

            <center>
                <div class="card" style="width: 90%">
                    <div class="card-header" style="background-color:#303030">
                        <h3 class="card-title" style="color: white">Alpha 0.0.1 ya está aquí</h3>
                    </div>
                    <p class="card-text" style="margin: 20px; text-align:left">
                        No es como que importe mucho, la verdad ni siquiera se va a ver
                        esta version subida a un servidor, solo existen las definiciones
                        de las categorías y se habilitó el linkeo a la base de datos.
                        <br />
                        Nada interesante.
                    </p>
                </div>

                <div id="social">
                    <i class="fab fa-facebook-square"></i> Síguenos
                    <i class="fab fa-github"></i> <a href="#">Source</a>
                </div>
            </center>
        </div>
    </body>
</html>
