angular.module('controllerAsExample', [])
  .controller('myController', myController);

function myController() {
  this.user.name = "";
  this.user.password = "";
}

myController.prototype.save = function() {
  var lc = new LearningContext("http://api.learning-context.de",
    version, 
    appId, 
    appSecret,
    callbackURL,
    refreshToken);
	
	var result = lc.get("events", '{"model":"COMPLETE"}');
	console.log(result);
	
	var event = new Event("START", "2015-10-15 12:12:12", "MOBILE", "PRIVATE", "POSITION");
	var entity1 = new Entity("lng", "6.44");
	var entity2 = new Entity("lat", "50.33");
	event.addEntity(entity1);
	event.addEntity(entity2);
	
	var json = "[" + event.toJson() + "]";
	console.log(lc.post("events", json));
};