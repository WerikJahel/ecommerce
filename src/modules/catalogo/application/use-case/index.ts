import { categoriaRepositorio } from "@modules/catalogo/infra/database";
import { RecuperarcategoriaPorIdUseCase } from "./recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";
import { RecuperarTodasCategoriasUseCase } from "./recuperar-todas-categorias/recuperar-todas-categorias.use-case";

const recuperarCategoriaPorIdUseCase = new RecuperarcategoriaPorIdUseCase(categoriaRepositorio);
const recuperarTodasCategoriasUseCase = new RecuperarTodasCategoriasUseCase(categoriaRepositorio);

export { recuperarCategoriaPorIdUseCase, recuperarTodasCategoriasUseCase }