import { PrismaRepository } from "../../../../shared/domain/infra/database/prisma.repository";
import { Produto } from "../../domain/produto/Produto.entity";
import { IProdutoRepository } from "../../domain/produto/produto.repository.interface.ts";

class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto> {
    recuperarPorUuid(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async recuperarTodos(): Promise<Array<Produto>> {

        const produtosRecuperados = await this._datasource.produto.findMany({
            include: produtoIncludeCategoriaPrisma
        });

        const produtos: Array<Produto> = [];

        if (produtosRecuperados.length > 0) {
            produtosRecuperados.map((produto) => {
                produtos.push(ProdutoMap.fromPrismaModelToDomain(produto));
            });
        }
        return produtos;
    }
    async existe(uuid: string): Promise<boolean> {
        const produto = await this.recuperarPorUuid(uuid);
        if (produto) { return true; }
        return false;
    }
    async inserir(produto: Produto): Promise<Produto> {
        const produtoInserido = await this._datasource.produto.create({
            data: {
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categorias: {
                    create: produto.categorias.map((categoria) => { return { categoriaId: categoria.id } })
                }
            }
        });
        return produto;
    }
    atualizar(uuid: string, entity: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async deletar(uuid: string): Promise<boolean> {
        const produtoDeletado = await this._datasource.produto.update(
            {
                where: {
                    id: uuid
                },
                data: {
                    dataExclusao: new Date()
                }
            }
        );
        if (produtoDeletado.id) { return true; }
        return false;
    }
}

export { ProdutoPrismaRepository }