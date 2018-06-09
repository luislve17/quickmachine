$(document).ready(function(){
    showDataTable();

    function processLocalData(d_name){
        var data_string = localStorage.getItem(d_name);
        var array_strings = data_string.split('],');
        for(var i = 0; i < array_strings.length - 1; i++){ // Todo menos la fecha al final
            array_strings[i] = array_strings[i].replace(/\[/g, '').split(',');
            for(var j = 0; j < array_strings[i].length; j++){
                array_strings[i][j] = parseFloat(array_strings[i][j]);
            }
        }
        var data_values = array_strings.slice(0,array_strings.length-1);
        var data_date = array_strings[array_strings.length - 1].replace(/\"/g, '').replace('\]', '');

        return {values: data_values, date: data_date};
    }

    function showDataTable(){
        $("#data_logs").html("");

        for(var i = 0; i < localStorage.length; i++){
            var data_name = localStorage.key(i);
            var data = processLocalData(data_name);
                var data_values = data.values;
                var data_date = data.date;

            $("#data_logs").append("<tr>\
            <th scope='row'>"+ (parseFloat(i)+1) +"</th>\
            <td>"+data_name+"</td>\
            <td>"+data_date+"</td>\
            <td><button class='btn btn-info ed' data-toggle='modal' data-target='#my_modal' id='editar_" + (parseFloat(i)+1) + "'><i class='far fa-edit'></i></button>\
            <button class='btn btn-dark el' data-toggle='modal' data-target='#my_modal' id='eliminar_"+ (parseFloat(i)+1) + "'><i class='far fa-times-circle'></i></button></td>\
            </tr>");
        }
    }

    var editing = false;
    var deleting = false;
    // Eliminar data
    var to_delete_name = "";
    $("#data_logs").on('click', '.el', function(){
        deleting = true;
        editing = false;
        $("#confirm").removeClass().addClass("btn btn-danger");
        $("#ModalLabel").html("Eliminando");
        var data_index = parseInt($(this).attr("id").split('_')[1]) - 1;
        var data_name = localStorage.key(data_index);
        to_delete_name = data_name;
        
        var text = "¿Seguro que desea borrar el dataset: <b>" + data_name + "</b>?";
        $("#modal_content").html(text);
    });
    
    $("#confirm").click(function() {
        if(deleting){
            localStorage.removeItem(to_delete_name);
            showDataTable();
            $('#my_modal').modal('hide');
        }
        if(editing) {
            updateData();
            showDataTable();
        }
    });
    var g_data_name = "";
    $("#data_logs").on('click', '.ed', function(){
        deleting = false;
        editing = true;
        $("#confirm").removeClass().addClass("btn btn-success");
        $("#ModalLabel").html("Editando");
        var data_index = parseInt($(this).attr("id").split('_')[1]) - 1;
        var data_name = localStorage.key(data_index);
        g_data_name = data_name;
        var data_text = prepareData(localStorage[data_name]);
            
        $("#modal_content").html("<textarea></textarea>");
        $("#modal_content").find("textarea").attr("id", "data_textarea")
        
        $("#data_textarea").css("width", "100%");
        $("#data_textarea").css("height", "300px");
        $("#data_textarea").val(data_text);
    });
    
    function prepareData(data){
        data_as_string = JSON.parse(data);
        data_as_dataset = "";
        for(var i = 0; i < data_as_string.length - 1; i++){
            for(var j = 0; j < data_as_string[i].length; j++){
                data_as_dataset += data_as_string[i][j];
                if(j != data_as_string[i].length -1){
                    data_as_dataset += " ";
                }
            }
            if(i != data_as_string.length - 2){
                data_as_dataset += "\n";
            }
        }
        return data_as_dataset
    }
    
    function updateData(){
        var error = false;
        var lines = $('#data_textarea').val().split('\n');
        var n_col = 0;
        for (var i = 0; i < lines.length; i++){
            lines[i] = lines[i].split(/\s+/); // TODO: CAMBIAR SEGUN OPCION
            if (i == 0){
                n_col = lines[i].length;
            } else if (lines[i].length != n_col){
                showErrorNotif(2, i+1);
                error = true;
                break;
            }
            for (var j = 0; j < lines[i].length; j++){
                lines[i][j] = parseFloat(lines[i][j]);
                if(isNaN(lines[i][j])){
                    showErrorNotif(1, i+1);
                    error = true;
                    break;
                }
            }
            if(error) break;
        }
        var data = lines; data.push(new Date().toLocaleString());
        var data_name = g_data_name;

        if(!error){
            localStorage.setItem(data_name, JSON.stringify(data));
            showSuccessNotif();
        }
    }
        
    function showSuccessNotif(){
        var log_error = $("#notif");
        log_error.removeClass().addClass("alert alert-success");
        log_error.html('<strong>Feed: </strong>Data creada con éxito');
        log_error.fadeIn(300).delay(1000).fadeOut(300, function(){
            $('#my_modal').modal('hide');
        });
    };

    function showErrorNotif(type, arg=0){
        var log_error = $("#notif");
        if (type == 1) {
            log_error.removeClass().addClass("alert alert-danger");
            log_error.html('<strong>Error-Fila:' + arg + ': </strong>Valor no numérico presente en dataset');
            log_error.fadeIn(300).delay(2500).fadeOut(300);
        } else if (type == 2){
            log_error.removeClass().addClass("alert alert-danger");
            log_error.html('<strong>Error-Fila:' + arg + ' </strong>Número de columnas no coincide con la primera');
            log_error.fadeIn(300).delay(2500).fadeOut(300);
        }
    };
});
