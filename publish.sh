yarn tsc
cp -f .npmignore ./dist/.npmignore
cp -f package.json ./dist/package.json
cp -f README.md ./dist/README.md
yarn publish ./dist