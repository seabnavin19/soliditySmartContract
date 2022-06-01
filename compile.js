const path = require("path");
const fs = require("fs");
const solc = require("solc");

const counterPath = path.resolve(__dirname, "contracts", "Counter.sol");
const source = fs.readFileSync(counterPath, "utf8");

module.exports = solc.compile(source,1).contracts[":Counter"]
console.log(solc.compile(source, 1));