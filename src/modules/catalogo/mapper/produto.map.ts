
import { ProdutoComCategoriaPrisma } from "../../../shared/domain/infra/database/prisma.types";
import { Categoria } from "../domain/categoria/categoria.entity";
import { Produto } from "../domain/produto/Produto.entity";
import { IProduto, RecuperarProdutoProps } from "../domain/produto/produto.types";
import { CategoriaMap } from "./categoria.map";

class ProdutoMap {
  public static toDTO(produto: Produto): IProduto {
    return {
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      valor: produto.valor,
      categoria: produto.categoria,
    };
  }

  public static toDomain(categoria: RecuperarProdutoProps): Produto {
    return Produto.recuperar(categoria);
  }

  public static fromPrismaModelToDomain(produto: ProdutoComCategoriaPrisma): Produto {

    const categorias: Array<Categoria> = [];

    produto.categorias.map(
      (categoria) => {
        categorias.push(
          CategoriaMap.fromPrismaModelToDomain(categoria.categoria)
        )
      }
    );

    return this.toDomain({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      valor: produto.valor,
      categorias: categorias
    });
  }


}

export { ProdutoMap };
