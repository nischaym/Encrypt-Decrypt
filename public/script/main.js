require.config({
    map:{
        // Maps
    },
    paths:{
        'angular': ['http://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min'],
    },
    shim: {
        angular: {
            exports : 'angular'
        }
    }
});

require(['app', 'EncryptionService', 'mainController'], function (app) {
    app.init();
});
