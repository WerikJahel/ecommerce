import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { IUseCase } from "@shared/application/use-case.interface";

class DeletarCategoriaPorIdUseCase implements IUseCase<string, boolean> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>) {
        this._categoriaRepositorio = repositorio;
    };

    async execute(uuid: string): Promise<boolean> {
        const existeCategoria: boolean = await this._categoriaRepositorio.existe(uuid)

        if (!existeCategoria) {
            throw new Error("A Categoria Não Existe na Base de Dados.");
        }

        const deletouCategoria = await this._categoriaRepositorio.deletar(uuid);

        return deletouCategoria;

        //Verificar se a pessoa que está acessando possuí autorização de ver a categoria

        //Enviar um e-mail

        //Enviar uma notificação por SMS e Whatsapp

    }
}

export { DeletarCategoriaPorIdUseCase };
