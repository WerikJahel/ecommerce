import http from 'node:http';

const createHTTPServer = async (): Promise<http.Server> => {
    const httpServer: http.Server = http.createServer(
        function (request, response) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('<html><body><p>Hello, Servidor Web com Node.js</p></body></html>');
            response.end();
        }
    );
    return httpServer;
};

export { createHTTPServer }

/*
import express, { Application } from 'express';
import http from 'node:http';
import { apiv1Router } from './rest/api.v1';
import morgan from 'morgan';

const app: Application = express();

export const createHTTPServer = async (): Promise<http.Server> => {

    app.disable("x-powered-by");
    app.use(express.json());
    app.use(morgan('tiny'));

    app.use('/api/v1', apiv1Router);

    const httpServer: http.Server = http.createServer(app);

    return httpServer;
}
*/