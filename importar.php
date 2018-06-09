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
        <script src="script/importar_script.js"></script>
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
            <div id="breadcrums"><i class="fas fa-map-marker-alt"></i><a href="menu.php"> Menu </a> &gt; Archivo &gt; <a href="#">Importar</a><hr /></div>
            
            <div style="margin-left:30px">
                <h2 class="h2">Subir archivo</h2>
            </div>

            <div class="border" id="upload_div" style="margin:30px;padding:30px">
                Abrir dataset desde archivo:<br />
                <input type="file" name="file" id="data_file" style="margin:10px">
                <br />
                <button class="btn btn-info" value="Upload Image" id="submit" style="border-radius:3px; margin:10px">Subir</button>
            </div>

            <div class="alert alert-danger" id="notif"></div>

        </div>
    </body>
</html>
