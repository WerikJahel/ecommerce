import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exceptions/categoria.application.exception";
import { DeletarCategoriaPorIdUseCase } from "@modules/catalogo/application/use-case/deletar-categoria/deletar-categoria.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class DeletarCatogoriaPorIdExpressController extends ExpressController {

    private _deletarCategoriaPorIdUseCase: DeletarCategoriaPorIdUseCase;

    constructor(deletarCategoriaPorIdUseCase: DeletarCategoriaPorIdUseCase) {
        super();
        this._deletarCategoriaPorIdUseCase = deletarCategoriaPorIdUseCase;
    }

    async deletar(request: Request, response: Response, next: NextFunction) {
        try {

        } catch (error) {
            if (error instanceof CategoriaApplicationExceptions.CategoriaNaoEncontrada) {
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }
}

export { DeletarCatogoriaPorIdExpressController };

