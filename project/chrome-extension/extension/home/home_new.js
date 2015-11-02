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


    $scope.share = function(){

        chrome.extension.getBackgroundPage().setCurrentTopic($scope.topic);
        var data = $scope.data;
        var topic = $scope.topic;
        var url  = $scope.url;
        var rating = $scope.rating;
        var type = $scope.type;
        console.log('data:',data);
        console.log('topic:',topic);
        console.log('url:',url);
        console.log('rating:',rating);
        console.log('type:',type);
        ////////////////////////
        window.$_GET = {};
        $_GET['rt'] = 'c12a27089c571947bd8e01a05ce8d1310e48d29f';

        var apiUrl = 'http://api.learning-context.de';
        var apiVersion = 4;
        var appUrl = window.location;
        // appId and appSecret of Meshkat
        var appId = 61;
        var appSecret = 'rirecpainw2ju2nmr9vi8uvab3bf5j0pq6i6ysfdo031nffh9i';

        if($_GET['rt'] === undefined){
            //$('body').append("<p>rt: No Token found</p><hr>");
            alert('no refresh token');
            console.log('no refresh token');
            return;
        }else {
            //$('body').append("<p>rt:"+window.$_GET['rt']+"</p><hr>");
            console.log('refresh token:['+window.$_GET['rt']+']');
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

        var lc = new LearningContext(apiUrl,
            apiVersion,
            appId,
            appSecret,
            appUrl,
            $_GET['rt']);
        console.log('events update result:',lc.post("events", json));

        var resulteventsAsString = lc.get("events", '{"model":"COMPLETE"}');
        var resultevents = JSON.parse(resulteventsAsString);

        console.log('get events',resultevents, typeof resultevents);
        console.log('get events',resultevents.events);

        resultevents.events.forEach(function(event){
            console.log('event:',event);
        });
        ////////////////////////
    }
}]);
angular.bootstrap(document, ['myApp']);