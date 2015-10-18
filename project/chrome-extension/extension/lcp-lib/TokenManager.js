// Learning Context JavaScript Library
// Developed by Alexander Kölsch
// Inspired by Hendrik Thüs

// Constructor, requires the information about the API, the credentials of a certain user
// and information about the application
function TokenManager($refresh_token, $app_id, $app_url, $app_secret) {
    this.app_url=$app_url;
    this.app_id = $app_id;
    this.app_secret = $app_secret;
	this.refresh_token = $refresh_token || '';
	this.access_token = '';
	this.access_token_refresh();
	
	if(this.refresh_token ==='') {
		window.location = 'http://www.learning-context.de/oauth/login?id='+this.app_id+'&url='+this.app_url+'&hash='+CryptoJS.SHA512(this.app_id+this.app_secret+this.app_url);
	}
}

// Returns the Access_Token
TokenManager.prototype.get_access_token = function() {
    return this.access_token;
};

// Returns the Access Token
TokenManager.prototype.get_refresh_token = function() {
    return this.refresh_token;
};



// Refreshes and saves the Access-Token
TokenManager.prototype.access_token_refresh = function () {


    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://www.learning-context.de/oauth/refresh_token?app_id=' + phpurlencode(this.app_id) + "&hash=" + phpurlencode(CryptoJS.SHA512(this.app_id+this.app_secret+this.refresh_token)), false);

    xhr.onload = function()
    {
        $res = new Array()
		$res['content'] = xhr.response;
		$res['statuscode'] = xhr.status;
    }

    xhr.send();
	switch($res['statuscode']) {
				case 200: //Refresh successful
					var array = JSON.parse($res["content"]);
					this.access_token = array.token;
					return 1;
				case 400: //Wrong app_id
					return 0;					
				case 401: //Refresh token expired
					window.location = 'http://www.learning-context.de/oauth/login?id='+this.app_id+'&url='+this.app_url+'&hash='+CryptoJS.SHA512(this.app_id+this.app_secret+this.app_url);
					return 0;
				default:
					return 0;
			}
};

