angular.module('restAPIManager', [])
    .service('restService',['$http','Constants',function($http,Constants) {

        var controlOnTabs=false;

        this.getPageControl=function(){
        	return controlOnTabs;
        }

        this.setPageControl=function(val){
        	controlOnTabs=val;
        }

        var imageToOpenAddress="";

        this.setImageToView=function(imageAddress){
        	imageToOpenAddress=imageAddress;
        }

        this.getImageToView=function(){
        	return imageToOpenAddress;
        }
    }]);