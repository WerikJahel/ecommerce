import { NomeCategoriaNuloOuIndefinido, NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from "../../../shared/domain/categoria.exception";
import { Entity } from "../../../shared/domain/entity";
import { ProdutoMap } from "../mapper/produto.map";
import { Categoria } from "./categoria.entity";
import { IProduto, ProdutoProps, RecuperarProdutoProps } from "./Produto.types";

class Produto extends Entity<IProduto> implements IProduto {
  private _nome: string;
  private _descricao: string;
  private _valor: number;
  private _categoria: Categoria[];

  public get nome(): string {
    return this._nome;
  }
  private set nome(value: string) {
    if (value === null || value === undefined) {
      throw new NomeCategoriaNuloOuIndefinido();
    }

    if (value.trim().length < 5) {
      throw new NomeCategoriaTamanhoMinimoInvalido();
    }

    if (value.trim().length > 50) {
      throw new NomeCategoriaTamanhoMaximoInvalido();
    }

    this._nome = value;
  }

  public get descricao(): string {
    return this._descricao;
  }
  private set descricao(value: string) {
    if (value.length < 10) { //.trim() serve para retirar os espaços da string
      throw new NomeCategoriaTamanhoMinimoInvalido();
    }

    if (value.length > 200) {
      throw new NomeCategoriaTamanhoMaximoInvalido();
    }

    this._descricao = value;
  }

  public get valor(): number {
    return this._valor;
  }
  private set valor(value: number) {
    this._valor = value;
  }

  public get categoria(): Categoria[] {
    return this._categoria;
  }
  private set categoria(value: Categoria[]) {
    if (value.length < 1) { //.trim() serve para retirar os espaços da string
      throw new NomeCategoriaTamanhoMinimoInvalido();
    }

    if (value.length > 3) {
      throw new NomeCategoriaTamanhoMaximoInvalido();
    }

    this._categoria = value;
  }

  private constructor(produto: IProduto) {
    super(produto.id)
    this.nome = produto.nome;
    this.descricao = produto.descricao;
    this.valor = produto.valor;
    this.categoria = produto.categoria;
  }

  public static criar(props: ProdutoProps): Produto {
    return new Produto(props);
  }

  public static recuperar(props: RecuperarProdutoProps): Produto {
    return new Produto(props);
  }

  public toDTO(): IProduto {
    return ProdutoMap.toDTO(this);
  }

}

export { Produto }