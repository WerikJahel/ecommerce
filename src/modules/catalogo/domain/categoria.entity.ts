import { CreateCategoryProps, ICategoria } from "./categoria.types";

export class Categoria implements ICategoria {
  private _id: string;
  private _nome: string;

  public get id(): string {
    return this._id;
  }
  private set id(value: string) {
    this._id = value;
  }

  public get nome(): string {
    return this._nome;
  }
  private set nome(value: string) {
    if (value.length < 3) {
    } else {
      this._nome = value;
    }
  }

  private constructor(props: ICategoria) {
    this.id = props.id;
    this.nome = props.nome;
  }

  public static create(props: CreateCategoryProps): Categoria {
    let id = "123456";
    let { nome } = props;
    return new Categoria({ id, nome });
  }
}
