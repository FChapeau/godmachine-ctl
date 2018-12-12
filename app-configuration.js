var program = require("commander");
var winston = require("winston");

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

program.command("set")
    .option("-k, --key", "Configuration key to set")
    .option("-v, --value", "Configuration value to set")
    .action(function(key, value, command){
        logger.info(`${key} set to: ${value}`)
    });

program.parse(process.argv);