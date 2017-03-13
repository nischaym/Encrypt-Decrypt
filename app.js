(function(){

    define(['express', 'body-parser', 'node-rsa'], function (express, bodyParser, NodeRSA) {
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        const myDecrypter = new NodeRSA({b: 512});
        myDecrypter.setOptions({encryptionScheme: 'pkcs1'});

        // configure a public directory to host static content
        app.use(express.static('./public'));

        const ipaddress = '127.0.0.1';
        const port      = 5656;

        // server initialization
        app.listen(port, ipaddress);

        // serving the public key
        app.get('/getPublicKey/', function(req, res) {
            const publicKeyJson = {"Key": ""};
            console.log(myDecrypter.exportKey('public'));
            publicKeyJson.Key = myDecrypter.exportKey('public');
            res.json(JSON.stringify(publicKeyJson));
        });

        // receives encrypted data
        // decrypts data
        app.post('/sendEncryptedData/', function(req, res) {
            console.log(`got the Encrypted data ${req.body.encrypted}`);
            const EncryptedData = req.body.encrypted;
            const clearMessage = myDecrypter.decrypt(EncryptedData, 'utf8');
            console.log(clearMessage);
            res.send(clearMessage);
        });
        return app;
    });
})();