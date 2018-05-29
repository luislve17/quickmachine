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
        var nan_error = false;
        var lines = $('textarea').val().split('\n');
        for (var i = 0; i < lines.length; i++){
            lines[i] = lines[i].split(/\s+/);
            for (var j = 0; j < lines[i].length; j++){
                lines[i][j] = parseFloat(lines[i][j]);
                if(isNaN(lines[i][j])){
                    alert("Error. Valor no numérico presente en data");
                    nan_error = true;
                    break;
                }
            }
            if(nan_error) break;
        }
        var data = lines;
        var data_name = $("#current_name").text();

        localStorage.setItem(data_name, JSON.stringify(data));
        console.log(localStorage);
    });

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
});
