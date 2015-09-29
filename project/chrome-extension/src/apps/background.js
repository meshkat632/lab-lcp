import moment from 'moment';
import jquery from 'jquery';
import angular from 'angular';

import ExtensionProvider from 'lib/ExtensionProvider';
import MediaAccessManager from 'lib/MediaAccessManager';
import EventBus from 'lib/EventBus';


let app = {
    start:function($window){
        console.log('starting backgound app at:', moment());
        MediaAccessManager.init(document);
        ExtensionProvider.init(EventBus);

        /*
        ExtensionProvider.getExtension().disable();
        setTimeout(function(){
            ExtensionProvider.getExtension().enable();
        }, 2000);
        */


        chrome.browserAction.onClicked.addListener(function(tab) {
            // No tabs or host permissions needed!
            console.log('Turning ' + tab.url + ' red!');
            chrome.tabs.executeScript({
                code: 'document.body.style.backgroundColor="red"'
            });
        });


    }
};
export default app;