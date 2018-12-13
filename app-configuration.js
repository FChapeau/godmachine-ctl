var program = require("commander");
var winston = require("winston");
const configManager = require("./configManager.js");

configManager.CreateConfigIfNotExists();

let logger = require("./logging.js").getLogger();

program
    .command("set")
    .description("Set configuration key")
    .option("-k, --key", "Configuration key to set")
    .option("-v, --value", "Configuration value to set")
    .option("-f, --force", "Force application of setting")
    .action(function(key, value, command){
        if (command.force){
            logger.info(`${key} set to: ${value}`);
            configManager.SetConfig(key, value);
        } else {
            logger.gm("Who do you think you are?")
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

program.parse(process.argv);