// Learning Context JavaScript Library
// Developed by Mahdi Saber
// Inspired by Hendrik Thüs

function Entity($key,$value)
{
    this.key = $key;
    this.value = $value;
}

Entity.prototype.getKey = function()
{
    return this.key;
};

Entity.prototype.setKey = function($key)
{
    this.key = $key;
};

Entity.prototype.getValue = function()
{
    return this.value;
};

Entity.prototype.setValue = function($value)
{
    this.value = $value;
};