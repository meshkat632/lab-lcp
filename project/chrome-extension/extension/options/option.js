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
require(['apps/userSettings'], function(userSettings){
    userSettings.start();
});