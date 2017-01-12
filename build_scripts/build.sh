#!/bin/bash

set -e

baseFile="./src/0_base/cornucopia.ts"
tscFile="./src/1_tsc/cornucopia.es3.js"
ugFile="./src/2_uglified/cornucopia.min.js"
outDir="./bin/"

buildNum="$(<build_number)"
((buildNum++))
echo -n ${buildNum} > build_number

if [ ${baseFile} -ot ${outFile} ]
then
    echo Source file is up-to-date.
    echo
    break
fi

tsc -o ${tscFile}
jshint ${tscFile}
uglifyjs ${bfFile} -c -m -o ${ugFile}
cp -v ${tscFile} ${outDir}
cp -v ${ugFile} ${outDir}

echo 
echo Compilation successful.  Please enter a commit message.
echo An empty string skips this step:
read -p "> " commitMsg

if [ -n "${commitMsg}" ]
then
versionNum="$(npm list --depth=0 | \
    grep cornucopia | \
    grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
commitStr="${versionNum}.${buildNum}: ${commitMsg}"
npm --no-git-tag-version version patch
git add -A
git commit -m "${commitStr}"

