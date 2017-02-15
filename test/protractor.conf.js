"use strict";
exports.config = {
    framework: 'mocha',
    mochaOpts: {
        reporter: "spec",
        timeout: 500000
    },
    capabilities: {
        browserName: 'firefox' // note: chrome is crashed in Travis CI
    },
    // Spec patterns are relative to the location of the spec file. They may
    // include glob patterns.
    suites: {
        all: 'client/e2e/tests/**/*.js'
    },
    // You could set no globals to true to avoid jQuery '$' and protractor '$'
    // collisions on the global namespace.
    noGlobals: true,
    rootElement: 'ts-root',
    allScriptsTimeout: 5000000,
    useAllAngular2AppRoots: true
};
//# sourceMappingURL=protractor.conf.js.map