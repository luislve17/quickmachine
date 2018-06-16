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
			<td><button class='btn btn-warning adj' id='adjust_" + (parseFloat(i)+1) + "'><i class='far fa-chart-bar'></i></button></td>\
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

	$("#data_logs").on('click', '.adj', function(){		
		var data_index = parseFloat($(this).attr('id').split('_')[1]) - 1;
		var data_name = localStorage.key(data_index);
		
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
			var regression_result = linear_regression(numeric_data, l_rate, eps, 100000);
			// Mostrando grafica
			showGraph(numeric_data, regression_result['reg']);

			// Actualizando datos
			$("#data_title").html(data_name);
			$("#reg_desc").find("ul").html("<li>Ecuación: <b>"+ regression_result['theta'][0] + "</b> + <b>" + regression_result['theta'][1] + "</b>x" + "</li>\
			<li>&#8710J: " + regression_result['DJ'] +"</li>\
			<li>Iteraciones usadas: "+ regression_result['iter'] +"</li>\
			<li>Ratio de aprendizaje: "+ l_rate +"</li>\
			<li>Epsilon de margen: "+ eps +"</li>");
		}
	});

	// En caso se necesite probar data
	function data_gen(){
		var data = [];
		for(var i = 0; i < 100; i++){
			data.push([i, 3.5*i + 12.5 + 50*Math.pow(-1,  Math.floor(Math.random()*10))*Math.random()]);
		}
		return data;
	}


	function J_linear(theta, data){
		var acc = 0;
		for(var i = 0; i < data.length; i++){
			acc += Math.pow(theta[0] + theta[1]*data[i][0] - data[i][1], 2);
		}
		return acc/(2*data.length);
	}

	function getLimits(data){
		var x_min = data[0][0];
		var x_max = data[0][0];
		for (var i = 0; i < data.length; i++){
			if(data[i][0] > x_max){
				x_max = data[i][0];
			}
			if(data[i][0] < x_min){
				x_min = data[i][0];
			}
		}
		return ([x_min, x_max]);
	}
	
	function linear_regression(data, learning_rate, eps, max_iter){
		var dJdtheta_0 = 0;
		var dJdtheta_1 = 0;
		var theta_0 = Math.random();
		var theta_1 = Math.random();

		var J = J_linear([theta_0, theta_1], data);
		var J_old = -1e10

		var n = data.length;
		var cont = 0;

		while ((Math.abs(J-J_old) > eps)&&(cont < max_iter)){
			dJdtheta_0 = 0;
			dJdtheta_1 = 0;
			for(var i = 0; i < n; i++){
				dJdtheta_0 += theta_0 + theta_1*data[i][0] - data[i][1];
				dJdtheta_1 += (theta_0 + theta_1*data[i][0] - data[i][1])*data[i][0];
			}
			Stheta_0 = dJdtheta_0/n;
			Stheta_1 = dJdtheta_1/n;

			theta_0 -= learning_rate*Stheta_0;
			theta_1 -= learning_rate*Stheta_1;

			J_old = J;
			J = J_linear([theta_0, theta_1], data);
			cont++;
		}

		var limits = getLimits(data)
		limits[0] -= 10;
		limits[1] += 10;

		return {
			'DJ': Math.abs(J-J_old),
			'iter': cont,
			'theta': [theta_0, theta_1],
			'reg': [limits[0], theta_0 + theta_1*limits[0], limits[1], theta_0 + theta_1*limits[1]]
		};
	};

    function showErrorNotif(){
        var log_error = $("#diff_notif");
		log_error.removeClass().addClass("alert alert-danger");
		log_error.html('<strong>Error: </strong>Dataset presenta número de columnas diferente a 2');
		log_error.fadeIn(300).delay(2500).fadeOut(300);
	};

	function showGraph(scatter_data, lr_data){
		var points_data = [];
		for (var i = 0; i < scatter_data.length; i++){
			points_data.push({x: scatter_data[i][0], y: scatter_data[i][1]});
		}

		var line_data = [{x: lr_data[0], y: lr_data[1]},{x: lr_data[2], y: lr_data[3]}]

		var ctx = document.getElementById("myChart");
		var myChart = new Chart.Scatter(ctx, {
			data: {
				datasets: [{
					type: 'scatter',
					data: points_data,
					label: "Dispersion",
					pointBackgroundColor: "#3e95cd",
					showLine: false
				},{
					type: 'line',
					data: line_data,
					label: "Ajuste lineal",
					pointBackgroundColor: "#2e27ea",
					showLine: true,
					cubicInterpolationMode: "monotone"
				}],
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
});