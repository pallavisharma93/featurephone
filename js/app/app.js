(function(angular, window) {
    'use strict';

    $(document).ready(function() {
        document.getElementById("upperpadding").style.display = "block";
        document.getElementById("header").style.display = "block";
    });

    angular.module('kaios-sample-app', ["ngRoute", "appConstants", "home","tabTwo","fullView", "header", "footer"])
        .run(['$eventManager', 'Constants', 'restService', function($eventManager, Constants, restService) {
            //running the required services at starting of the application. 
        }])
        .config(['$locationProvider', '$routeProvider', '$httpProvider',
            function config($locationProvider, $routeProvider, $httpProvider) {

                $locationProvider.hashPrefix('!');
                $routeProvider.
                when('/home', {
                    template: '<home></home>'
                }).
                when('/tabTwo', {
                    template: '<tab-two></tab-two>'
                }).
                when('/fullView', {
                    template: '<full-view></full-view>'
                }).
                otherwise('/home');
            }
        ])
        .controller('TabController', ['$timeout', '$location', function($timeout, $location) {
            this.tab = 1;
            var self=this;
            self.tab=this.tab;

            this.setTab = function(tabId) {
                this.tab = tabId;
                console.log(tabId);
                if (tabId == 1) {
                    $timeout(function() {
                        naviBoard.destroyNavigation("tabs");
                        $location.path('/home')
                    }, 10);
                } else {
                    $timeout(function() {
                        naviBoard.destroyNavigation("tabs");
                        $location.path('/tabTwo');
                    }, 10)
                }
            };

            document.getElementById("tabs").addEventListener("keydown", function(ev) {
                var tabId = self.tab;

                if (ev.keyCode == 40) { //down
                    console.log("down pressed: ",tabId);
                    if (tabId == 1) {
                        $timeout(function() {
                            naviBoard.destroyNavigation("tabs");
                            naviBoard.setNavigation("home");
                        }, 10);
                    } else {
                        $timeout(function() {
                            naviBoard.destroyNavigation("tabs");
                            naviBoard.setNavigation("tabTwo");
                        }, 10)
                    }
                } else if (ev.keyCode == 37 || ev.keyCode == 39) {
                    var currentFocused = naviBoard.getActiveElement();
                    if (tabId == 2 && ev.keyCode == 39) {

                    } else if (tabId == 1 && ev.keyCode == 37) {

                    } else {
                        currentFocused.click();
                    }
                } else {

                }
            })

            this.isSet = function(tabId) {
                return this.tab === tabId;
            };
        }]);
})(angular, window);