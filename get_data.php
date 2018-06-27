<?php
	$id = $_GET['id'];
	$table = $_GET['table'];
	
	$mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');
	$query = "select * from $table where id = '$id'";

	
	$result = mysqli_query($mysqli,$query);

	$data_array = array();
	if ($table == 'log_linreg'){
		while( $row = mysqli_fetch_assoc($result) ) {
			array_push($data_array, [$row['data_name'], $row['theta_0'], $row['theta_1'], $row['delta_J'], $row['num_iter'], $row['learning_rate'], $row['epsilon']]);
		}	
	} else if ($table == 'log_clustering'){
		while( $row = mysqli_fetch_assoc($result) ) {
			array_push($data_array, [$row['data_name'], $row['cant_clusters'], $row['cant_data'], $row['num_iter']]);
		}
	}

	echo json_encode($data_array);
?>