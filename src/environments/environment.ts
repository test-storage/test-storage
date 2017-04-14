// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  name: 'development',
  app: {
    port: {
      http: 3000,
      https: 8443
    },
    httpsEnabled: false,
    privateKey: 'sslcert/server.key',
    certificate: 'sslcert/server.crt'
  },
  db: {
    name: 'test-storage',
    path: 'mongodb://localhost',
    user: 'admin',
    password: 'admin',
    port: 27017
  },
  errorHandlerOptions: {
    dumpExceptions: true,
    showStack: true
  },
  logger: {
    api: 'logs/api.log',
    exception: 'logs/exceptions.log'
  }
};
