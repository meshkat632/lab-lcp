define('apps/ngTestApp',['exports', 'module'], function (exports, module) {
    'use strict';

    var app = {
        start: function start($window) {
            console.log('starting ngTestApp app');
        }
    };
    module.exports = app;
});

define('lib/ExtensionHelper',['exports', 'module', 'moment'], function (exports, module, _moment) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _moment2 = _interopRequireDefault(_moment);

    var _isExtension = false;
    var extensionId = undefined;
    try {
        if (chrome.runtime.id === undefined) _isExtension = false;else {
            _isExtension = true;
            extensionId = chrome.runtime.id;
        }
    } catch (error) {}

    /*
    function _isExtension(){
        return isExtension;
    }
    
    function _getExtensionId(){
        return extensionId;
    }
    */
    var ExtensionHelper = {
        isExtension: function isExtension() {
            return _isExtension;
        },
        getExtensionId: function getExtensionId() {
            return extensionId;
        }
    };
    module.exports = ExtensionHelper;
});

define('lib/Commons',['exports', 'module', 'moment'], function (exports, module, _moment) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _moment2 = _interopRequireDefault(_moment);

    var Commons = {
        utils: {
            generateUUID: generateUUID,
            getQueryVariable: getQueryVariable
        }

    };
    module.exports = Commons;

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
        return uuid;
    }
    function getQueryVariable(url, variable) {
        var query = url.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }
});

define('lib/WebExtension',['exports', 'lib/Commons', 'noty', 'jquery'], function (exports, _libCommons, _noty, _jquery) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _Commons = _interopRequireDefault(_libCommons);

    var _noty2 = _interopRequireDefault(_noty);

    var _jquery2 = _interopRequireDefault(_jquery);

    var uuid = _Commons['default'].utils.generateUUID();
    var user = {
        name: 'test1',
        password: 'test1',
        loginStatus: true
    };

    var WebAction = (function () {
        function WebAction() {
            _classCallCheck(this, WebAction);
        }

        _createClass(WebAction, [{
            key: 'disable',

            //jquery('body').append('<div class="appIcon">Hello I am the notify:</div>');

            value: function disable() {

                //jquery('.appIcon').html('disabled');
            }
        }, {
            key: 'enable',
            value: function enable() {
                //jquery('.appIcon').html('enabled');
            }
        }, {
            key: 'setIcon',
            value: function setIcon(details, callback) {
                //jquery('.appIcon').html('setIcon details:'+JSON.stringify(details));
            }
        }, {
            key: 'reload',
            value: function reload() {
                // console.error('WebAction reload not yet implemented');
            }
        }]);

        return WebAction;
    })();

    exports.WebAction = WebAction;

    var browserAction = new WebAction();

    var webExtension = {
        uuid: uuid,
        extensionType: 'WEB', //CHROME, FIREFOX, WEB
        notifications: {},
        init: function init(eventbus) {
            var self = this;
            var lastUser = {};
            lastUser.id = Math.abs(Math.random() * 1000);
            lastUser.old = undefined;
            webExtension.loadLastUser(function (user) {
                console.log("loadLastUser success", user);
                lastUser.old = user;
            });

            /*
            chrome.storage.onChanged.addListener(function(changes, namespace) {
                console.log("chrome.storage.onChanged");
                  webExtension.loadLastUser(function(user){
                    console.log("chrome.storage.onChanged new user:", lastUser.old,' --> ',user);
                      if(lastUser.old === undefined){
                        console.log('changed');
                        lastUser.old = user;
                        var event = new Event('USER_SETTINGS_CHANGED');
                        event.user = user;
                        if(eventbus)
                            eventbus.publish(event);
                        return;
                    }
                    if(lastUser.old.name === user.name && lastUser.old.password === user.password){
                        console.log('no change');
                        return;
                    }else{
                        console.log('changed');
                        lastUser.old = user;
                        var event = new Event('USER_SETTINGS_CHANGED');
                        event.user = user;
                        if(eventbus)
                            eventbus.publish(event);
                        return;
                    }
                });
            });
                chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex){
                //console.log("[NotificationManager]  Notification onButtonClicked notificationId:"+notificationId+" buttonIndex:"+buttonIndex);
                var notification = self.notifications[notificationId];
                if(notification){
                    if(buttonIndex === 0){
                        notification.accepted();
                        notification.clear();
                    }
                    else if(buttonIndex === 1){
                        notification.rejected();
                        notification.clear();
                    }
                }
            });
              chrome.notifications.onClosed.addListener(function (notificationId, byUser){
                //console.log("[NotificationManager]  Notification onClosed notificationId:"+notificationId+" byUser:"+byUser);
                var notification = self.notifications[notificationId];
                if(notification && byUser){
                    notification.rejected();
                    notification.clear();
                }
            });
              */
        },
        disable: function disable() {
            console.log('disable');
            browserAction.disable();
        },
        enable: function enable() {
            console.log('enable');
            browserAction.enable();
        },
        setIcon: function setIcon(details, callback) {
            console.log('setIcon ', details);
            browserAction.setIcon(details, callback);
        },
        loadLastUser: function loadLastUser(onSuccess, onError) {
            console.log('loadLastUser');
            var user = {
                name: 'test1',
                password: 'test1',
                loginStatus: true
            };
            if (onSuccess) {
                onSuccess(user);
            }
        },
        updateUser: function updateUser(_user, onSuccess) {
            console.log('updateUser', _user);
            user = _user;
            if (onSuccess) onSuccess('Data stored');
        },
        updateUserLoginStatus: function updateUserLoginStatus(isLoggedIn, onSuccess) {
            console.log('updateUserLoginStatus', isLoggedIn);
            user.loginStatus = isLoggedIn;
            if (onSuccess) onSuccess('Data stored');
        },

        reload: function reload() {
            console.log('reload');
            setTimeout(function () {
                console.warn('webExtension.reload function is not complete');
                browserAction.reload();
            }, 2000);
        },
        prompt: function prompt(options) {
            console.warn('webExtension.prompt function is not complete');
            return;
            var self = this;
            var uuid = _Commons['default'].utils.generateUUID();
            var opt = {
                type: "progress",
                title: options.message.title,
                message: options.message.body,
                iconUrl: "../assets/virtualpbx-call-32px.png",
                priority: 2,
                progress: 100,
                contextMessage: this.message,
                buttons: [{
                    title: "Accept",
                    iconUrl: "../assets/yesIcon.png"
                }, {
                    title: "Reject",
                    iconUrl: "../assets/noIcon.png"
                }]
            };
            var close = {
                type: "basic",
                title: options.message.title,
                message: options.message.body,
                iconUrl: "../assets/virtualpbx-call-32px.png",
                priority: 2,
                buttons: []
            };

            var window = chrome.notifications.create(uuid, opt, function (id) {
                console.log("Notification created. ID:" + id + ' uuid', uuid);
                self.notifications[id] = options;
            });

            options.counter = 21;
            options.timeoutId = setInterval(function () {
                console.log("update notification. uuid:", uuid);
                options.counter = options.counter - 1;
                if (options.counter == 0) {
                    chrome.notifications.clear(uuid, function () {
                        clearInterval(options.timeoutId);
                        //delete options;
                    });
                    if (options.timedOut) options.timedOut();

                    return;
                }

                //opt.message =  options.message.body+'['+options.counter+']';
                opt.progress = Math.round(options.counter / 20 * 100);
                chrome.notifications.update(uuid, opt);
            }, 1000);
            options.clear = function () {
                clearInterval(options.timeoutId);
            };

            options.getCallObject().addFailedListener(function (code, reason, cause) {
                console.log("[callControl] oncall:Failed Cause=" + cause + "; Code: " + code);
                if (cause === 'Canceled') {
                    close.title = "Call was canceled";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                    return;
                }
                if (code == '457') {
                    close.title = "Call was  rejected";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                } else if (code == '486') {
                    close.title = "Callee was busy.";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                } else if (code == '480') {
                    close.title = "Temporarily Unavailable.";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                } else {
                    close.title = 'Error: code:' + code + " reason:" + reason + " cause:" + cause + ".";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                }
            });
        },
        notify: function notify(message) {

            var opt = {
                type: "basic",
                title: message.title,
                message: message.body,
                iconUrl: "../assets/empty.png"
            };

            console.log(opt);
            //console.warn('chrome.notifications.create is not created');
            (0, _noty2['default'])({ text: message.title + '-' + message.body });
            //jquery.notify();

            /*
            var window = chrome.notifications.create(this.notificationId, opt, function(id) {
                //console.log("Notification created. ID:" + id);
            });
            */
        }
    };

    exports['default'] = webExtension;
});

define('lib/ChromeExtension',['exports', 'module', 'lib/Commons'], function (exports, module, _libCommons) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _Commons = _interopRequireDefault(_libCommons);

    var uuid = _Commons['default'].utils.generateUUID();
    var chromeExtension = {
        uuid: uuid,
        extensionType: 'CHROME', //CHROME, FIREFOX, WEB
        notifications: {},
        init: function init(eventbus) {
            var self = this;
            var lastUser = {};
            lastUser.id = Math.abs(Math.random() * 1000);
            lastUser.old = undefined;
            chromeExtension.loadLastUser(function (user) {
                console.log("loadLastUser success", user);
                lastUser.old = user;
            });

            chrome.storage.onChanged.addListener(function (changes, namespace) {
                console.log("chrome.storage.onChanged");

                chromeExtension.loadLastUser(function (user) {
                    console.log("chrome.storage.onChanged new user:", lastUser.old, ' --> ', user);

                    if (lastUser.old === undefined) {
                        console.log('changed');
                        lastUser.old = user;
                        var event = new Event('USER_SETTINGS_CHANGED');
                        event.user = user;
                        if (eventbus) eventbus.publish(event);
                        return;
                    }
                    if (lastUser.old.name === user.name && lastUser.old.password === user.password) {
                        console.log('no change');
                        return;
                    } else {
                        console.log('changed');
                        lastUser.old = user;
                        var event = new Event('USER_SETTINGS_CHANGED');
                        event.user = user;
                        if (eventbus) eventbus.publish(event);
                        return;
                    }
                });
            });

            chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
                //console.log("[NotificationManager]  Notification onButtonClicked notificationId:"+notificationId+" buttonIndex:"+buttonIndex);
                var notification = self.notifications[notificationId];
                if (notification) {
                    if (buttonIndex === 0) {
                        notification.accepted();
                        notification.clear();
                    } else if (buttonIndex === 1) {
                        notification.rejected();
                        notification.clear();
                    }
                }
            });

            chrome.notifications.onClosed.addListener(function (notificationId, byUser) {
                //console.log("[NotificationManager]  Notification onClosed notificationId:"+notificationId+" byUser:"+byUser);
                var notification = self.notifications[notificationId];
                if (notification && byUser) {
                    notification.rejected();
                    notification.clear();
                }
            });
        },
        disable: function disable() {
            console.log('disable');
            chrome.browserAction.disable();
        },
        enable: function enable() {
            console.log('enable');
            chrome.browserAction.enable();
        },
        setIcon: function setIcon(details, callback) {
            console.log('setIcon ', details);
            chrome.browserAction.setIcon(details, callback);
        },
        loadLastUser: function loadLastUser(onSuccess, onError) {
            console.log('loadLastUser');
            chrome.storage.sync.get({
                username: '_$none$_',
                password: '_$none$_',
                loginStatus: '_$none$_'
            }, function (items) {
                items.loginStatus = items.loginStatus || false;
                if (items.username === '_$none$_' || items.password === '_$none$_') {
                    if (onError) {
                        onError(new Error('FAILED_TO_LOAD_USER:No user found!'));
                    }
                } else {
                    var user = {
                        name: items.username,
                        password: items.password,
                        loginStatus: items.loginStatus
                    };
                    if (onSuccess) {
                        onSuccess(user);
                    }
                }
            });
        },
        updateUser: function updateUser(user, onSuccess) {
            console.log('updateUser', user);
            chrome.storage.sync.set({
                username: user.name,
                password: user.password
            }, function () {
                if (onSuccess) onSuccess('Data stored');
            });
        },
        updateUserLoginStatus: function updateUserLoginStatus(isLoggedIn, onSuccess) {
            console.log('updateUserLoginStatus', isLoggedIn);
            chrome.storage.sync.set({
                loginStatus: isLoggedIn
            }, function () {
                if (onSuccess) onSuccess('Data stored');
            });
        },

        reload: function reload() {
            console.log('reload');
            setTimeout(function () {
                chrome.runtime.reload();
            }, 2000);
        },
        prompt: function prompt(options) {
            var self = this;
            var uuid = _Commons['default'].utils.generateUUID();
            var opt = {
                type: "progress",
                title: options.message.title,
                message: options.message.body,
                iconUrl: "../assets/virtualpbx-call-32px.png",
                priority: 2,
                progress: 100,
                contextMessage: this.message,
                buttons: [{
                    title: "Accept",
                    iconUrl: "../assets/yesIcon.png"
                }, {
                    title: "Reject",
                    iconUrl: "../assets/noIcon.png"
                }]
            };
            var close = {
                type: "basic",
                title: options.message.title,
                message: options.message.body,
                iconUrl: "../assets/virtualpbx-call-32px.png",
                priority: 2,
                buttons: []
            };

            var window = chrome.notifications.create(uuid, opt, function (id) {
                console.log("Notification created. ID:" + id + ' uuid', uuid);
                self.notifications[id] = options;
            });

            options.counter = 21;
            options.timeoutId = setInterval(function () {
                console.log("update notification. uuid:", uuid);
                options.counter = options.counter - 1;
                if (options.counter == 0) {
                    chrome.notifications.clear(uuid, function () {
                        clearInterval(options.timeoutId);
                        //delete options;
                    });
                    if (options.timedOut) options.timedOut();

                    return;
                }

                //opt.message =  options.message.body+'['+options.counter+']';
                opt.progress = Math.round(options.counter / 20 * 100);
                chrome.notifications.update(uuid, opt);
            }, 1000);
            options.clear = function () {
                clearInterval(options.timeoutId);
            };

            options.getCallObject().addFailedListener(function (code, reason, cause) {
                console.log("[callControl] oncall:Failed Cause=" + cause + "; Code: " + code);
                if (cause === 'Canceled') {
                    close.title = "Call was canceled";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                    return;
                }
                if (code == '457') {
                    close.title = "Call was  rejected";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                } else if (code == '486') {
                    close.title = "Callee was busy.";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                } else if (code == '480') {
                    close.title = "Temporarily Unavailable.";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                } else {
                    close.title = 'Error: code:' + code + " reason:" + reason + " cause:" + cause + ".";
                    //close.message = "code:"+code+" reason:"+reason+" cause:"+cause;
                    chrome.notifications.update(uuid, close);
                    options.clear();
                    setTimeout(function () {
                        chrome.notifications.clear(uuid, function () {
                            clearInterval(options.timeoutId);
                        });
                    }, 2000);
                }
            });
        },
        notify: function notify(message) {

            var opt = {
                type: "basic",
                title: message.title,
                message: message.body,
                iconUrl: "../assets/empty.png"
            };

            console.log(opt);

            var window = chrome.notifications.create(this.notificationId, opt, function (id) {
                //console.log("Notification created. ID:" + id);
            });
        }
    };

    module.exports = chromeExtension;
});

define('lib/ExtensionProvider',['exports', 'module', 'moment', 'lib/ExtensionHelper', 'lib/Commons', 'lib/WebExtension', 'lib/ChromeExtension'], function (exports, module, _moment, _libExtensionHelper, _libCommons, _libWebExtension, _libChromeExtension) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _moment2 = _interopRequireDefault(_moment);

    var _ExtensionHelper = _interopRequireDefault(_libExtensionHelper);

    var _Commons = _interopRequireDefault(_libCommons);

    var _webExtension = _interopRequireDefault(_libWebExtension);

    var _chromeExtension = _interopRequireDefault(_libChromeExtension);

    var extension = undefined;
    var ExtensionProvider = {
        init: function init(_eventbus) {

            if (_ExtensionHelper['default'].isExtension()) {
                extension = _chromeExtension['default'];
                extension.init(_eventbus);
            } else {
                extension = _webExtension['default'];
                extension.init(_eventbus);
            }
        },
        getExtension: function getExtension() {
            if (_ExtensionHelper['default'].isExtension()) {
                return _chromeExtension['default'];
            } else {
                return extension;
            }
        }
    };
    module.exports = ExtensionProvider;
});

define('lib/MediaAccessManager',['exports', 'module'], function (exports, module) {
    'use strict';

    function successCallback(stream) {
        console.log('navigator.getUserMedia success: stream:', stream);
        window.stream = stream; // make stream available to console
        videoElement.src = window.URL.createObjectURL(stream);
        videoElement.play();
    }

    function errorCallback(error) {
        console.error('navigator.getUserMedia error: ', error);
    }

    function start() {
        videoElement.src = window.URL.createObjectURL(window.stream);
        videoElement.play();
    }
    function stop() {
        videoElement.pause();
        videoElement.src = "";
        videoElement.load();
    }

    function ask(successCallback, errorCallback) {
        var constraints = {
            audio: true,
            video: true
        };
        console.log('constraints', JSON.stringify(constraints));
        navigator.getUserMedia(constraints, successCallback, errorCallback);
    }
    var eventNames = [];
    var isAllowed = false;
    var videoElement = undefined;
    var MediaAccessManager = {
        "init": function init($document) {
            videoElement = $document.querySelector('video');
        },
        "ask": ask,
        "start": start,
        "stop": stop
    };
    module.exports = MediaAccessManager;
});

define('lib/EventBus',["exports", "module", "lib/Commons"], function (exports, module, _libCommons) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    var _Commons = _interopRequireDefault(_libCommons);

    var eventNames = [];
    var uuid = _Commons["default"].utils.generateUUID();
    var EventBus = {
        id: uuid,
        publish: function publish(event) {
            var self = this;
            console.log("%c[" + self.id + "-" + event.type + ']', "color:green; background-color:yellow");
            var eventName = event.type;
            if (eventNames[eventName] == undefined) return;

            try {
                var listeners = eventNames[eventName];
                if (listeners) {
                    listeners.forEach(function (listener) {
                        if (listener) {
                            if (typeof listener == "function") {
                                try {
                                    //console.log('before ',eventName,event);
                                    listener(event);
                                    //console.log('after ',eventName,event);
                                } catch (_error) {
                                    console.error('ERROR while event:', event, _error);
                                    throw _error;
                                }
                            } else console.error('not a valid listener:', typeof listener);
                        } else console.error('not a valid listener:', typeof listener);
                    });
                } else console.error('no listeners found');
            } catch (error) {
                console.error('ERROR in EventBus while event:', event, error);
                throw error;
            }

            /*
            setTimeout(function() {
            }, 1);
            */
        },
        register: function register(eventName, _callback) {
            if (typeof _callback != "function") {
                console.error('[EventBus]  only function canbe resisterd !');
                return;
            }
            if (eventNames[eventName] == undefined) {
                eventNames[eventName] = [_callback];
            } else {
                eventNames[eventName].push(_callback);
            }
        }
    };
    module.exports = EventBus;
});

define('apps/background',['exports', 'module', 'moment', 'jquery', 'angular', 'lib/ExtensionProvider', 'lib/MediaAccessManager', 'lib/EventBus'], function (exports, module, _moment, _jquery, _angular, _libExtensionProvider, _libMediaAccessManager, _libEventBus) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _moment2 = _interopRequireDefault(_moment);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _angular2 = _interopRequireDefault(_angular);

    var _ExtensionProvider = _interopRequireDefault(_libExtensionProvider);

    var _MediaAccessManager = _interopRequireDefault(_libMediaAccessManager);

    var _EventBus = _interopRequireDefault(_libEventBus);

    var app = {
        start: function start($window) {
            console.log('starting backgound app at:', (0, _moment2['default'])());
            _MediaAccessManager['default'].init(document);
            _ExtensionProvider['default'].init(_EventBus['default']);

            //
            _ExtensionProvider['default'].getExtension().disable();
            setTimeout(function () {
                _ExtensionProvider['default'].getExtension().enable();
            }, 2000);
        }
    };
    module.exports = app;
});

define('apps/home',['exports', 'module', 'moment', 'jquery', 'angular', 'lib/ExtensionProvider', 'lib/MediaAccessManager', 'lib/EventBus'], function (exports, module, _moment, _jquery, _angular, _libExtensionProvider, _libMediaAccessManager, _libEventBus) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _moment2 = _interopRequireDefault(_moment);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _angular2 = _interopRequireDefault(_angular);

    var _ExtensionProvider = _interopRequireDefault(_libExtensionProvider);

    var _MediaAccessManager = _interopRequireDefault(_libMediaAccessManager);

    var _EventBus = _interopRequireDefault(_libEventBus);

    var app = {
        start: function start($window) {

            console.log('starting homepage at:', (0, _moment2['default'])());
            _angular2['default'].module('myApp', []).controller('homeController', ['$scope', '$interval', '$window', '$location', '$timeout', function ($scope, $interval, $window, $location, $timeout) {
                $scope.data = 'hello from angular';
            }]);
            _angular2['default'].bootstrap(document, ['myApp']);
        }
    };
    module.exports = app;
});

define('apps/userSettings',['exports', 'module', 'moment', 'jquery', 'angular', 'lib/ExtensionProvider', 'lib/MediaAccessManager'], function (exports, module, _moment, _jquery, _angular, _libExtensionProvider, _libMediaAccessManager) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _moment2 = _interopRequireDefault(_moment);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _angular2 = _interopRequireDefault(_angular);

    //import ectChat from 'ectChat';

    var _ExtensionProvider = _interopRequireDefault(_libExtensionProvider);

    var _MediaAccessManager = _interopRequireDefault(_libMediaAccessManager);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    _MediaAccessManager['default'].init(document);
    _MediaAccessManager['default'].ask(function () {
        console.log('on suceess');
    }, function () {
        console.log('on error');
    });

    var app = {
        start: function start() {
            console.log('starting userSettings app');
            //console.log('ectChat 134:', ectChat);
            _angular2['default'].module('myApp', []).controller('myController', ['$scope', '$interval', function ($scope, $interval) {

                $scope.data = " I  am the user setting page";

                $scope.user = undefined;
                $scope.save = function () {
                    console.log('save', $scope.user.name, $scope.user.password);
                    _ExtensionProvider['default'].getExtension().updateUser({
                        name: $scope.user.name,
                        password: $scope.user.password
                    }, function () {
                        console.log('usersettings updated');
                    }, function (error) {
                        console.log(error);
                    });
                };
                /*
                 $interval(function(){
                 var currentTimeStr = moment().format('MMMM Do YYYY, h:mm:ss a');
                 console.log('time:', currentTimeStr);
                 $scope.data = currentTimeStr;
                 },1000);
                 */

                _ExtensionProvider['default'].getExtension().loadLastUser(function (user) {
                    console.log('user loaded', user);
                    $scope.user = user;
                    $scope.$apply();
                }, function (error) {
                    console.log(error);
                });
            }]);

            _angular2['default'].bootstrap(document, ['myApp']);
        }
    };
    module.exports = app;
});

define('main',['exports', 'module', 'apps/ngTestApp', 'apps/background', 'apps/home', 'apps/userSettings'], function (exports, module, _appsNgTestApp, _appsBackground, _appsHome, _appsUserSettings) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _ngTestApp = _interopRequireDefault(_appsNgTestApp);

    var _background = _interopRequireDefault(_appsBackground);

    var _home = _interopRequireDefault(_appsHome);

    var _userSettings = _interopRequireDefault(_appsUserSettings);

    var main = {
        start: function start(appName, $window) {
            if ("ngTestApp" === appName) {
                _ngTestApp['default'].start();
                return;
            }
            if ("background" === appName) {
                _background['default'].start($window);
                return;
            }
            if ("home" === appName) {
                _home['default'].start($window);
                return;
            }
            if ("userSettings" === appName) {
                _userSettings['default'].start($window);
                return;
            }
            console.error('app not found with name:', appName);
        }
    };
    module.exports = main;
});

