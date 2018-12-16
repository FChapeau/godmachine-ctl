const fs = require("fs");
const crypto = require("crypto");
const algorithm = "aes256";
const password = "supersecret";
const deepmerge = require("deepmerge");
const Notation = require("notation");

var filename = "config";

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = Buffer.concat([cipher.update(Buffer.from(text)),cipher.final()]);
    return crypted;
}

function decrypt(buffer){
    var decipher = crypto.createDecipher(algorithm,password);
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

    var notation = new Notation(config);
    notation.set(key, value);
    config = notation.value;

    fs.writeFileSync(filename, encrypt(JSON.stringify(config)), )
}

function AddToConfigArray(key, value){
    let config = ReadConfig();
    let notation = new Notation(config);
    let configValue = notation.get(key);

    if (configValue === null || configValue === undefined){
        configValue = [];
    }

    configValue.push(value);

    notation.set(key, configValue);
    config = notation.value;

    fs.writeFileSync(filename, encrypt(JSON.stringify(config)), )
}

module.exports = {
    ReadConfig,
    CreateConfigIfNotExists,
    SetConfig,
    AddToConfigArray
};