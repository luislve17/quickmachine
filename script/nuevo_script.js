$('document').ready(function(){
    $('#cancelar').css('display', 'none');

    var sep_espace = $('#space');
    var sep_comma = $('#comma');

    $('#space').prop('checked', true);

    $('.form-check-input').on('click', function(){
        $('.form-check-input').each(function(){
            $(this).prop('checked', false);
        });
        $(this).prop('checked', true);
    });

    $("textarea").keydown(function(e){
        if(e.keyCode === 9){
            // TODO: Ignore tabs
        }
    });

    var desh_state = false;
    $('#deshechar').click(function(){
        if(!desh_state){
            $("#cancelar").css('display', 'inline');
            $(this).html("¿Seguro?");
            desh_state = true;
        } else {
            $("#cancelar").css('display', 'none');
            $(this).html("<i class='far fa-trash-alt'></i> Deshechar");
            $("#data_input").val("");
            desh_state = false;
        }
    });

    $("#cancelar").click(function(){
        $(this).css('display', 'none');
        $("#deshechar").html("<i class='far fa-trash-alt'></i> Deshechar");
        desh_state = false;
    });

    $("#guardar").click(function(){
        var error = false;
        var lines = $('textarea').val().split('\n');
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
        var data_name = $("#current_name").text();

        if(!error){
            localStorage.setItem(data_name, JSON.stringify(data));
            showSuccessNotif();
        }
    });

    function showSuccessNotif(){
        var log_error = $("#notif");
        log_error.removeClass().addClass("alert alert-success");
        log_error.html('<strong>Feed: </strong>Data creada con éxito');
        log_error.fadeIn(300).delay(2500).fadeOut(300);
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

    var current_title = "sin titulo*";
    var edit_mode = false;
    $("#edit_name").click(function(){
        if(!edit_mode){
            $("#input_name").attr("value", $("#current_name").text());
            $("#current_name").css('display', 'none');
            $("#input_name").css('display', 'inline');
            $("#input_name").select();
            edit_mode = true;
        } else {
            $("#current_name").text($("#input_name").val());
            $("#current_name").css('display', 'inline');
            $("#input_name").css('display', 'none');
            edit_mode = false;
        }
    });

    $("#input_name").keydown(function(e){
        if(e.keyCode === 13){
            $("#current_name").text($("#input_name").val());
            $("#current_name").css('display', 'inline');
            $("#input_name").css('display', 'none');
            edit_mode = false;
        }
    });

    $("#input_name").focusout(function(){
        $("#current_name").text($("#input_name").val());
        $("#current_name").css('display', 'inline');
        $("#input_name").css('display', 'none');
        edit_mode = false;
    })
});
