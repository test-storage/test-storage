import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as config from 'config';

import { Server } from './Server';

const app = new Server().app;
let server;

if (config.get('app.httpsEnabled') === false) {
    setupHttpServer();
} else {
    setupHttpsServer();
}


function setupHttpServer() {
    app.set('port', process.env.PORT || config.get('app.port.http'));

    server = app.listen(app.get('port'), function () {
        console.log(`HTTP server listening on port ${server.address().port} in ${app.settings.env} mode`);
    });
}

function setupHttpsServer() {

    const options = {
        key: fs.readFileSync(config.get('app.privateKey'), 'utf8'),
        cert: fs.readFileSync(config.get('app.certificate'), 'utf8')
    };

    app.set('port', process.env.PORT || config.get('app.port.https'));

    server = https.createServer(options, app).listen(app.get('port'), function () {
        console.log(`HTTPS server listening on port ${server.address().port} in ${app.settings.env} mode`);
    });
}
export { server };
