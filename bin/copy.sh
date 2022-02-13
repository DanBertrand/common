echo \"Copying package.json, index.ts, tsconfig, .vscode/ and .eslintrc to dist folder ...\"
cp -a package.json dist/
cp -a index.ts dist/
cp -a merge.js dist/
cp -a tsconfig.json dist/
cp -a .vscode dist/
cp -a .eslintrc.json dist/
cd dist 
if [ ! -d bin ]; then
    mkdir bin 
fi
cd ..
cp -a merge.sh dist/bin
