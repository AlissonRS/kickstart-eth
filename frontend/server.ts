"use strict";

import next from 'next';
import routes from './routes';
import { createServer } from 'http';

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, () => {
        console.log('Ready on http://localhost:3000');
    });
});