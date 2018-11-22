angular.module('tabTwo', [])
.component('tabTwo', {
        templateUrl: "components/tabTwo/tabTwo.html",
        controller: ['$scope', '$location', '$rootScope', 'restService', function($scope, $location, $rootScope, restService) {

            var self = this;
            var backButtonPressed = function() {
                $scope.$apply(function() {
                    $location.path('/home');
                })
            }

           self.checkFocus=function(ev,index) {
                var currentFocused = naviBoard.getActiveElement();
                if (ev.keyCode == 38) {
                    if (index==0 || index == 1) {
                        naviBoard.destroyNavigation("tabTwo");
                        naviBoard.setNavigation("tabs");
                        restService.setPageControl(false);
                    }
                }
            }
            self.images = ["assets/img/img1.jpg", "assets/img/img2.jpg", "assets/img/img3.jpg", "assets/img/img4.jpg"];

            self.$onInit = function() {
                $rootScope.$emit('changeHeader', "Grid");
                $rootScope.$emit("componentActive", "tabTwo");
                var footer = {
                    left: "",
                    right: "",
                    center: null
                };
                $rootScope.$emit('changeFooter', footer);
                naviBoard.setNavigation("tabTwo");
                restService.setPageControl(true);
            }
            self.$onDestroy = function() {
                if (restService.getPageControl()) {
                    naviBoard.destroyNavigation("tabTwo");
                }
            }

            var handle = $rootScope.$on('goBackFromAbout', backButtonPressed);
            $scope.$on("$destroy", handle);

        }]
    })