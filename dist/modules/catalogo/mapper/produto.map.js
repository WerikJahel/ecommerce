"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoMap = void 0;
const Produto_entity_1 = require("../domain/produto/Produto.entity");
class ProdutoMap {
    static toDTO(produto) {
        return {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            categoria: produto.categoria,
        };
    }
    static toDomain(categoria) {
        return Produto_entity_1.Produto.recuperar(categoria);
    }
}
exports.ProdutoMap = ProdutoMap;
//# sourceMappingURL=produto.map.js.map