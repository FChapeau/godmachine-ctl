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

program.command("domainarchangel <domain> <archangel>")
    .description("Set archangel in charge of a specific domain")
    .action(function(domain, archangel, command){
        configManager.SetConfig(`domainarchangel.${domain}`, archangel);
        logger.info(`Set archangel in charge of domain "${domain}" as "${archangel}"`);
    });

program.command("sector")
    .description("Set sector priorities. Multiple choices must be separated by commas")
    .option("-t, --target <target>", "Sector actively targeted, comma separated")
    .option("-a, --avoided <avoided>", "Sector avoided, comma separated")
    .action(function(command){

        if (command.target){
            configManager.SetConfig(`sector.target`, command.target.split(","));
            logger.info(`Sectors actively targeted are now the following: ${command.target}`)
        }

        if (command.avoided){
            configManager.SetConfig(`sector.avoided`, command.avoided.split(","));
            logger.info(`Sectors actively avoided are now the following: ${command.avoided}`)
        }
    });

program.command("hostile")
    .description("Toggle flags to set hostility toward certain entities.")
    .usage(" Command will set all flagged entities as hostile, all non flagged entities as non-hostile.\nSo hostile -d -f would set demons and fallen as hostile, but not humans.")
    .option("-d, --demons", "Set demons as hostile")
    .option("-f, --fallen", "Set fallen as hostile")
    .option("-h, --humans", "Set humans as hostile")
    .action(function(command){
        configManager.SetConfig("hostile.demons", command.demons === true);
        logger.info(`Set demons as ${!command.demons?"not ":""}hostile`);

        configManager.SetConfig("hostile.fallen", command.fallen === true);
        logger.info(`Set fallen as ${!command.fallen?"not ":""}hostile`);

        configManager.SetConfig("hostile.humans", command.humans === true);
        logger.info(`Set humans as ${!command.humans?"not ":""}hostile`)
    });

program.command("angelcount <count>")
    .description("Set angel count")
    .action(function(count, command){
        configManager.SetConfig("angelcount", count);
        logger.info(`Set angel count to ${count}`)
    });

program.command("veil <status>")
    .description("Toggle the veil between humans and supernatural beings")
    .action(function(status, command){

        if (status !== "active" && status !== "inactive"){
            logger.error("Status must either be \"active\" or \"inactive\"")
        } else {
            configManager.SetConfig("veil", status);
            logger.info(`Veil set as ${status}`);
        }
    });

program.command("spawn")
    .description("Toggles spawn activity for flagged entities")
    .option("-d, --dalgas", "Toggle spawning of dalgas")
    .option("-s, --simulacras", "Toggle spawning of simulacras")
    .action(function(command){
        configManager.SetConfig("spawn.dalgas", command.dalgas === true);
        logger.info(`Set spawning of dalgas as ${command.dalgas === true?"active":"inactive"}`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);

        configManager.SetConfig("spawn.simulacras", command.simulacras === true);
        logger.info(`Set spawning of simulacras as ${command.simulacras === true?"active":"inactive"}`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);
    });

program.command("interact")
    .description("Toggles inteaction with specified supernatural beings")
    .option("-v, --vampires", "Toggle interaction with vampires")
    .option("-d, --demons", "Toggle interaction with demons")
    .option("-m, --mages", "Toggle interaction with mages")
    .option("-w, --werewolves", "Toggle interaction with werewolves")
    .option("-f, --fae", "Toggle interaction with faes")
    .action(function(command){
        configManager.SetConfig("interact.vampires", command.vampires === true);
        logger.info(`Set interaction with vampires as ${command.vampires === true?"active":"inactive"}`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);

        configManager.SetConfig("interact.demons", command.demons === true);
        logger.info(`Set interaction with demons as ${command.demons === true?"active":"inactive"}`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);

        configManager.SetConfig("interact.mages", command.mages === true);
        logger.info(`Set interaction with mages as ${command.mages === true?"active":"inactive"}`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);

        configManager.SetConfig("interact.werewolves", command.werewolves === true);
        logger.info(`Set interaction with werewolves as ${command.werewolves === true?"active":"inactive"}`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);

        configManager.SetConfig("interact.fae", command.fae === true);
        logger.info(`Set interaction with fae as ${command.fae === true?"active":"inactive"}`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);
    })

program.parse(process.argv);