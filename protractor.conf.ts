import { Config, browser } from 'protractor';

export let config: Config = {
  framework: 'mocha',
  mochaOpts: {
    reporter: "spec",
    timeout: 500000
  },
  capabilities: {
    browserName: 'chrome'
  },
  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    all: 'test/client/e2e/tests/**/*.js'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true,
  rootElement: 'ts-root',
  allScriptsTimeout: 5000000,
  useAllAngular2AppRoots: true

};