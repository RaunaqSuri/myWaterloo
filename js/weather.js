$(function(){
	var daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
	var WATERLOO_CITY_ID = "6176823";
	var ZERO_DEGREES_IN_KELVIN = 273.15;
	var apiKey = "59bb6038bacbe0e8823e4503bded4bb6";
	var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?id="+WATERLOO_CITY_ID;

	//Gets the weather
	$.getJSON(weatherUrl, function(data){
		//Weather data
		var desc = data.weather[0].main;
		var iconSrc = "http://openweathermap.org/img/w/"+data.weather[0].icon;
		var temp = Math.round(data.main.temp - ZERO_DEGREES_IN_KELVIN);
		//checks to see if weather is zero. Odd case
		if(temp == '-0'){
			temp = 0;
		}

		console.log(desc);
		console.log(temp);

	});

	//Gets the forecast for the next 3 days
	var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + WATERLOO_CITY_ID;
	$.getJSON(forecastUrl, function(data){

		for(var i = 0; i < 3; i++){

			var temp = Math.round(data.list[i].temp.day - ZERO_DEGREES_IN_KELVIN);
			if(temp == '-0'){
				temp = 0;
			}

			var iconSrc = "http://openweathermap.org/img/w/"+data.list[i].weather[0].icon;
			var desc = data.list[i].weather[0].main;

			var day = daysOfWeek[moment.unix(data.list[i].dt).weekday()];
			console.log("FORECAST "+day+" "+temp);
			console.log("FORECAST "+day+" "+desc);
		}


	})

});