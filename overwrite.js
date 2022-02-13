const fs = require("fs");

// Overwrite the scripts in package.json
const packageJson = require("./dist/package.json");

//  Removing previous scripts
packageJson.scripts = {};

// Add preinstall script to be trigger when the package is download
Object.assign(packageJson.scripts, {
  preinstall: "./bin/merge.sh",
});

fs.writeFileSync("dist/package.json", JSON.stringify(packageJson, null, 2));
