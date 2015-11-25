window.onload = function(){
	//alert("Page is loaded"); DEBUG LINE - Test if this page is completely loaded
	var s = window.location.search.substring(1).split('&');
	if(!s.length) return;
	window.$_GET = {};
	for(var i  = 0; i < s.length; i++) {
		var parts = s[i].split('=');
		window.$_GET[unescape(parts[0])] = unescape(parts[1]);
	}
	var refreshToken = parts[1];
	window.parent.onNewRefreshToken(refreshToken);
	//alert(parts); Parts contains: refreshToken
	//localStorage["refreshToken"] = parts[1];
	console.log('new refreshToken',refreshToken);

	var version = "4";
	var appId = "58";
	var appSecret = "5vzgj870p5rizch61j89vro6if8yexl6pj11ckphzi4pkb86x5";
	var callbackURL = chrome.extension.getURL("options/redirect-new.html");
	var lc = new LearningContext("http://api.learning-context.de",
		version,
		appId,
		appSecret,
		callbackURL,
		refreshToken
	);
	window.parent.onLc(lc);
	$('#logoutbutton').on('click', function(){
		window.parent.logout();
	});
	/*

	var result1 = lc.get("user", '{"model":"COMPLETE"}');
	console.log('result1',result1);
	if(result1){
		$('#message').text("You are already logged in. To login as different user please press 'Logout'");
		window.parent.onLc(lc);
	}
	*/



	/*
	var lc = localStorage["lc"];
	document.getElementById('usernameTextField').value = lc.value;
	*/
}

/*
document.addEventListener('DOMContentLoaded', function() {
	var homeButtonId = document.getElementById('buttonId');
		homeButtonId.addEventListener('click', function(){
			chrome.tabs.getCurrent(function(tab) {
				chrome.tabs.remove(tab.id, function() { });
			});	
	});
});
	*/