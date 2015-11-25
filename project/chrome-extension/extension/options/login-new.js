function logout(){
	console.log('logout:',logout);
	window.parent.logout();
}
window.onload = function(){

	     $('#logoutbutton').on('click', function(){
			 window.parent.logout();
		 });

		var refreshToken = window.parent.getOldRefreshToken();
		console.log('location:',window.location);
		console.log('refreshToken:',refreshToken);

		var version = "4";
		var appId = "58";
		var appSecret = "5vzgj870p5rizch61j89vro6if8yexl6pj11ckphzi4pkb86x5";
		//var callbackURL = "http://localhost:63342/lcp-chrome-extension/extension/options/redirect-new.html";
		//var callbackURL = "redirect-new.html";
		var callbackURL = chrome.extension.getURL("options/redirect-new.html");
		var refreshToken = refreshToken || "1";

		/*
		 //refreshToken = "e589f7461cb230335d08bedb7ebb23825634afcd";

		 localStorage["version"] = version;
		 localStorage["appId"] = appId;
		 localStorage["appSecret"] = appSecret;
		 localStorage["callbackURL"] = callbackURL;
		 localStorage["refreshToken"] = refreshToken;
		 */

		var lc = new LearningContext("http://api.learning-context.de",
			version,
			appId,
			appSecret,
			callbackURL,
			refreshToken
		);

		var result1 = lc.get("user", '{"model":"COMPLETE"}');
		console.log('result1',result1);
		if(result1){
			$('#message').text("You are already logged in. To login as different user please press 'Logout'");
			window.parent.onLc(lc);
		}

		/*
		 localStorage["lc"] = lc;

		 var result = lc.get("events", '{"model":"COMPLETE"}');
		 console.log('result', result);
		 */




	}
