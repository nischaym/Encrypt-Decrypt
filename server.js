(function(){

    const requirejs = require('requirejs');

    requirejs.config({
        nodeRequire: require
    });

    requirejs(['app'],function(app) {
        console.log('server running');
    });

})();

