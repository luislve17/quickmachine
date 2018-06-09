$('document').ready(function(){
    $("#menu_title").text("Bienvenido(a) @" + current_username);
    $("#menu_title").fadeIn(1000);

    $("#title").click(function(){
        window.location.href = "menu.php";
    });

    $.ajax({
        type: "POST",
        url: "get_menus.php",
        data: {
            category: current_category
        },
        success: function(result){
            loadMenus(result);
        }
    })

    function loadMenus(array){
        var menu_array = prepareArray(array);
        for(var i = 0; i < menu_array.length; i++){
            if(menu_array[i][2] == 0){
                var new_menu = "<div class='menu_container' id='menu_container_" + i +"'><button type='button' class='list-group-item d-flex justify-content-between align-items-center menu btn'>" + menu_array[i][1] + "</button></div>";
                $('#main_menu').append(new_menu);
                var sub_menu_div = "<ul class='list-group submenu_ul' id='sub_mainmenu_" + i + "'></ul>";
                $('#menu_container_'+i).append(sub_menu_div);
                for(var j = 0; j < menu_array.length; j++){
                    if(menu_array[j][2] == menu_array[i][0]){
                        var new_submenu = "<button type='button' class='list-group-item d-flex justify-content-between align-items-center sub_menu btn' id='submenu_"+menu_array[j][0]+"'> ⇢ " + menu_array[j][1] + "</button>";
                        $('#sub_mainmenu_'+i).append(new_submenu);
                    }
                }
            }
        }
    }

    function prepareArray(string){
        var menu_string = string.replace('[','');
        menu_string = menu_string.replace(']','');
        menu_string = menu_string.replace(/"/g,'');

        var menu_array = menu_string.split(',');

        for(var i = 0; i < menu_array.length; i++){
            menu_array[i] = menu_array[i].split('-');
            menu_array[i][0] = parseInt(menu_array[i][0]);
            menu_array[i][2] = parseInt(menu_array[i][2]);
        }

        return menu_array;
    }

    var click_flags = [];

    for(var i = 0; i < 20; i++){
        click_flags.push(false);
    }

    $("#main_menu").on('click', '.menu', function(){
        var menu_index = $(this).parent().index();
        var submenu_list = $(this).next();

        if(!click_flags[menu_index]){
            submenu_list.toggle(300, function(){
                click_flags[menu_index] = true;
            });
            submenu_list.css('display', 'grid');


        } else {
            submenu_list.toggle(300, function(){
                click_flags[menu_index] = false;
            });
        }
    })

    $("#main_menu").on('click', '.sub_menu', function(){
        if($(this).attr('id') == "submenu_4"){ // Archivo > Nuevo
            window.location.href = "nuevo.php";
        } else if ($(this).attr('id') == "submenu_9"){ // Data > Mostrar
            window.location.href = "mostrar.php";
        } else if ($(this).attr('id') == "submenu_5") {
            window.location.href = "importar.php";
        }
    })

    $(".logout_link").click(function(){
        localStorage.clear();
    })
});
