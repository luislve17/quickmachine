<?php
    session_start();
    $username = $_POST['username'];
    $password = md5($_POST['password']);

    $mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');
    $query = "select * from users where username='$username' and password='$password'";

    $result = mysqli_query($mysqli,$query)or die(mysqli_error());

    $num_row = mysqli_num_rows($result);
    $row = mysqli_fetch_array($result);
    if( $num_row == 1 ) {
        $_SESSION['logged_user']=$row['username'];
        $_SESSION['logged_cat']=$row['category'];
        echo "1";
    }else{
        echo "0";
    }
?>
