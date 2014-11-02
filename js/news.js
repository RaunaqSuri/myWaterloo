$(function(){
	var url = "http://kitchener.ctvnews.ca/rss/ctv-news-kitchener-1.822359";

	build = function(elArray) {
		var list = document.getElementById("newsList");
		for(var i=0; i < elArray.length; i++){
			list.appendChild(elArray[i]);
		}
	};

	updateList = function(url) {
		var elems = []; // New array to store DOM elements

		$.get(url, function (data) {
     		//Feed in articles and information
 			$(data).find("item").each(function () {
				var listElem = document.createElement('li'),
			 		link = document.createElement('a'),
			 		el = $(this);

			 	link.innerHTML = el.find('title').text();
			 	link.setAttribute('href', el.find('link').text());
			 	link.setAttribute('target', '_blank');

			 	listElem.appendChild(link);

    			elems.push(listElem);
     		});

 			build(elems);
		});
	};

	updateList(url);
});