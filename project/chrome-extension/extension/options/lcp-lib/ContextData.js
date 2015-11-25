// Learning Context JavaScript Library
// Developed by Mahdi Saber, Alexander Kölsch
// Inspired by Hendrik Thüs

// Constructor, requires the information about the API, the credentials of a certain user
// and information about the application
function ContextData($url, $version, $token, $app_id, $app_secret) {
    if ($url.substr(-1) === "/")
    {
        this.url=$url;
    }
    else
    {
        this.url=$url+"/";
    }
    this.version = $version;
    this.token = $token;
    this.appId = $app_id;
    this.appSecret = $app_secret;
}

// Generating a random string which will be used as nonce
ContextData.prototype.genNonce = function()
{
    var $chars = '1234567890abcdefghijklmnopqrstuvwxyz';
    var $rnd_string = '';
    $num_chars = $chars.length;
    $size = mt_rand(41, 59);
    for($i=0; $i<$size; $i++) {
        $rnd_string += $chars[mt_rand(0, $num_chars - 1)];
    }
    return $rnd_string;
};



// Generating the required hash value from the data, nonce and the other information that is nearly static
ContextData.prototype.genHash = function ($data, $nonce)
{
    return CryptoJS.SHA1(phpurlencode($data)+this.appId+phpurlencode(CryptoJS.SHA1(this.token))+phpurlencode($nonce)+this.appSecret+phpurlencode(this.token)).toString();
};

// Normalizing the name of the interface, in case there is a / at the end
ContextData.prototype.normalizeInterface = function($interface)
{
    if ($interface.substr(0,1) === "/")
    {
        return $interface.substr(1);
    }
    else
    {
        return $interface;
    }
};

// Public get function to send a GET request to a certain interface
ContextData.prototype.get = function($interface,$data)
{
    var $res = "";
    $interface = this.normalizeInterface($interface);
    var $nonce = this.genNonce();
    var $hash=this.genHash($data,$nonce);

    var xhr = new XMLHttpRequest();
	xhr.open('GET',this.url+this.version+"/"+$interface+"?data="+phpurlencode($data)+"&nonce="+phpurlencode($nonce)+"&aid="+phpurlencode(this.appId)+"&token_h="+phpurlencode(CryptoJS.SHA1(this.token))+"&h="+phpurlencode($hash), false);
    xhr.onload = function()
    {
        $res = new Array()
		$res['content'] = xhr.response;
		$res['statuscode'] = xhr.status;
    }

    xhr.send();
    return $res;
};

// Public post function to send a POST request to a certain interface
ContextData.prototype.post= function($interface,$data)
{
    var $res = "";
    $interface = this.normalizeInterface($interface);
    $nonce = this.genNonce();
    $hash = this.genHash($data,$nonce);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.url+this.version+"/"+$interface,false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function()
    {
        $res = new Array()
		$res['content'] = xhr.response;
		$res['statuscode'] = xhr.status;
    }
    xhr.send("data="+phpurlencode($data)+"&nonce="+phpurlencode($nonce)+"&aid="+phpurlencode(this.appId)+"&token_h="+phpurlencode(CryptoJS.SHA1(this.token))+"&h="+phpurlencode($hash))
    return $res;
};

// Public put function to send a PUT request to a certain interface
ContextData.prototype.put= function($interface,$data)
{
    var $res = "";
    $interface = this.normalizeInterface($interface);
    $nonce = this.genNonce();
    $hash = this.genHash($data,$nonce);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", this.url+this.version+"/"+$interface,false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function()
    {
        $res = new Array()
		$res['content'] = xhr.response;
		$res['statuscode'] = xhr.status;
    }
    xhr.send("data="+phpurlencode($data)+"&nonce="+phpurlencode($nonce)+"&aid="+phpurlencode(this.appId)+"&token_h="+phpurlencode(CryptoJS.SHA1(this.token))+"&h="+phpurlencode($hash))
    return $res;
};

// Public delete function to send a DELETE request to a certain interface
ContextData.prototype.delete= function($interface,$data)
{
    var $res = "";
    $interface = this.normalizeInterface($interface);
    $nonce = this.genNonce();
    $hash = this.genHash($data,$nonce);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", this.url+this.version+"/"+$interface,false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function()
    {
        $res = new Array()
		$res['content'] = xhr.response;
		$res['statuscode'] = xhr.status;
    }
    xhr.send("data="+phpurlencode($data)+"&nonce="+phpurlencode($nonce)+"&aid="+phpurlencode(this.appId)+"&token_h="+phpurlencode(CryptoJS.SHA1(this.token))+"&h="+phpurlencode($hash))
    return $res;
};

