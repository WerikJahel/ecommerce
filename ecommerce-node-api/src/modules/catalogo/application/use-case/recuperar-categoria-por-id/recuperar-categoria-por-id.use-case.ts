import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map";
import { IUseCase } from "@shared/application/use-case.interface";

class RecuperarCategoriaPorIdUseCase implements IUseCase<string, ICategoria> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>) {
        this._categoriaRepositorio = repositorio;
    };

    async execute(uuid: string): Promise<ICategoria> {
        const existeCategoria: boolean = await this._categoriaRepositorio.existe(uuid)

        if (!existeCategoria) {
            throw new Error("A Categoria Não Existe na Base de Dados.");
        }

        const categoria = await this._categoriaRepositorio.recuperarPorUuid(uuid);

        return CategoriaMap.toDTO(categoria as Categoria);

        //Verificar se a pessoa que está acessando possuí autorização de ver a categoria

        //Enviar um e-mail

        //Enviar uma notificação por SMS e Whatsapp

    }
}

export { RecuperarCategoriaPorIdUseCase };
