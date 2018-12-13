const fs = require("fs");
const crypto = require("crypto");
const algorithm = "aes256";
const password = "supersecret";

var filename = "config";

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = Buffer.concat([cipher.update(Buffer.from(text)),cipher.final()]);
    return crypted;
}

function decrypt(buffer){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec.toString();
}

function CreateConfigIfNotExists(){
    if (!fs.existsSync(filename))
        fs.writeFileSync(filename, encrypt(JSON.stringify({})));
}

function ReadConfig (){
    var decrypted = decrypt(fs.readFileSync(filename));
    var config = JSON.parse(decrypted);

    return config;
}

function SetConfig(key, value){
    let config = ReadConfig();

    var keyparts = key.split(".");

    if (keyparts.length === 1){
        config[key] = value;
    } else {
        var tomerge = keyparts.reverse().reduce(function(acc, val, index){
            if (index === 0){
                acc[val] = value;
            } else {
                var obj = {};
                obj[val] = acc;
                acc = obj
            }
            return acc;
        }, {});

        config = Object.assign(config, tomerge);
    }


    fs.writeFileSync(filename, encrypt(JSON.stringify(config)), )
}

module.exports = {
    ReadConfig,
    CreateConfigIfNotExists,
    SetConfig
};