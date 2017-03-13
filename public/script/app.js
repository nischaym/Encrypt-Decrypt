(function(){

    define(['angular'], function (angular) {
        let app = angular.module('pingup', []);
        app.init = function () {
            angular.bootstrap(document, ['pingup']);
        };
        return app;
    });
})();

