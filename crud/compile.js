const path = require("path");
const fs = require("fs");
const solc = require("solc");

const registerPath = path.resolve(__dirname, "contracts", "Register.sol");
const source = fs.readFileSync(registerPath, "utf8");

module.exports = solc.compile(source,1).contracts[":Register"]
// console.log(solc.compile(source, 1));

