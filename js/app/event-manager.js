(function(angular) {
    'use strict';
    angular.module('kaios-sample-app')
        .service('$eventManager', function() {})
        .config(["$provide", function($provide) {
            $provide.decorator('$eventManager', ["$rootScope", "$delegate", function($rootScope, $delegate) {

                var currentActiveComponent = null;
                var currentComponent = function(ev, id) {
                    currentActiveComponent = id;
                }
                document.addEventListener("keydown", function(ev) {
                    var event = ev;
                    var activeElement = naviBoard.getActiveElement();
                    switch (currentActiveComponent) {
                        case 'home':
                            if (event.keyCode == 13) { // center key button press action
                                activeElement.click();
                            } else if (event.keyCode == 107 || event.key == "Backspace") {

                            } else if (event.keyCode == 76 || event.key == "l") {
                                $rootScope.$emit('home_softleft'); //key to invoke lsk by emmiting the event
                            } else if (event.key == "r" || event.keyCode == 82) {
                                $rootScope.$emit('home_softright'); //key to invoke rsk by emmiting the event
                            }
                            break;
                        case 'about':
                            if (event.keyCode == 13) {} else if (event.keyCode == 107 || event.key == "Backspace") {
                                $rootScope.$emit("goBackFromAbout");
                                event.preventDefault();
                            } else {

                            }
                            break;
                        case 'fullView':
                            if (event.keyCode == 13) {} else if (event.keyCode == 107 || event.key == "Backspace") {
                                
                                event.preventDefault();
                            }else if(event.keyCode == 82){ // r key in keyBoard
                                $rootScope.$emit("goBackFromFullView");
                            } else {

                            }
                            break;
                        default:
                    }
                })

                $delegate.getCurrentActiveComponent = function() {
                    return currentActiveComponent;
                };

                $rootScope.$on('componentActive', currentComponent);

                return $delegate;
            }]);
        }]);
})(angular);