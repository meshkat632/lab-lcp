document.addEventListener('DOMContentLoaded', function() {
var buttonId = document.getElementById('buttonId');
buttonId.addEventListener('click', function(){
	var userName = document.getElementById("name");
	var userPassword = document.getElementById("password");
	
	localStorage["userName"] = userName.value;
	localStorage["userPassword"] = userPassword.value;
	
	var version = "4";
	var username = "IgorDud";
	var password = "test";
	var appId = "58";
	var appSecret = "5vzgj870p5rizch61j89vro6if8yexl6pj11ckphzi4pkb86x5";
	var callbackURL = chrome.extension.getURL("options/options.html");
	var refreshToken = "a5d5ac1ffc63cabb04aa189f800ef4d3298ae205";
	var s = window.location.search.substring(1).split('&');
	if(!s.length) return;
	window.$_GET = {};
	for(var i  = 0; i < s.length; i++) {
		var parts = s[i].split('=');
		window.$_GET[unescape(parts[0])] = unescape(parts[1]);
	}
  var lc = new LearningContext("http://api.learning-context.de",
    version,
    appId, 
    appSecret,
	callbackURL,
	refreshToken
    );
	
	var result = lc.get("events", '{"model":"COMPLETE"}');
	console.log(result);
	
	/*var event = new Event("START", "2015-10-15 12:12:12", "MOBILE", "PRIVATE", "POSITION");
	var entity1 = new Entity("lng", "6.44");
	var entity2 = new Entity("lat", "50.33");
	event.addEntity(entity1);
	event.addEntity(entity2);
	
	var json = "[" + event.toJson() + "]";
	console.log(lc.post("events", json));*/ // Send something?
	});	
});

