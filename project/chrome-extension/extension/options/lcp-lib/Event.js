// Learning Context JavaScript Library
// Developed by Mahdi Saber
// Inspired by Hendrik Thüs

function Event($action, $created_at, $platform, $type, $minor, $session)
{
    $session = typeof $session !== 'undefined' ? $session : "";

    this.action = $action;
    this.created_at = $created_at;
    this.platform = $platform;
    this.type = $type;
    this.minor = $minor;
    this.session = $session;
    this.entities = [];
    this.interests = [];
}

Event.prototype.getAction = function()
{
    return this.action;
};

Event.prototype.setAction = function ($action)
{
    this.action = $action;
};

Event.prototype.getCreatedAt = function()
{
    return this.created_at;
};

Event.prototype.setCreatedAt = function($created_at)
{
    this.created_at=$created_at;
};

Event.prototype.getPlatform = function()
{
    return this.platform;
};

Event.prototype.setPlatform = function($platform)
{
    this.platform=$platform;
};

Event.prototype.getType = function()
{
    return this.type;
};

Event.prototype.setType = function($type)
{
    this.type = $type;
};

Event.prototype.getMinor = function()
{
    return this.minor;
};

Event.prototype.setMinor = function($minor)
{
    this.minor = $minor;
};

Event.prototype.getSession = function()
{
    return this.session;
};

Event.prototype.setSession = function($session)
{
    this.session = $session;
};

Event.prototype.getEntities = function()
{
    return this.entities;
};

Event.prototype.addEntity = function($entity)
{
    this.entities.push($entity);
};

Event.prototype.getInterests = function()
{
    return this.interests;
};

Event.prototype.addInterest = function($interest)
{
    this.interests.push($interest);
};

Event.prototype.toJson = function()
{
    $entities_str="";
    for(var i=0;i<this.entities.length;i++)
    {
        $entities_str=$entities_str+'{"key":"'+this.entities[i].getKey()+'","value":"'+this.entities[i].getValue()+'"}';
        if(i<this.entities.length-1)
        {
            $entities_str=$entities_str+",";
        }
    }

    $interests_str="";
    for(var i=0;i<this.interests.length;i++)
    {
        $interests_str=$interests_str+'"'+this.interests[i]+'"';
        if(i<this.interests.length-1)
        {
            $interests_str=$interests_str+",";
        }
    }

    var $res = '{"action":"'+this.getAction()+'","session":"'+this.getSession()+'","created_at":"'+this.getCreatedAt()+'","platform":"'+this.getPlatform()+'","category":{"type":"'+this.getType()+'","minor":"'+this.getMinor()+'"},"entities":['+$entities_str+'],"interests":['+$interests_str+']}';
    return $res;

};