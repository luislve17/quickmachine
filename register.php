<?php
    $username = $_POST['username'];
    $password = md5($_POST['password']);
    $category = $_POST['category'];

    $mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');

    $verif_query = "select * from users where username = '$username'";
    $verif_result = mysqli_query($mysqli,$verif_query)or die(mysqli_error());
    if(mysqli_num_rows($verif_result) >= 1){
        echo "-1";
    } else {
        $insertion = "insert into users (username, password, category) values ('$username', '$password', '$category');";
        mysqli_query($mysqli,$insertion);
        echo "1";
    }
?>
