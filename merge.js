const fs = require("fs");
const path = require("path");
const absolutePath = path.dirname(__dirname);

const getLocalPackageJsonPath = (absolutePath) => {
  const dirs = absolutePath.split("/");
  const lastIncludedIndex = dirs.indexOf("node_modules") - 1;
  let localPackagePath = "";
  // TO IMPROVE  no need loop /
  dirs.some((dir, ix) => {
    localPackagePath += `${dir}/`;
    return ix === lastIncludedIndex;
  });

  return localPackagePath + "package.json";
};

const packageJsonPath = getLocalPackageJsonPath(absolutePath);
console.log("packageJsonPath", packageJsonPath);

if (!fs.existsSync(packageJsonPath)) return;

const sharedPackage = require("./package.json");
const localPackage = require(packageJsonPath);

// Empty or create the peerDependencies
localPackage.peerDependencies = {};

// Merge dependencies to the the locale package.json peerDependencies when the package is downloaded
Object.assign(localPackage.dependencies, sharedPackage.dependencies);

// Create empty devDependencies if doesnt exist
if (!localPackage.devDependencies) {
  localPackage.devDependencies = {};
}

// Merge devDependencies to the the locale package.json devDependencies when the package is downloaded
// const pattern = /\b(eslint)\b/g; // <-- If package belong to eslint, we want to import it to the other packages.json
for (const [key, value] of Object.entries(sharedPackage.devDependencies)) {
  if (key.includes("eslint") || key.includes("prettier")) {
    localPackage.devDependencies[key] = value;
  }
}

// Write the file with the modifications
fs.writeFileSync(packageJsonPath, JSON.stringify(localPackage, null, 2));

// prettier condig + extend eslint
//  name of the plugin

// argument on shell script pass (not using path anymore )
