(function () {

    define(['app'], function(app) {
        app.controller('MainController', MainController);

        function MainController(EncryptionService) {

            const vm = this;
            vm.input = '';
            vm.encrypt = encrypt;
            vm.publicKey = '';

            const myEncrypter = new JSEncrypt();

            function init() {
                // get public key from server
                EncryptionService.getPublicKey().then(function (response) {
                    vm.publicKey = JSON.parse(response).Key;
                    console.log(vm.publicKey);
                    setKey();
                });
            }

            function setKey() {
                myEncrypter.setPublicKey(vm.publicKey);
            }

            // Initializing
            init();

            function encrypt() {

                let encrypted = myEncrypter.encrypt(vm.input);
                console.log('Encrypted String');
                console.log(encrypted);
                EncryptionService
                    .sendEncryptedData({encrypted})
                    .then(function (response) {
                        if(response == vm.input) {
                            alert('Great Success');
                        } else {
                            alert('Oops Something went wrong...!!');
                        }
                });
            }
        }
    });
})();