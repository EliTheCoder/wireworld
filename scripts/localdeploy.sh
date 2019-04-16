#!/bin/sh

cd ~/Desktop/Projects/wireworld
npx tsc
lessc src/client/styles.less > built/client/styles.css
cp src/server.key built
cp src/server.crt built
cp src/client/index.html built/client
cp -r node_modules built
cd ~/Desktop/Projects/wireworld/built