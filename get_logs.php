<?php
	$username = $_GET['user_name'];
	
	$mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');
	$query_1 = "select id,data_name,register_time from log_linreg where usr_name = '$username'";
	$query_2 = "select id,data_name,register_time from log_clustering where usr_name = '$username'";
	
	$result_1 = mysqli_query($mysqli,$query_1);
	$result_2 = mysqli_query($mysqli,$query_2);

	$info_array = array();

    while( $row = mysqli_fetch_assoc($result_1) ) {
		array_push($info_array, [$row['id'], $row['data_name'],'Regresion Lineal', $row['register_time']]);
	}
	while( $row = mysqli_fetch_assoc($result_2) ) {
		array_push($info_array, [$row['id'], $row['data_name'],'Clustering', $row['register_time']]);
	}
	echo json_encode($info_array);
?>