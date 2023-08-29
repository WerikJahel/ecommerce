"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaMap = void 0;
const categoria_entity_1 = require("../domain/categoria/categoria.entity");
class CategoriaMap {
    static toDTO(categoria) {
        return {
            id: categoria.id,
            nome: categoria.nome,
        };
    }
    static toDomain(categoria) {
        return categoria_entity_1.Categoria.recuperar(categoria);
    }
}
exports.CategoriaMap = CategoriaMap;
//# sourceMappingURL=categoria.map.js.map