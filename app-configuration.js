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
        if (!command.key){
            logger.error(`-k argument required`);
        }

        if (!command.value){
            logger.error(`-v argument required`)
        }

        if (command.key && command.value){
            if (command.force){
                logger.info(`${command.key} set to: ${command.value}`);
                configManager.SetConfig(command.key, command.value);
            } else {
                logger.gm(ominous.getRandomUnauthorizedMessage())
            }
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

program.command("firewall <sector>")
    .description("Set firewall status in [sector]")
    .option("-a, --active", "Set status as active")
    .option("-i, --inactive", "Set status as inactive")
    .action(function(sector, command){
        var value = null;
        if (command.active){
            value = true;
        } else if (command.inactive){
            value = false;
        }

        if (command.active && command.inactive || !command.active && !command.inactive){
            logger.error("Please use only one of the -a or -i flags")
        }

        if (value != null){
            configManager.SetConfig(`firewall.${sector}`, value);
            logger.info(`Set firewall in sector "${sector}" to ${value?"Active":"Inactive"}`)
        }
    });

program.parse(process.argv);