<?php
	$user_name = $_POST['user_name'];
	$data_name = $_POST['data_name'];
	$cant_clust = $_POST['cant_clusters'];
	$cant_datos = $_POST['cant_datos'];
	$num_iter = $_POST['num_iter'];

	$mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');
	$insertion = "insert into log_clustering (usr_name, data_name, cant_clusters, cant_data, num_iter) values ('$user_name', '$data_name', '$cant_clust', '$cant_datos', '$num_iter');";
	mysqli_query($mysqli,$insertion);
	echo "1";
?>