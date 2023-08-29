"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
const produto_exception_1 = require("../../../../shared/domain/produto.exception");
const entity_1 = require("../../../../shared/domain/entity");
const produto_map_1 = require("../../mapper/produto.map");
class Produto extends entity_1.Entity {
    get nome() {
        return this._nome;
    }
    set nome(value) {
        if (value === null || value === undefined) {
            throw new produto_exception_1.NomeProdutoNuloOuIndefinido();
        }
        if (value.trim().length < 5) {
            throw new produto_exception_1.NomeProdutoTamanhoMinimoInvalido();
        }
        if (value.trim().length > 50) {
            throw new produto_exception_1.NomeProdutoTamanhoMaximoInvalido();
        }
        this._nome = value;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(value) {
        if (value.length < 10) { //.trim() serve para retirar os espaços da string
            throw new produto_exception_1.DescricaoProdutoTamanhoMinimoInvalido();
        }
        if (value.length > 200) {
            throw new produto_exception_1.DescricaoProdutoTamanhoMaximoInvalido();
        }
        this._descricao = value;
    }
    get valor() {
        return this._valor;
    }
    set valor(value) {
        if (value < 0) { //.trim() serve para retirar os espaços da string
            throw new produto_exception_1.ValorProdutoMinimoInvalido();
        }
        this._valor = value;
    }
    get categoria() {
        return this._categoria;
    }
    set categoria(value) {
        if (value.length < 1) { //.trim() serve para retirar os espaços da string
            throw new produto_exception_1.CategoriaProdutoQuantidadeMinimaInvalida();
        }
        if (value.length > 3) {
            throw new produto_exception_1.CategoriaProdutoQuantidadeMaximaInvalida();
        }
        this._categoria = value;
    }
    constructor(produto) {
        super(produto.id);
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.valor = produto.valor;
        this.categoria = produto.categoria;
    }
    static criar(props) {
        return new Produto(props);
    }
    static recuperar(props) {
        return new Produto(props);
    }
    toDTO() {
        return produto_map_1.ProdutoMap.toDTO(this);
    }
}
exports.Produto = Produto;
//# sourceMappingURL=Produto.entity.js.map