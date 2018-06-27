<?php
	$username = $_GET['usr_name'];

	$mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');

	$query = "select id from users where username = '$username'";
	$usr_id = mysqli_query($mysqli, $query)or die(mysqli_error());
	$row = mysqli_fetch_array($usr_id);
	echo $row['id'];
?>