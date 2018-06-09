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
        <script src="script/mostrar_script.js"></script>
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
            <div id="breadcrums"><i class="fas fa-map-marker-alt"></i><a href="menu.php"> Menu</a> &gt; Data &gt; <a href="#">Mostrar</a><hr /></div>

            <div style="overflow-y: scroll;max-height: calc(100% - 100px);">                
                <table class="table" id="data_table">
                    <thead class="thead" style="background-color: #303030; color:white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre de dataset</th>
                            <th scope="col">Ultima modificación</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="data_logs">
                        <!--
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        -->
                    </tbody>

                    <!-- Modal -->
                    <div class="modal fade" id="my_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel">Confirmar</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
      
                            <div class="modal-body", id="modal_content">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" id="confirm">Confirmar</button>
                                <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
                            </div>
                            <div id="notif">
                                
                            </div>
                        </div>
                      </div>
                    </div>
                </table>
            </div>
        </div>
    </body>
</html>
