const winston = require("winston");

const gmformat = winston.format.printf(info => {
    return `${info.timestamp} [${info.level}]: ${info.message}`
});

const customLevels = {
    levels: {
        gm: 0,
        error: 1,
        warn: 2,
        info: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        gm: "black bold redBG",
        error: "red",
        warn: "yellow",
        info: "green",
        verbose: "cyan",
        debug: "blue",
        silly: "magenta"
    }
};

function getLogger(){
    const logger =  winston.createLogger({
        level: "info",
        levels: customLevels.levels,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            gmformat
        ),
        transports: [
            new winston.transports.Console()
        ]
    });

    winston.addColors(customLevels.colors);

    return logger;
}

module.exports = {
    getLogger
};