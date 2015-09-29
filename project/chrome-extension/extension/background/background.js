/*
require.config({
    baseUrl: '../',
    paths: {
        "angular":'vendors/angular/angular',
        "jquery": 'vendors/jquery/dist/jquery',
        "moment": 'vendors/moment/min/moment-with-locales',
        "noty":   'vendors/noty/js/noty/packaged/jquery.noty.packaged'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        jquery:{
            exports: 'jquery'
        },
        noty:{
            deps: ['jquery'],
            exports: 'noty'
        }
    }
});
require(['apps/background'], function(background){
    background.start();
});
*/
function getCurrentUrl(callback){
    console.log('testRequest');

    chrome.tabs.getCurrent(function (tab){
        console.log('tab:',tab);
    });
    chrome.tabs.query({'active': true}, function(tabs){
        console.log(tabs);
        tabs.forEach(function(_tab){
            console.log(_tab);
            chrome.tabs.get(_tab.id, function(tab){
                console.log('tab',tab.url, callback);
                callback(tab.url);
            });
        });

    });
}
