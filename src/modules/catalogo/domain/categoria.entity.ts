import {
  ICategoria,
  CreateCategoryProps,
  RecuperarCategoriaProps,
} from "../domain/categoria.types";
import {
  NomeCategoriaNuloOuIndefinido,
  NomeCategoriaTamanhoMaximoInvalido,
  NomeCategoriaTamanhoMinimoInvalido,
} from "../../../shared/domain/categoria.exception";
import { Entity } from "../../../shared/domain/entity";

class Categoria extends Entity<ICategoria> implements ICategoria {
  private _nome: string;

  public get nome(): string {
    return this._nome;
  }

  private set nome(value: string) {
    if (value === null || value === undefined) {
      throw new NomeCategoriaNuloOuIndefinido();
    }

    if (value.trim().length < 3) {
      throw new NomeCategoriaTamanhoMinimoInvalido();
    }

    if (value.trim().length > 50) {
      throw new NomeCategoriaTamanhoMaximoInvalido();
    }

    this._nome = value;
  }

  private constructor(categoria: ICategoria) {
    super(categoria.id);
    this.nome = categoria.nome;
  }

  public static criar(props: CreateCategoryProps): Categoria {
    let { nome } = props;
    return new Categoria({ nome });
  }

  public static recuperar(props: RecuperarCategoriaProps): Categoria {
    return new Categoria(props);
  }

  // public serialize() {
  //   return JSON.stringify(this);
  // }
}

export { Categoria };
