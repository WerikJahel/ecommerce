import { ProdutoComCategoriaPrisma } from "@shared/domain/infra/database/prisma.types";
import { Produto } from "../domain/produto/Produto.entity";
import { IProduto, RecuperarProdutoProps } from "../domain/produto/produto.types";
import { Categoria } from "../domain/categoria/categoria.entity";
import { CategoriaMap } from "./categoria.map";

class ProdutoMap {

  public static toDTO(produto: Produto): IProduto {
    return {
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      valor: produto.valor,
      categorias: produto.categorias
    }
  }

  public static toDomain(produto: RecuperarProdutoProps): Produto {
    return Produto.recuperar(produto);
  }

  public static fromPrismaModelToDomain(produtoPrisma: ProdutoComCategoriaPrisma): Produto {

    const categorias: Array<Categoria> = [];

    produtoPrisma.categorias.map(
      (categoria) => {
        categorias.push(
          CategoriaMap.fromPrismaModelToDomain(categoria.categoria)
        )
      }
    );

    //Retorna um produto como uma entidade de domínio
    return this.toDomain({
      id: produtoPrisma.id,
      nome: produtoPrisma.nome,
      descricao: produtoPrisma.descricao,
      valor: produtoPrisma.valor,
      categorias: categorias
    });

  }


}

export { ProdutoMap }