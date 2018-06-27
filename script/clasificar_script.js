$(document).ready(function(){
	showDataTable();

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
			<td><button class='btn btn-warning adj' id='adjust_" + (parseFloat(i)+1) + "'><i class='far fa-object-group'></i></button></td>\
			</tr>");
		}
	}

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

	var g_cluster_result;
	var g_dn;

	$("#data_logs").on('click', '.adj', function(){		
		var data_index = parseFloat($(this).attr('id').split('_')[1]) - 1;
		var data_name = localStorage.key(data_index);
		g_dn = data_name;
		
		var numeric_data = [];		
		var data = JSON.parse(localStorage.getItem(data_name));
		for(var i = 0; i < data.length - 1; i++){
			numeric_data.push(data[i])
		}

		if(numeric_data[0].length != 2){
			showErrorNotif();
		} else {
			$("#table_body").fadeToggle(200).delay(100);
			$("#graph_body").fadeToggle(200);
			
			// Calculando regresion
			var l_rate = 0.0005
			var eps = 0.0001
			var clust_result = clustering(numeric_data, 4);
			g_cluster_result = clust_result;
			// Mostrando grafica
			//showGraph(numeric_data, class_result['clusters']);

			// Actualizando datos
			
			$("#data_title").html(data_name);
			$("#reg_desc").find("ul").html("<li>Cant. de clústeres: <b>"+ clust_result['k'] + "</b></li>\
			<li>Cant. datos: " + clust_result['cant'] +"</li>\
			<li>Iteraciones usadas: "+ clust_result['iter'] +"</li>");
		}
	});

	function getLimits(data){
		var x_min = data[0][0];
		var x_max = data[0][0];

		var y_min = data[0][1];
		var y_max = data[0][1];
		for (var i = 0; i < data.length; i++){
			if(data[i][0] > x_max){
				x_max = data[i][0];
			}
			if(data[i][0] < x_min){
				x_min = data[i][0];
			}
			if(data[i][1] > y_max){
				y_max = data[i][1];
			}
			if(data[i][1] < y_min){
				y_min = data[i][1];
			}
		}
		return {
			'min': [x_min, y_min],
			'max': [x_max, y_max]
		};
	}

	function getRandomColor() {
		var letters = '0123456789abcdef';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function init_centroids(data, k){
		var centroids = [];
		limits = getLimits(data);
		for(var i = 0; i < k; i++){
			centroids.push({
				'id': i,
				'x': (limits['max'][0] - limits['min'][0])*Math.random()/2,
				'y': (limits['max'][1] - limits['min'][1])*Math.random()/2,
				'color': getRandomColor()
			});
		}		
		return centroids;
	}

	function init_dataframe(data){
		var dataframe = [];
		for(var i = 0; i < data.length; i++){
			dataframe.push({
				'x': data[i][0],
				'y': data[i][1],
				'cluster': -1
			});
		}
		return dataframe;
	}

	function get_distance(p1, p2){
		var sqr_x_distance = Math.pow(p1['x'] - p2['x'], 2)
		var sqr_y_distance = Math.pow(p1['y'] - p2['y'], 2)
		return (Math.sqrt(sqr_x_distance + sqr_y_distance))
	}

	function get_nearest_centroid(centroids, data_i){
		var id_result = 0
		var min_distance = get_distance(centroids[0], data_i);

		for(var i = 0; i < centroids.length; i++){
			temp_distance = get_distance(centroids[i], data_i)

			if(temp_distance < min_distance){
				id_result = i;
			}
		} 
		return id_result;
	}

	function dataframe_changed(old_df, df, c){
		for(var i = 0; i < df.length; i++){
			if(old_df[i]['cluster'] != df[i]['cluster']){
					return true;
			}
		}
		if (c < Math.floor(Math.random() * 1520) + 1112 ){
			return true; 
		} else {
			return false;
		}
	}

	function copy_df(df){
		var new_df = [];
		for (var i = 0; i < df.length; i++){
			new_df.push(df[i]);
		}
		return new_df;
	}

	function clustering(data, k){
		var cont = 0;
		var centroids = init_centroids(data, k);		
		var dataframe = init_dataframe(data);

		do{
			cont++;
			var old_dataframe = copy_df(dataframe);
			var x_mean_array = []
			var y_mean_array = []
			var counter_array = []
			for(var i = 0; i  < centroids.length; i++){
				x_mean_array.push(0);
				y_mean_array.push(0);
				counter_array.push(0);
			}

			for(var i = 0; i < dataframe.length; i++){
				var selected_centroid = get_nearest_centroid(centroids, dataframe[i]);
				dataframe[i]['cluster'] = selected_centroid;

				x_mean_array[selected_centroid] += dataframe[i]['x'];
				y_mean_array[selected_centroid] += dataframe[i]['y'];
				counter_array[selected_centroid] += 1
			}

			for(var i = 0; i < centroids.length; i++){
				if(counter_array[i] != 0){
					centroids[i]['x'] = x_mean_array[i]/counter_array[i];
					centroids[i]['y'] = y_mean_array[i]/counter_array[i];
				}
			}
		}while(dataframe_changed(old_dataframe, dataframe, cont));
		showGraph(dataframe, centroids);
		return {
			'k': centroids.length,
			'cant': dataframe.length,
			'iter': cont
		};
	}

	function showGraph(scatter_data, centroids){
		var plot_datsets = []
		
		var centroids_data = [];
		for (var i = 0; i < centroids.length; i++){			
			centroids_data.push({x: centroids[i]['x'], y: centroids[i]['y']})
		}

		plot_datsets.push({
			type: 'scatter',
			data: centroids_data,
			label: "Centroides",
			pointBackgroundColor: "#000000",
			showLine: false
		});

		df_data = [];
		for(var i = 0; i < centroids.length; i++){
			df_data.push([]);
		}		

		for (var i = 0; i < scatter_data.length; i++){			
			df_data[scatter_data[i]['cluster']].push({x: scatter_data[i]['x'], y: scatter_data[i]['y']});
		}

		for(var i = 0; i < centroids.length; i++){
			plot_datsets.push({
				type: 'scatter',
				data: df_data[i],
				label: "Cluster " + i.toString(),
				pointBackgroundColor: centroids[i]['color'],
				//showLine: false
			});
		}

		var ctx = document.getElementById("myChart");
		var myChart = new Chart.Scatter(ctx, {
			data: {
				datasets: plot_datsets,
				options : {
					bezierCurve : false
				}
			},
		});
	};

	$("#back").click(function(){
		$("#graph_body").fadeToggle(200).delay(100);
		$("#table_body").fadeToggle(200);
	});

	var g_user_id;

	$("#register").click(function(){
		c_clusters = g_cluster_result['k'];
		c_datos = g_cluster_result['cant'];
		n_iter = g_cluster_result['iter'];
		
		registrar_clustering(current_username, g_dn, c_clusters, c_datos, n_iter);
	});

	function registrar_clustering(usr_name, d_name, c_clusters, c_datos, n_iter){
		$.ajax({
			type: "POST",
			url: "registrar_clust.php",
			data: {
				user_name: usr_name,
				data_name: d_name,
				cant_clusters: c_clusters,
				cant_datos: c_datos,
				num_iter: n_iter,
			},
			success: function(result){
				if (result == 1){
					showSuccessNotif();
				}
			}
		});
	}

	function showSuccessNotif() {
		var log_error = $("#adj_diff_notif");
		log_error.removeClass().addClass("alert alert-success");
		log_error.html('<strong>Feedback: </strong>Data de ajuste registrada exitosamente');
		log_error.fadeIn(300).delay(2500).fadeOut(300);
	}

	function showErrorNotif(){
        var log_error = $("#adj_diff_notif");
		log_error.removeClass().addClass("alert alert-danger");
		log_error.html('<strong>Error: </strong>Dataset presenta número de columnas diferente a 2');
		log_error.fadeIn(300).delay(2500).fadeOut(300);
	};
});