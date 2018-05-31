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
        for(var i = 0; i < localStorage.length; i++){
            var data_name = localStorage.key(i);
            var data = processLocalData(data_name);
                var data_values = data.values;
                var data_date = data.date;

            $("#data_logs").append("<tr>\
            <th scope='row'>"+ (parseFloat(i)+1) +"</th>\
            <td>"+data_name+"</td>\
            <td>"+data_date+"</td>\
            <td><button class='btn btn-info' id='editar'><i class='far fa-edit'></i></button>\
            <button class='btn btn-dark' id='eliminar'><i class='far fa-times-circle'></i></button></td>\
            </tr>");
        }
    }
    //$(".test").html(localStorage.getItem("test"));
});
