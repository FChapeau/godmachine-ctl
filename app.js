var program = require("commander");

program.version("0.7.3")
    .option("-f, --force", "Force")
    .parse(process.argv);

console.log(program.force);