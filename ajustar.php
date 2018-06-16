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
        <script src="script/ajustar_script.js"></script>
        <script src="script/bootstrap.min.js"></script>
		<script src="script/Chart.bundle.min.js"></script>
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
            <div id="breadcrums"><i class="fas fa-map-marker-alt"></i><a href="menu.php"> Menu</a> &gt; Modulos &gt; <a href="#">Ajuste Lineal</a><hr /></div>

            <div id="table_body" style="overflow-y: scroll;max-height: calc(100% - 100px);">                
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
                </table>
            </div>
	
			<div id="graph_body">
				<div id="graph_portion">
					<canvas id="myChart"></canvas>				
				</div>
				<div id="reg_desc">
					<div class="card" id="reg_desc">
						<div class="card-body">
						<h5 class="card-title" id="data_title"></h5>
						<h6 class="card-subtitle mb-2 text-muted">Regresión Lineal</h6>
						<ul class="card-text" style="text-align:left">
							<li>Ecuación: </li>
							<li>R^2: </li>
							<li>Cantidad de iteraciones: </li>
							<li>Ratio de aprendizaje: </li>
							<li>Epsilon de margen: </li>
						</ul>
						</div>
					</div>
				</div>

				<div id="reg_options">
					<button class="btn btn-warning" id="back">Volver</button>
					<button class="btn btn-success" id="register">Registrar</button>
				</div>
			</div>

	        <div class="alert alert-danger" id="diff_notif"></div>
        </div>
    </body>
</html>
