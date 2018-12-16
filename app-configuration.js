let program = require("commander");
const ominous = require("./ominous.js");
const configManager = require("./configManager.js");
const fs = require("fs");

configManager.CreateConfigIfNotExists();

let logger = require("./logging.js").getLogger();

// program
//     .command("set")
//     .description("Set configuration key")
//     .option("-k, --key <key>", "Configuration key to set")
//     .option("-v, --value <key>", "Configuration value to set")
//     .option("-f, --force", "Force application of setting")
//     .action(function(command){
//         if (!command.key){
//             logger.error(`-k argument required`);
//         }
//
//         if (!command.value){
//             logger.error(`-v argument required`)
//         }
//
//         if (command.key && command.value){
//             if (command.force){
//                 logger.info(`${command.key} set to: ${command.value}`);
//                 configManager.SetConfig(command.key, command.value);
//             } else {
//                 logger.gm(ominous.getRandomUnauthorizedMessage())
//             }
//         }
//
//     });

program
    .command("show")
    .description("Show current configuration")
    .action(function(command){
        logger.info(JSON.stringify(configManager.ReadConfig(), null, 2))
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
        let valid = true;

        const domains = [
            "hostiles",
            "friendlies",
            "neutrals",
            "targets",
            "avoided",
            "tools",
            "anomalies",
            "repairs",
            "updates",
            "construction"
        ];

        if (!domains.includes(domain.toLowerCase())){
            logger.error(`Domain must be one of [${domains}]`);
            valid = false;
        }

        if (valid){
            configManager.SetConfig(`domainarchangel.${domain}`, archangel);
            logger.info(`Set archangel in charge of domain "${domain}" as "${archangel}"`);
        }

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
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);

        configManager.SetConfig("hostile.fallen", command.fallen === true);
        logger.info(`Set fallen as ${!command.fallen?"not ":""}hostile`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);


        configManager.SetConfig("hostile.humans", command.humans === true);
        logger.info(`Set humans as ${!command.humans?"not ":""}hostile`);
        ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 3, logger);

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
    });

program.command("consider <entity> <relation>")
    .description("Set God Machine to have specified relation with specified entity.")
    .action(function(entity, relation, command){
        let valid = true;

        const acceptedEntities = [
            "stigmatics",
            "cryptids"
        ];

        const acceptedRelations = [
            "hostiles",
            "friendlies",
            "neutral",
            "targets",
            "avoided",
            "tools"
        ];

        if (!acceptedRelations.includes(relation.toLowerCase())){
            logger.error(`Invalid relation, must be one of [${acceptedRelations}]`);
            valid = false;
        }

        if (!acceptedEntities.includes(entity.toLowerCase())){
            logger.error(`Invalid entity, must be one of [${acceptedEntities}]`);
            valid = false;
        }

        if (valid) {
            configManager.SetConfig(`consider.${entity}`, relation);
            logger.info(`${entity} now considered as ${relation}`)
            ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 1, logger);

        }

    });

program.command("energydistribution <setting>")
    .description("Set matrix energy distribution to a specified setting")
    .action(function(setting, command){
        let valid = true;
        const validSettings = [
            "programs",
            "infrastructures",
            "cults",
            "hardware"
        ];

        if (!validSettings.includes(setting.toLowerCase())){
            logger.error(`Invalid setting, must be one of [${validSettings}]`)
        }

        if (valid){
            configManager.SetConfig(`energydistribution`, setting);
            logger.info(`Set matrix energy distribution setting to ${setting}`);
            ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 1, logger);

        }
    });

program.command("hunterawakeningprotocol <value>")
    .description("Set percentage of chance of the hunter awakening protocol to activate")
    .action(function(value, command){
        let valid = true;
        let valueNum = Number(value);

        if (isNaN(valueNum)){
            valid = false;
            logger.error("Entered value was not a number")
        }

        if (valid){
            configManager.SetConfig("hunterawakeningprotocol", valueNum);
            logger.info(`Set hunter awakening protocol chance to ${value}%`);
            ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 1, logger);

        }

    });

program.command("infrastructures")
    .description("Sets priority infrastructure and infrastructure priorities")
    .option("-p, --priorityinfrastructure <priority>", "Sets priority infrastructure")
    .option("-i, --infrastructurepriority <infrastructure>", "Sets infrastrcuture priority")
    .action(function(command){
        const validPriorities = [
            "advancement",
            "creation",
            "cult",
            "administration",
            "protection",
            "factory"
        ];
        let valid = true;

        if (command.infrastructurepriority){
            if (!validPriorities.includes(command.infrastructurepriority.toLowerCase())){
                logger.error(`Invalid infrastructure priority, must be one of [${validPriorities}]`)
                valid = false;
            }

            if (valid){
                configManager.SetConfig("infrastructures.infrastrcuturepriority", command.infrastructurepriority);
                logger.info(`Set infrastructure priority to ${command.infrastructurepriority}`)
            }
        }

        if (command.priorityinfrastructure){
            configManager.SetConfig("infrastructures.priorityinfrastructures", command.priorityinfrastructure);
            logger.info(`Set priority infrastructures to ${command.priorityinfrastructure}`)
        } else {
            logger.error(`Priority infrastructure not specified`)
        }
    });

program.command("humancontrol <value>")
    .description("Set degree of human control, between 1 and 5 inclusively.")
    .action(function(value, command){
        let valid = true;
        let valueNum = Number(value);

        if (isNaN(valueNum)){
            logger.error("Value is not a number");
            valid = false;
        }

        if (!(1 <= value && value<= 5)) {
            logger.error("Value must be between 1 and 5");
            valid = false;
        }

        if (valid){
            configManager.SetConfig("humancontrol", valueNum);
        }
    });

program.command("matrixcreate")
    .description("Create occult matrix")
    .option("-s, --sector <sector>", "Set sector hosting the matrix")
    .option("-p, --purpose <purpose>", "Set matrix purpose")
    .option("-a, --agenda <agenda>", "Set matrix agenda")
    .option("-i, --incarnation <incarnation>", "Set matrix incarnation")
    .action(function(command){
        let valid = true;

        const validPurposes = [
            "weaponry",
            "maintenance",
            "construction",
            "evolution"
        ];

        const validAgendas = [
            "temptor",
            "inquisitor",
            "integrator",
            "saboteur"
        ];

        const validIncarnations = [
            "guardian",
            "messanger",
            "destroyer",
            "psychopomp"
        ];

        if (!command.sector){
            valid = false;
            logger.error("Sector not specified")
        }

        if (command.purpose){
            if (!validPurposes.includes(command.purpose.toLowerCase())){
                logger.error(`Invalid purpose, mut be one of [${validPurposes}]`);
                valid = false;
            }
        } else {
            logger.error("Purpose not specified");
        }

        if (command.agenda){
            if (!validAgendas.includes(command.agenda.toLowerCase())){
                logger.error(`Invalid agenda, mut be one of [${validAgendas}]`);
                valid = false;
            }
        } else {
            logger.error("Agenda not specified");
        }

        if (command.incarnation){
            if (!validIncarnations.includes(command.incarnation.toLowerCase())){
                logger.error(`Invalid incarnation, mut be one of [${validIncarnations}]`);
                valid = false;
            }
        } else {
            logger.error("Incarnation not specified");
        }

        if (valid){
            var toadd = {
                sector: command.sector,
                purpose: command.purpose,
                agenda: command.agenda,
                incarnation: command.incarnation
            };

            configManager.AddToConfigArray("matrix", toadd);
            logger.info(`Added following matrix:\n${toadd}`);
            ominous.randomlyPrintMessage(ominous.getRandomChatterMessage(), 2, logger);
        }
    });

program.parse(process.argv);