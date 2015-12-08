angular.module('myApp',[]).controller('homeController', ['$scope', '$interval','$window','$location','$timeout',function ($scope, $interval, $window,$location,$timeout) {

    var result;
	var tempType;
	var tempRating = 3;
	var code = 'var meta = document.querySelector("meta[name=\'description\'],META[NAME=\'DESCRIPTION\'],meta[name=\'Description\'],meta[name=\'title\'],META[NAME=\'TITLE\'],meta[name=\'Title\'],meta[name=\'keywords\'],META[NAME=\'KEYWORDS\'],meta[name=\'Keywords\']");' + 
           'if (meta) meta = meta.getAttribute("content");' +
           '({' +
           '    title: document.title,' +
           '    description: meta || ""' +
           '});';
	chrome.tabs.executeScript({
				code: code
			}, function(results) {
				if (!results) {
					console.log('Error Results:', results);
					return;
				}
				result = results[0];
				console.log('Result Title:', result.title);
				console.log('Result Description:', result.description);
			});
	
	chrome.extension.getBackgroundPage().getCurrentUrl(function(url, topic, isConnected){
        console.log('url:',url);
		console.log('result in currentUrl:', result);
        if(!isConnected){
            $scope.message ='Learning context connection is not.';
            $scope.state = 'not_connected';
			$scope.tags = '';
            $scope.$apply();
            return;
        }else {
            $scope.state = 'connected';
        }
				
        $scope.data = url;
        $scope.topic = result.title;
		$scope.description = result.description;
		$scope.tags = result.description;
		$scope.mimetypes = [{name: 'Webpage'}, {name: 'PDF'}, {name: 'Video'}, {name: 'Text'}, {name: 'Audio'}];
		$scope.ratings = [{name: 'Excellent'}, {name: 'Very Good'}, {name: 'Good'}, {name: 'Bad'}, {name: 'Very Bad'}];
		var tempUrl = url;
		var mimeTypeId = setMimeType(tempUrl);
		$scope.mimetype = $scope.mimetypes[mimeTypeId];
		tempType = $scope.mimetypes[mimeTypeId];
		$scope.rating = $scope.ratings[2];
		$scope.$apply();
    });

	$scope.changedMimeType=function(item){
		console.log('ItemName', item.name);
		tempType = getMimeType(item.name, $scope.data);
	}
	
		$scope.changedRating=function(item2){
		console.log('RatingItemName', item2.name);
		tempRating = toNumericRating(item2.name);
	}
	
    /*
    $scope.$watch('topic', function(){
        chrome.extension.getBackgroundPage().setCurrentTopic($scope.topic);
    });
    */
	
	function setMimeType(url){
		if(url.substr(url.length - 3) === "pdf")	return 1;
		if(url.indexOf("www.youtube.com") != -1)	return 2;
		if(url.substr(url.length - 4) === "mpeg" || url.substr(url.length - 3) === "mpg" || url.substr(url.length - 3) === "avi")	return 2;
		if(url.substr(url.length - 4) === "docx" || url.substr(url.length - 3) === "doc" || url.substr(url.length - 3) === "txt")	return 3;
		if(url.substr(url.length - 3) === "mp3")	return 4;
		return 0;
	}
	
    function getMimeType(type, url) {
		console.log('type', type);
        if(type === 'PDF') return "application/pdf";
        if (type === 'Video') return "media/video";
        if (type === 'Audio') return "media/audio";
        if (type === 'Text') return "text/plain";
        if(type === 'Webpage') return "text/html";
		if(type === 'application/pdf') return "application/pdf";
        if (type === 'media/video') return "media/video";
        if (type === 'media/audio') return "media/audio";
        if (type === 'text/plain') return "text/plain";
        if(type === 'text/html') return "text/html";
		
        if(url.indexOf("www.youtube.com") != -1)
            return "media/youtube";
				
        return "text/html";
    }

    function toNumericRating(rate) {
		console.log('toNumericRating', rate);
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
			case 5:
                return 5;
                break;
            case 4:
                return 4;
                break;
            case 3:
                return 3;
                break;
            case 2:
                return 2;
                break;
            case 1:
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

    $scope.showButton = true;
    $scope.share = function(){

        $scope.showButton = false;
        $scope.message ='Trying to submit data..';

        chrome.extension.getBackgroundPage().setCurrentTopic($scope.topic);

        console.log($scope);

        var data = $scope.data;
        var topic = $scope.topic;
        var url  = $scope.url;
		console.log('temprating', toNumericRating(tempRating));
        var rating = toNumericRating(tempRating);
		console.log('temptype', tempType);
        var type = getMimeType(tempType, data);
        var tags = $scope.tags;
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

        /*
        var lc = new LearningContext(apiUrl,
            apiVersion,
            appId,
            appSecret,
            appUrl,
            refreshToken);
        */


        var lc = chrome.extension.getBackgroundPage().getLcObject();
        lc.post("events", json);

        $scope.message = 'The rating data is saved.';
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
