<?php
    session_start();
    $category = $_POST['category'];

    $mysqli = mysqli_connect('localhost', 'root', 'mysql', 'quickmachine');
    $query = "select m.* from menus m, (select * from categories where category = '$category') p where m.cat_id <= p.cat_id";
    $result = mysqli_query($mysqli, $query)or die(mysqli_error());

    $menu_array = array();

    if ($result->num_rows != 0){
        while($row = mysqli_fetch_array($result)){
            $menu_array[] = $row['menu_id']."-".$row['menu']."-".$row['parent_id'];
        }
        echo json_encode($menu_array);
    } else {
        echo "?";
    }
?>
