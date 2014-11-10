function updateClock(){
	var time = moment().format('h:mm a');
	var date = moment().format('dddd MMM Do');
	$('#time').text(time);
	$('#date').text(date);

	setTimeout(updateClock,1000);
}

updateClock();