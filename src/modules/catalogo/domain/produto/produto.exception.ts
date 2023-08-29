import { DomainException } from "../../../../shared/domain/domain.exception";

class ProdutoException extends DomainException {
  constructor(
    message: string = "⚠️ Exceção do Domínio Genérica da Entidade Produto"
  ) {
    super(message);
    this.name = "ProdutoException";
    this.message = message;
  }
}

class NomeProdutoNuloOuIndefinido extends ProdutoException {
  public constructor(
    message: string = "⚠️ O nome do Produto é nulo ou indefinido."
  ) {
    super(message);
    this.name = "NomeProdutoNuloOuIndefinido";
    this.message = message;
  }
}

class NomeProdutoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(
    message: string = "⚠️ O nome do Produto não possui um tamanho mínimo válido."
  ) {
    super(message);
    this.name = "NomeProdutoTamanhoMinimoInvalido";
    this.message = message;
  }
}

class NomeProdutoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(
    message: string = "⚠️ O nome do Produto não possui um tamanho máximo válido."
  ) {
    super(message);
    this.name = "NomeProdutoTamanhoMaximoInvalido";
    this.message = message;
  }
}

class DescricaoProdutoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(
    message: string = "⚠️ A Descrição do Produto não possui um tamanho menor do que o mínimo válido."
  ) {
    super(message);
    this.name = "DescriçãoProdutoTamanhoMinimoInvalido";
    this.message = message;
  }
}

class DescricaoProdutoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(
    message: string = "⚠️ A Descrição do Produto possui um tamanho maior do que o máximo válido."
  ) {
    super(message);
    this.name = "DescriçãoProdutoTamanhoMaximoInvalido";
    this.message = message;
  }
}

class ValorProdutoMinimoInvalido extends ProdutoException {
  public constructor(
    message: string = "⚠️ O valor do Produto não igual ou maior do que zero."
  ) {
    super(message);
    this.name = "ValorProdutoValorMinimoInvalido";
    this.message = message;
  }
}

class CategoriaProdutoQuantidadeMinimaInvalida extends ProdutoException {
  public constructor(
    message: string = "⚠️ O Produto não possui a quantidade mínima de Categoria necessária."
  ) {
    super(message);
    this.name = "CategoriaProdutoQuantidadeMinimaInvalida";
    this.message = message;
  }
}

class CategoriaProdutoQuantidadeMaximaInvalida extends ProdutoException {
  public constructor(
    message: string = "⚠️ O Produto possui mais que a quantidade máxima de Categorias necessárias."
  ) {
    super(message);
    this.name = "DescriçãoProdutoQuantidadeMaximaInvalida";
    this.message = message;
  }
}

export {
  ProdutoException,
  NomeProdutoNuloOuIndefinido,
  NomeProdutoTamanhoMinimoInvalido,
  NomeProdutoTamanhoMaximoInvalido,
  DescricaoProdutoTamanhoMinimoInvalido,
  DescricaoProdutoTamanhoMaximoInvalido,
  ValorProdutoMinimoInvalido,
  CategoriaProdutoQuantidadeMinimaInvalida,
  CategoriaProdutoQuantidadeMaximaInvalida

};
