
//refreshToken = "e589f7461cb230335d08bedb7ebb23825634afcd";
var refreshtoken = window.localStorage["refreshToken"] || 'NULL';
console.log('refreshtoken:',refreshtoken);
angular.module('myApp',[]).controller('optionController', ['$scope', '$interval','$window','$location','$timeout', '$document',function ($scope, $interval, $window,$location,$timeout, $document) {
    console.log('optionController');
    //refreshToken = "e589f7461cb230335d08bedb7ebb23825634afcd";
    $scope.refreshtoken = $window.localStorage["refreshToken"] || 'NULL';
    $scope.counter = localStorage["counter"]|| 0;
    localStorage["counter"] = $scope.counter +1;
    $scope.refreshtoken = $scope.refreshtoken;
    $window.getOldRefreshToken = function(){
        return $scope.refreshtoken;
    }
    $window.onNewRefreshToken = function(newRefreshtoken){
        console.log('on option page new refresh  token',newRefreshtoken, 'old:',$scope.refreshtoken);
        $scope.refreshtoken = newRefreshtoken;
        localStorage["refreshToken"] = newRefreshtoken;
        $scope.$apply();



    }
    $window.logout = function(){
        chrome.extension.getBackgroundPage().resetLcObject();
        localStorage["refreshToken"] = undefined;
        $scope.$apply();
        location.reload();

    }
    $window.onLc = function(lc){
        console.log('onLc ',lc);
        //var result1 = lc.get("events", '{"model":"COMPLETE"}');
        //console.log('result1',result1);
        chrome.extension.getBackgroundPage().setLcObject(lc);
    }

    //$document.find('#loginPageFrame').attr('src', 'http://localhost:63342/lcp-chrome-extension/extension/options/login.html');
    $document.find('#loginPageFrame').attr('src', 'login-new.html');

}]);
//angular.bootstrap(document, ['myApp']);



