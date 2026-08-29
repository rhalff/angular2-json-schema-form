// Test entry point for `@angular/build:karma` (esbuild-based). The builder
// globs `**/*.spec.ts` itself and injects the discovered files as ESM entry
// points into the Karma run — unlike the old webpack karma builder there is no
// `require.context` magic to load specs here (webpack's CommonJS-only context
// API is absent in esbuild output). This file only initializes the Angular
// test environment.
import {getTestBed} from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import 'zone.js'
import 'zone.js/testing'

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)
