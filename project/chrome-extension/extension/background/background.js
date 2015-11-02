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
                if(tab.url != undefined)
                    callback(tab.url, currentTopic);
            });
        });

    });
}
var currentTopic = 'UNKNOWN';
function setCurrentTopic(topic){
    console.log('currentTopic:',topic);
    currentTopic = topic;
}

