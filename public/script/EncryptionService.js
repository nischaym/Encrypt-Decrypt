(function () {
    define(['app'], function(app) {
        app.factory('EncryptionService', EncryptionService);

        function EncryptionService($http,$q) {

            return {
                getPublicKey,
                sendEncryptedData
            };

            function getPublicKey(){

                const deferred = $q.defer();
                $http.get("/getPublicKey/")
                    .success(function(response){
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }

            function sendEncryptedData(data){

                const deferred = $q.defer();
                $http.post("/sendEncryptedData/", data)
                    .success(function(response){
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }
        }
    });
})();

