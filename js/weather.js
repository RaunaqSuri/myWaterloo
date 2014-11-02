$(function(){
	var daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
		WATERLOO_CITY_ID = "6176823",
		ZERO_DEGREES_IN_KELVIN = 273.15,
		apiKey = "59bb6038bacbe0e8823e4503bded4bb6",
		weatherUrl = "http://api.openweathermap.org/data/2.5/weather?id="+WATERLOO_CITY_ID;

	//Gets the weather
	$.getJSON(weatherUrl, function(data){
		//Weather data
		var desc = data.weather[0].main,
			iconSrc = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
			temp = Math.round(data.main.temp - ZERO_DEGREES_IN_KELVIN);
		//checks to see if weather is zero. Odd case
		if(temp == '-0'){
			temp = 0;
		}

		$('#temp').text(desc + '  ' + temp + '\u00B0C');
	});

	//Gets the forecast for the next 3 days
	var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + WATERLOO_CITY_ID;
	$.getJSON(forecastUrl, function(data){

		for(var i = 0; i < 3; i++){

			var temp = Math.round(data.list[i].temp.day - ZERO_DEGREES_IN_KELVIN);
			if(temp == '-0'){
				temp = 0;
			}

			var targetText,
				targetIco,
				iconSrc = "http://openweathermap.org/img/w/"+ data.list[i].weather[0].icon + ".png",
				desc = data.list[i].weather[0].main,
				day = daysOfWeek[moment.unix(data.list[i].dt).weekday()];

			if( i == 0 ) {
				targetText = $('#one p');
				targetIco = $('#one img');
			}
			else if( i == 1 ) {
				targetText = $('#two p');
				targetIco = $('#two img');
			}
			else if( i == 2 ) {
				targetText = $('#three p');
				targetIco = $('#three img');
			}

			targetIco.attr('src', iconSrc);
			targetText.text(day + '  ' + temp + '\u00B0C');
		}


	})

});
