$(function(){
	var nodeList;
	if(JSON.parse(localStorage.getItem("todoTasks"))) {
		nodeList = JSON.parse(localStorage.getItem("todoTasks"));
		document.getElementById('taskList').appendChild(nodeList);
	} else {
		nodeList = [];
		localStorage.setItem("todoTasks", JSON.stringify(nodeList));
		console.log(nodeList);
		console.log(typeof nodeList);`
	}

	$('#button').on('click', function(){
	    var input = document.getElementById('input').value,
	    	task=document.createElement("li"),
	    	textnode=document.createTextNode(input);

	    task.appendChild(textnode);
	    document.getElementById('taskList').appendChild(task);
	    var nodeList = document.getElementById('taskList');
	    localStorage.setItem("todoTasks", JSON.stringify(nodeList));
	});

});