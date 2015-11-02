window.onload = function(){
	//alert("Page is loaded"); DEBUG LINE - Test if this page is completely loaded
	var s = window.location.search.substring(1).split('&');
	if(!s.length) return;
	window.$_GET = {};
	for(var i  = 0; i < s.length; i++) {
		var parts = s[i].split('=');
		window.$_GET[unescape(parts[0])] = unescape(parts[1]);
	}
	//alert(parts); Parts contains the refreshToken
	localStorage["refreshToken"] = parts;
	var lc = localStorage["lc"];
	document.getElementById('usernameTextField').value = lc.value;
}

document.addEventListener('DOMContentLoaded', function() {
	var homeButtonId = document.getElementById('buttonId');
		homeButtonId.addEventListener('click', function(){
			chrome.tabs.getCurrent(function(tab) {
				chrome.tabs.remove(tab.id, function() { });
			});	
	});
});