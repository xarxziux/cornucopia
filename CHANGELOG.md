# Cornucopia Change Log

## 2016-01-19

### Changed
- build.sh: fixed typo that was copying the compiled file to the bin/ directory instead of the TypeScript file.
- build.sh: changed commit logic so that it now automatically creates a git tag and publishes to NPM (untested).

### Added
- Added basic tests
- Added getBlankArray() and getSequentialArray() functions.

## 2016-01-12

### Added
- Added arrToCSV() function.

## 2016-01-12

### Added
- build.sh: fixed typo that was preventing the build number from incrementing.
- Added main source file and converted the functions to TypeScript.
- Initial commit.