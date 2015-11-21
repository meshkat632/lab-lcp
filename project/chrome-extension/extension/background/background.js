function getCurrentUrl(callback){
    console.log('testRequest');


    chrome.tabs.getCurrent(function (tab){
        //console.log('tab:',tab);
    });
    chrome.tabs.query({'active': true}, function(tabs){
        //console.log(tabs);
        tabs.forEach(function(_tab){
            //console.log(_tab);
            chrome.tabs.get(_tab.id, function(tab){
                console.log('tab',tab.url, callback);
                if(tab.url != undefined)
                    callback(tab.url, currentTopic, isConnected);
            });
        });

    });
}
var currentTopic = 'UNKNOWN';
function setCurrentTopic(topic){
    console.log('currentTopic:',topic);
    currentTopic = topic;
}
var currentLc = undefined;
var isConnected = false;
function setLcObject(lc){
    console.log('setLcObject:',lc);
    currentLc = lc;
    isConnected = true;
}

function resetLcObject(){
    console.log('resetLcObject');
    delete currentLc;
    currentLc = undefined;
    isConnected = false;
}
function getLcObject(){
    return currentLc;
}
function isConnected(){
    return isConnected;
}


/*
setInterval(function(){
    console.log('currentLc',currentLc);
    if(currentLc != undefined){
        var result1 = currentLc.get("user", '');
        console.log('result1',result1);
    }
    else {
        console.warn('currentLc is undefined');
    }
},5000);
*/


