const fs = require("fs");
// console.log(process);
console.log(process.argv[2]);

const sharedPackage = require("./package.json");
const localPackage = require("../../../package.json");

// Create empty peerDependencies if doesnt exist
if (!localPackage.peerDependencies) {
  localPackage.peerDependencies = {};
}

// Merge dependencies to the the locale package.json peerDependencies when the package is downloaded
Object.assign(localPackage.peerDependencies, sharedPackage.dependencies);

// Create empty devDependencies if doesnt exist
if (!localPackage.devDependencies) {
  localPackage.devDependencies = {};
}

// Merge devDependencies to the the locale package.json devDependencies when the package is downloaded
// const pattern = /\b(eslint)\b/g; // <-- If package belong to eslint, we want to import it to the other packages.json
for (const [key, value] of Object.entries(sharedPackage.devDependencies)) {
  console.log("Value", value);
  if (key.includes("eslint")) {
    localPackage.devDependencies[key] = value;
  }
}

// Write the file with the modifications
fs.writeFileSync(
  "../../../package.json",
  JSON.stringify(localPackage, null, 2)
);

// prettier condig + extend eslint
//  name of the plugin

// common need to be build and hosted on Github
//  then get this repo with git URL + tag and try to import

// argument on shell script pass (not using path anymore )
