import { inserirCategoriaUseCase, recuperarCategoriaPorIdUseCase, recuperarTodasCategoriasUseCase } from "@modules/catalogo/application/use-case";
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id.express.controller";
import { RecuperarTodasCategoriaExpressController } from "./recuperar-todas-categorias.express.controller";
import { InserirCategoriaExpressController } from "./inserir-categoria.express.controller";

const recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCase);
const recuperarTodasCategoriasController = new RecuperarTodasCategoriaExpressController(recuperarTodasCategoriasUseCase);
const inserirCategoriaController = new InserirCategoriaExpressController(inserirCategoriaUseCase);

export {
    recuperarCategoriaPorIdController,
    recuperarTodasCategoriasController,
    inserirCategoriaController
}