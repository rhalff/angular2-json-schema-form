import { ngPackagr } from 'ng-packagr';
import { readConfiguration } from '@angular/compiler-cli';
import * as path from 'path';

// Temporary fix, the closureCompiler doesn't like some of the jsdoc comments.
// This script exists to read the custom configuration.

const projectDir = './src/lib';

const project = path.join(
  __dirname,
  projectDir,
  'ng-package.json'
);

const config = readConfiguration(
  path.join(
    __dirname,
    projectDir,
    'tsconfig.ngc.json'
  )
);

ngPackagr()
  .forProject(project)
  .withTsConfig(config)
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
