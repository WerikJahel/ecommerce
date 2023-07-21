"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const categoria_exception_1 = require("../../../shared/domain/categoria.exception");
const entity_1 = require("../../../shared/domain/entity");
class Categoria extends entity_1.Entity {
    get nome() {
        return this._nome;
    }
    set nome(value) {
        if (value === null || value === undefined) {
            throw new categoria_exception_1.NomeCategoriaNuloOuIndefinido();
        }
        if (value.trim().length < 3) {
            throw new categoria_exception_1.NomeCategoriaTamanhoMinimoInvalido();
        }
        if (value.trim().length > 50) {
            throw new categoria_exception_1.NomeCategoriaTamanhoMaximoInvalido();
        }
        this._nome = value;
    }
    constructor(categoria) {
        super(categoria.id);
        this.nome = categoria.nome;
    }
    static criar(props) {
        let { nome } = props;
        return new Categoria({ nome });
    }
}
exports.Categoria = Categoria;
//# sourceMappingURL=categoria.entity.js.map