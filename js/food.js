$(function() {
  var apikey = "85a5878b10587b2836bf5e7a232506d9";
  var url= "https://api.uwaterloo.ca/v2/foodservices/menu.xml?key="+apikey;

  build = function(elArray) {
    var locations = document.getElementById("locations");
    for(var i=0; i<elArray.length; i++){
      locations.appendChild(elArray[i]);
    }
  }

  updateList = function(url) {
    var elems = [];

    $.get(url, function(data) {
      $(data).find("outlet_name").each(function() {
        var locationLi = document.createElement('li');
        var location = $(this);
        locationLi.innerHTML = location.text();
        var dayUl = document.createElement('ul');
        location.siblings().find("day").each(function() {
          var dayLi = document.createElement('li');
          var day = $(this);
          dayLi.innerHTML = day.text();

          var mealUl = document.createElement('ul');
          var mealLi = document.createElement('li');
          var mealString = "<p>Lunch</p>";
          day.siblings().find("lunch").find("item").each(function() {
            var lunch = $(this);
            var diet_type = lunch.find("diet_type").text() ? " (" + lunch.find("diet_type").text() + ")" : "";
            mealString += lunch.find("product_name").text().replace(/,\s*$/, "") + diet_type +"<br />";
          });

          mealString += "<p>Dinner</p>";
          day.siblings().find("dinner").find("item").each(function() {
            var dinner = $(this);
            var diet_type = dinner.find("diet_type").text() ? " (" + dinner.find("diet_type").text() + ")" : "";
            mealString += dinner.find("product_name").text().replace(/,\s*$/, "") + diet_type +"<br />";
          });
          mealLi.innerHTML = mealString;

          mealUl.appendChild(mealLi);
          dayLi.appendChild(mealUl);
          dayUl.appendChild(dayLi);
        });
        locationLi.appendChild(dayUl);
        elems.push(locationLi);
      });
      build(elems);
    });
  };

  updateList(url);
});
