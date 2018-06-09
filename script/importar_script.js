$('document').ready(function(){
    function cargarData(e){
        $("#data_file").each(function() {
            var file_element = $(this);
            var file = this.files[0];
            if (!file) {
              return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var contents = e.target.result;
                //console.log(contents);
                formatearData(contents, file.name);
            };
            reader.readAsText(file);
        });
    }

    document.getElementById('submit').addEventListener('click', cargarData, false);

    function formatearData(data, name){
        var error = false;
        var lines = data.split('\n');

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
        var data_name = name;

        if(!error){
            localStorage.setItem(data_name, JSON.stringify(data));
            showSuccessNotif();
        }
    }

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
});
