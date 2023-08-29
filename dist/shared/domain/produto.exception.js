"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaProdutoQuantidadeMaximaInvalida = exports.CategoriaProdutoQuantidadeMinimaInvalida = exports.ValorProdutoMinimoInvalido = exports.DescricaoProdutoTamanhoMaximoInvalido = exports.DescricaoProdutoTamanhoMinimoInvalido = exports.NomeProdutoTamanhoMaximoInvalido = exports.NomeProdutoTamanhoMinimoInvalido = exports.NomeProdutoNuloOuIndefinido = exports.ProdutoException = void 0;
const domain_exception_1 = require("./domain.exception");
class ProdutoException extends domain_exception_1.DomainException {
    constructor(message = "⚠️ Exceção do Domínio Genérica da Entidade Produto") {
        super(message);
        this.name = "ProdutoException";
        this.message = message;
    }
}
exports.ProdutoException = ProdutoException;
class NomeProdutoNuloOuIndefinido extends ProdutoException {
    constructor(message = "⚠️ O nome do Produto é nulo ou indefinido.") {
        super(message);
        this.name = "NomeProdutoNuloOuIndefinido";
        this.message = message;
    }
}
exports.NomeProdutoNuloOuIndefinido = NomeProdutoNuloOuIndefinido;
class NomeProdutoTamanhoMinimoInvalido extends ProdutoException {
    constructor(message = "⚠️ O nome do Produto não possui um tamanho mínimo válido.") {
        super(message);
        this.name = "NomeProdutoTamanhoMinimoInvalido";
        this.message = message;
    }
}
exports.NomeProdutoTamanhoMinimoInvalido = NomeProdutoTamanhoMinimoInvalido;
class NomeProdutoTamanhoMaximoInvalido extends ProdutoException {
    constructor(message = "⚠️ O nome do Produto não possui um tamanho máximo válido.") {
        super(message);
        this.name = "NomeProdutoTamanhoMaximoInvalido";
        this.message = message;
    }
}
exports.NomeProdutoTamanhoMaximoInvalido = NomeProdutoTamanhoMaximoInvalido;
class DescricaoProdutoTamanhoMinimoInvalido extends ProdutoException {
    constructor(message = "⚠️ A Descrição do Produto não possui um tamanho menor do que o mínimo válido.") {
        super(message);
        this.name = "DescriçãoProdutoTamanhoMinimoInvalido";
        this.message = message;
    }
}
exports.DescricaoProdutoTamanhoMinimoInvalido = DescricaoProdutoTamanhoMinimoInvalido;
class DescricaoProdutoTamanhoMaximoInvalido extends ProdutoException {
    constructor(message = "⚠️ A Descrição do Produto possui um tamanho maior do que o máximo válido.") {
        super(message);
        this.name = "DescriçãoProdutoTamanhoMaximoInvalido";
        this.message = message;
    }
}
exports.DescricaoProdutoTamanhoMaximoInvalido = DescricaoProdutoTamanhoMaximoInvalido;
class ValorProdutoMinimoInvalido extends ProdutoException {
    constructor(message = "⚠️ O valor do Produto não igual ou maior do que zero.") {
        super(message);
        this.name = "ValorProdutoValorMinimoInvalido";
        this.message = message;
    }
}
exports.ValorProdutoMinimoInvalido = ValorProdutoMinimoInvalido;
class CategoriaProdutoQuantidadeMinimaInvalida extends ProdutoException {
    constructor(message = "⚠️ O Produto não possui a quantidade mínima de Categoria necessária.") {
        super(message);
        this.name = "CategoriaProdutoQuantidadeMinimaInvalida";
        this.message = message;
    }
}
exports.CategoriaProdutoQuantidadeMinimaInvalida = CategoriaProdutoQuantidadeMinimaInvalida;
class CategoriaProdutoQuantidadeMaximaInvalida extends ProdutoException {
    constructor(message = "⚠️ O Produto possui mais que a quantidade máxima de Categorias necessárias.") {
        super(message);
        this.name = "DescriçãoProdutoQuantidadeMaximaInvalida";
        this.message = message;
    }
}
exports.CategoriaProdutoQuantidadeMaximaInvalida = CategoriaProdutoQuantidadeMaximaInvalida;
//# sourceMappingURL=produto.exception.js.map