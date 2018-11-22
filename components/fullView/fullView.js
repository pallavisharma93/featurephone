angular.module('fullView', [])
    .component('fullView', {
        templateUrl: "components/fullView/fullView.html",
        controller: ['$scope', '$location', '$rootScope', 'restService', function($scope, $location, $rootScope, restService) {

            var self = this;
            var backButtonPressed = function() {
                $scope.$apply(function() {
                    $location.path('/home');
                })
            }
            self.currentImage=null;
            self.$onInit = function() {
                self.currentImage=restService.getImageToView();
                $rootScope.$emit('changeHeader', "Image");
                $rootScope.$emit("componentActive", "fullView");
                var footer = {
                    left: "",
                    right: "Back",
                    center: null
                };
                $rootScope.$emit('changeFooter', footer);
                naviBoard.setNavigation("fullView");
                restService.setPageControl(true);
            }
            self.$onDestroy = function() {
                if (restService.getPageControl()) {
                    naviBoard.destroyNavigation("fullView");
                }
            }

            var handle = $rootScope.$on('goBackFromFullView', backButtonPressed);
            $scope.$on("$destroy", handle);

        }]
    });