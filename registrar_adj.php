<?php
	$username = $_POST['user_name'];
	$data_name = $_POST['data_name'];
	$theta_0 = $_POST['theta_0'];
	$theta_1 = $_POST['theta_1'];
	$delta_J = $_POST['delta_J'];
	$num_iter = $_POST['num_iter'];
	$learning_rate = $_POST['learning_rate'];
	$epsilon = $_POST['epsilon'];

	$mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');
	$insertion = "insert into log_linreg (usr_name, data_name, theta_0, theta_1, delta_J, num_iter, learning_rate, epsilon) values ('$username', '$data_name', '$theta_0', '$theta_1', '$delta_J', '$num_iter', '$learning_rate', '$epsilon');";
	mysqli_query($mysqli,$insertion);
	echo "1";
?>