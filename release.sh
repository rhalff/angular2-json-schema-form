#!/usr/bin/env bash

# fbpx-ui consumes these from the private registry, so publish there — not to
# npmjs. build.sh is the working build (the package.json `build` script still
# points at a build.ts that no longer exists).
PUBLISH="npm publish --access=public --registry https://packages.fbpx.io"

cd "$(dirname "$0")"

./build.sh

cd ./dist/@ngsf

cd common
$PUBLISH

cd ../widget-library
$PUBLISH

cd ../no-framework
$PUBLISH

cd ../bootstrap3-framework
$PUBLISH

cd ../bootstrap4-framework
$PUBLISH

cd ../bootstrap5-framework
$PUBLISH

cd ../material-design-framework
$PUBLISH

cd ../json-schema-form
$PUBLISH
