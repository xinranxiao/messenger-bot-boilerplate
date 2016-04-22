import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import morgan from 'morgan';

import routes from './routes';

/**
 * Create the express app and attach an http server to it. Note that facebook
 * requires the webhook endpoint to be SSL-enabled. In this tutorial we use
 * Cloudflare to implement SSL, but if you have your own certificate feel feel
 * to replace the `http` package with the `https` package and use that here.
 */
const app = express();
app.server = http.createServer(app);

// Configure the body-parser (allows us to read incoming
// request bodies as JSON) and morgan (allows logging).
app.use(bodyParser.json());
app.use(morgan('dev'));

// Configure the router, which will control all the routes
// for the server.
app.use('/', routes());

// Start the server and start listening!
app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;
