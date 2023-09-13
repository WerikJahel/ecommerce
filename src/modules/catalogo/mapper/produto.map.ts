
import { Produto } from "../domain/produto/Produto.entity";
import { IProduto, RecuperarProdutoProps } from "../domain/produto/produto.types";

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
}

export { ProdutoMap };
