angular.module('myApp',[]).controller('homeController', ['$scope', '$interval','$window','$location','$timeout',function ($scope, $interval, $window,$location,$timeout) {

    chrome.extension.getBackgroundPage().getCurrentUrl(function(url, topic){
        console.log('url:',url);
        $scope.data = url;
        $scope.topic = topic;
        $scope.$apply();
    });

    /*
    $scope.$watch('topic', function(){
        chrome.extension.getBackgroundPage().setCurrentTopic($scope.topic);
    });
    */

    function getMimeType(type) {
        
        var mimeTypes = {};
        mimeTypes["PDF"] = "application/pdf";
        mimeTypes["Video"] = "media/video";
        mimeTypes["Audio"] = "media/audio";
        mimeTypes["Text"] = "text/plain";
        mimeTypes["Webpage"] = "text/html";

        return mimeTypes[type];
    }


    $scope.share = function(){

        chrome.extension.getBackgroundPage().setCurrentTopic($scope.topic);
        var data = $scope.data;
        var topic = $scope.topic;
        var url  = $scope.url;
        var rating = $scope.rating;
        var type = getMimeType($scope.mimetype);


        console.log('data:',data);
        console.log('topic:',topic);
        console.log('url:',url);
        console.log('rating:',rating);
        console.log('type:',type);
        ////////////////////////

        var apiUrl = 'http://api.learning-context.de';
        var apiVersion = 4;
        var appUrl = window.location;
        // appId and appSecret of Options
        var appId = localStorage["appId"];
        var appSecret = localStorage["appSecret"];
		var refreshToken = localStorage["refreshToken"];

        // var refreshToken = "c12a27089c571947bd8e01a05ce8d1310e48d29f"

        if(refreshToken === undefined){
            //$('body').append("<p>rt: No Token found</p><hr>");
            alert('no refresh token, please login via options first');
            console.log('no refresh token');
            return;
        }else {
            //$('body').append("<p>rt:"+window.$_GET['rt']+"</p><hr>");
            console.log('refresh token:['+ refreshToken +']');
        }


        var timestamp = moment().format('YYYY-MM-DD hh:mm:ss');
        console.log('timestamp:', timestamp);
        //$action, $created_at, $platform, $type, $minor, $session
        var event = new Event("START", timestamp , "WEBBASED", "PRIVATE", "RATEPAGE");
        //var rating = Math.floor((Math.random() * 10) + 1);
        var entity2 = new Entity("url", data);
        var entity4 = new Entity("topic", topic);
        var entity1 = new Entity("rating", rating);
        var entity3 = new Entity("mimetype", type);

        event.addEntity(entity1);
        event.addEntity(entity2);
        event.addEntity(entity3);
        event.addEntity(entity4);
        var json = "[" + event.toJson() + "]";
        console.log('json:',json);

			var s = window.location.search.substring(1).split('&');
	if(!s.length) return;
	window.$_GET = {};
	for(var i  = 0; i < s.length; i++) {
		var parts = s[i].split('=');
		window.$_GET[unescape(parts[0])] = unescape(parts[1]);
	}
		
        var lc = new LearningContext(apiUrl,
            apiVersion,
            appId,
            appSecret,
            appUrl,
            refreshToken);
        // console.log('events update result:',lc.post("events", json));

        var resulteventsAsString = lc.get("events", '{"model":"COMPLETE"}');
        var resultevents = JSON.parse(resulteventsAsString);

        // console.log('get events',resultevents, typeof resultevents);
        // console.log('get events',resultevents.events);

        // resultevents.events.forEach(function(event){
            // console.log('event:',event);
        // });
        ////////////////////////
    }
}]);
angular.bootstrap(document, ['myApp']);
