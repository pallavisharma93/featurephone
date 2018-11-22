angular.module('home', ['restAPIManager'])
    .component('home', {
        templateUrl: "components/tabOne/tabOne.html",
        controller: ['$scope', '$location', '$rootScope', 'restService', function($scope, $location, $rootScope, restService) {

            var self = this;
            self.routeToAbout = function() {
                $location.path('/tabTwo');
            }
            var softleftPressed = function() {}
            var softrightPressed = function() {}
            var onPageControl = restService.getPageControl();
            document.getElementById("home").addEventListener("keydown", function(ev) {
                var currentFocused = naviBoard.getActiveElement();
                if (ev.keyCode == 38) {
                    if (currentFocused.classList.contains("slide")) {
                        naviBoard.destroyNavigation("home");
                        naviBoard.setNavigation("tabs");
                        restService.setPageControl(false);
                    }
                }
            })
            self.focusedCarousel=function(index){
                document.getElementById("dots").children[index].style.backgroundColor ="#24397a";
                if(index>=1){
                    document.getElementById("dots").children[index-1].style.backgroundColor ="#bbb";     
                }

                if(index<self.images.length-1){
                    document.getElementById("dots").children[index+1].style.backgroundColor ="#bbb";     
                }

            }
            self.imageClicked = function(address) {
                restService.setImageToView(address);
                $location.path('/fullView');
            }

            self.images = ["assets/img/img1.jpg", "assets/img/img2.jpg", "assets/img/img3.jpg"];
            self.$onInit = function() {
                $('#loader').hide();
                $rootScope.$emit("componentActive", "home");
                $rootScope.$emit('changeHeader', "Carousel");
                var footer = {
                    left: "SoftLeft",
                    right: "SoftRight",
                    center: null
                };
                $rootScope.$emit('changeFooter', footer);
                naviBoard.setNavigation("home");
                restService.setPageControl(true);
            }

            self.$onDestroy = function() {
                if (restService.getPageControl()) {
                    naviBoard.destroyNavigation("home");
                }
            }

            
            var handleleft = $rootScope.$on('home_softleft', softleftPressed);
            $scope.$on("$destroy", handleleft);

            var handleright = $rootScope.$on('home_softright', softrightPressed);
            $scope.$on("$destroy", handleright);
        }]
    });