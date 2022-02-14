const fs = require("fs");
const path = require("path");
const absolutePath = path.dirname(__dirname);

const getLocalPackageJsonPath = (absolutePath) => {
  const dirs = absolutePath.split("/");
  const lastIncludedDir = dirs[dirs.indexOf("node_modules") - 1]; // last included directory; directory BEFORE node_modules
  let localPackagePath = "";
  dirs.some((dir) => {
    localPackagePath += `${dir}`;
    return dir === lastIncludedDir;
  });

  return localPackagePath + "/package.json";
};

const packageJsonPath = getLocalPackageJsonPath(absolutePath);
console.log("packageJsonPath", packageJsonPath);

if (!fs.existsSync(packageJsonPath)) return;

const sharedPackage = require("./package.json");
const localPackage = require(packageJsonPath);

// Empty or create the peerDependencies
localPackage.peerDependencies = {};

// Merge dependencies to the the locale package.json peerDependencies when the package is downloaded
Object.assign(localPackage.peerDependencies, sharedPackage.dependencies);

// Create empty devDependencies if doesnt exist
if (!localPackage.devDependencies) {
  localPackage.devDependencies = {};
}

// Merge devDependencies to the the locale package.json devDependencies when the package is downloaded
// const pattern = /\b(eslint)\b/g; // <-- If package belong to eslint, we want to import it to the other packages.json
for (const [key, value] of Object.entries(sharedPackage.devDependencies)) {
  if (key.includes("eslint")) {
    localPackage.devDependencies[key] = value;
  }
}

// Write the file with the modifications
fs.writeFileSync(packageJsonPath, JSON.stringify(localPackage, null, 2));

// prettier condig + extend eslint
//  name of the plugin

// common need to be build and hosted on Github
//  then get this repo with git URL + tag and try to import

// argument on shell script pass (not using path anymore )
