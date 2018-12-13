const bcrypt = require("bcrypt");
console.log(bcrypt.hashSync("godmachine", bcrypt.genSaltSync(10)))