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

    function getMimeType(type, url) {

        if(type==null)
            return null;
        
        var mimeTypes = {};
        mimeTypes["PDF"] = "application/pdf";
        mimeTypes["Video"] = "media/video";
        mimeTypes["Audio"] = "media/audio";
        mimeTypes["Text"] = "text/plain";
        mimeTypes["Webpage"] = "text/html";

        if(url.indexOf("www.youtube.com") != -1)
            return "media/youtube"

        return mimeTypes[type];
    }

    // I added a function for future. In case we wanted to modify it and make it more complex.
    function getTags(tags) {
        if(tags != null) {
            tags=tags.replace(/ /g,"");
            return tags.split(',');
        }
        return null;
    }

    function toNumericRating(rate) {
        switch(rate) {
            case "Excellent":
                return 5;
                break;
            case "Very Good":
                return 4;
                break;
            case "Good":
                return 3;
                break;
            case "Bad":
                return 2;
                break;
            case "Very Bad":
                return 1;
                break;
            default:
                return 3;
        }
    }

    function checkDescription(description) {
        if(description == null)
            return null;
        return description;
    }


    $scope.share = function(){

        chrome.extension.getBackgroundPage().setCurrentTopic($scope.topic);

        console.log($scope);

        var data = $scope.data;
        var topic = $scope.topic;
        var url  = $scope.url;
        var rating = toNumericRating($scope.rating);
        var type = getMimeType($scope.mimetype, data);
        var tags = getTags($scope.tags);
        var source = "Rate A Page Chrome extension";
        var description = checkDescription($scope.description);



        console.log('url:',data);
        console.log('topic:',topic);
        console.log('url:',url);
        console.log('rating:',rating);
        console.log('type:',type);
        console.log('tags:',tags);
        console.log('source:',source);
        console.log('description:',description);
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


        var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        // var timestamp = new Date().getTime();
        console.log('timestamp:', timestamp);
        //$action, $created_at, $platform, $type, $minor, $session
        var event = new Event("START", timestamp , "WEBBASED", "PRIVATE", "RATEPAGE");
        //var rating = Math.floor((Math.random() * 10) + 1);
        var entity2 = new Entity("url", data);
        var entity4 = new Entity("topic", topic);
        var entity1 = new Entity("rating", rating);
        var entity3 = new Entity("mimetype", type);
        var entity5 = new Entity("tags",tags);
        var entity6 = new Entity("source",source);
        var entity7 = new Entity("description", description);

        event.addEntity(entity1);
        event.addEntity(entity2);
        event.addEntity(entity3);
        event.addEntity(entity4);
        event.addEntity(entity5);
        event.addEntity(entity6);
        event.addEntity(entity7);
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
        console.log('events update result:',lc.post("events", json));

        // var resulteventsAsString = lc.get("events", '{"model":"COMPLETE"}');
        // var resultevents = JSON.parse(resulteventsAsString);

        // console.log('get events',resultevents, typeof resultevents);
        // console.log('get events',resultevents.events);

        // resultevents.events.forEach(function(event){
        //     console.log('event:',event);
        // });
        ////////////////////////
    }
}]);
angular.bootstrap(document, ['myApp']);
