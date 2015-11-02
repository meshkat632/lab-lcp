window.onload = function(){
	var version = "4";
	var appId = "58";
	var appSecret = "5vzgj870p5rizch61j89vro6if8yexl6pj11ckphzi4pkb86x5";
	var callbackURL = chrome.extension.getURL("options/redirect.html");	
	var refreshToken = "1";

	//refreshToken = "e589f7461cb230335d08bedb7ebb23825634afcd";
	
	localStorage["version"] = version;
	localStorage["appId"] = appId;
	localStorage["appSecret"] = appSecret;
	localStorage["callbackURL"] = callbackURL;
	localStorage["refreshToken"] = refreshToken;

  var lc = new LearningContext("http://api.learning-context.de",
    version,
    appId, 
    appSecret,
	callbackURL,
	refreshToken
    );

	localStorage["lc"] = lc;	
	
	var result = lc.get("events", '{"model":"COMPLETE"}');
	console.log(result);
}


