const fs = require("fs");
const bcrypt = require("bcrypt");
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

    config[key] = value;

    fs.writeFileSync(filename, encrypt(JSON.stringify(config)), )
}

module.exports = {
    ReadConfig,
    CreateConfigIfNotExists,
    SetConfig
};