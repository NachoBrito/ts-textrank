yarn tsc
cp -f .npmignore ./dist/.npmignore
cp -f package.json ./dist/package.json
yarn publish ./dist