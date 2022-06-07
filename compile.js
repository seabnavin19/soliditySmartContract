const path = require("path");
const fs = require("fs");
const solc = require("solc");

const projectPath = path.resolve(__dirname, "contracts", "Project.sol");
const source = fs.readFileSync(projectPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Project"];