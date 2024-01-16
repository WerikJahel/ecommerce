import express, { Application } from "express";
import { apiv1Router } from "./rest/api.v1";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { customMorgan } from "./middlewares/custom-morgan.middleware";
import { logger } from "@shared/helpers/logger.winston";
import { errorLogger } from "./middlewares/error-logger.middleware";
import { errorResponder } from "./middlewares/error-responser.middleware";
import { invalidPath } from "./middlewares/invalid-path.middleware";
import cors from "cors";
import { swaggerDocumentation } from "./customizers/swagger-documentation.customizer";

const createExpressApplication = async (): Promise<Application> => {
    const app: Application = express();
    app.disable('x-powered-by');

    //Middlewares Integrados (Built-in)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Middlewares de Terceiros
    app.use(helmet());
    app.use(compression());
    app.use(cors({
        origin: ['http://localhost:5400', 'http://127.0.0.1:5400'],
        optionsSuccessStatus: 200
    }));

    //Middleware Customizados
    app.use(customMorgan);

    //Middlewares de Rotas
    app.use('/api/v1', apiv1Router);
    //Customizadores
    swaggerDocumentation(app);

    //Middleware de Tratamento de Erros (Error Handling)
    app.use(invalidPath);
    app.use(errorLogger);
    app.use(errorResponder);

    return app;
}

export { createExpressApplication }