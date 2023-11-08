import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { Produto } from '@modules/catalogo/domain/produto/produto.entity';
import { StatusProduto } from '@modules/catalogo/domain/produto/produto.types';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { ProdutoPrismaRepository } from '@modules/catalogo/infra/database/produto.prisma.repository';
import { DomainException } from '@shared/domain/domain.exception';
import { prisma } from '@main/infra/database/orm/prisma/client';
import { categoriaRepositorio as categoriaRepo } from '@modules/catalogo/infra/database';
import { produtoRepositorio as produtoRepo } from '@modules/catalogo/infra/database';
import { atualizarCategoriaUseCase, deletarCategoriaUseCase, inserirCategoriaUseCase, recuperarCategoriaPorIdUseCase, recuperarProdutoPorIdUseCase } from '@modules/catalogo/application/use-case';


async function main() {

    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado');
        }
    );

    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////

    //console.log(await recuperarCategoriaPorIdUseCase.execute("f5c57868-57e1-4cfb-bb5a-c52d08eca9ba"));

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////

    //console.log(await recuperarTodasCategoriasUseCase.execute());

    /////////////////////
    //Inserir Categoria//
    /////////////////////

    // console.log(await inserirCategoriaUseCase.execute({ nome: 'Cama' }));

    /////////////////////////////////
    ///////Atualizar Categoria///////
    /////////////////////////////////

    // console.log(await atualizarCategoriaUseCase.execute({
    //     id: "aabd804e-6761-45f3-a896-6c233b313019",
    //     nome: "Cozinha Americana"
    // }));

    //////////////////////////////
    ///////Deletar Categoria//////
    //////////////////////////////

    // console.log(await deletarCategoriaUseCase.execute("f5c57868-57e1-4cfb-bb5a-c52d08eca9ba"));

    /////////////////////////////////////
    //////Recuperar Produto Por Id///////
    /////////////////////////////////////

    console.log(await recuperarProdutoPorIdUseCase.execute("aabd804e-6761-45f3-a896-6c233b313019"));


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        if (error instanceof DomainException) {
            console.log('Execeção de Dóminio');
            console.log(error.message);
        }
        else {
            console.log('Outras Exceções');
            console.log(error.message);
        }
        await prisma.$disconnect()
        process.exit(1)
    })