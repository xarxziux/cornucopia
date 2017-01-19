#!/bin/bash

# Stop on error
set -e

# Increment the build number even if the
# rest of the script fails to complete.
echo Incrementing the build number...
buildNum="$(<build_number)"
buildNum=$((buildNum + 1))
echo -n "${buildNum}" > build_number

# Define the file and directory names
baseFile="./src/0_base/cornucopia.ts"
tscFile="./src/1_tsc/cornucopia.js"
ugFile="./src/2_uglified/cornucopia.min.js"
outDir="./bin/"

# If the main file has already been compiled then exit
if test "${baseFile}" -ot "${ugFile}"
then
    echo Source file is up-to-date.
    echo
    exit 0
fi

# Compile the source and update the bin/ directory
echo Success.  Compiling TypeScript...
tsc
echo Success.  Checking syntax...
jshint "${tscFile}"
echo Success.  Minifying code...
uglifyjs "${tscFile}" -c -m -o "${ugFile}"
echo Success.  Running Mocha tests...
npm test
echo Success.  Updating bin/ directory...
cp -v "${baseFile}" "${outDir}"
cp -v "${ugFile}" "${outDir}"

# Get a commit message (optional)
echo 
echo Compilation successful.  Please enter a commit message.
echo This will add a git tag and publish to NPM.
echo Enter an empty string to skip this step.
echo Have you updated the change log?
read -p "> " commitMsg

# If we have a commit message, update the version number and commit
if test -n "${commitMsg}"
then
    versionNum="$(npm list --depth=0 | \
        grep cornucopia | \
        grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
    commitStr="${versionNum}.${buildNum}: ${commitMsg}"
    npm version patch
    git add -A
    git commit -m "${commitStr}"
    npm publish
fi

echo Compilation successful

