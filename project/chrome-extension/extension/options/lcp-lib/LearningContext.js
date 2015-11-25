// Learning Context JavaScript Library
// Developed by Alexander Kölsch
// Inspired by Hendrik Thüs

// Constructor, requires the information about the API, the credentials of a certain user
// and information about the application
function LearningContext($api_url, $api_version, $app_id, $app_secret, $app_url, $refresh_token)
{
	if ($api_url.substr(-1) === "/")
    {
        this.api_url=$api_url;
    }
    else
    {
        this.api_url=$api_url+"/";
    }
    this.api_version = $api_version;
    this.app_id = $app_id;
    this.app_secret = $app_secret;
	this.app_url = $app_url;
	this.tm = new TokenManager($refresh_token, this.app_id, this.app_url, this.app_secret);
}

// Returns the saved refresh token
LearningContext.prototype.get_refresh_token = function()
{
    return this.tm.get_refresh_token();
};

// Function that has to be called if you want to send a GET request.
LearningContext.prototype.get = function($interface,$data) {
    var cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
    var res = cd.get($interface,$data);
	switch (res['statuscode']) {
		case 200: //Request successful
			return res['content'];
			break;
		case 203: //Scopes changed
			return res['content'];
			break;
		case 401: //access token expired
			if(this.tm.access_token_refresh()!=0) {
				cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
				res = cd.get($interface,$data);
				if(res['statuscode']!=401) {
					return res['content'];
					break;
				}
			}
			return '{"result":0,"reason":"Unauthorized: access token expired"}';
			break;
		case 403: //Wrong data
			return res['content'];
			break;
		default:
			return res['content'];
			break;	
	}
};

// Function that has to be called if you want to send a POST request.
LearningContext.prototype.post= function($interface,$data) {
    var cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
    var res = cd.post($interface,$data);
	switch (res['statuscode']) {
		case 200: //Request successful
			return res['content'];
			break;
		case 203: //Scopes changed
			return res['content'];
			break;
		case 401: //access token expired
			if(this.tm.access_token_refresh()==1) {
				cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
				res = cd.post($interface,$data);
				if(res['statuscode']!=401) {
					return res['content'];
					break;
				}
			}
			return '{"result":0,"reason":"Unauthorized: access token expired"}';
			break;
		case 403: //Wrong data
			return res['content'];
			break;
		default:
			return res['content'];
			break;	
	}
};

// Function that has to be called if you want to send a PUT request.
LearningContext.prototype.put= function($interface,$data) {
    var cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
    var res = cd.put($interface,$data);
	switch (res['statuscode']) {
		case 200: //Request successful
			return res['content'];
			break;
		case 203: //Scopes changed
			return res['content'];
			break;
		case 401: //access token expired
			if(this.tm.access_token_refresh()==1) {
				cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
				res = cd.put($interface,$data);
				if(res['statuscode']!=401) {
					return res['content'];
					break;
				}
			}
			return '{"result":0,"reason":"Unauthorized: access token expired"}';
			break;
		case 403: //Wrong data
			return res['content'];
			break;
		default:
			return res['content'];
			break;	
	}
};

// Function that has to be called if you want to send a DELETE request.
LearningContext.prototype.delete= function($interface,$data) {
    var cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
    var res = cd.delete($interface,$data);
	switch (res['statuscode']) {
		case 200: //Request successful
			return res['content'];
			break;
		case 203: //Scopes changed
			return res['content'];
			break;
		case 401: //access token expired
			if(this.tm.access_token_refresh()==1) {
				cd = new ContextData(this.api_url, this.api_version, this.tm.get_access_token(), this.app_id, this.app_secret);
				res = cd.delete($interface,$data);
				if(res['statuscode']!=401) {
					return res['content'];
					break;
				}
			}
			return '{"result":0,"reason":"Unauthorized: access token expired"}';
			break;
		case 403: //Wrong data
			return res['content'];
			break;
		default:
			return res['content'];
			break;	
	}
};

