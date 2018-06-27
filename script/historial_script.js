$('document').ready(function(){
	showLogTable();

	function showLogTable(){
		$("#data_logs").html("");

		obtener_logs();
	}

	function obtener_logs(){
		$.ajax({
			type: "GET",
			url: "get_logs.php",
			data: {
				user_name: current_username
			},
			success: function(result){				
				updateTable(JSON.parse(result));
			},
		});
	}

	function updateTable(data){
		for(var i = 0; i < data.length; i++){
			$("#data_logs").append("<tr>\
			<th scope='row'>"+ data[i][0] +"</th>\
			<td>"+data[i][1]+"</td>\
			<td>"+data[i][2]+"</td>\
			<td>"+data[i][3]+"</td>\
			<td><button class='btn btn-info log_display' id='" + data[i][2] + "_log_" + data[i][0] + "'><i class='fas fa-eye'></i></button></td>\
			</tr>");
		}
	}

	$("#data_logs").on('click', '.log_display', function(){
		var log = $(this).attr("id").split("_");
		var log_id = log[2];
		var log_table;

		if (log[0] == 'Regresion Lineal'){
			log_table = "log_linreg";
		} else if (log[0] == 'Clustering'){
			log_table = "log_clustering";
		}

		$.ajax({
			type: "GET",
			url: "get_data.php",
			data: {
				id: log_id,
				table: log_table
			},
			success: function(result){
				updateModal(JSON.parse(result)[0], log_table);
			},
		});

		$("#logModal").modal();
	})

	function updateModal(data, table){
		$("#ModalTitle").html(data[0]);
		if(table == "log_linreg"){
			$("#modal_content").html("<ul>\
				<li>Ecuación: f(x) = <b>"+data[1]+"</b> + <b>"+ data[2] + "</b>x</li>\
				<li>&Delta;J : "+data[3]+"</li>\
				<li>Cant. de iteraciones : "+data[4]+"</li>\
				<li>Ratio de aprendizaje : "+data[5]+"</li>\
				<li>Epsilon de margen: : "+data[6]+"</li>\
				</ul>")
		} else if(table == "log_clustering"){
			$("#modal_content").html("<ul>\
				<li>Cantidad de clusters: "+data[1] +"</li>\
				<li>Cantidad de datos: "+data[2] +"</li>\
				<li>Numero de iteraciones: "+data[3] +"</li>\
				</ul>")
		}
	}
});