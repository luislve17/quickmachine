$('document').ready(function(){
    $('#cancelar').css('display', 'none');

    var sep_espace = $('#space');
    var sep_tab = $('#tab');
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
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var value = $(this).val();

            $(this).val(value.substring(0,start) + "\t" + value.substring(end));
            $(this).selectionStart = $(this).selectionEnd = start + 1;
            e.preventDefault();
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
});
