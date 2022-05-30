const path = require("path");
const fs = require("fs");
const solc = require("solc");

const piggyBankPath = path.resolve(__dirname, "contract", "piggy_bank.sol");
const source = fs.readFileSync(piggyBankPath, "utf8");

//console.log(solc.compile(source, 1))
module.exports = solc.compile(source, 1).contracts[":piggy_bank"];