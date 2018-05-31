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
        <script src="script/nuevo_script.js"></script>
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
            <div id="breadcrums"><i class="fas fa-map-marker-alt"></i><a href="menu.php"> Menu</a> &gt; Archivo &gt; <a href="#">Nuevo</a><hr /></div>

            <center>
                <div class="card data_input" style="width: 90%">
                    <div align="left">
                        <div class="card-header" style="background-color:#303030">
                            <div class="card-title" style="color: white" id="data_name">
                                <h3 id="current_name">sin titulo*</h3>
                                <input type="text" id="input_name" style="display:none;font-size:22px;border-radius:4px"/>
                                <button type="button" class="btn btn-secondary" id="edit_name"><i class="far fa-edit"></i></button>
                            </div>
                        </div>
                        <div class="card-text" style="margin: 20px; text-align:left">
                            <textarea class="form-control" rows="10" style="resize:none" id="data_input"></textarea>
                        </div>
                        <div class="btn_module" style="padding:20px; text-align:right">
                            <div style="float:left">
                                <label style="padding-right:35px">Separación:</label>
                                <input type="checkbox" class="form-check-input sep_check" id="space">
                                <label class="form-check-label sep_option" for="space">Espacio/Tab</label>

                                <input type="checkbox" class="form-check-input" id="comma">
                                <label class="form-check-label sep_option" for="comma">Coma</label>
                            </div>

                            <button type="button" class="btn btn-secondary" id="cancelar">X</button>
                            <button type="button" class="btn btn-danger" id="deshechar"><i class="far fa-trash-alt"></i> Deshechar</button>
                            <button type="button" class="btn btn-info" id="guardar"><i class="far fa-save"></i> Guardar</button>
                        </div>
                    </div>
                </div>
            </center>
            <div class="alert alert-danger" id="notif"></div>
        </div>
    </body>
</html>
