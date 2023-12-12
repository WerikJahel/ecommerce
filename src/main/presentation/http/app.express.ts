import compression from "compression";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { apiv1Router } from "./rest/api.v1";
import { customMorganMiddleware } from "./middlewares/custon-morgan.middleware";

const createExpressApplication = async (): Promise<Application> => {
    const app: Application = express();
    app.disable('x-powered-by');
    app.use(compression());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(customMorganMiddleware);
    app.use('/api/v1', apiv1Router);
    return app;
};

export { createExpressApplication };
