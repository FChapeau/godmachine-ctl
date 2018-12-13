let program = require("commander");
const ominous = require("./ominous.js");
const configManager = require("./configManager.js");
const fs = require("fs");

configManager.CreateConfigIfNotExists();

let logger = require("./logging.js").getLogger();

program
    .command("set")
    .description("Set configuration key")
    .option("-k, --key <key>", "Configuration key to set")
    .option("-v, --value <key>", "Configuration value to set")
    .option("-f, --force", "Force application of setting")
    .action(function(command){
        if (command.force){
            logger.info(`${command.key} set to: ${command.value}`);
            configManager.SetConfig(command.key, command.value);
        } else {
            logger.gm(ominous.getRandomUnauthorizedMessage())
        }
    });

program
    .command("show")
    .description("Show current configuration")
    .action(function(command){
        logger.info(JSON.stringify(configManager.ReadConfig(), null, 2))
    });

program
    .command("listkeys")
    .description("List possible configuration keys")
    .option("-r, --recentlyaltered", "List only recently altered keys")
    .action(function(recentlyaltered, command){

    });

program
    .command("export <destination>")
    .description("Export configuration to text format")
    .action(async function(destination, command){

        var password = await require("password-prompt")("Password: ");

        if (password === "atlantislives"){
            fs.writeFileSync(destination, JSON.stringify(configManager.ReadConfig(), null, 2))
        } else {
            logger.gm(ominous.getRandomUnauthorizedMessage());
        }
    });

program.parse(process.argv);