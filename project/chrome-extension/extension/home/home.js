document.addEventListener('DOMContentLoaded', function() {
var homeButtonId = document.getElementById('homeButtonId');
homeButtonId.addEventListener('click', function(){
	var version = "4";
	var username = localStorage["userName"];
	var password = localStorage["userPassword"];
	var appId = "58";
	var appSecret = "5vzgj870p5rizch61j89vro6if8yexl6pj11ckphzi4pkb86x5";
	var callbackURL = "";
	var refreshToken = "1";
  var lc = new LearningContext("http://api.learning-context.de",
    version,
    appId, 
    appSecret,
	callbackURL,
	refreshToken
    );
		
	var topic = document.getElementById("topic");
	var data = document.getElementById("data");
	var rate = rating.children[rating.selectedIndex].value;
	
	alert("Username: " + username + " Password: " + password + " Topic: " + topic + " Data: " + data + " Rating: " + rate);
	
	//TODO: GET URL AND ANALYZE CONTENT
	//ALSO: Give Topic Suggestion
	
	var result = lc.get("events", '{"model":"COMPLETE"}');
	console.log(result);
	
	var event = new Event("START", "2015-10-15 12:12:12", "WEBBASED", "PRIVATE", "LECTURE");
	var entity1 = new Entity(topic);
	var entity2 = new Entity(data);
	var entity3 = new Entity(rate);
	event.addEntity(entity1);
	event.addEntity(entity2);
	event.addEntity(entity3);
	
	var json = "[" + event.toJson() + "]";
	console.log(lc.post("events", json));
	});	
});